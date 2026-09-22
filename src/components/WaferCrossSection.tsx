import { useState } from "react";
import { LayerConfig, LayerId, ACCENT, mono } from "../types";

const GOLD_L  = "rgba(240,178,40,1)";
const CRIMSON = "rgba(185,30,30,1)";

export default function WaferCrossSection({
  layers,
  onLayerClick,
}: {
  layers: LayerConfig[];
  onLayerClick: (id: LayerId) => void;
}) {
  const [hovered, setHovered] = useState<LayerId | null>(null);
  const enabled = (id: LayerId) => (layers.find((l) => l.id === id)?.state ?? "DISABLED") === "ENABLED";

  const W = 480, H = 320;
  const waferLeft = 40, waferRight = W - 60, waferW = waferRight - waferLeft;
  const substrateTop = 148, substrateBot = 256;
  const sioxTop = 118, sioxBot = substrateTop;
  const resistTop = 92, resistBot = sioxTop;

  const gridLines: React.ReactElement[] = [];
  for (let x = waferLeft; x < waferRight; x += 14)
    gridLines.push(<line key={`gv${x}`} x1={x} y1={substrateTop} x2={x} y2={substrateBot} stroke="rgba(30,41,59,0.45)" strokeWidth="0.5" />);
  for (let y = substrateTop; y < substrateBot; y += 14)
    gridLines.push(<line key={`gh${y}`} x1={waferLeft} y1={y} x2={waferRight} y2={y} stroke="rgba(30,41,59,0.45)" strokeWidth="0.5" />);

  const implantArrows: React.ReactElement[] = [];
  if (enabled("A")) {
    [90, 170, 250, 330, 400].forEach((x) => {
      implantArrows.push(
        <g key={`imp${x}`}>
          <line x1={x} y1={substrateTop + 8} x2={x} y2={substrateTop + 52} stroke="rgba(212,152,26,0.55)" strokeWidth="1.5" strokeDasharray="3 2" />
          <polygon points={`${x - 4},${substrateTop + 10} ${x + 4},${substrateTop + 10} ${x},${substrateTop + 2}`} fill="rgba(212,152,26,0.65)" />
        </g>
      );
    });
  }

  const latticeDots: React.ReactElement[] = [];
  if (enabled("B")) {
    for (let xi = 0; xi < 8; xi++) for (let yi = 0; yi < 2; yi++) {
      const px = waferLeft + 28 + xi * 52, py = sioxTop + 7 + yi * 12;
      latticeDots.push(<circle key={`ld${xi}${yi}`} cx={px} cy={py} r="2.5" fill="rgba(240,178,40,0.75)" />);
      if (xi < 7) latticeDots.push(<line key={`lb${xi}${yi}`} x1={px + 4} y1={py} x2={px + 48} y2={py} stroke="rgba(240,178,40,0.28)" strokeWidth="1" />);
    }
  }

  const polymerLines: React.ReactElement[] = [];
  if (enabled("C")) {
    [60, 120, 190, 260, 340, 408].forEach((x, i) => {
      const y1 = resistTop + 6 + (i % 2) * 8, y2 = resistTop + 14 - (i % 2) * 8;
      polymerLines.push(<path key={`poly${i}`} d={`M${x},${y1} Q${x + 20},${y2} ${x + 40},${y1}`} fill="none" stroke="rgba(185,30,30,0.65)" strokeWidth="1.5" />);
    });
  }

  const edgeRx = waferW / 2;

  const hitRegions: { id: LayerId; y: number; h: number }[] = [
    { id: "C", y: resistTop,    h: resistBot - resistTop },
    { id: "B", y: sioxTop,      h: sioxBot - sioxTop },
    { id: "A", y: substrateTop, h: substrateBot - substrateTop },
  ];

  const layerFill = (id: LayerId) => {
    if (id === "C") return enabled("C") ? "rgba(38,6,6,1)"  : "rgba(20,14,22,1)";
    if (id === "B") return enabled("B") ? "rgba(35,24,4,1)" : "rgba(16,18,30,1)";
    return enabled("A") ? "rgba(16,22,40,1)" : "rgba(10,14,28,1)";
  };
  const layerStroke = (id: LayerId) => {
    const h = hovered === id, e = enabled(id);
    if (id === "C") return h ? CRIMSON : e ? "rgba(185,30,30,0.85)" : "rgba(30,41,59,0.5)";
    if (id === "B") return h ? GOLD_L  : e ? "rgba(240,178,40,0.85)" : "rgba(30,41,59,0.45)";
    return h ? "rgba(212,152,26,1)" : e ? "rgba(212,152,26,0.85)" : "rgba(30,41,59,0.45)";
  };
  const layerFilter = (id: LayerId) => enabled(id) ? (id === "C" ? "url(#glowC)" : id === "B" ? "url(#glowB)" : "url(#glowA)") : undefined;
  const dim = (id: LayerId) => hovered && hovered !== id ? 0.5 : 1;

  return (
    <svg width={W} height={H} style={{ display: "block", cursor: "crosshair" }}>
      <defs>
        <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={enabled("A") ? "rgba(15,31,46,1)" : "rgba(10,16,28,1)"} />
          <stop offset="100%" stopColor={enabled("A") ? "rgba(8,18,30,1)" : "rgba(7,10,19,1)"} />
        </linearGradient>
        <filter id="glowA"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="glowB"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="glowC"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <clipPath id="subClip"><rect x={waferLeft} y={substrateTop} width={waferW} height={substrateBot - substrateTop} /></clipPath>
        <clipPath id="sioxClip"><rect x={waferLeft} y={sioxTop} width={waferW} height={sioxBot - sioxTop} /></clipPath>
        <clipPath id="resistClip"><rect x={waferLeft} y={resistTop} width={waferW} height={resistBot - resistTop} /></clipPath>
      </defs>

      {/* Photoresist */}
      <rect x={waferLeft} y={resistTop} width={waferW} height={resistBot - resistTop}
        fill={layerFill("C")} stroke={layerStroke("C")} strokeWidth={hovered === "C" || enabled("C") ? 1.5 : 1}
        filter={layerFilter("C")} opacity={dim("C")} style={{ transition: "all 0.3s ease" }} />
      <g clipPath="url(#resistClip)">{polymerLines}</g>
      <rect x={waferLeft} y={resistTop} width={waferW} height={3} fill={enabled("C") ? "rgba(226,255,56,0.22)" : "rgba(255,255,255,0.04)"} style={{ pointerEvents: "none" }} />

      {/* SiO2 */}
      <rect x={waferLeft} y={sioxTop} width={waferW} height={sioxBot - sioxTop}
        fill={layerFill("B")} stroke={layerStroke("B")} strokeWidth={hovered === "B" || enabled("B") ? 1.5 : 1}
        filter={layerFilter("B")} opacity={dim("B")} style={{ transition: "all 0.3s ease" }} />
      <g clipPath="url(#sioxClip)">{latticeDots}</g>
      <rect x={waferLeft} y={sioxTop} width={waferW} height={2} fill={enabled("B") ? "rgba(0,255,102,0.14)" : "rgba(255,255,255,0.03)"} style={{ pointerEvents: "none" }} />

      {/* Substrate */}
      <rect x={waferLeft} y={substrateTop} width={waferW} height={substrateBot - substrateTop}
        fill="url(#subGrad)" stroke={layerStroke("A")} strokeWidth={hovered === "A" || enabled("A") ? 1.5 : 1}
        filter={layerFilter("A")} opacity={dim("A")} style={{ transition: "all 0.3s ease" }} />
      <g clipPath="url(#subClip)">{gridLines}{implantArrows}</g>
      <rect x={waferLeft} y={substrateBot - 4} width={waferW} height={4} fill="rgba(0,0,0,0.3)" />

      {/* Rims */}
      <ellipse cx={waferLeft + edgeRx} cy={resistTop} rx={edgeRx} ry={10}
        fill={enabled("C") ? "rgba(35,5,5,1)" : "rgba(18,14,24,1)"}
        stroke={enabled("C") ? "rgba(185,30,30,0.7)" : "rgba(30,41,59,0.6)"} strokeWidth="1.2" style={{ transition: "all 0.3s ease" }} />
      <ellipse cx={waferLeft + edgeRx} cy={substrateBot} rx={edgeRx} ry={8}
        fill={enabled("A") ? "rgba(20,14,5,1)" : "rgba(6,9,18,1)"}
        stroke={enabled("A") ? "rgba(212,152,26,0.5)" : "rgba(20,30,50,0.7)"} strokeWidth="1" style={{ transition: "all 0.3s ease" }} />

      {/* Callouts */}
      {[
        { id: "C" as LayerId, y: resistTop + (resistBot - resistTop) / 2, label: "~80nm" },
        { id: "B" as LayerId, y: sioxTop   + (sioxBot - sioxTop) / 2,     label: "~25nm" },
        { id: "A" as LayerId, y: substrateTop + (substrateBot - substrateTop) / 2, label: "~775μm" },
      ].map(({ id, y, label }) => (
        <g key={id}>
          <line x1={waferRight + 6} y1={y} x2={waferRight + 24} y2={y} stroke={enabled(id) ? ACCENT[id].replace("1)", "0.8)") : "rgba(71,85,105,0.5)"} strokeWidth="1" style={{ transition: "stroke 0.3s" }} />
          <text x={waferRight + 28} y={y + 4} style={{ ...mono, fill: enabled(id) ? ACCENT[id] : "rgba(71,85,105,0.9)", fontSize: 9, transition: "fill 0.3s" } as React.CSSProperties}>{label}</text>
        </g>
      ))}

      {/* Axis */}
      {[resistTop, sioxTop, substrateTop, substrateBot].map((y, i) => (
        <line key={i} x1={waferLeft - 2} y1={y} x2={waferLeft - 7} y2={y} stroke="rgba(30,41,59,0.6)" strokeWidth="1" />
      ))}
      <line x1={waferLeft - 5} y1={resistTop} x2={waferLeft - 5} y2={substrateBot} stroke="rgba(30,41,59,0.4)" strokeWidth="1" />
      <text transform={`translate(14,${(resistTop + substrateBot) / 2}) rotate(-90)`} textAnchor="middle" style={{ ...mono, fill: "rgba(71,85,105,0.6)", fontSize: 9 } as React.CSSProperties}>DEPTH</text>
      <text x={waferLeft} y={H - 8} style={{ ...mono, fill: "rgba(71,85,105,0.5)", fontSize: 9 } as React.CSSProperties}>CROSS_SECTION // NOT_TO_SCALE</text>

      {/* Scan lines */}
      {layers.filter((l) => l.state === "ENABLED").map((l) => {
        const yMap: Record<LayerId, number> = {
          C: resistTop + (resistBot - resistTop) / 2,
          B: sioxTop   + (sioxBot - sioxTop) / 2,
          A: substrateTop + (substrateBot - substrateTop) / 2,
        };
        return <line key={l.id} x1={waferLeft} y1={yMap[l.id]} x2={waferRight} y2={yMap[l.id]} stroke={ACCENT[l.id].replace("1)", "0.15)")} strokeWidth="1" strokeDasharray="4 4" />;
      })}

      {/* Hit regions */}
      {hitRegions.map(({ id, y, h }) => (
        <rect key={id} x={waferLeft} y={y} width={waferW} height={h} fill="transparent"
          onMouseEnter={() => setHovered(id)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onLayerClick(id)}
          style={{ cursor: "pointer" }} />
      ))}
    </svg>
  );
}
