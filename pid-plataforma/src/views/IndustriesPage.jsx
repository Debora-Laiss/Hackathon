  import { useState } from "react";
  import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
  import { MapaBrasil } from "../components/BaseComponents";
  import { TIPOS, ESTADOS, TIPO_COR } from "../models/data";
  import { useIndustriasController } from "../controllers/controllers";

  export function PaginaIndustrias({ persona }) {
    const {
      tipo, estado, busca, ordem,
      setTipo, setEstado, setBusca, setOrdem,
      filtradas, chartData, dotsIndustria,
      kpiPrincipal, kpiSec,
      config,
    } = useIndustriasController(persona);

  const [sheet, setSheet] = useState("peek");
  const [abaSheet, setAbaSheet] = useState("lista");
  const [painelAberto, setPainelAberto] = useState(false);

    return (
      <div style={{ height: "calc(100vh - 3.5rem)", position: "relative", overflow: "hidden" }}>

        {/* MAPA — zIndex 0 */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <MapaBrasil dots={dotsIndustria} titulo="Localização das Indústrias" />
        </div>

      {/* ── PAINEL LATERAL — só desktop — zIndex 500 ── */}
      {painelAberto && (
        <div
          className="hidden md:flex"
          style={{
            position: "absolute", top: 0, right: 0, bottom: 0,
            width: 300, background: "#F8FAFC",
            borderLeft: "1px solid #E2E8F0",
            flexDirection: "column", zIndex: 500, overflow: "hidden",
          }}
        >
          <div style={{ padding: "12px 12px 8px", background: "#fff", borderBottom: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1A2744" }}>Indústrias</span>
              <button
                onClick={() => setPainelAberto(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", fontSize: 20, lineHeight: 1 }}
              >×</button>
            </div>

            {/* KPIs — ficam só aqui dentro, não flutuam */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ background: config?.bannerCor || "#1A2744", borderRadius: 12, padding: "10px 12px", gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 10, color: config?.bannerCorTexto || "#7DD3FC", opacity: 0.85, marginBottom: 2 }}>{kpiPrincipal.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{kpiPrincipal.valor}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{kpiPrincipal.sub}</div>
              </div>
              <div style={{ background: "#E84C1F", borderRadius: 12, padding: "10px 12px" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{kpiSec.valor}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{kpiSec.label}</div>
              </div>
              <div style={{ background: "#F1F5F9", borderRadius: 12, padding: "10px 12px" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#1A2744", lineHeight: 1 }}>{new Set(filtradas.map(i => i.estado)).size}</div>
                <div style={{ fontSize: 10, color: "#64748B", marginTop: 2 }}>estados</div>
              </div>
            </div>

            {/* Tipos */}
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {TIPOS.map((t) => (
                <button key={t} onClick={() => setTipo(t)} style={{
                  padding: "4px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600,
                  border: "none", cursor: "pointer",
                  background: tipo === t ? "#1A2744" : "#F1F5F9",
                  color: tipo === t ? "#fff" : "#475569",
                }}>{t}</button>
              ))}
            </div>

            {/* Estado + busca */}
            <div style={{ display: "flex", gap: 6 }}>
              <select value={estado} onChange={(e) => setEstado(e.target.value)}
                style={{ flex: "0 0 80px", padding: "6px 8px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12, background: "#fff" }}>
                {ESTADOS.map((s) => <option key={s}>{s}</option>)}
              </select>
              <div style={{ position: "relative", flex: 1 }}>
                <input value={busca} onChange={(e) => setBusca(e.target.value)}
                  placeholder="🔍 Buscar..."
                  style={{ width: "100%", padding: "6px 10px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12, boxSizing: "border-box" }} />
                {busca && (
                  <button onClick={() => setBusca("")} style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8", fontSize: 16 }}>×</button>
                )}
              </div>
            </div>

            {/* Ordenação */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 11, color: "#94A3B8" }}>Ordenar:</span>
              {[["consumo", "Consumo"], ["nome", "Nome A–Z"]].map(([val, lbl]) => (
                <button key={val} onClick={() => setOrdem(val)} style={{
                  fontSize: 11, fontWeight: 600, border: "none", background: "none", cursor: "pointer",
                  color: ordem === val ? "#E84C1F" : "#94A3B8",
                  textDecoration: ordem === val ? "underline" : "none",
                }}>{lbl}</button>
              ))}
            </div>
          </div>

          {/* Lista */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {filtradas.length === 0
              ? <div style={{ padding: 32, textAlign: "center", fontSize: 13, color: "#94A3B8" }}>Nenhuma indústria encontrada</div>
              : filtradas.map((ind) => (
                <div key={ind.id}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderBottom: "1px solid #F1F5F9", background: "#fff", cursor: "pointer" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#FFF5F2"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
                >
                  <span style={{ width: 9, height: 9, borderRadius: "50%", flexShrink: 0, background: TIPO_COR[ind.tipo] || "#ccc" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#1A2744", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ind.nome}</p>
                    <p style={{ fontSize: 10, color: "#94A3B8", margin: 0 }}>{ind.tipo} · {ind.cidade}/{ind.estado}</p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color: "#1A2744", margin: 0 }}>{ind.consumo}k</p>
                    <p style={{ fontSize: 10, color: "#94A3B8", margin: 0 }}>MWh</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* CTA persona */}
          {config?.ctaLabel && (
            <div style={{ padding: "10px 12px", borderTop: "1px solid #E2E8F0", background: "#fff" }}>
              <button style={{
                width: "100%", padding: "8px 12px", borderRadius: 10, fontSize: 11, fontWeight: 700,
                cursor: "pointer", border: `1px solid ${config.bannerCorTexto}44`,
                background: config.bannerCor + "18", color: config.bannerCor,
              }}>{config.ctaLabel}</button>
            </div>
          )}

          {/* Gráfico desktop */}
          <div style={{ borderTop: "1px solid #E2E8F0", background: "#fff", padding: "10px 12px", height: 170, flexShrink: 0 }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8", marginBottom: 6 }}>Consumo por tipo</p>
            <ResponsiveContainer width="100%" height={130}>
              <BarChart data={chartData} layout="vertical" margin={{ left: 60, right: 16, top: 0, bottom: 0 }}>
                <XAxis type="number" tickFormatter={(v) => `${v}k`} tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="nome" tick={{ fontSize: 10 }} width={60} />
                <Tooltip formatter={(v) => [`${v.toLocaleString("pt-BR")} MWh`, "Consumo"]} />
                <Bar dataKey="valor" radius={[0, 4, 4, 0]}>
                  {chartData.map((d) => <Cell key={d.nome} fill={d.cor} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        </div>
      )}

      {/* Botão abrir painel — desktop — zIndex 501 */}
      {!painelAberto && (
        <button
          onClick={() => setPainelAberto(true)}
          className="hidden md:block"
          style={{
            position: "absolute", top: 12, right: 12,
            padding: "8px 16px", borderRadius: 12,
            background: "#fff", border: "1px solid #E2E8F0",
            fontSize: 13, fontWeight: 700, color: "#1A2744",
            cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 501,
          }}
        >☰ Indústrias</button>
      )}

      {/* ── BOTTOM SHEET — só mobile — zIndex 500 ── */}
      <div
        className="md:hidden"
        style={{
          position: "absolute", left: 0, right: 0, bottom: 0,
          height: sheet === "aberto" ? "85vh" : 56,
          transition: "height 0.35s cubic-bezier(0.4,0,0.2,1)",
          background: "#fff",
          borderRadius: "18px 18px 0 0",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.14)",
          zIndex: 500,
          display: "flex", flexDirection: "column", overflow: "hidden",
        }}
      >
        <div
          className="md:hidden"
          style={{
            position: "absolute", left: 0, right: 0, bottom: 0,
            height: sheet === "aberto" ? "72vh" : 56,
            transition: "height 0.35s cubic-bezier(0.4,0,0.2,1)",
            background: "#fff",
            borderRadius: "18px 18px 0 0",
            boxShadow: "0 -4px 24px rgba(0,0,0,0.14)",
            zIndex: 500,
            display: "flex", flexDirection: "column", overflow: "hidden",
          }}
        >
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "#E2E8F0", margin: "0 auto 10px" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1A2744" }}>
              {sheet === "aberto" ? "Indústrias" : `${filtradas.length} indústrias — toque para ver`}
            </span>
            {sheet === "aberto" ? (
              <button
                onClick={(e) => { e.stopPropagation(); setSheet("peek"); }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", fontSize: 20, lineHeight: 1, padding: 0 }}
              >×</button>
            ) : (
              <span style={{ fontSize: 18, color: "#94A3B8" }}>↑</span>
            )}
          </div>

          {sheet === "aberto" && (
            <>
              {/* KPIs no topo do sheet mobile */}
              <div style={{ display: "flex", gap: 8, padding: "0 16px 10px", flexShrink: 0 }}>
                <div style={{ flex: 1, background: config?.bannerCor || "#1A2744", borderRadius: 10, padding: "8px 12px" }}>
                  <div style={{ fontSize: 9, color: config?.bannerCorTexto || "#7DD3FC", opacity: 0.85 }}>{kpiPrincipal.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{kpiPrincipal.valor}</div>
                </div>
                <div style={{ flex: "0 0 auto", background: "#E84C1F", borderRadius: 10, padding: "8px 12px" }}>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.75)" }}>{kpiSec.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{kpiSec.valor}</div>
                </div>
              </div>

              {/* Abas Lista / Filtros */}
              <div style={{ display: "flex", gap: 4, padding: "0 16px 8px", flexShrink: 0 }}>
                {[["lista", "Lista"], ["filtros", "Filtros"]].map(([id, lbl]) => (
                  <button key={id} onClick={() => setAbaSheet(id)} style={{
                    flex: 1, padding: "7px 0", borderRadius: 8, fontSize: 12, fontWeight: 600,
                    border: "none", cursor: "pointer",
                    background: abaSheet === id ? "#1A2744" : "#F1F5F9",
                    color: abaSheet === id ? "#fff" : "#94A3B8",
                  }}>{lbl}</button>
                ))}
              </div>
            </>
          )}

          <div style={{ flex: 1, overflowY: "auto" }}>
            {abaSheet === "lista" && (
              <>
                {filtradas.length === 0
                  ? <div style={{ padding: 32, textAlign: "center", fontSize: 13, color: "#94A3B8" }}>Nenhuma encontrada</div>
                  : filtradas.map((ind) => (
                    <div key={ind.id}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", borderBottom: "1px solid #F1F5F9" }}
                    >
                      <span style={{ width: 10, height: 10, borderRadius: "50%", flexShrink: 0, background: TIPO_COR[ind.tipo] || "#ccc" }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: "#1A2744", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ind.nome}</p>
                        <p style={{ fontSize: 11, color: "#94A3B8", margin: 0 }}>{ind.tipo} · {ind.cidade}/{ind.estado}</p>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 800, color: "#1A2744", margin: 0 }}>{ind.consumo}k</p>
                        <p style={{ fontSize: 10, color: "#94A3B8", margin: 0 }}>MWh</p>
                      </div>
                    </div>
                  ))
                }
              </>
            )}

            {abaSheet === "filtros" && (
              <div style={{ padding: "8px 16px 32px" }}>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>Tipo</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {TIPOS.map((t) => (
                      <button key={t} onClick={() => setTipo(t)} style={{
                        padding: "8px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                        border: "none", cursor: "pointer",
                        background: tipo === t ? "#1A2744" : "#F1F5F9",
                        color: tipo === t ? "#fff" : "#475569",
                      }}>{t}</button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Estado</label>
                  <select value={estado} onChange={(e) => setEstado(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 14, background: "#fff" }}>
                    {ESTADOS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Busca</label>
                  <input value={busca} onChange={(e) => setBusca(e.target.value)}
                    placeholder="Empresa ou cidade..."
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 14, boxSizing: "border-box" }} />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>Ordenar por</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[["consumo", "Maior consumo"], ["nome", "Nome A–Z"]].map(([val, lbl]) => (
                      <button key={val} onClick={() => setOrdem(val)} style={{
                        flex: 1, padding: "10px 0", borderRadius: 10, fontSize: 12, fontWeight: 600,
                        border: `1.5px solid ${ordem === val ? "#E84C1F" : "#E2E8F0"}`,
                        background: ordem === val ? "#FFF5F2" : "#F8FAFC",
                        color: ordem === val ? "#E84C1F" : "#94A3B8",
                        cursor: "pointer",
                      }}>{lbl}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }