// add sort fuctionality
const addRowButton = document.querySelector("#addRow");
const templateRow = document
  .querySelector("#template")
  .content.querySelector("tr");
const table = document.querySelector(".table");
const totalRow = table.querySelector(".totalRow");
const totalCost = document.querySelector("[data-total-cost]");
let allExpensesTotal = 0;
console.log(totalCost);

function addRow(e) {
  //   totalRow.remove();
  let clonedRow = templateRow.cloneNode(true);
  console.log(table.appendChild(clonedRow));
  table.append(totalRow);
}
function calcTotal() {
  let allCosts = document.querySelectorAll("[data-expense-cost]");
  console.log(allCosts);
  allCosts.forEach((cost) => {
    allExpensesTotal += Number(cost.value);
  });
  totalCost.innerText = `₹ ${allExpensesTotal}`;
}
addRowButton.addEventListener("click", (e) => {
  addRow(e);
  calcTotal();
});
