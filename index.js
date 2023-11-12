const form = document.querySelector("form");
const choice = document.querySelector("#choice");
const cdDisplay = document.querySelector("#countdownDisplay");
const bntStart = document.querySelector("#start");
// const bntReset = document.querySelector("#reset");
let timerOn = null;
let timer, seconds, minutes, totalSeconds;
cdDisplay.innerHTML = `<span> 00 : 00s</span>`;

let secondFct = () => {
  totalSeconds = timer * 60;
  seconds = totalSeconds % 60; // reste de seconde quand / par 60
  minutes = Math.floor(totalSeconds / 60);

  cdDisplay.innerHTML = `<span>  ${String(minutes).padStart(2, 0)} : ${String(seconds).padStart(2, 0)}s</span>`;
  timerOn = setInterval(
    (foo = () => {
      //   cdDisplay.innerHTML = `<span> ${minutes} : ${("0" + seconds).slice(-2)}s</span>`;
      //   cdDisplay.innerHTML = `<span> ${minutes} : ${seconds}s</span>`;
      cdDisplay.innerHTML = `<span> ${String(minutes).padStart(2, 0)} : ${String(seconds).padStart(2, 0)}s</span>`;
      seconds--;
      console.log(totalSeconds);
      totalSeconds--;
      if (seconds < 0 && minutes > 0) {
        seconds = 59;
        minutes--;
      } else if (seconds < 0 && minutes == 0) {
        clearInterval(timerOn);
        start.value = "GO";
        timerOn = null;
      }
    }),
    1000
  );
  foo();
};

reset.addEventListener("click", () => {
  // reset.value = "Reset";
  if (timerOn) {
    start.value = "GO";
    reset.value = "reset";
    totalSeconds = 0;
    clearInterval(timerOn);
    cdDisplay.innerHTML = `<span> 00 : 00s</span>`;
    timerOn = null;
  } else if (!timerOn) {
    timer = choice.value;
    totalSeconds = timer * 60;
    start.value = "GO";
    seconds = totalSeconds % 60; // reste de seconde quand / par 60
    minutes = Math.floor(totalSeconds / 60);
    cdDisplay.innerHTML = `<span>  ${String(minutes).padStart(2, 0)} : ${String(seconds).padStart(2, 0)}s</span>`;
    timerOn;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (totalSeconds > 0) {
    timer = totalSeconds / 60;
  } else {
    timer = choice.value;
  }
  console.log(timer);
  if (choice.value == 0) {
    cdDisplay.innerHTML = `veuillez selectionner le nombre de minute`;
  } else if (timerOn) {
    start.value = "Resume";
    reset.value = "Reset";
    clearInterval(timerOn);
    timerOn = null;
    console.log(totalSeconds);
  } else if (!timerOn) {
    start.value = "Pause";
    reset.value = "Stop";

    secondFct();
  }
});
