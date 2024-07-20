import '../vendor/pristine/pristine.min.js';

const MAX_COUNT = 5;

const MAX_SYMBOLS = 20;

const MAX_COMMENT_LENGTH = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textComments = imgUploadForm.querySelector('.text__description');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const returnCommentErrMessage = (value) => {
  let message = '';
  if (value.length > MAX_COMMENT_LENGTH) {
    message = `Максимальная длина комментария ${MAX_COMMENT_LENGTH} символов`;
    return message;
  }
  return message;
};

const returnHashTagErrMessage = (value) => {
  let message = '';
  const elementValue = value.trim().toLowerCase().split(/ +/g);
  const elementSet = new Set();

  if (elementValue.length > MAX_COUNT) {
    message = `Максимум ${MAX_COUNT} хэш-тегов`;
    return message;
  }

  elementValue.forEach((element, index) => {
    if (index === 0 && element.length === 0) {
      return message;
    }

    if (element.length > MAX_SYMBOLS) {
      message = `Максимальная длина одного хэш-тега ${MAX_SYMBOLS} символов, включая решетку`;
      return message;
    }

    if (element[0] !== '#') {
      message = 'Хеш-тег должен начинаться с #';
      return message;
    }

    if (element.indexOf('#', 1) >= 1) {
      message = 'Хэш-теги разделяются пробелами';
      return message;
    }

    if (element === '#') {
      message = 'Хеш-тег не может состоять только из одной решётки';
      return message;
    }

    if (/[^a-z0-9а-я#]/.test(element)) {
      message = 'Строка после решётки должна состоять только из букв и чисел';
      return message;
    }

    if (elementSet.has(element)) {
      message = 'Хэш-теги не должны повторяться';
      return message;
    }

    elementSet.add(element);
  });

  return message;
};

const loadValidation = () => {
  const errHashTagsMessage = (value) => returnHashTagErrMessage(value);
  pristine.addValidator(textHashtags, (value) => {
    const res = Boolean(returnHashTagErrMessage(value));
    return !res;
  }, errHashTagsMessage);

  const errCommentMessage = (value) => returnCommentErrMessage(value);
  pristine.addValidator(textComments, (value) => {
    const res = Boolean(returnCommentErrMessage(value));
    return !res;
  }, errCommentMessage);
};

const clearValidation = () => {
  pristine.destroy();
};

export {
  loadValidation,
  clearValidation,
  pristine
};
