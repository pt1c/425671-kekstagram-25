import {
  SCALER_MIN,
  SCALER_MAX,
  SCALER_STEP
} from './const.js';

const imagePreview = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');

let scaleValue = SCALER_MAX;

const setScale = (value) => {
  scaleControlValue.value = value;
  imagePreview.style.transform = `scale(${(value / 100)})`;
};

const resetScaler = () => {
  setScale(SCALER_MAX);
};

const scaleHandler = (evt) => {
  if (evt.target.classList.contains('scale__control--smaller')) {
    scaleValue -= SCALER_STEP;
  }

  if (evt.target.classList.contains('scale__control--bigger')) {
    scaleValue += SCALER_STEP;
  }

  if (scaleValue < SCALER_MIN) {
    scaleValue = SCALER_MIN;
  }

  if (scaleValue > SCALER_MAX) {
    scaleValue = SCALER_MAX;
  }
  setScale(scaleValue);
};


export { scaleHandler, resetScaler };
