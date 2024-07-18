import '../vendor/nouislider/nouislider.js';

const sliderElement = document.querySelector('.effect-level__slider');

const imgUploadScale = document.querySelector('.img-upload__scale');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const imgUploadPreview = document.querySelector('.img-upload__preview img');

const MIN_ZOOM_SCALE = 25;
const MAX_ZOMM_SCALE = 100;
const STEP_ZOOM_SCALE = 25;
const DENOM_ZOOM_SCALE = 100;

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
    imgUploadPreview.style.transform = `scale(${val / DENOM_ZOOM_SCALE})`;
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

function onChangeEffectPhoto (evt) {
  evt.stopPropagation();

  if (evt.target.value === 'none') {
    sliderContainer.classList.add('hidden');
    imgUploadPreview.style.filter = null;
  } else {
    sliderContainer.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effects[evt.target.value].min,
        max: effects[evt.target.value].max,
      },
      start: effects[evt.target.value].start,
      step: effects[evt.target.value].step,
    });

    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();

      const effectValue = effects[evt.target.value].filter;
      const unit = effects[evt.target.value].unit;

      imgUploadPreview.style.filter = `${effectValue}(${valueElement.value}${unit})`;
    });
  }
}

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


