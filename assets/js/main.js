import ruAlph from "./ruAlph.js";

const firstName = document.querySelector(".first-name");
const secondName = document.querySelector(".second-name");
const family = document.querySelector(".family");
const dateBirthday = document.querySelector(".date-birthday");
const btnCount = document.querySelector(".button-count");
const secWorkNum = document.querySelector(".second-working-number");
const columnsList = document.querySelectorAll('.column');
const numbersList = document.querySelectorAll('.numbers2');

const alphabet = ruAlph;

let firstNum, secondNum, thirdNum, fourthNum;



btnCount.addEventListener('click', handler);

function handler() {
  const person = {
    fName: firstName.value,
    sName: secondName.value,
    family: family.value
  }
  firstNum = createFirstNum(dateBirthday.value);
  secondNum = createSecondNum(firstNum);
  thirdNum = createThirdNum(dateBirthday.value, firstNum);
  fourthNum = createSecondNum(thirdNum);
  let arrNums = [firstNum, secondNum, thirdNum, fourthNum];
  showSecWorkNum(arrNums, secWorkNum);
  let arrMatrix = arrNums.concat(dateBirthday.value.split('-').join(''));
  let stringMatrix = arrMatrix.join('');
  let arr = stringMatrix.split('');
  parserNodeList(columnsList, arr);
  addNumbers(person.fName, person.sName, person.family, numbersList, alphabet);
}




function createFirstNum(dateValue) {
  return dateValue.split('-').join('').split('').reduce((acc, item) => acc + Number(item), 0);
}

function createSecondNum(num) {
  return num > 12 ? String(num).split('').reduce((acc, item) => acc + Number(item), 0) : num;
}

function createThirdNum(dateValue, num) {
  let arr = dateValue.split('-').join('').split('').reverse();
  let result = arr[1] > 0 ? arr[1] : arr[0];
  return num - (2 * result);
}

function showSecWorkNum(arr, elem) {
  elem.value = arr.join('.');
}

function parserNodeList(list, arr) {
  list.forEach(element => {
    let resultArray = arr.filter(item => item === element.id);
    element.innerText = resultArray.join('');
  });
}

function translater(str, alph) {
  str = str.toLowerCase().split('');
  let array = alph.slice().slice(1);
  str.forEach((item, i) => {
    array.forEach((el, ind) => {
      if (el.includes(item)) {
        str[i] = ind + 1;
      }
    })
  })
  return str.join('');
}

function getChI(str, alph) {
  let notRedNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 22, 33, 44, 13, 14, 16, 19];
  let resultStr = [];
  let result = Number(translater(str, alph));
  if (String(result).length === 1) {
    resultStr.push(result);
  } else {
    resultStr.push(result);
    while (result > 9) {
      result = sumLetter(String(result));
      resultStr.push(result);
    }
  }
  let temp = resultStr.filter(num => notRedNum.includes(num));
  let answ = temp.map(item => '/' + item).join('').substring(1);
  return answ;
}

function sumLetter(str) {
  return str.split('').map(item => Number(item)).reduce((acc, item) => acc + item, 0)
}

function getChV(str1, str2, str3, alph) {
  let notRedNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let resultStr = [];
  let str = [];
  for (let i = 0; i < 3; i++) {
    str.push(translater(arguments[i], alph));

  }
  let result = str.reduce((acc, item) => acc +  sumLetter(item), 0);
  if (String(result).length === 1) {
    resultStr.push(result);
  } else {
    resultStr.push(result);
    while (result > 9) {
      result = sumLetter(String(result));
      resultStr.push(result);
    }
  }
  let temp = resultStr.filter(num => notRedNum.includes(num));
  let answ = temp.map(item => '/' + item).join('').substring(1);
  return answ;
}

function getChInd(str1, str2, str3, alph){
  let str = [];
  let vowelsArray = alph[0].split('');
  for (let i = 0; i < 3; i++) {
    str.push(arguments[i]);
  }
  str = str.join('').toLocaleLowerCase().split('');
  str = str.filter(char => !vowelsArray.includes(char)).join('');
  let result = translater(str, alph);

  if (result.length === 1) {
    return result;
  } else {
    while (result.length !== 1) {
      result = String(sumLetter(result));
    }
    return result;
  }
}

function getChJ(str1, str2, str3, alph){
  let str = [];
  let vowelsArray = alph[0].split('');
  for (let i = 0; i < 3; i++) {
    str.push(arguments[i]);
  }
  str = str.join('').toLocaleLowerCase().split('');
  str = str.filter(char => vowelsArray.includes(char)).join('');
  let result = translater(str, alph);

  if (result.length === 1) {
    return result;
  } else {
    while (result.length !== 1) {
      result = String(sumLetter(result));
    }
    return result;
  }
}

function addNumbers (name, secName, fam, list, alph) {
  let resultArr = ['ЧИ: ' + getChI(name, alph), 'ЧВ: '+ getChV(name, secName, fam, alph),
  'Чинд: ' + getChInd(name, secName, fam, alph), 'ЧЖС: ' + getChJ(name, secName, fam, alph)]
  list.forEach((item, index, arr) => item.innerText = resultArr[index]);
}
