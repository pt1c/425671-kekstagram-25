import { ENDPOINT_FETCH, ENDPOINT_SEND } from './const.js';

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
      return response.text();
    })
    .then(successCallback)
    .catch(failCallback);
};

export { fetchData, sendData };
