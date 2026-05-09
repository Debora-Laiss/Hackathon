import { Toggle, MapaBrasil } from "../components/BaseComponents";
import { ESTADOS } from "../models/data";
import { useInfraestruturaController } from "../controllers/controllers";

export function PaginaInfraestrutura() {
  const {
    camadas, estado, aberta,
    setEstado, setAberta,
    toggleCamada, ativas, categorias, dots, totalPontos,
  } = useInfraestruturaController();

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden">
      {/* Sidebar */}
      <div className={`flex-shrink-0 transition-all duration-300 overflow-hidden bg-white border-r border-gray-200 ${
        aberta ? "w-[276px]" : "w-0"
      }`}>
        <div className="w-[276px] h-full overflow-y-auto p-5">
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-bold text-navy">Filtros & Camadas</span>
            <span className="text-[11px] font-bold bg-brand text-white rounded-full px-2 py-0.5">
              {ativas.length} ativas
            </span>
          </div>

          {/* Filtro estado */}
          <div className="mb-5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Estado</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white text-navy">
              {ESTADOS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Camadas por categoria */}
          {categorias.map((cat) => (
            <div key={cat} className="mb-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">{cat}</div>
              {camadas.filter((c) => c.categoria === cat).map((c) => (
                <div key={c.id} onClick={() => toggleCamada(c.id)} className={`flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer mb-0.5 ${
                  c.ativa ? "bg-gray-50" : "bg-transparent"
                }`}>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.cor }} />
                    <span className={`text-xs overflow-hidden text-ellipsis whitespace-nowrap ${
                      c.ativa ? "text-navy font-medium" : "text-slate-400 font-normal"
                    }`}>
                      {c.nome}
                    </span>
                  </div>
                  <Toggle checked={c.ativa} onChange={() => toggleCamada(c.id)} />
                </div>
              ))}
            </div>
          ))}

          {/* Resumo */}
          <div className="bg-sky-50 rounded-xl px-3.5 py-3 text-center">
            <div className="text-xl font-extrabold text-navy">{totalPontos.toLocaleString("pt-BR")}</div>
            <div className="text-[11px] text-muted mt-0.5">pontos visíveis no mapa</div>
          </div>
        </div>
      </div>

      {/* Área do mapa */}
      <div className="flex-1 relative">
        <MapaBrasil dots={dots} titulo="Infraestrutura Energética – Brasil" />

        {/* Botão Filtros */}
        <button 
          onClick={() => setAberta(!aberta)} 
          className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-navy cursor-pointer shadow-md z-10 hover:bg-gray-50 transition-colors"
        >
          {aberta ? "◀ Recolher" : "▶ Filtros"}
        </button>

        {/* Badge Estado Selecionado */}
        {estado !== "Todos" && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-navy rounded-full px-3 md:px-4 py-1 md:py-1.5 flex items-center gap-2 shadow-lg z-10">
            <span className="text-white text-xs md:text-sm font-semibold">📍 {estado}</span>
            <button onClick={() => setEstado("Todos")} className="text-white/60 bg-transparent border-none cursor-pointer text-base hover:text-white">×</button>
          </div>
        )}

        {/* Legenda flutuante */}
        <div className="absolute bottom-4 right-4 bg-white/95 rounded-xl shadow-lg p-3 min-w-[200px] max-w-[90vw] md:max-w-none">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Camadas ativas</p>
          {ativas.map((c) => (
            <div key={c.id} className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.cor }} />
              <span className="text-[11px] text-slate-600 flex-1 truncate">{c.nome}</span>
              <span className="text-[11px] text-slate-400 flex-shrink-0">{c.qtd.toLocaleString("pt-BR")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
