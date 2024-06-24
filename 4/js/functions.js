function checkStringLenght(string) {
  if (typeof string !== 'string') {
    console.log('Аргумент должен быть строкой!');
    return false;
  }
  return string.length < 10;
}

console.log(checkStringLenght('Я строка!!!'));


function checkPalindrom(string) {
  const oldString = string.toLowerCase().replaceAll(' ','');
  const newString = string.split('').reverse().join('').replace(' ','').toLowerCase().replaceAll(' ','');

  return oldString === newString;
}

console.log(checkPalindrom('Лёша на полке клопа нашёл '));

function takeNum(param) {
  if (typeof param === 'number') {
    return param;
  }
  let result = '';
  for (let i = 0; i < param.length; i++) {
    if (!Number.isNaN(+param[i])) {
      result += param[i];
    }
  }
  return (result === 0) ? NaN : +result.replaceAll(' ','');
}

console.log(takeNum('2023 год'));
console.log(takeNum('ECMAScript 2022'));
console.log(takeNum('1 кефир 0.5 батона'));
console.log(takeNum('агент 007'));
console.log(takeNum('а я томат'));
console.log(takeNum(2200));
