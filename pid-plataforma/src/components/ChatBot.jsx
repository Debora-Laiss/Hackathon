import { useState, useRef, useEffect } from "react";

const API_URL = "https://backend-6wty.onrender.com/api/chat"; // 🔁 troque pela URL do seu backend

function TypingDots() {
  return (
    <div className="flex items-end gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full animate-bounce"
          style={{ background: "#E84C1F", animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      {!isUser && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 mt-1 shrink-0"
          style={{ background: "#E84C1F" }}
        >
          PID
        </div>
      )}
      <div
        className="max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm"
        style={
          isUser
            ? {
                background: "#1A2744",
                color: "#fff",
                borderBottomRightRadius: 4,
              }
            : {
                background: "#fff",
                color: "#1A2744",
                borderBottomLeftRadius: 4,
                border: "1px solid #E2E8F0",
              }
        }
      >
        {msg.content}
      </div>
    </div>
  );
}

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Olá! Sou o assistente da Plataforma Interativa de Descarbonização. Como posso te ajudar? 🌿",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error(`Erro ${res.status}`);
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ Erro ao conectar com o servidor: ${err.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed z-50 w-14 h-14 rounded-full text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ 
          background: "#E84C1F",
          bottom: "clamp(120px, 20vh, 160px)", // Mobile: 120px, Desktop: até 160px
          right: "clamp(16px, 4vw, 24px)"
        }}
        aria-label="Abrir assistente"
      >
        {open ? (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>

      {/* Janela do chat */}
      <div
        className={`fixed z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right ${
          open
            ? "scale-100 opacity-100"
            : "scale-90 opacity-0 pointer-events-none"
        }`}
        style={{
          background: "#F7F8FA",
          border: "1px solid #E2E8F0",
          bottom: "clamp(184px, calc(20vh + 64px), 224px)", // Acima do botão
          right: "clamp(16px, 4vw, 24px)",
          width: "min(360px, calc(100vw - 32px))",
          maxHeight: "min(520px, calc(100vh - 240px))",
        }}
      >
        {/* Header */}
        <div
          className="px-4 py-3 flex items-center gap-3"
          style={{ background: "#1A2744" }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-xs shrink-0"
            style={{ background: "#E84C1F" }}
          >
            PID
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Assistente PID</p>
            <p className="text-xs" style={{ color: "#94A3B8" }}>
              Plataforma de Descarbonização
            </p>
          </div>
          <button
            onClick={() =>
              setMessages([
                {
                  role: "assistant",
                  content:
                    "Olá! Sou o assistente da Plataforma Interativa de Descarbonização. Como posso te ajudar? 🌿",
                },
              ])
            }
            className="ml-auto text-xs transition-colors hover:text-white"
            style={{ color: "#64748B" }}
            title="Limpar conversa"
          >
            Limpar
          </button>
        </div>

        {/* Mensagens */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 min-h-0">
          {messages.map((msg, i) => (
            <Message key={i} msg={msg} />
          ))}
          {loading && (
            <div className="flex justify-start mb-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 mt-1 shrink-0"
                style={{ background: "#E84C1F" }}
              >
                PID
              </div>
              <div
                className="bg-white border border-gray-100 rounded-2xl shadow-sm"
                style={{ borderBottomLeftRadius: 4 }}
              >
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 bg-white px-3 py-3 flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Digite sua mensagem..."
            rows={1}
            disabled={loading}
            className="flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none disabled:opacity-50 max-h-24"
            style={{ lineHeight: "1.5", color: "#1A2744" }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-xl text-white flex items-center justify-center transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "#E84C1F" }}
          >
            <svg
              className="w-4 h-4 rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
