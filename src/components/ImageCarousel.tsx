import { useState, useEffect, useCallback } from "react";
import { mono } from "../types";

const GOLD = "rgba(212,152,26,1)";

const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1587845323226-bad89242c735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1pY29uZHVjdG9yJTIwY2xlYW5yb29tJTIwc2lsaWNvbiUyMHdhZmVyJTIwZmFicmljYXRpb258ZW58MXx8fHwxNzkwMDAwNTU0fDA&ixlib=rb-4.1.0&q=80&w=800",
    caption: "Silicon wafer die inspection",
    credit: "Laura Ockel / Unsplash",
  },
  {
    url: "https://images.unsplash.com/photo-1748000970909-845f4aa144d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzZW1pY29uZHVjdG9yJTIwY2xlYW5yb29tJTIwc2lsaWNvbiUyMHdhZmVyJTIwZmFicmljYXRpb258ZW58MXx8fHwxNzkwMDAwNTU0fDA&ixlib=rb-4.1.0&q=80&w=800",
    caption: "Cleanroom fabrication environment",
    credit: "TECNIC Bioprocess / Unsplash",
  },
  {
    url: "https://images.unsplash.com/photo-1543727166-222902a0c7d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxzZW1pY29uZHVjdG9yJTIwY2xlYW5yb29tJTIwc2lsaWNvbiUyMHdhZmVyJTIwZmFicmljYXRpb258ZW58MXx8fHwxNzkwMDAwNTU0fDA&ixlib=rb-4.1.0&q=80&w=800",
    caption: "Semiconductor process layers",
    credit: "Laura Ockel / Unsplash",
  },
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((idx: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrent(idx);
      setFading(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      goTo((current + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [current, paused, goTo]);

  return (
    <div
      style={{ position: "relative", width: 420, height: 420, borderRadius: 14, overflow: "hidden", flexShrink: 0 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute", inset: 0,
            opacity: i === current ? (fading ? 0 : 1) : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: i === current ? "auto" : "none",
          }}
        >
          <img
            src={s.url}
            alt={s.caption}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Gradient overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,14,32,0.75) 0%, rgba(8,14,32,0.1) 45%, transparent 100%)" }} />
        </div>
      ))}

      {/* Caption */}
      <div style={{ position: "absolute", bottom: 44, left: 18, right: 18, pointerEvents: "none" }}>
        <p style={{ ...mono, fontSize: 11, color: "rgba(240,220,180,0.9)", margin: 0, lineHeight: 1.4 }}>
          {SLIDES[current].caption}
        </p>
        <p style={{ ...mono, fontSize: 9, color: "rgba(180,170,150,0.55)", margin: "3px 0 0" }}>
          {SLIDES[current].credit}
        </p>
      </div>

      {/* Dot indicators */}
      <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, alignItems: "center" }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? 22 : 6,
              height: 6,
              borderRadius: 3,
              background: i === current ? GOLD : "rgba(212,152,26,0.35)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.35s ease, background 0.25s ease",
            }}
          />
        ))}
      </div>

      {/* Gold accent border */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 14, border: "1.5px solid rgba(212,152,26,0.28)", pointerEvents: "none" }} />
    </div>
  );
}
