import logo from "../assets/logo.png";
import type { Page } from "../App";
import { mono, outfit } from "../types";

const NAV_ITEMS: { label: string; page: Page }[] = [
  { label: "01 // INTRODUCTION", page: "introduction" },
  { label: "02 // EVENTS",       page: "events" },
  { label: "03 // COMMITTEE",    page: "committee" },
  { label: "04 // RESOURCES",    page: "resources" },
];

interface NavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Nav({ currentPage, onNavigate }: NavProps) {
  return (
    <nav style={{
      width: "100%", height: 80,
      background: "rgba(7,12,28,0.97)",
      borderBottom: "1.5px solid rgba(212,152,26,0.35)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 80px",
      position: "sticky", top: 0, zIndex: 100,
      backdropFilter: "blur(12px)",
    }}>
      {/* Logo */}
      <div
        onClick={() => onNavigate("introduction")}
        style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", flexShrink: 0 }}
      >
        <img
          src={logo}
          alt="NTU Semiconductor Club"
          width={40}
          height={40}
          style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
        />
        <span style={{ ...outfit, fontWeight: 800, fontSize: 15, color: "#f0e8d0" }}>NTU Semiconductor Club</span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 36, ...mono, fontSize: 11 }}>
        {NAV_ITEMS.map(({ label, page }) => {
          const active = currentPage === page;
          return (
            <span
              key={page}
              onClick={() => onNavigate(page)}
              style={{
                color: active ? "rgba(212,152,26,1)" : "rgba(148,163,184,1)",
                cursor: "pointer", transition: "color 0.2s",
                borderBottom: active ? "1px solid rgba(212,152,26,0.6)" : "1px solid transparent",
                paddingBottom: 2,
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "rgba(240,210,160,1)"; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "rgba(148,163,184,1)"; }}
            >
              {label}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
