export type LayerState = "DISABLED" | "ENABLED";
export type LayerId = "A" | "B" | "C";

export interface LayerConfig {
  id: LayerId;
  label: string;
  sublabel: string;
  state: LayerState;
  description: string;
  specs: { key: string; value: string }[];
  detail: string;
}

export const ACCENT: Record<LayerId, string> = {
  A: "rgba(212,152,26,1)",
  B: "rgba(240,178,40,1)",
  C: "rgba(185,30,30,1)",
};

// Shared palette tokens
export const GOLD   = "rgba(212,152,26,1)";
export const GOLD_L = "rgba(240,178,40,1)";
export const CRIMSON = "rgba(185,30,30,1)";

export const mono = { fontFamily: "'Geist Mono', monospace" } as const;
export const outfit = { fontFamily: "'Outfit', sans-serif" } as const;

export const LAYER_DATA: LayerConfig[] = [
  {
    id: "A",
    label: "LAYER_A",
    sublabel: "SILICON_SUBSTRATE",
    state: "DISABLED",
    description:
      "The silicon substrate is the foundational bulk material of the wafer — a single-crystal silicon ingot sliced to ~775μm thickness. Its crystalline lattice provides the ordered atomic structure necessary for controlled semiconductor behavior.",
    specs: [
      { key: "MATERIAL", value: "Monocrystalline Si" },
      { key: "THICKNESS", value: "~775 μm" },
      { key: "RESISTIVITY", value: "1–10 Ω·cm" },
      { key: "ORIENTATION", value: "<100> or <111>" },
      { key: "DOPANT", value: "Boron (p-type)" },
    ],
    detail:
      "Ion implantation introduces controlled impurities (dopants) into this layer to create p-n junctions — the switching elements at the heart of every transistor on the chip.",
  },
  {
    id: "B",
    label: "LAYER_B",
    sublabel: "SILICON_DIOXIDE",
    state: "ENABLED",
    description:
      "Silicon dioxide (SiO₂) is a thermally grown dielectric that forms the gate oxide in MOSFETs and serves as an isolation barrier between conducting regions. Its near-perfect interface with silicon makes it irreplaceable in CMOS fabrication.",
    specs: [
      { key: "MATERIAL", value: "SiO₂ (thermal)" },
      { key: "THICKNESS", value: "~25 nm" },
      { key: "DIELECTRIC_K", value: "3.9" },
      { key: "BREAKDOWN", value: ">10 MV/cm" },
      { key: "GROWTH", value: "Dry/wet oxidation" },
    ],
    detail:
      "Grown at 900–1200°C in an oxidizing atmosphere, SiO₂ consumes the underlying silicon as it grows — meaning the interface is atomically clean and defect-minimal.",
  },
  {
    id: "C",
    label: "LAYER_C",
    sublabel: "PHOTORESIST",
    state: "DISABLED",
    description:
      "Photoresist is a light-sensitive polymer spun onto the wafer surface. UV or EUV exposure changes its chemical solubility, allowing selective etching to transfer a circuit pattern from a photomask onto the underlying layers.",
    specs: [
      { key: "MATERIAL", value: "CAR polymer resin" },
      { key: "THICKNESS", value: "~80 nm" },
      { key: "TYPE", value: "Positive-tone" },
      { key: "WAVELENGTH", value: "EUV 13.5 nm" },
      { key: "SENSITIVITY", value: "~20 mJ/cm²" },
    ],
    detail:
      "Chemically amplified resists (CARs) use a photoacid generator to amplify a single photon absorption event into thousands of deprotection reactions, enabling extreme pattern resolution at sub-7nm nodes.",
  },
];
