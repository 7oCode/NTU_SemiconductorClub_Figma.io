import logo from "../assets/logo.png";
import { mono, outfit } from "../types";

export default function Footer() {
  return (
    <footer style={{ width: "100%", padding: "28px 80px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(7,12,28,0.8)", borderTop: "1px solid rgba(212,152,26,0.2)" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <img
          src={logo}
          alt="NTU Semiconductor Club"
          width={24}
          height={24}
          style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
        />
        <span style={{ ...outfit, fontWeight: 700, fontSize: 14, color: "#f0e8d0" }}>NTU Semiconductor Club</span>
        <span style={{ ...mono, fontSize: 10, color: "rgba(71,85,105,1)", marginLeft: 4 }}>EST. 2024 // NANYANG TECHNOLOGICAL UNIVERSITY</span>
      </div>
      <span style={{ ...mono, fontSize: 10, color: "rgba(71,85,105,0.7)" }}>© 2024 NTU Semiconductor Club. All rights reserved.</span>
    </footer>
  );
}
