import '../vendor/pristine/pristine.min.js';

const MAX_COUNT = 5;

const MAX_SYMBOLS = 20;

const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass : 'img-upload__field-wrapper--error',
  // successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  // errorTextTag: 'span',
  // errorTextClass: 'img-upload__field-wrapper__error-text',
});

const returnMessage = (value) => {
  let message = '';
  const elementValue = value.trim().toLowerCase().split(/ +/g);
  if (elementValue.length > MAX_COUNT) {// переделать на forEach?
    message = `Максимум ${MAX_COUNT} хэш-тегов`;
    return message;
  }
  for (let i = 0; i < elementValue.length; i++) {
    if (elementValue[0].length === 0) {
      return message;
    }
    if (elementValue[i].length > MAX_SYMBOLS) {
      message = `Максимальная длина одного хэш-тега ${MAX_SYMBOLS} символов, включая решетку`;
      return message;
    }
    if (elementValue[i][0] !== '#') {
      message = 'Хеш-тег должен начинаться с #';
      return message;
    }
    if (elementValue[i].indexOf('#', 1) >= 1) {
      message = 'Хэш-теги разделяются пробелами';
      return message;
    }
    if (elementValue[i] === '#') {
      message = 'Хеш-тег не может состоять только из одной решётки';
      return message;
    }
    if (/[^a-z0-9а-я#]/.test(elementValue[i])) {
      message = 'Строка после решётки должна состоять только из букв и чисел';
      return message;
    }
    if (elementValue.indexOf(elementValue[i], i + 1) >= i + 1) {//переделать на set
      message = 'Хэш-теги не должны повторяться';
      return message;
    }
  }
  return message;
};

//добавить валидацию поля комментариев

//добавить сброс pristine -> closeModalForm

const loadValidation = () => {
  const errMessage = (value) => returnMessage(value);
  pristine.addValidator(textHashtags, (value) => {
    const res = Boolean(returnMessage(value));
    return !res;
  }, errMessage);
};

export { loadValidation };
