import { useEffect, useRef, useState } from "react";
import { Menu, RefreshCw, X } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { PALETTE } from "../../../utility/tokens";

const NAV_ITEMS = ["#dashboard", "#income", "#budget", "#expense"];

export default function Navbar({ formattedDate, resetData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    function handlePointerDown(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isMenuOpen]);

  const renderLink = (href) => (
    <Link
      key={href}
      to={href}
      className="svy-nav-link"
      onClick={() => setIsMenuOpen(false)}
    >
      {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
    </Link>
  );

  return (
    <header className="svy-nav">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: PALETTE.primary, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, fontWeight: 800,
        }}>S</div>
        <span style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 22,
          color: PALETTE.textPrimary,
        }}>
          Savoney
        </span>
      </div>

      <nav className="svy-nav-links" style={{ display: "flex", gap: 32 }}>
        {NAV_ITEMS.map(renderLink)}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span className="svy-nav-date" style={{ fontSize: 13, color: PALETTE.textMuted, fontWeight: 600 }}>
          {formattedDate}
        </span>
        <button
          onClick={resetData}
          title="Refresh dashboard data"
          style={{
            background: "transparent",
            border: `1.5px solid ${PALETTE.error}`,
            color: PALETTE.error,
            borderRadius: 10,
            padding: "6px 10px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <RefreshCw size={14} />
        </button>
        <UserButton afterSignOutUrl="/" />
        <button
          className="svy-menu-button"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className={`svy-sidebar-backdrop ${isMenuOpen ? "open" : ""}`} />
      <aside ref={panelRef} className={`svy-sidebar ${isMenuOpen ? "open" : ""}`} aria-hidden={!isMenuOpen}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: PALETTE.textPrimary }}>
            Savoney
          </span>
          <button className="svy-menu-button" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav style={{ display: "grid", gap: 18 }}>
          {NAV_ITEMS.map(renderLink)}
        </nav>
      </aside>
    </header>
  );
}
