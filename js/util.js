const getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const returnRandomElem = function(arr) {
  const elem = arr[getRandomInt(0, arr.length - 1)];
  return elem;
};

const makeObj = function(keys,values) {
  const obj = {};
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i];
  }
  return obj;
};

const makeArr = function(...arg) {
  const arr = [];
  for (let i = 0; i < arguments.length; i++) {
    arr.push(arguments[i]);
  }
  return arr;
};

export {getRandomInt, returnRandomElem, makeObj, makeArr};
