const getRandomInt = (from, to) => {
  if (to < from) {
    [from, to] = [to, from];
  }

  return Math.floor(Math.random() * (to - from + 1) + from);
};

const checkMaxStringLength = (inputString, maxLenght) => inputString.length <= maxLenght;

export { getRandomInt, checkMaxStringLength };
