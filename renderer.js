let workTime = 25 * 60;
let breakTime = 5 * 60;
let currentTime = workTime;
let mode = 'Work';
let timer = null;

const ring = document.getElementById('ring');
const ringLength = 2 * Math.PI * 90;
ring.style.strokeDasharray = ringLength;
ring.style.strokeDashoffset = ringLength;

const timerDisplay = document.getElementById('timer');
const modeDisplay = document.getElementById('mode');

function updateDisplay() {
  const min = String(Math.floor(currentTime / 60)).padStart(2, '0');
  const sec = String(currentTime % 60).padStart(2, '0');
  timerDisplay.textContent = `${min}:${sec}`;
  modeDisplay.textContent = mode;
  const total = (mode === 'Work') ? workTime : breakTime;
  ring.style.strokeDashoffset = ringLength - (ringLength * (total - currentTime)) / total;
}

function switchMode() {
  mode = (mode === 'Work') ? 'Break' : 'Work';
  currentTime = (mode === 'Work') ? workTime : breakTime;
  updateDisplay();
}

function startTimer() {
  if (timer) return;
  timer = setInterval(() => {
    currentTime--;
    updateDisplay();
    if (currentTime <= 0) {
      clearInterval(timer);
      timer = null;
      switchMode();
      startTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  pauseTimer();
  mode = 'Work';
  currentTime = workTime;
  updateDisplay();
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('toggle-settings').addEventListener('click', () => {
    const settingsPanel = document.getElementById('settings');
    settingsPanel.classList.toggle('visible');
});
document.getElementById('apply-settings').addEventListener('click', () => {
  const work = parseInt(document.getElementById('work-duration').value, 10);
  const brk = parseInt(document.getElementById('break-duration').value, 10);
  if (work > 0) workTime = work * 60;
  if (brk > 0) breakTime = brk * 60;
  resetTimer();
});

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

function applyTheme(dark) {
  if (dark) {
    body.classList.remove('light');
    body.classList.add('dark');
    themeIcon.textContent = '🌙';
  } else {
    body.classList.remove('dark');
    body.classList.add('light');
    themeIcon.textContent = '🌞';
  }
  localStorage.setItem('darkMode', dark);
}

themeToggle.addEventListener('change', () => {
  applyTheme(themeToggle.checked);
});

const savedTheme = localStorage.getItem('darkMode') === 'true';
themeToggle.checked = savedTheme;
applyTheme(savedTheme);

updateDisplay();



