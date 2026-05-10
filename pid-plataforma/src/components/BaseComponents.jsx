// ── COMPONENTES BASE ───────────────────────────────────────────
// Componentes genéricos e reutilizáveis, sem dependência de lógica de negócio.

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";

// Coordenadas reais dos pontos ilustrativos no Brasil
const DOTS_COORDS = [
  { lat:-3.7,  lng:-38.5, c:"#8B5CF6", r:7,  label:"Hub Fortaleza"        },
  { lat:-8.0,  lng:-34.9, c:"#06B6D4", r:5,  label:"Porto Recife"          },
  { lat:-12.9, lng:-38.4, c:"#22C55E", r:6,  label:"Biomassa Salvador"     },
  { lat:-15.8, lng:-47.9, c:"#F59E0B", r:4,  label:"Solar Brasília"        },
  { lat:-19.9, lng:-43.9, c:"#0EA5E9", r:4,  label:"Eólica BH"             },
  { lat:-22.9, lng:-43.2, c:"#22C55E", r:3,  label:"Biomassa Rio"          },
  { lat:-23.5, lng:-46.6, c:"#E84C1F", r:9,  label:"Hub São Paulo"         },
  { lat:-25.4, lng:-49.3, c:"#E84C1F", r:8,  label:"Hub Curitiba"          },
  { lat:-27.6, lng:-48.5, c:"#8B5CF6", r:7,  label:"Hub Florianópolis"     },
  { lat:-30.0, lng:-51.2, c:"#22C55E", r:5,  label:"Biomassa Porto Alegre" },
  { lat:-20.3, lng:-40.3, c:"#F59E0B", r:6,  label:"Solar Vitória"         },
  { lat:-21.8, lng:-43.4, c:"#3B82F6", r:6,  label:"UHE Juiz de Fora"      },
  { lat:-1.4,  lng:-48.5, c:"#3B82F6", r:7,  label:"UHE Belém"             },
  { lat:-2.5,  lng:-44.3, c:"#22C55E", r:5,  label:"Biomassa São Luís"     },
  { lat:-5.1,  lng:-42.8, c:"#F59E0B", r:4,  label:"Solar Teresina"        },
  { lat:-3.1,  lng:-60.0, c:"#22C55E", r:5,  label:"Biomassa Manaus"       },
  { lat:-10.9, lng:-37.1, c:"#22C55E", r:4,  label:"Biomassa Aracaju"      },
  { lat:-16.7, lng:-49.3, c:"#3B82F6", r:6,  label:"UHE Goiânia"           },
  { lat:-18.9, lng:-48.3, c:"#22C55E", r:5,  label:"Biomassa Uberlândia"   },
  { lat:-17.7, lng:-39.3, c:"#8B5CF6", r:4,  label:"Hub Teixeira de Freitas"},
  { lat:-6.9,  lng:-38.4, c:"#06B6D4", r:4,  label:"Porto Campina Grande"  },
  { lat:-9.4,  lng:-40.5, c:"#E84C1F", r:6,  label:"Hub Petrolina"         },
  { lat:-13.0, lng:-41.7, c:"#8B5CF6", r:5,  label:"Hub Feira de Santana"  },
  { lat:-4.3,  lng:-55.0, c:"#06B6D4", r:4,  label:"Porto Santarém"        },
];

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
export function MapaBrasil({ dots, titulo }) {
  const coords = dots && dots.length > 0
    ? dots.map((d, i) => ({
        lat: -33 + (d.y / 90) * 38,
        lng: -74 + (d.x / 100) * 46,
        c: d.c, r: d.r, label: `Ponto ${i + 1}`,
      }))
    : DOTS_COORDS;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <MapContainer
        center={[-14.2, -51.9]}
        zoom={4}
        minZoom={3}
        maxZoom={10}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {coords.map((d, i) => (
          <CircleMarker
            key={i}
            center={[d.lat, d.lng]}
            radius={d.r * 0.9}
            pathOptions={{ color: "white", weight: 1, fillColor: d.c, fillOpacity: 0.85 }}
          >
            <Tooltip>{d.label}</Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>

    </div>
  );
}
