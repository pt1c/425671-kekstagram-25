import { ENDPOINT_FETCH, ENDPOINT_SEND } from './const.js';

// получает данные с сервера
const fetchData = (successCallback, failCallback, url = ENDPOINT_FETCH) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} — ${response.statusText}`);
      }
      return response;
    })
    .then((response) => response.json())
    .then(successCallback)
    .catch(failCallback);
};

//отправляет данные на сервер
const sendData = (successCallback, failCallback, body, url = ENDPOINT_SEND) => {
  fetch(url,
    {
      method: 'POST',
      body
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} — ${response.statusText}`);
      }
      //return response.json();
      return response.text();
    })
    .then(successCallback)
    .catch(failCallback);
};

export { fetchData, sendData };
