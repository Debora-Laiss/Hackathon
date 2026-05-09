// ── CONTROLLERS ────────────────────────────────────────────────
// Responsáveis pela lógica de negócio: filtragem, ordenação, derivações de estado.
// Cada função recebe estado atual e retorna novos valores ou dados derivados — sem JSX.

import { useState, useMemo } from "react";
import {
  INDUSTRIAS,
  TIPO_COR,
  CAMADAS_INFRA_INIT,
  CAMADAS_PID_INIT,
  DOTS_BASE,
} from "../models/data";

// ── Controller: Navegação ──────────────────────────────────────
export function useNavController() {
  const [pagina, setPagina] = useState("inicio");
  return { pagina, setPagina };
}

// ── Controller: Infraestrutura ────────────────────────────────
export function useInfraestruturaController() {
  const [camadas, setCamadas] = useState(CAMADAS_INFRA_INIT);
  const [estado, setEstado]   = useState("Todos");
  const [aberta, setAberta]   = useState(true);

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
  };
}

// ── Controller: Indústrias ────────────────────────────────────
export function useIndustriasController() {
  const [tipo,   setTipo]   = useState("Todos");
  const [estado, setEstado] = useState("Todos");
  const [busca,  setBusca]  = useState("");
  const [ordem,  setOrdem]  = useState("consumo");

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

  return {
    tipo, estado, busca, ordem,
    setTipo, setEstado, setBusca, setOrdem,
    filtradas, total, chartData, dotsIndustria,
  };
}

// ── Controller: PID ───────────────────────────────────────────
export function usePIDController() {
  const [camadas,      setCamadas]      = useState(CAMADAS_PID_INIT);
  const [painelAberto, setPainelAberto] = useState(true);
  const [busca,        setBusca]        = useState("");
  const [aba,          setAba]          = useState("camadas");

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
  };
}
