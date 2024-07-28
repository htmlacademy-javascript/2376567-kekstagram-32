const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const returnRandomElem = (arr) => arr[getRandomInt(0, arr.length - 1)];

const makeObj = (keys,values) => Object.fromEntries(keys.map((key,index) => [key, values[index]]));

const makeArr = (...args) => args.map((item) => item);

const makeId = () => {
  let num = 1;
  return () => num++;
};

const isEscKey = (evt) => evt.keyCode === 27;

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInt, returnRandomElem, makeObj, makeArr, makeId, isEscKey, debounce};
