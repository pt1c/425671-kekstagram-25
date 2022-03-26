import { MAX_TRIES } from './const.js';
import { getRandomInt } from './util.js';

const NAMES = [
  'Кирилл',
  'Ольга',
  'Александр',
  'Михаил',
  'Светлана',
  'Елена'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Самая классная фотография',
  'Лучший день',
  'Новый друг',
  'Прикольный ракурс',
  'Забыл выставить экспозицию',
  'Мы за мир!'
];

const usedCommentsIds = [];

const getRandomUniqueId = (from, to, usedIds) => {
  for (let i = 0; i < MAX_TRIES; i++) {
    const randomId = getRandomInt(from, to);
    if (!usedIds.includes(randomId)) {
      usedIds.push(randomId);
      return randomId;
    }
  }
};

const getRandomArrayValue = (inputArray) => inputArray[getRandomInt(0, inputArray.length - 1)];
const getRandomAvatar = () => `img/avatar-${getRandomInt(1, 6)}.svg`;
const getRandomUniquePhoto = (usedPhotoIds) => `photos/${ getRandomUniqueId(1,25, usedPhotoIds) }.jpg`;
const getRandomUniqueCommentId = () => getRandomUniqueId(1, 1000, usedCommentsIds);

const generateComments = (amount) => {
  const comments = [];

  for (let i = 0; i < amount; i++) {
    comments.push({
      id: getRandomUniqueCommentId(),
      avatar: getRandomAvatar(),
      message: getRandomArrayValue(MESSAGES),
      name: getRandomArrayValue(NAMES)
    });
  }

  return comments;
};

const generatePosts = (amount) => {
  const posts = [];
  const usedCommonIds = [];
  const usedPhotoIds = [];

  for (let i = 0; i < amount; i++) {
    posts.push({
      id: getRandomUniqueId(1, 25, usedCommonIds),
      url: getRandomUniquePhoto(usedPhotoIds),
      description: getRandomArrayValue(DESCRIPTIONS),
      likes: getRandomInt(15, 200),
      comments: generateComments(getRandomInt(1, 20))
    });
  }

  return posts;
};

export { generatePosts };
