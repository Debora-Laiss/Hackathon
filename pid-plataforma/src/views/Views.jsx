// ── VIEWS ──────────────────────────────────────────────────────
// Responsáveis exclusivamente pela renderização. Recebem dados e callbacks via props.

import React from "react";
import { PARCEIROS } from "../models/data";

// ── PaginaInicio ───────────────────────────────────────────────
export function PaginaInicio({ setPagina }) {
  const destaques = [
    "Cobertura ampliada de setores e regiões",
    "Novas camadas de dados",
    "Indicadores de transição energética por estado",
    "Atlas do Futuro Industrial do Brasil",
  ];

  return (
    <div style={{ height:"calc(100vh - 56px)", overflowY:"auto" }}>
      <div style={{ display:"flex", minHeight:"calc(100vh - 56px)" }}>
        {/* Coluna esquerda */}
        <div style={{
          flex:1, display:"flex", flexDirection:"column", justifyContent:"center",
          padding:"60px 56px", background:"#e9ecf1ff",
        }}>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", color:"#E84C1F", textTransform:"uppercase", marginBottom:16 }}>
            Versão 3.0 · COP30
          </span>
          <h1 style={{ fontSize:46, fontWeight:800, lineHeight:1.05, color:"#1A2744", margin:"0 0 18px", letterSpacing:"-0.02em", fontFamily:"'Sora',sans-serif" }}>
            Plataforma<br/>Interativa de<br/>Descarbonização
          </h1>
          <p style={{ fontSize:15, color:"#64748B", marginBottom:20, maxWidth:360 }}>
            Um novo olhar para o futuro da transição energética no Brasil.
          </p>
          <div style={{ marginBottom:32 }}>
            {destaques.map((t) => (
              <div key={t} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, fontSize:13, color:"#475569" }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#E84C1F", flexShrink:0 }} />
                {t}
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <button onClick={() => setPagina("infraestrutura")} style={{
              padding:"12px 26px", borderRadius:99, background:"#E84C1F", color:"#fff",
              fontWeight:700, fontSize:13, border:"none", cursor:"pointer",
              boxShadow:"0 4px 14px rgba(232,76,31,0.35)",
            }}>Explorar Plataforma →</button>
            <button onClick={() => setPagina("saiba")} style={{
              padding:"12px 26px", borderRadius:99, border:"2px solid #1A2744",
              background:"none", color:"#1A2744", fontWeight:600, fontSize:13, cursor:"pointer",
            }}>Saiba mais</button>
          </div>
        </div>

        {/* Coluna direita (visual) */}
        <div style={{
          flex:1, position:"relative",
          background:"linear-gradient(145deg,#1A2744 0%,#263659 50%,#b83d12 100%)",
          display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
        }}>
          <svg viewBox="0 0 400 400" style={{ position:"absolute", width:"90%", opacity:0.1 }}>
            {[160,120,80,40].map((r) => (
              <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="white" strokeWidth="1" />
            ))}
            {Array.from({ length:12 }, (_, i) => i * 30).map((a) => (
              <line key={a} x1="200" y1="200"
                x2={200 + 160 * Math.cos(a * Math.PI / 180)}
                y2={200 + 160 * Math.sin(a * Math.PI / 180)}
                stroke="white" strokeWidth="0.5" />
            ))}
          </svg>
          <div style={{ textAlign:"center", color:"#fff", padding:32 }}>
            <div style={{ fontSize:72, marginBottom:16, opacity:0.8 }}>🌿</div>
            <p style={{ fontSize:18, fontWeight:300, opacity:0.7, lineHeight:1.5 }}>
              Transição Energética<br/>Industrial no Brasil
            </p>
            <p style={{ fontSize:12, opacity:0.4, marginTop:12 }}>Instituto E+ · Net Zero · Johns Hopkins</p>
          </div>
        </div>
      </div>

      {/* Parceiros */}
      <div style={{ padding:"40px 56px", borderTop:"1px solid #E2E8F0", background:"#fff" }}>
        <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:"#CBD5E1", textAlign:"center", marginBottom:24, textTransform:"uppercase" }}>
          Parceiros & Fontes de Dados
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center", gap:36 }}>
          {PARCEIROS.map((p) => (
            <span key={p} style={{ fontSize:14, fontWeight:700, color:"#CBD5E1" }}>{p}</span>
          ))}
        </div>
      </div>

      {/* Descrição */}
      <div style={{ padding:"60px 56px", maxWidth:740, margin:"0 auto" }}>
        <h2 style={{ fontSize:22, fontWeight:700, color:"#1A2744", marginBottom:20 }}>
          A Plataforma Interativa de Descarbonização
        </h2>
        <p style={{ fontSize:14, color:"#64748B", lineHeight:1.8, marginBottom:16 }}>
          É um hub digital desenvolvido pelo <strong>Instituto E+ Transição Energética</strong> que
          conecta o planejamento industrial verde a dados de infraestrutura energética.
        </p>
        <p style={{ fontSize:14, color:"#64748B", lineHeight:1.8 }}>
          Conta com mapas interativos organizados em camadas que viabilizam o alinhamento estratégico
          entre o desenvolvimento industrial e o planejamento de infraestrutura, identificando locais
          promissores para investimento em tecnologias de baixo carbono.
        </p>
      </div>
    </div>
  );
}

