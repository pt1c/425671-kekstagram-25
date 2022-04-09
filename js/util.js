import { DEBOUNCE_DELAY } from './const.js';

const isEscapeKey = (evt) => evt.key === 'Escape';

const stopEscapePropagation = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

function debounce (callback, timeoutDelay = DEBOUNCE_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export { isEscapeKey, stopEscapePropagation, debounce, shuffle };
