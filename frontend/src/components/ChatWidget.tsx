import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChat, HiX } from 'react-icons/hi';
import { IoSend } from 'react-icons/io5';
import ReactMarkdown from 'react-markdown';

/* ── Types ───────────────────────────────────────────────────────────── */

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

/* ── Component ───────────────────────────────────────────────────────── */

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! 👋 I'm Anish's AI assistant. Ask me anything about his experience, skills, projects, achievements, or education and I'll give you accurate answers from his resume!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionId = useRef(
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36),
  );

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          session_id: sessionId.current,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Request failed');
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: data.response },
      ]);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Unknown error';
      const isRateLimit = errorMsg.includes('429') || errorMsg.toLowerCase().includes('rate');
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: isRateLimit
            ? "The AI service is currently rate-limited. Please wait a few seconds and try again — free models have usage caps. ⏳"
            : `Something went wrong: ${errorMsg}. Make sure the backend server is running and your OpenRouter API key is set.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ── Quick prompts ─────────────────────────────────────────────────── */

  const quickPrompts = [
    'What are his achievements?',
    'Tell me about his experience',
    'What projects has he built?',
  ];

  return (
    <>
      {/* ── Toggle Button ──────────────────────────────────────────── */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HiX size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HiChat size={24} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-indigo-500 pulse-ring" />
        )}
      </motion.button>

      {/* ── Chat Panel ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[540px] flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
            style={{
              background: 'rgba(8, 2, 20, 0.96)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 border-b border-white/5 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <span className="text-sm">🤖</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm">AI Resume Assistant</h3>
                  <p className="text-green-400 text-[11px] flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online — Powered by AI
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-scrollbar">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl rounded-br-md shadow-lg shadow-indigo-500/10'
                        : 'bg-white/[0.04] text-gray-300 rounded-2xl rounded-bl-md border border-white/5'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="chat-prose">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/[0.04] rounded-2xl rounded-bl-md px-4 py-3 border border-white/5">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full typing-dot" />
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full typing-dot" />
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full typing-dot" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts — only show when there's just the welcome message */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex gap-2 flex-wrap flex-shrink-0">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setInput(prompt);
                      setTimeout(() => {
                        setInput('');
                        const userMsg: Message = {
                          id: Date.now().toString(),
                          role: 'user',
                          content: prompt,
                        };
                        setMessages((prev) => [...prev, userMsg]);
                        setIsLoading(true);
                        fetch('/api/chat', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            message: prompt,
                            session_id: sessionId.current,
                          }),
                        })
                          .then((res) => res.json())
                          .then((data) => {
                            setMessages((prev) => [
                              ...prev,
                              {
                                id: (Date.now() + 1).toString(),
                                role: 'assistant',
                                content: data.response,
                              },
                            ]);
                          })
                          .catch(() => {
                            setMessages((prev) => [
                              ...prev,
                              {
                                id: (Date.now() + 1).toString(),
                                role: 'assistant',
                                content: 'Sorry, something went wrong. Please try again.',
                              },
                            ]);
                          })
                          .finally(() => setIsLoading(false));
                      }, 0);
                    }}
                    className="text-[11px] px-3 py-1.5 rounded-full glass text-indigo-300 hover:text-white hover:border-indigo-500/30 transition-all duration-200"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/5 flex-shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Anish's resume..."
                  className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 flex-shrink-0"
                >
                  <IoSend size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
