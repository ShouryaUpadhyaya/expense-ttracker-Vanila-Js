// add date expense paid,
// add sort fuctionality?
// sort by date chosen by user,week,day
// add option to export as txt
const addRowButton = document.querySelector("#addRow");
const templateRow = document
  .querySelector("#template")
  .content.querySelector("tr");
const table = document.querySelector(".table");
const totalRow = table.querySelector(".totalRow");
const totalCost = document.querySelector("[data-total-cost]");
const sort = document.querySelector(".sort");
let rows = {};
let allExpensesTotal = 0;
function Row(name, type, cost, rowCode) {
  this.name = name;
  this.type = type;
  this.cost = cost;
  this.rowCode = rowCode;
}
function expenseNameRowObj(name, row) {
  this.name = name;
  this.row = row;
}
function sortByType() {
  let rowsFromLocalStorage = JSON.parse(localStorage.getItem("rows"));
  let sortedByTypeArray = [];
  let sortedExpenseType = [];
  console.log(rowsFromLocalStorage);
  for (const row in rowsFromLocalStorage) {
    if (Object.hasOwnProperty.call(rowsFromLocalStorage, row)) {
      let currentRow = rowsFromLocalStorage[row];
      sortedExpenseType.push(currentRow.type);
    }
  }
  sortedExpenseType.sort();
  sortedExpenseType.forEach((type) => {
    for (const row in rowsFromLocalStorage) {
      if (Object.hasOwnProperty.call(rowsFromLocalStorage, row)) {
        const currentRow = rowsFromLocalStorage[row];
        if (type === currentRow.type) {
          sortedByTypeArray.push(currentRow);
          break;
        }
      }
    }
  });
  removeAllRows();
  sortedByTypeArray.forEach((row) => {
    currentRow = addRow();
    let expenseName = currentRow.querySelector("[data-expense-name]");
    let expenseType = currentRow.querySelector(".expenseType");
    let cost = currentRow.querySelector("[data-expense-cost]");
    expenseName.value = row.name;
    expenseType.value = row.type;
    cost.value = row.cost;
  });
}
function removeAllRows() {
  let rows = allRows();
  rows.forEach((row) => {
    if (row.classList.contains("tempRow")) {
      row.remove();
    }
  });
}
function RowNumber(currentRow) {
  let rowsArray = Array.from(table.querySelectorAll(".tempRow"));
  let rowNumber = 1;
  for (rowNumber; rowNumber < rowsArray.length; rowNumber++) {
    if (currentRow === rowsArray[rowNumber - 1]) {
      break;
    }
  }
  return rowNumber;
}
function addRow(e) {
  let clonedRow = templateRow.cloneNode(true);
  table.appendChild(clonedRow);
  let currentRow = table.lastElementChild;
  table.append(totalRow);
  return currentRow;
}
function calcTotal() {
  let allCosts = document.querySelectorAll("[data-expense-cost]");
  allCosts.forEach((cost) => {
    allExpensesTotal += Number(cost.value);
  });
  totalCost.innerText = `₹ ${allExpensesTotal}`;
}
function allRows() {
  let allrows = Array.from(table.querySelectorAll("tr"));
  return allrows;
}
function loadOldData() {
  const data = localStorage.getItem("rows");
  let jsonData = JSON.parse(data);
  for (const key in jsonData) {
    if (Object.hasOwnProperty.call(jsonData, key)) {
      const row = jsonData[key];
      let currentRow = addRow();
      let rowExpenseName = currentRow.querySelector("[data-expense-name]");
      let rowType = currentRow.querySelector("select");
      let rowCost = currentRow.querySelector("[data-expense-cost]");
      rowExpenseName.value = row.name;
      rowType.value = row.type;
      rowCost.value = row.cost;
    }
  }
  calcTotal();
}
function sortByCost(e) {
  let rowsFromLocalStorage = JSON.parse(localStorage.getItem("rows"));
  let costsSortedFromStorage = [];
  let sortedByCostRows = [];
  for (const row in rowsFromLocalStorage) {
    if (Object.hasOwnProperty.call(rowsFromLocalStorage, row)) {
      let selectedRow = rowsFromLocalStorage[row];
      costsSortedFromStorage.push(selectedRow.cost);
    }
  }
  costsSortedFromStorage.sort((a, b) => {
    return a - b;
  });
  console.log("costsSortedFromStorage", costsSortedFromStorage);
  costsSortedFromStorage.forEach((cost) => {
    for (const row in rowsFromLocalStorage) {
      if (Object.hasOwnProperty.call(rowsFromLocalStorage, row)) {
        const selectedRow = rowsFromLocalStorage[row];
        if (selectedRow.cost === cost) {
          sortedByCostRows.push(selectedRow);
        }
      }
    }
  });
  console.log("sortedByCostRows: ", sortedByCostRows);
  removeAllRows();
  sortedByCostRows.forEach((row) => {
    let currentRow = addRow();
    let expenseName = currentRow.querySelector("[data-expense-name]");
    let expenseType = currentRow.querySelector(".expenseType");
    let cost = currentRow.querySelector("[data-expense-cost]");
    expenseName.value = row.name;
    expenseType.value = row.type;
    cost.value = row.cost;
  });
  console.log("in sort by cost");
}
loadOldData();
addRowButton.addEventListener("click", (e) => {
  addRow(e);
  calcTotal();
});
sort.addEventListener("change", (e) => {
  if (sort.value === "sortByType") {
    sortByType();
  } else if (sort.value === "sortByCost") {
    sortByCost(e);
  }
});
table.addEventListener("input", (e) => {
  let currentRow = e.target.parentNode.parentNode.parentNode;
  let rowNumber = RowNumber(currentRow);
  let expenseName = currentRow.querySelector("[data-expense-name]").value;
  let expenseType = currentRow.querySelector(".expenseType").value;
  let cost = currentRow.querySelector("[data-expense-cost]").value;
  let row = new Row(expenseName, expenseType, cost, currentRow);
  let rowName = `Row${rowNumber}`;
  rows[rowName] = row;
  localStorage.setItem("rows", JSON.stringify(rows));
});
