// ── MODEL ──────────────────────────────────────────────────────

export const TIPOS = ["Todos", "Aço", "Cimento", "Celulose", "Alumínio", "Química"];

export const ESTADOS = [
  "Todos","AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG",
  "MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO",
];

export const TIPO_COR = {
  Aço:      "#E84C1F",
  Alumínio: "#8B5CF6",
  Química:  "#06B6D4",
  Celulose: "#22C55E",
  Cimento:  "#F59E0B",
};

export const INDUSTRIAS = [
  { id:1,  nome:"TERNIUM BRASIL LTDA.",                tipo:"Aço",      estado:"RJ", cidade:"Rio de Janeiro",           consumo:450 },
  { id:2,  nome:"USINAS SIDERURGICAS MG – USIMINAS",   tipo:"Aço",      estado:"MG", cidade:"Ipatinga",                 consumo:380 },
  { id:3,  nome:"GERDAU ACOMINAS S/A",                 tipo:"Aço",      estado:"MG", cidade:"Ouro Branco",              consumo:350 },
  { id:4,  nome:"ARCELORMITTAL BRASIL S.A.",           tipo:"Aço",      estado:"ES", cidade:"Serra",                    consumo:320 },
  { id:5,  nome:"APERAM INOX AMERICA DO SUL S.A.",     tipo:"Aço",      estado:"MG", cidade:"Timóteo",                  consumo:280 },
  { id:6,  nome:"ARCELORMITTAL BRASIL S.A.",           tipo:"Aço",      estado:"SP", cidade:"Piracicaba",               consumo:260 },
  { id:7,  nome:"VALLOUREC SOLUCOES TUBULARES",        tipo:"Aço",      estado:"MG", cidade:"Jeceaba",                  consumo:240 },
  { id:8,  nome:"ALUNORTE ALUMINA DO NORTE",           tipo:"Alumínio", estado:"PA", cidade:"Barcarena",                consumo:480 },
  { id:9,  nome:"ALUMAR CONSORCIO",                    tipo:"Alumínio", estado:"MA", cidade:"São Luís",                 consumo:420 },
  { id:10, nome:"BRASKEM S.A.",                        tipo:"Química",  estado:"BA", cidade:"Camaçari",                 consumo:300 },
  { id:11, nome:"PETROBRAS PETROQUÍMICA",              tipo:"Química",  estado:"RJ", cidade:"Duque de Caxias",          consumo:290 },
  { id:12, nome:"SUZANO PAPEL E CELULOSE",             tipo:"Celulose", estado:"BA", cidade:"Mucuri",                   consumo:160 },
  { id:13, nome:"FIBRIA CELULOSE S.A.",                tipo:"Celulose", estado:"ES", cidade:"Aracruz",                  consumo:155 },
  { id:14, nome:"VOTORANTIM CIMENTOS",                 tipo:"Cimento",  estado:"PR", cidade:"Curitiba",                 consumo:170 },
  { id:15, nome:"CIMPOR BRASIL",                       tipo:"Cimento",  estado:"SP", cidade:"São Paulo",                consumo:180 },
  { id:16, nome:"GERDAU ACOS LONGOS S.A.",             tipo:"Aço",      estado:"RJ", cidade:"Rio de Janeiro",           consumo:210 },
  { id:17, nome:"SIDERURGICA NORTE BRASIL S/A",        tipo:"Aço",      estado:"PA", cidade:"Marabá",                   consumo:190 },
  { id:18, nome:"ARCELORMITTAL PECEM S.A.",            tipo:"Aço",      estado:"CE", cidade:"São Gonçalo do Amarante",  consumo:200 },
  { id:19, nome:"GERDAU S.A.",                         tipo:"Aço",      estado:"RS", cidade:"Porto Alegre",             consumo:220 },
  { id:20, nome:"VILLARES METALS SA",                  tipo:"Aço",      estado:"SP", cidade:"Sumaré",                   consumo:185 },
];

// ── PERSONA CONFIG ─────────────────────────────────────────────
// Centraliza tudo que muda por perfil: camadas ativas, KPIs, linguagem e CTAs.
export const PERSONA_CONFIG = {
  investidor: {
    label:    "Investidor",
    icon:     "📈",
    cor:      "#7B9EFF",
    corBg:    "#1A2744",

    // Infraestrutura: quais camadas ficam ativas por padrão
    camadasInfraAtivas: ["hubs", "solar", "eolica", "hidreletrica"],

    // PID: quais camadas ficam ativas por padrão
    camadasPIDAtivas: ["bip", "hubs_l", "ind_l", "co2"],

    // Indústrias: tipo e ordem padrão
    industriaTipoPadrao:  "Todos",
    industriaOrdemPadrao: "consumo",

    // Banner contextual nas páginas de mapa
    bannerTitulo: "Visão de investimento",
    bannerTexto:  "Fontes renováveis e hubs de descarbonização destacados — foco em retorno e portfólio ESG.",
    bannerCor:    "#1A2744",
    bannerCorTexto: "#7B9EFF",

    // KPIs personalizados na página de Indústrias
    kpiPrincipalLabel: "Potencial de mercado",
    kpiPrincipalValor: (total) => `R$ ${(total * 0.12).toFixed(0)}M`,
    kpiPrincipalSub:   "estimativa anual descarbonização",
    kpiSecLabel:       "Indústrias ESG-elegíveis",
    kpiSecValor:       (lista) => lista.filter(i => i.consumo > 200).length,

    // CTA da toolbar na PID
    ctaLabel: "Ver oportunidades de investimento →",
    ctaCor:   "#7B9EFF",

    // Mensagem do chatbot ao entrar
    chatWelcome: "Olá! Como posso ajudar sua análise de investimentos em descarbonização?",
  },

  governo: {
    label:    "Governo",
    icon:     "🏛️",
    cor:      "#34D399",
    corBg:    "#085041",

    camadasInfraAtivas: ["hubs", "biomassa", "eolica", "solar", "hidreletrica"],
    camadasPIDAtivas:   ["co2", "transicao", "ind_l", "inf_l", "hubs_l"],

    industriaTipoPadrao:  "Todos",
    industriaOrdemPadrao: "consumo",

    bannerTitulo: "Visão territorial",
    bannerTexto:  "Emissões de CO₂ e indicadores de transição energética por estado — base para políticas públicas.",
    bannerCor:    "#085041",
    bannerCorTexto: "#34D399",

    kpiPrincipalLabel: "Emissões totais (estimativa)",
    kpiPrincipalValor: (total) => `${(total * 0.42).toFixed(0)}kt CO₂`,
    kpiPrincipalSub:   "equivalente em carbono",
    kpiSecLabel:       "Estados impactados",
    kpiSecValor:       (lista) => new Set(lista.map(i => i.estado)).size,

    ctaLabel: "Ver metas por estado →",
    ctaCor:   "#34D399",

    chatWelcome: "Olá! Posso ajudar com dados territoriais e metas de descarbonização por estado.",
  },

  consultor: {
    label:    "Consultor Técnico",
    icon:     "🔬",
    cor:      "#FF8C69",
    corBg:    "#4A1B0C",

    camadasInfraAtivas: ["hubs", "portos", "biomassa", "biometano", "eolica", "solar", "hidreletrica", "isolados"],
    camadasPIDAtivas:   ["transicao", "bip", "energeticos", "ind_l", "inf_l", "hubs_l", "minerais", "co2"],

    industriaTipoPadrao:  "Todos",
    industriaOrdemPadrao: "consumo",

    bannerTitulo: "Modo técnico completo",
    bannerTexto:  "Todas as camadas disponíveis ativas — indicadores setoriais, GIS e infraestrutura detalhada.",
    bannerCor:    "#4A1B0C",
    bannerCorTexto: "#FF8C69",

    kpiPrincipalLabel: "Consumo total (MWh)",
    kpiPrincipalValor: (total) => `${total.toLocaleString("pt-BR")}k`,
    kpiPrincipalSub:   "soma das indústrias filtradas",
    kpiSecLabel:       "Indústrias analisadas",
    kpiSecValor:       (lista) => lista.length,

    ctaLabel: "Exportar dados técnicos →",
    ctaCor:   "#FF8C69",

    chatWelcome: "Olá! Acesso técnico completo disponível. Qual análise setorial você precisa?",
  },

  cidadao: {
    label:    "Cidadão",
    icon:     "🌱",
    cor:      "#86EFAC",
    corBg:    "#173404",

    camadasInfraAtivas: ["solar", "eolica", "biomassa"],
    camadasPIDAtivas:   ["ind_l", "co2", "hubs_l"],

    industriaTipoPadrao:  "Todos",
    industriaOrdemPadrao: "nome",

    bannerTitulo: "Impacto na sua cidade",
    bannerTexto:  "Veja como a energia limpa está chegando perto de você — de um jeito fácil de entender.",
    bannerCor:    "#173404",
    bannerCorTexto: "#86EFAC",

    kpiPrincipalLabel: "Equivalente em casas",
    kpiPrincipalValor: (total) => `${(total * 280).toLocaleString("pt-BR")}`,
    kpiPrincipalSub:   "residências abastecidas por ano",
    kpiSecLabel:       "Cidades com projetos",
    kpiSecValor:       (lista) => new Set(lista.map(i => i.cidade)).size,

    ctaLabel: "O que isso muda na minha cidade? →",
    ctaCor:   "#86EFAC",

    chatWelcome: "Olá! Vou explicar a transição energética de um jeito simples e próximo da sua realidade.",
  },
};

// Config padrão (sem persona selecionada)
export const PERSONA_DEFAULT = {
  camadasInfraAtivas: ["hubs", "solar", "eolica", "hidreletrica", "biomassa"],
  camadasPIDAtivas:   ["bip", "ind_l", "inf_l", "hubs_l", "co2"],
  industriaTipoPadrao:  "Todos",
  industriaOrdemPadrao: "consumo",
  bannerTitulo: null,
  kpiPrincipalLabel: "MWh consumo total",
  kpiPrincipalValor: (total) => `${total.toLocaleString("pt-BR")}k`,
  kpiPrincipalSub:   "soma das indústrias filtradas",
  kpiSecLabel:       "Indústrias",
  kpiSecValor:       (lista) => lista.length,
  ctaLabel: null,
  chatWelcome: "Olá! Como posso ajudar com dados de descarbonização?",
};

export const CAMADAS_INFRA_INIT = [
  { id:"hubs",        nome:"Hubs de Descarbonização",  categoria:"Estratégico", cor:"#8B5CF6", qtd:45,   ativa:true  },
  { id:"portos",      nome:"Instalações Portuárias",   categoria:"Logística",   cor:"#06B6D4", qtd:128,  ativa:true  },
  { id:"biomassa",    nome:"Biomassa Existentes",      categoria:"Renováveis",  cor:"#22C55E", qtd:892,  ativa:true  },
  { id:"biometano",   nome:"Biometano Comercial",      categoria:"Renováveis",  cor:"#84CC16", qtd:34,   ativa:false },
  { id:"eolica",      nome:"Eólica Existente",         categoria:"Renováveis",  cor:"#0EA5E9", qtd:756,  ativa:true  },
  { id:"solar",       nome:"Solar UFV Existente",      categoria:"Renováveis",  cor:"#F59E0B", qtd:1243, ativa:true  },
  { id:"hidreletrica",nome:"Hidrelétrica UHE",         categoria:"Renováveis",  cor:"#3B82F6", qtd:214,  ativa:true  },
  { id:"isolados",    nome:"Sistemas Isolados",        categoria:"Energia",     cor:"#6B7280", qtd:67,   ativa:false },
];

export const CAMADAS_PID_INIT = [
  { id:"transicao",  nome:"Indicadores da Transição Energética", grupo:"Indicadores", ativa:false },
  { id:"bip",        nome:"Projetos BIP",                        grupo:"Projetos",     ativa:true  },
  { id:"energeticos",nome:"Energéticos Descarbonizantes",        grupo:"Energia",      ativa:false },
  { id:"ind_l",      nome:"Indústrias",                          grupo:"Setores",      ativa:true  },
  { id:"inf_l",      nome:"Infraestrutura",                      grupo:"Setores",      ativa:true  },
  { id:"hubs_l",     nome:"Hubs de Descarbonização",             grupo:"Energia",      ativa:true  },
  { id:"minerais",   nome:"Recursos Minerais",                   grupo:"Recursos",     ativa:false },
  { id:"terra",      nome:"Uso da terra",                        grupo:"Recursos",     ativa:false },
  { id:"co2",        nome:"CO₂ Emissão",                         grupo:"Indicadores",  ativa:true  },
];

export const DOTS_BASE = [
  {x:71,y:22,c:"#8B5CF6",r:7},{x:75,y:25,c:"#06B6D4",r:5},{x:72,y:29,c:"#22C55E",r:6},
  {x:68,y:27,c:"#F59E0B",r:4},{x:66,y:32,c:"#0EA5E9",r:4},{x:74,y:23,c:"#22C55E",r:3},
  {x:69,y:53,c:"#E84C1F",r:9},{x:73,y:57,c:"#E84C1F",r:8},{x:67,y:58,c:"#8B5CF6",r:7},
  {x:72,y:60,c:"#22C55E",r:5},{x:68,y:55,c:"#F59E0B",r:6},{x:75,y:55,c:"#3B82F6",r:6},
  {x:64,y:65,c:"#3B82F6",r:7},{x:67,y:70,c:"#22C55E",r:5},{x:62,y:68,c:"#F59E0B",r:4},
  {x:40,y:22,c:"#22C55E",r:5},{x:46,y:28,c:"#22C55E",r:4},{x:53,y:24,c:"#3B82F6",r:6},
  {x:55,y:44,c:"#22C55E",r:5},{x:57,y:48,c:"#8B5CF6",r:4},{x:54,y:50,c:"#F59E0B",r:6},
  {x:58,y:30,c:"#E84C1F",r:6},{x:56,y:35,c:"#8B5CF6",r:5},{x:49,y:38,c:"#06B6D4",r:4},
];

export const NAV_ITEMS = [
  { id:"inicio",         label:"Início"        },
  { id:"infraestrutura", label:"Infraestrutura" },
  { id:"industrias",     label:"Indústrias"    },
  { id:"pid",            label:"PID"           },
  { id:"saiba",          label:"Saiba mais"    },
];

export const PARCEIROS = ["IDE-SIGIMA","ANEEL","EPE","IBGE","MapBiomas","IEA"];