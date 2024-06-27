import {getRandomInt, returnRandomElem, makeObj, makeArr} from './util.js';

const ARR_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];
const ARR_NAMES = ['Иван','Анастасия','Ольга','Сергей','Антон','Марина','Евгений','Евгения'];
const ARR_DESCRIPTIONS = [
  'закат и море',
  'горы и пикник',
  'портрет и пейзаж',
  'цветы и животные',
  'архитектура и природа',
  'семья и друзья',
  'путешествие и приключения',
  'кулинария и рецепты',
  'искусство и культура',
  'спорт и тренировки',
  'музыка и концерты',
  'свадьба и праздник',
  'дети и игры',
  'животные и питомцы',
  'мода и стиль',
  'еда и напитки',
  'вечеринка и танцы',
  'фотография и композиция',
  'книги и чтение',
  'кино и сериалы',
  'путешествия и туризм',
  'природа и экология',
  'искусство и арт-проекты',
  'портрет знаменитости и интервью',
  'закат и пляж'
];

function createUrl(num) {
  return `img/avatar-${num}.svg`;
}

const createComments = function(min,max){
  const arr = [];
  for (let i = min; i < max; i++) {
    const keys = ['id','avatar','message','name'];
    const values = makeArr(i,createUrl(getRandomInt(1,6)),returnRandomElem(ARR_MESSAGES),returnRandomElem(ARR_NAMES));
    const item = makeObj(keys,values);
    arr.push(item);
  }
  return arr;
};

const createContent = function(min,max) {
  const arr = [];
  for (let i = min; i <= max; i++) {
    const keys = ['id','url','description','likes','comments'];
    const values = makeArr(i,createUrl(i),returnRandomElem(ARR_DESCRIPTIONS),getRandomInt(15, 200),createComments(0,getRandomInt(0,30)));
    const item = makeObj(keys,values);
    arr.push(item);
  }
  return arr;
};

console.log('модуль data.js подключен');

export {createContent};
