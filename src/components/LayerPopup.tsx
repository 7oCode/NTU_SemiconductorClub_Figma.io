import { useEffect, useRef, useState } from "react";
import { LayerConfig, ACCENT, mono } from "../types";

export default function LayerPopup({ layer, onClose }: { layer: LayerConfig; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const accent = ACCENT[layer.id];
  const [entered, setEntered] = useState(false);

  // Trigger entrance animation after first paint
  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const click = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    const esc   = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("mousedown", click);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", click); document.removeEventListener("keydown", esc); };
  }, [onClose]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 300,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)",
      opacity: entered ? 1 : 0,
      transition: "opacity 0.22s ease",
    }}>
      <div ref={ref} style={{
        width: 520,
        background: "rgba(9,14,32,0.99)",
        border: `1.5px solid ${accent.replace("1)", "0.45)")}`,
        borderRadius: 10,
        padding: 36,
        boxShadow: `0 0 60px ${accent.replace("1)", "0.10)")}, 0 24px 60px rgba(0,0,0,0.6)`,
        position: "relative",
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0) scale(1)" : "translateY(12px) scale(0.97)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 18, background: "transparent", border: "none", color: "rgba(100,116,139,0.8)", cursor: "pointer", ...mono, fontSize: 18, lineHeight: 1 }}>✕</button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}` }} />
          <span style={{ ...mono, fontSize: 11, color: accent, letterSpacing: "0.08em" }}>{layer.label}</span>
          <span style={{ ...mono, fontSize: 10, color: "rgba(71,85,105,1)" }}>// {layer.sublabel}</span>
        </div>

        <p style={{ ...mono, fontSize: 12, color: "rgba(203,213,225,1)", lineHeight: 1.8, margin: "0 0 24px 0" }}>
          {layer.description}
        </p>

        <div style={{ background: "rgba(6,10,22,0.8)", border: "1px solid rgba(30,41,59,0.6)", borderRadius: 6, padding: "16px 20px", marginBottom: 20 }}>
          <div style={{ ...mono, fontSize: 9, color: "rgba(71,85,105,1)", marginBottom: 12, letterSpacing: "0.06em" }}>Material Specs</div>
          {layer.specs.map(({ key, value }) => (
            <div key={key} style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
              <span style={{ ...mono, fontSize: 11, color: "rgba(100,116,139,1)" }}>{key}</span>
              <span style={{ ...mono, fontSize: 11, color: "rgba(226,232,240,1)" }}>{value}</span>
            </div>
          ))}
        </div>

        <div style={{ borderLeft: `2px solid ${accent.replace("1)", "0.45)")}`, paddingLeft: 14 }}>
          <p style={{ ...mono, fontSize: 11, color: "rgba(148,163,184,0.9)", lineHeight: 1.75, margin: 0 }}>{layer.detail}</p>
        </div>
      </div>
    </div>
  );
}
