const type = document.getElementById("type");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const incomeDisplay = document.getElementById("income-list");
const expenseDisplay = document.getElementById("expense-list");
const balance = document.getElementById("balance");

function recalculateBalance() {
  balance.innerHTML =
    parseInt(document.getElementById("income-total").innerHTML) -
    parseInt(document.getElementById("expense-total").innerHTML);
}

function addTransaction() {
  if (description.value === "" || amount.value === "") {
    alert("Please enter a description and amount");
  } else {
    let li = document.createElement("li");
    li.className = "item";
    let descriptionText = document.createElement("div");
    descriptionText.className = "itemDescription";
    descriptionText.innerHTML = description.value;
    let amountText = document.createElement("div");
    amountText.className = "itemAmount";
    amountText.innerHTML = "$" + parseInt(amount.value);
    let dateText = document.createElement("div");
    dateText.className = "itemDate";
    dateText.innerHTML = new Date().toJSON().slice(0, 10);
    let deleteButton = document.createElement("button");
    deleteButton.className = "itemDelete";
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", deleteTransaction);
    li.appendChild(descriptionText);
    li.appendChild(amountText);
    li.appendChild(dateText);
    li.appendChild(deleteButton);
    li.setAttribute("type", type.options[type.selectedIndex].value);
    let total;
    if (type.options[type.selectedIndex].value === "Income") {
      incomeDisplay.appendChild(li);
      total = document.getElementById("income-total");
    } else {
      expenseDisplay.appendChild(li);
      total = document.getElementById("expense-total");
    }
    total.innerHTML = parseInt(total.innerHTML) + parseInt(amount.value);
    recalculateBalance();
    description.value = "";
    amount.value = "";
  }
}

function deleteTransaction(e) {
  if (e.target.className === "itemDelete") {
    let totalType = e.target.parentElement.getAttribute("type");
    let total;
    if (totalType === "Income") {
      total = document.getElementById("income-total");
    } else {
      total = document.getElementById("expense-total");
    }
    total.innerHTML =
      parseInt(total.innerHTML) -
      parseInt(
        e.target.parentElement
          .getElementsByClassName("itemAmount")[0]
          .innerHTML.slice(1)
      );
    recalculateBalance();
    e.target.parentElement.remove();
  }
}
