import { CategoryScale, Chart as ChartJS, Filler, LineElement, LinearScale, PointElement, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";
import { PALETTE, DONUT_STROKES, fmtINR } from "../../../utility/tokens";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

function IncomePieChart({ incomeList }) {
  const bySource = incomeList.reduce((acc, item) => {
    const src = item.source || "Other";
    acc[src] = (acc[src] || 0) + Number(item.amount);
    return acc;
  }, {});

  const rows = Object.keys(bySource)
    .map((label, index) => ({
      label,
      amount: bySource[label],
      color: DONUT_STROKES[index % DONUT_STROKES.length],
    }))
    .sort((a, b) => b.amount - a.amount);
  const total = rows.reduce((sum, row) => sum + row.amount, 0);
  const byDate = incomeList.reduce((acc, item) => {
    const date = item.date || "Undated";
    acc[date] = (acc[date] || 0) + Number(item.amount);
    return acc;
  }, {});
  const timeline = Object.keys(byDate)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((date) => ({ date, amount: byDate[date] }));

  if (rows.length === 0) {
    return (
      <div style={{ minHeight: 240, display: "flex", alignItems: "center", justifyContent: "center", color: PALETTE.textMuted, fontWeight: 600 }}>
        Add income to view source distribution.
      </div>
    );
  }

  return (
    <div>
      <p className="svy-tag">Distribution</p>
      <div style={{ display: "grid", gap: 18 }}>
        <div style={{ height: 240 }}>
          <Line
            data={{
              labels: timeline.map((row) => row.date),
              datasets: [{
                label: "Income",
                data: timeline.map((row) => row.amount),
                borderColor: PALETTE.secondary,
                backgroundColor: "rgba(6,200,134,.14)",
                pointBackgroundColor: PALETTE.secondary,
                pointBorderColor: PALETTE.surface,
                pointBorderWidth: 3,
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 3,
                fill: true,
                tension: 0.38,
              }],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  grid: { display: false },
                  ticks: {
                    color: PALETTE.textMuted,
                    font: { weight: 700 },
                    maxRotation: 0,
                  },
                },
                y: {
                  beginAtZero: true,
                  border: { display: false },
                  grid: { color: PALETTE.border },
                  ticks: {
                    color: PALETTE.textLight,
                    callback: (value) => `Rs ${fmtINR(value)}`,
                  },
                },
              },
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: PALETTE.textPrimary,
                  padding: 12,
                  displayColors: false,
                  callbacks: {
                    label: (context) => `${context.label}: Rs ${fmtINR(context.parsed)}`,
                  },
                },
              },
            }}
          />
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: PALETTE.textLight, textTransform: "uppercase" }}>
              Total Income
            </span>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: PALETTE.textPrimary }}>
              Rs {fmtINR(total)}
            </span>
          </div>
          {rows.map((row) => {
            const pct = total ? Math.round((row.amount / total) * 100) : 0;
            return (
              <div key={row.label}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 999, background: row.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: PALETTE.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {row.label}
                    </span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: PALETTE.textMuted, whiteSpace: "nowrap" }}>
                    {pct}%
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 12, color: PALETTE.textLight, fontWeight: 600 }}>
                  <span>Rs {fmtINR(row.amount)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function IncomeSection({
  incomeList,
  incomeAmount, setIncomeAmount,
  incomeDate, setIncomeDate,
  incomeRemarks, setIncomeRemarks,
  incomeSource, setIncomeSource,
  handleAddIncome,
}) {
  const displayList = [...incomeList].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section id="income" style={{ marginTop: 64 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <h3 className="svy-section-title">Income Insights</h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        <div className="svy-card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <p className="svy-tag">Add New Income</p>

          <div>
            <label className="svy-label">Amount (Rs)</label>
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

        <div className="svy-card">
          <p className="svy-tag">Recent History</p>
          <div className="svy-scroll" style={{ overflowY: "auto", maxHeight: 360 }}>
            {displayList.length === 0 ? (
              <p style={{ color: PALETTE.textMuted, fontWeight: 600 }}>No income entries yet.</p>
            ) : displayList.map((item) => (
              <div key={item.id} className="svy-row">
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: PALETTE.textPrimary }}>{item.remarks}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                    <span className="svy-pill">{item.source}</span>
                    <span style={{ fontSize: 12, color: PALETTE.textLight }}>{item.date}</span>
                  </div>
                </div>
                <span style={{ fontWeight: 700, fontSize: 15, color: PALETTE.secondary }}>
                  Rs {fmtINR(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="svy-card" style={{ minHeight: 320 }}>
          <IncomePieChart incomeList={incomeList} />
        </div>
      </div>
    </section>
  );
}
