import { UserButton } from "@clerk/clerk-react";
import { PALETTE } from "../../../utility/tokens";


export default function Navbar({ formattedDate, resetData }) {
  return (
    <header className="svy-nav">
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: PALETTE.primary,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18,
        }}>💰</div>
        <span style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 22,
          color: PALETTE.textPrimary,
        }}>
          Savoney
        </span>
      </div>

      {/* Nav links */}
      <nav className="svy-nav-links" style={{ display: "flex", gap: 32 }}>
        {["#dashboard", "#income", "#budget", "#expense"].map((href) => (
          <a key={href} href={href} className="svy-nav-link">
            {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
          </a>
        ))}
      </nav>

      {/* Right side actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 13, color: PALETTE.textMuted, fontWeight: 600 }}>
          {formattedDate}
        </span>
        <button
          onClick={resetData}
          style={{
            background: "transparent",
            border: `1.5px solid ${PALETTE.error}`,
            color: PALETTE.error,
            borderRadius: 10,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Reset
        </button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}