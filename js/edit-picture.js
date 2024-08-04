import '../vendor/nouislider/nouislider.js';

const MIN_ZOOM_SCALE = 25;
const MAX_ZOOM_SCALE = 100;
const STEP_ZOOM_SCALE = 25;
const DENOM_ZOOM_SCALE = 100;

const sliderElement = document.querySelector('.effect-level__slider');

const imgUploadScale = document.querySelector('.img-upload__scale');
const scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadScale.querySelector('.scale__control--value');

const imgUploadPreview = document.querySelector('.img-upload__preview img');

const effectsList = document.querySelector('.effects__list');

const sliderContainer = document.querySelector('.img-upload__effect-level');
const valueElement = sliderContainer.querySelector('.effect-level__value');

const effects = {
  none: {
    value: 'none',
    id: 'effect-none',
    filter: 'none',
  },
  chrome: {
    value: 'chrome',
    id: 'effect-chrome',
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },
  sepia: {
    value: 'sepia',
    id: 'effect-sepia',
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },
  marvin: {
    value: 'marvin',
    id: 'effect-marvin',
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
  },
  phobos: {
    value: 'phobos',
    id: 'effect-phobos',
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
  },
  heat: {
    value: 'heat',
    id: 'effect-heat',
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
  },
};

const disableScaleControlButton = (value) => {
  if (value <= MIN_ZOOM_SCALE) {
    scaleControlSmaller.setAttribute('disabled', true);
  } else {
    scaleControlSmaller.removeAttribute('disabled');
  }

  if (value >= MAX_ZOOM_SCALE) {
    scaleControlBigger.setAttribute('disabled', true);
  } else {
    scaleControlBigger.removeAttribute('disabled');
  }
};

const onImgUploadScaleClick = (value) => function controlScale(event) {
  if (event.target.classList.contains('scale__control--smaller')) {
    value = Math.max(value - STEP_ZOOM_SCALE, MIN_ZOOM_SCALE);
  }
  if (event.target.classList.contains('scale__control--bigger')) {
    value = Math.min(value + STEP_ZOOM_SCALE, MAX_ZOOM_SCALE);
  }
  disableScaleControlButton(value);
  imgUploadPreview.style.transform = `scale(${value / DENOM_ZOOM_SCALE})`;
  scaleControlValue.value = `${value}%`;
};

const changeScale = () => {
  const value = parseInt(scaleControlValue.value, 10);
  disableScaleControlButton(value);
  imgUploadScale.addEventListener('click', onImgUploadScaleClick(value));
};

const onEffectsListChange = (event) => {
  event.stopPropagation();

  if (event.target.value === 'none') {
    sliderContainer.classList.add('hidden');
    imgUploadPreview.style.filter = null;
  } else {
    sliderContainer.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effects[event.target.value].min,
        max: effects[event.target.value].max,
      },
      start: effects[event.target.value].start,
      step: effects[event.target.value].step,
    });

    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();

      const effectValue = effects[event.target.value].filter;
      const unit = effects[event.target.value].unit;

      imgUploadPreview.style.filter = `${effectValue}(${valueElement.value}${unit})`;
    });
  }
};

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
  effectsList.addEventListener('change', onEffectsListChange);
};

const addImgRedactor = () => {
  changeScale();
  if (!sliderElement.noUiSlider) {
    addSlider();
  }
};

const closeImgRedactor = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.reset();
    sliderElement.noUiSlider.destroy();
  }
  imgUploadPreview.style = '';
  effectsList.removeEventListener('change', onEffectsListChange);
  imgUploadScale.removeEventListener('click', onImgUploadScaleClick);
};

export {
  addImgRedactor,
  closeImgRedactor,
};
