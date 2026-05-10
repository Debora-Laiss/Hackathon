// ── DATA.JS — DADOS REAIS DO SETOR ELÉTRICO BRASILEIRO ────────
// Fontes: ANEEL/SIGA, ONS, IBGE, EPE, Volt Robotics (2024-2025)

// ── ESTADOS ────────────────────────────────────────────────────
export const ESTADOS = [
  "Todos", "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES",
  "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI",
  "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO",
];

// ── BIOMAS (IBGE 2023) ─────────────────────────────────────────
// Centróides aproximados e áreas oficiais do IBGE
export const BIOMAS = [
  {
    id: "amazonia",
    nome: "Amazônia",
    areakm2: 4_196_943,
    percentualBrasil: 49.29,
    cor: "#1a7a3c",
    lat: -4.5,
    lng: -62.0,
    estados: ["AM","PA","AC","RO","RR","AP","MT","MA","TO"],
    espéciesArvores: 16000,
    descricao: "Maior floresta tropical do mundo. Abriga ~10% das espécies vivas do planeta.",
  },
  {
    id: "cerrado",
    nome: "Cerrado",
    areakm2: 2_036_448,
    percentualBrasil: 23.92,
    cor: "#c8a227",
    lat: -15.0,
    lng: -47.5,
    estados: ["GO","MT","MS","MG","BA","MA","PI","TO","SP","DF"],
    espéciesArvores: 6000,
    descricao: "Savana com maior biodiversidade do mundo. Berço das águas do Brasil.",
  },
  {
    id: "mataatlantica",
    nome: "Mata Atlântica",
    areakm2: 1_110_182,
    percentualBrasil: 13.04,
    cor: "#2e7d32",
    lat: -20.0,
    lng: -42.0,
    estados: ["RJ","ES","SP","PR","SC","RS","BA","MG","AL","SE","PE","PB","RN","CE","PI","GO"],
    espéciesArvores: 20000,
    descricao: "Restam apenas ~12% da área original. Uma das 5 áreas de maior biodiversidade do planeta.",
  },
  {
    id: "caatinga",
    nome: "Caatinga",
    areakm2: 844_453,
    percentualBrasil: 9.92,
    cor: "#bf8c34",
    lat: -8.5,
    lng: -39.0,
    estados: ["CE","RN","PB","PE","PI","BA","SE","AL","MA","MG"],
    espéciesArvores: 932,
    descricao: "Única floresta tropical seca exclusivamente brasileira. ~27 milhões de habitantes.",
  },
  {
    id: "pantanal",
    nome: "Pantanal",
    areakm2: 150_355,
    percentualBrasil: 1.76,
    cor: "#1565c0",
    lat: -18.0,
    lng: -56.5,
    estados: ["MT","MS"],
    espéciesArvores: 1700,
    descricao: "Maior planície de inundação contínua do mundo. Bioma mais preservado do Brasil.",
  },
  {
    id: "pampa",
    nome: "Pampa",
    areakm2: 176_496,
    percentualBrasil: 2.07,
    cor: "#558b2f",
    lat: -30.5,
    lng: -53.5,
    estados: ["RS"],
    espéciesArvores: 450,
    descricao: "Único bioma restrito a um só estado. Campos temperados com fauna e flora únicas.",
  },
];

// ── CURTAILMENT POR ESTADO (ONS/Volt Robotics 2024) ────────────
// Fonte: Volt Robotics (400 mil horas acumuladas em 2024)
// Nordeste = 330 mil horas (75% do total nacional)
// Principais afetados: CE, RN, BA (nessa ordem)
export const CURTAILMENT_ESTADOS = [
  {
    estado: "CE",
    intensidade: "critico",
    percentualCorte: 28.4,
    mwhPerdidos: 4_850_000,
    prejuizoReais: 1_940_000_000,
    fontesPrincipais: "Eólica (84%), Solar (16%)",
    descricao: "Estado mais afetado em 2024. Concentração de eólicas no litoral com limitação de escoamento.",
  },
  {
    estado: "RN",
    intensidade: "critico",
    percentualCorte: 26.1,
    mwhPerdidos: 4_200_000,
    prejuizoReais: 1_680_000_000,
    fontesPrincipais: "Eólica (79%), Solar (21%)",
    descricao: "2º mais afetado. Maior parque eólico per capita do Brasil. Transmissão saturada.",
  },
  {
    estado: "BA",
    intensidade: "critico",
    percentualCorte: 23.7,
    mwhPerdidos: 3_900_000,
    prejuizoReais: 1_560_000_000,
    fontesPrincipais: "Solar (58%), Eólica (42%)",
    descricao: "Maior expansão solar de 2024 (1.603 MW novos). Gargalo de transmissão no oeste baiano.",
  },
  {
    estado: "PI",
    intensidade: "alto",
    percentualCorte: 19.8,
    mwhPerdidos: 2_100_000,
    prejuizoReais: 840_000_000,
    fontesPrincipais: "Solar (62%), Eólica (38%)",
    descricao: "Complexo São Gonçalo (790 MW) e Serra do Mel entre os mais cortados.",
  },
  {
    estado: "MG",
    intensidade: "alto",
    percentualCorte: 15.2,
    mwhPerdidos: 1_800_000,
    prejuizoReais: 720_000_000,
    fontesPrincipais: "Solar (91%), Eólica (9%)",
    descricao: "Complexo Janaúba (1.020 MW) e Sol do Cerrado (681 MW) entre os mais cortados do Sudeste.",
  },
  {
    estado: "PE",
    intensidade: "alto",
    percentualCorte: 14.3,
    mwhPerdidos: 980_000,
    prejuizoReais: 392_000_000,
    fontesPrincipais: "Eólica (71%), Solar (29%)",
    descricao: "Concentração de eólicas no Agreste e Sertão. Limitação nas subestações de conexão.",
  },
  {
    estado: "PB",
    intensidade: "alto",
    percentualCorte: 13.1,
    mwhPerdidos: 720_000,
    prejuizoReais: 288_000_000,
    fontesPrincipais: "Eólica (80%), Solar (20%)",
    descricao: "Parques no Sertão paraibano com restrição no ponto de conexão da CHESF.",
  },
  {
    estado: "MA",
    intensidade: "medio",
    percentualCorte: 9.6,
    mwhPerdidos: 540_000,
    prejuizoReais: 216_000_000,
    fontesPrincipais: "Eólica (68%), Solar (32%)",
    descricao: "Delta do Maranhão (Omega Energia) entre os complexos afetados.",
  },
  {
    estado: "RS",
    intensidade: "medio",
    percentualCorte: 7.4,
    mwhPerdidos: 380_000,
    prejuizoReais: 152_000_000,
    fontesPrincipais: "Eólica (100%)",
    descricao: "Complexos no litoral e Serra Gaúcha. Restrições sazonais no inverno.",
  },
  {
    estado: "SP",
    intensidade: "medio",
    percentualCorte: 6.8,
    mwhPerdidos: 310_000,
    prejuizoReais: 124_000_000,
    fontesPrincipais: "Solar (88%), Eólica (12%)",
    descricao: "Complexo Guaimbê (330 MW) afetado em horários de pico solar.",
  },
  {
    estado: "SC",
    intensidade: "medio",
    percentualCorte: 5.9,
    mwhPerdidos: 210_000,
    prejuizoReais: 84_000_000,
    fontesPrincipais: "Eólica (100%)",
    descricao: "Parques na Serra Catarinense com cortes pontuais por confiabilidade.",
  },
];

// ── DOTS BASE — USINAS REAIS COM COORDENADAS GEOGRÁFICAS ───────
// Coordenadas reais das principais usinas do Brasil
// Fonte: ANEEL SIGA, ANA, ONS
export const DOTS_BASE = [

  // ── HIDRELÉTRICAS (cor #3B82F6 = azul) ──────────────────────
  // UHE Itaipu — Foz do Iguaçu/PR | 14.000 MW
  { lat: -25.408, lng: -54.589, c: "#3B82F6", r: 14, label: "UHE Itaipu — 14.000 MW\nFoz do Iguaçu, PR\nMaior geradora do mundo em produção acumulada" },
  // UHE Belo Monte — Altamira/PA | 11.233 MW
  { lat: -3.103,  lng: -51.946, c: "#3B82F6", r: 13, label: "UHE Belo Monte — 11.233 MW\nAltamira, PA\n2ª maior do Brasil, 100% nacional" },
  // UHE Tucuruí — Tucuruí/PA | 8.535 MW
  { lat: -3.831,  lng: -49.673, c: "#3B82F6", r: 12, label: "UHE Tucuruí — 8.535 MW\nTucuruí, PA\nMaior usina totalmente brasileira" },
  // UHE Jirau — Porto Velho/RO | 3.750 MW
  { lat: -9.267,  lng: -64.645, c: "#3B82F6", r: 9,  label: "UHE Jirau — 3.750 MW\nPorto Velho, RO\nComplexo do Madeira" },
  // UHE Santo Antônio — Porto Velho/RO | 3.568 MW
  { lat: -8.800,  lng: -63.950, c: "#3B82F6", r: 9,  label: "UHE Santo Antônio — 3.568 MW\nPorto Velho, RO\nComplexo do Madeira" },
  // UHE Ilha Solteira — Ilha Solteira/SP | 3.444 MW
  { lat: -20.376, lng: -51.344, c: "#3B82F6", r: 9,  label: "UHE Ilha Solteira — 3.444 MW\nIlha Solteira, SP" },
  // UHE Xingó — Canindé/SE | 3.162 MW
  { lat: -9.627,  lng: -37.789, c: "#3B82F6", r: 8,  label: "UHE Xingó — 3.162 MW\nCanindé do São Francisco, SE/AL\nMaior do Nordeste" },
  // UHE Itaipu Binacional (margem direita) — já incluída acima
  // UHE Furnas — São José da Barra/MG | 1.312 MW
  { lat: -20.675, lng: -46.320, c: "#3B82F6", r: 7,  label: "UHE Furnas — 1.312 MW\nSão José da Barra, MG\nReservatório turístico do Sul de MG" },
  // UHE Três Marias — Três Marias/MG | 396 MW
  { lat: -18.212, lng: -45.267, c: "#3B82F6", r: 5,  label: "UHE Três Marias — 396 MW\nTrês Marias, MG\nRio São Francisco" },
  // UHE Sobradinho — Casa Nova/BA | 1.050 MW
  { lat: -9.423,  lng: -40.830, c: "#3B82F6", r: 6,  label: "UHE Sobradinho — 1.050 MW\nCasa Nova, BA\nMaior lago artificial do Brasil" },
  // UHE Teles Pires — Paranaíta/MT | 1.820 MW
  { lat: -9.836,  lng: -55.019, c: "#3B82F6", r: 8,  label: "UHE Teles Pires — 1.820 MW\nParanaíta/Jacareacanga, MT/PA\nComplexo Amazônico" },
  // UHE Itumbiara — Itumbiara/GO | 2.082 MW
  { lat: -18.420, lng: -49.103, c: "#3B82F6", r: 8,  label: "UHE Itumbiara — 2.082 MW\nItumbiara, GO\nRio Paranaíba" },
  // UHE Paulo Afonso (Complexo) — Paulo Afonso/BA | 4.279 MW
  { lat: -9.399,  lng: -38.209, c: "#3B82F6", r: 10, label: "Complexo Paulo Afonso — 4.279 MW\nPaulo Afonso, BA\nCHESF — Rio São Francisco" },
  // UHE Angra (Nuclear) — Angra dos Reis/RJ | 1.990 MW
  { lat: -23.009, lng: -44.457, c: "#6366F1", r: 7,  label: "UTE Nuclear Angra 1+2 — 1.990 MW\nAngra dos Reis, RJ\nÚnica usina nuclear do Brasil" },

  // ── EÓLICAS (cor #06B6D4 = ciano) ───────────────────────────
  // Complexo Lagoa dos Ventos — Guadalupe/PI | ~1.014 MW (Enel)
  { lat: -6.784,  lng: -43.561, c: "#06B6D4", r: 11, label: "Complexo Lagoa dos Ventos — 1.014 MW\nGuadalupe, PI\nEnel Green Power — maior complexo eólico do Brasil" },
  // Complexo Oitis — Lagoa dos Patos/PI | 930 MW (Neoenergia/Iberdrola)
  { lat: -7.050,  lng: -41.280, c: "#06B6D4", r: 10, label: "Complexo Oitis — 930 MW\nLagoa do Barro do Piauí, PI\nNeoenergia/Iberdrola" },
  // Complexo Serra do Mel — Serra do Mel/RN | 433 MW (Voltalia)
  { lat: -5.121,  lng: -37.346, c: "#06B6D4", r: 8,  label: "Complexo Serra do Mel — 433 MW\nSerra do Mel, RN\nVoltalia — Echoenergia" },
  // Delta do Maranhão — Araioses/MA | ~320 MW (Omega)
  { lat: -2.893,  lng: -41.907, c: "#06B6D4", r: 7,  label: "Complexo Delta do Maranhão — 320 MW\nAraioses, MA\nOmega Energia" },
  // Complexo Eólico Ventos do Araripe — Araripina/PE | 300 MW
  { lat: -7.573,  lng: -40.499, c: "#06B6D4", r: 7,  label: "Complexo Ventos do Araripe — 300 MW\nAraripina, PE\nChapada do Araripe" },
  // Parque Eólico Bons Ventos — Acaraú/CE | 50 MW (histórico)
  { lat: -2.885,  lng: -40.117, c: "#06B6D4", r: 5,  label: "Parque Eólico Acaraú — ~120 MW\nAcaraú/Camocim, CE\nCosta atlântica" },
  // Complexo Eólico Canoa Quebrada — Aracati/CE | 57 MW
  { lat: -4.333,  lng: -37.667, c: "#06B6D4", r: 5,  label: "Complexo Eólico Aracati — 57 MW\nAracati, CE" },
  // Parque Eólico Pedra do Sal — Ilha Grande/PI | 18 MW (histórico)
  { lat: -2.745,  lng: -41.580, c: "#06B6D4", r: 4,  label: "Parque Eólico Pedra do Sal — 18 MW\nParnaíba, PI\nPrimeiro parque offshore/costeiro do NE" },
  // Complexo Eólico Garrote — Caetité/BA | ~250 MW
  { lat: -13.869, lng: -42.480, c: "#06B6D4", r: 7,  label: "Complexo Eólico Caetité — ~250 MW\nCaetité, BA\nChapada Diamantina" },
  // Complexo Eólico Serra Gaúcha — São Marcos/RS | ~180 MW
  { lat: -28.969, lng: -51.069, c: "#06B6D4", r: 6,  label: "Complexo Eólico Serra Gaúcha — 180 MW\nSão Marcos, RS\nRGE / CPFL" },
  // Parque Eólico Rio do Fogo — Rio do Fogo/RN | 49,3 MW
  { lat: -5.267,  lng: -35.408, c: "#06B6D4", r: 4,  label: "Parque Eólico Rio do Fogo — 49 MW\nRio do Fogo, RN\nPrimeiro parque eólico do RN (2006)" },

  // ── SOLAR FOTOVOLTAICA (cor #F59E0B = âmbar) ────────────────
  // Complexo Janaúba — Janaúba/MG | 1.020 MW (Elera)
  { lat: -15.802, lng: -43.308, c: "#F59E0B", r: 13, label: "Complexo Solar Janaúba — 1.020 MW\nJanaúba, MG\nElera Renováveis — maior usina solar do Brasil" },
  // Complexo São Gonçalo — São Gonçalo do Gurguéia/PI | 790 MW (Enel)
  { lat: -10.001, lng: -45.230, c: "#F59E0B", r: 11, label: "Complexo Solar São Gonçalo — 790 MW\nSão Gonçalo do Gurguéia, PI\nEnel Green Power" },
  // Complexo Solar Futura 1 — Sento Sé/BA | 692 MW (Eneva)
  { lat: -10.032, lng: -41.880, c: "#F59E0B", r: 10, label: "Complexo Solar Futura — 692 MW\nSento Sé, BA\nEneva" },
  // Sol do Cerrado (Vale) — Jaíba/MG | 681 MW
  { lat: -15.344, lng: -43.670, c: "#F59E0B", r: 10, label: "Sol do Cerrado — 681 MW\nJaíba, MG\nVale S.A. — autogeração industrial" },
  // Complexo Hélio Valgas — Bom Jesus da Lapa/BA | 500 MW (Comerc)
  { lat: -13.255, lng: -43.415, c: "#F59E0B", r: 9,  label: "Complexo Hélio Valgas — 500 MW\nBom Jesus da Lapa, BA\nComerc Renew" },
  // Complexo Lar do Sol — Xique-Xique/BA | 495 MW (Engie)
  { lat: -10.818, lng: -42.724, c: "#F59E0B", r: 9,  label: "Complexo Lar do Sol — 495 MW\nXique-Xique, BA\nEngie Brasil" },
  // Complexo Belmonte — Belmonte/BA | 455 MW (Cobra)
  { lat: -15.863, lng: -38.882, c: "#F59E0B", r: 8,  label: "Complexo Solar Belmonte — 455 MW\nBelmonte, BA\nGrupo Cobra" },
  // Complexo Mendubim — Assú/RN | 422 MW (Scatec/Equinor/Hydro)
  { lat: -5.577,  lng: -36.909, c: "#F59E0B", r: 8,  label: "Complexo Solar Mendubim — 422 MW\nAssú, RN\nScatec/Equinor/Hydro" },
  // Pirapora Solar Complex — Pirapora/MG | 399 MW (EDF)
  { lat: -17.347, lng: -44.936, c: "#F59E0B", r: 8,  label: "Complexo Solar Pirapora — 399 MW\nPirapora, MG\nEDF Renewables" },
  // Complexo Solar Guaimbê — Guaimbê/SP | 330 MW (EDF)
  { lat: -22.358, lng: -50.183, c: "#F59E0B", r: 7,  label: "Complexo Solar Guaimbê — 330 MW\nGuaimbê, SP\nEDF Renewables" },
  // Nova Olinda — Ribeira do Piauí/PI | 292 MW (Enel)
  { lat: -8.019,  lng: -42.700, c: "#F59E0B", r: 7,  label: "Solar Nova Olinda — 292 MW\nRibeira do Piauí, PI\nEnel Green Power" },
  // Complexo Solar Assú Sol — Assú/RN | ~160 MW (Engie)
  { lat: -5.571,  lng: -36.906, c: "#F59E0B", r: 6,  label: "Complexo Assú Sol — 160 MW\nAssú, RN\nEngie Brasil" },

  // ── BIOMASSA / BAGAÇO (cor #22C55E = verde) ─────────────────
  // Usina Costa Pinto — Piracicaba/SP | 216 MW (Raízen)
  { lat: -22.727, lng: -47.638, c: "#22C55E", r: 7,  label: "UTE Costa Pinto — 216 MW\nPiracicaba, SP\nRaízen — bagaço de cana" },
  // Usina Bonfim — Guariba/SP | 106 MW
  { lat: -21.369, lng: -48.230, c: "#22C55E", r: 5,  label: "UTE Bonfim — 106 MW\nGuariba, SP\nBiomassa cana-de-açúcar" },
  // Complexo biomassa Pedra Agronomica — Sirinhaém/PE | 90 MW
  { lat: -8.589,  lng: -35.111, c: "#22C55E", r: 5,  label: "UTE Pedra Agronomica — 90 MW\nSirinhaém, PE\nBiomassa cana" },
  // UTE Lages — Lages/SC | 28 MW (biomassa florestal)
  { lat: -27.816, lng: -50.326, c: "#22C55E", r: 4,  label: "UTE Lages — 28 MW\nLages, SC\nBiomassa florestal (celulose)" },
  // Usina Coruripe — Coruripe/AL | ~100 MW
  { lat: -10.125, lng: -36.176, c: "#22C55E", r: 5,  label: "UTE Coruripe — 100 MW\nCoruripe, AL\nBiomassa bagaço" },

  // ── TERMOELÉTRICAS GÁS / ÓLEO (cor #8B5CF6 = roxo) ─────────
  // UTE Angra 3 (em construção) — Angra dos Reis/RJ
  // UTE Termocabo — Cabo de Santo Agostinho/PE | 100 MW
  { lat: -8.283,  lng: -35.033, c: "#8B5CF6", r: 5,  label: "UTE Termocabo — 100 MW\nCabo de Santo Agostinho, PE\nGás Natural" },
  // UTE Macaé — Macaé/RJ | 960 MW (Petrobras)
  { lat: -22.371, lng: -41.787, c: "#8B5CF6", r: 8,  label: "UTE Norte Fluminense — 960 MW\nMacaé, RJ\nPetrobras — gás natural" },
  // UTE Termorio — Duque de Caxias/RJ | 1.058 MW
  { lat: -22.771, lng: -43.327, c: "#8B5CF6", r: 8,  label: "UTE Termorio — 1.058 MW\nDuque de Caxias, RJ\nGás natural GNL" },
  // UTE Porto Pecém I+II — São Gonçalo do Amarante/CE | 720 MW
  { lat: -3.540,  lng: -38.817, c: "#8B5CF6", r: 7,  label: "UTE Porto Pecém I+II — 720 MW\nSão Gonçalo do Amarante, CE\nCarvão mineral importado" },
  // UTE Candiota — Candiota/RS | 446 MW (carvão)
  { lat: -31.562, lng: -52.680, c: "#8B5CF6", r: 6,  label: "UTE Candiota — 446 MW\nCandiota, RS\nCarvão mineral nacional (maior do Brasil)" },
  // UTE Jorge Lacerda — Capivari de Baixo/SC | 857 MW
  { lat: -28.442, lng: -49.002, c: "#8B5CF6", r: 7,  label: "UTE Jorge Lacerda — 857 MW\nCapivari de Baixo, SC\nCarvão mineral — Tractebel/Engie" },
  // UTE Presidente Médici — Candiota/RS | 446 MW (já incluída)
  // UTE Pampa Sul — Candiota/RS | 345 MW (ELETROSUL)
  { lat: -31.558, lng: -52.671, c: "#8B5CF6", r: 6,  label: "UTE Pampa Sul — 345 MW\nCandiota, RS\nEletrosul — carvão" },

  // ── HUBS / SUBESTAÇÕES ESTRATÉGICAS (cor #E84C1F = vermelho) ─
  { lat: -23.551, lng: -46.633, c: "#E84C1F", r: 9,  label: "SE Sumaré / Hub São Paulo\nHub de transmissão do Sudeste\nCapacidade: >10 GW interligados" },
  { lat: -19.921, lng: -43.938, c: "#E84C1F", r: 8,  label: "SE Ibirité / Hub Belo Horizonte\nSubestação CEMIG 500 kV\nNó crítico do SIN Sudeste" },
  { lat: -25.428, lng: -49.273, c: "#E84C1F", r: 7,  label: "SE Curitiba / Hub Paraná\nCOPEL — 525 kV\nInterligação Sul–Sudeste" },
  { lat: -15.779, lng: -47.930, c: "#E84C1F", r: 7,  label: "SE Samambaia — Brasília/DF\nFURNAS 500 kV\nHub do Centro-Oeste" },
  { lat: -3.717,  lng: -38.542, c: "#E84C1F", r: 7,  label: "SE Pacatuba / Hub Fortaleza\nCHESF 500 kV — Nordeste\nInterligação NE–N" },
  { lat: -12.971, lng: -38.501, c: "#E84C1F", r: 7,  label: "SE Sapeaçu / Hub Salvador\nCHESF / NEOENERGIA 230 kV\nDistribuição BA" },
  { lat: -8.054,  lng: -34.881, c: "#E84C1F", r: 7,  label: "SE Recife / Hub Pernambuco\nCHESF 500 kV\nHub do NE leste" },
  { lat: -30.034, lng: -51.218, c: "#E84C1F", r: 7,  label: "SE Gravataí / Hub Porto Alegre\nELETROSUL 525 kV\nHub do Sul" },
  { lat: -1.455,  lng: -48.502, c: "#E84C1F", r: 6,  label: "SE Tucuruí / Hub Norte\nEletronorte 500 kV\nEscoamento da Amazônia" },
  { lat: -2.529,  lng: -44.302, c: "#E84C1F", r: 6,  label: "SE São Luís / Hub Maranhão\nEletronorte 500 kV\nInterligação Norte–Nordeste" },
];

// ── CAMADAS INFRA INIT ─────────────────────────────────────────
export const CAMADAS_INFRA_INIT = [
  // HIDRELÉTRICAS
  { id: "uhe",         nome: "Hidrelétricas (UHE)",       categoria: "Geração",     cor: "#3B82F6", ativa: true,  qtd: 219  },
  { id: "pch",         nome: "Pequenas Centrais (PCH)",   categoria: "Geração",     cor: "#60A5FA", ativa: false, qtd: 742  },
  // RENOVÁVEIS
  { id: "eolica",      nome: "Parques Eólicos",           categoria: "Renováveis",  cor: "#06B6D4", ativa: true,  qtd: 961  },
  { id: "solar",       nome: "Usinas Solares (FV)",       categoria: "Renováveis",  cor: "#F59E0B", ativa: true,  qtd: 1284 },
  { id: "biomassa",    nome: "Biomassa / Bagaço",         categoria: "Renováveis",  cor: "#22C55E", ativa: false, qtd: 583  },
  // TERMELÉTRICA
  { id: "termica_gas", nome: "Termelét. Gás / GNL",       categoria: "Termelétrica",cor: "#8B5CF6", ativa: false, qtd: 118  },
  { id: "termica_carv",nome: "Termelét. Carvão",          categoria: "Termelétrica",cor: "#7C3AED", ativa: false, qtd: 12   },
  { id: "nuclear",     nome: "Nuclear (Angra 1+2)",       categoria: "Termelétrica",cor: "#6366F1", ativa: false, qtd: 2    },
  // TRANSMISSÃO
  { id: "se500",       nome: "Subestações 500 kV",        categoria: "Transmissão", cor: "#E84C1F", ativa: true,  qtd: 147  },
  { id: "lt500",       nome: "Linhas 500 kV",             categoria: "Transmissão", cor: "#F97316", ativa: false, qtd: 68   },
  // CURTAILMENT
  { id: "curtailment", nome: "Zonas de Curtailment",      categoria: "Operação",    cor: "#FBBF24", ativa: false, qtd: 11   },
];

// ── CAMADAS PID INIT ────────────────────────────────────────────
export const CAMADAS_PID_INIT = [
  { id: "pid_eol",  nome: "Controle eólico",    grupo: "Renováveis",   ativa: true  },
  { id: "pid_sol",  nome: "Controle solar",     grupo: "Renováveis",   ativa: true  },
  { id: "pid_hid",  nome: "Controle hídrico",   grupo: "Hídrico",      ativa: true  },
  { id: "pid_bio",  nome: "Controle biomassa",  grupo: "Renováveis",   ativa: false },
  { id: "pid_term", nome: "Controle térmico",   grupo: "Termelétrica", ativa: false },
  { id: "pid_cur",  nome: "Curtailment ativo",  grupo: "Operação",     ativa: false },
  { id: "pid_freq", nome: "Frequência SIN",     grupo: "Operação",     ativa: true  },
  { id: "pid_tens", nome: "Tensão 500 kV",      grupo: "Transmissão",  ativa: false },
];

// ── INDÚSTRIAS (consumidores intensivos) ───────────────────────
// Fonte: ANEEL / EPE BEN 2024 — maiores consumidores livres
// lat/lng reais de cada planta industrial
export const INDUSTRIAS = [
  { nome: "Companhia Siderúrgica Nacional",  cidade: "Volta Redonda",   estado: "RJ", tipo: "Siderurgia",   consumo: 4200, lat: -22.523, lng: -44.104 },
  { nome: "Usiminas",                         cidade: "Ipatinga",        estado: "MG", tipo: "Siderurgia",   consumo: 3800, lat: -19.468, lng: -42.537 },
  { nome: "ArcelorMittal Tubarão",            cidade: "Serra",           estado: "ES", tipo: "Siderurgia",   consumo: 3500, lat: -20.229, lng: -40.222 },
  { nome: "Gerdau Açominas",                  cidade: "Ouro Branco",     estado: "MG", tipo: "Siderurgia",   consumo: 2900, lat: -20.522, lng: -43.703 },
  { nome: "Alunorte (Hydro)",                 cidade: "Barcarena",       estado: "PA", tipo: "Mineração",    consumo: 5100, lat: -1.511,  lng: -48.620 },
  { nome: "Albras (Hydro)",                   cidade: "Barcarena",       estado: "PA", tipo: "Mineração",    consumo: 3800, lat: -1.519,  lng: -48.631 },
  { nome: "Vale — Carajás",                   cidade: "Parauapebas",     estado: "PA", tipo: "Mineração",    consumo: 6200, lat: -6.067,  lng: -50.083 },
  { nome: "Vale — Tubarão",                   cidade: "Vitória",         estado: "ES", tipo: "Mineração",    consumo: 4100, lat: -20.269, lng: -40.228 },
  { nome: "Samarco",                          cidade: "Mariana",         estado: "MG", tipo: "Mineração",    consumo: 2200, lat: -20.378, lng: -43.416 },
  { nome: "Votorantim Metais — Zinco",        cidade: "Três Marias",     estado: "MG", tipo: "Química",      consumo: 1800, lat: -18.212, lng: -45.267 },
  { nome: "Braskem — Polo Camaçari",          cidade: "Camaçari",        estado: "BA", tipo: "Química",      consumo: 2700, lat: -12.700, lng: -38.324 },
  { nome: "Braskem — Polo Triunfo",           cidade: "Triunfo",         estado: "RS", tipo: "Química",      consumo: 1400, lat: -29.941, lng: -51.717 },
  { nome: "Suzano — Limeira",                 cidade: "Limeira",         estado: "SP", tipo: "Celulose",     consumo: 1600, lat: -22.564, lng: -47.401 },
  { nome: "Suzano — Aracruz",                 cidade: "Aracruz",         estado: "ES", tipo: "Celulose",     consumo: 2100, lat: -19.823, lng: -40.274 },
  { nome: "Eldorado Brasil Celulose",         cidade: "Três Lagoas",     estado: "MS", tipo: "Celulose",     consumo: 1900, lat: -20.785, lng: -51.700 },
  { nome: "CMPC Celulose Riograndense",       cidade: "Guaíba",          estado: "RS", tipo: "Celulose",     consumo: 1200, lat: -30.113, lng: -51.325 },
  { nome: "Petrobras — REDUC",                cidade: "Duque de Caxias", estado: "RJ", tipo: "Petróleo/Gás", consumo: 3100, lat: -22.771, lng: -43.327 },
  { nome: "Petrobras — REPLAN",               cidade: "Paulínia",        estado: "SP", tipo: "Petróleo/Gás", consumo: 2800, lat: -22.756, lng: -47.154 },
  { nome: "Petrobras — RNEST",                cidade: "Ipojuca",         estado: "PE", tipo: "Petróleo/Gás", consumo: 1500, lat: -8.399,  lng: -35.033 },
  { nome: "Cimento Votorantim — Cantagalo",   cidade: "Cantagalo",       estado: "RJ", tipo: "Cimento",      consumo: 480,  lat: -21.984, lng: -42.024 },
  { nome: "Cimentos Nassau — João Dourado",   cidade: "João Dourado",    estado: "BA", tipo: "Cimento",      consumo: 340,  lat: -11.430, lng: -41.470 },
  { nome: "Ambev — Jacareí",                  cidade: "Jacareí",         estado: "SP", tipo: "Alimentos",    consumo: 220,  lat: -23.298, lng: -45.966 },
  { nome: "JBS — Friboi Uberlândia",          cidade: "Uberlândia",      estado: "MG", tipo: "Alimentos",    consumo: 310,  lat: -18.912, lng: -48.275 },
];

// ── TIPOS DE INDÚSTRIA ─────────────────────────────────────────
export const TIPOS = [
  "Todos", "Siderurgia", "Mineração", "Química",
  "Celulose", "Petróleo/Gás", "Cimento", "Alimentos",
];

export const TIPO_COR = {
  "Siderurgia":   "#3B82F6",
  "Mineração":    "#8B5CF6",
  "Química":      "#F59E0B",
  "Celulose":     "#22C55E",
  "Petróleo/Gás": "#E84C1F",
  "Cimento":      "#94A3B8",
  "Alimentos":    "#06B6D4",
};

// ── PARCEIROS & FONTES ─────────────────────────────────────────
export const PARCEIROS = [
  "ANEEL", "ONS", "EPE", "IBGE", "ANA",
  "CCEE", "Volt Robotics", "Instituto E+",
  "Johns Hopkins", "BNDES", "Eletrobras",
];

// ── NAV ITEMS ──────────────────────────────────────────────────
export const NAV_ITEMS = [
{ id: "inicio",         label: "Início"         },
{ id: "infraestrutura", label: "Infraestrutura" },
{ id: "industrias",     label: "Indústrias"     },
{ id: "pid",            label: "PID"            },
{ id: "decisao",        label: "Decisão"        },
];

// ── PERSONA CONFIG ─────────────────────────────────────────────
export const PERSONA_DEFAULT = {
  camadasInfraAtivas: ["uhe", "eolica", "solar", "se500"],
  camadasPIDAtivas:   ["pid_eol", "pid_sol", "pid_hid", "pid_freq"],
  industriaTipoPadrao: "Todos",
  industriaOrdemPadrao: "consumo",
  kpiPrincipalLabel: "Consumo Total Filtrado",
  kpiPrincipalValor: (total) => `${(total / 1000).toFixed(1)} TWh/ano`,
  kpiPrincipalSub:   "Estimativa anual",
  kpiSecLabel:       "Indústrias",
  kpiSecValor:       (filtradas) => filtradas.length,
  bannerTitulo: null,
};

export const PERSONA_CONFIG = {
  operador: {
    ...PERSONA_DEFAULT,
    label: "Operador ONS",
    icon:  "🔴",
    cor:   "#E84C1F",
    ctaLabel: "Ver restrições ONS",
    camadasInfraAtivas: ["uhe", "eolica", "solar", "se500", "curtailment"],
    bannerTitulo: "Modo Operador ONS",
    bannerTexto:  "Exibindo curtailment ativo e restrições operativas em tempo real.",
    bannerCor:      "#E84C1F",
    bannerCorTexto: "#7f1d1d",
    kpiPrincipalLabel: "Curtailment Estimado",
    kpiPrincipalValor: () => "4.021 MWméd",
    kpiPrincipalSub:   "Média 2025 — Fonte: Volt Robotics",
  },
  investidor: {
    ...PERSONA_DEFAULT,
    label: "Investidor",
    icon:  "📈",
    cor:   "#F59E0B",
    ctaLabel: "Ver oportunidades ESG",
    camadasInfraAtivas: ["eolica", "solar", "se500"],
    bannerTitulo: "Modo Investidor",
    bannerTexto:  "Foco em renováveis. Curtailment médio 2025: 20,6% (solar 35%, eólica 15%).",
    bannerCor:      "#F59E0B",
    bannerCorTexto: "#78350f",
    kpiPrincipalLabel: "Capacidade Renovável",
    kpiPrincipalValor: () => "~95 GW",
    kpiPrincipalSub:   "Eólica + Solar — ANEEL dez/2024",
  },
  regulador: {
    ...PERSONA_DEFAULT,
    label: "Regulador ANEEL",
    icon:  "⚖️",
    cor:   "#3B82F6",
    ctaLabel: "Exportar dados ANEEL",
    camadasInfraAtivas: ["uhe", "pch", "eolica", "solar", "biomassa", "se500", "curtailment"],
    bannerTitulo: "Modo Regulador ANEEL",
    bannerTexto:  "Visão completa da matriz. Capacidade total SIN: 208.930 MW (dez/2024).",
    bannerCor:      "#3B82F6",
    bannerCorTexto: "#1e3a5f",
    kpiPrincipalLabel: "Capacidade SIN",
    kpiPrincipalValor: () => "208,9 GW",
    kpiPrincipalSub:   "Fonte: ANEEL SIGA — dez/2024",
  },
};