export default function Controls({ buttonPlay, buttonPause }) {
  function hideShowButton(hideButton, showButton) {
    const hadFocus = document.activeElement === hideButton;
    hideButton.classList.add("hide");
    showButton.classList.remove("hide");
    if (hadFocus) showButton.focus();
  }

  return {
    play: () => hideShowButton(buttonPlay, buttonPause),
    pause: () => hideShowButton(buttonPause, buttonPlay),
  };
}
