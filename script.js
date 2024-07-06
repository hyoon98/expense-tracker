const type = document.getElementById("type");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const incomeDisplay = document.getElementById("income-list");
const expenseDisplay = document.getElementById("expense-list");
const balance = document.getElementById("balance");
let incomeItems = [];
let expenseItems = [];

let appendItem = (parent, item) => {
  let li = document.createElement("li");
  li.className = "item";
  let descriptionText = document.createElement("div");
  descriptionText.className = "itemDescription";
  descriptionText.innerHTML = item.description;
  let amountText = document.createElement("div");
  amountText.className = "itemAmount";
  amountText.innerHTML = "$" + item.amount;
  let dateText = document.createElement("div");
  dateText.className = "itemDate";
  dateText.innerHTML = item.date;
  let deleteButton = document.createElement("button");
  deleteButton.className = "itemDelete";
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click", deleteTransaction);
  li.appendChild(descriptionText);
  li.appendChild(amountText);
  li.appendChild(dateText);
  li.appendChild(deleteButton);
  li.setAttribute("type", item.type);
  li.setAttribute("key", item.key);
  parent.appendChild(li);
};

document.addEventListener("DOMContentLoaded", function () {
  incomeItems = localStorage.getItem("income")
    ? JSON.parse(localStorage.getItem("income"))
    : [];
  expenseItems = localStorage.getItem("expense")
    ? JSON.parse(localStorage.getItem("expense"))
    : [];
  incomeItems.forEach((item) => {
    appendItem(incomeDisplay, item);
  });
  expenseItems.forEach((item) => {
    appendItem(expenseDisplay, item);
  });
  document.getElementById("income-total").innerHTML = localStorage.getItem(
    "incomeTotal"
  )
    ? localStorage.getItem("incomeTotal")
    : "0";
  document.getElementById("expense-total").innerHTML = localStorage.getItem(
    "expenseTotal"
  )
    ? localStorage.getItem("expenseTotal")
    : "0";
  recalculateBalance();
});

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
    let key = new Date().toString();
    li.appendChild(descriptionText);
    li.appendChild(amountText);
    li.appendChild(dateText);
    li.appendChild(deleteButton);
    li.setAttribute("type", type.options[type.selectedIndex].value);
    li.setAttribute("key", key);
    let itemObject = {
      description: description.value,
      amount: parseInt(amount.value),
      date: dateText.innerHTML,
      type: type.options[type.selectedIndex].value,
      key: key,
    };
    let total;
    let totalType;
    if (type.options[type.selectedIndex].value === "Income") {
      incomeDisplay.appendChild(li);
      totalType = "incomeTotal";
      total = document.getElementById("income-total");
      incomeItems.push(itemObject);
      localStorage.setItem("income", JSON.stringify(incomeItems));
    } else {
      expenseDisplay.appendChild(li);
      totalType = "expenseTotal";
      total = document.getElementById("expense-total");
      expenseItems.push(itemObject);
      localStorage.setItem("expense", JSON.stringify(expenseItems));
    }
    total.innerHTML = parseInt(total.innerHTML) + parseInt(amount.value);
    localStorage.setItem(totalType, total.innerHTML);
    recalculateBalance();
    description.value = "";
    amount.value = "";
  }
}

function deleteTransaction(e) {
  if (e.target.className === "itemDelete") {
    let totalType = e.target.parentElement.getAttribute("type");
    let total;
    let displayType;
    if (totalType === "Income") {
      displayType = "income-total";
      totalType = "incomeTotal";
    } else {
      displayType = "expense-total";
      totalType = "expenseTotal";
    }
    total = document.getElementById(displayType);
    total.innerHTML =
      parseInt(total.innerHTML) -
      parseInt(
        e.target.parentElement
          .getElementsByClassName("itemAmount")[0]
          .innerHTML.slice(1)
      );
    recalculateBalance();
    e.target.parentElement.remove();
    if (displayType === "income-total") {
      incomeItems = incomeItems.filter(
        (item) => item.key !== e.target.parentElement.getAttribute("key")
      );
      localStorage.setItem("income", JSON.stringify(incomeItems));
    } else {
      expenseItems = expenseItems.filter(
        (item) => item.key !== e.target.parentElement.getAttribute("key")
      );
      localStorage.setItem("expense", JSON.stringify(expenseItems));
    }
    localStorage.setItem(
      totalType,
      document.getElementById(displayType).innerHTML
    );
  }
}
