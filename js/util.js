const isEscapeKey = (evt) => evt.key === 'Escape';

const stopEscapePropagation = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

export { isEscapeKey, stopEscapePropagation };
