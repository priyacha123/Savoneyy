import { useState, useEffect } from "react";
import {
  Menu,
  Home,
  BarChart2,
  Bell,
  MessageCircle,
  PieChart,
  Navigation,
  Gauge,
  ThumbsUp,
  MessagesSquare,
  Share2,
} from "lucide-react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const Savoney = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [budgets, setBudgets] = useState({});

  const [incomeForm, setIncomeForm] = useState({
    amount: "",
    date: "",
    remarks: "",
    source: "earning",
  });

  const [expenseForm, setExpenseForm] = useState({
    amount: "",
    date: "",
    remarks: "",
    source: "",
  });

  const [budgetForm, setBudgetForm] = useState({
    amount: "",
    type: "",
  });

  // Totals
  const totalIncome = incomeData.reduce(
    (acc, item) => acc + Number(item.amount),
    0
  );

  const totalExpense = expenseData.reduce(
    (acc, item) => acc + Number(item.amount),
    0
  );

  const totalBalance = totalIncome - totalExpense;

  // Add Income
  const addIncome = () => {
    if (!incomeForm.amount || !incomeForm.date) return;

    setIncomeData([...incomeData, incomeForm]);

    setIncomeForm({
      amount: "",
      date: "",
      remarks: "",
      source: "earning",
    });
  };

  // Add Expense
  const addExpense = () => {
    if (!expenseForm.amount || !expenseForm.source) return;

    setExpenseData([...expenseData, expenseForm]);

    // Update Budget Expense
    if (budgets[expenseForm.source]) {
      setBudgets((prev) => ({
        ...prev,
        [expenseForm.source]: {
          ...prev[expenseForm.source],
          spent:
            prev[expenseForm.source].spent +
            Number(expenseForm.amount),
        },
      }));
    }

    setExpenseForm({
      amount: "",
      date: "",
      remarks: "",
      source: "",
    });
  };

  // Add Budget
  const addBudget = () => {
    if (!budgetForm.amount || !budgetForm.type) return;

    setBudgets((prev) => ({
      ...prev,
      [budgetForm.type]: {
        limit: Number(budgetForm.amount),
        spent: prev[budgetForm.type]?.spent || 0,
      },
    }));

    setBudgetForm({
      amount: "",
      type: "",
    });
  };

  // Scroll Animation
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-show");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Income Chart
  const incomeChartData = {
    labels: incomeData.map((item) => item.source),
    datasets: [
      {
        data: incomeData.map((item) => item.amount),
      },
    ],
  };

  // Expense Chart
  const expenseChartData = {
    labels: expenseData.map((item) => item.source),
    datasets: [
      {
        data: expenseData.map((item) => item.amount),
      },
    ],
  };

  return (
    <div>
      {/* Styles */}
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:sans-serif;
        }

        body{
          background:#f5f5f5;
        }

        nav{
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:20px;
          background:#111827;
          color:white;
        }

        .heading{
          text-align:center;
          padding:60px 20px;
          background:#1f2937;
          color:white;
        }

        .container{
          padding:20px;
          margin:20px;
          background:white;
          border-radius:10px;
          box-shadow:0 2px 10px rgba(0,0,0,0.1);
        }

        .dashboard_content{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
          gap:20px;
        }

        .item{
          padding:20px;
          background:#f9fafb;
          border-radius:10px;
          text-align:center;
        }

        form{
          display:grid;
          gap:15px;
        }

        input,select{
          width:100%;
          padding:10px;
          border:1px solid #ccc;
          border-radius:5px;
        }

        .btn{
          margin-top:15px;
          padding:12px 20px;
          border:none;
          background:#111827;
          color:white;
          border-radius:5px;
          cursor:pointer;
        }

        .budget-bar{
          width:100%;
          height:20px;
          background:#ddd;
          border-radius:10px;
          overflow:hidden;
          margin-top:10px;
        }

        .budget-fill{
          height:100%;
          transition:0.3s;
        }

        footer{
          text-align:center;
          padding:20px;
        }

        /* Animation */
        .animate-on-show{
          opacity:0;
          transform:translateY(20px);
        }

        .animate-on-show.visible{
          animation:fadeIn 1s ease forwards;
        }

        @keyframes fadeIn{
          from{
            opacity:0;
            transform:translateY(20px);
          }

          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        #sidebar{
          position:fixed;
          left:${sidebarOpen ? "0" : "-250px"};
          top:0;
          width:250px;
          height:100vh;
          background:#111827;
          transition:0.3s;
          z-index:100;
          padding-top:50px;
        }

        #sidebar ul{
          list-style:none;
        }

        #sidebar li{
          margin:20px;
        }

        #sidebar a{
          color:white;
          text-decoration:none;
        }
      `}</style>

      {/* Header */}
      <header>
        <div className="home">
          <nav>
            <Menu
              style={{ cursor: "pointer" }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />

            <h1>Savoney</h1>
          </nav>

          {/* Sidebar */}
          <div id="sidebar">
            <ul>
              <li>
                <a href="#dashboard">
                  <Home size={18} /> Dashboard
                </a>
              </li>

              <li>
                <a href="#income">
                  <BarChart2 size={18} /> Income
                </a>
              </li>

              <li>
                <a href="#budget">
                  <Bell size={18} /> Budget
                </a>
              </li>

              <li>
                <a href="#expense">
                  <MessageCircle size={18} /> Expense
                </a>
              </li>

              <li>
                <a href="#">
                  <PieChart size={18} /> Reset
                </a>
              </li>
            </ul>
          </div>

          {/* Hero */}
          <div className="heading">
            <h1>Welcome to SAVONEY</h1>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <section
        className="animate-on-show dashboard"
        id="dashboard"
      >
        <div className="container">
          <h2>Dashboard</h2>

          <div className="dashboard_content">
            <div className="item">
              <ThumbsUp />
              <h3>Total Balance</h3>
              <h2>₹{totalBalance}</h2>
            </div>

            <div className="item">
              <MessagesSquare />
              <h3>Total Income</h3>
              <h2>₹{totalIncome}</h2>
            </div>

            <div className="item">
              <Share2 />
              <h3>Total Expense</h3>
              <h2>₹{totalExpense}</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Income */}
      <section className="animate-on-show" id="income">
        <div className="container">
          <h2>Income Details</h2>

          <form>
            <input
              type="number"
              placeholder="Amount"
              value={incomeForm.amount}
              onChange={(e) =>
                setIncomeForm({
                  ...incomeForm,
                  amount: e.target.value,
                })
              }
            />

            <input
              type="date"
              value={incomeForm.date}
              onChange={(e) =>
                setIncomeForm({
                  ...incomeForm,
                  date: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Remarks"
              value={incomeForm.remarks}
              onChange={(e) =>
                setIncomeForm({
                  ...incomeForm,
                  remarks: e.target.value,
                })
              }
            />

            <select
              value={incomeForm.source}
              onChange={(e) =>
                setIncomeForm({
                  ...incomeForm,
                  source: e.target.value,
                })
              }
            >
              <option value="earning">Earning</option>
              <option value="saving">Saving</option>
              <option value="others">Others</option>
            </select>
          </form>

          <button className="btn" onClick={addIncome}>
            Add <Navigation size={16} />
          </button>
        </div>

        {/* Income History */}
        <div className="container">
          <h2>Income History</h2>

          {incomeData.map((item, index) => (
            <div key={index}>
              ₹{item.amount} - {item.source} - {item.date}
            </div>
          ))}
        </div>

        {/* Income Chart */}
        <div className="container">
          <h2>Income Chart</h2>

          <Pie data={incomeChartData} />
        </div>
      </section>

      {/* Budget */}
      <section className="animate-on-show" id="budget">
        <div className="container">
          <h2>Budget Details</h2>

          <form>
            <input
              type="number"
              placeholder="Budget Amount"
              value={budgetForm.amount}
              onChange={(e) =>
                setBudgetForm({
                  ...budgetForm,
                  amount: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Budget Type"
              value={budgetForm.type}
              onChange={(e) =>
                setBudgetForm({
                  ...budgetForm,
                  type: e.target.value,
                })
              }
            />
          </form>

          <button className="btn" onClick={addBudget}>
            Next <Navigation size={16} />
          </button>
        </div>

        {/* Budget List */}
        <div className="container">
          <h2>Budget List</h2>

          {Object.keys(budgets).map((key) => {
            const budget = budgets[key];

            const percentage =
              (budget.spent / budget.limit) * 100;

            return (
              <div key={key} style={{ marginBottom: "20px" }}>
                <h4>{key}</h4>

                <div className="budget-bar">
                  <div
                    className="budget-fill"
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                      background:
                        percentage > 100 ? "red" : "green",
                    }}
                  />
                </div>

                <p>
                  ₹{budget.spent} / ₹{budget.limit}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Expense */}
      <section className="animate-on-show" id="expense">
        <div className="container">
          <h2>Expense Details</h2>

          <form>
            <input
              type="number"
              placeholder="Expense Amount"
              value={expenseForm.amount}
              onChange={(e) =>
                setExpenseForm({
                  ...expenseForm,
                  amount: e.target.value,
                })
              }
            />

            <input
              type="date"
              value={expenseForm.date}
              onChange={(e) =>
                setExpenseForm({
                  ...expenseForm,
                  date: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Expense Remarks"
              value={expenseForm.remarks}
              onChange={(e) =>
                setExpenseForm({
                  ...expenseForm,
                  remarks: e.target.value,
                })
              }
            />

            <select
              value={expenseForm.source}
              onChange={(e) =>
                setExpenseForm({
                  ...expenseForm,
                  source: e.target.value,
                })
              }
            >
              <option value="">Select Type</option>

              {Object.keys(budgets).map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
          </form>

          <button className="btn" onClick={addExpense}>
            Next <Navigation size={16} />
          </button>
        </div>

        {/* Expense History */}
        <div className="container">
          <h2>Expense History</h2>

          {expenseData.map((item, index) => (
            <div key={index}>
              ₹{item.amount} - {item.source} - {item.date}
            </div>
          ))}
        </div>

        {/* Expense Chart */}
        <div className="container">
          <h2>Expense Chart</h2>

          <Pie data={expenseChartData} />
        </div>
      </section>

      {/* Footer */}
      <footer>
        made with ❤️ by <span>Priya</span>
      </footer>
    </div>
  );
};

export default Savoney;