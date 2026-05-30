import { useEffect, useState } from "react";
import { Menu, RefreshCw, X } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { PALETTE } from "../../../utility/tokens";

const NAV_ITEMS = ["#dashboard", "#income", "#budget", "#expense"];

export default function Navbar({ formattedDate, resetData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollToSection = (href) => (event) => {
    event.preventDefault();
    const section = document.querySelector(href);
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
    setIsMenuOpen(false);
  };

  const renderLink = (href) => (
    <Link
      key={href}
      to={href}
      className="svy-nav-link"
      onClick={scrollToSection(href)}
    >
      {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
    </Link>
  );

  return (
    <header className="svy-nav">
      <Link
        to="/"
        className="svy-brand-link"
        onClick={() => setIsMenuOpen(false)}
      >
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
      </Link>

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
      <aside className={`svy-sidebar ${isMenuOpen ? "open" : ""}`} aria-hidden={!isMenuOpen}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <Link
            to="/"
            className="svy-brand-link"
            onClick={() => setIsMenuOpen(false)}
            style={{ gap: 8 }}
          >
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: PALETTE.primary, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 800,
            }}>S</div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: PALETTE.textPrimary }}>
            Savoney
            </span>
          </Link>
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
