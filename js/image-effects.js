const imageUploadPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectLevelFieldset = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');


const effects = {
  'none': {
    filterName: 'none',
    className: '',
    unit: '',
    sliderOptions: {
      range: {
        min: 0,
        max: 0
      },
      start: 0,
      step: 0,
    }},
  'chrome': {
    filterName: 'grayscale',
    className: 'chrome',
    unit: '',
    sliderOptions: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
    }},
  'sepia': {
    filterName: 'sepia',
    className: 'sepia',
    unit: '',
    sliderOptions: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
    }},
  'marvin': {
    filterName: 'invert',
    className: 'marvin',
    unit: '%',
    sliderOptions: {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1,
    }},
  'phobos': {
    filterName: 'blur',
    className: 'phobos',
    unit: 'px',
    sliderOptions: {
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1,
    }},
  'heat': {
    filterName: 'brightness',
    className: 'heat',
    unit: '',
    sliderOptions: {
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1,
    }}
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => (Number.isInteger(value)) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

effectLevelSlider.noUiSlider.on('update', () => {
  const selectedFilter = effectsList.querySelector('input:checked').value;
  const sliderValue = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  imageUploadPreview.style.filter = `${effects[selectedFilter].filterName}(${sliderValue}${effects[selectedFilter].unit})`;
});

const resetSlider = () => {
  effectLevelSlider.classList.add('hidden');
  effectLevelFieldset.classList.add('hidden');
  imageUploadPreview.style.filter = 'none';
  effectsList.querySelector('#effect-none').checked = true;
};

const effectsHandler = (evt) => {
  imageUploadPreview.classList = '';

  if (evt.target.value === 'none') {
    resetSlider();
  } else {
    effectLevelSlider.classList.remove('hidden');
    effectLevelFieldset.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions(effects[evt.target.value].sliderOptions);
    imageUploadPreview.classList.add(`effects__preview--${effects[evt.target.value].className}`);
  }
};

export { effectsHandler, resetSlider, effectsList };
