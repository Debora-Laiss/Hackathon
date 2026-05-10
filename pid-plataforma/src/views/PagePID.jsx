import React from "react";
import { Toggle, MapaBrasil } from "../components/BaseComponents";
import { usePIDController } from "../controllers/controllers";
import { DOTS_BASE } from "../models/data";

function useToast() {
  const [msg, setMsg] = React.useState(null);
  const show = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(null), 2500);
  };
  const Toast = msg ? (
    <div style={{
      position: "absolute",
      bottom: 80, left: "50%", transform: "translateX(-50%)",
      background: "#1A2744", color: "#fff",
      borderRadius: 12, padding: "10px 24px",
      fontSize: 13, fontWeight: 600,
      zIndex: 9999,
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      pointerEvents: "none", whiteSpace: "nowrap",
    }}>{msg}</div>
  ) : null;
  return { show, Toast };
}

// Mapeia cada camada PID → cor dos dots no DOTS_BASE
const COR_MAP = {
  pid_eol:  "#06B6D4",  // eólica
  pid_sol:  "#F59E0B",  // solar
  pid_hid:  "#3B82F6",  // hídrica
  pid_bio:  "#22C55E",  // biomassa
  pid_term: "#8B5CF6",  // térmica
  pid_tens: "#E84C1F",  // subestações
};

export function PaginaPID({ persona }) {
  const {
    camadas, painelAberto, busca, aba,
    setPainelAberto, setBusca, setAba,
    toggleCamada, toggleTodas,
    grupos, visiveis, qtdAtivas,
    config,
  } = usePIDController(persona);

  const { show, Toast } = useToast();

  // Calcula quais cores estão ativas com base nos toggles
  const coresAtivas = new Set(
    camadas
      .filter((c) => c.ativa && COR_MAP[c.id])
      .map((c) => COR_MAP[c.id])
  );

  // Filtra DOTS_BASE pelas cores ativas
  const dots = coresAtivas.size > 0
    ? DOTS_BASE.filter((d) => coresAtivas.has(d.c))
    : [];

  // Camada de curtailment separada
  const showCurtailment = camadas.find((c) => c.id === "pid_cur")?.ativa ?? false;

  return (
    <div style={{ height: "calc(100vh - 3.5rem)", position: "relative", overflow: "hidden" }}>

      {/* MAPA */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <MapaBrasil dots={dots} showCurtailment={showCurtailment} />
      </div>

      {/* Overlay mobile */}
      {painelAberto && (
        <div
          onClick={() => setPainelAberto(false)}
          style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 490,
          }}
        />
      )}

      {/* restante do JSX igual ao original... */}

      {/* Painel drawer — zIndex 500 */}
      <div
        style={{
          position: "absolute",
          top: 0, bottom: 0,
          right: painelAberto ? 0 : -290,
          width: 290,
          transition: "right 0.3s ease",
          background: "#fff",
          boxShadow: painelAberto ? "-4px 0 20px rgba(0,0,0,0.15)" : "none",
          zIndex: 500,
          display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header do painel */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 16px 10px",
          borderBottom: "1px solid #F1F5F9", flexShrink: 0,
        }}>
          <div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1A2744" }}>Camadas de Mapa</span>
            {/* Badge persona no header do painel */}
            {config?.bannerTitulo && (
              <div style={{ fontSize: 10, color: config.bannerCor, fontWeight: 600, marginTop: 2 }}>
                {config.icon && <span style={{ marginRight: 4 }}>{config.icon}</span>}
                {config.bannerTitulo}
              </div>
            )}
          </div>
          <button
            onClick={() => setPainelAberto(false)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", fontSize: 20, lineHeight: 1 }}
          >×</button>
        </div>

        {/* Abas Camadas / Legenda */}
        <div style={{ padding: "10px 16px 0", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 4, background: "#F1F5F9", borderRadius: 10, padding: 4 }}>
            {[["camadas", "Camadas"], ["legenda", "Legenda"]].map(([id, lbl]) => (
              <button key={id} onClick={() => setAba(id)} style={{
                flex: 1, padding: "6px 0", borderRadius: 7,
                fontSize: 12, fontWeight: 600,
                border: "none", cursor: "pointer", transition: "all 0.15s",
                background: aba === id ? "#fff" : "transparent",
                color: aba === id ? "#1A2744" : "#94A3B8",
                boxShadow: aba === id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}>{lbl}</button>
            ))}
          </div>
        </div>

        {/* Conteúdo do painel */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", padding: "10px 16px 0" }}>
          {aba === "camadas" && (
            <>
              <input
                value={busca} onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar camada..."
                style={{ width: "100%", padding: "7px 12px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12, marginBottom: 8, boxSizing: "border-box" }}
              />

              <div style={{ display: "flex", gap: 6, marginBottom: 10, flexShrink: 0 }}>
                <button onClick={() => toggleTodas(true)} style={{
                  flex: 1, padding: "6px 0", borderRadius: 8, fontSize: 11, fontWeight: 700,
                  border: "none", cursor: "pointer", background: "#F0FDF4", color: "#16A34A",
                }}>✓ Ativar todas</button>
                <button onClick={() => toggleTodas(false)} style={{
                  flex: 1, padding: "6px 0", borderRadius: 8, fontSize: 11, fontWeight: 700,
                  border: "none", cursor: "pointer", background: "#FEF2F2", color: "#DC2626",
                }}>✕ Desativar</button>
              </div>

              <div style={{ flex: 1, overflowY: "auto" }}>
                {grupos.map((g) => {
                  const gl = visiveis.filter((c) => c.grupo === g);
                  if (!gl.length) return null;
                  return (
                    <div key={g} style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#CBD5E1", marginBottom: 4 }}>{g}</div>
                      {gl.map((c) => (
                        <div key={c.id} onClick={() => toggleCamada(c.id)}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "7px 8px", borderRadius: 8, cursor: "pointer", marginBottom: 2,
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <span style={{ fontSize: 12, color: c.ativa ? "#1A2744" : "#94A3B8", fontWeight: c.ativa ? 500 : 400, flex: 1, paddingRight: 8 }}>
                            {c.nome}
                          </span>
                          <Toggle checked={c.ativa} onChange={() => toggleCamada(c.id)} />
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

              <div style={{
                padding: "8px 0", textAlign: "center", fontSize: 12, color: "#0369A1",
                fontWeight: 600, background: "#F0F9FF", borderRadius: 10, margin: "8px 0", flexShrink: 0,
              }}>
                {qtdAtivas}/{camadas.length} camadas ativas
              </div>
            </>
          )}

          {aba === "legenda" && (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10 }}>
              <span style={{ fontSize: 32 }}>🗂️</span>
              <p style={{ fontSize: 13, color: "#94A3B8", textAlign: "center" }}>
                Ative camadas para visualizar a legenda completa.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Botão abrir painel — zIndex 501 */}
      {!painelAberto && (
        <button
          onClick={() => setPainelAberto(true)}
          style={{
            position: "absolute", top: 12, right: 12,
            padding: "8px 16px", borderRadius: 12,
            background: "#fff", border: "1px solid #E2E8F0",
            fontSize: 13, fontWeight: 700, color: "#1A2744",
            cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 501,
          }}
        >☰ Camadas</button>
      )}

      {/* Toolbar inferior — zIndex 501 — esconde no mobile quando painel aberto */}
      {!painelAberto && (
        <div className="lg:hidden" style={{
          position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
          background: "rgba(255,255,255,0.97)", borderRadius: 20,
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
          display: "flex", gap: 0, padding: "4px 6px",
          zIndex: 501,
          maxWidth: "calc(100vw - 32px)",
        }}>
          {Toast}

          {[["🗺️", "Base"], ["☰", "Camadas"], ["📏", "Medir"], ["💾", "Salvar"]].map(([icon, lbl]) => (
            <button key={lbl}
              onClick={() => {
                if (lbl === "Camadas") {
                  setPainelAberto(true);
                } else {
                  show("Funcionalidade em breve");
                }
              }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                padding: "8px 12px", background: "none", border: "none", cursor: "pointer",
                color: "#1A2744", fontSize: 10, fontWeight: 600,
              }}
            >
              <span style={{ fontSize: 18 }}>{icon}</span>
              <span>{lbl}</span>
            </button>
          ))}
        </div>
      )}

      {/* Toolbar desktop — sempre visível */}
      <div className="hidden lg:flex" style={{
        position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
        background: "rgba(255,255,255,0.97)", borderRadius: 20,
        boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
        gap: 0, padding: "4px 6px",
        zIndex: 501,
        maxWidth: "calc(100vw - 32px)",
      }}>
        {Toast}

        {[["🗺️", "Base"], ["☰", "Camadas"], ["📏", "Medir"], ["💾", "Salvar"]].map(([icon, lbl]) => (
          <button key={lbl}
            onClick={() => {
              if (lbl === "Camadas") {
                setPainelAberto(!painelAberto);
              } else {
                show("Funcionalidade em breve");
              }
            }}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              padding: "6px 10px", borderRadius: 14, border: "none",
              background: "none", cursor: "pointer", transition: "background 0.15s", flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F1F5F9")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <span style={{ fontSize: 16 }}>{icon}</span>
            <span style={{ fontSize: 10, color: "#475569", fontWeight: 500, whiteSpace: "nowrap" }}>{lbl}</span>
          </button>
        ))}

        {/* CTA persona — só aparece se a persona tiver ctaLabel */}
        {config?.ctaLabel && (
          <>
            <div style={{ width: 1, background: "#E2E8F0", margin: "6px 4px" }} />
            <button
              onClick={() => show("Funcionalidade em breve")}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                padding: "6px 12px", borderRadius: 14,
                border: "none", cursor: "pointer",
                background: config.bannerCor + "18",
                color: config.bannerCor,
                fontSize: 10, fontWeight: 700,
                flexShrink: 0, maxWidth: 120, textAlign: "center", lineHeight: 1.3,
              }}
            >
              <span style={{ fontSize: 14 }}>{config.icon}</span>
              <span style={{ whiteSpace: "normal" }}>{config.ctaLabel}</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}