function checkStringLenght(string) {
  if (typeof string !== 'string') {
    console.log('Аргумент должен быть строкой!');
    return false;
  }
  if (string.length < 10) {
    return false;
  } else {
    return true;
  }
}

console.log(checkStringLenght('Я строка!!!'));


function checkPalindrom(string) {
  let oldString = string.toLowerCase();
  let newString = string.split('').reverse().join('').replace(' ','').toLowerCase();

  while(oldString.includes(' ')) {
    oldString = oldString.replace(' ','');
  }

  while(newString.includes(' ')) {
    newString = newString.replace(' ','');
  }

  if (oldString === newString) {
    return true;
  } else {
    return false;
}
}

console.log(checkPalindrom('Лёша на полке клопа нашёл '));
