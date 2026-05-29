import { fmtINR } from "../../../utility/tokens";


export default function SummaryCards({ metrics, incomeList, expenseList }) {
  const isEmpty = incomeList.length === 0 && expenseList.length === 0;
  const bal = isEmpty ? 124500 : metrics.balance;
  const inc = isEmpty ? 85000  : metrics.income;
  const exp = isEmpty ? 32450  : metrics.expense;

  const cards = [
    { label: "Total Balance", value: bal, variant: "metric-balance", icon: "💼", badge: "+₹8,200 this month",   badgeUp: true  },
    { label: "Total Income",  value: inc, variant: "metric-income",  icon: "📈", badge: "+12% vs last month",   badgeUp: true  },
    { label: "Total Expense", value: exp, variant: "metric-expense", icon: "🛍️", badge: "-5% vs last month",    badgeUp: false },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
      {cards.map(({ label, value, variant, icon, badge, badgeUp }) => (
        <div
          key={label}
          className={`svy-card ${variant}`}
          style={{ border: "none", display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 8px 32px rgba(0,0,0,.10)" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{ fontSize: 13, fontWeight: 600, opacity: .85 }}>{label}</span>
            <span style={{
              width: 38, height: 38, borderRadius: 10,
              background: "rgba(255,255,255,.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18,
            }}>{icon}</span>
          </div>

          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 34 }}>
            ₹{fmtINR(value)}
          </div>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            background: "rgba(255,255,255,.2)", borderRadius: 99,
            padding: "4px 12px", fontSize: 12, fontWeight: 700, width: "fit-content",
          }}>
            {badgeUp ? "↑" : "↓"} {badge}
          </div>
        </div>
      ))}
    </div>
  );
}