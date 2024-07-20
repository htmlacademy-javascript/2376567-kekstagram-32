const picturesContainer = document.querySelector('.pictures');

const makePictureBlock = (index,imgLink,description,likeValue,commentsValue) => {
  const newPicture = document.createElement('a');
  newPicture.classList.add('picture');
  newPicture.dataset.id = index;
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
  const pictures = content.map((item,index) => makePictureBlock(index, item.url, item.description, item.likes, item.comments.length));
  pictures.forEach((item) => fragment.append(item));
  return fragment;
};

const picturesApped = (data) => picturesContainer.appendChild(getListContent(data));
export { picturesApped} ;
