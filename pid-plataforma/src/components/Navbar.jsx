import React from "react";
import { NAV_ITEMS } from "../models/data";

export function Navbar({ pagina, setPagina }) {
  const [idioma, setIdioma] = React.useState("PT");
  const [menuAberto, setMenuAberto] = React.useState(false);

  return (
    <nav className="bg-white flex items-center px-4 md:px-8 h-16 border-b border-gray-200 shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer flex-shrink-0 mr-2"
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

      {/* Links Desktop */}
      <div className="hidden md:flex flex-1">
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

      {/* Idioma Desktop */}
      <div className="hidden md:flex gap-1 bg-white/50 rounded-full p-1">
        {["PT", "EN"].map((l) => (
          <button
            key={l}
            onClick={() => setIdioma(l)}
            className={`px-2.5 py-0.5 rounded-full border-none cursor-pointer text-[11px] font-bold ${
              l === idioma ? "bg-brand text-black" : "bg-transparent text-black"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Menu Hambúrguer Mobile */}
      <button
        onClick={() => setMenuAberto(!menuAberto)}
        className="md:hidden ml-auto text-2xl text-navy focus:outline-none"
      >
        {menuAberto ? "✕" : "☰"}
      </button>

      {/* Menu Mobile */}
      {menuAberto && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden">
          <div className="flex flex-col">
            {NAV_ITEMS.map((n) => (
              <button
                key={n.id}
                onClick={() => {
                  setPagina(n.id);
                  setMenuAberto(false);
                }}
                className={`px-6 py-4 text-left border-b border-gray-100 transition-colors ${
                  pagina === n.id
                    ? "font-semibold text-brand bg-orange-50"
                    : "font-normal text-slate-600 hover:bg-gray-50"
                }`}
              >
                {n.label}
              </button>
            ))}
            <div className="flex gap-2 p-4 justify-center bg-gray-50">
              {["PT", "EN"].map((l) => (
                <button
                  key={l}
                  onClick={() => setIdioma(l)}
                  className={`px-4 py-2 rounded-full text-xs font-bold ${
                    l === idioma ? "bg-brand text-white" : "bg-white text-black border border-gray-200"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
