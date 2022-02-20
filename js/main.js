
function getRandomInt(from, to){
  if (from === to) {return from;}
  if(to<from) {[from, to] = [to, from];}

  return Math.floor(Math.random() * to) + from;
}

function checkMaxStringLength(inputString, maxLenght){
  return inputString.length <= maxLenght;
}

//Тестовые вызовы функций
getRandomInt(1, 10);
checkMaxStringLength('Тестовая строка', 16);
