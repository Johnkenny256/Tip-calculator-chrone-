const billInput = document.querySelector(".Bill_input");
const peopleInput = document.querySelector(".numberofpeople");
const tipValue = document.getElementById("tip_value");
const totalValue = document.getElementById("total_value");
const tips = document.querySelectorAll(".tips");
const tipsCustom = document.querySelector(".tip_custom");
const resetBtn = document.querySelector(".reset");
const error = document.querySelector(".error_message");

// Adding event listeners
billInput.addEventListener("input", billInputFun);
peopleInput.addEventListener("input", peopleInputFun);
// for the tips when clicked
tips.forEach(function (val) {
  val.addEventListener("click", handleClicked);
});
tipsCustom.addEventListener("input", tipsInputFun);
resetBtn.addEventListener("click", resetFunc);

// initial values of the inputs and amounts
billInput.value = "0.0";
peopleInput.value = "1";
tipValue.innerHTML = "$" + (0.0).toFixed(2);
totalValue.innerHTML = "$" + (0.0).toFixed(2);

let billValue = 0.0;
let peopleValue = 1;
let tipsValue = 0.15;

function billInputFun() {
  billValue = parseFloat(billInput.value);
  calcTip();
}

function tipsInputFun() {
  tipsValue = parseFloat(tipsCustom.value / 100);

  tips.forEach(function (val) {
    val.classList.remove("active_tip");
  });
  calcTip();
}

function peopleInputFun() {
  peopleValue = parseFloat(peopleInput.value);

  if (peopleValue < 1) {
    error.style.display = "flex";
    peopleInput.style.border = "5px solid red";
    // console.log(error);
  } else {
    error.style.display = "none";
    peopleInput.style.border = "none";
    calcTip();
  }
}

// activing the clicked tip

function handleClicked(event) {
  tips.forEach(function (val) {
    val.classList.remove("active_tip");
    if (event.target.innerHTML === val.innerHTML) {
      val.classList.add("active_tip");
      tipsValue = parseFloat(val.innerHTML) / 100;
    }
  });
  calcTip();
}

// calcuting the tip and total
function calcTip() {
  if (peopleValue >= 1) {
    let tipAmounts = (billValue * tipsValue) / peopleValue;
    let totalAmounts = (billValue * (1 + tipsValue)) / peopleValue;
    tipValue.innerHTML = "$" + tipAmounts.toFixed(2);
    totalValue.innerHTML = "$" + totalAmounts.toFixed(2);
  }
}

function resetFunc() {
  billInput.value = "0.0";
  billInputFun();
  peopleInput.value = "1";
  peopleInputFun();
  tipsCustom.value = "";
}
