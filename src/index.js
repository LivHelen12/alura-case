const spanPasswordEl = document.querySelector('#generated_password');
const forceIndicatorEl = document.querySelector('.force_box');
const inputRangeSliderEl = document.querySelector('#slider');
const boxRangeSliderEl = document.querySelector('#box-range');
const checkboxesEl = document.querySelectorAll('.checkbox');
const checkboxUppercaseEl = document.querySelector('#uppercase');
const checkboxLowercaseEl = document.querySelector('#lowercase');
const checkboxNumberEl = document.querySelector('#number');
const checkboxSymbolEl = document.querySelector('#symbols');

const lowercaseChars = 'abcçdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCÇDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '0123456789';
const symbolChars = '!#$%&()*+,-./:;<=>?@[]^_{|}';

let password = '';
let passwordLength = 12;
let baseChars = '';

function generatePassword() {
  resetPassBeforeGenerate();
  setInputRangerValue();
  setPassword();
  calculatePasswordForce();
}

function setPassword() {
  baseChars = '';

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

  if (!baseChars || baseChars.length === '') {
    return (spanPasswordEl.textContent = 'Personalize sua senha antes');
  }

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * baseChars.length);
    password += baseChars[randomNumber];
  }

  spanPasswordEl.textContent = password;
}

function calculatePasswordForce() {
  let checkedCount = 0;

  checkboxesEl.forEach((checkbox) => {
    if (checkbox.checked) {
      checkedCount++;
    }
  })

  forceIndicatorEl.classList.remove('low', 'medium', 'strong');
  const DEFAULT_PASSWORD_LENGTH = 12;
  const MINIMIUM_ACCEPTABLE_PASSWORD_LENGTH = 18;

  if (passwordLength < DEFAULT_PASSWORD_LENGTH || checkedCount <= 2) {
    forceIndicatorEl.classList.add('low');
  } else if (
    (passwordLength >= DEFAULT_PASSWORD_LENGTH &&
      passwordLength <= MINIMIUM_ACCEPTABLE_PASSWORD_LENGTH) ||
    checkedCount === 3
  ) {
    forceIndicatorEl.classList.add('medium');
  } else if (
    passwordLength > MINIMIUM_ACCEPTABLE_PASSWORD_LENGTH &&
    checkedCount === 4
  ) {
    forceIndicatorEl.classList.add('strong');
  }
}

function resetPassBeforeGenerate() {
  password = '';
}

function copyPassword() {
  return navigator.clipboard.writeText(spanPasswordEl.textContent);
}

function setInputRangerValue() {
  passwordLength = inputRangeSliderEl.value;
  boxRangeSliderEl.textContent = passwordLength;
}

inputRangeSliderEl.addEventListener('input', () => {
  setInputRangerValue();
  calculatePasswordForce();
  generatePassword();
})

checkboxesEl.forEach((checkbox) => {
  checkbox.addEventListener('change', calculatePasswordForce);
})

checkboxUppercaseEl.addEventListener('click', generatePassword);
checkboxLowercaseEl.addEventListener('click', generatePassword);
checkboxNumberEl.addEventListener('click', generatePassword);
checkboxSymbolEl.addEventListener('click', generatePassword);
spanPasswordEl.addEventListener('click', copyPassword);

generatePassword();
