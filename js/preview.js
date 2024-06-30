import {createContent} from './data.js';

const data = createContent(1,25);

const picturesContainer = document.querySelector('.pictures');

const makePictureBlock = (imgLink,description,commentsValue,likeValue) => {
  const newPicture = document.createElement('a');
  newPicture.classList.add('picture__link');
  newPicture.href = '#';
  newPicture.innerHTML = `<img class="picture__img" src="${imgLink}" width="182" height="182" alt="${description}">
        <p class="picture__info">
          <span class="picture__comments">${commentsValue}</span>
          <span class="picture__likes">${likeValue}</span>
        </p>`;
  return newPicture;
};

const getListContent = (content) => {
  const fragment = new DocumentFragment();
  for (let i = 0; i < content.length; i++) {
    const picture = makePictureBlock(content[i].url, content[i].description, content[i].likes, content[i].comments.length);
    fragment.append(picture);
  }
  return fragment;
};

picturesContainer.appendChild(getListContent(data));

export {data};

console.log('модуль preview.js подключен');
