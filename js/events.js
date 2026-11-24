import {
  buttonPlay,
  buttonPause,
  buttonStop,
  buttonPlus,
  buttonMinus,
  buttonLight,
  buttonDark,
} from "./elements.js";

export default function ({ timer, controls, theme }) {
  buttonPlay.addEventListener("click", function () {
    controls.play();
    timer.countdown();
  });

  buttonPause.addEventListener("click", function () {
    controls.pause();
    timer.hold();
  });

  buttonStop.addEventListener("click", function () {
    controls.pause();
    timer.reset();
  });

  buttonPlus.addEventListener("click", function () {
    timer.plus();
  });

  buttonMinus.addEventListener("click", function () {
    timer.minus();
  });

  buttonLight.addEventListener("click", theme.toggle);

  buttonDark.addEventListener("click", theme.toggle);
}
