import { ENDPOINT_FETCH, ENDPOINT_SEND } from './const.js';

// получает данные с сервера
const fetchData = (successCallback, failCallback, url = ENDPOINT_FETCH) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((data) => successCallback(data))
    .catch((error) => failCallback(error));
};

//отправляет данные на сервер
const sendData = (successCallback, failCallback, body, url = ENDPOINT_SEND) => {
  fetch(url,
    {
      method: 'POST',
      body
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => successCallback(JSON.stringify(response)))
    .catch((error) => failCallback(error));
};

export { fetchData, sendData };
