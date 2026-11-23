import { buttonLight, buttonDark } from "./elements.js";

export default function Theme() {
  function setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
  }

  function toggle(hideButton, showButton) {
    if (localStorage.getItem("theme") === "dark") {
      showButton.classList.remove("hide");
      hideButton.classList.add("hide");
      setTheme("light");
    } else {
      showButton.classList.remove("hide");
      hideButton.classList.add("hide");
      setTheme("dark");
    }
  }

  (function () {
    if (localStorage.getItem("theme") === "dark") {
      buttonLight.classList.remove("hide");
      buttonDark.classList.add("hide");
      setTheme("dark");
    } else {
      buttonDark.classList.remove("hide");
      buttonLight.classList.add("hide");
      setTheme("light");
    }
  })();
  return {
    toggle,
  };
}
