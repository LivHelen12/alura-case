const spanPasswordEl = document.querySelector('#generated_password')

const forceIndicatorEl = document.querySelector('.force_box')

const inputRangeSliderEl = document.querySelector('#slider')
const boxSlidesEl = document.querySelector('#box-range')

const checkboxesEl = document.querySelectorAll('.checkbox');
const checkboxUppercaseEl = document.querySelector('#uppercase')
const checkboxLowercaseEl = document.querySelector('#lowercase')
const checkboxNumberEl = document.querySelector('#number')
const checkboxSymbolEl = document.querySelector('#symbols')


const lowercaseChars = 'abcçdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCÇDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '0123456789';
const symbolChars = '!#$%&()*+,-./:;<=>?@[]^_{|}';

let password = '';
let passwordLength = 12;
let baseChars = '';
function generatePassword() {
  resetPassBeforeGenerate();
  setPassword();
}

function setPassword() {
  if (checkboxLowercaseEl.checked) {
    baseChars += lowercaseChars;
  }

  if (checkboxUppercaseEl.checked) {
    baseChars += uppercaseChars;
  }

  if (checkboxNumberEl.checked) {
    baseChars += numberChars;
  }

  if (checkboxSymbolEl.checked) {
    baseChars += symbolChars;
  }

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * baseChars.length);
    password += baseChars.substring(randomNumber, randomNumber + 1);
  }

  spanPasswordEl.textContent = password
}
function resetPassBeforeGenerate() {
  password = '';
}

function copyPassword() {
  return navigator.clipboard.writeText(spanPasswordEl.textContent);
}
generatePassword();
