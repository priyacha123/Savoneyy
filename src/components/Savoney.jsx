import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "./custom/Navbar";
import SummaryCards from "./custom/SummaryCards";
import IncomeSection from "./custom/IncomeSection";
import BudgetSection from "./custom/BudgetSection";
import ExpenseSection from "./custom/ExpenseSection";
import Footer from "./custom/Footer";
import GlobalStyle from "../Globalstyle";
// import HeroSection from "./custom/HeroSection";
import { PALETTE } from "../../utility/tokens";
import {
  addBudget,
  addExpense,
  addIncome,
  createUser,
  getBudgets,
  getExpenses,
  getIncome,
} from "../lib/api";

function budgetsToMap(items, expenses) {
  return items.reduce((acc, budget) => {
    const spent = expenses.reduce(
      (sum, expense) => (expense.source === budget.type ? sum + Number(expense.amount) : sum),
      0,
    );

    acc[budget.type] = {
      budget: Number(budget.amount),
      expenses: spent,
    };

    return acc;
  }, {});
}

export default function Savoney() {
  const { user, isLoaded } = useUser();
  const clerkId = user?.id;
  const email = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || "";
  const fullName = user?.fullName || "";

  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [budgetList, setBudgetList] = useState([]);
  const [expenseOptions, setExpenseOptions] = useState([]);
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeDate, setIncomeDate] = useState("");
  const [incomeRemarks, setIncomeRemarks] = useState("");
  const [incomeSource, setIncomeSource] = useState("select-type");

  const [budgetAmountInput, setBudgetAmountInput] = useState("");
  const [budgetCategoryInput, setBudgetCategoryInput] = useState("");

  const [expenseAmountInput, setExpenseAmountInput] = useState("");
  const [expenseDateInput, setExpenseDateInput] = useState("");
  const [expenseRemarksInput, setExpenseRemarksInput] = useState("");
  const [expenseSourceInput, setExpenseSourceInput] = useState("select-type");

  useEffect(() => {
    if (!isLoaded) return;
    if (!clerkId) return;

    let ignore = false;

    async function loadDashboard() {
      setIsDashboardLoading(true);
      setDashboardError("");

      try {
        await createUser({
          clerkId,
          email,
          fullName,
        });

        const [income, expenses, budgetItems] = await Promise.all([
          getIncome(clerkId),
          getExpenses(clerkId),
          getBudgets(clerkId),
        ]);

        if (ignore) return;

        setIncomeList(income);
        setExpenseList(expenses);
        setBudgetList(budgetItems);
        setExpenseOptions(budgetItems.map((item) => item.type));
        setBudgets(budgetsToMap(budgetItems, expenses));
      } catch (error) {
        if (!ignore) {
          setDashboardError(error.message || "Unable to load dashboard data.");
        }
      } finally {
        if (!ignore) {
          setIsDashboardLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      ignore = true;
    };
  }, [isLoaded, clerkId, email, fullName]);

  const totalIncome = incomeList.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpense = expenseList.reduce((sum, item) => sum + Number(item.amount), 0);
  const metrics = {
    income: totalIncome,
    expense: totalExpense,
    balance: totalIncome - totalExpense,
  };

  const handleAddIncome = async () => {
    if (!clerkId) return;
    const amt = Number(incomeAmount);
    if (!amt || !incomeDate) { alert("Please enter a valid amount and date."); return; }
    if (incomeSource === "select-type") { alert("Please select an income source."); return; }

    try {
      const income = await addIncome({
        clerkId,
        amount: amt,
        date: incomeDate,
        remarks: incomeRemarks || "N/A",
        source: incomeSource,
      });

      setIncomeList((prev) => [income, ...prev]);
      setIncomeAmount(""); setIncomeDate(""); setIncomeRemarks(""); setIncomeSource("select-type");
    } catch (error) {
      alert(error.message || "Unable to add income.");
    }
  };

  const handleCategoryBudget = async () => {
    if (!clerkId) return;
    const category = budgetCategoryInput.trim();
    const amt = parseFloat(budgetAmountInput);
    if (isNaN(amt) || amt <= 0) { alert("Budget amount must be a positive number."); return; }
    if (!category) { alert("Please enter a valid budget category."); return; }

    try {
      const budget = await addBudget({ clerkId, type: category, amount: amt });

      setBudgetList((prev) => {
        const withoutExisting = prev.filter((item) => item.type !== budget.type);
        return [budget, ...withoutExisting];
      });
      setBudgets((prev) => ({
        ...prev,
        [budget.type]: {
          budget: Number(budget.amount),
          expenses: prev[budget.type]?.expenses || 0,
        },
      }));
      setExpenseOptions((prev) => (prev.includes(budget.type) ? prev : [...prev, budget.type]));
      setBudgetAmountInput(""); setBudgetCategoryInput("");
    } catch (error) {
      alert(error.message || "Unable to save budget.");
    }
  };

  const handleAddExpense = async () => {
    if (!clerkId) return;
    const amt = parseFloat(expenseAmountInput);
    const category = expenseSourceInput;
    if (isNaN(amt) || amt <= 0) { alert("Expense amount must be a positive number."); return; }
    if (category === "select-type") { alert("Please select a valid expense category."); return; }
    if (!budgets[category]) { alert(`No budget limit exists for "${category}". Please create a budget first.`); return; }
    if (!expenseDateInput) { alert("Please select an expense date."); return; }

    try {
      const expense = await addExpense({
        clerkId,
        amount: amt,
        date: expenseDateInput,
        remarks: expenseRemarksInput || "N/A",
        source: category,
      });

      setExpenseList((prev) => [expense, ...prev]);
      setBudgets((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          expenses: (prev[category]?.expenses || 0) + Number(expense.amount),
        },
      }));
      setExpenseAmountInput(""); setExpenseDateInput(""); setExpenseRemarksInput(""); setExpenseSourceInput("select-type");
    } catch (error) {
      alert(error.message || "Unable to add expense.");
    }
  };

  const resetData = () => {
    window.location.reload();
  };

  const formattedDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric", month: "short", day: "numeric",
  });

  return (
    <>
      <GlobalStyle />
      <div style={{ background: PALETTE.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
        <Navbar formattedDate={formattedDate} resetData={resetData} />
        {/* <HeroSection /> */}

        <main className="svy-main">
          <div id="dashboard" className="svy-dashboard-header">
            <div>
              <h2 className="svy-dashboard-title">
                Dashboard
              </h2>
            </div>
            <div className="svy-date-chip">
              <span>Date</span>
              <span>{formattedDate}</span>
            </div>
          </div>

          <SummaryCards metrics={metrics} incomeList={incomeList} expenseList={expenseList} />

          {(!isLoaded || isDashboardLoading) && (
            <div className="svy-card" style={{ marginTop: 24, color: PALETTE.textMuted, fontWeight: 600 }}>
              Loading your financial data...
            </div>
          )}

          {dashboardError && (
            <div className="svy-card" style={{ marginTop: 24, color: PALETTE.error, fontWeight: 700 }}>
              {dashboardError}
            </div>
          )}

          <IncomeSection
            incomeList={incomeList}
            incomeAmount={incomeAmount} setIncomeAmount={setIncomeAmount}
            incomeDate={incomeDate} setIncomeDate={setIncomeDate}
            incomeRemarks={incomeRemarks} setIncomeRemarks={setIncomeRemarks}
            incomeSource={incomeSource} setIncomeSource={setIncomeSource}
            handleAddIncome={handleAddIncome}
          />

          <BudgetSection
            budgets={budgets}
            budgetList={budgetList}
            expenseList={expenseList}
            budgetAmountInput={budgetAmountInput} setBudgetAmountInput={setBudgetAmountInput}
            budgetCategoryInput={budgetCategoryInput} setBudgetCategoryInput={setBudgetCategoryInput}
            handleCategoryBudget={handleCategoryBudget}
          />

          <ExpenseSection
            expenseList={expenseList}
            expenseOptions={expenseOptions}
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            selectedDate={selectedDate} setSelectedDate={setSelectedDate}
            expenseAmountInput={expenseAmountInput} setExpenseAmountInput={setExpenseAmountInput}
            expenseDateInput={expenseDateInput} setExpenseDateInput={setExpenseDateInput}
            expenseRemarksInput={expenseRemarksInput} setExpenseRemarksInput={setExpenseRemarksInput}
            expenseSourceInput={expenseSourceInput} setExpenseSourceInput={setExpenseSourceInput}
            handleAddExpense={handleAddExpense}
            totalExpense={metrics.expense}
          />
        </main>

        <Footer />
      </div>
    </>
  );
}
