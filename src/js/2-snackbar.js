import iziToast from "izitoast";                                        // Описаний у документації
import "izitoast/dist/css/iziToast.min.css";                            // Додатковий імпорт стилів
 
const form = document.querySelector('.form');                           //отримуємо доступ до форми за класом

form.addEventListener('submit', (event) => {                            //додаємо слухача подій на відправку форми
  event.preventDefault();                                               //відміняємо стандартну поведінку форми

  const delay = Number(form.elements.delay.value);                      //отримуємо значення delay і приводимо його до числа
  const state = form.elements.state.value;                              //отримуємо значення state

  console.log(delay, state);                                            //перевіряємо чи правильно отримали значення

  createPromise(delay, state)                                           //створюємо проміс з отриманими значеннями
    .then(delay => {                                                    //обробляємо виконаний проміс
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`, 
        position: 'topRight',
      });                                                               //виводимо повідомлення про успішне виконання
    })                                                                  //виконуємо функцію     
    .catch(delay => { 
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: "topRight",
      });                                                               //виводимо повідомлення про відхилення
    });                                                                 //обробляємо відхилений проміс
    event.currentTarget.reset();                                        //скидаємо форму після обробки
});

function createPromise(delay, state) {                                  //функція створення промісу
  return new Promise((resolve, reject) => {
    setTimeout(() => {                                                  //виконуємо функцію через вказаний delay
      if (state === "fulfilled") {                                      //якщо стан виконаний
        resolve(delay);
      } else {                                                          //якщо стан не виконаний
        reject(delay);
      }                                                                 //перевіряємо стан і виконуємо або відхиляємо проміс
    }, delay);                                                          //затримка перед виконанням функції
  })                                                                    //повертаємо проміс, який виконається або відхилиться через вказаний delay
}
