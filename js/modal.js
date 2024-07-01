import {data} from './preview.js';
import {getRandomInt} from './util.js';

// console.log(data);

const pictureLink = document.querySelectorAll('.picture__link');
const bigPicture = document.querySelector('.big-picture');

const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const socialCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const socialPicture = bigPicture.querySelector('.social__picture');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');

const socialComments = bigPicture.querySelector('.social__comments');

const pictureCancel = document.querySelector('#picture-cancel');

// const buttonCommentsLoader = document.querySelector('button.comments-loader');

// const commentsList = document.getElementsByClassName('social__comment');

const body = document.querySelector('body');

const makeCommentBlock = (avatarSrc,commentatorName,commentText) => {
  const listItem = document.createElement('li');
  listItem.classList.add('social__comment');
  listItem.innerHTML =
  `<img class="social__picture" src=${avatarSrc} alt=${commentatorName} width="35" height="35"> <p class="social__text">${commentText}</p>`;
  return listItem;
};

const getListComment = (content) => {
  const fragment = new DocumentFragment();
  for (let i = 0; i < content.length; i++) {
    const comments = makeCommentBlock(content[i].avatar,content[i].name,content[i].message);
    fragment.append(comments);
  }
  return fragment;
};

const renderComments = (index) => {
  socialPicture.src = data[index].comments[getRandomInt(1,data[index].comments.length)].avatar;
  socialCommentTotalCount.textContent = data[index].comments.length;
  socialComments.textContent = null;
  socialComments.appendChild(getListComment(data[index].comments));
};

const renderSocials = (index) => {
  socialCaption.textContent = data[index].description;
  likesCount.textContent = data[index].likes;
};

const renderPictures = (index) => {
  bigPictureImg.src = data[index].url;
};

const loadModal = () => {
  for (let i = 0; i < pictureLink.length; i++) {
    pictureLink[i].addEventListener('click', (event) => {
      event.preventDefault();
      bigPicture.classList.remove('hidden');
      renderPictures(i);
      renderSocials(i);
      renderComments(i);
      body.classList.add('modal-open');
      document.querySelector('.social__comment-count').classList.add('hidden');//удалить
      document.querySelector('button.comments-loader').classList.add('hidden');//удалить
    });
  }
};

pictureCancel.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
});

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 27) {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  }
});

loadModal();
