import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = document.getElementById('datetime-picker')
const startBtn = document.querySelector('[data-start]')
const daysEl = document.querySelector('[data-days]')
const hoursEl = document.querySelector('[data-hours]')
const minutesEl = document.querySelector('[data-minutes]')
const secondsEl = document.querySelector('[data-seconds]')

let countdownIntervalId = null;

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
        startBtn.addEventListener('click', () => startCountdown(selectedDate));
    }
}
flatpickr(dateTimePicker, options);

function startCountdown(endDate) {
    if (countdownIntervalId) return;
    countdownIntervalId = setInterval(() => {
        const remainingTime = getRemainingTime(endDate);
        if (remainingTime.total <= 0) {
            clearInterval(countdownIntervalId);
            countdownIntervalId = null;
        }
        updateCountDownUI(remainingTime);
    }, 1000);

    function getRemainingTime(endDate) {
        const total = Date.parse(endDate) - Date.now();
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        return { total, days, hours, minutes, seconds };
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
}