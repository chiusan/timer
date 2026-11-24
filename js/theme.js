import { buttonLight, buttonDark } from "./elements.js";

const KEY = "theme";

function readSaved() {
  try {
    const value = localStorage.getItem(KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function save(name) {
  try {
    localStorage.setItem(KEY, name);
  } catch {}
}

export default function Theme() {
  const root = document.documentElement;

  function apply(name) {
    root.className = name;
    buttonLight.classList.toggle("hide", name === "light");
    buttonDark.classList.toggle("hide", name === "dark");
  }

  function toggle() {
    const next = root.className === "dark" ? "light" : "dark";
    save(next);
    apply(next);
  }

  apply(readSaved() ?? "light");

  return { toggle };
}
