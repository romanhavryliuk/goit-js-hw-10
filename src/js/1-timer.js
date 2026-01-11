import flatpickr from 'flatpickr';                                          // Описаний у документації flatpickr
import 'flatpickr/dist/flatpickr.min.css';                                  // Додатковий імпорт стилів

import iziToast from 'izitoast';                                            // Описаний у документації 
import 'izitoast/dist/css/iziToast.min.css';                                // Додатковий імпорт стилів

const input = document.querySelector('#datetime-picker');                   //отримуємо доступ до інпуту за id
//отримуємо доступ до елемента за дата-атрибутом
const startBtn = document.querySelector('[data-start]');                    
const daysEl = document.querySelector('[data-days]');                       
const hoursEl = document.querySelector('[data-hours]');                     
const minutesEl = document.querySelector('[data-minutes]');                 
const secondsEl = document.querySelector('[data-seconds]');                 

startBtn.disabled = true;                                                   //деактивуємо кнопку за замовчуванням

let userSelectedDate = null;                                                //змінна для збереження вибраної дати користувачем
let timerId = null;                                                         //змінна для збереження ідентифікатора таймера

// Ініціалізація flatpickr
flatpickr(input, {                                                          
  enableTime: true,                                                         //дозволяємо вибір часу
  time_24hr: true,                                                          //використовуємо 24-годинний формат
  defaultDate: new Date(),                                                  //встановлюємо поточну дату за замовчуванням
  minuteIncrement: 1,                                                       //крок збільшення хвилин
  onClose(selectedDates) {                                                  //функція, яка виконується при закритті календаря
    const selectedDate = selectedDates[0];                                  //отримуємо вибрану дату

    if (selectedDate <= new Date()) {                                       //перевіряємо чи вибрана дата в майбутньому
      startBtn.disabled = true;                                             //деактивуємо кнопку запуску таймера
      userSelectedDate = null;                                              //скидаємо вибрану дату

      iziToast.error({                                                      //виводимо повідомлення про помилку
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      return;                                                               //зупиняємо виконання функції
    }

    userSelectedDate = selectedDate;                                        //зберігаємо вибрану дату
    startBtn.disabled = false;                                              //активуємо кнопку запуску таймера
  },
});

startBtn.addEventListener('click', startTimer);                             //додаємо слухача подій на кнопку запуску таймера

function startTimer() {                                                     //функція запуску таймера
  if (!userSelectedDate) return;                                            //перевіряємо чи вибрана дата

  startBtn.disabled = true;                                                 //деактивуємо кнопку запуску таймера    
  input.disabled = true;                                                    //деактивуємо інпут вибору дати

  timerId = setInterval(() => {                                             //запускаємо інтервал для оновлення таймера щосекунди
    const diff = userSelectedDate - new Date();                             //обчислюємо різницю між вибраною датою і поточною

    if (diff <= 0) {                                                        //перевіряємо чи таймер досяг нуля
      clearInterval(timerId);                                               //зупиняємо інтервал таймера
      updateTimer(0);                                                       //оновлюємо відображення таймера на нуль    
      input.disabled = false;                                               //активуємо інпут вибору дати
      return;                                                               //зупиняємо виконання функції
    }

    updateTimer(diff);                                                      //оновлюємо відображення таймера з обчисленою різницею
  }, 1000);                                                                 //інтервал 1000 мс (1 секунда)
}

function updateTimer(ms) {                                                  //функція оновлення таймера
  const { days, hours, minutes, seconds } = convertMs(ms);                  //конвертуємо мс в дні, години, хвилини, секунди

  daysEl.textContent = days;                                                //оновлюємо відображення днів
  hoursEl.textContent = addLeadingZero(hours);                              //оновлюємо відображення годин
  minutesEl.textContent = addLeadingZero(minutes);                          //оновлюємо відображення хвилин
  secondsEl.textContent = addLeadingZero(seconds);                          //оновлюємо відображення секунд
}

function addLeadingZero(value) {                                            //функція додавання провідного нуля
  return String(value).padStart(2, '0');                                    //перетворюємо значення в рядок і додаємо провідний нуль, якщо потрібно
}

function convertMs(ms) {                                                    //функція конвертації мс в дні, години, хвилини, секунди
  const second = 1000;                                                      //кількість мс в секунді
  const minute = second * 60;                                               //кількість мс в хвилині
  const hour = minute * 60;                                                 //кількість мс в годині
  const day = hour * 24;                                                    //кількість мс в дні

  return {                                                                  //повертаємо об'єкт з розділеними значеннями
    days: Math.floor(ms / day),                                             //використовуємо цілі числа для округлення
    hours: Math.floor((ms % day) / hour),                                   //використовуємо залишок від ділення для округлення
    minutes: Math.floor((ms % hour) / minute),                              //використовуємо залишок від ділення для округлення
    seconds: Math.floor((ms % minute) / second),                            //використовуємо залишок від ділення для округлення
  };
}
