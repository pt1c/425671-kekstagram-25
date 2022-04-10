import { isEscapeKey } from './util.js';

const errorFetch = document.querySelector('#fetch-error').content.querySelector('.fetch-error').cloneNode(true);
const successModal = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successButton = successModal.querySelector('.success__button');
const errorModal = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorModal.querySelector('.error__button');

const showFetchError = (error) => {
  document.body.append(errorFetch);
  errorFetch.querySelector('.fetch-error__details').textContent = error;
};

const removeSendSuccess = () => {
  document.removeEventListener('click', sendSuccessClickHandler);
  document.removeEventListener('keydown', sendSuccessKeyDownHandler);
  successModal.remove();
};

function sendSuccessClickHandler(evt) {
  if (evt.target === successButton || evt.target === successModal) {
    removeSendSuccess();
  }
}

function sendSuccessKeyDownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeSendSuccess();
  }
}

const showSendSuccess = () => {
  document.body.append(successModal);
  document.addEventListener('click',sendSuccessClickHandler);
  document.addEventListener('keydown', sendSuccessKeyDownHandler);
};

const removeSendError = () => {
  document.removeEventListener('click', sendErrorClickHandler);
  document.removeEventListener('keydown',sendErrorKeyDownHandler);
  errorModal.remove();
};

function sendErrorClickHandler(evt) {
  if (evt.target === errorButton || evt.target === errorModal) {
    removeSendError();
  }
}

function sendErrorKeyDownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeSendError();
  }
}

const showSendError = () => {
  document.body.append(errorModal);
  document.addEventListener('click', sendErrorClickHandler);
  document.addEventListener('keydown', sendErrorKeyDownHandler);
};


export {
  showFetchError,
  showSendSuccess,
  showSendError
};
