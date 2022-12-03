let Container = document.querySelector(".country-valuta");
let inputFrom = document.querySelector(".input_from");
let inputTo = document.querySelector(".input_to");
let valutaParagraphFrom = document.querySelector(".valuta_paragraph_from");
let valutaParagraphTo = document.querySelector(".valuta_paragraph_to");
let from, to;
eventListeners();
function eventListeners() {
  Container.addEventListener("click", handleValueta);
  inputFrom.addEventListener("keyup", getDataByFrom);
  inputTo.addEventListener("keyup", getDataByTo);
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
  inputTo.value =( Object.values(data.rates)[0] * inputFrom.value.replace(",",".")).toFixed(2);
  if(from && to){
  valutaParagraphFrom.textContent = `1 ${data.base} = ${Object.values(data.rates)[0].toFixed(2)} ${Object.keys(data.rates)}`;
  valutaParagraphTo.textContent = `1 ${Object.keys(data.rates)} = ${(1/Object.values(data.rates)[0]).toFixed(2)} ${data.base}`;
  }
}
async function getDataByTo() {
  const res = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`);
  const data = await res.json();
  inputFrom.value = (inputTo.value.replace(",",".") / Object.values(data.rates)[0]).toFixed(2);
}