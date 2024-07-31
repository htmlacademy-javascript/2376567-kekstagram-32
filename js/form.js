import { isEscKey } from './util.js';
import { loadValidation } from './validation.js';
import { clearValidation } from './validation.js';
import { pristine } from './validation.js';
import { closeImgRedactor } from './edit-picture.js';
import { addImgRedactor } from './edit-picture.js';
import { postData } from './api.js';
import { imgLoader } from './load-picture.js';

const body = document.querySelector('body');

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const uploadSubmitButton = imgUploadForm.querySelector('#upload-submit');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');

const clearForm = () => {
  const imgUploadFieldWrapper = document.querySelector('.img-upload__field-wrapper');
  imgUploadForm.removeEventListener('input',onSubmitButton);
  closeImgRedactor();
  imgUploadForm.reset();
  clearValidation();
  imgUploadFieldWrapper.classList.remove('img-upload__field-wrapper--error');
};

const closeModalForm = () => {
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  uploadCancelButton.removeEventListener('click', onLoadButtonClose);
  document.removeEventListener('keydown', onLoadModalEscClose);
  textHashtags.removeEventListener('focus', onTextHashtagsFocus);
  textDescription.removeEventListener('focus', onTextHashtagsFocus);
  clearForm();
};

const openModalForm = () => {
  imgUploadForm.addEventListener('input',onSubmitButton);
  imgUploadForm.addEventListener('submit',onSubmitForm);
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadCancelButton.addEventListener('click', onLoadButtonClose);
  document.addEventListener('keydown', onLoadModalEscClose);
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

function onLoadModalEscClose(evt) {
  if (isEscKey(evt)) {
    closeModalForm();
  }
}

const disableSubmitBtn = () => {
  uploadSubmitButton.setAttribute('disabled', '');
};

const enableSubmitBtn = () => {
  uploadSubmitButton.removeAttribute('disabled','');
};

const validateForm = (validation) => {
  if (validation) {
    enableSubmitBtn();
  } else {
    disableSubmitBtn();
  }
};

const getFormData = (form) => {
  const formData = new FormData(form);
  return formData;
};

function onTextHashtagsFocus() {
  textHashtags.addEventListener('keydown', addStopPropagation);
}

function onDescriptionFocus() {
  textDescription.addEventListener('keydown', addStopPropagation);
}

function onSubmitButton() {
  validateForm(pristine.validate());
}

async function onSubmitForm(evt) {
  evt.preventDefault();
  const formDataObject = getFormData(evt.target);
  try {
    disableSubmitBtn();
    // await postData(formDataObject);
    const response = await postData(formDataObject);
    console.log('Данные успешно отправлены:', response);
    onSuccesPost();
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    onErrorPost();
  } finally {
    enableSubmitBtn();
  }
}

const loadForm = () => {
  loadValidation();
  imgLoader();
  imgUploadForm.addEventListener('change',onChangeForm);
  imgUploadInput.focus();
};

const loadMessage = (response) => {
  const result = response ? 'success' : 'error';
  const template = document.querySelector(`#${result}`).content.querySelector(`.${result}`);
  const notification = template.cloneNode(true);

  const closeMessages = () => {
    body.classList.remove('modal-open');
    notification.removeEventListener('click', onButtonMessagge);
    document.addEventListener('keydown', onLoadModalEscClose);
    document.removeEventListener('keydown', onMessagesEscClose);
    notification.remove();
  };

  function onMessagesEscClose(evt) {
    if (isEscKey(evt) && notification.isConnected) {
      closeMessages();
    }
  }

  function onButtonMessagge(evt) {
    const button = evt.target.closest(`button.${result}__button`);
    const inner = evt.target.closest(`.${result}__inner`);
    if (!inner || button) {
      closeMessages();
    }
  }

  body.classList.add('modal-open');
  notification.addEventListener('click', onButtonMessagge);
  document.removeEventListener('keydown', onLoadModalEscClose);
  document.addEventListener('keydown', onMessagesEscClose);
  body.insertAdjacentElement('beforeBegin', notification);

};

function onSuccesPost() {
  closeImgRedactor();
  loadMessage(true);
  closeModalForm();
}

function onErrorPost() {
  loadMessage(false);
  console.error(error.message);
}

export {
  loadForm,
  closeModalForm,
  loadMessage,
  disableSubmitBtn,
  enableSubmitBtn
};
