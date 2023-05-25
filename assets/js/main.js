const firstName = document.querySelector(".first-name");
const secondName = document.querySelector(".second-name");
const family = document.querySelector(".family");
const dateBirthday = document.querySelector(".date-birthday");
const btnCount = document.querySelector(".button-count");
const secWorkNum = document.querySelector(".second-working-number");

btnCount.addEventListener('click', handler);

let firstNum, secondNum, thirdNum, fourthNum;




function handler() {
  firstNum = createFirstNum(dateBirthday.value);
  secondNum = createSecondNum(firstNum);
  thirdNum = createThirdNum(dateBirthday.value, firstNum);
  fourthNum = createSecondNum(thirdNum);
  arrNums = [firstNum, secondNum, thirdNum, fourthNum];
  showSecWorkNum(arrNums, secWorkNum);

}

function addSecNum(one, two, three, four, elem) {
  elem.value = '${one}.${two}.${three}.${four}';
}

function createFirstNum(dateValue) {
  return dateValue.split('-').join('').split('').reduce((acc, item) => acc + Number(item), 0);
}

function createSecondNum(num) {
  return num > 12 ? String(num).split('').reduce((acc, item) => acc + Number(item), 0) : num;
}

function createThirdNum(dateValue, num){
  arr = dateValue.split('-').join('').split('').reverse();
  result = arr[1] > 0 ? arr[1] : arr[0];
  return num - (2 * result);
}

function showSecWorkNum (arr, elem){
  elem.value = arr.join('.');
}



