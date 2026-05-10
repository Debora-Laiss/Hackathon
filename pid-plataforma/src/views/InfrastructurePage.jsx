import { useState } from "react";
import { Toggle, MapaBrasil } from "../components/BaseComponents";
import { ESTADOS } from "../models/data";
import { useInfraestruturaController } from "../controllers/controllers";

export function PaginaInfraestrutura({ persona }) {
  const {
    camadas, estado, aberta,
    setEstado, setAberta,
    toggleCamada, ativas, categorias, dots, totalPontos,
    config,
  } = useInfraestruturaController(persona);

  const [sheet, setSheet] = useState("peek");

  return (
    <div style={{ height: "calc(100vh - 3.5rem)", position: "relative", overflow: "hidden" }}>

      {/* MAPA — zIndex 0 */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <MapaBrasil dots={dots} titulo="Infraestrutura Energética – Brasil" />
      </div>

      {/* ── SIDEBAR — só desktop ── */}
      <div
        className="hidden md:flex"
        style={{
          position: "absolute", top: 0, left: 0, bottom: 0,
          width: aberta ? 276 : 0,
          transition: "width 0.3s ease",
          overflow: "hidden",
          background: "#fff",
          borderRight: "1px solid #E2E8F0",
          flexDirection: "column",
          zIndex: 500,
          boxShadow: aberta ? "4px 0 20px rgba(0,0,0,0.12)" : "none",
        }}
      >
        <div style={{ width: 276, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {config?.bannerTitulo && (
            <div style={{
              margin: "14px 16px 0", borderRadius: 12, padding: "10px 12px",
              background: config.bannerCor + "22", border: `1px solid ${config.bannerCor}44`,
            }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: config.bannerCorTexto, margin: "0 0 2px" }}>{config.bannerTitulo}</p>
              <p style={{ fontSize: 11, color: config.bannerCorTexto, opacity: 0.8, margin: 0, lineHeight: 1.5 }}>{config.bannerTexto}</p>
            </div>
          )}

          <div style={{ flex: 1, overflowY: "auto", padding: "14px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1A2744" }}>Filtros & Camadas</span>
              <span style={{ fontSize: 11, fontWeight: 700, background: "#E84C1F", color: "#fff", borderRadius: 99, padding: "2px 8px" }}>
                {ativas.length} ativas
              </span>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Estado</label>
              <select value={estado} onChange={(e) => setEstado(e.target.value)}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12, background: "#fff", color: "#1A2744" }}>
                {ESTADOS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            {categorias.map((cat) => (
              <div key={cat} style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#CBD5E1", marginBottom: 6 }}>{cat}</div>
                {camadas.filter((c) => c.categoria === cat).map((c) => (
                  <div key={c.id} onClick={() => toggleCamada(c.id)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "8px 10px", borderRadius: 8, cursor: "pointer", marginBottom: 2,
                      background: c.ativa ? "#F8FAFC" : "transparent",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#F8FAFC"}
                    onMouseLeave={(e) => e.currentTarget.style.background = c.ativa ? "#F8FAFC" : "transparent"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: c.cor, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: c.ativa ? "#1A2744" : "#94A3B8", fontWeight: c.ativa ? 500 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.nome}</span>
                    </div>
                    <Toggle checked={c.ativa} onChange={() => toggleCamada(c.id)} />
                  </div>
                ))}
              </div>
            ))}

            <div style={{ background: "#F0F9FF", borderRadius: 12, padding: "12px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#1A2744" }}>{totalPontos.toLocaleString("pt-BR")}</div>
              <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>pontos visíveis</div>
            </div>
          </div>
        </div>
      </div>

      {/* Botão filtros — só desktop */}
      <button
        className="hidden md:block"
        onClick={() => setAberta(!aberta)}
        style={{
          position: "absolute", top: 12,
          left: aberta ? 288 : 12,
          transition: "left 0.3s ease",
          zIndex: 501,
          padding: "7px 14px", borderRadius: 10,
          background: "#fff", border: "1px solid #E2E8F0",
          fontSize: 12, fontWeight: 700, color: "#1A2744",
          cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        }}
      >
        {aberta ? "◀ Recolher" : "▶ Filtros"}
      </button>

      {/* Badge estado — zIndex 501 */}
      {estado !== "Todos" && (
        <div style={{
          position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
          background: "#1A2744", borderRadius: 99, padding: "6px 14px",
          display: "flex", alignItems: "center", gap: 8,
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)", zIndex: 501,
        }}>
          <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>📍 {estado}</span>
          <button onClick={() => setEstado("Todos")} style={{ color: "rgba(255,255,255,0.6)", background: "none", border: "none", cursor: "pointer", fontSize: 16 }}>×</button>
        </div>
      )}

      {/* ── BOTTOM SHEET — só mobile ──
          Usa position: absolute (não fixed!) dentro do container relativo.
          A classe md:hidden garante que some no desktop. */}
      <div
        className="md:hidden"
        style={{
          position: "absolute",
          left: 0, right: 0, bottom: 0,
          height: sheet === "aberto" ? "72vh" : 72,
          transition: "height 0.35s cubic-bezier(0.4,0,0.2,1)",
          background: "#fff",
          borderRadius: "18px 18px 0 0",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.18)",
          zIndex: 9999,
          display: "flex", flexDirection: "column", overflow: "hidden",
        }}
      >
        {/* Handle — área de toque grande */}
        <div
          onClick={() => setSheet(s => s === "aberto" ? "peek" : "aberto")}
          style={{
            padding: "12px 20px 10px", cursor: "pointer",
            flexShrink: 0, userSelect: "none",
            minHeight: 72, display: "flex", flexDirection: "column", justifyContent: "center",
          }}
        >
          <div style={{ width: 40, height: 5, borderRadius: 3, background: "#CBD5E1", margin: "0 auto 12px" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1A2744" }}>Filtros & Camadas</span>
              <span style={{
                marginLeft: 8, fontSize: 11, fontWeight: 700,
                background: "#E84C1F", color: "#fff",
                borderRadius: 99, padding: "2px 8px",
              }}>
                {ativas.length} ativas
              </span>
            </div>
            <span style={{ fontSize: 20, color: "#94A3B8" }}>{sheet === "aberto" ? "↓" : "↑"}</span>
          </div>
        </div>

        {/* Conteúdo scrollável */}
        <div style={{ flex: 1, overflowY: "auto", padding: "4px 16px 32px" }}>
          {config?.bannerTitulo && (
            <div style={{ borderRadius: 10, padding: "8px 12px", marginBottom: 12, background: config.bannerCor + "22", border: `1px solid ${config.bannerCor}44` }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: config.bannerCorTexto, margin: 0 }}>{config.bannerTitulo}</p>
            </div>
          )}

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Estado</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 14, background: "#fff" }}>
              {ESTADOS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          {categorias.map((cat) => (
            <div key={cat} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#CBD5E1", marginBottom: 8 }}>{cat}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {camadas.filter((c) => c.categoria === cat).map((c) => (
                  <button key={c.id} onClick={() => toggleCamada(c.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "10px 12px", borderRadius: 12, cursor: "pointer",
                      border: `1.5px solid ${c.ativa ? c.cor + "88" : "#E2E8F0"}`,
                      background: c.ativa ? c.cor + "18" : "#F8FAFC",
                      textAlign: "left", minHeight: 44,
                    }}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.cor, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontWeight: 500, color: c.ativa ? "#1A2744" : "#94A3B8", lineHeight: 1.3 }}>{c.nome}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div style={{ background: "#F0F9FF", borderRadius: 12, padding: "12px", textAlign: "center", marginTop: 4 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#1A2744" }}>{totalPontos.toLocaleString("pt-BR")}</div>
            <div style={{ fontSize: 11, color: "#64748B" }}>pontos no mapa</div>
          </div>
        </div>
      </div>
    </div>
  );
}