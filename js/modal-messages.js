import { DEBUG } from './const.js';
import { isEscapeKey } from './util.js';

const errorFetchElement = document.querySelector('#fetch-error').content.querySelector('.fetch-error').cloneNode(true);
const successElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successElementButton = successElement.querySelector('.success__button');
const errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorElementButton = errorElement.querySelector('.error__button');

/* DEBUG */
const addDebugInfo = (data, selector) => {
  if (DEBUG) {
    const debugParagraph = document.createElement('p');
    debugParagraph.textContent = data;
    selector.append(debugParagraph);
  }
};

/* окно ошибки при заугрузке */
const showFetchError = (error) => {
  document.body.append(errorFetchElement);
  errorFetchElement.querySelector('.fetch-error__details').textContent = error;
};

/* окно успеха при отправке */
const removeSendSuccess = (evt) => {
  if (isEscapeKey(evt) || (evt.type === 'click' && (evt.target === successElementButton || evt.target === successElement))) {
    document.removeEventListener('click', removeSendSuccess);
    document.removeEventListener('keydown', removeSendSuccess);
    successElement.remove();
  }
};

const showSendSuccess = (data) => {
  document.body.append(successElement);
  document.addEventListener('click', removeSendSuccess);
  document.addEventListener('keydown', removeSendSuccess);
  addDebugInfo(data, successElement.querySelector('.success__inner'));
};

/* окно ошибки при отправке */
const removeSendError = (evt) => {
  if (isEscapeKey(evt) || (evt.type === 'click' && (evt.target === errorElementButton || evt.target === errorElement))) {
    document.removeEventListener('click', removeSendError);
    document.removeEventListener('keydown', removeSendError);
    errorElement.remove();
  }
};

const showSendError = (data) => {
  document.body.append(errorElement);
  document.addEventListener('click', removeSendError);
  document.addEventListener('keydown', removeSendError);
  addDebugInfo(data, errorElement.querySelector('.error__inner'));
};


export {
  showFetchError,
  showSendSuccess,
  showSendError
};
