const arrMessage = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];
const arrName = ['Иван','Анастасия','Ольга','Сергей','Антон','Марина','Евгений','Евгения'];
const arrDescription = [
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
]

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeObj(keys,values) {
  const obj ={};
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i];
  }
  return obj;
}

function getUrl(num) {
  return `img/avatar-${num}.svg`;
}

function createValue(...arg) {
  const arr = [];
  for (let i = 0; i < arguments.length; i++) {
    arr.push(arguments[i]);
  }
  return arr;
}

function returnRandomElem(arr) {
  const elem = arr[getRandomInt(0, arr.length - 1)];
  return elem;
}

function createComments(min,max){
  const arr = [];
  for (let i = min; i < max; i++) {
    const keys = ['id','avatar','message','name'];
    const values = createValue(i,getUrl(getRandomInt(1,6)),returnRandomElem(arrMessage),returnRandomElem(arrName));
    const item = makeObj(keys,values);
    arr.push(item);
  }
  return arr;
}

function createContent(min,max) {
  const arr = [];
  for (let i = min; i <= max; i++) {
    const keys = ['id','url','description','likes','comments'];
    const values = createValue(i,getUrl(i),returnRandomElem(arrDescription),getRandomInt(15, 200),createComments(0,getRandomInt(0,30)));
    const item = makeObj(keys,values);
    arr.push(item);
  }
  return arr;
}

console.table(createContent(1,25));
