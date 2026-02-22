# Anish Kumar — Portfolio with AI Chat

A modern, animated personal portfolio website with an AI-powered chat assistant that can answer questions about the resume. Built with **React + TypeScript** frontend and **Python (FastAPI)** backend.

---

## Features

- **Stunning UI** — Dark theme with glassmorphism, gradient accents, particle background, scroll animations
- **Interactive Particles** — Canvas-based star field that reacts to mouse movement
- **AI Chat Widget** — Real-time chat about the resume powered by OpenRouter (free AI models)
- **Smooth Animations** — Framer Motion scroll reveals, typewriter hero text, animated skill bars
- **Responsive Design** — Mobile-first, looks great on all devices
- **Contact Form** — Messages stored in SQLite database
- **Chat History** — Conversations persisted in SQLite for multi-turn context

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, TypeScript, Vite          |
| Styling   | Tailwind CSS, Framer Motion         |
| Backend   | Python, FastAPI, Uvicorn            |
| Database  | SQLite                              |
| AI Chat   | OpenRouter API (free models)        |

---

## Quick Start

### 1. Get an OpenRouter API Key

1. Go to [https://openrouter.ai/](https://openrouter.ai/) and sign up (free)
2. Create an API key in Settings → Keys
3. Open `backend/.env` and paste your key:
   ```
   OPENROUTER_API_KEY=sk-or-v1-your-key-here
   AI_MODEL=nvidia/nemotron-nano-9b-v2:free
   ```

### 2. Start the Backend

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Open the App

Visit [http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
practice/
├── backend/
│   ├── main.py              # FastAPI app (chat, contact, resume endpoints)
│   ├── database.py          # SQLite helpers (chat history, contacts)
│   ├── resume_data.py       # Resume data (customize this!)
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # API keys (add your OpenRouter key)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ParticleBackground.tsx   # Interactive canvas particles
│   │   │   ├── ScrollReveal.tsx         # Reusable scroll animation wrapper
│   │   │   ├── Navbar.tsx               # Glass navbar with active tracking
│   │   │   ├── Hero.tsx                 # Hero with typewriter effect
│   │   │   ├── About.tsx                # Bio + animated counters
│   │   │   ├── Skills.tsx               # Skill bars with icons
│   │   │   ├── Experience.tsx           # Timeline layout
│   │   │   ├── Projects.tsx             # Filterable project cards
│   │   │   ├── Contact.tsx              # Contact form
│   │   │   ├── Footer.tsx               # Site footer
│   │   │   └── ChatWidget.tsx           # AI chat floating widget
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css                    # Tailwind + custom animations
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts                   # Proxy /api → backend
│   ├── tailwind.config.js
│   └── tsconfig.json
│
└── README.md
```

---

## Customization

### Change the Resume Data

Edit `backend/resume_data.py` — the AI assistant will automatically use the updated data when answering questions.

### Change the AI Model

Edit `AI_MODEL` in `backend/.env`. Free models on OpenRouter include:
- `nvidia/nemotron-nano-9b-v2:free`
- `meta-llama/llama-3.2-3b-instruct:free`
- `qwen/qwen3-4b:free`

### Change Colors

The primary gradient uses Indigo → Purple → Cyan. Edit the Tailwind classes and CSS custom properties in `frontend/src/index.css`.

---

## API Endpoints

| Method | Path          | Description                      |
|--------|---------------|----------------------------------|
| POST   | `/api/chat`   | Send a chat message, get AI reply|
| GET    | `/api/resume` | Get the full resume JSON         |
| POST   | `/api/contact`| Submit a contact form message    |
| GET    | `/api/health` | Health check                     |

---

## License

MIT
