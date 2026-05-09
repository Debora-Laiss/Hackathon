import React from "react";
import { PARCEIROS } from "../models/data";

export function PaginaSaibaMais() {
  return (
    <div style={{ height:"calc(100vh - 56px)", overflowY:"auto" }}>
      <div style={{ position:"relative", background:"linear-gradient(135deg,#1A2744,#263659 60%,#b83d12)", minHeight:360, overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 0,rgba(255,255,255,0.03) 1px,transparent 0,transparent 50%)", backgroundSize:"24px 24px" }} />
        <div style={{ position:"relative", padding:"72px 56px" }}>
          <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", color:"#fca5a5", textTransform:"uppercase", marginBottom:12 }}>Guia do Usuário PID</p>
          <h1 style={{ fontSize:40, fontWeight:800, color:"#fff", margin:"0 0 18px", letterSpacing:"-0.02em", fontFamily:"'Sora',sans-serif", lineHeight:1.1 }}>
            Referências e<br/>links úteis
          </h1>
          <p style={{ fontSize:14, color:"rgba(191,219,254,0.8)", maxWidth:480, lineHeight:1.8, marginBottom:32 }}>
            A metodologia da plataforma possibilita a sobreposição de diferentes mapas ou camadas para
            identificar visualmente pontos favoráveis à descarbonização do setor industrial.
          </p>
          <button onClick={() => window.open("https://emaisenergia.org/pid", "_blank")} style={{ padding:"12px 32px", borderRadius:99, background:"#E84C1F", color:"#fff", fontWeight:700, fontSize:14, border:"none", cursor:"pointer", boxShadow:"0 4px 16px rgba(232,76,31,0.4)" }}>
            LEIA-ME →
          </button>
        </div>
      </div>

      <div style={{ padding:"56px", borderBottom:"1px solid #E2E8F0", background:"#fff" }}>
        <h2 style={{ fontSize:20, fontWeight:700, textAlign:"center", color:"#1A2744", marginBottom:32 }}>Fonte de dados</h2>
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center", gap:16 }}>
          {PARCEIROS.map((p) => (
            <div key={p} style={{ padding:"10px 20px", borderRadius:10, border:"1.5px solid #E2E8F0", fontSize:13, fontWeight:700, color:"#64748B" }}>{p}</div>
          ))}
        </div>
      </div>

      <div style={{ padding:"48px 56px" }}>
        <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#94A3B8", marginBottom:12 }}>Citar como:</p>
        <p style={{ fontSize:13, color:"#64748B", lineHeight:1.9, maxWidth:640 }}>
          LEITE, Clauber; PEYERL, Drielli; BRUNO, Karine Batista; ZACHARIAS, Luis Guilherme; et al.{" "}
          <em style={{ fontStyle:"normal", fontWeight:700, color:"#1A2744" }}>Plataforma Interativa de Descarbonização (PID)</em>.
          {" "}Disponível em: https://emaisenergia.org/pid
        </p>
      </div>
    </div>
  );
}
