import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Savoney() {
  // --- Core Application State ---
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [budgetList, setBudgetList] = useState([]);
  const [expenseOptions, setExpenseOptions] = useState([]);
  // --- Transaction Filter States ---
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  // --- Form Inputs State ---
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

  // --- Calculated Metric Hooks ---
  const [metrics, setMetrics] = useState({ balance: 0, income: 0, expense: 0 });

  // --- Chart DOM Element References ---
  const incomeChartRef = useRef(null);
  const expenseChartRef = useRef(null);
  const incomeChartInstance = useRef(null);
  const expenseChartInstance = useRef(null);

  // --- Static Sidebar Configuration Array ---
  const menuItems = [
    { name: "Dashboard", icon: "bx-home", href: "#dashboard" },
    { name: "Income", icon: "bx-bar-chart-alt-2", href: "#income" },
    { name: "Budget", icon: "bx-bell", href: "#budget" },
    { name: "Expense", icon: "bx-message-rounded", href: "#expense" },
  ];

  // --- Initialization & LocalStorage Parsing ---
  useEffect(() => {
    const savedIncome = JSON.parse(localStorage.getItem("incomeList")) || [];
    const savedExpense = JSON.parse(localStorage.getItem("expenseList")) || [];
    const savedBudgets = JSON.parse(localStorage.getItem("budgets")) || {};
    const savedOptions = JSON.parse(localStorage.getItem("expenseOptions")) || [];

    setIncomeList(savedIncome);
    setExpenseList(savedExpense);
    setBudgets(savedBudgets);
    setExpenseOptions(savedOptions);

    const generatedBudgetList = [];
    for (const cat in savedBudgets) {
      generatedBudgetList.push({ amount: savedBudgets[cat].budget, type: cat });
    }
    setBudgetList(generatedBudgetList);
  }, []);

  // --- Track Layout Metric Updates Across State Mutations ---
  useEffect(() => {
    let totalInc = incomeList.reduce((sum, item) => sum + Number(item.amount), 0);
    let totalExp = expenseList.reduce((sum, item) => sum + Number(item.amount), 0);
    setMetrics({
      income: totalInc,
      expense: totalExp,
      balance: totalInc - totalExp,
    });

    localStorage.setItem("incomeList", JSON.stringify(incomeList));
    localStorage.setItem("expenseList", JSON.stringify(expenseList));
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [incomeList, expenseList, budgets]);

  // --- Chart Engine Renderers ---
  useEffect(() => {
    const savedChartData = JSON.parse(localStorage.getItem("chartData")) || { labels: [], datasets: [{ data: [] }] };
    
    if (incomeChartInstance.current) incomeChartInstance.current.destroy();
    
    const ctx = incomeChartRef.current.getContext("2d");
    incomeChartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: savedChartData.labels,
        datasets: [{
          data: savedChartData.datasets[0]?.data || [],
          backgroundColor: [
            "rgb(153, 102, 255)", "rgb(48, 192, 144)", "rgb(255, 159, 64)",
            "rgb(129, 129, 129)", "rgb(255, 105, 92)", "rgb(75, 192, 192)",
            "rgb(205, 92, 92)", "rgb(129, 199, 132)", "rgb(179, 179, 179)",
            "rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: "top" },
          title: { display: false }
        }
      }
    });

    return () => { if (incomeChartInstance.current) incomeChartInstance.current.destroy(); };
  }, [incomeList]);

  useEffect(() => {
    const savedExpenseChartData = JSON.parse(localStorage.getItem("expenseChartData")) || { labels: [], datasets: [{ data: [] }] };
    
    if (expenseChartInstance.current) expenseChartInstance.current.destroy();

    const ctx = expenseChartRef.current.getContext("2d");
    expenseChartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: savedExpenseChartData.labels,
        datasets: [{
          data: savedExpenseChartData.datasets[0]?.data || [],
          backgroundColor: [
            "rgb(48, 192, 144)", "rgb(255, 159, 64)", "rgb(179, 179, 179)",
            "rgb(129, 129, 129)", "rgb(255, 105, 92)", "rgb(255, 99, 132)",
            "rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(205, 92, 92)",
            "rgb(153, 102, 255)", "rgb(129, 199, 132)", "rgb(75, 192, 192)"
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top" },
          title: { display: false }
        }
      }
    });

    return () => { if (expenseChartInstance.current) expenseChartInstance.current.destroy(); };
  }, [expenseList]);

  // --- Core Handler Functions ---
  const handleAddIncome = () => {
    const amt = Number(incomeAmount);
    if (!amt || !incomeDate) return;

    const newIncome = {
      amount: amt,
      date: incomeDate,
      remarks: incomeRemarks || "N/A",
      source: incomeSource
    };

    setIncomeList(prev => [...prev, newIncome]);

    if (incomeChartInstance.current) {
      incomeChartInstance.current.data.labels.push(incomeRemarks || "N/A");
      incomeChartInstance.current.data.datasets[0].data.push(amt);
      incomeChartInstance.current.update();
      localStorage.setItem("chartData", JSON.stringify({
        labels: incomeChartInstance.current.data.labels,
        datasets: incomeChartInstance.current.data.datasets
      }));
    }

    setIncomeAmount("");
    setIncomeDate("");
    setIncomeRemarks("");
    setIncomeSource("select-type");
  };

  const handleCategoryBudget = () => {
    const category = budgetCategoryInput.trim();
    const amt = parseFloat(budgetAmountInput);

    if (amt <= 0 || isNaN(amt)) {
      alert("Budget amount can't be negative.");
      return;
    }
    if (!category) {
      alert("Please enter a valid budget type.");
      return;
    }

    setBudgetList(prev => [...prev, { amount: amt, type: category }]);
    setBudgets(prev => {
      const updated = { ...prev };
      if (!updated[category]) {
        updated[category] = { budget: 0, expenses: 0 };
      }
      updated[category].budget = amt;
      return updated;
    });

    setExpenseOptions(prev => {
      if (!prev.includes(category)) {
        const nextOptions = [...prev, category];
        localStorage.setItem("expenseOptions", JSON.stringify(nextOptions));
        return nextOptions;
      }
      return prev;
    });

    setBudgetAmountInput("");
    setBudgetCategoryInput("");
  };

  const handleAddExpense = () => {
    const amt = parseFloat(expenseAmountInput);
    const category = expenseSourceInput;

    if (amt <= 0 || isNaN(amt)) {
      alert("Expense amount can't be negative.");
      return;
    }
    if (category === "select-type" || !category) {
      alert("Please select a valid expense source.");
      return;
    }
    if (!budgets[category]) {
      alert(`No budget exists for ${category}. Please add a budget first.`);
      return;
    }

    const newExpense = {
      amount: amt,
      date: expenseDateInput,
      remarks: expenseRemarksInput || "N/A",
      source: category
    };

    const nextExpenseList = [...expenseList, newExpense];
    setExpenseList(nextExpenseList);

    setBudgets(prev => {
      const updated = { ...prev };
      updated[category].expenses += amt;
      return updated;
    });

    if (expenseChartInstance.current) {
      expenseChartInstance.current.data.datasets[0].data.push(amt);
      expenseChartInstance.current.data.labels.push(category);
      expenseChartInstance.current.update();
      localStorage.setItem("expenseChartData", JSON.stringify({
        labels: expenseChartInstance.current.data.labels,
        datasets: expenseChartInstance.current.data.datasets
      }));
    }

    setExpenseAmountInput("");
    setExpenseDateInput("");
    setExpenseRemarksInput("");
    setExpenseSourceInput("select-type");
  };

  const resetData = () => {
    if (window.confirm("Are you sure you want to reset all data?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="m-0 p-0 box-border scroll-smooth bg-gray-100 min-h-screen text-black antialiased font-sans">
      {/* --- Navbar Configuration --- */}
      <nav className="h-[70px] w-full fixed top-0 left-0 flex flex-row justify-start items-center z-50 bg-white shadow-sm border-b border-gray-200 px-6 select-none">
        <i className="bx bx-menu text-2xl mr-5 cursor-pointer text-gray-700" onClick={() => setSidebarOpen(!sidebarOpen)}></i>
        <h1 className="text-[22px] font-bold text-[#333333] tracking-tight">Savoney</h1>
      </nav>

      {/* --- Replicated Mockup Sidebar Component (Fixed Overlay Depth) --- */}
      <div 
        id="sidebar" 
        className={`fixed top-0 h-screen w-[270px] bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-[999] shadow-2xl ${
          sidebarOpen ? "left-0" : "-left-[270px]"
        }`}
      >
        <div className="flex items-center gap-5 pt-[22px] pl-[25px] select-none">
          <i className="bx bx-menu text-2xl cursor-pointer text-[#333333]" onClick={() => setSidebarOpen(false)} />
          <h1 className="text-[22px] font-bold text-[#333333] tracking-tight">Savoney</h1>
        </div>

        <div className="mt-[55px] px-[25px]">
          <ul className="list-none p-0 m-0 space-y-6">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center text-[17px] font-medium text-gray-400 hover:text-gray-900 transition-colors duration-200 group no-underline"
                >
                  <i className={`bx ${item.icon} text-[22px] mr-5 text-gray-400 group-hover:text-gray-900 transition-colors duration-200`} />
                  <span>{item.name}</span>
                </a>
              </li>
            ))}

            <li>
              <a
                href="#reset"
                onClick={(e) => { e.preventDefault(); setSidebarOpen(false); resetData(); }}
                className="flex items-center text-[17px] font-medium text-gray-400 hover:text-red-600 transition-colors duration-200 group no-underline"
              >
                <i className="bx bx-pie-chart-alt-2 text-[22px] mr-5 text-gray-400 group-hover:text-red-600 transition-colors duration-200" />
                <span>Reset</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* --- Landing Showcase Hero Area --- */}
      <header className="pt-[70px]">
        <div 
          className="h-[35vh] lg:h-[45vh] w-full flex justify-center items-center m-0 p-0 text-white bg-cover bg-no-repeat bg-bottom" 
          style={{ backgroundImage: "url('https://savoney.netlify.app/assessts/bg169.svg')" }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Welcome to SAVONEY
          </h1>
        </div>
      </header>

      {/* --- Primary Application Content Layout --- */}
      <main
        onClick={() => { if(sidebarOpen) setSidebarOpen(false); }}
        className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10"
      >
        
        {/* --- Section: Dashboard --- */}
        <section id="dashboard" className="scroll-mt-24">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-start items-center border-b border-gray-200 pb-4 mb-6">
              <i className="uil uil-tachometer-fast-alt bg-blue-600 text-white text-xl rounded-xl p-2 mr-4 flex items-center justify-center w-10 h-10 flex-shrink-0"></i>
              <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Total Balance", value: metrics.balance, icon: "uil-thumbs-up" },
                { title: "Total Income", value: metrics.income, icon: "uil-comments" },
                { title: "Total Expense", value: metrics.expense, icon: "uil-share" },
              ].map((card, i) => (
                <div key={i} className="text-center p-6 w-full rounded-2xl bg-blue-600 text-white shadow-sm hover:shadow-md transform hover:scale-[1.01] transition duration-200 flex flex-col justify-center items-center min-h-[140px]">
                  <ul className="list-none space-y-2 p-0 m-0">
                    <li><i className={`uil ${card.icon} text-2xl`}></i></li>
                    <li><h3 className="text-sm font-medium opacity-90">{card.title}</h3></li>
                    <li><h2 className="text-2xl font-bold tracking-tight font-mono">₹{card.value.toLocaleString('en-IN')}</h2></li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Section: Income Management --- */}
        <section id="income" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Income Details Form */}
            <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-start items-center border-b border-gray-200 pb-4 mb-5">
                  <i className="uil uil-tachometer-fast-alt bg-blue-600 text-white text-lg rounded-lg p-2 mr-4 flex-shrink-0"></i>
                  <h2 className="text-lg font-bold text-gray-800">Income Details</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-xs mb-1.5 text-gray-700">Amount</h4>
                    <input type="number" value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} className="w-full h-10 border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" placeholder="Enter Amount" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs mb-1.5 text-gray-700">Date</h4>
                    <input type="date" value={incomeDate} onChange={(e) => setIncomeDate(e.target.value)} className="w-full h-10 border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs mb-1.5 text-gray-700">Remarks</h4>
                    <input type="text" value={incomeRemarks} onChange={(e) => setIncomeRemarks(e.target.value)} className="w-full h-10 border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" placeholder="Enter income remarks" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs mb-1.5 text-gray-700">Types of source</h4>
                    <select value={incomeSource} onChange={(e) => setIncomeSource(e.target.value)} className="w-full h-10 border border-gray-300 rounded-lg px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                      <option value="select-type">Select type</option>
                      <option value="earning">Earning</option>
                      <option value="saving">Saving</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>
              </div>
              <button onClick={handleAddIncome} className="w-full h-10 mt-6 bg-blue-600 text-white rounded-lg flex items-center justify-center font-medium gap-2 hover:bg-blue-700 transition text-sm">
                Add <i className="uil uil-navigator"></i>
              </button>
            </div>

            {/* Income History View */}
            <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
              <div className="flex justify-start items-center border-b border-gray-200 pb-4 mb-5">
                <i className="uil uil-navigator bg-blue-600 text-white text-lg rounded-lg p-2 mr-4 flex-shrink-0"></i>
                <h2 className="text-lg font-bold text-gray-800">Income History</h2>
              </div>
              <div className="flex-1 max-h-[340px] overflow-y-auto space-y-3 pr-1">
                {incomeList.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-12">No income instances recorded yet.</p>
                ) : (
                  incomeList.map((item, idx) => (
                    <div key={idx} className="w-full">
                      <p className="bg-[#1bcfb4] p-3 rounded-xl text-xs font-semibold text-gray-800 shadow-sm m-0 leading-relaxed">
                        ₹{item.amount} <span className="text-white font-normal px-0.5">from</span> {item.remarks} <span className="text-white font-normal px-0.5">on</span> {item.date} <span className="text-white font-normal px-0.5">as</span> <span className="capitalize">{item.source}</span>
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Income Allocation Chart */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center">
              <div className="flex justify-start items-center border-b border-gray-200 pb-4 mb-5 w-full">
                <i className="uil uil-chart bg-blue-600 text-white text-lg rounded-lg p-2 mr-4 flex-shrink-0"></i>
                <h2 className="text-lg font-bold text-gray-800">Income Chart</h2>
              </div>
              <div className="w-full flex-1 flex justify-center items-center min-h-[250px] relative">
                <canvas ref={incomeChartRef}></canvas>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section: Budget Limits Management --- */}
        <section id="budget" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Budget Definitions Entry Form */}
            <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-start items-center border-b border-gray-200 pb-4 mb-5">
                  <i className="uil uil-tachometer-fast-alt bg-blue-600 text-white text-lg rounded-lg p-2 mr-4 flex-shrink-0"></i>
                  <h2 className="text-lg font-bold text-gray-800">Budget Details</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-xs mb-1.5 text-gray-700">Budget Amount</h4>
                    <input type="number" value={budgetAmountInput} onChange={(e) => setBudgetAmountInput(e.target.value)} className="w-full h-10 border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" placeholder="Enter Amount" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs mb-1.5 text-gray-700">Category Type</h4>
                    <input type="text" value={budgetCategoryInput} onChange={(e) => setBudgetCategoryInput(e.target.value)} className="w-full h-10 border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" placeholder="Enter Type" />
                  </div>
                </div>
              </div>
              <button onClick={handleCategoryBudget} className="w-full h-10 mt-6 bg-blue-600 text-white rounded-lg flex items-center justify-center font-medium gap-2 hover:bg-blue-700 transition text-sm">
                Next <i className="uil uil-navigator"></i>
              </button>
            </div>

            {/* Live Progress Bar Lists View Component */}
            <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
              <div className="flex justify-start items-center border-b border-gray-200 pb-4 mb-5">
                <i className="uil uil-list-ul bg-blue-600 text-white text-lg rounded-lg p-2 mr-4 flex-shrink-0"></i>
                <h2 className="text-lg font-bold text-gray-800">Budget Allocation List</h2>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 max-h-[300px]">
                {Object.keys(budgets).length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-12">No specific budget limits created yet.</p>
                ) : (
                  Object.keys(budgets).map((category) => {
                    const expenseAmountBar = expenseList.reduce((acc, obj) => obj.source === category ? acc + Number(obj.amount) : acc, 0) || budgets[category].expenses || 0;
                    const budgetAmountBar = budgetList.find(b => b.type === category)?.amount || budgets[category].budget || 1;
                    const percentageUsed = (expenseAmountBar / budgetAmountBar) * 100;
                    const isOverBudget = percentageUsed > 100;

                    return (
                      <div key={category} className="w-full border-b border-gray-100 pb-3 last:border-b-0">
                        <div className="flex justify-between items-center mb-2 text-sm">
                          <strong className="text-gray-800 text-sm font-semibold">{category}</strong>
                          <span className="text-gray-500 font-mono text-xs">₹{expenseAmountBar.toFixed(0)} / ₹{budgetAmountBar.toFixed(0)}</span>
                        </div>
                        <div className="w-full h-6 bg-gray-200 rounded-md overflow-hidden relative shadow-inner">
                          <div 
                            className={`h-full transition-all duration-500 ease-in-out ${isOverBudget ? "bg-[#4979e8]" : "bg-[#1bcfb4]"}`}
                            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
                          ></div>
                          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-800 whitespace-nowrap">
                            {percentageUsed.toFixed(1)}% Used
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </section>

        {/* --- Section: Outflow Expense Processing --- */}
        <section id="expense" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Expense Record Intake Form */}
            <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-start items-center border-b border-gray-200 pb-4 mb-5">
                  <i className="uil uil-tachometer-fast-alt bg-blue-600 text-white text-lg rounded-lg p-2 mr-4 flex-shrink-0"></i>
                  <h2 className="text-lg font-bold text-gray-800">Expense Details</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-xs mb-1.5 text-gray-700">Expense Amount</h4>
                    <input type="number" value={expenseAmountInput} onChange={(e) => setExpenseAmountInput(e.target.value)} className="w-full h-10 border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" placeholder="Enter your expense" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs mb-1.5 text-gray-700">Date</h4>
                    <input type="date" value={expenseDateInput} onChange={(e) => setExpenseDateInput(e.target.value)} className="w-full h-10 border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs mb-1.5 text-gray-700">Remarks</h4>
                    <input type="text" value={expenseRemarksInput} onChange={(e) => setExpenseRemarksInput(e.target.value)} className="w-full h-10 border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" placeholder="Enter expense remarks" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs mb-1.5 text-gray-700">Types of source</h4>
                    <select value={expenseSourceInput} onChange={(e) => setExpenseSourceInput(e.target.value)} className="w-full h-10 border border-gray-300 rounded-lg px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                      <option value="select-type">Select type</option>
                      {expenseOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <button onClick={handleAddExpense} className="w-full h-10 mt-6 bg-blue-600 text-white rounded-lg flex items-center justify-center font-medium gap-2 hover:bg-blue-700 transition text-sm">
                Next <i className="uil uil-navigator"></i>
              </button>
            </div>

            {/* Expense History Ledger Component */}
            <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
              <div className="flex justify-start items-center border-b border-gray-200 pb-4 mb-4">
                <i className="uil uil-history bg-blue-600 text-white text-lg rounded-lg p-2 mr-4 flex-shrink-0"></i>
                <h2 className="text-lg font-bold text-gray-800">Expense History</h2>
              </div>

              {/* FILTERS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">Filter Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-9 border border-gray-300 rounded-lg px-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    {expenseOptions.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">Filter Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full h-9 border border-gray-300 rounded-lg px-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>

              {/* FILTERED TRANSACTIONS */}
              <div className="flex-1 max-h-[240px] overflow-y-auto space-y-3 pr-1">
                {expenseList
                  .filter((item) => {
                    const categoryMatch = selectedCategory === "all" || item.source === selectedCategory;
                    const dateMatch = !selectedDate || item.date === selectedDate;
                    return categoryMatch && dateMatch;
                  })
                  .map((item, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-[#1bcfb4] to-[#0ea5e9] rounded-xl p-3 shadow-sm text-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-sm font-mono">₹{item.amount}</h3>
                          <p className="text-xs opacity-90 mt-0.5">{item.remarks}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">{item.source}</p>
                          <p className="text-[10px] mt-0.5 opacity-90">{item.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Empty State */}
                {expenseList.filter((item) => {
                  const categoryMatch = selectedCategory === "all" || item.source === selectedCategory;
                  const dateMatch = !selectedDate || item.date === selectedDate;
                  return categoryMatch && dateMatch;
                }).length === 0 && (
                  <div className="text-center py-10 text-xs text-gray-400">
                    No transactions matched your filters.
                  </div>
                )}
              </div>
            </div>

            {/* Expense Distribution Visual Canvas Area */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center">
              <div className="flex justify-start items-center border-b border-gray-200 pb-4 mb-5 w-full">
                <i className="uil uil-chart-pie bg-blue-600 text-white text-lg rounded-lg p-2 mr-4 flex-shrink-0"></i>
                <h2 className="text-lg font-bold text-gray-800">Expense Chart</h2>
              </div>
              <div className="w-full flex-1 flex justify-center items-center min-h-[250px] relative">
                <canvas ref={expenseChartRef}></canvas>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* --- Footer Component --- */}
      <footer className="w-full text-black text-center p-5 text-sm border-t border-gray-200 font-medium tracking-wide bg-white mt-12">
        made with ❤️ by <span className="text-blue-600 font-semibold">Priya</span>
      </footer>
    </div>
  );
}