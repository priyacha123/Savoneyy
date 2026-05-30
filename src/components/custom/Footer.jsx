import { PALETTE } from "../../../utility/tokens";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer style={{
      background: PALETTE.surface,
      borderTop: `1px solid ${PALETTE.border}`,
      padding: "60px 40px 40px",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Top grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))",
          gap: 48,
          marginBottom: 48,
          minWidth: 0,
        }}>
          {/* Brand blurb */}
          <div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, marginBottom: 12 }}>
              Savoney
            </div>
            <p style={{ fontSize: 14, color: PALETTE.textMuted, lineHeight: 1.7, maxWidth: 280 }}>
              The intelligent financial platform built for modern creators and entrepreneurs.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              {[
                { icon: "🔗", label: "Share" },
                { icon: "✉️", label: "Mail" },
                { icon: "👥", label: "Community" },
              ].map(({ icon, label }) => (
                <Link key={label} to="#" aria-label={label} style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: PALETTE.hero,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, textDecoration: "none",
                }}>
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: "Platform",  links: ["Features", "Security", "Mobile App", "API Integration"] },
            { title: "Resources", links: ["Help Center", "Community", "Privacy Policy", "Terms of Use"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p style={{
                fontSize: 11, fontWeight: 700, letterSpacing: ".1em",
                textTransform: "uppercase", color: PALETTE.textLight, marginBottom: 16,
              }}>
                {title}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((l) => (
                  <Link key={l} to="#" className="svy-footer-link">{l}</Link>
                ))}
              </div>
            </div>
          ))}

          {/* Feedback card */}
          <div>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: ".1em",
              textTransform: "uppercase", color: PALETTE.textLight, marginBottom: 16,
            }}>
              Feedback
            </p>
            <div style={{
              background: PALETTE.hero, borderRadius: 16, padding: 20,
              border: `1px solid ${PALETTE.border}`,
            }}>
              <p style={{ fontSize: 13, color: PALETTE.textMuted, marginBottom: 12 }}>
                We'd love to hear your thoughts on this redesign!
              </p>
              <Link
                to="mailto:support@savoney.com"
                className="svy-btn-primary"
                style={{ textDecoration: "none", borderRadius: 10, padding: "10px 16px", fontSize: 13, display: "flex" }}
              >
                Send Feedback →
              </Link>
            </div>
          </div>
        </div>

        {/* Wordmark + copyright */}
        <div style={{ position: "relative", paddingTop: 24, borderTop: `1px solid ${PALETTE.border}` }}>
          <div className="svy-wordmark">Savoney.</div>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 12, marginTop: 16,
            fontSize: 13, color: PALETTE.textLight,
          }}>
            <span>Made with ❤️ by Priya</span>
            <span>© 2026 Savoney Financial Services. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
