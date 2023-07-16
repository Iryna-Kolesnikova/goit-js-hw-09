const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let interval = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
    if (interval) {
    return;
}

startBtn.disabled = true;
    interval = setInterval(changeColor, 1000)
}
 
function onStopBtnClick() {
    clearInterval(interval);
    interval = null;
    startBtn.disabled = false;
}

function changeColor() {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}