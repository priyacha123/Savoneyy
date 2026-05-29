import { PALETTE, DONUT_STROKES, fmtINR } from "../../../utility/tokens";


/* ── Income bar chart (internal) ── */
function IncomeBarChart({ incomeList }) {
  const mockSources = [
    { source: "Salary",    amount: 75000, color: "#4361EE" },
    { source: "Freelance", amount: 8500,  color: "#06C886" },
    { source: "Invest",    amount: 1500,  color: "#F97316" },
    { source: "Gift",      amount: 500,   color: "#A855F7" },
  ];

  const bySource = {};
  incomeList.forEach((item) => {
    const src = item.source || "Other";
    bySource[src] = (bySource[src] || 0) + Number(item.amount);
  });
  const live = Object.keys(bySource)
    .map((src, i) => ({ source: src, amount: bySource[src], color: DONUT_STROKES[i % DONUT_STROKES.length] }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 4);

  const data   = incomeList.length === 0 ? mockSources : live;
  const maxAmt = data[0]?.amount || 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <p className="svy-tag">Distribution</p>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 12, padding: "0 8px", minHeight: 200 }}>
        {data.map((item) => {
          const h = Math.max((item.amount / maxAmt) * 85, 8);
          return (
            <div key={item.source} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: PALETTE.textMuted }}>₹{fmtINR(item.amount)}</span>
              <div
                className="svy-bar"
                style={{ width: "100%", height: `${h}%`, minHeight: 12, background: item.color, opacity: .85 }}
                title={item.source}
              />
              <span style={{ fontSize: 11, fontWeight: 600, color: PALETTE.textLight }}>
                {item.source.slice(0, 7)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main export ── */
export default function IncomeSection({
  incomeList,
  incomeAmount, setIncomeAmount,
  incomeDate,   setIncomeDate,
  incomeRemarks,setIncomeRemarks,
  incomeSource, setIncomeSource,
  handleAddIncome,
}) {
  const mockHistory = [
    { remarks: "TCS Monthly Salary", source: "Salary",     amount: 75000, date: "May 01" },
    { remarks: "Upwork Web Project",  source: "Freelance",  amount: 8500,  date: "May 12" },
    { remarks: "Dividend Payout",     source: "Investment", amount: 1500,  date: "May 18" },
  ];
  const displayList = incomeList.length === 0 ? mockHistory : [...incomeList].reverse();

  return (
    <section id="income" style={{ marginTop: 64 }}>
      {/* Section heading */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <span style={{ fontSize: 22 }}>📈</span>
        <h3 className="svy-section-title">Income Insights</h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>

        {/* ── Form ── */}
        <div className="svy-card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <p className="svy-tag">Add New Income</p>

          <div>
            <label className="svy-label">Amount (₹)</label>
            <input className="svy-input" type="number" value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)} placeholder="0.00" />
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
            <input className="svy-input" type="text" value={incomeRemarks}
              onChange={(e) => setIncomeRemarks(e.target.value)} placeholder="Enter description" />
          </div>

          <div>
            <label className="svy-label">Date</label>
            <input className="svy-input" type="date" value={incomeDate}
              onChange={(e) => setIncomeDate(e.target.value)} />
          </div>

          <button className="svy-btn-green" style={{ marginTop: "auto" }} onClick={handleAddIncome}>
            + Add Income
          </button>
        </div>

        {/* ── History ── */}
        <div className="svy-card">
          <p className="svy-tag">Recent History</p>
          <div className="svy-scroll" style={{ overflowY: "auto", maxHeight: 360 }}>
            {displayList.map((item, idx) => (
              <div key={idx} className="svy-row">
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: PALETTE.textPrimary }}>{item.remarks}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                    <span className="svy-pill">{item.source}</span>
                    <span style={{ fontSize: 12, color: PALETTE.textLight }}>{item.date}</span>
                  </div>
                </div>
                <span style={{ fontWeight: 700, fontSize: 15, color: PALETTE.secondary }}>
                  ₹{fmtINR(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Chart ── */}
        <div className="svy-card" style={{ minHeight: 320 }}>
          <IncomeBarChart incomeList={incomeList} />
        </div>
      </div>
    </section>
  );
}