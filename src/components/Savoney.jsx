import { useState, useEffect } from "react";
import Navbar from "./custom/Navbar";
import SummaryCards from "./custom/SummaryCards";
import IncomeSection from "./custom/IncomeSection";
import BudgetSection from "./custom/BudgetSection";
import ExpenseSection from "./custom/ExpenseSection";
import Footer from "./custom/Footer";
import GlobalStyle from "../Globalstyle";
import HeroSection from "./custom/HeroSection";
import { PALETTE } from "../../utility/tokens";

export default function Savoney() {

  // ── Core state ────────────────────────────
  const [incomeList,      setIncomeList]      = useState([]);
  const [expenseList,     setExpenseList]     = useState([]);
  const [budgets,         setBudgets]         = useState({});
  const [budgetList,      setBudgetList]      = useState([]);
  const [expenseOptions,  setExpenseOptions]  = useState([]);

  // ── Filter state ──────────────────────────
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate,     setSelectedDate]      = useState("");

  // ── Income form state ─────────────────────
  const [incomeAmount,  setIncomeAmount]  = useState("");
  const [incomeDate,    setIncomeDate]    = useState("");
  const [incomeRemarks, setIncomeRemarks] = useState("");
  const [incomeSource,  setIncomeSource]  = useState("select-type");

  // ── Budget form state ─────────────────────
  const [budgetAmountInput,   setBudgetAmountInput]   = useState("");
  const [budgetCategoryInput, setBudgetCategoryInput] = useState("");

  // ── Expense form state ────────────────────
  const [expenseAmountInput,  setExpenseAmountInput]  = useState("");
  const [expenseDateInput,    setExpenseDateInput]    = useState("");
  const [expenseRemarksInput, setExpenseRemarksInput] = useState("");
  const [expenseSourceInput,  setExpenseSourceInput]  = useState("select-type");

  // ── Derived metrics ───────────────────────
  const [metrics, setMetrics] = useState({ balance: 0, income: 0, expense: 0 });

  // ── Hydrate from localStorage ─────────────
  useEffect(() => {
    const savedIncome   = JSON.parse(localStorage.getItem("incomeList"))    || [];
    const savedExpense  = JSON.parse(localStorage.getItem("expenseList"))   || [];
    const savedBudgets  = JSON.parse(localStorage.getItem("budgets"))       || {};
    const savedOptions  = JSON.parse(localStorage.getItem("expenseOptions"))|| [];

    setIncomeList(savedIncome);
    setExpenseList(savedExpense);
    setBudgets(savedBudgets);
    setExpenseOptions(savedOptions);

    const generated = Object.keys(savedBudgets).map((cat) => ({
      amount: savedBudgets[cat].budget,
      type: cat,
    }));
    setBudgetList(generated);
  }, []);

  // ── Sync metrics + localStorage on every mutation ──
  useEffect(() => {
    const totalInc = incomeList.reduce((sum, item) => sum + Number(item.amount), 0);
    const totalExp = expenseList.reduce((sum, item) => sum + Number(item.amount), 0);
    setMetrics({ income: totalInc, expense: totalExp, balance: totalInc - totalExp });
    localStorage.setItem("incomeList",  JSON.stringify(incomeList));
    localStorage.setItem("expenseList", JSON.stringify(expenseList));
    localStorage.setItem("budgets",     JSON.stringify(budgets));
  }, [incomeList, expenseList, budgets]);

  // ── Handlers ─────────────────────────────
  const handleAddIncome = () => {
    const amt = Number(incomeAmount);
    if (!amt || !incomeDate) { alert("Please enter a valid amount and date."); return; }
    setIncomeList((prev) => [
      ...prev,
      { amount: amt, date: incomeDate, remarks: incomeRemarks || "N/A",
        source: incomeSource === "select-type" ? "Other" : incomeSource },
    ]);
    setIncomeAmount(""); setIncomeDate(""); setIncomeRemarks(""); setIncomeSource("select-type");
  };

  const handleCategoryBudget = () => {
    const category = budgetCategoryInput.trim();
    const amt      = parseFloat(budgetAmountInput);
    if (isNaN(amt) || amt <= 0) { alert("Budget amount must be a positive number."); return; }
    if (!category)              { alert("Please enter a valid budget category."); return; }

    setBudgetList((prev) => [...prev, { amount: amt, type: category }]);
    setBudgets((prev) => {
      const updated = { ...prev };
      if (!updated[category]) updated[category] = { budget: 0, expenses: 0 };
      updated[category].budget = amt;
      return updated;
    });
    setExpenseOptions((prev) => {
      if (prev.includes(category)) return prev;
      const next = [...prev, category];
      localStorage.setItem("expenseOptions", JSON.stringify(next));
      return next;
    });
    setBudgetAmountInput(""); setBudgetCategoryInput("");
  };

  const handleAddExpense = () => {
    const amt      = parseFloat(expenseAmountInput);
    const category = expenseSourceInput;
    if (isNaN(amt) || amt <= 0)            { alert("Expense amount must be a positive number."); return; }
    if (category === "select-type")        { alert("Please select a valid expense category."); return; }
    if (!budgets[category])                { alert(`No budget limit exists for "${category}". Please create a budget first.`); return; }

    setExpenseList((prev) => [
      ...prev,
      { amount: amt, date: expenseDateInput, remarks: expenseRemarksInput || "N/A", source: category },
    ]);
    setBudgets((prev) => {
      const updated = { ...prev };
      updated[category].expenses = (updated[category].expenses || 0) + amt;
      return updated;
    });
    setExpenseAmountInput(""); setExpenseDateInput(""); setExpenseRemarksInput(""); setExpenseSourceInput("select-type");
  };

  const resetData = () => {
    if (window.confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const formattedDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric", month: "short", day: "numeric",
  });

  // ── Render ────────────────────────────────
  return (
    <>
      <GlobalStyle />
      <div style={{ background: PALETTE.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>

        <Navbar formattedDate={formattedDate} resetData={resetData} />

        <HeroSection />

        <main style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px 80px" }}>

          {/* Dashboard header */}
          <div id="dashboard" style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 36,
          }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: PALETTE.textLight,
                textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>
                Overview
              </p>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: PALETTE.textPrimary }}>
                Dashboard
              </h2>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: PALETTE.surface, border: `1px solid ${PALETTE.border}`,
              borderRadius: 12, padding: "8px 16px",
            }}>
              <span style={{ fontSize: 16 }}>📅</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: PALETTE.textMuted }}>{formattedDate}</span>
            </div>
          </div>

          <SummaryCards metrics={metrics} incomeList={incomeList} expenseList={expenseList} />

          <IncomeSection
            incomeList={incomeList}
            incomeAmount={incomeAmount}   setIncomeAmount={setIncomeAmount}
            incomeDate={incomeDate}       setIncomeDate={setIncomeDate}
            incomeRemarks={incomeRemarks} setIncomeRemarks={setIncomeRemarks}
            incomeSource={incomeSource}   setIncomeSource={setIncomeSource}
            handleAddIncome={handleAddIncome}
          />

          <BudgetSection
            budgets={budgets}
            budgetList={budgetList}
            expenseList={expenseList}
            budgetAmountInput={budgetAmountInput}     setBudgetAmountInput={setBudgetAmountInput}
            budgetCategoryInput={budgetCategoryInput} setBudgetCategoryInput={setBudgetCategoryInput}
            handleCategoryBudget={handleCategoryBudget}
          />

          <ExpenseSection
            expenseList={expenseList}
            expenseOptions={expenseOptions}
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            selectedDate={selectedDate}         setSelectedDate={setSelectedDate}
            expenseAmountInput={expenseAmountInput}   setExpenseAmountInput={setExpenseAmountInput}
            expenseDateInput={expenseDateInput}       setExpenseDateInput={setExpenseDateInput}
            expenseRemarksInput={expenseRemarksInput} setExpenseRemarksInput={setExpenseRemarksInput}
            expenseSourceInput={expenseSourceInput}   setExpenseSourceInput={setExpenseSourceInput}
            handleAddExpense={handleAddExpense}
            totalExpense={metrics.expense}
          />
        </main>

        <Footer />
      </div>
    </>
  );
}