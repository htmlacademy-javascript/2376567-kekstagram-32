import { isEscKey } from './util.js';
import { loadValidation } from './validation.js';
import { clearValidation } from './validation.js';
import { pristine } from './validation.js';
import { closeImgRedactor } from './edit-picture.js';
import { addImgRedactor } from './edit-picture.js';

const body = document.querySelector('body');

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const closeModalForm = () => {
  const imgUploadFieldWrapper = document.querySelector('.img-upload__field-wrapper');
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadCancelButton.removeEventListener('click', onLoadButtonClose);

  document.removeEventListener('keydown', onLoadEscClose);

  textHashtags.removeEventListener('focus', onTextHashtagsFocus);

  textDescription.removeEventListener('focus', onTextHashtagsFocus);

  closeImgRedactor();

  imgUploadForm.reset();

  clearValidation();

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

function onChangeForm() {
  openModalForm();
}

function onLoadButtonClose() {
  closeModalForm();
}

function onLoadEscClose(evt) {
  if (isEscKey(evt)) {
    closeModalForm();
  }
}

function onTextHashtagsFocus() {
  textHashtags.addEventListener('keydown', addStopPropagation);
}

function onDescriptionFocus() {
  textDescription.addEventListener('keydown', addStopPropagation);
}


const loadForm = () => {
  loadValidation();
  imgUploadForm.addEventListener('change',onChangeForm);
  imgUploadForm.addEventListener('submit', (evt) => {
    pristine.validate();
    evt.preventDefault();


});
};

export { loadForm };
