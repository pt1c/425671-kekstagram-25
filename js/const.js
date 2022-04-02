const DEBUG = false;
const FAKE_POSTS = 25;
const MAX_TRIES = 1000000;
const HASHTAG_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const HASHTAG_MIN_SYMBOLS = 2;
const HASHTAG_MAX_SYMBOLS = 20;
const HASHTAG_MAX_NUMBER = 5;
const COMMENT_MAX_SYMBOLS = 140;
const COMMENTS_PER_PAGE = 5;
const SCALER_MIN = 25;
const SCALER_MAX = 100;
const SCALER_STEP = 25;
const ENDPOINT_FETCH = 'https://25.javascript.pages.academy/kekstagram/data';
const ENDPOINT_SEND = 'https://25.javascript.pages.academy/kekstagram';

export {
  DEBUG,
  FAKE_POSTS,
  MAX_TRIES,
  HASHTAG_REGEX,
  HASHTAG_MIN_SYMBOLS,
  HASHTAG_MAX_SYMBOLS,
  HASHTAG_MAX_NUMBER,
  COMMENT_MAX_SYMBOLS,
  COMMENTS_PER_PAGE,
  SCALER_MIN,
  SCALER_MAX,
  SCALER_STEP,
  ENDPOINT_FETCH,
  ENDPOINT_SEND
};
