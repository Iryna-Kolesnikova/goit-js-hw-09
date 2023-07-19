import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = document.getElementById('datetime-picker');
const startBtn = document.getElementById('startBtn');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let countdownIntervalId = null;
let selectedDate = null;

function isDateInFuture(selectedDate) {
    const currentDate = new Date();
    const selectedDateTime = new Date(selectedDate);
    return selectedDateTime > currentDate;
}

function updateStartButtonStatus() {
    const isButtonActive = isDateInFuture(selectedDate) && countdownIntervalId === null;
    startBtn.disabled = !isButtonActive;
}

dateTimePicker.addEventListener('change', () => {
    selectedDate = dateTimePicker.value;
    updateStartButtonStatus();
});

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        if (!isDateInFuture(selectedDate)) {
            alert("Please choose a date in the future");
            startBtn.disabled = true;
        } else {
            updateStartButtonStatus();
        }
    }
};

flatpickr(dateTimePicker, options);

function startCountdown(endDate) {
    if (countdownIntervalId) return;
    startBtn.disabled = true; // Заблокувати кнопку під час відліку
    countdownIntervalId = setInterval(() => {
        const remainingTime = getRemainingTime(Date.parse(endDate) - Date.now());
        if (remainingTime.total <= 0) {
            clearInterval(countdownIntervalId);
            countdownIntervalId = null;
        }
        updateCountDownUI(remainingTime);
    }, 1000);
    console.log("End date:", endDate);
}

startBtn.addEventListener('click', () => {
    if (selectedDate && isDateInFuture(selectedDate)) {
        startCountdown(selectedDate);
    }
});

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
