import { PALETTE } from "../../../utility/tokens";

export default function HeroSection() {
  return (
    <section className="svy-hero">
      <div className="svy-hero-pill">✦ Now with AI-powered insights</div>

      <h1 style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: "clamp(40px, 6vw, 72px)",
        color: PALETTE.textPrimary,
        lineHeight: 1.12,
        maxWidth: 700,
        marginBottom: 24,
      }}>
        Master your money with{" "}
        <em style={{ color: PALETTE.primary, fontStyle: "italic" }}>absolute precision.</em>
      </h1>

      <p style={{
        fontSize: 18,
        color: PALETTE.textMuted,
        maxWidth: 480,
        marginBottom: 36,
        lineHeight: 1.6,
      }}>
        Achieve financial clarity effortlessly. Track, budget, and grow your wealth
        with beautiful tools that make money management a joy.
      </p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <a href="#dashboard" className="svy-btn-primary" style={{ textDecoration: "none", borderRadius: 12 }}>
          Go to Dashboard →
        </a>
        <a href="#income" className="svy-btn-secondary" style={{ textDecoration: "none" }}>
          See Features
        </a>
      </div>

      {/* Social proof stats */}
      <div style={{ display: "flex", gap: 40, marginTop: 56, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { val: "250K+",  label: "Active users" },
          { val: "₹2.4B+", label: "Tracked monthly" },
          { val: "4.9★",   label: "App Store rating" },
          { val: "99.9%",  label: "Uptime SLA" },
        ].map(({ val, label }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: PALETTE.primary }}>
              {val}
            </div>
            <div style={{ fontSize: 13, color: PALETTE.textMuted, fontWeight: 500 }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}