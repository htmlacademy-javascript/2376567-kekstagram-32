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
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadCancelButton = imgUploadForm.querySelector('#upload-cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
const uploadSubmitButton = imgUploadForm.querySelector('#upload-submit');
const imgUploadFieldWrapper = imgUploadForm.querySelector('.img-upload__field-wrapper');

const clearForm = () => {
  imgUploadForm.removeEventListener('input',onImgUploadFormInput);
  closeImgRedactor();
  imgUploadForm.reset();
  clearValidation();
  imgUploadFieldWrapper.classList.remove('img-upload__field-wrapper--error');
};

const addStopPropagation = (event) => {
  if (isEscKey(event)) {
    event.stopPropagation();
  }
};

const onTextHashtagsKeydown = (event) => {
  addStopPropagation(event);
};

const onTextDescriptionKeydown = (event) => {
  addStopPropagation(event);
};

const onTextHashtagsFocus = () => {
  textHashtags.addEventListener('keydown', onTextHashtagsKeydown);
};

const onTextDescriptionFocus = () => {
  textDescription.addEventListener('keydown', onTextDescriptionKeydown);
};

const closeModalForm = () => {
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  uploadCancelButton.removeEventListener('click', onUploadCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydownEsc);
  textHashtags.removeEventListener('focus', onTextHashtagsFocus);
  textDescription.removeEventListener('focus', onTextDescriptionFocus);
  textHashtags.removeEventListener('keydown', onTextHashtagsKeydown);
  textDescription.removeEventListener('keydown', onTextDescriptionKeydown);
  clearForm();
};

function onDocumentKeydownEsc(event) {
  if (isEscKey(event)) {
    closeModalForm();
  }
}

function onUploadCancelButtonClick() {
  closeModalForm();
}

const openModalForm = () => {
  imgUploadForm.addEventListener('input',onImgUploadFormInput);
  imgUploadForm.addEventListener('submit',onImgUploadFormSubmit);
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadCancelButton.addEventListener('click', onUploadCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydownEsc);
  textHashtags.addEventListener('focus', onTextHashtagsFocus);
  textDescription.addEventListener('focus', onTextDescriptionFocus);
  addImgRedactor();
};

const onImgUploadFormChange = () => {
  openModalForm();
};

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

function onImgUploadFormInput() {
  validateForm(pristine.validate());
}

async function onImgUploadFormSubmit(event) {
  event.preventDefault();
  const formDataObject = getFormData(event.target);
  try {
    disableSubmitBtn();
    await postData(formDataObject);
    handleSuccesPost();
  } catch (error) {
    handleErrorPost();
  } finally {
    enableSubmitBtn();
  }
}

const loadForm = () => {
  loadValidation();
  imgLoader();
  imgUploadForm.addEventListener('change',onImgUploadFormChange);
};

const loadMessage = (response) => {
  const result = response ? 'success' : 'error';
  const template = document.querySelector(`#${result}`).content.querySelector(`.${result}`);
  const notification = template.cloneNode(true);

  const closeMessages = () => {
    if (imgUploadOverlay.classList.contains('hidden')) {
      body.classList.remove('modal-open');
    }
    notification.removeEventListener('click', onNotificationClick);
    document.addEventListener('keydown', onDocumentKeydownEsc);
    document.removeEventListener('keydown', onDocumentKeydownEscMessage);
    notification.remove();
  };

  function onDocumentKeydownEscMessage(event) {
    if (isEscKey(event) && notification.isConnected) {
      closeMessages();
    }
  }

  function onNotificationClick(event) {
    const button = event.target.closest(`button.${result}__button`);
    const inner = event.target.closest(`.${result}__inner`);
    if (!inner || button) {
      closeMessages();
    }
  }

  notification.addEventListener('click', onNotificationClick);
  document.removeEventListener('keydown', onDocumentKeydownEsc);
  document.addEventListener('keydown', onDocumentKeydownEscMessage);
  body.insertAdjacentElement('beforeBegin', notification);
  body.classList.add('modal-open');

};

function handleSuccesPost() {
  closeImgRedactor();
  loadMessage(true);
  closeModalForm();
}

function handleErrorPost() {
  loadMessage(false);
}

export {
  loadForm,
  closeModalForm,
  loadMessage,
  disableSubmitBtn,
  enableSubmitBtn
};
