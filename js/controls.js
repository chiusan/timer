export default function Controls({ buttonPlay, buttonPause }) {
  function hideShowButton(hideButton, showButton) {
    hideButton.classList.add("hide");
    showButton.classList.remove("hide");
  }

  function play() {
    hideShowButton(buttonPlay, buttonPause);
  }

  function pause() {
    hideShowButton(buttonPause, buttonPlay);
  }

  return {
    play,
    pause,
  };
}
