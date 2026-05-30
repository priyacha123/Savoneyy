import { PALETTE, CATEGORY_COLORS, getCategoryIcon, fmtINR } from "../../../utility/tokens";

export default function BudgetSection({
  budgets,
  budgetList,
  expenseList,
  budgetAmountInput, setBudgetAmountInput,
  budgetCategoryInput, setBudgetCategoryInput,
  handleCategoryBudget,
}) {
  const categories = Object.keys(budgets);
  const hasData = categories.length > 0;

  return (
    <section id="budget" style={{ marginTop: 64 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <h3 className="svy-section-title">Budgeting Control</h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 20, minWidth: 0 }}>
        <div className="svy-card">
          <p className="svy-tag">Set Category Limits</p>

          <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
            <input
              className="svy-input"
              type="text"
              value={budgetCategoryInput}
              onChange={(e) => setBudgetCategoryInput(e.target.value)}
              placeholder="Category name"
              style={{ flex: "1 1 180px" }}
            />
            <input
              className="svy-input"
              type="number"
              value={budgetAmountInput}
              onChange={(e) => setBudgetAmountInput(e.target.value)}
              placeholder="Rs Limit"
              style={{ width: 120 }}
            />
            <button
              className="svy-btn-primary"
              style={{ width: 44, padding: 0, borderRadius: 12, fontSize: 20, flexShrink: 0 }}
              onClick={handleCategoryBudget}
            >
              +
            </button>
          </div>

          <div className="svy-scroll" style={{ overflowY: "auto", maxHeight: 300 }}>
            {!hasData ? (
              <p style={{ color: PALETTE.textMuted, fontWeight: 600 }}>Create a budget category to track progress.</p>
            ) : categories.map((category) => {
              const expAmt = expenseList.reduce(
                (acc, obj) => (obj.source === category ? acc + Number(obj.amount) : acc), 0,
              ) || budgets[category].expenses || 0;
              const budAmt = budgetList.find((b) => b.type === category)?.amount || budgets[category].budget || 1;
              const pct = (expAmt / budAmt) * 100;
              const isOver = pct > 100;
              return (
                <div key={category} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: PALETTE.textPrimary }}>{category}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: isOver ? PALETTE.error : PALETTE.textMuted, textAlign: "right" }}>
                      Rs {fmtINR(expAmt)} / Rs {fmtINR(budAmt)} ({pct.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="svy-track">
                    <div className="svy-track-fill"
                      style={{ width: `${Math.min(pct, 100)}%`, background: isOver ? PALETTE.error : PALETTE.primary }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))", gap: 16, alignContent: "start", minWidth: 0 }}>
          {!hasData ? (
            <div className="svy-budget-card" style={{ gridColumn: "1 / -1", color: PALETTE.textMuted, fontWeight: 600 }}>
              Budget cards appear here once you add categories.
            </div>
          ) : categories.map((category, i) => {
            const expAmt = expenseList.reduce(
              (acc, obj) => (obj.source === category ? acc + Number(obj.amount) : acc), 0,
            ) || budgets[category].expenses || 0;
            const budAmt = budgetList.find((b) => b.type === category)?.amount || budgets[category].budget || 0;
            const rem = budAmt - expAmt;
            const isCrit = rem < budAmt * 0.15;
            const col = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
            return (
              <div key={category} className="svy-budget-card">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div className="svy-icon-chip" style={{ background: col.bg, color: col.text }}>
                    {getCategoryIcon(category)}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: PALETTE.textPrimary }}>{category}</span>
                </div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: PALETTE.textPrimary, marginBottom: 4 }}>
                  Rs {fmtINR(budAmt)}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: isCrit ? PALETTE.error : PALETTE.textMuted }}>
                  {rem >= 0
                    ? isCrit ? "Critical" : `Rs ${fmtINR(rem)} remaining`
                    : `Over by Rs ${fmtINR(Math.abs(rem))}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
