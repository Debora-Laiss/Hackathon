import { useState, useRef, useEffect } from "react";
import { useDecisaoController } from "../controllers/controllers";

const IcBot = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/>
  </svg>
);
const IcUser = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

function MetricBar({ label, valor, max, cor, unidade = "%" }) {
  const pct = Math.min(100, Math.round((valor / max) * 100));
  const [animado, setAnimado] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimado(true), 120); return () => clearTimeout(t); }, []);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 11, color: "#1A2744", fontWeight: 700 }}>{valor.toLocaleString("pt-BR")}{unidade}</span>
      </div>
      <div style={{ height: 7, background: "#F1F5F9", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: animado ? `${pct}%` : "0%",
          background: `linear-gradient(90deg, ${cor}99, ${cor})`,
          borderRadius: 99, transition: "width 0.9s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </div>
    </div>
  );
}

function KpiCard({ label, valor, sub, cor, icon }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 14, padding: "14px 16px",
      border: "1px solid #F1F5F9", boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      borderLeft: `4px solid ${cor}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <span style={{ fontSize: 15 }}>{icon}</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color: "#1A2744", lineHeight: 1 }}>{valor}</div>
      {sub && <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function CenarioCard({ c, selecionado, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", textAlign: "left", padding: "11px 13px", borderRadius: 12,
      border: `2px solid ${selecionado ? c.cor : "#E2E8F0"}`,
      background: selecionado ? c.cor + "10" : "#FAFAFA",
      cursor: "pointer", transition: "all 0.18s", marginBottom: 8,
      boxShadow: selecionado ? `0 4px 16px ${c.cor}22` : "none",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
        <span style={{ fontSize: 18 }}>{c.icon}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#1A2744", flex: 1 }}>{c.titulo}</span>
        {selecionado && (
          <span style={{ fontSize: 9, fontWeight: 800, background: c.cor, color: "#fff", padding: "2px 7px", borderRadius: 99 }}>✓</span>
        )}
      </div>
      <p style={{ fontSize: 11, color: "#64748B", margin: 0, lineHeight: 1.5 }}>{c.descricao}</p>
    </button>
  );
}

function PainelSimulacao({ cenarioA, cenarioB, cenarios }) {
  const cA = cenarios.find((c) => c.id === cenarioA);
  const cB = cenarios.find((c) => c.id === cenarioB);
  if (!cA || !cB) return (
    <div style={{ padding: 40, textAlign: "center", color: "#94A3B8", fontSize: 13 }}>
      Selecione dois cenários para comparar
    </div>
  );

  const metricas = [
    { key: "capacidadeGW",  label: "Capacidade instalada",     max: 120, unidade: " GW"    },
    { key: "emissaoMtCO2",  label: "Emissões evitadas",        max: 200, unidade: " MtCO₂" },
    { key: "empregosMil",   label: "Empregos gerados",         max: 600, unidade: " mil"   },
    { key: "investiBi",     label: "Investimento necessário",  max: 500, unidade: " R$bi"  },
    { key: "prazoAnos",     label: "Prazo estimado",           max: 15,  unidade: " anos"  },
  ];

  return (
    <div style={{ padding: "0 20px 24px" }}>
      {/* Cards lado a lado */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {[cA, cB].map((c) => (
          <div key={c.id} style={{
            background: c.cor + "08", border: `1.5px solid ${c.cor}44`,
            borderRadius: 14, padding: "14px 16px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 22 }}>{c.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1A2744" }}>{c.titulo}</span>
            </div>
            {metricas.map((m) => (
              <MetricBar key={m.key} label={m.label} valor={c.metricas[m.key]} max={m.max} cor={c.cor} unidade={m.unidade} />
            ))}
          </div>
        ))}
      </div>

      {/* Barra de viabilidade comparativa */}
      <div style={{ background: "#F8FAFC", borderRadius: 14, padding: "16px 18px", border: "1px solid #E2E8F0" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
          Viabilidade comparativa
        </p>
        {metricas.map((m) => {
          const vA = cA.metricas[m.key];
          const vB = cB.metricas[m.key];
          const total = vA + vB || 1;
          const pA = Math.round((vA / total) * 100);
          const pB = 100 - pA;
          return (
            <div key={m.key} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: cA.cor, fontWeight: 700 }}>{pA}%</span>
                <span style={{ fontSize: 11, color: "#94A3B8" }}>{m.label}</span>
                <span style={{ fontSize: 11, color: cB.cor, fontWeight: 700 }}>{pB}%</span>
              </div>
              <div style={{ height: 8, background: "#E2E8F0", borderRadius: 99, overflow: "hidden", display: "flex" }}>
                <div style={{ width: `${pA}%`, background: cA.cor, transition: "width 0.8s ease" }} />
                <div style={{ width: `${pB}%`, background: cB.cor, transition: "width 0.8s ease" }} />
              </div>
            </div>
          );
        })}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, paddingTop: 12, borderTop: "1px solid #E2E8F0" }}>
          {[cA, cB].map((c) => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: c.cor, flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: "#64748B" }}>{c.titulo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PainelRecomendacoes({ persona, config }) {
  const recs = {
    investidor: [
      { icon: "📈", titulo: "Solar no Nordeste",    desc: "ROI médio de 14,2% ao ano. CE e RN com curtailment em queda após expansão de transmissão.", cor: "#F59E0B", tag: "Alta prioridade" },
      { icon: "🔋", titulo: "BESS + Eólica",         desc: "Armazenamento integrado reduz curtailment em 40%. Mercado em rápida expansão no NE.", cor: "#06B6D4", tag: "Alta prioridade" },
      { icon: "🏭", titulo: "H₂ Verde — PI e BA",    desc: "Potencial exportador. Projetos pré-aprovados pela ANEEL com incentivo fiscal.", cor: "#8B5CF6", tag: "Médio prazo" },
      { icon: "⚡", titulo: "Transmissão 500kV",      desc: "Gargalo real no SIN. Concessões com retorno regulado garantido e baixo risco.", cor: "#E84C1F", tag: "Estável" },
    ],
    governo: [
      { icon: "🗺️", titulo: "Zoneamento Energético", desc: "8 estados com capacidade ociosa de transmissão. Política de expansão é urgente.", cor: "#3B82F6", tag: "Urgente" },
      { icon: "⚖️", titulo: "Revisão Tarifária",      desc: "Curtailment gera R$ 7,2bi/ano em perdas para o sistema elétrico nacional.", cor: "#E84C1F", tag: "Alta prioridade" },
      { icon: "🌿", titulo: "Meta NDC 2035",           desc: "Expansão solar de 45 GW necessária para atingir metas climáticas acordadas.", cor: "#22C55E", tag: "Estratégico" },
      { icon: "🏗️", titulo: "Infraestrutura Norte",   desc: "Amazônia com potencial hídrico subutilizado. Novos estudos de viabilidade necessários.", cor: "#6366F1", tag: "Longo prazo" },
    ],
    regulador: [
      { icon: "📋", titulo: "Revisão das ONS",        desc: "Protocolo de curtailment desatualizado. 11 estados afetados sistematicamente em 2024.", cor: "#E84C1F", tag: "Crítico" },
      { icon: "🔍", titulo: "Auditoria CCEE",          desc: "Liquidação do mercado livre com distorções em horários de pico solar identificadas.", cor: "#3B82F6", tag: "Alta prioridade" },
      { icon: "📡", titulo: "Telemetria SIN",           desc: "Apenas 62% das usinas com telemetria em tempo real. Meta: 100% até 2026.", cor: "#06B6D4", tag: "Em andamento" },
      { icon: "🌐", titulo: "Interligação Sul-Norte",  desc: "Capacidade de 2.000 MW subutilizada. Nova LT em análise no MME.", cor: "#22C55E", tag: "Médio prazo" },
    ],
    default: [
      { icon: "☀️", titulo: "Solar lidera a expansão", desc: "Brasil adicionou 12,4 GW solar em 2024. Tendência de queda de custos continua acelerada.", cor: "#F59E0B", tag: "Destaque" },
      { icon: "💨", titulo: "Eólica offshore chegando", desc: "Primeiros leilões previstos para 2025. Potencial de 700 GW no litoral brasileiro.", cor: "#06B6D4", tag: "Novo" },
      { icon: "⚡", titulo: "Curtailment recorde",      desc: "400 mil horas acumuladas em 2024. Nordeste concentra 75% das perdas do sistema.", cor: "#E84C1F", tag: "Alerta" },
      { icon: "🔋", titulo: "Armazenamento em alta",   desc: "BNDES com linha de R$ 8bi para projetos de BESS até 2027.", cor: "#8B5CF6", tag: "Oportunidade" },
    ],
  };

  const lista = recs[persona] || recs.default;

  return (
    <div style={{ padding: "0 20px 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {lista.map((r, i) => (
          <div key={i} style={{
            background: "#fff", borderRadius: 14, padding: "16px",
            border: "1px solid #F1F5F9",
            boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
            borderTop: `3px solid ${r.cor}`,
            animation: `slideIn 0.3s ease ${i * 0.08}s both`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>{r.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 800, background: r.cor + "20", color: r.cor, padding: "2px 8px", borderRadius: 99 }}>
                {r.tag}
              </span>
            </div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1A2744", margin: "0 0 6px" }}>{r.titulo}</p>
            <p style={{ fontSize: 12, color: "#64748B", margin: 0, lineHeight: 1.6 }}>{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PÁGINA PRINCIPAL ───────────────────────────────────────────
export function PaginaDecisao({ persona }) {
  const {
    cenarioA, cenarioB, setCenarioA, setCenarioB,
    cenarios, config,
  } = useDecisaoController(persona);

  const [aba, setAba] = useState("cenarios");

  const abas = [
    { id: "cenarios", label: "⚡ Cenários"      },
    { id: "recs",     label: "🎯 Recomendações" },
  ];

  const kpis = [
    { label: "Capacidade SIN",   valor: "208,9 GW", sub: "Instalada — dez/2024",   cor: "#3B82F6", icon: "⚡" },
    { label: "Curtailment 2024", valor: "400k h",   sub: "Horas acumuladas — ONS", cor: "#E84C1F", icon: "⚠️" },
    { label: "Expansão Solar",   valor: "+12,4 GW", sub: "Adicionados em 2024",    cor: "#F59E0B", icon: "☀️" },
    { label: "Perdas NE",        valor: "R$ 5,2bi", sub: "Curtailment — 2024",     cor: "#8B5CF6", icon: "📉" },
  ];

  return (
    <div style={{ height: "calc(100vh - 3.5rem)", display: "flex", flexDirection: "column", background: "#F8FAFC", overflow: "hidden" }}>
      <style>{`
        @keyframes dotPulse {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "14px 20px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <h1 style={{ fontSize: 17, fontWeight: 800, color: "#1A2744", margin: "0 0 3px" }}>Tomada de Decisão</h1>
            <p style={{ fontSize: 12, color: "#94A3B8", margin: 0 }}>Insights, análises e comparação de cenários energéticos</p>
          </div>
          {config?.bannerTitulo && (
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "5px 12px", borderRadius: 99,
              background: config.bannerCor + "18", border: `1px solid ${config.bannerCor}44`,
            }}>
              <span style={{ fontSize: 13 }}>{config.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: config.bannerCor }}>{config.bannerTitulo}</span>
            </div>
          )}
        </div>

        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
          {kpis.map((k) => <KpiCard key={k.label} {...k} />)}
        </div>

        {/* Abas */}
        <div style={{ display: "flex", gap: 2 }}>
          {abas.map((a) => (
            <button key={a.id} onClick={() => setAba(a.id)} style={{
              padding: "8px 16px", borderRadius: "8px 8px 0 0",
              fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer",
              background: aba === a.id ? "#F8FAFC" : "transparent",
              color: aba === a.id ? "#1A2744" : "#94A3B8",
              borderBottom: aba === a.id ? "2px solid #E84C1F" : "2px solid transparent",
              transition: "all 0.15s",
            }}>{a.label}</button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>

        {/* ABA CENÁRIOS */}
        {aba === "cenarios" && (
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            <div style={{ width: 240, flexShrink: 0, background: "#fff", borderRight: "1px solid #E2E8F0", padding: "16px", overflowY: "auto" }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Cenário A</p>
              {cenarios.map((c) => (
                <CenarioCard key={c.id} c={c} selecionado={cenarioA === c.id} onClick={() => setCenarioA(c.id)} />
              ))}
              <div style={{ height: 1, background: "#F1F5F9", margin: "14px 0" }} />
              <p style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Cenário B</p>
              {cenarios.map((c) => (
                <CenarioCard key={c.id} c={c} selecionado={cenarioB === c.id} onClick={() => setCenarioB(c.id)} />
              ))}
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              <div style={{ padding: "16px 20px 8px" }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: "#1A2744", margin: "0 0 3px" }}>Comparação de Cenários</h2>
                <p style={{ fontSize: 11, color: "#94A3B8", margin: 0 }}>Selecione dois cenários para comparar métricas lado a lado</p>
              </div>
              <PainelSimulacao cenarioA={cenarioA} cenarioB={cenarioB} cenarios={cenarios} />
            </div>
          </div>
        )}

        {/* ABA RECOMENDAÇÕES */}
        {aba === "recs" && (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ padding: "16px 20px 8px" }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: "#1A2744", margin: "0 0 3px" }}>
                Recomendações {config?.label ? `para ${config.label}` : ""}
              </h2>
              <p style={{ fontSize: 11, color: "#94A3B8", margin: 0 }}>
                Insights curados com base nos dados da plataforma e no seu perfil
              </p>
            </div>
            <PainelRecomendacoes persona={persona} config={config} />
          </div>
        )}
      </div>
    </div>
  );
}