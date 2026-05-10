// ── COMPONENTES BASE ───────────────────────────────────────────
import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { CURTAILMENT_ESTADOS, DOTS_BASE } from '../models/data';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
const DATA_ESTADOS = 'https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo+json&qualidade=minima&intrarregiao=UF';

// Coordenadas reais dos centróides dos estados com curtailment
const CURTAILMENT_COORDS = {
  RN: { lat: -5.8,  lng: -36.6 },
  BA: { lat: -12.5, lng: -41.7 },
  MG: { lat: -18.5, lng: -44.4 },
  CE: { lat: -5.2,  lng: -39.3 },
  PI: { lat: -7.7,  lng: -42.7 },
  PE: { lat: -8.4,  lng: -37.9 },
  PB: { lat: -7.2,  lng: -36.8 },
  MA: { lat: -5.4,  lng: -44.9 },
  RS: { lat: -30.0, lng: -53.3 },
  SP: { lat: -22.3, lng: -48.9 },
  SC: { lat: -27.4, lng: -50.2 },
};

function buildCurtailmentDots() {
  return CURTAILMENT_ESTADOS.map((e) => {
    const coords = CURTAILMENT_COORDS[e.estado] || { lat: -15, lng: -47 };
    const mwhM = (e.mwhPerdidos / 1e6).toFixed(1);
    const prejB = (e.prejuizoReais / 1e9).toFixed(2);
    return {
      lat: coords.lat,
      lng: coords.lng,
      c: e.intensidade === "critico" ? "#FBBF24"
        : e.intensidade === "alto"   ? "#F97316"
        :                              "#FDE68A",
      r: e.intensidade === "critico" ? 14
        : e.intensidade === "alto"   ? 10
        :                              7,
      label: `⚡ ${e.estado} — Curtailment\n${mwhM}M MWh perdidos (${e.percentualCorte}% de corte)\nPrejuízo: R$ ${prejB}bi\nFonte: ${e.fontesPrincipais}`,
    };
  });
}

function dotsToGeoJSON(dots) {
  return {
    type: 'FeatureCollection',
    features: dots.map((d, i) => ({
      type: 'Feature',
      id: i,
      geometry: { type: 'Point', coordinates: [d.lng, d.lat] },
      properties: { label: d.label, color: d.c, radius: d.r },
    })),
  };
}

// ── Resolve dots para lat/lng reais ───────────────────────────
// Se os dots já vierem com lat/lng, usa direto.
// Se vierem com x/y (sistema legado do controller de indústrias), converte.
// Se vier vazio ou nulo, usa DOTS_BASE do data.js.
function resolveDots(dots) {
  if (!dots || dots.length === 0) return DOTS_BASE;

  const primeiro = dots[0];

  // Já tem lat/lng reais → usa direto
  if (primeiro.lat !== undefined && primeiro.lng !== undefined) {
    return dots;
  }

  // Tem x/y (legado) → converte para lat/lng aproximado no Brasil
  return dots.map((d, i) => ({
    lat: -33 + ((d.y ?? 50) / 90) * 38,
    lng: -74 + ((d.x ?? 50) / 100) * 46,
    c: d.c,
    r: d.r,
    label: d.label || `Ponto ${i + 1}`,
  }));
}

// ── Toggle ─────────────────────────────────────────────────────
export function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        position: "relative", display: "inline-flex", height: 20, width: 36,
        flexShrink: 0, alignItems: "center", borderRadius: 99, border: "none",
        cursor: "pointer",
        background: checked ? "#E84C1F" : "#CBD5E1",
        transition: "background 0.2s",
      }}
    >
      <span style={{
        display: "inline-block", height: 14, width: 14, borderRadius: "50%",
        background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        transform: checked ? "translateX(19px)" : "translateX(3px)",
        transition: "transform 0.2s",
      }} />
    </button>
  );
}

// ── MapaBrasil ─────────────────────────────────────────────────
export function MapaBrasil({ dots, showCurtailment = false }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const mapLoaded = useRef(false);
  const popupRef = useRef(null);

  // Inicializa o mapa uma única vez
  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: [-51.9, -14.2],
      zoom: 4,
      minZoom: 3,
      maxZoom: 10,
    });

    popupRef.current = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 14,
    });

    map.current.on('load', () => {
      mapLoaded.current = true;

      // ── ESTADOS ──────────────────────────────────────────────
      map.current.addSource('estados', {
        type: 'geojson',
        data: DATA_ESTADOS,
        generateId: true,
      });
      map.current.addLayer({ id: 'estados-fill', type: 'fill', source: 'estados', paint: { 'fill-color': 'rgba(0,0,0,0)' } });
      map.current.addLayer({
        id: 'estados-highlight', type: 'fill', source: 'estados',
        paint: {
          'fill-color': '#03254D',
          'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.18, 0],
        },
      });
      map.current.addLayer({ id: 'estados-border', type: 'line', source: 'estados', paint: { 'line-color': '#9EAFB0', 'line-width': 1, 'line-opacity': 0.7 } });

      // ── DOTS NORMAIS ──────────────────────────────────────────
      // Inicializa com DOTS_BASE reais
      map.current.addSource('dots', { type: 'geojson', data: dotsToGeoJSON(DOTS_BASE), generateId: true });
      map.current.addLayer({
        id: 'dots-layer', type: 'circle', source: 'dots',
        paint: {
          'circle-radius': ['case', ['boolean', ['feature-state', 'hover'], false], ['*', ['get', 'radius'], 1.6], ['get', 'radius']],
          'circle-color': ['get', 'color'],
          'circle-stroke-width': ['case', ['boolean', ['feature-state', 'hover'], false], 3, 1.5],
          'circle-stroke-color': '#ffffff',
          'circle-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.85],
        },
      });

      // ── DOTS CURTAILMENT ──────────────────────────────────────
      map.current.addSource('curtailment', { type: 'geojson', data: dotsToGeoJSON([]), generateId: true });
      map.current.addLayer({
        id: 'curtailment-layer', type: 'circle', source: 'curtailment',
        layout: { visibility: 'none' },
        paint: {
          'circle-radius': ['case', ['boolean', ['feature-state', 'hover'], false], ['*', ['get', 'radius'], 1.4], ['get', 'radius']],
          'circle-color': ['get', 'color'],
          'circle-stroke-width': 2.5,
          'circle-stroke-color': '#fff',
          'circle-opacity': 0.88,
          'circle-blur': 0.1,
        },
      });

      map.current.addLayer({
        id: 'curtailment-ring', type: 'circle', source: 'curtailment',
        layout: { visibility: 'none' },
        paint: {
          'circle-radius': ['*', ['get', 'radius'], 1.9],
          'circle-color': 'rgba(0,0,0,0)',
          'circle-stroke-width': 1.5,
          'circle-stroke-color': ['get', 'color'],
          'circle-opacity': 0.4,
        },
      });

      // ── HOVER ESTADOS ────────────────────────────────────────
      let hoveredEstadoId = null;
      map.current.on('mousemove', (e) => {
        const dotFeats = map.current.queryRenderedFeatures(e.point, { layers: ['dots-layer', 'curtailment-layer'] });
        const stateFeats = map.current.queryRenderedFeatures(e.point, { layers: ['estados-fill'] });
        if (hoveredEstadoId !== null) {
          map.current.setFeatureState({ source: 'estados', id: hoveredEstadoId }, { hover: false });
          hoveredEstadoId = null;
        }
        if (stateFeats.length > 0 && dotFeats.length === 0) {
          map.current.getCanvas().style.cursor = 'pointer';
          hoveredEstadoId = stateFeats[0].id;
          map.current.setFeatureState({ source: 'estados', id: hoveredEstadoId }, { hover: true });
        } else if (dotFeats.length === 0) {
          map.current.getCanvas().style.cursor = '';
        }
      });
      map.current.on('mouseleave', () => {
        if (hoveredEstadoId !== null) {
          map.current.setFeatureState({ source: 'estados', id: hoveredEstadoId }, { hover: false });
          hoveredEstadoId = null;
        }
        map.current.getCanvas().style.cursor = '';
      });

      // ── CLICK ESTADO ─────────────────────────────────────────
      map.current.on('click', 'estados-fill', (e) => {
        if (!e.features || e.features.length === 0) return;
        const feature = e.features[0];
        const coords = feature.geometry.type === 'MultiPolygon'
          ? feature.geometry.coordinates.flat(2)
          : feature.geometry.coordinates.flat(1);
        const lngs = coords.map(c => c[0]);
        const lats = coords.map(c => c[1]);
        map.current.fitBounds(
          new maplibregl.LngLatBounds([Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]),
          { padding: 60, duration: 800 }
        );
      });

      // ── HOVER DOTS NORMAIS ───────────────────────────────────
      let hoveredDotId = null;
      map.current.on('mouseenter', 'dots-layer', (e) => {
        const f = e.features[0];
        if (hoveredDotId !== null) map.current.setFeatureState({ source: 'dots', id: hoveredDotId }, { hover: false });
        hoveredDotId = f.id;
        map.current.setFeatureState({ source: 'dots', id: hoveredDotId }, { hover: true });
        map.current.getCanvas().style.cursor = 'pointer';
        popupRef.current
          .setLngLat(f.geometry.coordinates.slice())
          .setHTML(`<div style="font-family:sans-serif;max-width:240px">${
            f.properties.label.split('\n').map((line, i) =>
              `<p style="margin:${i===0?'0 0 3px':'1px 0'};font-size:${i===0?'12px':'11px'};font-weight:${i===0?700:400};color:${i===0?'#03254D':'#374151'}">${line}</p>`
            ).join('')
          }</div>`)
          .addTo(map.current);
      });
      map.current.on('mouseleave', 'dots-layer', () => {
        if (hoveredDotId !== null) { map.current.setFeatureState({ source: 'dots', id: hoveredDotId }, { hover: false }); hoveredDotId = null; }
        popupRef.current.remove();
        map.current.getCanvas().style.cursor = '';
      });

      // ── HOVER CURTAILMENT ────────────────────────────────────
      map.current.on('mouseenter', 'curtailment-layer', (e) => {
        const f = e.features[0];
        map.current.getCanvas().style.cursor = 'pointer';
        popupRef.current
          .setLngLat(f.geometry.coordinates.slice())
          .setHTML(`
            <div style="font-family:sans-serif;max-width:220px">
              ${f.properties.label.split('\n').map((line, i) => `
                <p style="margin:${i===0?'0 0 4px':'2px 0'};font-size:${i===0?'12px':'11px'};
                  font-weight:${i===0?700:400};color:${i===0?'#92400E':'#374151'}">
                  ${line}
                </p>
              `).join('')}
              <p style="margin:4px 0 0;font-size:9px;color:#9CA3AF">Fonte: ONS / Volt Robotics (2025)</p>
            </div>
          `)
          .addTo(map.current);
      });
      map.current.on('mouseleave', 'curtailment-layer', () => {
        popupRef.current.remove();
        map.current.getCanvas().style.cursor = '';
      });

      map.current.__dotsReady = true;
    });

    return () => { map.current?.remove(); map.current = null; mapLoaded.current = false; };
  }, []);

  // Atualiza dots normais quando mudam
  useEffect(() => {
    const interval = setInterval(() => {
      if (!map.current || !map.current.__dotsReady) return;
      clearInterval(interval);
      const resolvedDots = resolveDots(dots);
      const src = map.current.getSource('dots');
      if (src) src.setData(dotsToGeoJSON(resolvedDots));
    }, 100);
    return () => clearInterval(interval);
  }, [dots]);

  // Atualiza layer de curtailment quando showCurtailment muda
  useEffect(() => {
    const interval = setInterval(() => {
      if (!map.current || !map.current.__dotsReady) return;
      clearInterval(interval);
      const src = map.current.getSource('curtailment');
      if (!src) return;
      if (showCurtailment) {
        src.setData(dotsToGeoJSON(buildCurtailmentDots()));
        map.current.setLayoutProperty('curtailment-layer', 'visibility', 'visible');
        map.current.setLayoutProperty('curtailment-ring', 'visibility', 'visible');
      } else {
        src.setData(dotsToGeoJSON([]));
        map.current.setLayoutProperty('curtailment-layer', 'visibility', 'none');
        map.current.setLayoutProperty('curtailment-ring', 'visibility', 'none');
      }
    }, 100);
    return () => clearInterval(interval);
  }, [showCurtailment]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />

      {showCurtailment && (
        <div style={{
          position: 'absolute', bottom: 32, left: 12,
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 12, padding: '10px 14px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          fontSize: 11, zIndex: 10,
          border: '1px solid #FDE68A',
        }}>
          <p style={{ fontWeight: 700, color: '#92400E', margin: '0 0 8px', fontSize: 11 }}>
            ⚡ Zonas de Curtailment
          </p>
          {[
            { cor: '#FBBF24', label: 'Crítico (>20% de corte)' },
            { cor: '#F97316', label: 'Alto (10–20%)' },
            { cor: '#FDE68A', label: 'Médio (<10%)' },
          ].map(({ cor, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: cor, flexShrink: 0 }} />
              <span style={{ color: '#374151' }}>{label}</span>
            </div>
          ))}
          <p style={{ margin: '6px 0 0', color: '#9CA3AF', fontSize: 9 }}>
            Fonte: ONS / Volt Robotics (2025)
          </p>
        </div>
      )}
    </div>
  );
}