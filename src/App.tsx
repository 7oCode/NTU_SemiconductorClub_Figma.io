import { useState, useRef } from "react";
import Nav from "./components/Nav";
import Introduction from "./pages/Introduction";
import Events from "./pages/Events";
import Committee from "./pages/Committee";
import Resources from "./pages/Resources";
import Footer from "./components/Footer";

export type Page = "introduction" | "events" | "committee" | "resources";

export default function App() {
  const [page, setPage] = useState<Page>("introduction");
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = (p: Page) => {
    if (p === page) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setFading(true);
    timerRef.current = setTimeout(() => {
      setPage(p);
      setFading(false);
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 220);
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "rgba(8,14,32,1)", color: "#fff" }}>
      <Nav currentPage={page} onNavigate={navigate} />
      <div
        style={{
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(6px)" : "translateY(0)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
        }}
      >
        {page === "introduction" && <Introduction onNavigate={navigate} />}
        {page === "events"       && <Events />}
        {page === "committee"    && <Committee />}
        {page === "resources"    && <Resources />}
        <Footer />
      </div>
    </div>
  );
}
