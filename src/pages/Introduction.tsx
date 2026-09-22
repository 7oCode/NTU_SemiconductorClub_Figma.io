import { useState } from "react";
import { LAYER_DATA, LayerId, LayerConfig, LayerState, ACCENT, mono, outfit } from "../types";
import ImageCarousel from "../components/ImageCarousel";
import WaferCrossSection from "../components/WaferCrossSection";
import LayerPopup from "../components/LayerPopup";
import type { Page } from "../App";

const GOLD   = "rgba(212,152,26,1)";
const GOLD_L = "rgba(240,178,40,1)";
const CRIMSON = "rgba(185,30,30,1)";

function LayerStyleHelper(id: LayerId, state: LayerState) {
  const colors = {
    A: { enabled: { bg: "rgba(30,22,5,0.6)",   border: GOLD,    glow: `0 0 24px rgba(212,152,26,0.45)` }, disabled: { bg: "rgba(15,21,36,0.4)",  border: "rgba(30,41,59,0.5)",  glow: "none" } },
    B: { enabled: { bg: "rgba(38,28,5,0.5)",   border: GOLD_L,  glow: `0 0 18px rgba(240,178,40,0.35)` }, disabled: { bg: "rgba(30,41,59,0.2)",  border: "rgba(30,41,59,0.4)",  glow: "none" } },
    C: { enabled: { bg: "rgba(35,6,6,0.42)",   border: CRIMSON, glow: `0 0 14px rgba(185,30,30,0.4)`  }, disabled: { bg: "rgba(25,8,8,0.18)",  border: "rgba(185,30,30,0.28)", glow: "none" } },
  };
  const c = colors[id][state === "ENABLED" ? "enabled" : "disabled"];
  return { background: c.bg, border: `2px solid ${c.border}`, boxShadow: c.glow };
}

function LayerButton({ layer, onToggle, onInfo }: { layer: LayerConfig; onToggle: () => void; onInfo: () => void }) {
  const isEnabled = layer.state === "ENABLED";
  const accent = ACCENT[layer.id];
  return (
    <div style={{ display: "flex", gap: 0 }}>
      <button
        onClick={onToggle}
        style={{
          flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 18px",
          background: isEnabled ? LayerStyleHelper(layer.id, "ENABLED").background : "rgba(12,18,38,0.7)",
          borderTop: `1.5px solid ${isEnabled ? accent : "rgba(30,41,59,0.6)"}`,
          borderBottom: `1.5px solid ${isEnabled ? accent : "rgba(30,41,59,0.6)"}`,
          borderLeft: `1.5px solid ${isEnabled ? accent : "rgba(30,41,59,0.6)"}`,
          borderRight: "none",
          borderRadius: "6px 0 0 6px",
          cursor: "pointer", transition: "all 0.25s ease",
          boxShadow: isEnabled ? `0 0 12px ${accent.replace("1)", "0.18)")}` : "none",
          outline: "none", textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: isEnabled ? accent : "rgba(71,85,105,1)", boxShadow: isEnabled ? `0 0 6px ${accent}` : "none", transition: "all 0.25s", flexShrink: 0 }} />
          <span style={{ ...mono, fontSize: 12, color: isEnabled ? "#f0e8d0" : "rgba(148,163,184,1)", fontWeight: 600 }}>
            {layer.label}: {layer.sublabel}
          </span>
        </div>
        <span style={{
          ...mono, fontSize: 11,
          color: isEnabled ? accent : "rgba(71,85,105,1)",
          background: isEnabled ? accent.replace("1)", "0.10)") : "rgba(71,85,105,0.1)",
          border: `1px solid ${isEnabled ? accent.replace("1)", "0.4)") : "rgba(71,85,105,0.3)"}`,
          borderRadius: 3, padding: "3px 8px", transition: "all 0.25s", whiteSpace: "nowrap" as const, flexShrink: 0,
        }}>[ {layer.state} ]</span>
      </button>
      <button
        onClick={onInfo}
        style={{
          width: 44, background: "rgba(12,18,38,0.7)",
          border: `1.5px solid rgba(30,41,59,0.6)`, borderRadius: "0 6px 6px 0",
          cursor: "pointer", color: "rgba(100,116,139,1)", ...mono, fontSize: 14,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s", flexShrink: 0,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(212,152,26,1)"; e.currentTarget.style.background = "rgba(30,22,5,0.4)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(100,116,139,1)"; e.currentTarget.style.background = "rgba(12,18,38,0.7)"; }}
      >?</button>
    </div>
  );
}

const GOALS = [
  {
    icon: "⬡",
    title: "Technical Education",
    desc: "Deliver structured, hands-on learning across the full semiconductor stack — from crystal growth and wafer processing through CMOS integration, device physics, and IC design.",
  },
  {
    icon: "⬡",
    title: "Industry Exposure",
    desc: "Bridge the gap between academic study and industry practice through site visits, guest lectures, and partnerships with leading fabs, EDA vendors, and design houses in Singapore.",
  },
  {
    icon: "⬡",
    title: "Research Culture",
    desc: "Foster a collaborative environment where members explore open questions in semiconductor technology — from TCAD simulation to novel device architectures — alongside NTU faculty.",
  },
  {
    icon: "⬡",
    title: "Community Building",
    desc: "Build a lasting community of semiconductor-literate engineers at NTU, connected to a growing alumni network across GlobalFoundries, TSMC, Micron, Applied Materials, and beyond.",
  },
];

export default function Introduction({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [layers, setLayers] = useState(LAYER_DATA);
  const [popup, setPopup] = useState<LayerId | null>(null);

  const toggleLayer = (id: LayerId) =>
    setLayers((prev) => prev.map((l) => l.id === id ? { ...l, state: l.state === "DISABLED" ? "ENABLED" : "DISABLED" } : l));

  const activePopup = popup ? layers.find((l) => l.id === popup) : null;

  return (
    <div>
      {/* HERO */}
      <section style={{ width: "100%", minHeight: 620, background: "rgba(10,16,38,0.5)", borderBottom: "1.5px solid rgba(30,41,59,0.5)", padding: "60px 80px", display: "flex", gap: 60, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={{ ...mono, fontSize: 11, color: "rgba(212,152,26,0.75)", marginBottom: 10, letterSpacing: "0.1em" }}>01 // INTRODUCTION</div>
          <h1 style={{ margin: "0 0 12px", fontSize: 38, fontWeight: 800, color: "#f0e8d0", lineHeight: 1.15, fontFamily: "'Outfit', sans-serif" }}>
            NTU<br />
            <span style={{ color: GOLD }}>Semiconductor</span><br />
            Club
          </h1>
          <p style={{ ...mono, fontSize: 12, color: "rgba(180,170,150,0.85)", lineHeight: 1.8, maxWidth: 440, margin: "0 0 32px" }}>
            Advancing semiconductor literacy at NTU through hands-on workshops, industry exposure, and collaborative research across device physics, CMOS process integration, and IC design.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <button style={{ ...mono, fontSize: 13, fontWeight: 700, background: GOLD, color: "rgba(8,14,32,1)", border: "none", borderRadius: 4, padding: "13px 22px", cursor: "pointer" }}>JOIN_CLUB →</button>
            <button
              onClick={() => onNavigate("events")}
              style={{ ...mono, fontSize: 13, color: "rgba(180,170,150,1)", background: "transparent", border: `1.5px solid rgba(212,152,26,0.35)`, borderRadius: 4, padding: "13px 22px", cursor: "pointer" }}
            >VIEW_EVENTS</button>
          </div>

          {/* Quick stats */}
          <div style={{ display: "flex", gap: 32, marginTop: 48, paddingTop: 28, borderTop: "1px solid rgba(212,152,26,0.2)" }}>
            {[["120+", "Members"], ["18", "Workshops/yr"], ["12", "Industry Partners"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ ...mono, fontSize: 22, fontWeight: 700, color: GOLD }}>{n}</div>
                <div style={{ ...mono, fontSize: 10, color: "rgba(100,116,139,1)", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <ImageCarousel />
      </section>

      {/* MISSION & GOALS */}
      <section style={{ width: "100%", background: "rgba(9,14,34,0.7)", borderBottom: "1.5px solid rgba(30,41,59,0.5)", padding: "80px 80px" }}>
        <div style={{ display: "flex", gap: 80, alignItems: "flex-start" }}>
          {/* Mission statement */}
          <div style={{ flex: "0 0 380px" }}>
            <div style={{ ...mono, fontSize: 11, color: "rgba(212,152,26,0.75)", marginBottom: 16, letterSpacing: "0.1em" }}>[ MISSION_STATEMENT ]</div>
            <h2 style={{ ...outfit, margin: "0 0 20px", fontSize: 30, fontWeight: 800, color: "#f0e8d0", lineHeight: 1.2 }}>
              Building the next generation of semiconductor engineers
            </h2>
            <p style={{ ...mono, fontSize: 12, color: "rgba(180,170,150,0.8)", lineHeight: 1.9, margin: "0 0 20px" }}>
              The NTU Semiconductor Club exists to close the gap between what universities teach and what the semiconductor industry needs. Singapore sits at the heart of a global chip supply chain — and we believe NTU students should be equipped to lead it.
            </p>
            <p style={{ ...mono, fontSize: 12, color: "rgba(180,170,150,0.8)", lineHeight: 1.9, margin: 0 }}>
              We are not a passive club. Every event, workshop, and resource we produce is designed to build real, technical competency — the kind that earns you a seat at the table when the next node is being designed.
            </p>
            <div style={{ marginTop: 32, padding: "20px 24px", background: "rgba(212,152,26,0.06)", borderTop: "1px solid rgba(212,152,26,0.2)", borderRight: "1px solid rgba(212,152,26,0.2)", borderBottom: "1px solid rgba(212,152,26,0.2)", borderLeft: "3px solid rgba(212,152,26,0.8)", borderRadius: 8 }}>
              <p style={{ ...mono, fontSize: 11, color: "rgba(220,205,170,0.9)", lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>
                "Semiconductors are not just a subject — they are the substrate on which the modern world runs."
              </p>
            </div>
          </div>

          {/* Goals grid */}
          <div style={{ flex: 1 }}>
            <div style={{ ...mono, fontSize: 11, color: "rgba(212,152,26,0.75)", marginBottom: 24, letterSpacing: "0.1em" }}>[ CLUB_OBJECTIVES ]</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {GOALS.map((g, i) => (
                <div
                  key={g.title}
                  style={{
                    background: "rgba(10,16,38,0.9)",
                    border: "1px solid rgba(30,41,59,0.6)",
                    borderRadius: 8, padding: "24px",
                    transition: "border 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.border = "1px solid rgba(212,152,26,0.4)")}
                  onMouseLeave={(e) => (e.currentTarget.style.border = "1px solid rgba(30,41,59,0.6)")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(212,152,26,0.12)", border: "1px solid rgba(212,152,26,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ ...mono, fontSize: 11, color: GOLD, fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 style={{ ...outfit, margin: 0, fontSize: 15, fontWeight: 700, color: "#f0e8d0" }}>{g.title}</h3>
                  </div>
                  <p style={{ ...mono, fontSize: 11, color: "rgba(180,170,150,0.75)", lineHeight: 1.75, margin: 0 }}>{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STRUCTURAL ZOOM / LAYER CONTROLS */}
      <section style={{ width: "100%", background: "rgba(8,14,32,1)", borderBottom: "1.5px solid rgba(30,41,59,0.5)", padding: "80px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <span style={{ ...mono, fontSize: 12, color: GOLD }}>Wafer Layer Explorer</span>
          <span style={{ ...mono, fontSize: 10, color: "rgba(71,85,105,0.7)" }}>— toggle and inspect each layer</span>
        </div>

        <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
          {/* Cross-section diagram */}
          <div style={{ flexShrink: 0, background: "rgba(10,16,38,0.8)", border: "1px solid rgba(30,41,59,0.6)", borderRadius: 10, padding: "24px 16px 16px" }}>
            <div style={{ ...mono, fontSize: 10, color: "rgba(71,85,105,1)", marginBottom: 12, paddingLeft: 8 }}>Wafer Cross-Section — click a layer to inspect</div>
            <WaferCrossSection layers={layers} onLayerClick={(id) => setPopup(id)} />
          </div>

          {/* Layer controls */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ ...mono, fontSize: 10, color: "rgba(71,85,105,0.8)", marginBottom: 16 }}>Toggle layers · click [ ? ] for details</div>

            {/* Legend */}
            <div style={{ display: "flex", gap: 20, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid rgba(30,41,59,0.4)" }}>
              {[
                { id: "C" as LayerId, label: "PHOTORESIST",  thick: "~80nm",  color: CRIMSON },
                { id: "B" as LayerId, label: "SiO₂",         thick: "~25nm",  color: GOLD_L },
                { id: "A" as LayerId, label: "Si SUBSTRATE", thick: "~775μm", color: GOLD },
              ].map((item) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, background: item.color, borderRadius: 2, opacity: layers.find((l) => l.id === item.id)!.state === "ENABLED" ? 1 : 0.22, transition: "opacity 0.3s" }} />
                  <span style={{ ...mono, fontSize: 9, color: "rgba(148,163,184,0.7)" }}>{item.label}</span>
                  <span style={{ ...mono, fontSize: 9, color: "rgba(71,85,105,0.6)" }}>{item.thick}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[...layers].reverse().map((layer) => (
                <LayerButton key={layer.id} layer={layer} onToggle={() => toggleLayer(layer.id)} onInfo={() => setPopup(layer.id)} />
              ))}
            </div>

            {/* Status readout */}
            <div style={{ marginTop: 28, padding: "16px 20px", background: "rgba(10,16,38,0.9)", border: "1px solid rgba(30,41,59,0.5)", borderRadius: 6 }}>
              <div style={{ ...mono, fontSize: 10, color: "rgba(71,85,105,1)", marginBottom: 10 }}>Layer Status</div>
              {layers.map((l) => (
                <div key={l.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ ...mono, fontSize: 11, color: "rgba(148,163,184,0.7)" }}>{l.sublabel}</span>
                  <span style={{ ...mono, fontSize: 11, color: l.state === "ENABLED" ? ACCENT[l.id] : "rgba(71,85,105,1)", transition: "color 0.25s" }}>{l.state}</span>
                </div>
              ))}
              <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(30,41,59,0.4)" }}>
                <span style={{ ...mono, fontSize: 10, color: "rgba(71,85,105,1)" }}>ACTIVE_LAYERS: {layers.filter((l) => l.state === "ENABLED").length} / {layers.length}</span>
              </div>
            </div>

            {/* Want to know more */}
            <div style={{ marginTop: 20, padding: "18px 20px", background: "rgba(212,152,26,0.05)", border: "1px solid rgba(212,152,26,0.2)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
              <div>
                <div style={{ ...mono, fontSize: 10, color: "rgba(212,152,26,0.75)", marginBottom: 4 }}>// SELF_DIRECTED_LEARNING</div>
                <p style={{ ...mono, fontSize: 11, color: "rgba(180,170,150,0.75)", margin: 0, lineHeight: 1.6 }}>
                  Curious about what these layers actually do? Explore our curated reading list.
                </p>
              </div>
              <button
                onClick={() => onNavigate("resources")}
                style={{
                  ...mono, fontSize: 11, fontWeight: 700,
                  background: GOLD, color: "rgba(8,14,32,1)",
                  border: "none", borderRadius: 6,
                  padding: "11px 20px", cursor: "pointer",
                  whiteSpace: "nowrap" as const,
                  flexShrink: 0,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Want to know more? →
              </button>
            </div>
          </div>
        </div>
      </section>

      {activePopup && <LayerPopup layer={activePopup} onClose={() => setPopup(null)} />}
    </div>
  );
}
