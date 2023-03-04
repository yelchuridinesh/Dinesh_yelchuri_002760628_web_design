const timer = document.getElementById("timer");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

let intervalId;
let startTime = 0;
let elapsedTime = 0;

const formatTime = (time) => {
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time % (60 * 60)) / 60);
  const seconds = Math.floor(time % 60);
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const startTimer = async () => {
  startButton.disabled = true;
  stopButton.disabled = false;

  startTime = Date.now() - elapsedTime;

  intervalId = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timer.textContent = formatTime(elapsedTime / 1000);
  }, 1000);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(formatTime(elapsedTime / 1000));
    }, 0);
  });
};

const stopTimer = () => {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
};

const resetTimer = async () => {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
  elapsedTime = 0;
  timer.textContent = formatTime(elapsedTime / 1000);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(formatTime(elapsedTime / 1000));
    }, 0);
  });
};

startButton.addEventListener("click", async () => {
  await startTimer();
});

stopButton.addEventListener("click", () => {
  stopTimer();
});

resetButton.addEventListener("click", async () => {
  await resetTimer();
});
