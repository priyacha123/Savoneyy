// ==============sidebar======================
const sideBar = document.getElementById("sidebar");

document.querySelectorAll(".listItem").forEach((item) => {
  item.addEventListener('click', () => {
    sideBar.style.left = "-100%";
  });
})


document.querySelector(".bx-menu").addEventListener('click', () => {
  if (sideBar.style.left === "-100%") {
    sideBar.style.left = 0;
  } else {
    sideBar.style.left = "-100%";
  }
});

document.getElementById("reset").addEventListener('click', resetData)
  
  function resetData(){
  // --------------------------dashboard------------------------
  totalBalance.textContent = 0;
  totalIncome.textContent = 0;
  totalExpense.textContent = 0;

  // ----------------------------income----------------------
  incomeList = [];
  incomeList.length = 0;

// if(myPieChart) {
//   myPieChart.destroy();
// }

  document.querySelector(".income-history-content").innerHTML = "";



  localStorage.removeItem("incomeList")
  // localStorage.removeItem("chartData")
  console.log("income reset");
  

  // ----------------------------expense----------------------
  expenseList.length = 0;

  // if(myExpensePieChart) {
  //   myExpensePieChart.destroy();
  // }



  document.querySelector(".expense-history-content").innerHTML = "";

  document.getElementById('expense-source').innerHTML = "";
  const defaultValue = document.createElement("option");
  defaultValue.value = "Select-type";
  defaultValue.textContent = "Select-type";
  document.getElementById('expense-source').appendChild(defaultValue);



  localStorage.removeItem("expenseList")
  // localStorage.removeItem("expenseChartData")
  localStorage.removeItem("expenseOptions")

  console.log("expense reset");



  // ----------------------------budget----------------------
  budgetList.length = 0;
  budgets = {};

  // document.querySelector("#budget-bars").innerHTML = ""

  console.log("budget reset 2");


  // const budgetBars = document.querySelector("#budget-bars");
  // if (budgetBars) budgetBars.innerHTML = "";

  console.log("budget reset 3");

  
  const budgetBarsContainer = document.querySelector(".budget-bar-container"); 
  
  if (budgetBarsContainer) {
    budgetBarsContainer.innerHTML = "";
  }
  
  console.log("budget reset 4");

  
  localStorage.removeItem("budgets")



  console.log("budget reset");




// ------------------------------------------------------
localStorage.clear();


  location.reload();
};

// =====================Dashboard================================

const totalBalance = document.getElementById("total_balance");
const totalIncome = document.getElementById("total_income");
const totalExpense = document.getElementById("total_expense");

function updateDashboard() {
  let totalIncomeAmount = 0;
  let totalExpenseAmount = 0;
  let totalBalanceAmount = 0;

  // income amount
  incomeList.forEach((incomeObject) => {
    totalIncomeAmount += Number(incomeObject.amount);
  });

  // expense amount
  expenseList.forEach((expenseObject) => {
    totalExpenseAmount += Number(expenseObject.amount);
  });

  // Calculate the total balance

  totalIncome.textContent = Number(totalIncomeAmount);
  totalExpense.textContent = Number(totalExpenseAmount);

  totalBalanceAmount = totalIncomeAmount - totalExpenseAmount;
  totalBalance.textContent = totalBalanceAmount;

  // totalBalance.innerHTML =
  //   Number(totalBalanceAmount) < 0 ? 0 : Number(totalBalanceAmount);

  console.log("Dashboard updated!");
  // saveToLocalStorage()
  // localStorage.clear();

}

// ==========================income======================
let incomeList = [];
const inputElementAmount = document.getElementById("amount");
const inputElementDate = document.getElementById("date");
const inputElementRemarks = document.getElementById("remarks");
const inputElementSource = document.getElementById("source");

function addIncomeList() {
  const incomeAmount = Number(inputElementAmount.value);
  const incomeDate = inputElementDate.value;
  const incomeRemarks = inputElementRemarks.value;
  const incomeSource = inputElementSource.value;

  incomeList.push({
    amount: incomeAmount,
    date: incomeDate,
    remarks: incomeRemarks,
    source: incomeSource,
  });

  console.log("income", incomeList.amount);

  inputElementAmount.value = "";
  inputElementDate.value = "";
  inputElementRemarks.value = "";
  inputElementSource.value = "";

  renderIncomeList();
  saveToLocalStorage();
  // localStorage.clear();

}

function renderIncomeList() {
  let incomeHTML = "";

  incomeList.forEach((incomeObject, index) => {
    const incomeHtml = `
          <div class="js-income-item">
              <p class="js-income-para">${incomeObject.amount} <span> from </span> ${incomeObject.remarks} <span> on </span> ${incomeObject.date} <span> as </span> ${incomeObject.source}<p>
          </div>
          `;
    incomeHTML += incomeHtml;
  });
  document.querySelector(".income-history-content").innerHTML = incomeHTML;

  console.log(totalBalance, totalIncome, totalExpense);

  updateDashboard();
  // saveToLocalStorage();
}

// ======================income pie-chart ====================
const data = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [
        "rgb(153, 102, 255)",
        "rgb(48, 192, 144)",
        "rgb(255, 159, 64)",
        "rgb(129, 129, 129)",
        "rgb(255, 105, 92)",
        "rgb(75, 192, 192)",
        "rgb(205, 92, 92)",
        "rgb(129, 199, 132)",
        "rgb(179, 179, 179)",
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

const savedData = localStorage.getItem("chartData");
if (savedData) {
  const parsedData = JSON.parse(savedData);
  data.labels = parsedData.labels;
  data.datasets[0].data = parsedData.datasets[0].data;
}

const config = {
  type: "pie",
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Income Sources",
      },
    },
  },
};

const ctx = document.getElementById("myPieChart").getContext("2d");

const myPieChart = new Chart(ctx, config);

function updateChart() {
  const incomeAmount = parseInt(document.getElementById("amount").value);
  const incomeLabel = document.getElementById("remarks").value;

  myPieChart.data.labels.push(incomeLabel);
  myPieChart.data.datasets[0].data.push(incomeAmount);

  myPieChart.update();

  //================localStorage================
  const dataToSave = {
    labels: myPieChart.data.labels,
    datasets: myPieChart.data.datasets,
  };
  localStorage.setItem("chartData", JSON.stringify(dataToSave));

  // localStorage.clear();
}

// ===============================budget==========================
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("budget-btn").addEventListener("click", categoryBudget);
  document.getElementById("expense-btn").addEventListener("click", addExpense);
});

let budgetList = [];
let budgets = {};
const inputBudgetAmount = document.getElementById("budget-amount");
const inputBudgetType = document.getElementById("budget-type");
const budgetBars = document.getElementById("budget-bars");

function addOption(category) {
  const selectDropdown = document.getElementById("expense-source");

  const existingOption = [...selectDropdown.options].find(
    (opt) => opt.value === category
  );

  if (!existingOption) {
    const newOption = document.createElement("option");
    newOption.value = category;
    newOption.text = category;
    selectDropdown.appendChild(newOption);
    console.log(selectDropdown);

    saveOption(category)
    saveToLocalStorage(category);
  } 
  // localStorage.clear()
}

function categoryBudget() {
  const category = inputBudgetType.value.trim();
  const budgetAmount = parseFloat(Number(inputBudgetAmount.value));

  budgetList.push({
    amount: budgetAmount,
    type: category,
  });

  if (budgetAmount <= 0) {
    alert("Budget amount can't be negative.");
    return;
  }
  if (!category) {
    alert("Please enter a valid budget type.");
    return;
  }

  if (!budgets[category]) {
    budgets[category] = { budget: 0, expenses: 0 };
  }

  budgets[category].budget = budgetAmount;

  console.log("hiii", budgets[category].budget);

  // alert(`Budget for ${category} set to $${budgetAmount}`);

  inputBudgetType.value = "";
  inputBudgetAmount.value = "";

  addOption(category);
  updateBudgetBar(category);
  // localStorage.clear();
}

function addExpense() {
  let category = inputElementSource2.value.trim();
  let expenseAmount = parseFloat(Number(inputElementAmount2.value));

  expenseList.forEach((expenseObject) => {
    expenseAmount = Number(expenseObject.amount);
    category = expenseObject.source;
  });

  console.log("totalExpenseAmountBudget", expenseAmount);
  console.log("totalExpenseSourceBudget", category);


  if (expenseAmount <= 0) {
    alert("Expense amount can't be negative.");
    return;
  }

  if (!category) {
    alert("Please select a valid expense source.");
    return;
  }

  if (!budgets[category]) {
    alert(`No budget exists for ${category}. Please add a budget first.`);
    return;
  }

  budgets[category].expenses += expenseAmount;
  console.log("  budgets[category].expenses",   budgets[category].expenses);

  updateBudgetBar(category);

  inputElementAmount2.value = "";

  // localStorage.clear();
}

function updateBudgetBar(category) {
let expenseAmountBar = 0;
let budgetAmountBar = 0;

//----------------------------------------- expense amount-------------------------------------
  expenseList.forEach((expenseObject) => {
    if(expenseObject.source === category) {
      expenseAmountBar += Number(expenseObject.amount) 
    }
    else {
      expenseAmountBar = budgets[category].expenses;
    }
  });

//----------------------------------------- budget amount-------------------------------------

  budgetList.forEach((budgetObject) => {
    if(budgetObject.type === category) {
      budgetAmountBar += Number(budgetObject.amount) 
    }
    else {
      budgetAmountBar = budgets[category].budget;
    }
  });

// ------------------------------percentage used of budget bar--------------------------------------
  const categoryExpenses = parseFloat(expenseAmountBar) || 0;
  const categoryBudget = parseFloat(budgetAmountBar) || 1;
  const percentageUsed = (categoryExpenses / categoryBudget) * 100;

  console.log("update budget");
  console.log(categoryExpenses);
  console.log(categoryBudget);
  console.log(percentageUsed);
  
let budgetBarContainer = document.getElementById(`budget-bar-${category}`);
if (!budgetBarContainer) {
    budgetBarContainer = document.createElement("div");
    budgetBarContainer.id = `budget-bar-${category}`;
    budgetBarContainer.innerHTML = `
      <strong>${category}</strong>
       <div class="budget-bar">
              <div class="budget-fill">
                <span class="budget-percentage">${Math.min(
                  percentageUsed.toFixed(2),
                  100
                )}%</span>
              </div>
        </div>
      `;
    budgetBars.appendChild(budgetBarContainer);
  }

  const budgetFill = budgetBarContainer.querySelector(".budget-fill");
  budgetFill.style.width = `${Math.min(percentageUsed, 100)}%`;
  budgetFill.querySelector(".budget-percentage").textContent = `${Math.min(
    percentageUsed.toFixed(2),
    100
  )}%`;

  console.log("update budget 3");

  // Change color if over budget
  if (percentageUsed > 100) {
    budgetFill.classList.add("over-budget");
  } else {
    budgetFill.classList.remove("over-budget");
  }

  console.log("update budget 4");

}

// ========================expense========================
let expenseList = [];
const inputElementAmount2 = document.getElementById("expense-amount");
const inputElementDate2 = document.getElementById("expense-date");
const inputElementRemarks2 = document.getElementById("expense-remarks");
const inputElementSource2 = document.getElementById("expense-source");

function addExpenseList() {
  const expenseAmount = Number(inputElementAmount2.value);
  const expenseDate = inputElementDate2.value;
  const expenseRemarks = inputElementRemarks2.value;
  const expenseSource = inputElementSource2.value;

  expenseList.push({
    amount: expenseAmount,
    date: expenseDate,
    remarks: expenseRemarks,
    source: expenseSource,
  });

  // console.log("expense", expenseList.amount);

  inputElementAmount2.value = "";
  inputElementDate2.value = "";
  inputElementRemarks2.value = "";
  inputElementSource2.value = "";

  renderExpenseList();
  saveToLocalStorage();
  // localStorage.clear();
}

function renderExpenseList() {
  let expenseHTML = "";

  expenseList.forEach((expenseObject, index) => {
    const expenseHtml = `
          <div class="js-expense-item">
              <p class="js-expense-para">${expenseObject.amount} <span> from </span> ${expenseObject.remarks} <span> on </span> ${expenseObject.date} <span> as </span> ${expenseObject.source}<p>
          </div>
          `;
    expenseHTML += expenseHtml;
  });
  document.querySelector(".expense-history-content").innerHTML = expenseHTML;

  console.log(totalBalance, totalIncome, totalExpense);

  updateDashboard();
}

// ======================expense pie-chart ====================
const expenseData = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [
        "rgb(48, 192, 144)",
        "rgb(255, 159, 64)",
        "rgb(179, 179, 179)",
        "rgb(129, 129, 129)",
        "rgb(255, 105, 92)",
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(205, 92, 92)",
        "rgb(153, 102, 255)",
        "rgb(129, 199, 132)",
        "rgb(75, 192, 192)",
      ],
      hoverOffset: 4,
    },
  ],
};

const expenseSavedData = localStorage.getItem("expenseChartData");
if (expenseSavedData) {
  const expenseParsedData = JSON.parse(expenseSavedData);
  expenseData.labels = expenseParsedData.labels;
  expenseData.datasets[0].data = expenseParsedData.datasets[0].data;
}

const expenseConfig = {
  type: "pie",
  data: expenseData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Expense Sources",
      },
    },
  },
};

const expense_ctx = document
  .getElementById("myExpensePieChart")
  .getContext("2d");

const myExpensePieChart = new Chart(expense_ctx, expenseConfig);

function updateExpenseChart() {
  const expenseAmount = parseInt(
    document.getElementById("expense-amount").value
  );
  const expenseLabel = document.querySelector("#expense-source").value;

  myExpensePieChart.data.datasets[0].data.push(expenseAmount);
  myExpensePieChart.data.labels.push(expenseLabel);

  myExpensePieChart.update();

  
  //================localStorage================
  const dataToSaveExpense = {
    labels: myExpensePieChart.data.labels,
    datasets: myExpensePieChart.data.datasets,
  };
  localStorage.setItem("expenseChartData", JSON.stringify(dataToSaveExpense));
}

// Animation on scroll

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".animate-on-show");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
});


// =============================================localStorages ============================================
document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  loadOptions();
  // localStorage.clear();
});

function loadFromLocalStorage(category) {
  const savedIncomeList = JSON.parse(localStorage.getItem("incomeList"));
  const savedExpenseList = JSON.parse(localStorage.getItem("expenseList"));
  const savedBudgets = JSON.parse(localStorage.getItem("budgets"));

  if (savedIncomeList) {
    incomeList.push(...savedIncomeList);
  }

  if (savedExpenseList) {
    expenseList.push(...savedExpenseList);
  }

  if (savedBudgets) {
    for (const category in savedBudgets) {
      budgets[category] = savedBudgets[category];
      budgetList.push({ amount: savedBudgets[category].budget, type: category });
    }
  }
  
  // localStorage.clear();


  renderIncomeList();
  renderExpenseList();
  updateDashboard();
  // updateBudgetBar();
  Object.keys(budgets).forEach(category => updateBudgetBar(category));
};

function saveToLocalStorage(category) {
  localStorage.setItem("incomeList", JSON.stringify(incomeList));
  localStorage.setItem("expenseList", JSON.stringify(expenseList));
  localStorage.setItem("budgets", JSON.stringify(budgets));

  // localStorage.clear();

}

// =================Expense option localstorage =================

function saveOption(category) {
  let savedOptions = new Set(
    JSON.parse(localStorage.getItem("expenseOptions")) || []
  );

  savedOptions.add(category);
  localStorage.setItem("expenseOptions", JSON.stringify([...savedOptions]));

  // localStorage.clear();


}

function loadOptions() {
  const selectDropdown = document.getElementById("expense-source");
  let savedOptions = new Set(
    JSON.parse(localStorage.getItem("expenseOptions")) || []
  );

  savedOptions.forEach((category) => {
    const newOption = document.createElement("option");
    newOption.value = category;
    newOption.text = category;
    selectDropdown.appendChild(newOption);
  });
  // localStorage.clear();
  
}