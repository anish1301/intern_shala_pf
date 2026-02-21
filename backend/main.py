from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
import json
from dotenv import load_dotenv
from database import init_db, save_message, get_chat_history, save_contact
from resume_data import RESUME_DATA

load_dotenv()

app = FastAPI(title="Portfolio AI Chat API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = os.getenv("AI_MODEL", "meta-llama/llama-3.2-3b-instruct:free")


@app.on_event("startup")
async def startup():
    init_db()


# ── Request / Response Models ──────────────────────────────────────────


class ChatRequest(BaseModel):
    message: str
    session_id: str = "default"


class ChatResponse(BaseModel):
    response: str
    session_id: str


class ContactRequest(BaseModel):
    name: str
    email: str
    message: str


# ── Helpers ────────────────────────────────────────────────────────────


def get_system_prompt() -> str:
    resume_json = json.dumps(RESUME_DATA, separators=(',', ':'))
    return f"""You are an AI assistant on Alex Chen's portfolio. Answer only from this resume data. Be concise (2-3 sentences). Use markdown for lists.

DATA:{resume_json}
"""


# ── Endpoints ──────────────────────────────────────────────────────────


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not OPENROUTER_API_KEY or OPENROUTER_API_KEY == "your_openrouter_api_key_here":
        raise HTTPException(
            status_code=500,
            detail="OpenRouter API key not configured. Please set OPENROUTER_API_KEY in backend/.env",
        )

    # Build conversation with history for context
    history = get_chat_history(request.session_id, limit=10)
    messages = [{"role": "system", "content": get_system_prompt()}]
    for msg in history:
        messages.append({"role": msg["role"], "content": msg["content"]})
    messages.append({"role": "user", "content": request.message})

    import asyncio

    MAX_RETRIES = 3
    FALLBACK_MODELS = [
        MODEL,
        "nvidia/nemotron-nano-9b-v2:free",
        "qwen/qwen3-4b:free",
        "meta-llama/llama-3.3-70b-instruct:free",
        "meta-llama/llama-3.2-3b-instruct:free",
    ]
    # Deduplicate while preserving order
    seen = set()
    models_to_try = []
    for m in FALLBACK_MODELS:
        if m not in seen:
            seen.add(m)
            models_to_try.append(m)

    last_error = ""

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            for model in models_to_try:
                for attempt in range(MAX_RETRIES):
                    response = await client.post(
                        OPENROUTER_BASE_URL,
                        headers={
                            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                            "Content-Type": "application/json",
                            "HTTP-Referer": "http://localhost:5173",
                            "X-Title": "Portfolio Chat",
                        },
                        json={
                            "model": model,
                            "messages": messages,
                            "max_tokens": 500,
                            "temperature": 0.7,
                        },
                    )

                    if response.status_code == 200:
                        data = response.json()
                        ai_response = data["choices"][0]["message"]["content"]

                        # Persist conversation
                        save_message(request.session_id, "user", request.message)
                        save_message(request.session_id, "assistant", ai_response)

                        return ChatResponse(
                            response=ai_response, session_id=request.session_id
                        )

                    if response.status_code == 429:
                        wait = 3 * (attempt + 1)  # 3s, 6s, 9s
                        last_error = f"Rate limited (429) on model {model}, attempt {attempt + 1}"
                        print(f"[chat] {last_error} — retrying in {wait}s")
                        await asyncio.sleep(wait)
                        continue

                    # Other non-200 error
                    last_error = f"AI service error ({response.status_code}): {response.text}"
                    print(f"[chat] {last_error}")
                    break  # Try next model

            # All models / retries exhausted
            raise HTTPException(
                status_code=429,
                detail=(
                    "The AI service is rate-limiting requests. "
                    "Please wait a few seconds and try again. "
                    f"Last error: {last_error}"
                ),
            )

    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="AI service timeout — please try again.")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/contact")
async def contact(request: ContactRequest):
    try:
        save_contact(request.name, request.email, request.message)
        return {"status": "success", "message": "Message received! I'll get back to you soon."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/resume")
async def get_resume():
    return RESUME_DATA


@app.get("/api/health")
async def health():
    return {"status": "healthy"}
