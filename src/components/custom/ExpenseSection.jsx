import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
import { PALETTE, DONUT_STROKES, fmtINR } from "../../../utility/tokens";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

function ExpensePieChart({ expenseList, totalExpense }) {
  const byCategory = expenseList.reduce((acc, item) => {
    const cat = item.source || "Other";
    acc[cat] = (acc[cat] || 0) + Number(item.amount);
    return acc;
  }, {});

  const rows = Object.keys(byCategory)
    .map((label, index) => ({
      label,
      amount: byCategory[label],
      color: DONUT_STROKES[index % DONUT_STROKES.length],
    }))
    .sort((a, b) => b.amount - a.amount);

  if (rows.length === 0) {
    return (
      <div style={{ minHeight: 240, display: "flex", alignItems: "center", justifyContent: "center", color: PALETTE.textMuted, fontWeight: 600 }}>
        Add expenses to view spending mix.
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 18 }}>
        <p className="svy-tag" style={{ marginBottom: 0 }}>Spending Mix</p>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: PALETTE.textLight, textTransform: "uppercase", letterSpacing: ".08em" }}>
            Total Spend
          </div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: PALETTE.textPrimary }}>
            Rs {fmtINR(totalExpense)}
          </div>
        </div>
      </div>

      <div style={{ height: 260, width: "100%" }}>
        <Bar
          data={{
            labels: rows.map((row) => row.label),
            datasets: [{
              label: "Expense",
              data: rows.map((row) => row.amount),
              backgroundColor: rows.map((row) => row.color),
              borderRadius: 10,
              borderSkipped: false,
              barPercentage: 0.58,
              categoryPercentage: 0.7,
            }],
          }}
          options={{
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                beginAtZero: true,
                border: { display: false },
                grid: { color: PALETTE.border },
                ticks: {
                  color: PALETTE.textLight,
                  maxTicksLimit: 4,
                  callback: (value) => `Rs ${fmtINR(value)}`,
                },
              },
              y: {
                border: { display: false },
                grid: { display: false },
                ticks: {
                  color: PALETTE.textMuted,
                  font: { weight: 700 },
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
                  label: (context) => {
                    const pct = totalExpense ? ((context.parsed.x / totalExpense) * 100).toFixed(0) : 0;
                    return `Rs ${fmtINR(context.parsed.x)} (${pct}%)`;
                  },
                },
              },
            },
          }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginTop: 18 }}>
        {rows.map((row) => {
          const pct = totalExpense ? Math.round((row.amount / totalExpense) * 100) : 0;
          return (
            <div key={row.label} style={{ border: `1px solid ${PALETTE.border}`, borderRadius: 12, padding: "10px 12px", background: PALETTE.bg }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ width: 9, height: 9, borderRadius: 999, background: row.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 800, color: PALETTE.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {row.label}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12, color: PALETTE.textMuted, fontWeight: 700 }}>
                <span>Rs {fmtINR(row.amount)}</span>
                <span>{pct}%</span>
              </div>
              <div style={{ height: 5, background: PALETTE.border, borderRadius: 99, overflow: "hidden", marginTop: 8 }}>
                <div style={{ width: `${pct}%`, height: "100%", background: row.color, borderRadius: 99 }} />
                </div>
              </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ExpenseSection({
  expenseList,
  expenseOptions,
  selectedCategory, setSelectedCategory,
  selectedDate, setSelectedDate,
  expenseAmountInput, setExpenseAmountInput,
  expenseDateInput, setExpenseDateInput,
  expenseRemarksInput, setExpenseRemarksInput,
  expenseSourceInput, setExpenseSourceInput,
  handleAddExpense,
  totalExpense,
}) {
  const filteredLive = [...expenseList]
    .filter((item) => {
      const catMatch = selectedCategory === "all" || item.source === selectedCategory;
      const dateMatch = !selectedDate || item.date === selectedDate;
      return catMatch && dateMatch;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section id="expense" style={{ marginTop: 64 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <h3 className="svy-section-title">Expense Tracking</h3>
      </div>

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
          Clear
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        <div className="svy-card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <p className="svy-tag">Log New Expense</p>

          <div>
            <label className="svy-label">Amount (Rs)</label>
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

        <div className="svy-card">
          <p className="svy-tag">Expense Stream</p>
          <div className="svy-scroll" style={{ overflowY: "auto", maxHeight: 360 }}>
            {filteredLive.length === 0 ? (
              <p style={{ color: PALETTE.textMuted, fontWeight: 600 }}>No expenses match your filters.</p>
            ) : filteredLive.map((item, idx) => (
              <div key={item.id} className="svy-row">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: DONUT_STROKES[idx % DONUT_STROKES.length],
                    flexShrink: 0,
                  }} />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14, color: PALETTE.textPrimary }}>{item.remarks}</p>
                    <span style={{ fontSize: 12, color: PALETTE.textLight }}>
                      {item.date} - {item.source}
                    </span>
                  </div>
                </div>
                <span style={{ fontWeight: 700, fontSize: 15, color: PALETTE.textPrimary }}>
                  Rs {fmtINR(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="svy-card">
          <ExpensePieChart expenseList={expenseList} totalExpense={totalExpense} />
        </div>
      </div>
    </section>
  );
}
