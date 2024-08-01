import {getRandomInt, isEscKey} from './util.js';

const STEP_SHOWN_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');

const likesCount = bigPicture.querySelector('.likes-count');

const socialCaption = bigPicture.querySelector('.social__caption');
const socialPicture = bigPicture.querySelector('.social__picture');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const socialCommentCountBlock = bigPicture.querySelector('.social__comment-count');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsList = document.getElementsByClassName('social__comment');

const picturesContainer = document.querySelector('.pictures');

const pictureCancel = document.querySelector('#picture-cancel');

const buttonCommentsLoader = document.querySelector('button.comments-loader');

const body = document.querySelector('body');

let visibleComments = 5;

let currentData;

const makeCommentBlock = (avatarSrc,commentatorName,commentText) => {
  const listItem = document.createElement('li');
  listItem.classList.add('social__comment');
  listItem.innerHTML =
  `<img class="social__picture" src=${avatarSrc} alt=${commentatorName} width="35" height="35"> <p class="social__text">${commentText}</p>`;
  return listItem;
};

const getListComment = (content) => {
  const fragment = new DocumentFragment();
  const comments = content.map(((item) => makeCommentBlock(item.avatar,item.name,item.message)));
  comments.forEach((comment) => fragment.append(comment));
  return fragment;
};


const hideComments = (id) => {
  commentsList[id].classList.add('hidden');
};

const showComments = (id) => {
  commentsList[id].classList.remove('hidden');
};

const getNumberOfItems = (elem, clss) => Array.from(elem).filter((comment) => comment.classList.contains(clss) && comment.classList.length === 1).length;

const renderComments = (data,index) => {
  const dataAvatarPath = data[index]?.comments[getRandomInt(0,data[index]?.comments.length)]?.avatar;
  const url = dataAvatarPath ? dataAvatarPath : 'img/avatar-1.svg';
  socialPicture.src = url;
  socialCommentTotalCount.textContent = data[index].comments.length;
  socialComments.textContent = null;
  socialComments.appendChild(getListComment(data[index].comments));

  Array.from(commentsList).slice(visibleComments).forEach((_, i) => {
    hideComments(i + visibleComments);
  });
  const shownComments = getNumberOfItems(commentsList,'social__comment');
  socialCommentShownCount.textContent = shownComments;
  if(visibleComments >= commentsList.length) {
    buttonCommentsLoader.classList.add('hidden');
    socialCommentCountBlock.classList.add('hidden');
  }
};

const renderSocials = (data,index) => {
  socialCaption.textContent = data[index].description;
  likesCount.textContent = data[index].likes;
};

const renderPictures = (data,index) => {
  bigPictureImg.src = data[index].url;
};

const showNextComments = () => {
  Array.from(commentsList).slice(visibleComments, visibleComments + STEP_SHOWN_COMMENTS).forEach((_, i) => {
    showComments(i + visibleComments);
  });

  visibleComments += STEP_SHOWN_COMMENTS;

  if(visibleComments >= commentsList.length) {
    buttonCommentsLoader.classList.add('hidden');
    visibleComments = 5;
  }
  const shownComments = getNumberOfItems(commentsList,'social__comment');
  socialCommentShownCount.textContent = shownComments;
};

const clearComments = () => {
  buttonCommentsLoader.classList.remove('hidden');
  socialCommentCountBlock.classList.remove('hidden');
  socialPicture.textContent = null;
  visibleComments = 5;
};

function onButtonCommentsLoader() {
  showNextComments();
}

const handlePictureClick = (event, data) => {
  const parentLink = event.target.closest('a.picture');
  if (parentLink) {
    const id = Number(parentLink.dataset.id);
    event.preventDefault();
    bigPicture.classList.remove('hidden');
    renderPictures(data, id);
    renderSocials(data, id);
    renderComments(data, id);
    body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentPictureCancel);
    pictureCancel.addEventListener('click', onPictureCancel);
    buttonCommentsLoader.addEventListener('click', onButtonCommentsLoader);
  }
};

const onPicturesContainer = (event) => handlePictureClick(event, currentData);

const closeModal = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentPictureCancel);
  pictureCancel.removeEventListener('click', onPictureCancel);
  buttonCommentsLoader.removeEventListener('click', onButtonCommentsLoader);
  clearComments();
};

function onPictureCancel() {
  closeModal();
}

function onDocumentPictureCancel(evt) {
  if (isEscKey(evt)) {
    closeModal();
  }
}

const loadModal = (data) => {
  currentData = data;
  picturesContainer.removeEventListener('click', onPicturesContainer);
  picturesContainer.addEventListener('click', onPicturesContainer);
};

export { loadModal };
