import {isEscKey} from './util.js';
import { loadValidation } from './validation.js';
import { closeImgRedactor } from './edit-picture.js';
import { addImgRedactor } from './edit-picture.js';
// import { addSlider } from './edit-picture.js';
// import { changeScale } from './edit-picture.js';

loadValidation();

const body = document.querySelector('body');

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
// const uploadFile = document.querySelector('input#upload-file');

const closeModalForm = () => {
  const imgUploadFieldWrapper = document.querySelector('.img-upload__field-wrapper');
  // const errorText = document.querySelector('.pristine-error.text-help');
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadCancelButton.removeEventListener('click', onLoadButtonClose);

  document.removeEventListener('keydown', onLoadEscClose);

  textHashtags.removeEventListener('focus', onTextHashtagsFocus);

  textDescription.removeEventListener('focus', onTextHashtagsFocus);

  // uploadFile.value = null;

  closeImgRedactor();

  imgUploadForm.reset();

  imgUploadFieldWrapper.classList.remove('img-upload__field-wrapper--error');
};

const openModalForm = () => {
  imgUploadOverlay.classList.remove('hidden');

  body.classList.add('modal-open');

  uploadCancelButton.addEventListener('click', onLoadButtonClose);

  document.addEventListener('keydown', onLoadEscClose);

  textHashtags.addEventListener('focus', onTextHashtagsFocus);

  textDescription.addEventListener('focus', onDescriptionFocus);

  addImgRedactor();

};

const addStopPropagation = (evt) => {
  if (isEscKey(evt)) {
    evt.stopPropagation();
  }
};

const onChangeForm = () => {
  openModalForm();
};

const onLoadButtonClose = () => {
  closeModalForm();
};

const onLoadEscClose = (evt) => {
  if (isEscKey(evt)) {
    closeModalForm();
  }
};

const onTextHashtagsFocus = () => {
  textHashtags.addEventListener("keydown", addStopPropagation);
}

const onDescriptionFocus = () => {
  textDescription.addEventListener("keydown", addStopPropagation);
}


const loadForm = () => {
  imgUploadForm.addEventListener('change',onChangeForm);
}

export { loadForm }
