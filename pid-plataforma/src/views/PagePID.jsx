import React from "react";
import { Toggle, MapaBrasil } from "../components/BaseComponents";
import { usePIDController } from "../controllers/controllers";

// ── Toast ─────────────────────────────────────────────────────
function useToast() {
  const [msg, setMsg] = React.useState(null);
  const show = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(null), 2500);
  };
  const Toast = msg ? (
    <div style={{
      position:"fixed", bottom:32, left:"50%", transform:"translateX(-50%)",
      background:"#1A2744", color:"#fff", borderRadius:12, padding:"10px 24px",
      fontSize:13, fontWeight:600, zIndex:9999, boxShadow:"0 4px 20px rgba(0,0,0,0.2)",
      pointerEvents:"none",
    }}>{msg}</div>
  ) : null;
  return { show, Toast };
}

export function PaginaPID() {
  const {
    camadas, painelAberto, busca, aba,
    setPainelAberto, setBusca, setAba,
    toggleCamada, toggleTodas,
    grupos, visiveis, qtdAtivas,
  } = usePIDController();
  const { show, Toast } = useToast();

  return (
    <div style={{ height:"calc(100vh - 56px)", position:"relative", overflow:"hidden" }}>
      <MapaBrasil titulo="PID – Plataforma Interativa de Descarbonização" />

      {/* Overlay mobile */}
      {painelAberto && (
        <div 
          onClick={() => setPainelAberto(false)}
          className="lg:hidden"
          style={{
            position:"absolute", inset:0, background:"rgba(0,0,0,0.4)", zIndex:40,
            animation:"fadeIn 0.2s",
          }}
        />
      )}

      {/* Painel drawer responsivo */}
      <div className={`
        fixed lg:absolute
        ${painelAberto ? 'right-0' : '-right-full lg:-right-[280px]'}
        top-0 lg:top-3 bottom-0 lg:bottom-3 lg:right-3
        w-full max-w-[280px] lg:w-[280px]
        transition-all duration-300 ease-in-out
        bg-white rounded-none lg:rounded-2xl
        shadow-2xl lg:shadow-xl
        z-50 lg:z-10
        flex flex-col
      `} style={{ maxHeight: "100%" }}>
        <div style={{ display:"flex", flexDirection:"column", height:"100%", padding:16 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
            <span style={{ fontSize:13, fontWeight:700, color:"#1A2744" }}>Camadas de Mapa</span>
            <button onClick={() => setPainelAberto(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"#94A3B8", fontSize:20, lineHeight:1 }}>×</button>
          </div>

          {/* Abas */}
          <div style={{ display:"flex", gap:4, background:"#F1F5F9", borderRadius:10, padding:4, marginBottom:12 }}>
            {[["camadas","Camadas"],["legenda","Legenda"]].map(([id, lbl]) => (
              <button key={id} onClick={() => setAba(id)} style={{
                flex:1, padding:"6px 0", borderRadius:7, fontSize:12, fontWeight:600,
                border:"none", cursor:"pointer", transition:"all 0.15s",
                background: aba === id ? "#fff" : "transparent",
                color:      aba === id ? "#1A2744" : "#94A3B8",
                boxShadow:  aba === id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}>{lbl}</button>
            ))}
          </div>

          {aba === "camadas" && <>
            <input value={busca} onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar camada..."
              style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:"1px solid #E2E8F0", fontSize:12, marginBottom:10, boxSizing:"border-box" }} />

            <div style={{ display:"flex", gap:6, marginBottom:12 }}>
              <button onClick={() => toggleTodas(true)} style={{ flex:1, padding:"6px 0", borderRadius:8, fontSize:11, fontWeight:700, border:"none", cursor:"pointer", background:"#F0FDF4", color:"#16A34A" }}>
                ✓ Ativar todas
              </button>
              <button onClick={() => toggleTodas(false)} style={{ flex:1, padding:"6px 0", borderRadius:8, fontSize:11, fontWeight:700, border:"none", cursor:"pointer", background:"#FEF2F2", color:"#DC2626" }}>
                ✕ Desativar
              </button>
            </div>

            <div style={{ flex:1, overflowY:"auto" }}>
              {grupos.map((g) => {
                const gl = visiveis.filter((c) => c.grupo === g);
                if (!gl.length) return null;
                return (
                  <div key={g} style={{ marginBottom:16 }}>
                    <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:"#CBD5E1", marginBottom:6 }}>{g}</div>
                    {gl.map((c) => (
                      <div key={c.id} onClick={() => toggleCamada(c.id)} style={{
                        display:"flex", alignItems:"center", justifyContent:"space-between",
                        padding:"8px 10px", borderRadius:8, cursor:"pointer", marginBottom:2, transition:"background 0.1s",
                      }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <span style={{ fontSize:12, color: c.ativa ? "#1A2744" : "#94A3B8", fontWeight: c.ativa ? 500 : 400, flex:1, paddingRight:8 }}>{c.nome}</span>
                        <Toggle checked={c.ativa} onChange={() => toggleCamada(c.id)} />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop:8, padding:"8px 12px", borderRadius:10, background:"#F0F9FF", textAlign:"center", fontSize:12, color:"#0369A1", fontWeight:600 }}>
              {qtdAtivas}/{camadas.length} camadas ativas
            </div>
          </>}

          {aba === "legenda" && (
            <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:12 }}>
              <span style={{ fontSize:36 }}>🗂️</span>
              <p style={{ fontSize:13, color:"#94A3B8", textAlign:"center" }}>Ative camadas para visualizar a legenda completa.</p>
            </div>
          )}
        </div>
      </div>

      {!painelAberto && (
        <button onClick={() => setPainelAberto(true)} style={{
          position:"absolute", top:12, right:12, padding:"8px 16px", borderRadius:12,
          background:"#fff", border:"1px solid #E2E8F0", fontSize:13, fontWeight:700,
          color:"#1A2744", cursor:"pointer", boxShadow:"0 2px 10px rgba(0,0,0,0.1)", zIndex:10,
        }}>☰ Camadas</button>
      )}

      {/* Toolbar inferior */}
      <div style={{
        position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)",
        background:"rgba(255,255,255,0.97)", borderRadius:20,
        boxShadow:"0 4px 24px rgba(0,0,0,0.15)",
        display:"flex", gap:0, padding:"6px 8px",
      }}>
        {Toast}
        {[["🗺️","Base"],["☰","Camadas"],["📏","Medir"],["💾","Salvar"]].map(([icon, lbl]) => (
          <button key={lbl}
            onClick={
              lbl === "Camadas" ? () => setPainelAberto(!painelAberto)
              : lbl === "Base" ? () => show("Funcionalidade em breve")
              : lbl === "Medir" ? () => show("Funcionalidade em breve")
              : lbl === "Salvar" ? () => show("Funcionalidade em breve")
              : undefined
            }
            className="px-3 text-xs"
            style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"6px 12px", borderRadius:14, border:"none", background:"none", cursor:"pointer", transition:"background 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F1F5F9")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <span style={{ fontSize:18 }}>{icon}</span>
            <span style={{ fontSize:10, color:"#475569", fontWeight:500 }}>{lbl}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
