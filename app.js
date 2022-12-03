
let inp1 = document.querySelector(".inp1");
let inp2 = document.querySelector(".inp2");
let valuta1 = document.querySelector(".valuta1");
let valuta2 = document.querySelector(".valuta2");
let Container = document.querySelector(".country-valuta");
let from, to;

eventListeners();
function eventListeners() {
  Container.addEventListener("click", handleValueta);
  inp1.addEventListener("keyup", getDataByFrom);
  inp2.addEventListener("keyup", getDataByTo);
}

function handleValueta(e) {
  let targetSpace = e.target;
  Array.from(targetSpace.parentElement.children).forEach((x) =>x.removeAttribute("style"));
  if (targetSpace.parentElement.className.indexOf("country-money-from") !== -1) {
    targetSpace.setAttribute("style", "background: #833AE0;color:#fff");
    from = targetSpace.textContent;
    getDataByFrom();
  } else if (targetSpace.parentElement.className.indexOf("country-money-to") !== -1) {
    targetSpace.setAttribute("style", "background: #833AE0;color:#fff");
    to = targetSpace.textContent;
    getDataByFrom();
  }
}

async function getDataByFrom() {
  const res = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`);
  const data = await res.json();
  inp2.value =( Object.values(data.rates)[0] * inp1.value.replace(",",".")).toFixed(2);
  if(from && to){
  valuta1.textContent = `1 ${data.base} = ${Object.values(data.rates)[0].toFixed(2)} ${Object.keys(data.rates)}`;
  valuta2.textContent = `1 ${Object.keys(data.rates)} = ${(1/Object.values(data.rates)[0]).toFixed(2)} ${data.base}`;
  }
}
async function getDataByTo() {
  const res = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`);
  const data = await res.json();
  input1.value = (input2.value.replace(",",".") / Object.values(data.rates)[0]).toFixed(2);
}