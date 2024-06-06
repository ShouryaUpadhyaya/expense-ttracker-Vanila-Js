// add sort fuctionality?
// add to local storage
// store value of name,type,cost,whole row in an object
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
  return Array.from(table.querySelectorAll("tr"));
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
  console.log("in sort by cost");
  let costList = document.querySelectorAll("[data-expense-cost]");
  let arangedList;
  costList.forEach((cost) => {
    // check if it was bigger than
  });
}
loadOldData();
addRowButton.addEventListener("click", (e) => {
  addRow(e);
  calcTotal();
});
sort.addEventListener("change", (e) => {
  if (sort.value === "sortByType") {
    const expenseArray = Array.from(document.querySelectorAll(".expenseType"));
    let rows = [];
    let expenseNameArray = [];
    expenseArray.forEach((expense) => {
      expenseNameArray.push({
        name: expense.value,
        row: expense.parentNode.cloneNode(true),
      });
    });
    let expenseArraySorted = expenseNameArray.toSorted();
    // console.log(expenseArraySorted);
    expenseArraySorted.forEach((expenseNameOnly) => {
      rows.push(expenseNameOnly.parentNode);
    });
    console.log(rows);
    // get rows from sorted array
    // remove all the rows from the table
    // add all the rows
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
