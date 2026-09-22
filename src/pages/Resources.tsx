import { mono, outfit } from "../types";

const GOLD   = "rgba(212,152,26,1)";
const GOLD_L = "rgba(240,178,40,1)";

const RESOURCES = [
  {
    id: "R001",
    title: "CMOS Process Integration Overview",
    subtitle: "NTU SemiCon Club — Internal Notes",
    type: "PDF",
    size: "200 KB",
    level: "INTRO" as const,
    levelColor: GOLD,
    typeColor: GOLD_L,
    desc: "A concise walkthrough of the full CMOS fabrication flow: thermal oxidation, photolithography, ion implantation, etching, and metallisation. Written for members attending their first cleanroom workshop.",
    tags: ["CMOS", "FABRICATION", "BEGINNER"],
    action: "DOWNLOAD →",
  },
  {
    id: "R002",
    title: "Analog IC Design with Cadence Virtuoso",
    subtitle: "Video series — 8 modules",
    type: "VIDEO",
    size: "6 hr 20 min",
    level: "INTERMEDIATE" as const,
    levelColor: GOLD_L,
    typeColor: "rgba(0,200,255,1)",
    desc: "Step-by-step tutorial building a differential pair amplifier, OTA, and PLL from schematic to layout using Cadence Virtuoso and Spectre simulation. Uses SkyWater 130nm PDK.",
    tags: ["CADENCE", "ANALOG", "OTA", "VIRTUOSO"],
    action: "WATCH →",
  },
  {
    id: "R003",
    title: "FinFET & GAA Nanosheet Transistors",
    subtitle: "IEEE Electron Device Letters — Review",
    type: "PAPER",
    size: "Peer-reviewed",
    level: "ADVANCED" as const,
    levelColor: "rgba(185,30,30,1)",
    typeColor: "rgba(180,100,255,1)",
    desc: "Peer-reviewed overview of gate-all-around nanosheet geometry, short-channel effect suppression, and the materials challenges that distinguish the 3nm and 2nm nodes from prior generations.",
    tags: ["FINFET", "GAA", "3NM", "ADVANCED_NODE"],
    action: "READ →",
  },
];

export default function Resources() {
  return (
    <div style={{ minHeight: "100vh", background: "rgba(8,14,32,1)" }}>

      {/* Hero */}
      <section style={{ padding: "80px 80px 60px", borderBottom: "1.5px solid rgba(30,41,59,0.5)", background: "rgba(10,16,38,0.5)" }}>
        <div style={{ ...mono, fontSize: 11, color: "rgba(212,152,26,0.75)", marginBottom: 16, letterSpacing: "0.1em" }}>[ 04 // RESOURCES ]</div>
        <h1 style={{ margin: "0 0 16px", fontSize: 42, fontWeight: 800, color: "#f0e8d0", fontFamily: "'Outfit', sans-serif", lineHeight: 1.1 }}>
          Self-Directed<br /><span style={{ color: GOLD }}>Learning</span>
        </h1>
        <p style={{ ...mono, fontSize: 12, color: "rgba(180,170,150,0.8)", maxWidth: 540, lineHeight: 1.8, margin: 0 }}>
          A focused set of starting points — from foundational process notes to video tutorials and cutting-edge research — for members keen to go deeper on their own schedule.
        </p>
      </section>

      {/* Resource cards */}
      <section style={{ padding: "60px 80px 100px" }}>
        <div style={{ ...mono, fontSize: 10, color: "rgba(71,85,105,0.6)", marginBottom: 32 }}>Curated resources for self-directed learning</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {RESOURCES.map((r) => (
            <div
              key={r.id}
              style={{
                background: "rgba(10,16,38,0.8)",
                border: "1px solid rgba(30,41,59,0.6)",
                borderRadius: 10,
                padding: "36px 40px",
                display: "flex",
                gap: 40,
                alignItems: "flex-start",
                cursor: "pointer",
                transition: "border 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = `1px solid ${r.typeColor.replace("1)", "0.45)")}`;
                e.currentTarget.style.boxShadow = `0 0 28px ${r.typeColor.replace("1)", "0.07)")}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = "1px solid rgba(30,41,59,0.6)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* ID + type column */}
              <div style={{ flexShrink: 0, width: 80, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, paddingTop: 4 }}>
                <div style={{
                  width: 64, height: 64,
                  background: r.typeColor.replace("1)", "0.12)"),
                  border: `1.5px solid ${r.typeColor.replace("1)", "0.38)")}`,
                  borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ ...mono, fontSize: 11, fontWeight: 700, color: r.typeColor }}>{r.type}</span>
                </div>
                <span style={{ ...mono, fontSize: 9, color: "rgba(71,85,105,0.6)" }}>{r.id}</span>
              </div>

              {/* Main content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{
                    ...mono, fontSize: 9,
                    color: r.levelColor,
                    background: r.levelColor.replace("1)", "0.12)"),
                    border: `1px solid ${r.levelColor.replace("1)", "0.3)")}`,
                    borderRadius: 3, padding: "3px 8px",
                  }}>{r.level}</span>
                  <span style={{ ...mono, fontSize: 9, color: "rgba(71,85,105,0.7)" }}>{r.size}</span>
                </div>
                <h3 style={{ ...outfit, margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: "#f0e8d0" }}>{r.title}</h3>
                <div style={{ ...mono, fontSize: 10, color: r.typeColor, marginBottom: 14, opacity: 0.8 }}>{r.subtitle}</div>
                <p style={{ ...mono, fontSize: 12, color: "rgba(180,170,150,0.8)", lineHeight: 1.8, margin: "0 0 18px", maxWidth: 620 }}>{r.desc}</p>
                <div style={{ display: "flex", gap: 6 }}>
                  {r.tags.map((tag) => (
                    <span key={tag} style={{ ...mono, fontSize: 8, color: "rgba(100,116,139,1)", background: "rgba(30,41,59,0.5)", borderRadius: 2, padding: "2px 6px" }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div style={{ flexShrink: 0, paddingTop: 4 }}>
                <button style={{
                  ...mono, fontSize: 11, fontWeight: 600,
                  background: r.typeColor.replace("1)", "0.12)"),
                  color: r.typeColor,
                  border: `1.5px solid ${r.typeColor.replace("1)", "0.38)")}`,
                  borderRadius: 6, padding: "12px 22px", cursor: "pointer",
                  transition: "background 0.2s",
                  whiteSpace: "nowrap" as const,
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = r.typeColor.replace("1)", "0.24)"); }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = r.typeColor.replace("1)", "0.12)"); }}
                >{r.action}</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
