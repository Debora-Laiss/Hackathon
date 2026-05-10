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

// Retorna a config da persona ativa (ou o default)
function getConfig(persona) {
  return persona ? PERSONA_CONFIG[persona] : PERSONA_DEFAULT;
}

// Inicializa camadas aplicando quais devem ficar ativas para a persona
function initCamadas(base, idsAtivos) {
  return base.map((c) => ({ ...c, ativa: idsAtivos.includes(c.id) }));
}

// ── Controller: Navegação ──────────────────────────────────────
export function useNavController() {
  const [pagina, setPagina] = useState("inicio");
  return { pagina, setPagina };
}

// ── Controller: Infraestrutura ────────────────────────────────
export function useInfraestruturaController(persona) {
  const cfg = getConfig(persona);

  const [camadas, setCamadas] = useState(() =>
    initCamadas(CAMADAS_INFRA_INIT, cfg.camadasInfraAtivas)
  );
  const [estado, setEstado] = useState("Todos");
  const [aberta, setAberta] = useState(true);

  // Quando a persona mudar, reaplicar as camadas padrão dela
  const [personaAnterior, setPersonaAnterior] = useState(persona);
  if (persona !== personaAnterior) {
    setPersonaAnterior(persona);
    setCamadas(initCamadas(CAMADAS_INFRA_INIT, getConfig(persona).camadasInfraAtivas));
  }

  const toggleCamada = (id) =>
    setCamadas((prev) => prev.map((c) => (c.id === id ? { ...c, ativa: !c.ativa } : c)));

  const ativas      = camadas.filter((c) => c.ativa);
  const categorias  = [...new Set(CAMADAS_INFRA_INIT.map((c) => c.categoria))];
  const coresAtivas = new Set(ativas.map((c) => c.cor));
  const dots        = DOTS_BASE.filter((d) => coresAtivas.has(d.c) || d.c === "#E84C1F");
  const totalPontos = ativas.reduce((s, c) => s + c.qtd, 0);

  return {
    camadas, estado, aberta,
    setEstado, setAberta,
    toggleCamada,
    ativas, categorias, dots, totalPontos,
    config: cfg,
  };
}

// ── Controller: Indústrias ────────────────────────────────────
export function useIndustriasController(persona) {
  const cfg = getConfig(persona);

  const [tipo,   setTipo]   = useState(cfg.industriaTipoPadrao);
  const [estado, setEstado] = useState("Todos");
  const [busca,  setBusca]  = useState("");
  const [ordem,  setOrdem]  = useState(cfg.industriaOrdemPadrao);

  // Quando persona mudar, resetar tipo e ordem para os padrões do novo perfil
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

  const dotsIndustria = useMemo(() =>
    filtradas.slice(0, 18).map((ind, i) => ({
      x: 28 + (i % 6) * 10 + Math.sin(i * 1.3) * 2,
      y: 18 + Math.floor(i / 6) * 14 + Math.cos(i * 1.3) * 2,
      c: TIPO_COR[ind.tipo] || "#E84C1F",
      r: 5 + ind.consumo / 120,
    })),
  [filtradas]);

  // KPIs adaptados à persona
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

  // Quando persona mudar, reaplicar camadas padrão
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