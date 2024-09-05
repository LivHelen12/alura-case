const spanPasswordEl = document.querySelector('#generated_password');
const forceIndicatorEl = document.querySelector('.force_box');
const inputRangeSliderEl = document.querySelector('#slider');
const boxRangeSliderEl = document.querySelector('#box-range');
const checkboxesEl = document.querySelectorAll('.checkbox');
const checkboxUppercaseEl = document.querySelector('#uppercase');
const checkboxLowercaseEl = document.querySelector('#lowercase');
const checkboxNumberEl = document.querySelector('#number');
const checkboxSymbolEl = document.querySelector('#symbols');

let password = '';
let passwordLength = 12;
let baseChars = '';

const CHAR_SETS = {
  lowercase: 'abcçdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCÇDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  symbol: '!#$%&()*+,-./:;<=>?@[]^_{|}',
};

const generatePassword = () => {
  resetPassBeforeGenerate();
  setInputRangerValue();
  setPassword();
  calculatePasswordForce();
};

const setBaseChars = () => {
  baseChars = '';

  if (checkboxLowercaseEl.checked) {
    baseChars += CHAR_SETS.lowercase;
  }

  if (checkboxUppercaseEl.checked) {
    baseChars += CHAR_SETS.uppercase;
  }

  if (checkboxNumberEl.checked) {
    baseChars += CHAR_SETS.number;
  }

  if (checkboxSymbolEl.checked) {
    baseChars += CHAR_SETS.symbol;
  }
};

const setPassword = () => {
  setBaseChars();

  if (!baseChars) {
    spanPasswordEl.classList.add('error');
    return (spanPasswordEl.textContent =
      'Personalize sua senha antes 🤖');
  }

  spanPasswordEl.classList.remove('error');

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * baseChars.length);
    password += baseChars[randomNumber];
  }

  spanPasswordEl.textContent = password;
};

const calculatePasswordForce = () => {
  const checkedCount = Array.from(checkboxesEl).filter(
    (checkbox) => checkbox.checked
  ).length;

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
  } else {
    forceIndicatorEl.classList.add('strong');
  }
};

const copyPassword = () => {
  const notificationEl = document.querySelector('.notification');

  notificationEl.classList.add('show');

  setTimeout(() => {
    notificationEl.classList.remove('show');
  }, 1200);

  return navigator.clipboard.writeText(spanPasswordEl.textContent);
};

const resetPassBeforeGenerate = () => {
  password = '';
};

const setInputRangerValue = () => {
  passwordLength = inputRangeSliderEl.value;
  boxRangeSliderEl.textContent = passwordLength;
};

inputRangeSliderEl.addEventListener('input', () => {
  setInputRangerValue();
  calculatePasswordForce();
  generatePassword();
});

checkboxesEl.forEach((checkbox) => {
  checkbox.addEventListener('change', calculatePasswordForce);
});

checkboxUppercaseEl.addEventListener('click', generatePassword);
checkboxLowercaseEl.addEventListener('click', generatePassword);
checkboxNumberEl.addEventListener('click', generatePassword);
checkboxSymbolEl.addEventListener('click', generatePassword);
spanPasswordEl.addEventListener('click', copyPassword);

generatePassword();
