import {
  HASHTAG_REGEX,
  HASHTAG_MIN_SYMBOLS,
  HASHTAG_MAX_SYMBOLS,
  HASHTAG_MAX_NUMBER,
  COMMENT_MAX_SYMBOLS
} from './const.js';

const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');


const breakStringToWords = (value) => (
  value.trim().toLowerCase().split(' ').filter((hashtag) => (hashtag !== ''))
);

const validateHashtagsStartSymbol = (value) => (
  breakStringToWords(value).every((hashtag) => (hashtag.startsWith('#')))
);

const validateHashtagsRegExp = (value) => (
  breakStringToWords(value).every((hashtag) => (HASHTAG_REGEX.test(hashtag)))
);

const validateHashtagsOnlyHash = (value) => (
  !(breakStringToWords(value).some((hashtag) => (hashtag === '#')))
);

const validateHashtagsLength = (value) => (
  breakStringToWords(value).every((tag) => (tag.length >= HASHTAG_MIN_SYMBOLS + 1 && tag.length <= HASHTAG_MAX_SYMBOLS + 1))
);

const validateHashtagsUnique = (value) => {
  const hashtags = breakStringToWords(value);
  return hashtags.length === new Set(hashtags).size;
};

const validateHashtagsNumber = (value) => (
  breakStringToWords(value).length <= HASHTAG_MAX_NUMBER
);

const validateCommentSymbols = (value) => (
  value.length <= COMMENT_MAX_SYMBOLS
);


const pristine = new Pristine(uploadForm, {
  classTo: 'input-wrapper',
  errorTextParent: 'input-wrapper',
  errorTextClass: 'input-wrapper-error',
  errorTextTag: 'span'
});

pristine.addValidator(textHashtags, validateHashtagsStartSymbol, 'Хэш-тег должен начинаться с символа # (решётка)', 1, true);
pristine.addValidator(textHashtags, validateHashtagsOnlyHash, 'Хэш-тег не может состоять только из одной решётки', 2, true);
pristine.addValidator(textHashtags, validateHashtagsLength, `Длина хэш-тега должна быть от ${HASHTAG_MIN_SYMBOLS} до ${HASHTAG_MAX_SYMBOLS} символов`);
pristine.addValidator(textHashtags, validateHashtagsRegExp, 'Хеш-тег не должен содержать спец-символы и пробелы');
pristine.addValidator(textHashtags, validateHashtagsUnique, 'У вас хэш-теги повторяются');
pristine.addValidator(textHashtags, validateHashtagsNumber, `Слишком много хэш-тегов. (Не больше ${HASHTAG_MAX_NUMBER})`);
pristine.addValidator(textDescription, validateCommentSymbols, `Максимальное количество символов в комментарии = ${COMMENT_MAX_SYMBOLS}`);

const validateForm = () => pristine.validate();

export { validateForm };
