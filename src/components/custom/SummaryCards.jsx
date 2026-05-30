import { fmtINR } from "../../../utility/tokens";

export default function SummaryCards({ metrics, incomeList, expenseList }) {
  const hasIncome = incomeList.length > 0;
  const hasExpense = expenseList.length > 0;

  const cards = [
    {
      label: "Total Balance",
      value: metrics.balance,
      variant: "metric-balance",
      icon: "Balance",
      badge: hasIncome || hasExpense ? "Live from database" : "No entries yet",
    },
    {
      label: "Total Income",
      value: metrics.income,
      variant: "metric-income",
      icon: "Income",
      badge: hasIncome ? `${incomeList.length} income entries` : "0 income entries",
    },
    {
      label: "Total Expense",
      value: metrics.expense,
      variant: "metric-expense",
      icon: "Expense",
      badge: hasExpense ? `${expenseList.length} expense entries` : "0 expense entries",
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
      {cards.map(({ label, value, variant, icon, badge }) => (
        <div
          key={label}
          className={`svy-card ${variant}`}
          style={{ border: "none", display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 8px 32px rgba(0,0,0,.10)" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600, opacity: .85 }}>{label}</span>
            <span style={{
              minWidth: 58,
              height: 28,
              borderRadius: 10,
              background: "rgba(255,255,255,.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 800,
              padding: "0 8px",
            }}>
              {icon}
            </span>
          </div>

          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 34 }}>
            Rs {fmtINR(value)}
          </div>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            background: "rgba(255,255,255,.2)", borderRadius: 99,
            padding: "4px 12px", fontSize: 12, fontWeight: 700, width: "fit-content",
          }}>
            {badge}
          </div>
        </div>
      ))}
    </div>
  );
}
