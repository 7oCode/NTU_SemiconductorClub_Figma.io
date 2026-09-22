import { useMemo } from "react";
import { mono } from "../types";

// Realistic silicon wafer top-view SVG
export default function SiliconWafer() {
  const CX = 200, CY = 206, R = 178;

  // Die pitch
  const DW = 21, DH = 17, GAP = 2;
  const PX = DW + GAP, PY = DH + GAP;

  // Seeded pseudo-random (deterministic)
  const rand = (seed: number) => {
    const x = Math.sin(seed + 1) * 43758.5453;
    return x - Math.floor(x);
  };

  const dies = useMemo(() => {
    const result: { x: number; y: number; cx: number; cy: number; dist: number; idx: number }[] = [];
    let idx = 0;
    for (let row = -11; row <= 11; row++) {
      for (let col = -11; col <= 11; col++) {
        const cx = CX + col * PX;
        const cy = CY + row * PY;
        const dist = Math.sqrt((cx - CX) ** 2 + (cy - CY) ** 2);
        if (dist < R - 6) {
          result.push({ x: cx - DW / 2, y: cy - DH / 2, cx, cy, dist, idx: idx++ });
        }
      }
    }
    return result;
  }, []);

  // Die fill color based on position + random variation
  const dieColor = (dist: number, idx: number) => {
    const r = rand(idx);
    const r2 = rand(idx * 7 + 3);
    // Defective: ~4% of dies
    if (r < 0.04) return "rgba(60,12,12,0.9)";
    // KGD highlight: ~8% near center
    if (dist < 80 && r2 < 0.12) return "rgba(8,28,18,0.95)";
    // Normal: subtle variation between dark blue-grays
    const v = Math.floor(r * 12);
    return `rgba(${13 + v},${18 + v},${32 + v},0.95)`;
  };

  // Notch path (V-notch at bottom)
  const notchAngle = Math.PI / 2; // bottom
  const notchSize = 10;
  const notchX = CX + R * Math.cos(notchAngle + Math.PI / 2);
  const notchY = CY + R * Math.sin(notchAngle + Math.PI / 2);
  const notchL = { x: notchX - notchSize, y: notchY - 5 };
  const notchR = { x: notchX + notchSize, y: notchY - 5 };

  const waferPath = [
    `M ${notchL.x} ${notchL.y}`,
    `A ${R} ${R} 0 1 0 ${notchR.x} ${notchR.y}`,
    `L ${notchX} ${notchY}`,
    "Z",
  ].join(" ");

  return (
    <svg
      width={400}
      height={420}
      viewBox="0 0 400 420"
      style={{ display: "block", filter: "drop-shadow(0 0 40px rgba(0,255,102,0.08))" }}
    >
      <defs>
        {/* Base wafer surface — dark metallic with off-center reflection */}
        <radialGradient id="waferBase" cx="38%" cy="32%" r="75%">
          <stop offset="0%"   stopColor="#263045" />
          <stop offset="25%"  stopColor="#182030" />
          <stop offset="60%"  stopColor="#0f1620" />
          <stop offset="100%" stopColor="#080d18" />
        </radialGradient>

        {/* Edge bevel highlight */}
        <radialGradient id="bevelGrad" cx="50%" cy="50%" r="50%">
          <stop offset="86%"  stopColor="transparent" />
          <stop offset="93%"  stopColor="rgba(80,110,160,0.35)" />
          <stop offset="97%"  stopColor="rgba(140,170,220,0.5)" />
          <stop offset="100%" stopColor="rgba(60,80,130,0.2)" />
        </radialGradient>

        {/* Thin-film iridescence rings */}
        <radialGradient id="iridescentA" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="transparent" />
          <stop offset="50%"  stopColor="transparent" />
          <stop offset="72%"  stopColor="rgba(100,60,200,0.07)" />
          <stop offset="80%"  stopColor="rgba(50,100,220,0.09)" />
          <stop offset="87%"  stopColor="rgba(30,180,180,0.07)" />
          <stop offset="92%"  stopColor="rgba(20,200,120,0.05)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Specular highlight — simulate polished surface reflection */}
        <radialGradient id="specular" cx="35%" cy="28%" r="45%">
          <stop offset="0%"   stopColor="rgba(100,140,200,0.12)" />
          <stop offset="60%"  stopColor="rgba(60,90,160,0.04)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        <clipPath id="waferShape">
          <path d={waferPath} />
        </clipPath>

        <clipPath id="dieArea">
          <circle cx={CX} cy={CY} r={R - 8} />
        </clipPath>

        <filter id="dieBlur">
          <feGaussianBlur stdDeviation="0.3" />
        </filter>
      </defs>

      {/* Outer shadow ring */}
      <circle cx={CX} cy={CY} r={R + 6} fill="rgba(0,0,0,0.5)" />

      {/* Wafer base fill */}
      <path d={waferPath} fill="url(#waferBase)" />

      {/* Die grid — clipped to wafer */}
      <g clipPath="url(#dieArea)">
        {/* Scribe lane background (slightly darker than dies) */}
        <rect x={CX - R} y={CY - R} width={R * 2} height={R * 2} fill="#090e18" />
        {/* Dies */}
        {dies.map(({ x, y, dist, idx }) => (
          <rect
            key={idx}
            x={x} y={y}
            width={DW} height={DH}
            fill={dieColor(dist, idx)}
            rx={0.5}
          />
        ))}
        {/* Subtle horizontal scribe lines */}
        {Array.from({ length: 24 }, (_, i) => {
          const y = CY - 11 * PY + i * PY + DH;
          return (
            <line key={`sh${i}`} x1={CX - R} y1={y} x2={CX + R} y2={y}
              stroke="rgba(0,255,102,0.04)" strokeWidth={0.5} />
          );
        })}
        {/* Subtle vertical scribe lines */}
        {Array.from({ length: 24 }, (_, i) => {
          const x = CX - 11 * PX + i * PX + DW;
          return (
            <line key={`sv${i}`} x1={x} y1={CY - R} x2={x} y2={CY + R}
              stroke="rgba(0,255,102,0.04)" strokeWidth={0.5} />
          );
        })}
      </g>

      {/* Thin-film iridescence overlay */}
      <path d={waferPath} fill="url(#iridescentA)" style={{ mixBlendMode: "screen" }} />

      {/* Specular highlight */}
      <path d={waferPath} fill="url(#specular)" />

      {/* Edge bevel */}
      <path d={waferPath} fill="url(#bevelGrad)" />

      {/* Outer ring stroke */}
      <path d={waferPath} fill="none"
        stroke="rgba(80,100,140,0.7)" strokeWidth={1.5} />

      {/* Inner ring (beveled edge inner) */}
      <circle cx={CX} cy={CY} r={R - 3} fill="none"
        stroke="rgba(40,60,100,0.3)" strokeWidth={1} />

      {/* Alignment cross at center */}
      <line x1={CX - 10} y1={CY} x2={CX + 10} y2={CY} stroke="rgba(0,255,102,0.25)" strokeWidth={0.8} />
      <line x1={CX} y1={CY - 10} x2={CX} y2={CY + 10} stroke="rgba(0,255,102,0.25)" strokeWidth={0.8} />
      <circle cx={CX} cy={CY} r={2.5} fill="none" stroke="rgba(0,255,102,0.3)" strokeWidth={0.8} />

      {/* Notch label */}
      <text x={CX} y={CY + R + 20} textAnchor="middle"
        style={{ ...mono, fill: "rgba(71,85,105,0.6)", fontSize: 9 } as React.CSSProperties}>
        ▲ ORIENTATION_NOTCH
      </text>

      {/* Wafer spec labels */}
      <text x={20} y={32}
        style={{ ...mono, fill: "rgba(71,85,105,0.55)", fontSize: 9 } as React.CSSProperties}>
        Ø 300mm // Si &lt;100&gt;
      </text>
      <text x={20} y={46}
        style={{ ...mono, fill: "rgba(71,85,105,0.45)", fontSize: 9 } as React.CSSProperties}>
        p-type // B-doped
      </text>

      {/* Die count badge */}
      <rect x={280} y={18} width={100} height={36} rx={4}
        fill="rgba(7,10,19,0.85)" stroke="rgba(30,41,59,0.7)" strokeWidth={1} />
      <text x={330} y={33} textAnchor="middle"
        style={{ ...mono, fill: "rgba(0,255,102,0.9)", fontSize: 9 } as React.CSSProperties}>
        {dies.length} DIES
      </text>
      <text x={330} y={47} textAnchor="middle"
        style={{ ...mono, fill: "rgba(71,85,105,0.7)", fontSize: 8 } as React.CSSProperties}>
        GATE_COUNT: 14.2B
      </text>
    </svg>
  );
}
