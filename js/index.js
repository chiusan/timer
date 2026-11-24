import Events from "./events.js";
import Theme from "./theme.js";
import { Timer } from "./timer.js";
import Controls from "./controls.js";
import { addSession } from "./sessions.js";
import Stats from "./stats.js";
import {
  buttonPlay,
  buttonPause,
  secondsDisplay,
  minutesDisplay,
} from "./elements.js";

const labelInput = document.getElementById("session-label");

const controls = Controls({
  buttonPlay,
  buttonPause,
});

const timer = Timer({
  minutesDisplay,
  secondsDisplay,
  resetControls: controls.pause,
  onFinish: (minutes) => addSession({ label: labelInput.value, minutes }),
});

const theme = Theme();

Events({ timer, controls, theme });

Stats();
