import { PALETTE, DONUT_STROKES, fmtINR } from "../../../utility/tokens";


/* ── Donut chart (internal) ── */
function ExpenseDonutChart({ expenseList, totalExpense }) {
  const byCategory = {};
  expenseList.forEach((item) => {
    const cat = item.source || "Other";
    byCategory[cat] = (byCategory[cat] || 0) + Number(item.amount);
  });
  const sorted = Object.keys(byCategory)
    .map((cat) => ({ category: cat, amount: byCategory[cat] }))
    .sort((a, b) => b.amount - a.amount);

  const total = totalExpense || 1;
  const R = 72, CX = 90, CY = 90;
  const CIRC = 2 * Math.PI * R;

  let acc = 0;
  const segments = sorted.map((item, i) => {
    const pct    = item.amount / total;
    const dash   = pct * CIRC;
    const offset = -(acc * CIRC);
    acc += pct;
    return { ...item, pct, dash, offset, color: DONUT_STROKES[i % DONUT_STROKES.length] };
  });

  const mockSegments = [
    { category: "Food",     pct: .45, dash: .45 * CIRC, offset: 0,           color: "#4361EE" },
    { category: "Auto",     pct: .30, dash: .30 * CIRC, offset: -.45 * CIRC, color: "#06C886" },
    { category: "Shopping", pct: .25, dash: .25 * CIRC, offset: -.75 * CIRC, color: "#F97316" },
  ];

  const display   = expenseList.length === 0 ? mockSegments : segments;
  const centerAmt = expenseList.length === 0 ? "32.4k" : `${(totalExpense / 1000).toFixed(1)}k`;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <p className="svy-tag" style={{ alignSelf: "flex-start" }}>Spending Mix</p>

      <div style={{ position: "relative", width: 180, height: 180 }}>
        <svg width="180" height="180" style={{ transform: "rotate(-90deg)" }}>
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
              style={{ transition: "stroke-dashoffset .5s ease" }}
            />
          ))}
        </svg>
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: PALETTE.textLight, textTransform: "uppercase", letterSpacing: ".06em" }}>Total</span>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: PALETTE.textPrimary }}>₹{centerAmt}</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px", marginTop: 24, width: "100%" }}>
        {display.map((seg) => (
          <div key={seg.category} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: seg.color, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: PALETTE.textMuted, fontWeight: 600 }}>
              {seg.category} ({(seg.pct * 100).toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main export ── */
export default function ExpenseSection({
  expenseList,
  expenseOptions,
  selectedCategory, setSelectedCategory,
  selectedDate,     setSelectedDate,
  expenseAmountInput,   setExpenseAmountInput,
  expenseDateInput,     setExpenseDateInput,
  expenseRemarksInput,  setExpenseRemarksInput,
  expenseSourceInput,   setExpenseSourceInput,
  handleAddExpense,
  totalExpense,
}) {
  const mockHistory = [
    { remarks: "Starbucks Coffee", source: "Food",      amount: 450,  date: "Oct 24" },
    { remarks: "Petrol Refill",     source: "Transport", amount: 2000, date: "Oct 23" },
    { remarks: "Weekly Groceries",  source: "Shopping",  amount: 5600, date: "Oct 22" },
  ];

  const filteredLive = [...expenseList]
    .filter((item) => {
      const catMatch  = selectedCategory === "all" || item.source === selectedCategory;
      const dateMatch = !selectedDate || item.date === selectedDate;
      return catMatch && dateMatch;
    })
    .reverse();

  const displayHistory = expenseList.length === 0 ? mockHistory : filteredLive;

  return (
    <section id="expense" style={{ marginTop: 64 }}>
      {/* Section heading */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <span style={{ fontSize: 22 }}>🧾</span>
        <h3 className="svy-section-title">Expense Tracking</h3>
      </div>

      {/* ── Filter bar ── */}
      <div className="svy-filter-bar" style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: PALETTE.textMuted, whiteSpace: "nowrap" }}>Filter:</span>
        <select
          className="svy-input"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ flex: 1, minWidth: 140, maxWidth: 220 }}
        >
          <option value="all">All Categories</option>
          {expenseOptions.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input
          className="svy-input"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ flex: 1, minWidth: 150, maxWidth: 200 }}
        />
        <button
          onClick={() => { setSelectedCategory("all"); setSelectedDate(""); }}
          style={{
            background: "transparent", border: "none",
            color: PALETTE.primary, fontSize: 13, fontWeight: 700,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
          }}
        >
          ✕ Clear
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>

        {/* ── Form ── */}
        <div className="svy-card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <p className="svy-tag">Log New Expense</p>

          <div>
            <label className="svy-label">Amount (₹)</label>
            <input className="svy-input" type="number" value={expenseAmountInput}
              onChange={(e) => setExpenseAmountInput(e.target.value)} placeholder="0.00" />
          </div>

          <div>
            <label className="svy-label">Category</label>
            <select className="svy-input" value={expenseSourceInput} onChange={(e) => setExpenseSourceInput(e.target.value)}>
              <option value="select-type">Select category</option>
              {expenseOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div>
            <label className="svy-label">Remarks</label>
            <input className="svy-input" type="text" value={expenseRemarksInput}
              onChange={(e) => setExpenseRemarksInput(e.target.value)} placeholder="Note..." />
          </div>

          <div>
            <label className="svy-label">Date</label>
            <input className="svy-input" type="date" value={expenseDateInput}
              onChange={(e) => setExpenseDateInput(e.target.value)} />
          </div>

          <button className="svy-btn-danger" style={{ marginTop: "auto" }} onClick={handleAddExpense}>
            Record Expense
          </button>
        </div>

        {/* ── History ── */}
        <div className="svy-card">
          <p className="svy-tag">Expense Stream</p>
          <div className="svy-scroll" style={{ overflowY: "auto", maxHeight: 360 }}>
            {displayHistory.map((item, idx) => (
              <div key={idx} className="svy-row">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: DONUT_STROKES[idx % DONUT_STROKES.length],
                    flexShrink: 0,
                  }} />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14, color: PALETTE.textPrimary }}>{item.remarks}</p>
                    <span style={{ fontSize: 12, color: PALETTE.textLight }}>
                      {item.date} · {item.source}
                    </span>
                  </div>
                </div>
                <span style={{ fontWeight: 700, fontSize: 15, color: PALETTE.textPrimary }}>
                  ₹{fmtINR(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Donut chart ── */}
        <div className="svy-card">
          <ExpenseDonutChart expenseList={expenseList} totalExpense={totalExpense} />
        </div>
      </div>
    </section>
  );
}