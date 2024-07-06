import {getRandomInt, isEscKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');

const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const socialCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const socialPicture = bigPicture.querySelector('.social__picture');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const container = document.querySelector('.pictures');

const socialComments = bigPicture.querySelector('.social__comments');

const pictureCancel = document.querySelector('#picture-cancel');

const buttonCommentsLoader = document.querySelector('button.comments-loader');

const commentsList = document.getElementsByClassName('social__comment');

const body = document.querySelector('body');

//

let visibleComments = 5;

const stepShownComments = 5;

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

const renderComments = (data,index) => {
  const dataAvatarPath = data[index]?.comments[getRandomInt(0,data[index]?.comments.length)]?.avatar;
  const url = dataAvatarPath ? dataAvatarPath : 'img/avatar-1.svg';
  socialPicture.src = url;
  socialCommentTotalCount.textContent = data[index].comments.length;
  socialComments.textContent = null;
  socialComments.appendChild(getListComment(data[index].comments));

  for(let i = visibleComments; i < commentsList.length; i++) {
    commentsList[i].classList.add('hidden');
  }

};

const renderSocials = (data,index) => {
  socialCaption.textContent = data[index].description;
  likesCount.textContent = data[index].likes;
};

const renderPictures = (data,index) => {
  bigPictureImg.src = data[index].url;
};


const onLoadEscClose = (evt) => {
  if (isEscKey(evt)) {
    closeModal();
  }
};

const onLoadButtonClose = () => {
  closeModal();
};

function onfunc() {

  for(let i = visibleComments; i < visibleComments + stepShownComments && i < commentsList.length; i++) {
    commentsList[i].classList.remove('hidden');
  }
  visibleComments += stepShownComments;
  if(visibleComments >= commentsList.length) {
    buttonCommentsLoader.classList.add('hidden');
    visibleComments = 5;
  }
}

function closeModal() {
  const socialPicture = bigPicture.querySelector('.social__picture');
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onLoadEscClose);
  pictureCancel.removeEventListener('click', onLoadButtonClose);
  buttonCommentsLoader.removeEventListener('click', onfunc);
  socialPicture.textContent = null;
  buttonCommentsLoader.classList.remove('hidden');
  // visibleComments = 5;
}

const loadModal = (data) => {
  container.addEventListener('click', (event) => {
    const parentLink = event.target.closest('a.picture');
    if (parentLink) {
      const id = Number(parentLink.dataset.id);
      event.preventDefault();
      bigPicture.classList.remove('hidden');
      renderPictures(data,id);
      renderSocials(data,id);
      renderComments(data,id);
      body.classList.add('modal-open');

      document.addEventListener('keydown', onLoadEscClose);

      pictureCancel.addEventListener('click', onLoadButtonClose);

      buttonCommentsLoader.addEventListener('click', onfunc);

      // document.querySelector('.social__comment-count').classList.add('hidden');//удалить
      // document.querySelector('button.comments-loader').classList.add('hidden');//удалить

    }
  });
};

export { loadModal };
