import '../vendor/nouislider/nouislider.js';
// import '../vendor/nouislider/nouislider.css';


const sliderElement = document.querySelector('.effect-level__slider');

const imgUploadScale = document.querySelector('.img-upload__scale');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const imgUploadPreview = document.querySelector('.img-upload__preview img');

const MIN_ZOOM_SCALE = 25;
const MAX_ZOMM_SCALE = 100;
const STEP_ZOOM_SCALE = 25;

const disableScaleControlButton = (val) => {
  if (val <= MIN_ZOOM_SCALE) {
    scaleControlSmaller.setAttribute('disabled',true);
  }

  if (val >= MAX_ZOMM_SCALE) {
    scaleControlBigger.setAttribute('disabled',true);
  }

  if (val >= MIN_ZOOM_SCALE + 1 && val <= MAX_ZOMM_SCALE - 1) {
    scaleControlSmaller.removeAttribute('disabled');
    scaleControlBigger.removeAttribute('disabled');
  }
};

const onScaleControl = function(val) {
  return (evt) => {
    if (evt.target.classList.contains('scale__control--smaller')) {
      val -= STEP_ZOOM_SCALE;
    }
    if (evt.target.classList.contains('scale__control--bigger')) {
      val += STEP_ZOOM_SCALE;
    }
    disableScaleControlButton(val);
    imgUploadPreview.style.transform = `scale(${val / 100})`;
    scaleControlValue.value = `${val}%`;
  };
};

const changeScale = () => {
  const value = parseInt(scaleControlValue.value, 10);
  disableScaleControlButton(value);
  imgUploadScale.addEventListener('click', onScaleControl(value));
};

const effectsList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const valueElement = document.querySelector('.effect-level__value');

const addSlider = () => {
  sliderContainer.classList.add('hidden');
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  effectsList.addEventListener('change', onChangeEffectPhoto);
};
const onChangeEffectPhoto = (evt) => {
  evt.stopPropagation();
  if (evt.target.value !== 'none') {
    sliderContainer.classList.remove('hidden');
  } else {
    sliderContainer.classList.add('hidden');
  }
  if (evt.target.value === 'chrome') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }
  if (evt.target.value === 'sepia') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }
  if (evt.target.value === 'marvin') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }
  if (evt.target.value === 'phobos') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
  if (evt.target.value === 'heat') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
  sliderElement.noUiSlider.on('update', (values, handle) => {
    valueElement.value = sliderElement.noUiSlider.get();
    const effect = evt.target.dataset.effect;//добавил дата атрибуты в разметку в ручную
    const unit = evt.target.dataset.unit;//можно ли менять разметку
    imgUploadPreview.style.filter = `${effect}(${sliderElement.noUiSlider.get()}${unit})`;
  });
};

const addImgRedactor = () => {
  changeScale();
  if (!sliderElement.noUiSlider) {
    addSlider();
  }
};

const closeImgRedactor = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
  imgUploadPreview.style = '';
  effectsList.removeEventListener('change', onChangeEffectPhoto);
  imgUploadScale.removeEventListener('click', onScaleControl);
};

export {
  addImgRedactor,
  closeImgRedactor
};


