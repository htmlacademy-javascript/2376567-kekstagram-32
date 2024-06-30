import {data} from './preview.js';

console.log(data);

const pictureLink = document.querySelectorAll('.picture__link');
const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const socialCaption = bigPicture.querySelector('.social__caption');
  const likesCount = bigPicture.querySelector('.likes-count');
  const socialPicture = bigPicture.querySelector('.social__picture');
  const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
  const socialText = bigPicture.querySelector('.social__text');
  const socialComments = bigPicture.querySelector('.social__comments');

const pictureCancel = document.querySelector('#picture-cancel');

const makeCommentBlock = (avatarSrc,commentatorName,commentText) => {
  const listItem = document.createElement('li');
  listItem.classList.add('class="social__comment"');
  listItem.innerHTML =
  `<img class="social__picture" src=${avatarSrc} alt=${commentatorName} width="35" height="35"> <p class="social__text">${commentText}</p>`;
  return listItem;
};



for (let i = 0; i < pictureLink.length; i++) {
  pictureLink[i].addEventListener('click', (event) => {
    event.preventDefault();
    bigPicture.classList.remove('hidden');
    bigPictureImg.src = data[i].url;
    socialCaption.textContent = data[i].description;
    likesCount.textContent = data[i].likes;
    socialPicture.src = data[i].comments[0].avatar;
    socialCommentTotalCount.textContent = data[i].comments.length;

    socialComments.textContent = null;
    socialComments.appendChild(makeCommentBlock(data[i].comments[i].avatar,data[i].comments[i].name,data[i].comments[i].message));
    console.log(makeCommentBlock(data[i].comments[i].avatar,data[i].comments[i].name,data[i].comments[i].message));


  });
}


pictureCancel.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
})


