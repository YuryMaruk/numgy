import ruAlph from "./ruAlph.js";

const firstName = document.querySelector(".first-name");
const secondName = document.querySelector(".second-name");
const family = document.querySelector(".family");
const dateBirthday = document.querySelector(".date-birthday");
const btnCount = document.querySelector(".button-count");
const secWorkNum = document.querySelector(".second-working-number");
const columnsList = document.querySelectorAll('.column');
const person = {
  fName: firstName.value,
  sName: secondName.value,
  family: family.value
}
const alphabet = ruAlph;

let firstNum, secondNum, thirdNum, fourthNum;



btnCount.addEventListener('click', handler);

function handler() {
  firstNum = createFirstNum(dateBirthday.value);
  secondNum = createSecondNum(firstNum);
  thirdNum = createThirdNum(dateBirthday.value, firstNum);
  fourthNum = createSecondNum(thirdNum);
  arrNums = [firstNum, secondNum, thirdNum, fourthNum];
  showSecWorkNum(arrNums, secWorkNum);
  arrMatrix = arrNums.concat(dateBirthday.value.split('-').join(''));
  stringMatrix = arrMatrix.join('');
  arr = stringMatrix.split('');
  parserNodeList(columnsList, arr);
}




function createFirstNum(dateValue) {
  return dateValue.split('-').join('').split('').reduce((acc, item) => acc + Number(item), 0);
}

function createSecondNum(num) {
  return num > 12 ? String(num).split('').reduce((acc, item) => acc + Number(item), 0) : num;
}

function createThirdNum(dateValue, num) {
  arr = dateValue.split('-').join('').split('').reverse();
  result = arr[1] > 0 ? arr[1] : arr[0];
  return num - (2 * result);
}

function showSecWorkNum(arr, elem) {
  elem.value = arr.join('.');
}

function parserNodeList(list, arr) {
  list.forEach(element => {
    resultArray = arr.filter(item => item === element.id);
    element.innerText = resultArray.join('');
  });
}

function translater(str, alph){
  str = str.toLowerCase().split('');
  let array = alph;
  array.splice(0, 1);

  str.forEach((item, i) => {
    array.forEach((el, ind) => {
      if (el.includes(item)) {
        str[i]= ind + 1;
      }
    })
  })
  return str.join('');
}


