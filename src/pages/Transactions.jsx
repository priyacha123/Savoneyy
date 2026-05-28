import { useEffect, useState } from "react";

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
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Budget Tracker
        </h1>

        {/* Add Budget Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add Budget
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Category (e.g., Food)"
              value={budgetType}
              onChange={(e) => setBudgetType(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="number"
              placeholder="Amount"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={addBudget}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300"
            >
              Add Budget
            </button>
          </div>
        </div>

        {/* Add Expense Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add Expense
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={expenseSource}
              onChange={(e) => setExpenseSource(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
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
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              onClick={addExpense}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition duration-300"
            >
              Add Expense
            </button>
          </div>
        </div>

        {/* Budget Bars */}
        <div className="space-y-6">
          {Object.keys(budgets).map((category) => {
            const categoryBudget = budgets[category].budget;
            const categoryExpenses = budgets[category].expenses;

            const percentageUsed =
              (categoryExpenses / categoryBudget) * 100;

            return (
              <div
                key={category}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <strong className="text-gray-700 text-lg">
                    {category}
                  </strong>

                  <span className="text-sm text-gray-500">
                    ₹{categoryExpenses} / ₹{categoryBudget}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full text-xs text-white flex items-center justify-end pr-2 transition-all duration-300 ${
                      percentageUsed > 100
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        percentageUsed,
                        100
                      )}%`,
                    }}
                  >
                    {Math.min(
                      percentageUsed,
                      100
                    ).toFixed(2)}
                    %
                  </div>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  Budget: ₹{categoryBudget} | Expenses:
                  ₹{categoryExpenses}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;