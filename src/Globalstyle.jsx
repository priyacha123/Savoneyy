import { PALETTE } from "../utility/tokens";

export default function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@0;1&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      html,
      body,
      #root {
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
      }

      body {
        font-family: 'DM Sans', sans-serif;
        background: ${PALETTE.bg};
        color: ${PALETTE.textPrimary};
        -webkit-font-smoothing: antialiased;
      }

      /* ── scrollbar ── */
      .svy-scroll {
        overscroll-behavior: contain;
        padding-right: 2px;
        scrollbar-width: none;
      }
      .svy-scroll:hover,
      .svy-scroll:focus-within,
      .svy-scroll:active {
        scrollbar-width: thin;
        scrollbar-color: ${PALETTE.border} transparent;
      }
      .svy-scroll::-webkit-scrollbar { width: 0; height: 0; }
      .svy-scroll:hover::-webkit-scrollbar,
      .svy-scroll:focus-within::-webkit-scrollbar,
      .svy-scroll:active::-webkit-scrollbar { width: 5px; height: 5px; }
      .svy-scroll::-webkit-scrollbar-track { background: transparent; }
      .svy-scroll::-webkit-scrollbar-thumb { background: ${PALETTE.border}; border-radius: 9px; }

      /* ── card ── */
      .svy-card {
        background: ${PALETTE.surface};
        border: 1px solid ${PALETTE.border};
        border-radius: 20px;
        padding: 28px;
        min-width: 0;
      }

      /* ── inputs ── */
      .svy-input {
        width: 100%;
        background: ${PALETTE.bg};
        border: 1.5px solid ${PALETTE.border};
        border-radius: 12px;
        padding: 12px 16px;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 500;
        color: ${PALETTE.textPrimary};
        outline: none;
        transition: border-color .2s;
      }
      .svy-input:focus { border-color: ${PALETTE.primary}; }

      /* ── labels ── */
      .svy-label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: .06em;
        text-transform: uppercase;
        color: ${PALETTE.textMuted};
        margin-bottom: 8px;
      }

      /* ── typography ── */
      .svy-section-title {
        font-family: 'DM Serif Display', serif;
        font-size: 22px;
        color: ${PALETTE.textPrimary};
      }
      .svy-main {
        max-width: 1280px;
        margin: 0 auto;
        padding: 60px 32px 80px;
      }
      .svy-dashboard-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 36px;
      }
      .svy-dashboard-title {
        font-family: 'DM Serif Display', serif;
        font-size: 32px;
        color: ${PALETTE.textPrimary};
      }
      .svy-date-chip {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: ${PALETTE.surface};
        border: 1px solid ${PALETTE.border};
        border-radius: 12px;
        padding: 8px 16px;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .svy-date-chip span:first-child {
        font-size: 14px;
        color: ${PALETTE.textPrimary};
      }
      .svy-date-chip span:last-child {
        font-size: 13px;
        font-weight: 600;
        color: ${PALETTE.textMuted};
      }
      .svy-tag {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: .1em;
        text-transform: uppercase;
        color: ${PALETTE.textLight};
        margin-bottom: 20px;
      }

      /* ── nav ── */
      .svy-nav {
        position: sticky;
        top: 0;
        z-index: 50;
        background: rgba(255,255,255,.9);
        backdrop-filter: blur(16px);
        border-bottom: 1px solid ${PALETTE.border};
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40px;
        height: 64px;
      }
      .svy-nav-link {
        font-size: 14px;
        font-weight: 600;
        color: ${PALETTE.textMuted};
        text-decoration: none;
        transition: color .15s;
      }
      .svy-brand-link {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        color: inherit;
        text-decoration: none;
      }
      .svy-nav-link:hover, .svy-nav-link.active { color: ${PALETTE.primary}; }
      .landing-menu-button {
        display: none;
        align-items: center;
        justify-content: center;
        color: ${PALETTE.primary};
      }
      .svy-menu-button {
        width: 38px;
        height: 38px;
        display: none;
        align-items: center;
        justify-content: center;
        background: ${PALETTE.surface};
        border: 1px solid ${PALETTE.border};
        border-radius: 10px;
        color: ${PALETTE.textPrimary};
        cursor: pointer;
      }
      .svy-sidebar-backdrop {
        position: fixed;
        inset: 0;
        z-index: 60;
        background: rgba(25,27,35,.32);
        opacity: 0;
        pointer-events: none;
        transition: opacity .2s ease;
      }
      .svy-sidebar-backdrop.open {
        opacity: 1;
        pointer-events: none;
      }
      .svy-sidebar {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 70;
        width: min(320px, 86vw);
        height: 100vh;
        background: ${PALETTE.surface};
        border-left: 1px solid ${PALETTE.border};
        padding: 22px;
        transform: translateX(100%);
        transition: transform .24s ease;
        box-shadow: -20px 0 60px rgba(25,27,35,.12);
      }
      .svy-sidebar.open { transform: translateX(0); }
      #dashboard,
      #income,
      #budget,
      #expense {
        scroll-margin-top: 88px;
      }
      @media (max-width: 768px) {
        .svy-nav { padding: 0 20px; }
        .svy-nav-links { display: none !important; }
        .svy-menu-button { display: inline-flex; }
        .svy-nav-date { display: none; }
        .landing-desktop-links,
        .landing-desktop-auth {
          display: none !important;
        }
        .landing-menu-button {
          display: inline-flex !important;
        }
        .landing-mobile-sidebar .svy-menu-button {
          display: inline-flex;
        }
        .svy-main {
          padding: 36px 18px 64px;
        }
        .svy-dashboard-header {
          align-items: flex-start;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 28px;
        }
        .svy-dashboard-title {
          font-size: 28px;
          line-height: 1;
        }
        .svy-date-chip {
          width: fit-content;
          max-width: 100%;
          justify-content: flex-start;
          padding: 10px 14px;
        }
      }
      @media (max-width: 480px) {
        .svy-card {
          padding: 22px;
        }
        .svy-filter-bar {
          display: grid;
          grid-template-columns: 1fr;
          align-items: stretch;
          padding: 14px;
        }
        .svy-filter-bar .svy-input {
          width: 100% !important;
          max-width: none !important;
        }
        .svy-filter-bar button {
          width: fit-content;
        }
      }
      @media (max-width: 360px) {
        .svy-main {
          padding-left: 14px;
          padding-right: 14px;
        }
        .svy-card {
          padding: 18px;
        }
      }

      /* ── history row ── */
      .svy-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        padding: 18px 0;
        border-bottom: 1px solid ${PALETTE.border};
      }
      .svy-row:last-child { border-bottom: none; }

      /* ── pill badge ── */
      .svy-pill {
        display: inline-block;
        font-size: 11px;
        font-weight: 700;
        padding: 3px 10px;
        border-radius: 20px;
        background: ${PALETTE.hero};
        color: ${PALETTE.primary};
        white-space: nowrap;
      }

      /* ── progress bar ── */
      .svy-track {
        height: 8px;
        border-radius: 99px;
        background: ${PALETTE.hero};
        overflow: hidden;
      }
      .svy-track-fill {
        height: 100%;
        border-radius: 99px;
        transition: width .5s ease;
      }

      /* ── metric card gradients ── */
      .metric-balance { background: linear-gradient(135deg,#4361EE 0%,#7B94FF 100%); color:#fff; }
      .metric-income  { background: linear-gradient(135deg,#06C886 0%,#34D39A 100%); color:#fff; }
      .metric-expense { background: linear-gradient(135deg,#EF4444 0%,#F87171 100%); color:#fff; }

      /* ── hero ── */
      .svy-hero {
        min-height: 100vh;
        background: ${PALETTE.hero};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 40px 24px;
        position: relative;
        overflow: hidden;
      }
      .svy-hero::before {
        content: '';
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse 60% 50% at 20% 30%, rgba(67,97,238,.12) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 80% 70%, rgba(6,200,134,.10) 0%, transparent 70%);
        pointer-events: none;
      }
      .svy-hero-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(67,97,238,.1);
        color: ${PALETTE.primary};
        border-radius: 99px;
        padding: 6px 16px;
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 24px;
      }

      /* ── buttons ── */
      .svy-btn-primary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: ${PALETTE.primary};
        color: #fff;
        border: none;
        border-radius: 12px;
        padding: 14px 24px;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        transition: background .15s, box-shadow .15s, transform .1s;
      }
      .svy-btn-primary:hover { background: ${PALETTE.primaryDark}; box-shadow: 0 6px 20px rgba(67,97,238,.3); }
      .svy-btn-primary:active { transform: scale(.98); }

      .svy-btn-secondary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: transparent;
        color: ${PALETTE.primary};
        border: 1.5px solid ${PALETTE.primary};
        border-radius: 12px;
        padding: 12px 22px;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        transition: background .15s;
      }
      .svy-btn-secondary:hover { background: ${PALETTE.hero}; }

      .svy-btn-green {
        background: ${PALETTE.secondary};
        color: #fff;
        border: none;
        border-radius: 12px;
        padding: 14px 24px;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        width: 100%;
        transition: box-shadow .15s;
      }
      .svy-btn-green:hover { box-shadow: 0 6px 20px rgba(6,200,134,.3); }

      .svy-btn-danger {
        background: ${PALETTE.error};
        color: #fff;
        border: none;
        border-radius: 12px;
        padding: 14px 24px;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        width: 100%;
        transition: box-shadow .15s;
      }
      .svy-btn-danger:hover { box-shadow: 0 6px 20px rgba(239,68,68,.3); }

      /* ── filter bar ── */
      .svy-filter-bar {
        background: ${PALETTE.surface};
        border: 1px solid ${PALETTE.border};
        border-radius: 16px;
        padding: 16px 20px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 12px;
        min-width: 0;
        max-width: 100%;
        overflow: hidden;
      }
      .svy-filter-bar .svy-input {
        min-width: 0 !important;
      }

      img,
      svg,
      canvas,
      video {
        max-width: 100%;
      }

      .svy-main > *,
      .svy-card,
      .svy-budget-card,
      .svy-filter-bar {
        min-width: 0;
        max-width: 100%;
      }

      /* ── charts ── */
      .svy-bar {
        border-radius: 10px 10px 0 0;
        transition: height .5s ease, opacity .2s;
      }
      .svy-bar:hover { opacity: .8; }

      /* ── budget mini-card ── */
      .svy-budget-card {
        background: ${PALETTE.surface};
        border: 1px solid ${PALETTE.border};
        border-radius: 16px;
        padding: 20px;
      }
      .svy-icon-chip {
        width: 40px; height: 40px;
        border-radius: 12px;
        display: flex; align-items: center; justify-content: center;
        font-size: 18px;
        flex-shrink: 0;
      }

      /* ── footer ── */
      .svy-wordmark {
        font-family: 'DM Serif Display', serif;
        font-size: clamp(72px, 18vw, 200px);
        color: ${PALETTE.textPrimary};
        opacity: .04;
        line-height: 1;
        user-select: none;
      }
      a.svy-footer-link {
        font-size: 14px;
        color: ${PALETTE.textMuted};
        text-decoration: none;
        transition: color .15s;
      }
      a.svy-footer-link:hover { color: ${PALETTE.primary}; }
    `}</style>
  );
}
