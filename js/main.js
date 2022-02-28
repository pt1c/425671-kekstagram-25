

const MAX_TRIES = 1000000;

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

const usedCommonIds = Array();
const usedPhotoIds = Array();
const usedCommentsIds = Array();

const getRandomInt = (from, to) => {
  if (to < from) {
    [from, to] = [to, from];
  }

  return Math.floor(Math.random() * (to - from + 1) + from);
};

const checkMaxStringLength = (inputString, maxLenght) => inputString.length <= maxLenght;

const getRandomUniqueId = (from, to, usedIds) => {
  for (let i = 0; i < MAX_TRIES; i++) {
    const randomId = getRandomInt(from, to);
    if (!usedIds.includes(randomId)) {
      usedIds.push(randomId);
      return randomId;
    }
  }
};

const getRandomArrayValue = (inputArray) => inputArray[getRandomInt(1, inputArray.length-1)];
const getRandomAvatar = () => `img/avatar-${ getRandomInt(1, 6) }.svg`;

const generateComments = (amount) => {
  const resultArray = Array();

  for (let i = 0; i < amount; i++) {
    resultArray[i] = {
      id: getRandomUniqueId(1, 1000, usedCommentsIds),
      avatar: getRandomAvatar(),
      message: getRandomArrayValue(MESSAGES),
      name: getRandomArrayValue(NAMES)
    };
  }

  return resultArray;
};

const generatePosts = (amount) => {
  const resultArray = Array();

  for (let i = 0; i < amount; i++) {
    resultArray[i] = {
      id: getRandomUniqueId(1,25, usedCommonIds),
      url: `photos/${ getRandomUniqueId(1,25, usedPhotoIds) }.jpg`,
      description: getRandomArrayValue(DESCRIPTIONS),
      likes: getRandomInt(15, 200),
      comments: generateComments(getRandomInt(1, 5))
    };
  }

  return resultArray;
};


//Тестовые вызовы функций
generatePosts(25);
getRandomInt(1, 10);
checkMaxStringLength('Тестовая строка', 16);
