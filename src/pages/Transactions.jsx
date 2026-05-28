import { useEffect, useState } from "react";
import "./../css/budgetBar.css";

const BudgetTracker = () => {
  const [budgets, setBudgets] = useState({});
  const [budgetType, setBudgetType] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [expenseSource, setExpenseSource] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  // Load budgets from localStorage
  useEffect(() => {
    const savedBudgets = localStorage.getItem("budgets");

    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets));
    }
  }, []);

  // Save budgets to localStorage
  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  // Add Budget
  const addBudget = () => {
    const amount = parseFloat(budgetAmount);

    if (!budgetType.trim() || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid category and amount.");
      return;
    }

    setBudgets((prev) => ({
      ...prev,
      [budgetType]: {
        budget: amount,
        expenses: prev[budgetType]?.expenses || 0,
      },
    }));

    setBudgetType("");
    setBudgetAmount("");
  };

  // Add Expense
  const addExpense = () => {
    const amount = parseFloat(expenseAmount);

    if (!expenseSource || isNaN(amount) || amount <= 0) {
      alert("Please select a category and enter a valid expense amount.");
      return;
    }

    setBudgets((prev) => ({
      ...prev,
      [expenseSource]: {
        ...prev[expenseSource],
        expenses: prev[expenseSource].expenses + amount,
      },
    }));

    setExpenseAmount("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Budget Tracker</h1>

      {/* Add Budget Section */}
      <div>
        <h2>Add Budget</h2>

        <input
          type="text"
          placeholder="Category (e.g., Food)"
          value={budgetType}
          onChange={(e) => setBudgetType(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={budgetAmount}
          onChange={(e) => setBudgetAmount(e.target.value)}
        />

        <button onClick={addBudget}>Add Budget</button>
      </div>

      {/* Add Expense Section */}
      <div style={{ marginTop: "20px" }}>
        <h2>Add Expense</h2>

        <select
          value={expenseSource}
          onChange={(e) => setExpenseSource(e.target.value)}
        >
          <option value="">Select Category</option>

          {Object.keys(budgets).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Expense Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />

        <button onClick={addExpense}>Add Expense</button>
      </div>

      {/* Budget Bars */}
      <div style={{ marginTop: "30px" }}>
        {Object.keys(budgets).map((category) => {
          const categoryBudget = budgets[category].budget;
          const categoryExpenses = budgets[category].expenses;

          const percentageUsed =
            (categoryExpenses / categoryBudget) * 100;

          return (
            <div key={category} style={{ marginBottom: "20px" }}>
              <strong>{category}</strong>

              <div
                style={{
                  width: "100%",
                  height: "20px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  overflow: "hidden",
                  marginTop: "5px",
                }}
              >
                <div
                  style={{
                    width: `${Math.min(percentageUsed, 100)}%`,
                    height: "100%",
                    backgroundColor:
                      percentageUsed > 100 ? "red" : "green",
                    transition: "width 0.3s ease",
                    textAlign: "right",
                    color: "white",
                    fontSize: "12px",
                  }}
                >
                  {Math.min(percentageUsed, 100).toFixed(2)}%
                </div>
              </div>

              <p>
                Budget: ₹{categoryBudget} | Expenses: ₹{categoryExpenses}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetTracker;