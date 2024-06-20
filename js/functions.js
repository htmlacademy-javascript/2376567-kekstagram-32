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
