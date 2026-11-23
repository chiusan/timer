import {
  buttonPlay,
  buttonPause,
  buttonStop,
  buttonPlus,
  buttonMinus,
  buttonLight,
  buttonDark,
} from "./elements.js";

export default function ({ timer, theme }) {
  buttonPlay.addEventListener("click", function () {
    timer.countdown();
  });

  buttonPause.addEventListener("click", function () {
    timer.hold();
  });

  buttonStop.addEventListener("click", function () {
    timer.reset();
  });

  buttonPlus.addEventListener("click", function () {
    timer.plus();
  });

  buttonMinus.addEventListener("click", function () {
    timer.minus();
  });

  buttonLight.addEventListener("click", function () {
    theme.toggle(buttonLight, buttonDark);
  });

  buttonDark.addEventListener("click", function () {
    theme.toggle(buttonDark, buttonLight);
  });
}
