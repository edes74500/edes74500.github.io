const form = document.querySelector("form");
let timeSeconds, interval;

timer = () => {
  let minutes = Math.floor(timeSeconds / 60);
  let seconds = timeSeconds % 60;
  if (seconds < 10) seconds = "0" + seconds;
  if (minutes < 10) minutes = "0" + minutes;
  countdownDisplay.textContent = `${minutes} : ${seconds}`;
  timeSeconds--;
  if (timeSeconds < 0) clearInterval(interval);
};

reset.addEventListener("click", () => {
  countdownDisplay.textContent = `${choice.value < 10 ? "0" + choice.value : choice.value} : 00`;
  clearInterval(interval);
  timeSeconds = null;
  interval = null;
  start.value = "GO";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(interval);
  if (!timeSeconds) {
    timeSeconds = choice.value * 60;
    start.value = "GO";
  }
  if (!choice.value || choice.value == 0) alert("veuillez selectionner le nombre de minutes");
  if (!interval) {
    timer();
    interval = setInterval(timer, 1000);
    start.value = "Pause";
  } else if (interval) {
    timeSeconds = timeSeconds;
    start.value = "Resume";
    clearInterval(interval);
    interval = null;
  }
});
