const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const returnRandomElem = (array) => array[getRandomInt(0, array.length - 1)];

const makeObj = (keys,values) => Object.fromEntries(keys.map((key,index) => [key, values[index]]));

const makeArr = (...lotsOfArguments) => lotsOfArguments.map((item) => item);

const isEscKey = (event) => event.keyCode === 27;

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInt, returnRandomElem, makeObj, makeArr, isEscKey, debounce};
