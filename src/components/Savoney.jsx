import { useState, useEffect } from "react";
import { UserButton } from "@clerk/clerk-react";

/* ─────────────────────────────────────────────
   DESIGN TOKENS  (edit here to reskin globally)
───────────────────────────────────────────────*/
const PALETTE = {
  hero:         "#E8EDFF",   // lavender hero bg
  heroDark:     "#C7D2FF",
  primary:      "#4361EE",   // electric blue
  primaryDark:  "#2845D4",
  secondary:    "#06C886",   // mint green
  accent:       "#F97316",   // warm orange accent
  error:        "#EF4444",
  surface:      "#FFFFFF",
  bg:           "#F5F7FF",
  border:       "#E4E8FF",
  textPrimary:  "#0F172A",
  textMuted:    "#64748B",
  textLight:    "#94A3B8",
};

/* ─────────────────────────────────────────────
   GLOBAL STYLES injected once
───────────────────────────────────────────────*/
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@0;1&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: ${PALETTE.bg};
      color: ${PALETTE.textPrimary};
      -webkit-font-smoothing: antialiased;
    }

    /* scrollbar */
    .svy-scroll::-webkit-scrollbar { width: 4px; }
    .svy-scroll::-webkit-scrollbar-track { background: transparent; }
    .svy-scroll::-webkit-scrollbar-thumb { background: ${PALETTE.border}; border-radius: 9px; }

    /* card base */
    .svy-card {
      background: ${PALETTE.surface};
      border: 1px solid ${PALETTE.border};
      border-radius: 20px;
      padding: 28px;
    }

    /* input / select base */
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

    /* label */
    .svy-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: .06em;
      text-transform: uppercase;
      color: ${PALETTE.textMuted};
      margin-bottom: 8px;
    }

    /* section heading */
    .svy-section-title {
      font-family: 'DM Serif Display', serif;
      font-size: 22px;
      color: ${PALETTE.textPrimary};
    }

    /* subsection tag */
    .svy-tag {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
      color: ${PALETTE.textLight};
      margin-bottom: 20px;
    }

    /* nav link */
    .svy-nav-link {
      font-size: 14px;
      font-weight: 600;
      color: ${PALETTE.textMuted};
      text-decoration: none;
      transition: color .15s;
    }
    .svy-nav-link:hover, .svy-nav-link.active { color: ${PALETTE.primary}; }

    /* history row */
    .svy-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 0;
      border-bottom: 1px solid ${PALETTE.border};
    }
    .svy-row:last-child { border-bottom: none; }

    /* source pill */
    .svy-pill {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 20px;
      background: ${PALETTE.hero};
      color: ${PALETTE.primary};
    }

    /* progress track */
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

    /* summary metric card variants */
    .metric-balance { background: linear-gradient(135deg,#4361EE 0%,#7B94FF 100%); color:#fff; }
    .metric-income  { background: linear-gradient(135deg,#06C886 0%,#34D39A 100%); color:#fff; }
    .metric-expense { background: linear-gradient(135deg,#EF4444 0%,#F87171 100%); color:#fff; }

    /* hero section */
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

    /* big footer wordmark */
    .svy-wordmark {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(72px, 18vw, 200px);
      color: ${PALETTE.textPrimary};
      opacity: .04;
      line-height: 1;
      user-select: none;
    }

    /* btn primary */
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

    /* filter bar */
    .svy-filter-bar {
      background: ${PALETTE.surface};
      border: 1px solid ${PALETTE.border};
      border-radius: 16px;
      padding: 16px 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
    }

    /* donut svg */
    .svy-donut circle { transition: stroke-dashoffset .5s ease; }

    /* bar chart custom */
    .svy-bar {
      border-radius: 10px 10px 0 0;
      transition: height .5s ease, opacity .2s;
    }
    .svy-bar:hover { opacity: .8; }

    /* budget card */
    .svy-budget-card {
      background: ${PALETTE.surface};
      border: 1px solid ${PALETTE.border};
      border-radius: 16px;
      padding: 20px;
    }

    /* icon chip */
    .svy-icon-chip {
      width: 40px; height: 40px;
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }

    /* footer link */
    a.svy-footer-link {
      font-size: 14px;
      color: ${PALETTE.textMuted};
      text-decoration: none;
      transition: color .15s;
    }
    a.svy-footer-link:hover { color: ${PALETTE.primary}; }

    /* hero cta pill */
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

    /* stat badge */
    .svy-stat-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 99px;
    }

    /* sticky nav */
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

    @media (max-width: 768px) {
      .svy-nav { padding: 0 20px; }
      .svy-nav-links { display: none; }
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   HELPER UTILITIES
───────────────────────────────────────────────*/
const fmtINR = (n) =>
  Number(n).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const getCategoryIcon = (category) => {
  const cat = category.toLowerCase();
  if (cat.includes("grocer") || cat.includes("food") || cat.includes("shop") || cat.includes("market")) return "🛒";
  if (cat.includes("trans") || cat.includes("travel") || cat.includes("car") || cat.includes("auto") || cat.includes("cab")) return "🚗";
  if (cat.includes("enter") || cat.includes("movi") || cat.includes("play") || cat.includes("fun") || cat.includes("show")) return "🎬";
  if (cat.includes("util") || cat.includes("bill") || cat.includes("elec") || cat.includes("water") || cat.includes("power")) return "⚡";
  if (cat.includes("sal") || cat.includes("work") || cat.includes("pay")) return "💳";
  return "📋";
};

const CATEGORY_COLORS = [
  { bg: "#EEF0FF", text: PALETTE.primary },
  { bg: "#E6FFF5", text: "#059669" },
  { bg: "#FFF4E6", text: PALETTE.accent },
  { bg: "#FEE2E2", text: PALETTE.error },
  { bg: "#F0FFF4", text: "#16A34A" },
];

const DONUT_STROKES = ["#4361EE", "#06C886", "#F97316", "#EF4444", "#A855F7"];

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────*/

/** Sticky top navbar */
function Navbar({ formattedDate, resetData }) {
  return (
    <header className="svy-nav">
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <div style={{
          width:36, height:36, borderRadius:10,
          background: PALETTE.primary, display:"flex",
          alignItems:"center", justifyContent:"center", fontSize:18
        }}>💰</div>
        <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, color: PALETTE.textPrimary }}>
          Savoney
        </span>
      </div>

      <nav className="svy-nav-links" style={{ display:"flex", gap:32 }}>
        {["#dashboard","#income","#budget","#expense"].map((href) => (
          <a key={href} href={href} className="svy-nav-link">
            {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
          </a>
        ))}
      </nav>

      <div style={{ display:"flex", alignItems:"center", gap:16 }}>
        <span style={{ fontSize:13, color: PALETTE.textMuted, fontWeight:600 }}>{formattedDate}</span>
        <button
          onClick={resetData}
          style={{
            background:"transparent", border:`1.5px solid ${PALETTE.error}`,
            color: PALETTE.error, borderRadius:10, padding:"6px 14px",
            fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif"
          }}
        >
          Reset
        </button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}

/** Full-viewport hero */
function HeroSection() {
  return (
    <section className="svy-hero">
      <div className="svy-hero-pill">
        ✦ Now with AI-powered insights
      </div>
      <h1 style={{
        fontFamily:"'DM Serif Display',serif",
        fontSize:"clamp(40px,6vw,72px)",
        color: PALETTE.textPrimary,
        lineHeight:1.12,
        maxWidth:700,
        marginBottom:24
      }}>
        Master your money with{" "}
        <em style={{ color: PALETTE.primary, fontStyle:"italic" }}>absolute precision.</em>
      </h1>
      <p style={{ fontSize:18, color: PALETTE.textMuted, maxWidth:480, marginBottom:36, lineHeight:1.6 }}>
        Achieve financial clarity effortlessly. Track, budget, and grow your wealth
        with beautiful tools that make money management a joy.
      </p>
      <div style={{ display:"flex", gap:16, flexWrap:"wrap", justifyContent:"center" }}>
        <a href="#dashboard" className="svy-btn-primary" style={{ textDecoration:"none", borderRadius:12 }}>
          Go to Dashboard →
        </a>
        <a href="#income" className="svy-btn-secondary" style={{ textDecoration:"none" }}>
          See Features
        </a>
      </div>

      {/* social proof row */}
      <div style={{
        display:"flex", gap:40, marginTop:56, flexWrap:"wrap", justifyContent:"center"
      }}>
        {[
          { val:"250K+",  label:"Active users" },
          { val:"₹2.4B+", label:"Tracked monthly" },
          { val:"4.9★",   label:"App Store rating" },
          { val:"99.9%",  label:"Uptime SLA" },
        ].map(({ val, label }) => (
          <div key={label} style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:28, color: PALETTE.primary }}>{val}</div>
            <div style={{ fontSize:13, color: PALETTE.textMuted, fontWeight:500 }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** 3 summary metric cards */
function SummaryCards({ metrics, incomeList, expenseList }) {
  const isEmpty = incomeList.length === 0 && expenseList.length === 0;
  const bal = isEmpty ? 124500 : metrics.balance;
  const inc = isEmpty ? 85000  : metrics.income;
  const exp = isEmpty ? 32450  : metrics.expense;

  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:20 }}>
      {[
        { label:"Total Balance", value: bal, variant:"metric-balance", icon:"💼", badge:"+₹8,200 this month", badgeUp:true },
        { label:"Total Income",  value: inc, variant:"metric-income",  icon:"📈", badge:"+12% vs last month", badgeUp:true },
        { label:"Total Expense", value: exp, variant:"metric-expense", icon:"🛍️", badge:"-5% vs last month",  badgeUp:false },
      ].map(({ label, value, variant, icon, badge, badgeUp }) => (
        <div key={label} className={`svy-card ${variant}`} style={{
          border:"none", display:"flex", flexDirection:"column", gap:16,
          boxShadow:"0 8px 32px rgba(0,0,0,.10)"
        }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <span style={{ fontSize:13, fontWeight:600, opacity:.85 }}>{label}</span>
            <span style={{
              width:38, height:38, borderRadius:10,
              background:"rgba(255,255,255,.2)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:18
            }}>{icon}</span>
          </div>
          <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:34 }}>
            ₹{fmtINR(value)}
          </div>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:4,
            background:"rgba(255,255,255,.2)", borderRadius:99,
            padding:"4px 12px", fontSize:12, fontWeight:700, width:"fit-content"
          }}>
            {badgeUp ? "↑" : "↓"} {badge}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Income bar chart */
function IncomeBarChart({ incomeList }) {
  const mockSources = [
    { source:"Salary",    amount:75000, color:"#4361EE" },
    { source:"Freelance", amount:8500,  color:"#06C886" },
    { source:"Invest",    amount:1500,  color:"#F97316" },
    { source:"Gift",      amount:500,   color:"#A855F7" },
  ];

  const incomeBySource = {};
  incomeList.forEach((item) => {
    const src = item.source || "Other";
    incomeBySource[src] = (incomeBySource[src] || 0) + Number(item.amount);
  });
  const liveSources = Object.keys(incomeBySource)
    .map((src, i) => ({
      source: src,
      amount: incomeBySource[src],
      color: DONUT_STROKES[i % DONUT_STROKES.length],
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 4);

  const data = incomeList.length === 0 ? mockSources : liveSources;
  const maxAmt = data[0]?.amount || 1;

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <p className="svy-tag">Distribution</p>
      <div style={{
        flex:1, display:"flex", alignItems:"flex-end",
        gap:12, padding:"0 8px 0", minHeight:200
      }}>
        {data.map((item) => {
          const h = Math.max((item.amount / maxAmt) * 85, 8);
          return (
            <div key={item.source} style={{
              flex:1, display:"flex", flexDirection:"column",
              alignItems:"center", gap:8
            }}>
              <span style={{ fontSize:11, fontWeight:700, color: PALETTE.textMuted }}>
                ₹{fmtINR(item.amount)}
              </span>
              <div className="svy-bar" style={{
                width:"100%", height:`${h}%`, minHeight:12,
                background: item.color, opacity:.85
              }} title={item.source} />
              <span style={{ fontSize:11, fontWeight:600, color: PALETTE.textLight }}>
                {item.source.slice(0,7)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Expense donut chart */
function ExpenseDonutChart({ expenseList, totalExpense }) {
  const expenseByCategory = {};
  expenseList.forEach((item) => {
    const cat = item.source || "Other";
    expenseByCategory[cat] = (expenseByCategory[cat] || 0) + Number(item.amount);
  });
  const sorted = Object.keys(expenseByCategory)
    .map((cat) => ({ category: cat, amount: expenseByCategory[cat] }))
    .sort((a, b) => b.amount - a.amount);

  const total = totalExpense || 1;
  const R = 72, CX = 90, CY = 90;
  const CIRC = 2 * Math.PI * R;

  let acc = 0;
  const segments = sorted.map((item, i) => {
    const pct = item.amount / total;
    const dash = pct * CIRC;
    const offset = -(acc * CIRC);
    acc += pct;
    return { ...item, pct, dash, offset, color: DONUT_STROKES[i % DONUT_STROKES.length] };
  });

  const mockSegments = [
    { category:"Food",     pct:.45, dash: .45*CIRC, offset:0,          color:"#4361EE" },
    { category:"Auto",     pct:.30, dash: .30*CIRC, offset:-.45*CIRC,  color:"#06C886" },
    { category:"Shopping", pct:.25, dash: .25*CIRC, offset:-.75*CIRC,  color:"#F97316" },
  ];

  const display = expenseList.length === 0 ? mockSegments : segments;
  const centerAmt = expenseList.length === 0 ? "32.4k" : `${(totalExpense/1000).toFixed(1)}k`;

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
      <p className="svy-tag" style={{ alignSelf:"flex-start" }}>Spending Mix</p>
      <div style={{ position:"relative", width:180, height:180 }}>
        <svg width="180" height="180" style={{ transform:"rotate(-90deg)" }}>
          <circle cx={CX} cy={CY} r={R} fill="none" stroke={PALETTE.hero} strokeWidth={18} />
          {display.map((seg) => (
            <circle
              key={seg.category}
              cx={CX} cy={CY} r={R}
              fill="none"
              stroke={seg.color}
              strokeWidth={18}
              strokeDasharray={`${seg.dash} ${CIRC}`}
              strokeDashoffset={seg.offset}
              strokeLinecap="round"
            />
          ))}
        </svg>
        <div style={{
          position:"absolute", inset:0,
          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center"
        }}>
          <span style={{ fontSize:11, fontWeight:600, color: PALETTE.textLight, textTransform:"uppercase", letterSpacing:".06em" }}>Total</span>
          <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, color: PALETTE.textPrimary }}>₹{centerAmt}</span>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px 20px", marginTop:24, width:"100%" }}>
        {display.map((seg) => (
          <div key={seg.category} style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:10, height:10, borderRadius:"50%", background: seg.color, flexShrink:0 }} />
            <span style={{ fontSize:13, color: PALETTE.textMuted, fontWeight:600 }}>
              {seg.category} ({(seg.pct*100).toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────*/
export default function Savoney() {
  // ── ALL ORIGINAL LOGIC UNCHANGED ──
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [budgetList, setBudgetList] = useState([]);
  const [expenseOptions, setExpenseOptions] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeDate, setIncomeDate] = useState("");
  const [incomeRemarks, setIncomeRemarks] = useState("");
  const [incomeSource, setIncomeSource] = useState("select-type");

  const [budgetAmountInput, setBudgetAmountInput] = useState("");
  const [budgetCategoryInput, setBudgetCategoryInput] = useState("");

  const [expenseAmountInput, setExpenseAmountInput] = useState("");
  const [expenseDateInput, setExpenseDateInput] = useState("");
  const [expenseRemarksInput, setExpenseRemarksInput] = useState("");
  const [expenseSourceInput, setExpenseSourceInput] = useState("select-type");

  const [metrics, setMetrics] = useState({ balance:0, income:0, expense:0 });

  useEffect(() => {
    const savedIncome   = JSON.parse(localStorage.getItem("incomeList"))   || [];
    const savedExpense  = JSON.parse(localStorage.getItem("expenseList"))  || [];
    const savedBudgets  = JSON.parse(localStorage.getItem("budgets"))      || {};
    const savedOptions  = JSON.parse(localStorage.getItem("expenseOptions"))|| [];
    setIncomeList(savedIncome);
    setExpenseList(savedExpense);
    setBudgets(savedBudgets);
    setExpenseOptions(savedOptions);
    const generatedBudgetList = [];
    for (const cat in savedBudgets) {
      generatedBudgetList.push({ amount: savedBudgets[cat].budget, type: cat });
    }
    setBudgetList(generatedBudgetList);
  }, []);

  useEffect(() => {
    let totalInc = incomeList.reduce((sum, item) => sum + Number(item.amount), 0);
    let totalExp = expenseList.reduce((sum, item) => sum + Number(item.amount), 0);
    setMetrics({ income: totalInc, expense: totalExp, balance: totalInc - totalExp });
    localStorage.setItem("incomeList",  JSON.stringify(incomeList));
    localStorage.setItem("expenseList", JSON.stringify(expenseList));
    localStorage.setItem("budgets",     JSON.stringify(budgets));
  }, [incomeList, expenseList, budgets]);

  const handleAddIncome = () => {
    const amt = Number(incomeAmount);
    if (!amt || !incomeDate) { alert("Please enter a valid amount and date."); return; }
    const newIncome = { amount:amt, date:incomeDate, remarks:incomeRemarks||"N/A", source:incomeSource==="select-type"?"Other":incomeSource };
    setIncomeList(prev => [...prev, newIncome]);
    setIncomeAmount(""); setIncomeDate(""); setIncomeRemarks(""); setIncomeSource("select-type");
  };

  const handleCategoryBudget = () => {
    const category = budgetCategoryInput.trim();
    const amt = parseFloat(budgetAmountInput);
    if (amt <= 0 || isNaN(amt)) { alert("Budget amount must be a positive number."); return; }
    if (!category) { alert("Please enter a valid budget category."); return; }
    setBudgetList(prev => [...prev, { amount:amt, type:category }]);
    setBudgets(prev => {
      const updated = { ...prev };
      if (!updated[category]) updated[category] = { budget:0, expenses:0 };
      updated[category].budget = amt;
      return updated;
    });
    setExpenseOptions(prev => {
      if (!prev.includes(category)) {
        const nextOptions = [...prev, category];
        localStorage.setItem("expenseOptions", JSON.stringify(nextOptions));
        return nextOptions;
      }
      return prev;
    });
    setBudgetAmountInput(""); setBudgetCategoryInput("");
  };

  const handleAddExpense = () => {
    const amt = parseFloat(expenseAmountInput);
    const category = expenseSourceInput;
    if (amt <= 0 || isNaN(amt)) { alert("Expense amount must be a positive number."); return; }
    if (category === "select-type" || !category) { alert("Please select a valid expense category."); return; }
    if (!budgets[category]) { alert(`No budget limit exists for "${category}". Please create a budget for it first.`); return; }
    const newExpense = { amount:amt, date:expenseDateInput, remarks:expenseRemarksInput||"N/A", source:category };
    const nextExpenseList = [...expenseList, newExpense];
    setExpenseList(nextExpenseList);
    setBudgets(prev => {
      const updated = { ...prev };
      updated[category].expenses = (updated[category].expenses || 0) + amt;
      return updated;
    });
    setExpenseAmountInput(""); setExpenseDateInput(""); setExpenseRemarksInput(""); setExpenseSourceInput("select-type");
  };

  const resetData = () => {
    if (window.confirm("Are you sure you want to reset all dashboard data? This cannot be undone.")) {
      localStorage.clear(); window.location.reload();
    }
  };

  const formattedDate = new Date().toLocaleDateString("en-IN", { year:"numeric", month:"short", day:"numeric" });

  // ── RENDER ──
  return (
    <>
      <GlobalStyle />
      <div style={{ background: PALETTE.bg, minHeight:"100vh", fontFamily:"'DM Sans',sans-serif" }}>

        {/* NAV */}
        <Navbar formattedDate={formattedDate} resetData={resetData} />

        {/* HERO */}
        <HeroSection />

        {/* MAIN CONTENT */}
        <main style={{ maxWidth:1280, margin:"0 auto", padding:"60px 32px 80px" }}>

          {/* ── DASHBOARD HEADER ── */}
          <div id="dashboard" style={{
            display:"flex", alignItems:"center", justifyContent:"space-between",
            marginBottom:36
          }}>
            <div>
              <p style={{ fontSize:13, fontWeight:600, color: PALETTE.textLight, textTransform:"uppercase", letterSpacing:".08em", marginBottom:4 }}>Overview</p>
              <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:32, color: PALETTE.textPrimary }}>Dashboard</h2>
            </div>
            <div style={{
              display:"flex", alignItems:"center", gap:8,
              background: PALETTE.surface, border:`1px solid ${PALETTE.border}`,
              borderRadius:12, padding:"8px 16px"
            }}>
              <span style={{ fontSize:16 }}>📅</span>
              <span style={{ fontSize:13, fontWeight:600, color: PALETTE.textMuted }}>{formattedDate}</span>
            </div>
          </div>

          {/* ── SUMMARY CARDS ── */}
          <SummaryCards metrics={metrics} incomeList={incomeList} expenseList={expenseList} />

          {/* ────────────── INCOME SECTION ────────────── */}
          <section id="income" style={{ marginTop:64 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28 }}>
              <span style={{ fontSize:22 }}>📈</span>
              <h3 className="svy-section-title">Income Insights</h3>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>

              {/* Income Form */}
              <div className="svy-card" style={{ display:"flex", flexDirection:"column", gap:18 }}>
                <p className="svy-tag">Add New Income</p>
                <div>
                  <label className="svy-label">Amount (₹)</label>
                  <input className="svy-input" type="number" value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} placeholder="0.00" />
                </div>
                <div>
                  <label className="svy-label">Source Type</label>
                  <select className="svy-input" value={incomeSource} onChange={(e) => setIncomeSource(e.target.value)}>
                    <option value="select-type">Select type</option>
                    <option value="Salary">Salary</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Investment">Investment</option>
                    <option value="Gift">Gift</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="svy-label">Remarks</label>
                  <input className="svy-input" type="text" value={incomeRemarks} onChange={(e) => setIncomeRemarks(e.target.value)} placeholder="Enter description" />
                </div>
                <div>
                  <label className="svy-label">Date</label>
                  <input className="svy-input" type="date" value={incomeDate} onChange={(e) => setIncomeDate(e.target.value)} />
                </div>
                <button className="svy-btn-green" style={{ marginTop:"auto" }} onClick={handleAddIncome}>
                  + Add Income
                </button>
              </div>

              {/* Income History */}
              <div className="svy-card">
                <p className="svy-tag">Recent History</p>
                <div className="svy-scroll" style={{ overflowY:"auto", maxHeight:360 }}>
                  {incomeList.length === 0 ? (
                    [
                      { remarks:"TCS Monthly Salary", source:"Salary",     amount:75000, date:"May 01" },
                      { remarks:"Upwork Web Project",  source:"Freelance",  amount:8500,  date:"May 12" },
                      { remarks:"Dividend Payout",     source:"Investment", amount:1500,  date:"May 18" },
                    ].map((item, i) => (
                      <div key={i} className="svy-row">
                        <div>
                          <p style={{ fontWeight:600, fontSize:14, color: PALETTE.textPrimary }}>{item.remarks}</p>
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:4 }}>
                            <span className="svy-pill">{item.source}</span>
                            <span style={{ fontSize:12, color: PALETTE.textLight }}>{item.date}</span>
                          </div>
                        </div>
                        <span style={{ fontWeight:700, fontSize:15, color: PALETTE.secondary }}>₹{fmtINR(item.amount)}</span>
                      </div>
                    ))
                  ) : (
                    [...incomeList].reverse().map((item, idx) => (
                      <div key={idx} className="svy-row">
                        <div>
                          <p style={{ fontWeight:600, fontSize:14, color: PALETTE.textPrimary }}>{item.remarks}</p>
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:4 }}>
                            <span className="svy-pill">{item.source}</span>
                            <span style={{ fontSize:12, color: PALETTE.textLight }}>{item.date}</span>
                          </div>
                        </div>
                        <span style={{ fontWeight:700, fontSize:15, color: PALETTE.secondary }}>₹{fmtINR(item.amount)}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Income Chart */}
              <div className="svy-card" style={{ minHeight:320 }}>
                <IncomeBarChart incomeList={incomeList} />
              </div>
            </div>
          </section>

          {/* ────────────── BUDGET SECTION ────────────── */}
          <section id="budget" style={{ marginTop:64 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28 }}>
              <span style={{ fontSize:22 }}>🎯</span>
              <h3 className="svy-section-title">Budgeting Control</h3>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>

              {/* Budget Form + Progress */}
              <div className="svy-card" style={{ gridColumn:"span 1" }}>
                <p className="svy-tag">Set Category Limits</p>
                <div style={{ display:"flex", gap:10, marginBottom:24 }}>
                  <input
                    className="svy-input"
                    type="text"
                    value={budgetCategoryInput}
                    onChange={(e) => setBudgetCategoryInput(e.target.value)}
                    placeholder="Category name"
                    style={{ flex:1 }}
                  />
                  <input
                    className="svy-input"
                    type="number"
                    value={budgetAmountInput}
                    onChange={(e) => setBudgetAmountInput(e.target.value)}
                    placeholder="₹ Limit"
                    style={{ width:110 }}
                  />
                  <button className="svy-btn-primary" style={{ width:44, padding:0, borderRadius:12, fontSize:20, flexShrink:0 }} onClick={handleCategoryBudget}>+</button>
                </div>

                <div className="svy-scroll" style={{ overflowY:"auto", maxHeight:300 }}>
                  {Object.keys(budgets).length === 0 ? (
                    [
                      { cat:"Food & Groceries", spent:12000, limit:15000 },
                      { cat:"Entertainment",    spent:9200,  limit:10000 },
                      { cat:"Transport",        spent:3500,  limit:6000 },
                    ].map(({ cat, spent, limit }) => {
                      const pct = (spent/limit)*100;
                      const isOver = pct > 90;
                      return (
                        <div key={cat} style={{ marginBottom:20 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                            <span style={{ fontSize:13, fontWeight:600, color: PALETTE.textPrimary }}>{cat}</span>
                            <span style={{ fontSize:12, fontWeight:700, color: isOver ? PALETTE.error : PALETTE.textMuted }}>
                              ₹{fmtINR(spent)} / ₹{fmtINR(limit)} ({pct.toFixed(0)}%)
                            </span>
                          </div>
                          <div className="svy-track">
                            <div className="svy-track-fill" style={{ width:`${Math.min(pct,100)}%`, background: isOver ? PALETTE.error : PALETTE.primary }} />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    Object.keys(budgets).map((category) => {
                      const expAmt = expenseList.reduce((acc, obj) => obj.source===category ? acc+Number(obj.amount):acc, 0) || budgets[category].expenses || 0;
                      const budAmt = budgetList.find(b=>b.type===category)?.amount || budgets[category].budget || 1;
                      const pct = (expAmt/budAmt)*100;
                      const isOver = pct > 100;
                      return (
                        <div key={category} style={{ marginBottom:20 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                            <span style={{ fontSize:13, fontWeight:600, color: PALETTE.textPrimary }}>{category}</span>
                            <span style={{ fontSize:12, fontWeight:700, color: isOver ? PALETTE.error : PALETTE.textMuted }}>
                              ₹{fmtINR(expAmt)} / ₹{fmtINR(budAmt)} ({pct.toFixed(0)}%)
                            </span>
                          </div>
                          <div className="svy-track">
                            <div className="svy-track-fill" style={{ width:`${Math.min(pct,100)}%`, background: isOver ? PALETTE.error : PALETTE.primary }} />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Budget Cards grid */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, alignContent:"start" }}>
                {Object.keys(budgets).length === 0 ? (
                  [
                    { cat:"Groceries",     spent:12000, limit:15000, icon:"🛒" },
                    { cat:"Transport",     spent:4200,  limit:6000,  icon:"🚗" },
                    { cat:"Entertainment", spent:9200,  limit:10000, icon:"🎬" },
                    { cat:"Utilities",     spent:3500,  limit:8000,  icon:"⚡" },
                  ].map(({ cat, spent, limit, icon }, i) => {
                    const rem = limit - spent;
                    const isCrit = rem < limit * 0.15;
                    const col = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
                    return (
                      <div key={cat} className="svy-budget-card">
                        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                          <div className="svy-icon-chip" style={{ background: col.bg, color: col.text }}>{icon}</div>
                          <span style={{ fontSize:13, fontWeight:700, color: PALETTE.textPrimary }}>{cat}</span>
                        </div>
                        <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, color: PALETTE.textPrimary, marginBottom:4 }}>
                          ₹{fmtINR(limit)}
                        </div>
                        <div style={{ fontSize:12, fontWeight:600, color: isCrit ? PALETTE.error : PALETTE.textMuted }}>
                          {isCrit ? "⚠ Critical" : `₹${fmtINR(rem)} remaining`}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  Object.keys(budgets).map((category, i) => {
                    const expAmt = expenseList.reduce((acc, obj) => obj.source===category ? acc+Number(obj.amount):acc, 0) || budgets[category].expenses || 0;
                    const budAmt = budgetList.find(b=>b.type===category)?.amount || budgets[category].budget || 0;
                    const rem = budAmt - expAmt;
                    const isCrit = rem < budAmt * 0.15;
                    const col = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
                    return (
                      <div key={category} className="svy-budget-card">
                        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                          <div className="svy-icon-chip" style={{ background: col.bg, color: col.text }}>
                            {getCategoryIcon(category)}
                          </div>
                          <span style={{ fontSize:13, fontWeight:700, color: PALETTE.textPrimary }}>{category}</span>
                        </div>
                        <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, color: PALETTE.textPrimary, marginBottom:4 }}>
                          ₹{fmtINR(budAmt)}
                        </div>
                        <div style={{ fontSize:12, fontWeight:600, color: isCrit ? PALETTE.error : PALETTE.textMuted }}>
                          {rem >= 0
                            ? (isCrit ? "⚠ Critical" : `₹${fmtINR(rem)} remaining`)
                            : `⚠ Over by ₹${fmtINR(Math.abs(rem))}`}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>

          {/* ────────────── EXPENSE SECTION ────────────── */}
          <section id="expense" style={{ marginTop:64 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28 }}>
              <span style={{ fontSize:22 }}>🧾</span>
              <h3 className="svy-section-title">Expense Tracking</h3>
            </div>

            {/* Filter Bar — visually separate */}
            <div className="svy-filter-bar" style={{ marginBottom:24 }}>
              <span style={{ fontSize:13, fontWeight:700, color: PALETTE.textMuted, whiteSpace:"nowrap" }}>Filter:</span>
              <select
                className="svy-input"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ flex:1, minWidth:140, maxWidth:220 }}
              >
                <option value="all">All Categories</option>
                {expenseOptions.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <input
                className="svy-input"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ flex:1, minWidth:150, maxWidth:200 }}
              />
              <button
                onClick={() => { setSelectedCategory("all"); setSelectedDate(""); }}
                style={{
                  background:"transparent", border:"none",
                  color: PALETTE.primary, fontSize:13, fontWeight:700,
                  cursor:"pointer", fontFamily:"'DM Sans',sans-serif", whiteSpace:"nowrap"
                }}
              >
                ✕ Clear
              </button>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>

              {/* Expense Form */}
              <div className="svy-card" style={{ display:"flex", flexDirection:"column", gap:18 }}>
                <p className="svy-tag">Log New Expense</p>
                <div>
                  <label className="svy-label">Amount (₹)</label>
                  <input className="svy-input" type="number" value={expenseAmountInput} onChange={(e) => setExpenseAmountInput(e.target.value)} placeholder="0.00" />
                </div>
                <div>
                  <label className="svy-label">Category</label>
                  <select className="svy-input" value={expenseSourceInput} onChange={(e) => setExpenseSourceInput(e.target.value)}>
                    <option value="select-type">Select category</option>
                    {expenseOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="svy-label">Remarks</label>
                  <input className="svy-input" type="text" value={expenseRemarksInput} onChange={(e) => setExpenseRemarksInput(e.target.value)} placeholder="Note..." />
                </div>
                <div>
                  <label className="svy-label">Date</label>
                  <input className="svy-input" type="date" value={expenseDateInput} onChange={(e) => setExpenseDateInput(e.target.value)} />
                </div>
                <button className="svy-btn-danger" style={{ marginTop:"auto" }} onClick={handleAddExpense}>
                  Record Expense
                </button>
              </div>

              {/* Expense History */}
              <div className="svy-card">
                <p className="svy-tag">Expense Stream</p>
                <div className="svy-scroll" style={{ overflowY:"auto", maxHeight:360 }}>
                  {expenseList.length === 0 ? (
                    [
                      { remarks:"Starbucks Coffee", source:"Food",      amount:450,  date:"Oct 24" },
                      { remarks:"Petrol Refill",     source:"Transport", amount:2000, date:"Oct 23" },
                      { remarks:"Weekly Groceries",  source:"Shopping",  amount:5600, date:"Oct 22" },
                    ].map((item, i) => (
                      <div key={i} className="svy-row">
                        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                          <div style={{ width:10, height:10, borderRadius:"50%", background: DONUT_STROKES[i], flexShrink:0 }} />
                          <div>
                            <p style={{ fontWeight:600, fontSize:14, color: PALETTE.textPrimary }}>{item.remarks}</p>
                            <span style={{ fontSize:12, color: PALETTE.textLight }}>
                              {item.date} · {item.source}
                            </span>
                          </div>
                        </div>
                        <span style={{ fontWeight:700, fontSize:15, color: PALETTE.textPrimary }}>₹{fmtINR(item.amount)}</span>
                      </div>
                    ))
                  ) : (
                    [...expenseList]
                      .filter((item) => {
                        const catMatch  = selectedCategory === "all" || item.source === selectedCategory;
                        const dateMatch = !selectedDate || item.date === selectedDate;
                        return catMatch && dateMatch;
                      })
                      .reverse()
                      .map((item, idx) => (
                        <div key={idx} className="svy-row">
                          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                            <div style={{ width:10, height:10, borderRadius:"50%", background: PALETTE.error, flexShrink:0 }} />
                            <div>
                              <p style={{ fontWeight:600, fontSize:14, color: PALETTE.textPrimary }}>{item.remarks}</p>
                              <span style={{ fontSize:12, color: PALETTE.textLight }}>
                                {item.date} · {item.source}
                              </span>
                            </div>
                          </div>
                          <span style={{ fontWeight:700, fontSize:15, color: PALETTE.textPrimary }}>₹{fmtINR(item.amount)}</span>
                        </div>
                      ))
                  )}
                </div>
              </div>

              {/* Expense Donut */}
              <div className="svy-card">
                <ExpenseDonutChart expenseList={expenseList} totalExpense={metrics.expense} />
              </div>
            </div>
          </section>
        </main>

        {/* ── FOOTER ── */}
        <footer style={{
          background: PALETTE.surface,
          borderTop: `1px solid ${PALETTE.border}`,
          padding:"60px 40px 40px"
        }}>
          <div style={{ maxWidth:1280, margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:48, marginBottom:48 }}>
              <div>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:24, marginBottom:12 }}>Savoney</div>
                <p style={{ fontSize:14, color: PALETTE.textMuted, lineHeight:1.7, maxWidth:280 }}>
                  The intelligent financial platform built for modern creators and entrepreneurs.
                </p>
                <div style={{ display:"flex", gap:12, marginTop:20 }}>
                  {["share","mail","group"].map((icon) => (
                    <a key={icon} href="#" style={{
                      width:36, height:36, borderRadius:10,
                      background: PALETTE.hero, display:"flex",
                      alignItems:"center", justifyContent:"center",
                      fontSize:16, textDecoration:"none"
                    }}>
                      {icon==="share"?"🔗":icon==="mail"?"✉️":"👥"}
                    </a>
                  ))}
                </div>
              </div>

              {[
                { title:"Platform", links:["Features","Security","Mobile App","API Integration"] },
                { title:"Resources", links:["Help Center","Community","Privacy Policy","Terms of Use"] },
              ].map(({ title, links }) => (
                <div key={title}>
                  <p style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color: PALETTE.textLight, marginBottom:16 }}>{title}</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {links.map((l) => <a key={l} href="#" className="svy-footer-link">{l}</a>)}
                  </div>
                </div>
              ))}

              <div>
                <p style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color: PALETTE.textLight, marginBottom:16 }}>Feedback</p>
                <div style={{
                  background: PALETTE.hero, borderRadius:16, padding:20,
                  border:`1px solid ${PALETTE.border}`
                }}>
                  <p style={{ fontSize:13, color: PALETTE.textMuted, marginBottom:12 }}>
                    We'd love to hear your thoughts on this new redesign!
                  </p>
                  <a href="mailto:support@savoney.com" className="svy-btn-primary" style={{
                    textDecoration:"none", borderRadius:10, padding:"10px 16px", fontSize:13, display:"flex"
                  }}>
                    Send Feedback →
                  </a>
                </div>
              </div>
            </div>

            {/* Wordmark */}
            <div style={{ position:"relative", paddingTop:24, borderTop:`1px solid ${PALETTE.border}` }}>
              <div className="svy-wordmark">Savoney.</div>
              <div style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",
                flexWrap:"wrap", gap:12, marginTop:16,
                fontSize:13, color: PALETTE.textLight
              }}>
                <span>Made with ❤️ by Priya</span>
                <span>© 2026 Savoney Financial Services. All rights reserved.</span>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}