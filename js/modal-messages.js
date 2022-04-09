import { isEscapeKey } from './util.js';

const errorFetchElement = document.querySelector('#fetch-error').content.querySelector('.fetch-error').cloneNode(true);
const successElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successElementButton = successElement.querySelector('.success__button');
const errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorElementButton = errorElement.querySelector('.error__button');

const showFetchError = (error) => {
  document.body.append(errorFetchElement);
  errorFetchElement.querySelector('.fetch-error__details').textContent = error;
};

const removeSendSuccess = (evt) => {
  if (isEscapeKey(evt) || (evt.type === 'click' && (evt.target === successElementButton || evt.target === successElement))) {
    document.removeEventListener('click', removeSendSuccess);
    document.removeEventListener('keydown', removeSendSuccess);
    successElement.remove();
  }
};

const showSendSuccess = () => {
  document.body.append(successElement);
  document.addEventListener('click', removeSendSuccess);
  document.addEventListener('keydown', removeSendSuccess);
};

const removeSendError = (evt) => {
  if (isEscapeKey(evt) || (evt.type === 'click' && (evt.target === errorElementButton || evt.target === errorElement))) {
    document.removeEventListener('click', removeSendError);
    document.removeEventListener('keydown', removeSendError);
    errorElement.remove();
  }
};

const showSendError = () => {
  document.body.append(errorElement);
  document.addEventListener('click', removeSendError);
  document.addEventListener('keydown', removeSendError);
};


export {
  showFetchError,
  showSendSuccess,
  showSendError
};
