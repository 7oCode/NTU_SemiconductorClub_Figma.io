import { mono, outfit } from "../types";

const GOLD   = "rgba(212,152,26,1)";
const GOLD_L = "rgba(240,178,40,1)";

const EVENTS = [
  {
    id: "EVT_001",
    date: "OCT 04 2026",
    day: "SUN",
    type: "WORKSHOP",
    typeColor: GOLD,
    title: "CMOS Fabrication Fundamentals",
    subtitle: "Hands-on process integration lab",
    location: "NTU SPMS Cleanroom, B2",
    capacity: "24 seats",
    desc: "A hands-on session covering the full CMOS flow — from wafer cleaning and thermal oxidation through photolithography, etching, and metallisation. Participants will fabricate a simple p-n junction device under supervision.",
    tags: ["PROCESS", "CLEANROOM", "HANDS-ON"],
    status: "OPEN",
  },
  {
    id: "EVT_002",
    date: "OCT 18 2026",
    day: "SUN",
    type: "INDUSTRY_TALK",
    typeColor: GOLD_L,
    title: "Memory Scaling Beyond 3nm",
    subtitle: "GlobalFoundries Singapore",
    location: "NTU LT 2A",
    capacity: "120 seats",
    desc: "A senior process engineer from GlobalFoundries Singapore presents on gate-all-around (GAA) nanosheet transistors, high-k/metal gate stacks, and the materials challenges that define the sub-3nm node roadmap.",
    tags: ["INDUSTRY", "ADVANCED_NODE", "GAA"],
    status: "OPEN",
  },
  {
    id: "EVT_003",
    date: "NOV 01–02 2026",
    day: "SAT–SUN",
    type: "HACKATHON",
    typeColor: "rgba(0,200,255,1)",
    title: "IC Design Hackathon",
    subtitle: "48-hour chip design sprint",
    location: "NTU EEE Makerspace",
    capacity: "40 seats",
    desc: "Teams of 2–4 compete to tape out a functional analog or mixed-signal block using Cadence Virtuoso and SkyWater 130nm PDK. Judged on performance, area efficiency, and documentation quality.",
    tags: ["EDA", "ANALOG", "SKYWATER_130"],
    status: "OPEN",
  },
  {
    id: "EVT_004",
    date: "NOV 15 2026",
    day: "SUN",
    type: "SITE_VISIT",
    typeColor: "rgba(180,100,255,1)",
    title: "A*STAR IME Cleanroom Tour",
    subtitle: "Institute of Microelectronics",
    location: "Fusionopolis, Connexis North",
    capacity: "20 seats",
    desc: "A guided tour of the 200mm fab at IME — one of Southeast Asia's premier research fabs. Participants will observe lithography, CMP, and thin-film deposition equipment in a live production environment.",
    tags: ["INDUSTRY", "SITE_VISIT", "200MM"],
    status: "WAITLIST",
  },
  {
    id: "EVT_005",
    date: "DEC 06 2026",
    day: "SUN",
    type: "SYMPOSIUM",
    typeColor: "rgba(255,160,40,1)",
    title: "NTU SemiCon Summit 2026",
    subtitle: "Annual flagship conference",
    location: "NTU The Arc, Level 3",
    capacity: "200 seats",
    desc: "The club's annual symposium — a full-day programme of student research presentations, keynote addresses from academia and industry, a panel discussion on the Singapore semiconductor ecosystem, and a networking reception.",
    tags: ["FLAGSHIP", "RESEARCH", "NETWORKING"],
    status: "SOON",
  },
];

const STATUS_STYLE: Record<string, { color: string; bg: string }> = {
  OPEN:     { color: GOLD,                      bg: "rgba(212,152,26,0.10)" },
  WAITLIST: { color: GOLD_L,                    bg: "rgba(240,178,40,0.10)" },
  SOON:     { color: "rgba(148,163,184,1)",      bg: "rgba(30,41,59,0.3)" },
};

export default function Events() {
  return (
    <div style={{ minHeight: "100vh", background: "rgba(8,14,32,1)" }}>
      {/* Hero */}
      <section style={{ padding: "80px 80px 60px", borderBottom: "1.5px solid rgba(30,41,59,0.5)", background: "rgba(10,16,38,0.5)" }}>
        <div style={{ ...mono, fontSize: 11, color: "rgba(212,152,26,0.75)", marginBottom: 16, letterSpacing: "0.1em" }}>[ 02 // EVENTS ]</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 42, fontWeight: 800, color: "#f0e8d0", fontFamily: "'Outfit', sans-serif", lineHeight: 1.1 }}>
              Upcoming<br /><span style={{ color: GOLD }}>Events</span>
            </h1>
            <p style={{ ...mono, fontSize: 12, color: "rgba(180,170,150,0.8)", marginTop: 16, maxWidth: 480, lineHeight: 1.7 }}>
              From cleanroom workshops to industry talks and design hackathons — our events calendar runs year-round to keep you on the frontier of semiconductor technology.
            </p>
          </div>
          <div style={{ display: "flex", gap: 24, flexShrink: 0 }}>
            {[["5", "EVENTS THIS SEM"], ["3", "INDUSTRY PARTNERS"], ["164", "SEATS AVAILABLE"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "right" }}>
                <div style={{ ...mono, fontSize: 26, fontWeight: 700, color: GOLD }}>{n}</div>
                <div style={{ ...mono, fontSize: 9, color: "rgba(71,85,105,1)", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event list */}
      <section style={{ padding: "60px 80px 100px" }}>
        <div style={{ ...mono, fontSize: 10, color: "rgba(71,85,105,0.7)", marginBottom: 24 }}>AY2026/27 Semester 1</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {EVENTS.map((evt) => (
            <div
              key={evt.id}
              style={{
                background: "rgba(10,16,38,0.8)",
                border: "1px solid rgba(30,41,59,0.6)",
                borderRadius: 10,
                padding: "28px 32px",
                display: "flex",
                gap: 32,
                cursor: "pointer",
                transition: "border 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.border = "1px solid rgba(212,152,26,0.4)"; e.currentTarget.style.background = "rgba(12,18,42,0.95)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.border = "1px solid rgba(30,41,59,0.6)"; e.currentTarget.style.background = "rgba(10,16,38,0.8)"; }}
            >
              {/* Date column */}
              <div style={{ flexShrink: 0, width: 90, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingTop: 4 }}>
                <div style={{ width: 64, height: 64, background: "rgba(8,14,32,0.8)", border: "1px solid rgba(30,41,59,0.7)", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ ...mono, fontSize: 8, color: "rgba(71,85,105,1)", marginBottom: 2 }}>{evt.day}</div>
                  <div style={{ ...mono, fontSize: 18, fontWeight: 700, color: "#f0e8d0", lineHeight: 1 }}>{evt.date.split(" ")[1]}</div>
                  <div style={{ ...mono, fontSize: 8, color: "rgba(100,116,139,1)", marginTop: 2 }}>{evt.date.split(" ")[0]}</div>
                </div>
                <div style={{ ...mono, fontSize: 9, color: "rgba(71,85,105,0.7)", marginTop: 8, textAlign: "center" }}>{evt.id}</div>
              </div>

              {/* Main content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <span style={{ ...mono, fontSize: 10, color: evt.typeColor, background: evt.typeColor.replace("1)", "0.12)"), border: `1px solid ${evt.typeColor.replace("1)", "0.3)")}`, borderRadius: 3, padding: "2px 8px" }}>
                    {evt.type}
                  </span>
                  <span style={{ ...mono, fontSize: 10, color: "rgba(71,85,105,1)" }}>{evt.location}</span>
                  <span style={{ ...mono, fontSize: 10, color: "rgba(71,85,105,1)" }}>// {evt.capacity}</span>
                </div>
                <h3 style={{ ...outfit, margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#f0e8d0" }}>{evt.title}</h3>
                <div style={{ ...mono, fontSize: 11, color: evt.typeColor, marginBottom: 12, opacity: 0.8 }}>{evt.subtitle}</div>
                <p style={{ ...mono, fontSize: 11, color: "rgba(180,170,150,0.8)", lineHeight: 1.75, margin: "0 0 16px", maxWidth: 560 }}>{evt.desc}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  {evt.tags.map((tag) => (
                    <span key={tag} style={{ ...mono, fontSize: 9, color: "rgba(100,116,139,1)", background: "rgba(30,41,59,0.4)", borderRadius: 2, padding: "2px 6px" }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between" }}>
                <span style={{
                  ...mono, fontSize: 10,
                  color: STATUS_STYLE[evt.status].color,
                  background: STATUS_STYLE[evt.status].bg,
                  border: `1px solid ${STATUS_STYLE[evt.status].color.replace("1)", "0.3)")}`,
                  borderRadius: 3, padding: "4px 10px",
                }}>[ {evt.status} ]</span>
                <button style={{
                  ...mono, fontSize: 11, fontWeight: 600,
                  background: evt.status === "OPEN" ? GOLD : "transparent",
                  color: evt.status === "OPEN" ? "rgba(8,14,32,1)" : "rgba(71,85,105,1)",
                  border: evt.status === "OPEN" ? "none" : "1.5px solid rgba(30,41,59,0.6)",
                  borderRadius: 4, padding: "10px 18px", cursor: "pointer",
                  opacity: evt.status === "SOON" ? 0.5 : 1,
                }}>
                  {evt.status === "OPEN" ? "REGISTER →" : evt.status === "WAITLIST" ? "JOIN WAITLIST" : "COMING SOON"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
