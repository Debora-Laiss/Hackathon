// ── MODEL ──────────────────────────────────────────────────────
// Responsável pelos dados e constantes da aplicação (sem lógica de UI)

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

export const CAMADAS_INFRA_INIT = [
  { id:"hubs",       nome:"Hubs de Descarbonização",  categoria:"Estratégico", cor:"#8B5CF6", qtd:45,   ativa:true  },
  { id:"portos",     nome:"Instalações Portuárias",   categoria:"Logística",   cor:"#06B6D4", qtd:128,  ativa:true  },
  { id:"biomassa",   nome:"Biomassa Existentes",      categoria:"Renováveis",  cor:"#22C55E", qtd:892,  ativa:true  },
  { id:"biometano",  nome:"Biometano Comercial",      categoria:"Renováveis",  cor:"#84CC16", qtd:34,   ativa:false },
  { id:"eolica",     nome:"Eólica Existente",         categoria:"Renováveis",  cor:"#0EA5E9", qtd:756,  ativa:true  },
  { id:"solar",      nome:"Solar UFV Existente",      categoria:"Renováveis",  cor:"#F59E0B", qtd:1243, ativa:true  },
  { id:"hidreletrica",nome:"Hidrelétrica UHE",        categoria:"Renováveis",  cor:"#3B82F6", qtd:214,  ativa:true  },
  { id:"isolados",   nome:"Sistemas Isolados",        categoria:"Energia",     cor:"#6B7280", qtd:67,   ativa:false },
];

export const CAMADAS_PID_INIT = [
  { id:"transicao", nome:"Indicadores da Transição Energética", grupo:"Indicadores", ativa:false },
  { id:"bip",       nome:"Projetos BIP",                        grupo:"Projetos",     ativa:true  },
  { id:"energeticos",nome:"Energéticos Descarbonizantes",       grupo:"Energia",      ativa:false },
  { id:"ind_l",     nome:"Indústrias",                          grupo:"Setores",      ativa:true  },
  { id:"inf_l",     nome:"Infraestrutura",                      grupo:"Setores",      ativa:true  },
  { id:"hubs_l",    nome:"Hubs de Descarbonização",             grupo:"Energia",      ativa:true  },
  { id:"minerais",  nome:"Recursos Minerais",                   grupo:"Recursos",     ativa:false },
  { id:"terra",     nome:"Uso da terra",                        grupo:"Recursos",     ativa:false },
  { id:"co2",       nome:"CO₂ Emissão",                         grupo:"Indicadores",  ativa:true  },
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
