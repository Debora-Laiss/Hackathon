import { useState } from "react";
import { PARCEIROS } from "../models/data";

const PERSONAS = [
  {
    id: "investidor",
    icon: "📈",
    titulo: "Investidor",
    subtitulo: "Fundos, bancos e empresas privadas",
    descricao: "Oportunidades de investimento em infraestrutura verde com retorno comprovado.",
    tags: ["ROI Verde", "Portfólio ESG", "Oportunidades"],
    corAcento: "#7B9EFF",
    bg: "linear-gradient(135deg, #1A2744 0%, #2d3f6b 100%)",
  },
  {
    id: "governo",
    icon: "🏛️",
    titulo: "Governo",
    subtitulo: "Gestores públicos e reguladores",
    descricao: "Dados territoriais para políticas públicas e metas de descarbonização por estado.",
    tags: ["Políticas Públicas", "Metas Climáticas", "Territórios"],
    corAcento: "#34D399",
    bg: "linear-gradient(135deg, #085041 0%, #0F6E56 100%)",
  },
  {
    id: "consultor",
    icon: "🔬",
    titulo: "Consultor Técnico",
    subtitulo: "Engenheiros, pesquisadores e analistas",
    descricao: "Camadas técnicas detalhadas, indicadores setoriais e dados de infraestrutura.",
    tags: ["Dados Técnicos", "Camadas GIS", "Indicadores"],
    corAcento: "#FF8C69",
    bg: "linear-gradient(135deg, #4A1B0C 0%, #993C1D 100%)",
  },
  {
    id: "cidadao",
    icon: "🌱",
    titulo: "Cidadão",
    subtitulo: "Qualquer pessoa interessada",
    descricao: "Entenda como a transição energética impacta sua cidade e o futuro do Brasil.",
    tags: ["Linguagem Simples", "Impacto Local", "Educação"],
    corAcento: "#86EFAC",
    bg: "linear-gradient(135deg, #173404 0%, #3B6D11 100%)",
  },
];

const MENSAGENS_PERSONA = {
  investidor: "💼 O Brasil tem mais de R$ 1 trilhão em oportunidades de investimento verde até 2035. A PID conecta você aos melhores ativos da transição energética.",
  governo: "🏛️ Tome decisões baseadas em dados reais. A PID mapeia infraestrutura, emissões e potencial renovável por estado para apoiar políticas públicas eficazes.",
  consultor: "🔬 Acesse camadas técnicas detalhadas de GIS, indicadores setoriais e dados de infraestrutura para análises aprofundadas e relatórios precisos.",
  cidadao: "🌱 A transição energética gera empregos, reduz a poluição e diminui a conta de luz. Descubra como isso já está mudando a sua região.",
};

export function PaginaInicio({ setPagina, persona, setPersona }) {
  const [hover, setHover] = useState(null);
  const [confirmado, setConfirmado] = useState(false);

  const destaques = [
    "Cobertura ampliada de setores e regiões",
    "Novas camadas de dados",
    "Indicadores de transição energética por estado",
    "Atlas do Futuro Industrial do Brasil",
  ];

  function handleEscolherPersona(p) {
    setPersona(p.id);
    setConfirmado(true);
    setTimeout(() => setConfirmado(false), 2000);
  }

  const personaAtual = PERSONAS.find((p) => p.id === persona);

  return (
    <div style={{ overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        minHeight: "calc(100vh - 56px)",
      }}>
        {/* Coluna esquerda */}
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "clamp(40px, 8vw, 80px) clamp(24px, 6vw, 72px)",
          background: "#e9ecf1",
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#E84C1F", textTransform: "uppercase", marginBottom: 20, display: "block" }}>
            Versão 3.0 · COP30
          </span>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.05, color: "#1A2744", margin: "0 0 20px", letterSpacing: "-0.02em", fontFamily: "'Sora', sans-serif" }}>
            Plataforma<br />Interativa de<br />Descarbonização
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "#64748B", marginBottom: 28, maxWidth: 380, lineHeight: 1.7 }}>
            Um novo olhar para o futuro da transição energética no Brasil.
          </p>
          <div style={{ marginBottom: 36 }}>
            {destaques.map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 13, color: "#475569", lineHeight: 1.5 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#E84C1F", flexShrink: 0 }} />
                {t}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => setPagina("infraestrutura")}
              style={{ padding: "13px 28px", borderRadius: 99, background: "#E84C1F", color: "#fff", fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(232,76,31,0.35)", transition: "transform 0.15s, box-shadow 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,76,31,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(232,76,31,0.35)"; }}
            >
              Explorar Plataforma →
            </button>
            <button
              onClick={() => setPagina("saiba")}
              style={{ padding: "13px 28px", borderRadius: 99, border: "2px solid #1A2744", background: "none", color: "#1A2744", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "background 0.15s, color 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1A2744"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#1A2744"; }}
            >
              Saiba mais
            </button>
          </div>
        </div>

        {/* Coluna direita */}
        <div style={{ position: "relative", background: "linear-gradient(145deg,#1A2744 0%,#263659 55%,#b83d12 100%)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", minHeight: 340 }}>
          <svg viewBox="0 0 400 400" style={{ position: "absolute", width: "90%", opacity: 0.08 }}>
            {[160, 120, 80, 40].map((r) => (<circle key={r} cx="200" cy="200" r={r} fill="none" stroke="white" strokeWidth="1" />))}
            {Array.from({ length: 12 }, (_, i) => i * 30).map((a) => (
              <line key={a} x1="200" y1="200" x2={200 + 160 * Math.cos(a * Math.PI / 180)} y2={200 + 160 * Math.sin(a * Math.PI / 180)} stroke="white" strokeWidth="0.5" />
            ))}
          </svg>
          <div style={{ position: "absolute", top: "12%", right: "8%", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", borderRadius: 12, padding: "12px 18px", border: "1px solid rgba(255,255,255,0.12)" }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>Pontos mapeados</p>
            <p style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: "4px 0 0" }}>3.278</p>
          </div>
          <div style={{ position: "absolute", bottom: "14%", left: "8%", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", borderRadius: 12, padding: "12px 18px", border: "1px solid rgba(255,255,255,0.12)" }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>Estados cobertos</p>
            <p style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: "4px 0 0" }}>27</p>
          </div>
          <div style={{ textAlign: "center", color: "#fff", padding: 32, zIndex: 1 }}>
            <div style={{ fontSize: "clamp(48px, 8vw, 80px)", marginBottom: 16, opacity: 0.85 }}>🌿</div>
            <p style={{ fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 300, opacity: 0.7, lineHeight: 1.6 }}>Transição Energética<br />Industrial no Brasil</p>
            <p style={{ fontSize: 11, opacity: 0.35, marginTop: 14, letterSpacing: "0.05em" }}>Instituto E+ · Net Zero · Johns Hopkins</p>
          </div>
        </div>
      </section>

      {/* ── SELEÇÃO DE PERSONA ── */}
      <section style={{ background: "#0D1321", padding: "clamp(48px, 7vw, 80px) clamp(24px, 6vw, 72px)", position: "relative", overflow: "hidden" }}>
        <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }`}</style>

        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03, pointerEvents: "none" }}>
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 500, height: 200, background: "radial-gradient(ellipse, rgba(232,76,31,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", marginBottom: "clamp(28px, 4vw, 48px)", position: "relative", zIndex: 1 }}>
          <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", color: "#E84C1F", textTransform: "uppercase", marginBottom: 14, padding: "4px 14px", border: "1px solid rgba(232,76,31,0.3)", borderRadius: 99 }}>
            Personalize sua experiência
          </span>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 800, color: "#fff", margin: "0 0 12px", lineHeight: 1.2, fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em" }}>
            Quem é você na<br />
            <span style={{ color: "#E84C1F" }}>transição energética?</span>
          </h2>
          <p style={{ fontSize: 14, color: "#94A3B8", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            Escolha seu perfil para ver os dados e insights mais relevantes para você.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14, maxWidth: 980, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {PERSONAS.map((p) => {
            const isHover = hover === p.id;
            const isAtivo = persona === p.id;
            const destacado = isHover || isAtivo;

            return (
              <button
                key={p.id}
                onClick={() => handleEscolherPersona(p)}
                onMouseEnter={() => setHover(p.id)}
                onMouseLeave={() => setHover(null)}
                style={{
                  background: isAtivo ? p.bg : isHover ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
                  border: isAtivo ? `2px solid ${p.corAcento}` : `1px solid ${isHover ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 18,
                  padding: "clamp(18px, 2.5vw, 28px) clamp(14px, 2vw, 24px)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.22s ease",
                  transform: isHover && !isAtivo ? "translateY(-3px)" : "translateY(0)",
                  boxShadow: isAtivo ? `0 8px 32px rgba(0,0,0,0.5)` : isHover ? "0 8px 24px rgba(0,0,0,0.3)" : "none",
                  position: "relative",
                }}
              >
                {isAtivo && (
                  <div style={{ position: "absolute", top: 12, right: 12, background: p.corAcento, color: "#000", fontSize: 9, fontWeight: 800, letterSpacing: "0.06em", padding: "3px 8px", borderRadius: 99, textTransform: "uppercase" }}>
                    ✓ Ativo
                  </div>
                )}
                <div style={{ fontSize: "clamp(28px, 3.5vw, 38px)", marginBottom: 14 }}>{p.icon}</div>
                <h3 style={{ fontSize: "clamp(15px, 1.8vw, 18px)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 4px", fontFamily: "'Sora', sans-serif" }}>{p.titulo}</h3>
                <p style={{ fontSize: 12, color: "#94A3B8", margin: "0 0 12px" }}>{p.subtitulo}</p>
                <p style={{ fontSize: 13, color: "#CBD5E1", lineHeight: 1.6, margin: "0 0 14px" }}>{p.descricao}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {p.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.07em", padding: "3px 8px", borderRadius: 99, textTransform: "uppercase", background: destacado ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)", color: "#E2E8F0", border: "1px solid rgba(255,255,255,0.12)", transition: "background 0.22s" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: 16, fontSize: 12, fontWeight: 700, color: isAtivo ? p.corAcento : "#64748B", display: "flex", alignItems: "center", gap: 5, transition: "color 0.22s" }}>
                  {isAtivo ? "Perfil ativo" : `Entrar como ${p.titulo}`}
                  <span style={{ transform: isHover ? "translateX(3px)" : "translateX(0)", transition: "transform 0.18s", display: "inline-block" }}>→</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Toast de confirmação */}
        {confirmado && personaAtual && (
          <div style={{ textAlign: "center", marginTop: 24, position: "relative", zIndex: 1 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 99, padding: "8px 20px", color: "#fff", fontSize: 13 }}>
              {personaAtual.icon} Perfil <strong style={{ color: personaAtual.corAcento }}>{personaAtual.titulo}</strong> ativado!
            </span>
          </div>
        )}

        {/* Mensagem direcionada ao perfil */}
        {persona && MENSAGENS_PERSONA[persona] && (
          <div style={{
            maxWidth: 620,
            margin: "24px auto 0",
            padding: "16px 20px",
            borderRadius: 14,
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${personaAtual?.corAcento}50`,
            borderLeft: `4px solid ${personaAtual?.corAcento}`,
            position: "relative",
            zIndex: 1,
            animation: "fadeIn 0.4s ease",
          }}>
            <p style={{ fontSize: 14, color: "#E2E8F0", lineHeight: 1.75, margin: 0 }}>
              {MENSAGENS_PERSONA[persona]}
            </p>
          </div>
        )}

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "#475569", position: "relative", zIndex: 1 }}>
          Você pode trocar seu perfil a qualquer momento aqui na página inicial.
        </p>
      </section>

      {/* ── PARCEIROS ── */}
      <section style={{ padding: "48px clamp(24px, 6vw, 72px)", borderTop: "1px solid #E2E8F0", background: "#fff" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#CBD5E1", textAlign: "center", marginBottom: 28, textTransform: "uppercase" }}>
          Parceiros & Fontes de Dados
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "16px 40px" }}>
          {PARCEIROS.map((p) => (
            <span key={p} style={{ fontSize: 13, fontWeight: 700, color: "#CBD5E1", letterSpacing: "0.04em" }}>{p}</span>
          ))}
        </div>
      </section>

      {/* ── DESCRIÇÃO ── */}
      <section style={{ padding: "72px clamp(24px, 6vw, 72px)", maxWidth: 800, margin: "0 auto" }}>
        <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#E84C1F", textTransform: "uppercase", marginBottom: 16 }}>
          Sobre a plataforma
        </span>
        <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 700, color: "#1A2744", marginBottom: 24, lineHeight: 1.3 }}>
          A Plataforma Interativa de Descarbonização
        </h2>
        <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.9, marginBottom: 18 }}>
          É um hub digital desenvolvido pelo{" "}
          <strong style={{ color: "#1A2744" }}>Instituto E+ Transição Energética</strong> que
          conecta o planejamento industrial verde a dados de infraestrutura energética.
        </p>
        <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.9 }}>
          Conta com mapas interativos organizados em camadas que viabilizam o alinhamento
          estratégico entre o desenvolvimento industrial e o planejamento de infraestrutura,
          identificando locais promissores para investimento em tecnologias de baixo carbono.
        </p>
        <button
          onClick={() => setPagina("infraestrutura")}
          style={{ marginTop: 36, padding: "13px 28px", borderRadius: 99, background: "#1A2744", color: "#fff", fontWeight: 600, fontSize: 13, border: "none", cursor: "pointer", transition: "background 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#263659"}
          onMouseLeave={e => e.currentTarget.style.background = "#1A2744"}
        >
          Ver o mapa →
        </button>
      </section>

    </div>
  );
}