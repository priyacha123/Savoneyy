import { useState } from "react";

export function BudgetTracker() {
  const [budgets, setBudgets] = useState({});
  const [category, setCategory] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  function addBudget() {
    if (!category || !budgetAmount) return;

    setBudgets((prev) => ({
      ...prev,
      [category]: {
        budget: Number(budgetAmount),
        expenses: prev[category]?.expenses || 0,
      },
    }));

    setExpenseCategory(category);
    setCategory("");
    setBudgetAmount("");
  }

  function addExpense() {
    if (!expenseCategory || !expenseAmount) return;

    setBudgets((prev) => ({
      ...prev,
      [expenseCategory]: {
        ...prev[expenseCategory],
        expenses:
          prev[expenseCategory].expenses + Number(expenseAmount),
      },
    }));

    setExpenseAmount("");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">Budget Tracker</h1>

      {/* Budget Input */}
      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <h2 className="font-semibold">Add Budget</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Amount"
          value={budgetAmount}
          onChange={(e) => setBudgetAmount(e.target.value)}
        />

        <button
          onClick={addBudget}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Add Budget
        </button>
      </div>

      {/* Expense Input */}
      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <h2 className="font-semibold">Add Expense</h2>

        <select
          className="w-full border p-2 rounded"
          value={expenseCategory}
          onChange={(e) => setExpenseCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {Object.keys(budgets).map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Expense"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />

        <button
          onClick={addExpense}
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Add Expense
        </button>
      </div>

      {/* Bars */}
      <div className="space-y-4">
        {Object.entries(budgets).map(([cat, data]) => {
          const percent = Math.min(
            (data.expenses / data.budget) * 100,
            100
          );

          return (
            <div key={cat} className="bg-white p-4 rounded-xl shadow">
              <div className="font-semibold">{cat}</div>

              <div className="w-full h-5 bg-gray-200 rounded overflow-hidden mt-2">
                <div
                  className={`h-full flex items-center justify-end px-2 text-xs text-white ${
                    data.expenses > data.budget ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{ width: `${percent}%` }}
                >
                  {percent.toFixed(0)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}