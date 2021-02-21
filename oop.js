/*Заявка в школу разработчиков Improve*/
{
  const form = document.querySelector("form[name = numberInput]");
  const inputNumber = form.querySelector("input");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); //отключает обновление страницы при отправке формы
    const value = Number(inputNumber.value);
    console.log(value);
    startProgram(value);
    inputNumber.value = "";
  });

  function startProgram(totalArrays) {
    if (totalArrays > 5000 || totalArrays < 1 || !Number.isInteger(totalArrays)) {
      //если длина больше 12к начинаются краши, ограничил длину массива до 5к
      alert("Введите число от 1 до 5000");
      return;
    }
    try {
      array = getLengthArrays(totalArrays);
      deleteValuesHTML();
      array.forEach((item) => outputValuesHTML(item));//вывод в html
      console.log(array);
    } catch (e) {
      alert(`При загрузке произошла непредвиденная ошибка ${e}`);
    }
  }

  function getLengthArrays(totalArrays) {
    let arrayOutput = new Map();//использую словарь, потому что можно быстро проверить совпадение длин массивов
    let lengthArray;
    for (let numberArray = 0; numberArray < totalArrays; numberArray++) {
      do {
        lengthArray = randomNumber(1, totalArrays * 2);
      } while (arrayOutput.has(lengthArray));//проверка на совпадение длин массивов
      arrayOutput.set(lengthArray, generateArrays(lengthArray, numberArray));
    }
    return Array.from(arrayOutput.values());//преобразование в массив массивов
  }

  function generateArrays(lengthArray, numberArray) {
    let array = new Array();
    let itemArray;
    for (let i = 0; i < lengthArray; i++) {
      itemArray = randomNumber(1, lengthArray * 2);
      array.push(itemArray);
    }
    return sortArrays(array, numberArray);
  }

  function sortArrays(array, numberArray) {
    numberArray++;//добавляю единицу, так как в html список начинается с 1, а не с 0
    if (numberArray % 2 == 0) {
      return array.sort((a, b) => a - b);
    } else {
      return array.sort((a, b) => b - a);
    }
  }

  function randomNumber(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function outputValuesHTML(value) {
    const text = document.createElement("li");
    const list = document.querySelector(".list");
    text.textContent = value;
    list.appendChild(text);
  }

  function deleteValuesHTML() {
    const elements = document.querySelectorAll("li");
    if (elements.length !== 0) {
      for (element of elements)
        element.remove();
    }
  }
}
