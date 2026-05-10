import React from "react";
import { NAV_ITEMS, PERSONA_CONFIG } from "../models/data";
import logo from "../assets/logo.svg";

const PERSONAS_LISTA = [
  { id: "investidor", label: "Investidor", icon: "📈" },
  { id: "governo", label: "Governo", icon: "🏛️" },
  { id: "consultor", label: "Consultor Técnico", icon: "🔬" },
  { id: "cidadao", label: "Cidadão", icon: "🌱" },
];

export function Navbar({ pagina, setPagina, persona, setPersona }) {
  const [menuAberto, setMenuAberto] = React.useState(false);
  const [dropdownAberto, setDropdownAberto] = React.useState(false);
  const dropdownRef = React.useRef(null);

  const cfg = persona ? PERSONA_CONFIG[persona] : null;

  // Função para ir até a seção de escolha de persona
  const irParaEscolherPersona = () => {
    setPagina("inicio");
    // Aguarda a navegação e faz scroll para a seção de personas
    setTimeout(() => {
      const secao = document.getElementById("escolher-persona");
      if (secao) {
        secao.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Fecha dropdown ao clicar fora
  React.useEffect(() => {
    function handleClickFora(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  return (
    <nav className="bg-white flex items-center px-4 md:px-8 h-14 border-b border-gray-200 shadow-sm sticky top-0" style={{ zIndex: 9999 }}>

      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer flex-shrink-0"
        onClick={() => setPagina("inicio")}
      >
        <img src={logo} alt="PID" className="w-8 h-8" />
        <div className="hidden sm:block text-black text-[11px] leading-tight">
          <div className="font-semibold">plataforma interativa</div>
          <div className="opacity-60">de descarbonização</div>
        </div>
      </div>

      {/* Badge de persona com dropdown */}
      {cfg ? (
        <div className="relative ml-2 sm:ml-3" ref={dropdownRef}>
          <button
            onClick={() => setDropdownAberto(!dropdownAberto)}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full border transition-all duration-200 hover:opacity-80 active:scale-95 flex-shrink-0"
            style={{
              borderColor: cfg.cor + "55",
              background:  cfg.cor + "18",
            }}
            title="Trocar perfil"
          >
            <span className="text-sm leading-none">{cfg.icon}</span>
            <span
              className="text-[11px] font-bold hidden xs:block"
              style={{ color: cfg.cor }}
            >
              {cfg.label}
            </span>
            <span
              className="text-[9px] sm:text-[10px]"
              style={{ color: cfg.cor, opacity: 0.7, transform: dropdownAberto ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
            >
              ▼
            </span>
          </button>

          {/* Dropdown */}
          {dropdownAberto && (
            <>
              {/* Overlay para fechar ao clicar fora (mobile) */}
              <div 
                className="fixed inset-0 md:hidden" 
                style={{ zIndex: 9998 }}
                onClick={() => setDropdownAberto(false)}
              />
              
              <div
                className="fixed md:absolute top-auto md:top-full bottom-0 md:bottom-auto left-0 md:left-auto right-0 md:right-0 md:mt-2 bg-white rounded-t-2xl md:rounded-xl shadow-2xl md:shadow-lg border-t md:border border-gray-200 py-3 md:py-2 w-full md:w-[240px]"
                style={{ zIndex: 9999 }}
              >
                {/* Handle para arrastar (mobile) */}
                <div className="md:hidden flex justify-center pb-2">
                  <div className="w-10 h-1 bg-gray-300 rounded-full" />
                </div>

                <div className="px-4 md:px-3 py-2 border-b border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Trocar Perfil</p>
                </div>
                {PERSONAS_LISTA.map((p) => {
                  const isAtivo = persona === p.id;
                  const pCfg = PERSONA_CONFIG[p.id];
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPersona(p.id);
                        setDropdownAberto(false);
                      }}
                      className="w-full flex items-center gap-3 md:gap-2.5 px-4 md:px-3 py-3 md:py-2.5 text-left hover:bg-gray-50 transition-colors active:bg-gray-100"
                      style={{
                        background: isAtivo ? pCfg.cor + "10" : "transparent",
                      }}
                    >
                      <span className="text-xl md:text-lg flex-shrink-0">{p.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-sm md:text-xs font-semibold truncate"
                          style={{ color: isAtivo ? pCfg.cor : "#1A2744" }}
                        >
                          {p.label}
                        </div>
                      </div>
                      {isAtivo && (
                        <span className="text-sm md:text-xs flex-shrink-0 font-bold" style={{ color: pCfg.cor }}>✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      ) : (
        <button
          onClick={irParaEscolherPersona}
          className="ml-2 sm:ml-3 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full border border-gray-300 bg-gray-100 transition-all duration-200 hover:bg-gray-200 active:scale-95 flex-shrink-0"
          title="Escolher perfil"
        >
          <span className="text-sm leading-none">👤</span>
          <span className="text-[11px] font-bold text-gray-600 hidden xs:block">
            Escolher Perfil
          </span>
        </button>
      )}

      {/* Links Desktop */}
      <div className="hidden md:flex flex-1 ml-2">
        {NAV_ITEMS.map((n) => (
          <button
            key={n.id}
            onClick={() => setPagina(n.id)}
            className={`px-3 lg:px-4 h-14 bg-transparent border-none cursor-pointer text-xs lg:text-sm transition-all duration-150 ${
              pagina === n.id
                ? "font-semibold text-brand border-b-2 border-brand"
                : "font-normal text-slate-400 border-b-2 border-transparent hover:text-brand"
            }`}
          >
            {n.label}
          </button>
        ))}
      </div>

      {/* Botão Jogue Agora - Desktop */}
      <a
        href="https://quiz-omega-blush.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex items-center gap-2 ml-4 px-4 py-2 rounded-lg font-bold text-sm text-white transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
        style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)' }}
      >
        <span className="text-lg">🎮</span>
        JOGUE AGORA!
      </a>

      {/* Botão Jogue Agora - Mobile */}
      <a
        href="https://quiz-omega-blush.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden ml-auto mr-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs text-white transition-all duration-200 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)' }}
      >
        <span className="text-base">🎮</span>
        JOGAR
      </a>

      {/* Hambúrguer Mobile */}
      <button
        onClick={() => setMenuAberto(!menuAberto)}
        className="md:hidden text-2xl text-navy focus:outline-none"
        aria-label="Menu"
      >
        {menuAberto ? "✕" : "☰"}
      </button>

      {/* Menu Mobile */}
      {menuAberto && (
        <div
          className="absolute top-14 left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden"
          style={{ zIndex: 9999 }}
        >
          {/* Banner de persona no topo do menu mobile */}
          {cfg ? (
            <button
              onClick={() => { setPagina("inicio"); setMenuAberto(false); }}
              className="w-full flex items-center gap-3 px-5 py-3 border-b border-gray-100 text-left"
              style={{ background: cfg.cor + "12" }}
            >
              <span className="text-xl">{cfg.icon}</span>
              <div>
                <div className="text-xs font-bold" style={{ color: cfg.cor }}>
                  Perfil ativo: {cfg.label}
                </div>
                <div className="text-[11px] text-slate-400">Toque para trocar</div>
              </div>
            </button>
          ) : (
            <button
              onClick={() => {
                setMenuAberto(false);
                irParaEscolherPersona();
              }}
              className="w-full flex items-center gap-3 px-5 py-3 border-b border-gray-100 text-left bg-gray-50"
            >
              <span className="text-xl">👤</span>
              <div>
                <div className="text-xs font-bold text-gray-600">
                  Nenhum perfil selecionado
                </div>
                <div className="text-[11px] text-slate-400">Toque para escolher</div>
              </div>
            </button>
          )}

          <div className="flex flex-col">
            {NAV_ITEMS.map((n) => (
              <button
                key={n.id}
                onClick={() => { setPagina(n.id); setMenuAberto(false); }}
                className={`px-6 py-4 text-left border-b border-gray-100 transition-colors text-sm ${
                  pagina === n.id
                    ? "font-semibold text-brand bg-orange-50"
                    : "font-normal text-slate-600 hover:bg-gray-50"
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}