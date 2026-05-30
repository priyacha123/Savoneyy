import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroSection from "./custom/HeroSection";
import GlobalStyle from "../Globalstyle";

const FontLink = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,600;1,500&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
};

const ChartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="12" width="4" height="9" rx="1.5" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="1.5" />
    <rect x="10" y="7" width="4" height="14" rx="1.5" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="1.5" />
    <rect x="17" y="3" width="4" height="18" rx="1.5" fill="#BFDBFE" stroke="#2E86FF" strokeWidth="1.5" />
  </svg>
);

const WalletNavIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="6" width="20" height="14" rx="3" fill="#DBEAFE" stroke="#2E86FF" strokeWidth="1.8" />
    <path d="M2 10h20" stroke="#2E86FF" strokeWidth="1.5" />
    <circle cx="17" cy="15" r="2" fill="#2E86FF" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#93C5FD">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="#93C5FD" stroke="none" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#93C5FD">
    <path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.47C18.88 4 12 4 12 4s-6.88 0-8.6.47A2.78 2.78 0 0 0 1.46 6.42 29.05 29.05 0 0 0 1 12a29.05 29.05 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.53C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 0 0 1.94-1.95A29.05 29.05 0 0 0 23 12a29.05 29.05 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#EFF6FF" />
  </svg>
);

/* ── Animated counter hook ── */
/* ── Styles object ── */
const S = {
  // Layout
  page: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    background: "#EFF6FF",
    minHeight: "100vh",
    color: "#1E3A5F",
    overflowX: "hidden",
  },

  // Navbar
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "rgba(239,246,255,0.85)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(147,197,253,0.3)",
    padding: "0 48px",
    height: 68,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
  },
  navLogo: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    textDecoration: "none",
  },
  logoText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: 22,
    color: "#1D4ED8",
    letterSpacing: "-0.5px",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: 36,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLink: {
    textDecoration: "none",
    color: "#4B7FCC",
    fontSize: 15,
    fontWeight: 500,
    transition: "color .2s",
  },
  navRight: { display: "flex", alignItems: "center", gap: 12 },
  btnLogin: {
    background: "transparent",
    border: "1.5px solid #93C5FD",
    color: "#1D4ED8",
    padding: "9px 22px",
    borderRadius: 50,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: "all .2s",
  },
  btnGetStarted: {
    background: "linear-gradient(135deg, #2E86FF, #1D4ED8)",
    border: "none",
    color: "#fff",
    padding: "9px 24px",
    borderRadius: 50,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    boxShadow: "0 4px 16px rgba(46,134,255,0.35)",
    transition: "all .2s",
  },

  // Hero
  hero: {
    padding: "80px 48px 60px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 40,
    alignItems: "center",
    maxWidth: 1100,
    margin: "0 auto",
  },
  heroEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#DBEAFE",
    border: "1px solid #BFDBFE",
    color: "#2E86FF",
    padding: "6px 14px",
    borderRadius: 50,
    fontSize: 12.5,
    fontWeight: 600,
    marginBottom: 22,
    letterSpacing: "0.3px",
  },
  heroH1: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "clamp(36px, 4.5vw, 56px)",
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: "-1.5px",
    color: "#1D4ED8",
    marginBottom: 18,
  },
  heroH1Italic: {
    fontFamily: "'Lora', serif",
    fontStyle: "italic",
    fontWeight: 500,
    color: "#60A5FA",
  },
  heroSub: {
    fontSize: 16.5,
    color: "#4B7FCC",
    lineHeight: 1.72,
    marginBottom: 36,
    maxWidth: 420,
  },
  btnCreateAccount: {
    background: "linear-gradient(135deg, #2E86FF, #1D4ED8)",
    border: "none",
    color: "#fff",
    padding: "15px 38px",
    borderRadius: 50,
    fontSize: 15.5,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    boxShadow: "0 8px 28px rgba(46,134,255,0.4)",
    transition: "all .25s",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
  heroIllustration: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  illustrationWrap: {
    background: "linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 60%)",
    borderRadius: 32,
    padding: "32px 24px",
    border: "1.5px solid rgba(147,197,253,0.4)",
    boxShadow: "0 20px 60px rgba(96,165,250,0.15), 0 4px 16px rgba(96,165,250,0.1)",
    position: "relative",
    overflow: "hidden",
  },
  illustrationDeco: {
    position: "absolute",
    top: -30,
    right: -30,
    width: 130,
    height: 130,
    background: "radial-gradient(circle, rgba(147,197,253,0.3), transparent 70%)",
    borderRadius: "50%",
  },

  // Stats
  statsBar: {
    background: "#fff",
    borderTop: "1px solid rgba(147,197,253,0.3)",
    borderBottom: "1px solid rgba(147,197,253,0.3)",
    padding: "40px 48px",
  },
  statsInner: {
    display: "flex",
    justifyContent: "center",
    gap: 0,
    maxWidth: 800,
    margin: "0 auto",
  },
  statItem: {
    flex: 1,
    textAlign: "center",
    padding: "0 40px",
    borderRight: "1px solid rgba(147,197,253,0.4)",
  },
  statNum: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 40,
    fontWeight: 800,
    color: "#2E86FF",
    letterSpacing: "-1px",
  },
  statLabel: { fontSize: 13, color: "#93C5FD", marginTop: 4, fontWeight: 500 },

  // Features
  features: {
    padding: "80px 48px",
    maxWidth: 1100,
    margin: "0 auto",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
    marginTop: 48,
  },
  featureCard: {
    background: "#fff",
    border: "1.5px solid rgba(147,197,253,0.35)",
    borderRadius: 20,
    padding: "32px 28px",
    transition: "all .3s",
    cursor: "default",
  },
  featureIconBox: {
    width: 48,
    height: 48,
    background: "#EFF6FF",
    border: "1.5px solid #BFDBFE",
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  featureTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: 17,
    color: "#1D4ED8",
    marginBottom: 10,
    letterSpacing: "-0.3px",
  },
  featureDesc: { fontSize: 14.5, color: "#6BA3D6", lineHeight: 1.68 },

  // How section
  how: {
    background: "#fff",
    borderTop: "1px solid rgba(147,197,253,0.3)",
    borderBottom: "1px solid rgba(147,197,253,0.3)",
    padding: "80px 48px",
  },
  howInner: { maxWidth: 1100, margin: "0 auto" },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 32,
    marginTop: 52,
    position: "relative",
  },
  stepLine: {
    position: "absolute",
    top: 27,
    left: "12%",
    right: "12%",
    height: 1,
    background: "linear-gradient(90deg, transparent, #BFDBFE, #BFDBFE, transparent)",
  },
  step: { textAlign: "center", position: "relative", zIndex: 1 },
  stepNum: {
    width: 54,
    height: 54,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #2E86FF, #60A5FA)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 18px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: 20,
    color: "#fff",
    boxShadow: "0 0 0 8px rgba(147,197,253,0.2)",
  },
  stepTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: 15.5,
    color: "#1D4ED8",
    marginBottom: 8,
  },
  stepDesc: { fontSize: 13.5, color: "#6BA3D6", lineHeight: 1.65 },

  // Testimonials
  testimonials: {
    padding: "80px 48px",
    maxWidth: 1100,
    margin: "0 auto",
  },
  testiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
    marginTop: 48,
  },
  testiCard: {
    background: "#fff",
    border: "1.5px solid rgba(147,197,253,0.35)",
    borderRadius: 20,
    padding: "28px 24px",
  },
  stars: { color: "#FBBF24", fontSize: 15, letterSpacing: 3, marginBottom: 14 },
  testiText: { fontSize: 14.5, color: "#4B7FCC", lineHeight: 1.72, marginBottom: 20, fontStyle: "italic" },
  testiAuthor: { display: "flex", alignItems: "center", gap: 12 },
  avatar: {
    width: 40, height: 40, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 800, fontSize: 16, color: "#fff",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  authorName: { fontWeight: 700, fontSize: 14, color: "#1D4ED8" },
  authorRole: { fontSize: 12, color: "#93C5FD", marginTop: 2 },

  // CTA
  ctaSection: {
    margin: "0 48px 80px",
    background: "linear-gradient(135deg, #2E86FF 0%, #1D4ED8 100%)",
    borderRadius: 28,
    padding: "72px 60px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 24px 60px rgba(46,134,255,0.3)",
  },
  ctaH2: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(28px, 4vw, 46px)",
    color: "#fff",
    letterSpacing: "-1px",
    marginBottom: 14,
    position: "relative",
  },
  ctaSub: { fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36, position: "relative" },
  btnCtaWhite: {
    background: "#fff",
    border: "none",
    color: "#1D4ED8",
    padding: "14px 36px",
    borderRadius: 50,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    transition: "all .2s",
  },
  ctaDeco1: {
    position: "absolute",
    top: -60, right: -60,
    width: 200, height: 200,
    background: "rgba(255,255,255,0.08)",
    borderRadius: "50%",
  },
  ctaDeco2: {
    position: "absolute",
    bottom: -80, left: -40,
    width: 250, height: 250,
    background: "rgba(255,255,255,0.05)",
    borderRadius: "50%",
  },

  // Footer
  footer: {
    background: "#fff",
    borderTop: "1px solid rgba(147,197,253,0.3)",
    padding: "52px 48px 32px",
  },
  footerTop: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: 48,
    marginBottom: 48,
    maxWidth: 1100,
    margin: "0 auto 40px",
  },
  footerBrandDesc: { fontSize: 14, color: "#6BA3D6", lineHeight: 1.7, marginTop: 12, maxWidth: 240 },
  footerColH: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: 14,
    color: "#1D4ED8",
    marginBottom: 16,
  },
  footerBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 24,
    borderTop: "1px solid rgba(147,197,253,0.25)",
    maxWidth: 1100,
    margin: "0 auto",
  },
  footerLinks: { display: "flex", gap: 24, listStyle: "none", padding: 0, margin: 0 },
  footerLink: { textDecoration: "none", fontSize: 13.5, color: "#93C5FD", transition: "color .2s" },
  socials: { display: "flex", gap: 12, alignItems: "center" },
  socialBtn: {
    width: 36, height: 36,
    borderRadius: "50%",
    background: "#EFF6FF",
    border: "1px solid #BFDBFE",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer",
    transition: "all .2s",
  },

  // Shared
  sectionTag: {
    display: "inline-block",
    background: "#DBEAFE",
    border: "1px solid #BFDBFE",
    color: "#2E86FF",
    padding: "5px 14px",
    borderRadius: 50,
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 14,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  sectionH2: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(28px, 3.5vw, 44px)",
    color: "#1D4ED8",
    letterSpacing: "-1px",
    lineHeight: 1.12,
    marginBottom: 12,
  },
  sectionSub: { fontSize: 16, color: "#6BA3D6", lineHeight: 1.7, maxWidth: 480 },
};

/* ── Feature data ── */
const features = [
  {
    icon: <ChartIcon />,
    title: "Smart Budgeting",
    desc: "Automatically categorize every transaction and get intelligent weekly budget breakdowns tailored to your lifestyle.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="1.5" />
        <path d="M12 6v6l4 2" stroke="#2E86FF" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Real-Time Tracking",
    desc: "Watch your money move in real time. Instant notifications for every transaction so you're always in control.",
  },
  // {
  //   icon: (
  //     <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
  //       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" />
  //       <circle cx="9" cy="7" r="4" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="1.5" />
  //       <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
  //     </svg>
  //   ),
  //   title: "Family Wallets",
  //   desc: "Share budgets and track household expenses together. Perfect for couples and families managing finances jointly.",
  // },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="17 6 23 6 23 12" stroke="#2E86FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Savings Goals",
    desc: "Set savings milestones with visual progress tracking. Let Savoney coach you to hit every target on schedule.",
  },
  // {
  //   icon: (
  //     <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
  //       <rect x="2" y="3" width="20" height="14" rx="3" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="1.5" />
  //       <path d="M8 21h8M12 17v4" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" />
  //       <path d="M7 8h4M7 11h6" stroke="#2E86FF" strokeWidth="1.5" strokeLinecap="round" />
  //     </svg>
  //   ),
  //   title: "Detailed Reports",
  //   desc: "Monthly and yearly PDF reports give you a crystal-clear picture of your financial health and spending trends.",
  // },
];

const steps = [
  { n: 1, title: "Create Account", desc: "Sign up in 30 seconds — no credit card, no commitment." },
  { n: 2, title: "Input your income details", desc: "Add your income details." },
  { n: 3, title: "Input your expenses details", desc: "Add your expenses details." },
  { n: 4, title: "Add your budgets", desc: "Add your budgets" },
  { n: 5, title: "Filter the expenses ", desc: "Filter your expenses" },
  { n: 6, title: "View your reports", desc: "View your reports" },
];

/* ── Main Component ── */
export default function SavoneyLanding() {
  const [hovered, setHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <GlobalStyle />
      <FontLink />
      <div style={S.page}>

        {/* ── NAVBAR ── */}
        <nav style={{
          ...S.nav,
          boxShadow: scrolled ? "0 4px 24px rgba(96,165,250,0.12)" : "none",
          transition: "box-shadow .3s",
        }}>
          <Link to="#" style={S.navLogo}>
            <WalletNavIcon />
            <span style={S.logoText}>Savoney</span>
          </Link>

          <ul style={S.navLinks}>
            {["Features", "Pricing", "About", "Blog"].map((l) => (
              <li key={l}>
                <Link
                  to="#"
                  style={{
                    ...S.navLink,
                    color: hovered === `nav-${l}` ? "#1D4ED8" : "#4B7FCC",
                  }}
                  onMouseEnter={() => setHovered(`nav-${l}`)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>

          <div style={S.navRight}>
            
<SignedOut>
  <SignInButton mode="modal" asChild>
    <button
      style={{
        ...S.btnLogin,
        background: hovered === "login" ? "#EFF6FF" : "transparent",
      }}
      onMouseEnter={() => setHovered("login")}
      onMouseLeave={() => setHovered(null)}
    >
      Log In
    </button>
  </SignInButton>
</SignedOut>

<SignedIn>
  <UserButton />
</SignedIn>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              "@media (max-width: 768px)": { display: "block" },
            }}
          >
            <div style={{ width: 22, height: 2, background: "#2E86FF", marginBottom: 5, borderRadius: 2 }} />
            <div style={{ width: 22, height: 2, background: "#2E86FF", marginBottom: 5, borderRadius: 2 }} />
            <div style={{ width: 22, height: 2, background: "#2E86FF", borderRadius: 2 }} />
          </button>
        </nav>
      <HeroSection />

        {/* ── FEATURES ── */}
        <section style={S.features} id="features">
          <div style={S.sectionTag}>Features</div>
          <h2 style={S.sectionH2}>Everything you need<br />to master your money</h2>
          <p style={S.sectionSub}>
            From daily tracking to long-term wealth planning — Savoney adapts to your financial life.
          </p>

          <div style={S.featuresGrid}>
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  ...S.featureCard,
                  transform: hovered === `f${i}` ? "translateY(-6px)" : "none",
                  boxShadow: hovered === `f${i}` ? "0 16px 44px rgba(96,165,250,0.15)" : "0 2px 8px rgba(96,165,250,0.06)",
                  borderColor: hovered === `f${i}` ? "#93C5FD" : "rgba(147,197,253,0.35)",
                }}
                onMouseEnter={() => setHovered(`f${i}`)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={S.featureIconBox}>{f.icon}</div>
                <div style={S.featureTitle}>{f.title}</div>
                <div style={S.featureDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={S.how} id="how">
          <div style={S.howInner}>
            <div style={{ textAlign: "center" }}>
              <div style={S.sectionTag}>How It Works</div>
              <h2 style={S.sectionH2}>Up and running in minutes</h2>
            </div>
            <div style={S.stepsGrid}>
              <div style={S.stepLine} />
              {steps.map((s) => (
                <div key={s.n} style={S.step}>
                  <div style={S.stepNum}>{s.n}</div>
                  <div style={S.stepTitle}>{s.title}</div>
                  <div style={S.stepDesc}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ── */}
        <section style={S.ctaSection}>
          <div style={S.ctaDeco1} />
          <div style={S.ctaDeco2} />
          <h2 style={S.ctaH2}>Start saving smarter today</h2>
          <p style={S.ctaSub}>
            Free forever for personal use. No credit card needed.<br />
            Upgrade anytime for premium features.
          </p>
<SignedOut>
  <SignInButton mode="modal" asChild>
    <button
      style={{
        ...S.btnCtaWhite,
        transform: hovered === "ctab" ? "translateY(-2px)" : "none",
        boxShadow:
          hovered === "ctab"
            ? "0 14px 32px rgba(0,0,0,0.25)"
            : "0 8px 24px rgba(0,0,0,0.15)",
      }}
      onMouseEnter={() => setHovered("ctab")}
      onMouseLeave={() => setHovered(null)}
    >
      Create Free Account →
    </button>
  </SignInButton>
</SignedOut>

<SignedIn>
  <button
    onClick={() => navigate("/dashboard")}
    style={{
      ...S.btnGetStarted,
    }}
  >
    Dashboard
  </button>
</SignedIn>
        </section>

        {/* ── FOOTER ── */}
        <footer style={S.footer}>
          <div style={S.footerTop}>
            <div>
              <Link to="#" style={S.navLogo}>
                <WalletNavIcon />
                <span style={S.logoText}>Savoney</span>
              </Link>
              <p style={S.footerBrandDesc}>
                The smartest way to track income, manage expenses, and grow your savings — effortlessly.
              </p>
            </div>

            {[
              { h: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
              { h: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { h: "Legal", links: ["Privacy Policy", "Terms of Service", "Security", "Cookies"] },
            ].map((col) => (
              <div key={col.h}>
                <div style={S.footerColH}>{col.h}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        to="#"
                        style={{
                          ...S.footerLink,
                          color: hovered === `fl-${l}` ? "#1D4ED8" : "#93C5FD",
                        }}
                        onMouseEnter={() => setHovered(`fl-${l}`)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={S.footerBottom}>
            <ul style={S.footerLinks}>
              {["About", "Terms of Service", "Privacy Policy"].map((l) => (
                <li key={l}>
                  <Link to="#" style={S.footerLink}>{l}</Link>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 13, color: "#BFDBFE" }}>© 2026 Savoney. All rights reserved.</p>
            <div style={S.socials}>
              {[<FacebookIcon />, <InstagramIcon />, <YoutubeIcon />].map((icon, i) => (
                <div
                  key={i}
                  style={{
                    ...S.socialBtn,
                    background: hovered === `soc${i}` ? "#DBEAFE" : "#EFF6FF",
                    transform: hovered === `soc${i}` ? "translateY(-2px)" : "none",
                  }}
                  onMouseEnter={() => setHovered(`soc${i}`)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
