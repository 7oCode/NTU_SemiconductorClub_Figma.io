import { useState } from "react";
import { mono, outfit } from "../types";

type Tab = "main" | "events" | "technical" | "business" | "publicity";

const TABS: { id: Tab; label: string }[] = [
  { id: "main",       label: "Main Committee" },
  { id: "events",     label: "Events" },
  { id: "technical",  label: "Technical Strategists" },
  { id: "business",   label: "Business Development" },
  { id: "publicity",  label: "Publicity" },
];

const ACCENT_GOLD    = "rgba(212,152,26,1)";
const ACCENT_AMBER   = "rgba(240,178,40,1)";
const ACCENT_CRIMSON = "rgba(185,30,30,1)";
const ACCENT_BLUE    = "rgba(0,200,255,1)";
const ACCENT_PURPLE  = "rgba(180,100,255,1)";

const TAB_ACCENT: Record<Tab, string> = {
  main:       ACCENT_GOLD,
  events:     ACCENT_AMBER,
  technical:  ACCENT_BLUE,
  business:   ACCENT_CRIMSON,
  publicity:  ACCENT_PURPLE,
};

interface Member {
  name: string;
  role: string;
  dept: string;
  initials: string;
  focus?: string;
  isLead?: boolean;
}

const TAB_DATA: Record<Tab, { headline: string; desc: string; members: Member[] }> = {
  main: {
    headline: "Executive Leadership",
    desc: "The core leadership team responsible for the club's strategic direction, operations, and member welfare across all sub-committees.",
    members: [
      { name: "Aiden Lim Wei Jie",   role: "President",          dept: "EEE Y3",      initials: "AL", focus: "Compound Semiconductors", isLead: true },
      { name: "Priya Subramaniam",    role: "Vice President",     dept: "MSE Y3",      initials: "PS", focus: "CMOS Process Integration", isLead: true },
      { name: "Marcus Tan Zhi Hao",   role: "Honorary Secretary", dept: "EEE Y2",      initials: "MT", focus: "Club Operations" },
      { name: "Chloe Wong Xin Hui",   role: "Honorary Treasurer", dept: "BIZ/EEE Y3",  initials: "CW", focus: "Financial Planning" },
    ],
  },
  events: {
    headline: "Events Sub-Committee",
    desc: "Responsible for planning, coordinating, and running all club events — from cleanroom workshops and industry talks to hackathons and site visits.",
    members: [
      { name: "Ravi Krishnamurthy",   role: "Events Director",    dept: "EEE Y2",      initials: "RK", focus: "Analog IC Design", isLead: true },
      { name: "Jordan Yeo Kai Wen",   role: "Events Manager",     dept: "ADM/EEE Y2",  initials: "JY", focus: "Logistics & Coordination" },
      { name: "Mei Lin Zhao",         role: "Events Executive",   dept: "EEE Y2",      initials: "MZ", focus: "Wafer Processing" },
      { name: "A. Chandra",           role: "Events Executive",   dept: "EEE Y1",      initials: "AC", focus: "Workshop Support" },
      { name: "B. Ng",                role: "Events Executive",   dept: "PHY Y1",      initials: "BN", focus: "Site Visit Coordination" },
    ],
  },
  technical: {
    headline: "Technical Strategists",
    desc: "Develops the club's technical curriculum, manages internal notes and resources, leads study groups, and organises our annual IC Design Hackathon.",
    members: [
      { name: "Sarah Ng Jun Yi",      role: "Technical Director", dept: "PHY Y3",      initials: "SN", focus: "Photolithography", isLead: true },
      { name: "Tanveer Singh",        role: "R&D Director",       dept: "EEE Y3",      initials: "TS", focus: "FinFET Simulation", isLead: true },
      { name: "C. Rajoo",             role: "Technical Executive", dept: "EEE Y2",     initials: "CR", focus: "TCAD Simulation" },
      { name: "G. Park",              role: "Technical Executive", dept: "MSE Y2",     initials: "GP", focus: "Device Characterisation" },
      { name: "H. Liu",               role: "Technical Executive", dept: "EEE Y1",     initials: "HL", focus: "IC Design" },
      { name: "K. Sharma",            role: "Technical Executive", dept: "EEE Y2",     initials: "KS", focus: "Process Integration" },
    ],
  },
  business: {
    headline: "Business Development",
    desc: "Drives industry partnerships, manages sponsorships, and connects members with internship and career opportunities across the semiconductor sector.",
    members: [
      { name: "Chloe Wong Xin Hui",   role: "Sponsorship Director", dept: "BIZ/EEE Y3", initials: "CW", focus: "Industry Relations", isLead: true },
      { name: "D. Chen",              role: "BD Executive",        dept: "MSE Y1",      initials: "DC", focus: "Partnership Outreach" },
      { name: "E. Santos",            role: "BD Executive",        dept: "EEE Y1",      initials: "ES", focus: "Sponsorship Proposals" },
      { name: "F. Ibrahim",           role: "BD Executive",        dept: "EEE Y2",      initials: "FI", focus: "Alumni Engagement" },
    ],
  },
  publicity: {
    headline: "Publicity Sub-Committee",
    desc: "Manages the club's brand, social media presence, graphic design, photography, and all external communications to grow awareness of NTU SemiCon Club.",
    members: [
      { name: "Jordan Yeo Kai Wen",   role: "Marketing Director", dept: "ADM/EEE Y2",  initials: "JY", focus: "Science Communication", isLead: true },
      { name: "I. Fernandez",         role: "Publicity Executive", dept: "PHY Y2",     initials: "IF", focus: "Graphic Design" },
      { name: "J. Kwon",              role: "Publicity Executive", dept: "EEE Y1",     initials: "JK", focus: "Social Media" },
      { name: "L. Tan",               role: "Publicity Executive", dept: "MSE Y1",     initials: "LT", focus: "Photography" },
    ],
  },
};

function Avatar({ initials, size = 52, color = ACCENT_GOLD }: { initials: string; size?: number; color?: string }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color.replace("1)", "0.14)"),
      border: `1.5px solid ${color.replace("1)", "0.38)")}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <span style={{ ...mono, fontSize: size * 0.28, color, fontWeight: 700 }}>{initials}</span>
    </div>
  );
}

export default function Committee() {
  const [activeTab, setActiveTab] = useState<Tab>("main");
  const accent = TAB_ACCENT[activeTab];
  const { headline, desc, members } = TAB_DATA[activeTab];
  const leads = members.filter((m) => m.isLead);
  const rest  = members.filter((m) => !m.isLead);

  return (
    <div style={{ minHeight: "100vh", background: "rgba(8,14,32,1)" }}>

      {/* Hero */}
      <section style={{ padding: "80px 80px 60px", borderBottom: "1.5px solid rgba(30,41,59,0.5)", background: "rgba(10,16,38,0.5)" }}>
        <div style={{ ...mono, fontSize: 11, color: "rgba(212,152,26,0.75)", marginBottom: 16, letterSpacing: "0.1em" }}>[ 03 // COMMITTEE ]</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 42, fontWeight: 800, color: "#f0e8d0", fontFamily: "'Outfit', sans-serif", lineHeight: 1.1 }}>
              Our<br /><span style={{ color: ACCENT_GOLD }}>Committee</span>
            </h1>
            <p style={{ ...mono, fontSize: 12, color: "rgba(180,170,150,0.8)", marginTop: 16, maxWidth: 480, lineHeight: 1.7 }}>
              A multidisciplinary team from Electrical Engineering, Materials Science, and Physics — united by a passion for semiconductor technology.
            </p>
          </div>
          <div style={{ display: "flex", gap: 28, flexShrink: 0 }}>
            {[["21", "COMMITTEE MEMBERS"], ["5", "SUB-COMMITTEES"], ["AY 2026/27", "ACADEMIC YEAR"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "right" }}>
                <div style={{ ...mono, fontSize: 22, fontWeight: 700, color: ACCENT_GOLD }}>{n}</div>
                <div style={{ ...mono, fontSize: 9, color: "rgba(71,85,105,1)", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid rgba(30,41,59,0.5)", padding: "0 80px", display: "flex", gap: 0, background: "rgba(9,14,34,0.6)" }}>
        {TABS.map(({ id, label }) => {
          const active = activeTab === id;
          const tabAccent = TAB_ACCENT[id];
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                ...mono, fontSize: 11,
                padding: "18px 24px",
                background: "transparent",
                color: active ? tabAccent : "rgba(100,116,139,1)",
                border: "none",
                borderBottom: active ? `2px solid ${tabAccent}` : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s",
                marginBottom: -1,
                whiteSpace: "nowrap" as const,
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "rgba(220,205,170,1)"; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "rgba(100,116,139,1)"; }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <section style={{ padding: "52px 80px 100px" }}>
        {/* Tab header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ ...mono, fontSize: 10, color: accent, marginBottom: 8, letterSpacing: "0.08em" }}>// {activeTab.toUpperCase()}_COMMITTEE</div>
          <h2 style={{ ...outfit, margin: "0 0 10px", fontSize: 26, fontWeight: 700, color: "#f0e8d0" }}>{headline}</h2>
          <p style={{ ...mono, fontSize: 11, color: "rgba(180,170,150,0.75)", lineHeight: 1.75, maxWidth: 580, margin: 0 }}>{desc}</p>
        </div>

        {/* Lead cards */}
        {leads.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${leads.length <= 2 ? leads.length : 3}, 1fr)`, gap: 20, marginBottom: 24 }}>
            {leads.map((p) => (
              <div
                key={p.name}
                style={{
                  background: "rgba(10,16,38,0.9)",
                  border: `1.5px solid ${accent.replace("1)", "0.28)")}`,
                  borderRadius: 10, padding: "28px",
                  transition: "border 0.2s, box-shadow 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.border = `1.5px solid ${accent.replace("1)", "0.60)")}`; e.currentTarget.style.boxShadow = `0 0 24px ${accent.replace("1)", "0.08)")}`; }}
                onMouseLeave={(e) => { e.currentTarget.style.border = `1.5px solid ${accent.replace("1)", "0.28)")}`; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
                  <Avatar initials={p.initials} size={52} color={accent} />
                  <div>
                    <div style={{ ...mono, fontSize: 9, color: accent, letterSpacing: "0.08em", marginBottom: 4 }}>{p.role.toUpperCase()}</div>
                    <div style={{ ...outfit, fontSize: 16, fontWeight: 700, color: "#f0e8d0" }}>{p.name}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                  <span style={{ ...mono, fontSize: 9, color: "rgba(100,116,139,1)", background: "rgba(30,41,59,0.5)", borderRadius: 3, padding: "3px 8px" }}>{p.dept}</span>
                  {p.focus && <span style={{ ...mono, fontSize: 9, color: accent.replace("1)", "0.85)"), background: accent.replace("1)", "0.09)"), borderRadius: 3, padding: "3px 8px" }}>{p.focus}</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other members */}
        {rest.length > 0 && (
          <>
            {leads.length > 0 && (
              <div style={{ ...mono, fontSize: 9, color: "rgba(71,85,105,0.6)", marginBottom: 16 }}>// MEMBERS</div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
              {rest.map((p) => (
                <div
                  key={p.name}
                  style={{
                    background: "rgba(10,16,38,0.7)",
                    border: "1px solid rgba(30,41,59,0.5)",
                    borderRadius: 8, padding: "18px 20px",
                    display: "flex", alignItems: "center", gap: 14,
                    transition: "border 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.border = `1px solid ${accent.replace("1)", "0.35)")}`)}
                  onMouseLeave={(e) => (e.currentTarget.style.border = "1px solid rgba(30,41,59,0.5)")}
                >
                  <Avatar initials={p.initials} size={40} color={accent} />
                  <div>
                    <div style={{ ...mono, fontSize: 9, color: accent, marginBottom: 4, opacity: 0.85 }}>{p.role.toUpperCase()}</div>
                    <div style={{ ...outfit, fontSize: 13, fontWeight: 600, color: "#e8dfc0", marginBottom: 5 }}>{p.name}</div>
                    <span style={{ ...mono, fontSize: 8, color: "rgba(100,116,139,1)", background: "rgba(30,41,59,0.5)", borderRadius: 2, padding: "2px 6px" }}>{p.dept}</span>
                  </div>
                </div>
              ))}

              {/* Join card */}
              <div
                style={{
                  background: "transparent",
                  border: `1px dashed ${accent.replace("1)", "0.28)")}`,
                  borderRadius: 8, padding: "18px 20px",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
                  cursor: "pointer", transition: "border 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.border = `1px dashed ${accent.replace("1)", "0.60)")}`)}
                onMouseLeave={(e) => (e.currentTarget.style.border = `1px dashed ${accent.replace("1)", "0.28)")}`)}
              >
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px dashed ${accent.replace("1)", "0.50)")}`, display: "flex", alignItems: "center", justifyContent: "center", color: accent.replace("1)", "0.6)"), fontSize: 20 }}>+</div>
                <div style={{ ...mono, fontSize: 9, color: accent.replace("1)", "0.6)"), textAlign: "center" }}>JOIN THIS<br />COMMITTEE</div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
