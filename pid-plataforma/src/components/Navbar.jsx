import React from "react";
import { NAV_ITEMS, PERSONA_CONFIG } from "../models/data";

export function Navbar({ pagina, setPagina, persona }) {
  const [menuAberto, setMenuAberto] = React.useState(false);

  const cfg = persona ? PERSONA_CONFIG[persona] : null;

  return (
    <nav className="bg-white flex items-center px-4 md:px-8 h-14 border-b border-gray-200 shadow-sm sticky top-0" style={{ zIndex: 9999 }}>

      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer flex-shrink-0"
        onClick={() => setPagina("inicio")}
      >
        <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white font-extrabold text-[11px]">
          PID
        </div>
        <div className="hidden sm:block text-black text-[11px] leading-tight">
          <div className="font-semibold">plataforma interativa</div>
          <div className="opacity-60">de descarbonização</div>
        </div>
      </div>

      {/* Badge de persona */}
      {cfg && (
        <button
          onClick={() => setPagina("inicio")}
          className="ml-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-200 hover:opacity-80 flex-shrink-0"
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
            className="text-[10px] hidden md:block"
            style={{ color: cfg.cor, opacity: 0.7 }}
          >
            ↗
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

      {/* Hambúrguer Mobile */}
      <button
        onClick={() => setMenuAberto(!menuAberto)}
        className="md:hidden ml-auto text-2xl text-navy focus:outline-none"
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
          {cfg && (
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