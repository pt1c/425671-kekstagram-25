
function getRandomInt(from, to){
  let cFrom = parseInt(from, 10);
  let cTo = parseInt(to, 10);

  if(cFrom < 0 || cTo <0){
    //error Ошибочный диапозон
    return '';
  }
  if (cFrom === cTo) {return from;}
  if(cTo<cFrom) {[cFrom, cTo] = [cTo, cFrom];}

  return Math.floor(Math.random() * cTo) + cFrom;
}

function checkMaxStringLength(inputString, maxLenght){
  return !(inputString.length > maxLenght);
}

//Тестовые вызовы функций
getRandomInt(1, 10);
checkMaxStringLength('Тестовая строка', 16);
