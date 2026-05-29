import { PALETTE, CATEGORY_COLORS, getCategoryIcon, fmtINR } from "../../../utility/tokens";

const MOCK_PROGRESS = [
  { cat: "Food & Groceries", spent: 12000, limit: 15000 },
  { cat: "Entertainment",    spent: 9200,  limit: 10000 },
  { cat: "Transport",        spent: 3500,  limit: 6000  },
];

const MOCK_CARDS = [
  { cat: "Groceries",     spent: 12000, limit: 15000, icon: "🛒" },
  { cat: "Transport",     spent: 4200,  limit: 6000,  icon: "🚗" },
  { cat: "Entertainment", spent: 9200,  limit: 10000, icon: "🎬" },
  { cat: "Utilities",     spent: 3500,  limit: 8000,  icon: "⚡" },
];

export default function BudgetSection({
  budgets,
  budgetList,
  expenseList,
  budgetAmountInput,   setBudgetAmountInput,
  budgetCategoryInput, setBudgetCategoryInput,
  handleCategoryBudget,
}) {
  const hasData = Object.keys(budgets).length > 0;

  return (
    <section id="budget" style={{ marginTop: 64 }}>
      {/* Section heading */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <span style={{ fontSize: 22 }}>🎯</span>
        <h3 className="svy-section-title">Budgeting Control</h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>

        {/* ── Form + Progress ── */}
        <div className="svy-card">
          <p className="svy-tag">Set Category Limits</p>

          {/* Inline add form */}
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            <input
              className="svy-input"
              type="text"
              value={budgetCategoryInput}
              onChange={(e) => setBudgetCategoryInput(e.target.value)}
              placeholder="Category name"
              style={{ flex: 1 }}
            />
            <input
              className="svy-input"
              type="number"
              value={budgetAmountInput}
              onChange={(e) => setBudgetAmountInput(e.target.value)}
              placeholder="₹ Limit"
              style={{ width: 110 }}
            />
            <button
              className="svy-btn-primary"
              style={{ width: 44, padding: 0, borderRadius: 12, fontSize: 20, flexShrink: 0 }}
              onClick={handleCategoryBudget}
            >
              +
            </button>
          </div>

          {/* Progress bars */}
          <div className="svy-scroll" style={{ overflowY: "auto", maxHeight: 300 }}>
            {!hasData
              ? MOCK_PROGRESS.map(({ cat, spent, limit }) => {
                  const pct    = (spent / limit) * 100;
                  const isOver = pct > 90;
                  return (
                    <div key={cat} style={{ marginBottom: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: PALETTE.textPrimary }}>{cat}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: isOver ? PALETTE.error : PALETTE.textMuted }}>
                          ₹{fmtINR(spent)} / ₹{fmtINR(limit)} ({pct.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="svy-track">
                        <div className="svy-track-fill"
                          style={{ width: `${Math.min(pct, 100)}%`, background: isOver ? PALETTE.error : PALETTE.primary }} />
                      </div>
                    </div>
                  );
                })
              : Object.keys(budgets).map((category) => {
                  const expAmt = expenseList.reduce(
                    (acc, obj) => (obj.source === category ? acc + Number(obj.amount) : acc), 0
                  ) || budgets[category].expenses || 0;
                  const budAmt = budgetList.find((b) => b.type === category)?.amount || budgets[category].budget || 1;
                  const pct    = (expAmt / budAmt) * 100;
                  const isOver = pct > 100;
                  return (
                    <div key={category} style={{ marginBottom: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: PALETTE.textPrimary }}>{category}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: isOver ? PALETTE.error : PALETTE.textMuted }}>
                          ₹{fmtINR(expAmt)} / ₹{fmtINR(budAmt)} ({pct.toFixed(0)}%)
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

        {/* ── Budget mini-cards grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignContent: "start" }}>
          {!hasData
            ? MOCK_CARDS.map(({ cat, spent, limit, icon }, i) => {
                const rem    = limit - spent;
                const isCrit = rem < limit * 0.15;
                const col    = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
                return (
                  <div key={cat} className="svy-budget-card">
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                      <div className="svy-icon-chip" style={{ background: col.bg, color: col.text }}>{icon}</div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: PALETTE.textPrimary }}>{cat}</span>
                    </div>
                    <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: PALETTE.textPrimary, marginBottom: 4 }}>
                      ₹{fmtINR(limit)}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: isCrit ? PALETTE.error : PALETTE.textMuted }}>
                      {isCrit ? "⚠ Critical" : `₹${fmtINR(rem)} remaining`}
                    </div>
                  </div>
                );
              })
            : Object.keys(budgets).map((category, i) => {
                const expAmt = expenseList.reduce(
                  (acc, obj) => (obj.source === category ? acc + Number(obj.amount) : acc), 0
                ) || budgets[category].expenses || 0;
                const budAmt = budgetList.find((b) => b.type === category)?.amount || budgets[category].budget || 0;
                const rem    = budAmt - expAmt;
                const isCrit = rem < budAmt * 0.15;
                const col    = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
                return (
                  <div key={category} className="svy-budget-card">
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                      <div className="svy-icon-chip" style={{ background: col.bg, color: col.text }}>
                        {getCategoryIcon(category)}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: PALETTE.textPrimary }}>{category}</span>
                    </div>
                    <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: PALETTE.textPrimary, marginBottom: 4 }}>
                      ₹{fmtINR(budAmt)}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: isCrit ? PALETTE.error : PALETTE.textMuted }}>
                      {rem >= 0
                        ? isCrit ? "⚠ Critical" : `₹${fmtINR(rem)} remaining`
                        : `⚠ Over by ₹${fmtINR(Math.abs(rem))}`}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}