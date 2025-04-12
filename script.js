
// ==============sidebar======================
const sideBar = document.getElementById("sidebar");

function sidebarClick() {
  if (sideBar.style.left === "-100%") {
    sideBar.style.left = 0;
  } else {
    sideBar.style.left = "-100%";
  }
}

// ====================dashboard============================
const totalBalance = document.getElementById("total_balance");
const totalIncome = document.getElementById("total_income");
const totalExpense = document.getElementById("total_expense");


// function dashboardIncome() {
//   let currentBalance = Number(totalBalance.textContent);
//   let currentIncome = Number(totalIncome.textContent);
//   let currentExpense = Number(totalExpense.textContent);

//   // Add new values to the existing ones

//   incomeList.forEach((incomeObject, index) => {
//     currentIncome += incomeObject.amount;
//     console.log("income" , currentIncome);
//   });


//   expenseList.forEach((expenseObject, index) => {
//     currentExpense += expenseObject.amount;
//     console.log("ex", currentExpense);
//   });

//   currentBalance += currentIncome - currentExpense;

//   // updated dashboard
//   totalBalance.textContent = currentBalance 
//   totalIncome.textContent = currentIncome;
//   totalExpense.textContent = currentExpense;

//   if (Number(totalBalance.textContent) < 0) {
//     totalBalance.innerHTML = 0;
//   }

//   console.log("hii");
  

// }

// function updateDashboard() {
//   let totalIncomeAmount = 0;
//   let totalExpenseAmount = 0;
//   let totalBalanceAmount = 0;

//   console.log("Dashboard updated!1");

//   // Calculate total income from the incomeList

//   incomeList.forEach((incomeObject, index) => {
//     totalIncomeAmount = Number(incomeObject.amount);
//     totalIncomeAmount += totalIncomeAmount;

//     console.log("income" , totalIncomeAmount);
//   });


//   expenseList.forEach((expenseObject, index) => {
    
//     totalExpenseAmount = Number(expenseObject.amount);
//     totalExpenseAmount += totalExpenseAmount;
//     console.log("ex", totalExpenseAmount);
//   });



//   // Update the dashboard values
  
//   // totalBalance.textContent = currentBalance < 0 ? 0 : currentBalance; 
//   totalIncome.textContent = totalIncomeAmount;
//   console.log("Dashboard updated!2");
  
//   totalExpense.textContent = totalExpenseAmount;
//   console.log("Dashboard updated!3");

//   totalBalanceAmount = totalIncomeAmount - totalExpenseAmount;
//   console.log("Dashboard updated!");



// }



function updateDashboard() {
  let totalIncomeAmount = 0;
  let totalExpenseAmount = 0;
  let totalBalanceAmount = 0;

  // Calculate total income from the incomeList
  incomeList.forEach((incomeObject) => {
    totalIncomeAmount += Number(incomeObject.amount); 
    console.log("income" , totalIncomeAmount);

  });

  // Calculate total expense from the expenseList
  expenseList.forEach((expenseObject) => {
    totalExpenseAmount += Number(expenseObject.amount); 
    console.log("ex", totalExpenseAmount);

  });

  // Calculate the total balance
  
  totalIncome.textContent = Number(totalIncomeAmount); 

  totalExpense.textContent = Number((totalExpenseAmount)); 

  console.log("Dashboard updated! 1");


  // totalBalance.textContent =Number( totalIncomeAmount) - Number(totalExpenseAmount);

  totalBalanceAmount = totalIncomeAmount - totalExpenseAmount;
  totalBalance.textContent = Number(totalBalanceAmount) < 0 ? 0 : Number(totalBalanceAmount);

  // const totalBalanceAmount = totalIncome.textContent - totalExpense.textContent;
  // totalBalance.textContent = totalBalanceAmount.toFixed(2);


  console.log("Dashboard updated!");
}






// ==========================income======================
const incomeList = [];
const inputElementAmount = document.getElementById("amount");
const inputElementDate = document.getElementById("date");
const inputElementRemarks = document.getElementById("remarks");
const inputElementSource = document.getElementById("source");

// // -------------------localStorage---------------
// document.addEventListener("DOMContentLoaded", () => {
//   loadFromLocalStorage();
//   localStorage.clear();
// });

  
  
// function loadFromLocalStorage()  {
//   const savedIncomeList = JSON.parse(localStorage.getItem("incomeList"));
//   const savedExpenseList = JSON.parse(localStorage.getItem("expenseList"));
//   const savedBudgets = JSON.parse(localStorage.getItem("budgets"));
//   let categories = JSON.parse(localStorage.getItem("categories")) ;

//   if (savedIncomeList) {
//     incomeList.push(...savedIncomeList);
//   }

//   if (savedExpenseList) {
//     expenseList.push(...savedExpenseList);
//   }

//   if (!categories.includes(category)) {
//     categories.push(category);
//   }

//   if (savedBudgets) {
//     for (const category in savedBudgets) {
//       budgets[category] = savedBudgets[category];
//       budgetList.push({ amount: savedBudgets[category].budget, type: category });
//     }
//   }

//   renderIncomeList();
//   renderExpenseList();
//   addOption();
//   Object.keys(budgets).forEach(category => updateBudgetBar(category));
// };

// function saveToLocalStorage() {
//   localStorage.setItem("incomeList", JSON.stringify(incomeList));
//   localStorage.setItem("expenseList", JSON.stringify(expenseList));
//   localStorage.setItem("budgets", JSON.stringify(budgets));
//   localStorage.setItem("categories", JSON.stringify(categories));
  
// }

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




  inputElementAmount.value = "";
  inputElementDate.value = "";
  inputElementRemarks.value = "";
  inputElementSource.value = "";

    // dashboardIncome()
    renderIncomeList();
    updateChart();
    saveToLocalStorage();

}

function renderIncomeList() {
  let incomeHTML = "";

  incomeList.forEach((incomeObject, index) => {
    // console.log(incomeObject);
    // console.log(index);

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

}

// ======================income pie-chart ====================
const data = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [
        "rgb(205, 92, 92)",
        "rgb(153, 102, 255)",
        "rgb(129, 199, 132)",
        "rgb(75, 192, 192)",
        "rgb(179, 179, 179)",
        "rgb(48, 192, 144)",
        "rgb(255, 159, 64)",
        "rgb(129, 129, 129)",
        "rgb(255, 105, 92)",
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

  myPieChart.data.datasets[0].data.push(incomeAmount);
  myPieChart.data.labels.push(incomeLabel);

  myPieChart.update();

  // -----localStorage--------------
  // const dataToSave = {
  //   labels: myPieChart.data.labels,
  //   datasets: myPieChart.data.datasets,
  // };
  // localStorage.setItem("chartData", JSON.stringify(dataToSave));

  // localStorage.clear();

}

// ===============================budget==========================
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("budget-btn").addEventListener("click", () => {
    categoryBudget();
  });
});


//   console.log("DOM fully loaded!");

//   const budgetBars = document.getElementById("budget-bars");
//   if (!budgetBars) {
//     console.error("❌ #budget-bars still not found!");
//   } else {
//     console.log("✅ Found #budget-bars!");
//   }

//   document.getElementById("budget-btn").addEventListener("click", () => {
//     budgetSelect();
//     // categoryBudget();
//   });
// });

const budgetList = [];
const budgets = {};
const inputBudgetAmount = document.getElementById("budget-amount");
const inputBudgetType = document.getElementById("budget-type");
let budgetBars = document.getElementById("budget-bars");


// function budgetSelect() {
//   const budgetAmount = parseFloat(inputBudgetAmount.value);
//   const budgetType = inputBudgetType.value.trim();

//   budgetList.push({
//     amount: budgetAmount,
//     type: budgetType,
//   });

//   budgets[budgetType] = {
//     budget: budgetAmount,
//     expenses: 0,
//   };

//   renderBudgetList();
//   addOption();
//   updateBudgetBar(budgetType);

//   inputBudgetType.value = "";
//   inputBudgetAmount.value = "";
// }

// function renderBudgetList() {
//   const budgetType = inputBudgetType.value.trim();
//   let budgetHTML = "";

//   budgetList.forEach((budgetObject, index) => {
//     const budgetHtml = `
//         <div class="js-budget-item">
//             <p class="js-budget-para">${budgetObject.type} </p>
//         </div>
//          
//         `;
//     budgetHTML += budgetHtml;
//   });

//   categoryBudget() 
//   document.querySelector(".budget-list-content").innerHTML = budgetHTML;
 
// }

function addOption(category) {
  // const category = inputBudgetType.value;
  // console.log(newOptionValue);
  const selectDropdown = document.getElementById("expense-source");

  const existingOption = [...selectDropdown.options].find(
    (opt) => opt.value === category
  );

  // if (category.trim() !== "") {
    if (!existingOption) {
    const newOption = document.createElement("option");
    newOption.value = category;
    newOption.text = category;

    selectDropdown.appendChild(newOption);
    console.log(selectDropdown);
    
  } else {
    alert("Please select");
  }
  
}

function categoryBudget() {
  const category = inputBudgetType.value.trim();
  const budgetAmount = parseInt(inputBudgetAmount.value);

   budgetList.push({
        amount: budgetAmount,
        type: category,
      });

  if (isNaN(budgetAmount) || budgetAmount <= 0) {
    alert("Please enter a valid budget amount.");
    return;
  }
  if (!category || category.trim() === "") {
    alert("Please enter a valid budget type.");
    return;
  }

  if (!budgets[category]) {
    budgets[category] = { budget: 0, expenses: 0 };
  }

  budgets[category].budget = budgetAmount;

  // alert(`Budget for ${category} set to $${budgetAmount}`);

  inputBudgetType.value = "";
  inputBudgetAmount.value = "";

  addOption(category);
  updateBudgetBar(category);
  saveToLocalStorage();

  // console.log("hi");
}

function updateBudgetBar(category) {
  const categoryExpenses = parseFloat(budgets[category].expenses) || 0;
  const categoryBudget = parseFloat(budgets[category].budget) || 1;
  const percentageUsed = (categoryExpenses / categoryBudget) * 100;
  


  let budgetBarContainer = document.getElementById(`budget-bar-${category}`);
  if (!budgetBarContainer) {
    budgetBarContainer = document.createElement("div");
    budgetBarContainer.id = `budget-bar-${category}`;
    budgetBarContainer.innerHTML = `
    <strong>${category}</strong>
     <div class="budget-bar">
            <div class="budget-fill">
              <span class="budget-percentage">${Math.min(percentageUsed.toFixed(2), 100)}%</span>
            </div>
      </div>
    `;
    budgetBars.appendChild(budgetBarContainer);
  }

  const budgetFill = budgetBarContainer.querySelector(".budget-fill");
  budgetFill.style.width = `${Math.min(percentageUsed, 100)}%`;
  budgetFill.querySelector(".budget-percentage").textContent = `${Math.min(percentageUsed.toFixed(2), 100)}%`;

  // Change color if over budget
  if (percentageUsed > 100) {
    budgetFill.classList.add("over-budget");
  } else {
    budgetFill.classList.remove("over-budget");
  }
}

// ========================expense========================
const expenseList = [];
const inputElementAmount2 = document.getElementById("expense-amount");
const inputElementDate2 = document.getElementById("expense-date");
const inputElementRemarks2 = document.getElementById("expense-remarks");
const inputElementSource2 = document.getElementById("expense-source");

// function addExpenseList() {

//   const expenseAmount = parseFloat(inputElementAmount2.value);
//   const expenseDate = inputElementDate2.value;
//   const expenseRemarks = inputElementRemarks2.value;
//   const expenseSource = inputElementSource2.value;

//   expenseList.push({
//     amount: expenseAmount,
//     date: expenseDate,
//     remarks: expenseRemarks,
//     source: expenseSource,
//   });

//   updateBudget(expenseSource, expenseAmount);


//   dashboardIncome(Number(inputElementAmount.value), 0);
//   renderExpenseList();
//   updateExpenseChart();
//   saveToLocalStorage();

//   inputElementAmount2.value = "";
//   inputElementDate2.value = "";
//   inputElementRemarks2.value = "";
//   inputElementSource2.value = "";


// }

// function updateBudget(source, amount) {
//   if (budgets[source]) {
//     budgets[source].expenses += amount;
//     console.log(`Added $${amount} to ${source}. Total Expenses: $${budgets[source].expenses}`);
//     updateBudgetBar(source);
//   } else {
//     console.warn(`Unknown expense source: ${source}`);
//   }
// }

// function addExpense() {
//   const expenseAmount2 = parseFloat(inputElementAmount2.value); 
//   const expenseSource2 = inputElementSource2.value; 
//   console.log(budgets[category]);
  

//   // console.log(category);
//   expenseList.forEach((expenseObject, index) => {
//     if (expenseObject.source === category) {
//       if (expenseObject.source === budgets[category]) {
//         budgets[expenseSource2].expenses += expenseAmount2;
//        }
//       // console.log(expenseObject.amount);
//       budgets[category].expenses += expenseObject.amount;
//     }
//     updateBudgetBar(category);
//     console.log(`Added $${expenseObject.amount} to ${category}, Total Expenses: $${budgets[category].expenses}`);
//   });
// }

// function renderExpenseList() {
//   let expenseHTML = "";

//   expenseList.forEach((expenseObject, index) => {
//     // console.log(expenseObject);
//     // console.log(index);

//     const expenseHtml = `
//         <div class="js-expense-item">
//             <p class="js-expense-para">${expenseObject.amount} <span> from </span> ${expenseObject.remarks} <span> on </span> ${expenseObject.date} <span> as </span> ${expenseObject.source}<p>
//         </div>
//         `;
//     expenseHTML += expenseHtml;
//   });
//   document.querySelector(".expense-history-content").innerHTML = expenseHTML;
// }

// ----------------expense chart ----------------
// const expenseData = {
//   labels: [],
//   datasets: [
//     {
//       data: [],
//       backgroundColor: [
//         "rgb(75, 192, 192)",
//         "rgb(153, 102, 255)",
//         "rgb(255, 159, 64)",
//         "rgb(255, 105, 92)",
//         "rgb(255, 99, 132)",
//         "rgb(54, 162, 235)",
//         "rgb(255, 205, 86)",
//         "rgb(205, 92, 92)",
//         "rgb(179, 179, 179)",
//         "rgb(129, 199, 132)",
//         "rgb(129, 129, 129)",
//       ],
//       hoverOffset: 4,
//     },
//   ],
// };

// const expenseConfig = {
//   type: "pie",
//   data: expenseData,
//   options: {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Expense Sources",
//       },
//     },
//   },
// };

// const savedExpenseData = localStorage.getItem("expenseChartData");
// if (savedExpenseData) {
//   const parsedExpenseData = JSON.parse(savedExpenseData);
//   expenseData.labels = parsedData.labels;
//   expenseData.datasets[0].data = parsedData.datasets[0].data;
// }

// const expense_ctx = document
//   .getElementById("myExpensePieChart")
//   .getContext("2d");

// const myExpensePieChart = new Chart(expense_ctx, expenseConfig);

// function updateExpenseChart() {
//   const expenseAmount = parseFloat(document.getElementById("expense-amount").value
//   );
//   const expenseLabel = document.getElementById("expense-source").value;

//   if (expenseLabel === "select-type" || expenseLabel.trim() === "") {
//     alert("Please select a valid expense source.");
//     return;
//   }

//   myExpensePieChart.expenseData.datasets[0].data.push(expenseAmount);
//   myExpensePieChart.expenseData.labels.push(expenseLabel);

//   myExpensePieChart.update();

//   const dataToSaveExpense = {
//     labels: myExpensePieChart.expenseData.labels,
//     datasets: myExpensePieChart.expenseData.datasets,
//   };
//   localStorage.setItem("expenseChartData", JSON.stringify(dataToSaveExpense));
// }






// // Update pie chart from existing expense list
// function updateExpenseChartFromList() {
//   const groupedExpenses = {};
//   expenseList.forEach((expense) => {
//     if (!groupedExpenses[expense.source]) {
//       groupedExpenses[expense.source] = 0;
//     }
//     groupedExpenses[expense.source] += expense.amount;
//   });

//   myExpensePieChart.data.labels = Object.keys(groupedExpenses);
//   myExpensePieChart.data.datasets[0].data = Object.values(groupedExpenses);
//   myExpensePieChart.update();
// }

// ==============animation=======================





// // Animation on scroll





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




// --------------------------Expense lost-------------------


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




  inputElementAmount2.value = "";
  inputElementDate2.value = "";
  inputElementRemarks2.value = "";
  inputElementSource2.value = "";

    // dashboardIncome()
    renderExpenseList();
    updateExpenseChart();
    saveToLocalStorage();

}

function renderExpenseList() {
  let expenseHTML = "";

  expenseList.forEach((expenseObject, index) => {
    // console.log(incomeObject);
    // console.log(index);

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

  // dashboardIncome()
}

// ======================expense pie-chart ====================
const expenseData = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [
        "rgb(205, 92, 92)",
        "rgb(153, 102, 255)",
        "rgb(129, 199, 132)",
        "rgb(75, 192, 192)",
        "rgb(179, 179, 179)",
        "rgb(48, 192, 144)",
        "rgb(255, 159, 64)",
        "rgb(129, 129, 129)",
        "rgb(255, 105, 92)",
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

const expenseSavedData = localStorage.getItem("expenseChartData");
if (expenseSavedData) {
  const parsedData = JSON.parse(expenseSavedData);
  // data.labels = parsedData.labels;
  // expenseData.datasets[0].data = parsedData.datasets[0].data;

  myExpensePieChart.data.labels = parsedData.labels;
  myExpensePieChart.data.datasets[0].data = parsedData.datasets[0].data;
  myExpensePieChart.update();
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

const expense_ctx = document.getElementById("myExpensePieChart").getContext("2d");

const myExpensePieChart = new Chart(expense_ctx, expenseConfig);

function updateExpenseChart() {
  const expenseAmount = parseInt(document.getElementById("expense-amount").value);
  const expenseLabel = document.getElementById("expense-source").value;

  myExpensePieChart.data.datasets[0].data.push(expenseAmount);
  myExpensePieChart.data.labels.push(expenseLabel);

  myExpensePieChart.update();

  // -----localStorage--------------
  // const dataToSave = {
  //   labels: myExpensePieChart.data.labels,
  //   datasets: myExpensePieChart.data.datasets,
  // };
  // localStorage.setItem("expenseChartData", JSON.stringify(dataToSave));

  // localStorage.clear();

}


