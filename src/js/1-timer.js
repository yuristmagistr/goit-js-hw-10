// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector('[data-start]');
const inputTimer = document.querySelector('#datetime-picker');
const daysData = document.querySelector('[data-days]');
const hoursData = document.querySelector('[data-hours]');
const minutesData = document.querySelector('[data-minutes]');
const secondsData = document.querySelector('[data-seconds]');
const timer = document.querySelector('.timer');

let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate < Date.now()) {
            iziToast.error({
                message: 'Please choose a date in the future',
                position: 'topRight',
            });
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        }
    },
}


       
        
  
let countDownInterval;

function startTimer() {
        countDownInterval = setInterval(updateTimer, 1000, userSelectedDate);
    }
       
function updateTimer(endDate) {
    const initial = Date.now();
    const diff = endDate - initial;
    const { days, hours, minutes, seconds } = convertMs(diff);
    
    if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
        daysData.textContent = addLeadingZero(days);
        hoursData.textContent = addLeadingZero(hours);
        minutesData.textContent = addLeadingZero(minutes);
        secondsData.textContent = addLeadingZero(seconds);
    }
   if (diff <= 0) {
    stopTimer();
}   
} 
       

 
function stopTimer() {
    if (countDownInterval) {
        clearInterval(countDownInterval)

        daysData.textContent = '00';
        hoursData.textContent = '00';
        minutesData.textContent = '00';
        secondsData.textContent = '00';

        countDownInterval = null;
    }
}



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}



startBtn.addEventListener('click', () => {
    startTimer();
});



function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}


const fp = flatpickr(inputTimer, options);