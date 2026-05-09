import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { MapaBrasil } from "../components/BaseComponents";
import { TIPOS, ESTADOS, TIPO_COR } from "../models/data";
import { useIndustriasController } from "../controllers/controllers";

export function PaginaIndustrias() {
  const {
    tipo, estado, busca, ordem,
    setTipo, setEstado, setBusca, setOrdem,
    filtradas, total, chartData, dotsIndustria,
  } = useIndustriasController();

  return (
    <div style={{ height:"calc(100vh - 56px)", display:"flex", flexDirection:"column", overflow:"hidden" }}>
      {/* Barra de filtros */}
      <div style={{
        padding:"10px 20px", borderBottom:"1px solid #E2E8F0", background:"#fff",
        display:"flex", alignItems:"center", gap:12, flexWrap:"wrap",
        boxShadow:"0 1px 4px rgba(0,0,0,0.04)",
      }}>
        <span style={{ fontSize:11, fontWeight:700, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.08em", flexShrink:0 }}>Tipo:</span>
        <div style={{ display:"flex", gap:5, flexWrap:"wrap", flex:1 }}>
          {TIPOS.map((t) => (
            <button key={t} onClick={() => setTipo(t)} style={{
              padding:"4px 12px", borderRadius:99, fontSize:12, fontWeight:600,
              border:"none", cursor:"pointer", transition:"all 0.15s",
              background: tipo === t ? "#1A2744" : "#F1F5F9",
              color:      tipo === t ? "#fff"    : "#475569",
            }}>{t}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center", marginLeft:"auto" }}>
          <select value={estado} onChange={(e) => setEstado(e.target.value)}
            style={{ padding:"6px 10px", borderRadius:8, border:"1px solid #E2E8F0", fontSize:12, background:"#fff", color:"#1A2744" }}>
            {ESTADOS.map((s) => <option key={s}>{s}</option>)}
          </select>
          <div style={{ position:"relative" }}>
            <input value={busca} onChange={(e) => setBusca(e.target.value)}
              placeholder="🔍  Buscar empresa ou cidade..."
              style={{ padding:"6px 10px", borderRadius:8, border:"1px solid #E2E8F0", fontSize:12, width:210 }} />
            {busca && (
              <button onClick={() => setBusca("")} style={{
                position:"absolute", right:8, top:"50%", transform:"translateY(-50%)",
                background:"none", border:"none", cursor:"pointer", color:"#94A3B8", fontSize:16,
              }}>×</button>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
        {/* Mapa + gráfico */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          <div style={{ flex:1, minHeight:0 }}>
            <MapaBrasil dots={dotsIndustria} titulo="Localização das Indústrias" />
          </div>
          <div style={{ borderTop:"1px solid #E2E8F0", background:"#fff", padding:"12px 16px", height:185 }}>
            <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:"#94A3B8", marginBottom:8 }}>
              Consumo (MWh) por tipo de indústria
            </p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={chartData} layout="vertical" margin={{ left:65, right:20, top:0, bottom:0 }}>
                <XAxis type="number" tickFormatter={(v) => `${v}k`} tick={{ fontSize:10 }} />
                <YAxis type="category" dataKey="nome" tick={{ fontSize:11 }} width={65} />
                <Tooltip formatter={(v) => [`${v.toLocaleString("pt-BR")} MWh`, "Consumo"]} />
                <Bar dataKey="valor" radius={[0,4,4,0]}>
                  {chartData.map((d) => <Cell key={d.nome} fill={d.cor} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPIs + lista */}
        <div style={{ width:296, display:"flex", flexDirection:"column", borderLeft:"1px solid #E2E8F0", background:"#F8FAFC", overflow:"hidden" }}>
          {/* KPIs */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, padding:"12px 12px 8px", background:"#fff", borderBottom:"1px solid #E2E8F0" }}>
            <div style={{ background:"#1A2744", borderRadius:12, padding:"12px 14px" }}>
              <div style={{ fontSize:22, fontWeight:800, color:"#fff", lineHeight:1 }}>
                {total.toLocaleString("pt-BR")}
                <span style={{ fontSize:11, fontWeight:400, opacity:.6, marginLeft:3 }}>k</span>
              </div>
              <div style={{ fontSize:10, color:"#7DD3FC", marginTop:4 }}>MWh consumo total</div>
            </div>
            <div style={{ background:"#E84C1F", borderRadius:12, padding:"12px 14px" }}>
              <div style={{ fontSize:22, fontWeight:800, color:"#fff", lineHeight:1 }}>{filtradas.length}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.7)", marginTop:4 }}>indústrias</div>
            </div>
          </div>

          {/* Ordenação */}
          <div style={{ display:"flex", alignItems:"center", padding:"8px 14px", background:"#fff", borderBottom:"1px solid #E2E8F0", gap:10 }}>
            <span style={{ fontSize:11, color:"#94A3B8" }}>Ordenar:</span>
            {[["consumo","Consumo"],["nome","Nome A–Z"]].map(([val, lbl]) => (
              <button key={val} onClick={() => setOrdem(val)} style={{
                fontSize:11, fontWeight:600, border:"none", background:"none", cursor:"pointer",
                color: ordem === val ? "#E84C1F" : "#94A3B8",
                textDecoration: ordem === val ? "underline" : "none",
              }}>{lbl}</button>
            ))}
          </div>

          {/* Lista */}
          <div style={{ flex:1, overflowY:"auto" }}>
            {filtradas.length === 0 ? (
              <div style={{ padding:40, textAlign:"center", fontSize:13, color:"#94A3B8" }}>Nenhuma indústria encontrada</div>
            ) : filtradas.map((ind) => (
              <div key={ind.id} style={{
                display:"flex", alignItems:"center", gap:10, padding:"10px 14px",
                borderBottom:"1px solid #F1F5F9", background:"#fff", cursor:"pointer",
                transition:"background 0.1s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FFF5F2")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
              >
                <span style={{ width:10, height:10, borderRadius:"50%", flexShrink:0, background: TIPO_COR[ind.tipo] || "#ccc" }} />
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:11, fontWeight:700, color:"#1A2744", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ind.nome}</p>
                  <p style={{ fontSize:10, color:"#94A3B8", margin:0 }}>{ind.tipo} · {ind.cidade}/{ind.estado}</p>
                </div>
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <p style={{ fontSize:12, fontWeight:800, color:"#1A2744", margin:0 }}>{ind.consumo}k</p>
                  <p style={{ fontSize:10, color:"#94A3B8", margin:0 }}>MWh</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
