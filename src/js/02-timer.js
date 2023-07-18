import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = document.getElementById('datetime-picker')
const startBtn = document.getElementById('startBtn');
const daysEl = document.querySelector('[data-days]')
const hoursEl = document.querySelector('[data-hours]')
const minutesEl = document.querySelector('[data-minutes]')
const secondsEl = document.querySelector('[data-seconds]')


let countdownIntervalId = null;


startBtn.addEventListener('click', () => startCountdown(dateTimePicker.value));

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDate) {
        const date = selectedDate[0];
        if (selectedDate < new Date()) {
            alert("Please choose a date in the future");
            startBtn.disabled = true;
            return;
        }
        startBtn.disabled = false;
    }
}

flatpickr(dateTimePicker, options);

function startCountdown(endDate) {
    if (countdownIntervalId) return;
    countdownIntervalId = setInterval(() => {
        const remainingTime = getRemainingTime(Date.parse(endDate) - Date.now());
        if (remainingTime.total <= 0) {
            clearInterval(countdownIntervalId);
            countdownIntervalId = null;
            startBtn.disabled = false;
        }
        updateCountDownUI(remainingTime);
    }, 1000);
}

function getRemainingTime(ms) {
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

    return { total: ms, days, hours, minutes, seconds };
}

function updateCountDownUI(remainingTime) {
    daysEl.textContent = addLeadingZero(remainingTime.days);
    hoursEl.textContent = addLeadingZero(remainingTime.hours);
    minutesEl.textContent = addLeadingZero(remainingTime.minutes);
    secondsEl.textContent = addLeadingZero(remainingTime.seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}