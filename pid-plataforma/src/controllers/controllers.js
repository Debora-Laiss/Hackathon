// ── CONTROLLERS ────────────────────────────────────────────────

// ── CONTROLLERS ────────────────────────────────────────────────

import { useState, useMemo } from "react";
import {
  INDUSTRIAS,
  TIPO_COR,
  CAMADAS_INFRA_INIT,
  CAMADAS_PID_INIT,
  DOTS_BASE,
  PERSONA_CONFIG,
  PERSONA_DEFAULT,
} from "../models/data";

function getConfig(persona) {
  return persona ? PERSONA_CONFIG[persona] : PERSONA_DEFAULT;
}

function initCamadas(base, idsAtivos) {
  return base.map((c) => ({ ...c, ativa: idsAtivos.includes(c.id) }));
}

// ── Controller: Navegação ──────────────────────────────────────
export function useNavController() {
  const [pagina, setPagina] = useState("inicio");
  return { pagina, setPagina };
}

// ── Controller: Infraestrutura ─────────────────────────────────
export function useInfraestruturaController(persona) {
  const cfg = getConfig(persona);

  const [camadas, setCamadas] = useState(() =>
    initCamadas(CAMADAS_INFRA_INIT, cfg.camadasInfraAtivas)
  );
  const [estado, setEstado] = useState("Todos");
  const [aberta, setAberta] = useState(true);

  const [personaAnterior, setPersonaAnterior] = useState(persona);
  if (persona !== personaAnterior) {
    setPersonaAnterior(persona);
    setCamadas(initCamadas(CAMADAS_INFRA_INIT, getConfig(persona).camadasInfraAtivas));
  }

  const toggleCamada = (id) =>
    setCamadas((prev) => prev.map((c) => (c.id === id ? { ...c, ativa: !c.ativa } : c)));

  const ativas      = camadas.filter((c) => c.ativa);
  const categorias  = [...new Set(CAMADAS_INFRA_INIT.map((c) => c.categoria))];
  const coresAtivas = new Set(ativas.filter((c) => c.id !== "curtailment").map((c) => c.cor));

  // Filtra DOTS_BASE pelas cores das camadas ativas
  // Se nenhuma camada ativa além de curtailment → mostra todos os dots
  const dots = coresAtivas.size > 0
    ? DOTS_BASE.filter((d) => coresAtivas.has(d.c))
    : DOTS_BASE;

  // Filtra por estado se selecionado
  const dotsFiltrados = estado !== "Todos"
    ? dots.filter((d) => d.label && d.label.includes(estado))
    : dots;

  const totalPontos = ativas.reduce((s, c) => s + (c.qtd || 0), 0);
  const showCurtailment = camadas.find((c) => c.id === "curtailment")?.ativa ?? false;

  return {
    camadas, estado, aberta,
    setEstado, setAberta,
    toggleCamada,
    ativas, categorias,
    dots: dotsFiltrados,
    totalPontos,
    showCurtailment,
    config: cfg,
  };
}

// ── Controller: Indústrias ─────────────────────────────────────
export function useIndustriasController(persona) {
  const cfg = getConfig(persona);

  const [tipo,   setTipo]   = useState(cfg.industriaTipoPadrao);
  const [estado, setEstado] = useState("Todos");
  const [busca,  setBusca]  = useState("");
  const [ordem,  setOrdem]  = useState(cfg.industriaOrdemPadrao);

  const [personaAnterior, setPersonaAnterior] = useState(persona);
  if (persona !== personaAnterior) {
    const novaCfg = getConfig(persona);
    setPersonaAnterior(persona);
    setTipo(novaCfg.industriaTipoPadrao);
    setOrdem(novaCfg.industriaOrdemPadrao);
  }

  const filtradas = useMemo(() =>
    INDUSTRIAS
      .filter((i) => tipo   === "Todos" || i.tipo   === tipo)
      .filter((i) => estado === "Todos" || i.estado === estado)
      .filter((i) =>
        !busca ||
        i.nome.toLowerCase().includes(busca.toLowerCase()) ||
        i.cidade.toLowerCase().includes(busca.toLowerCase())
      )
      .sort((a, b) =>
        ordem === "consumo" ? b.consumo - a.consumo : a.nome.localeCompare(b.nome)
      ),
  [tipo, estado, busca, ordem]);

  const total = filtradas.reduce((s, i) => s + i.consumo, 0);

  const chartData = Object.entries(TIPO_COR)
    .map(([t, c]) => ({
      nome:  t,
      valor: INDUSTRIAS.filter((i) => i.tipo === t).reduce((s, i) => s + i.consumo, 0),
      cor:   c,
    }))
    .sort((a, b) => b.valor - a.valor);

  // ✅ dotsIndustria com lat/lng reais das plantas industriais
  const dotsIndustria = useMemo(() =>
    filtradas.map((ind) => ({
      lat:   ind.lat,
      lng:   ind.lng,
      c:     TIPO_COR[ind.tipo] || "#94A3B8",
      r:     4 + Math.sqrt(ind.consumo / 600),  // raio proporcional ao consumo
      label: `${ind.nome}\n${ind.cidade}, ${ind.estado}\n${ind.consumo.toLocaleString("pt-BR")} MWh/ano · ${ind.tipo}`,
    })),
  [filtradas]);

  const kpiPrincipal = {
    label: cfg.kpiPrincipalLabel,
    valor: cfg.kpiPrincipalValor(total),
    sub:   cfg.kpiPrincipalSub,
  };
  const kpiSec = {
    label: cfg.kpiSecLabel,
    valor: cfg.kpiSecValor(filtradas),
  };

  return {
    tipo, estado, busca, ordem,
    setTipo, setEstado, setBusca, setOrdem,
    filtradas, total, chartData, dotsIndustria,
    kpiPrincipal, kpiSec,
    config: cfg,
  };
}

// ── Controller: PID ───────────────────────────────────────────
export function usePIDController(persona) {
  const cfg = getConfig(persona);

  const [camadas,      setCamadas]      = useState(() =>
    initCamadas(CAMADAS_PID_INIT, cfg.camadasPIDAtivas)
  );
  const [painelAberto, setPainelAberto] = useState(true);
  const [busca,        setBusca]        = useState("");
  const [aba,          setAba]          = useState("camadas");

  const [personaAnterior, setPersonaAnterior] = useState(persona);
  if (persona !== personaAnterior) {
    setPersonaAnterior(persona);
    setCamadas(initCamadas(CAMADAS_PID_INIT, getConfig(persona).camadasPIDAtivas));
  }

  const toggleCamada = (id) =>
    setCamadas((prev) => prev.map((c) => (c.id === id ? { ...c, ativa: !c.ativa } : c)));

  const toggleTodas = (valor) =>
    setCamadas((prev) => prev.map((c) => ({ ...c, ativa: valor })));

  const grupos    = [...new Set(CAMADAS_PID_INIT.map((c) => c.grupo))];
  const visiveis  = camadas.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );
  const qtdAtivas = camadas.filter((c) => c.ativa).length;

  return {
    camadas, painelAberto, busca, aba,
    setPainelAberto, setBusca, setAba,
    toggleCamada, toggleTodas,
    grupos, visiveis, qtdAtivas,
    config: cfg,
  };
}

// ── useDecisaoController ───────────────────────────────────────
// Adicione este export ao seu arquivo controllers/controllers.js

// Cenários de simulação energética
export const CENARIOS_DECISAO = [
  {
    id: "solar_massivo",
    icon: "☀️",
    titulo: "Expansão Solar Massiva",
    descricao: "Adicionar 50 GW de solar até 2030, focado em MG, BA e PI.",
    cor: "#F59E0B",
    metricas: {
      capacidadeGW: 95,
      emissaoMtCO2: 140,
      empregosMil: 480,
      investiBi: 280,
      prazoAnos: 6,
    },
  },
  {
    id: "eolica_offshore",
    icon: "💨",
    titulo: "Eólica Offshore",
    descricao: "Desenvolvimento de 15 GW offshore no litoral do NE até 2032.",
    cor: "#06B6D4",
    metricas: {
      capacidadeGW: 42,
      emissaoMtCO2: 95,
      empregosMil: 210,
      investiBi: 420,
      prazoAnos: 10,
    },
  },
  {
    id: "hidroeletrica",
    icon: "💧",
    titulo: "Expansão Hídrica",
    descricao: "Reabilitação e otimização de UHEs existentes + 8 GW novos na Amazônia.",
    cor: "#3B82F6",
    metricas: {
      capacidadeGW: 62,
      emissaoMtCO2: 60,
      empregosMil: 340,
      investiBi: 195,
      prazoAnos: 12,
    },
  },
  {
    id: "h2_verde",
    icon: "🏭",
    titulo: "Hub H₂ Verde NE",
    descricao: "Produção de 2 Mt/ano de hidrogênio verde exportável no Nordeste.",
    cor: "#8B5CF6",
    metricas: {
      capacidadeGW: 30,
      emissaoMtCO2: 180,
      empregosMil: 560,
      investiBi: 380,
      prazoAnos: 8,
    },
  },
  {
    id: "bess_transmissao",
    icon: "🔋",
    titulo: "BESS + Transmissão",
    descricao: "Reduzir curtailment em 80% com armazenamento e novas LTs 500kV.",
    cor: "#22C55E",
    metricas: {
      capacidadeGW: 18,
      emissaoMtCO2: 75,
      empregosMil: 120,
      investiBi: 110,
      prazoAnos: 4,
    },
  },
  {
    id: "nuclear_avancada",
    icon: "⚛️",
    titulo: "Nuclear Avançada",
    descricao: "SMRs (Small Modular Reactors) para 4 GW de baseload limpa até 2035.",
    cor: "#6366F1",
    metricas: {
      capacidadeGW: 28,
      emissaoMtCO2: 110,
      empregosMil: 85,
      investiBi: 490,
      prazoAnos: 14,
    },
  },
];

// Sugestões de perguntas por persona
const SUGESTOES = {
  investidor: [
    "Quais estados têm melhor ROI para solar em 2025?",
    "Como o curtailment afeta meu portfólio eólico?",
    "Compare BESS vs transmissão como investimento",
    "Quais projetos têm menor risco regulatório?",
  ],
  governo: [
    "Quais estados precisam de mais transmissão urgente?",
    "Como atingir as metas NDC com menor custo?",
    "Impacto do curtailment nas tarifas de energia",
    "Melhores regiões para polos de H₂ verde",
  ],
  regulador: [
    "Qual protocolo de curtailment é mais eficiente?",
    "Como melhorar a telemetria do SIN?",
    "Comparativo de regras CCEE com mercados maduros",
    "Impacto das mudanças tarifárias no despacho",
  ],
  default: [
    "O que é curtailment e como afeta o Brasil?",
    "Qual fonte de energia cresce mais rápido?",
    "Como funciona o mercado livre de energia?",
    "Quais estados lideram a transição energética?",
  ],
};


export function useDecisaoController(persona) {
  const cfg = getConfig(persona);

  const sugestoes = SUGESTOES[persona] || SUGESTOES.default;

  const [mensagens, setMensagens] = useState([
    {
      role: "assistant",
      content: `Olá! Sou o assistente de análise energética da PID.\n\nPosso te ajudar a comparar cenários de expansão, analisar dados de curtailment, avaliar oportunidades de investimento e muito mais.\n\nO que você quer analisar hoje?`,
    },
  ]);
  const [carregando, setCarregando] = useState(false);
  const [input, setInput] = useState("");
  const [cenarioA, setCenarioA] = useState("solar_massivo");
  const [cenarioB, setCenarioB] = useState("bess_transmissao");

  async function enviarMensagem(texto) {
    const userMsg = { role: "user", content: texto };
    const loadingMsg = { role: "assistant", content: "", loading: true };

    setMensagens((prev) => [...prev, userMsg, loadingMsg]);
    setInput("");
    setCarregando(true);

    // Monta histórico para a API (sem a mensagem de loading)
  
 
  }

  return {
    mensagens, carregando, input, setInput,
    cenarioA, cenarioB, setCenarioA, setCenarioB,
    cenarios: CENARIOS_DECISAO,
    enviarMensagem, sugestoes,
    config: cfg,
  };
}