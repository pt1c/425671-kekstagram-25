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


// разбивает всю строку хэш-тэгов на отдельные по пробелу
// хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
// хэш-теги разделяются пробелами;
const breakStringToWords = (value) => (
  value.trim().toLowerCase().split(' ').filter((hashtag) => (hashtag !== ''))
);

// хэш-тег начинается с символа # (решётка);
const validateHashtagsStartSymbol = (value) => (
  breakStringToWords(value).every((hashtag) => (hashtag.startsWith('#')))
);

//строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
const validateHashtagsRegExp = (value) => (
  breakStringToWords(value).every((hashtag) => (HASHTAG_REGEX.test(hashtag)))
);

//хеш-тег не может состоять только из одной решётки;
const validateHashtagsOnlyHash = (value) => (
  !(breakStringToWords(value).some((hashtag) => (hashtag === '#')))
);

// максимальная длина одного хэш-тега 20 символов, включая решётку;
const validateHashtagsLength = (value) => (
  breakStringToWords(value).every((tag) => (tag.length >= HASHTAG_MIN_SYMBOLS && tag.length <= HASHTAG_MAX_SYMBOLS))
);

// один и тот же хэш-тег не может быть использован дважды;
const validateHashtagsUnique = (value) => {
  const hashtags = breakStringToWords(value);
  return hashtags.length === new Set(hashtags).size;
};

// нельзя указать больше пяти хэш-тегов;
const validateHashtagsNumber = (value) => (
  breakStringToWords(value).length <= HASHTAG_MAX_NUMBER
);

//длина комментария не может составлять больше 140 символов;
const validateCommentSymbols = (value) => (
  value.length <= COMMENT_MAX_SYMBOLS
);


//инициализация библиотеки
const pristine = new Pristine(uploadForm, {
  classTo: 'input-wrapper',
  errorTextParent: 'input-wrapper',
  errorTextClass: 'input-wrapper-error',
  errorTextTag: 'span'
});

// подключение правил
pristine.addValidator(textHashtags, validateHashtagsStartSymbol, 'Хэш-тег должен начинаться с символа # (решётка)');
pristine.addValidator(textHashtags, validateHashtagsRegExp, 'Хеш-тег не должен содержать спец-символы и пробелы');
pristine.addValidator(textHashtags, validateHashtagsOnlyHash, 'Хэш-тег не может состоять только из одной решётки');
pristine.addValidator(textHashtags, validateHashtagsLength, `Длина хэш-тега должна быть от ${HASHTAG_MIN_SYMBOLS} до ${HASHTAG_MAX_SYMBOLS} символов`);
pristine.addValidator(textHashtags, validateHashtagsUnique, 'У вас хэш-теги повторяются');
pristine.addValidator(textHashtags, validateHashtagsNumber, `Слишком много хэш-тегов. (Не больше ${HASHTAG_MAX_NUMBER})`);
pristine.addValidator(textDescription, validateCommentSymbols, `Максимальное количество символов в комментарии = ${COMMENT_MAX_SYMBOLS}`);

uploadForm.addEventListener('submit', (evt) => {
  if(!pristine.validate()){
    evt.preventDefault();
  }
});
