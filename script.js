const type = document.getElementById("type");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expense");

const addTransaction = () => {
  if (description.value === "" || amount.value === "") {
    alert("Please enter a description and amount");
  } else {
    let li = document.createElement("li");
  }
};
