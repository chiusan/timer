export function Timer({
  minutesDisplay,
  secondsDisplay,
  resetControls,
  onFinish,
}) {
  const MIN_MINUTES = 1;
  const MAX_MINUTES = 180;

  let durationSec =
    Number(minutesDisplay.textContent) * 60 +
      Number(secondsDisplay.textContent) || 25 * 60;
  let remainingSec = durationSec;
  let endTime = 0;
  let tickId = null;

  function render(sec) {
    const mm = String(Math.floor(sec / 60)).padStart(2, "0");
    const ss = String(sec % 60).padStart(2, "0");
    minutesDisplay.textContent = mm;
    secondsDisplay.textContent = ss;
    document.title = tickId ? `${mm}:${ss} · Timer` : "Timer";
  }

  function stopTicking() {
    clearInterval(tickId);
    tickId = null;
  }

  function tick() {
    const left = Math.max(0, Math.ceil(endTime - Date.now()) / 1000);
    render(left);
    if (left === 0) finish();
  }

  function finish() {
    stopTicking();
    const minutes = durationSec / 60;
    remainingSec = durationSec;
    render(remainingSec);
    resetControls();
    onFinish?.(minutes);
  }

  function countdown() {
    if (tickId) return;
    endTime = Date.now() + remainingSec * 1000;
    tickId = setInterval(tick, 250);
    tick();
  }

  function hold() {
    if (!tickId) return;
    remainingSec = Math.max(1, Math.ceil(endTime - Date.now()) / 1000);
    stopTicking();
    render(remainingSec);
  }

  function reset() {
    stopTicking();
    remainingSec = durationSec;
    render(remainingSec);
  }

  function adjust(deltaMin) {
    const idle = !tickId && remainingSec === durationSec;
    if (!idle) return;
    const next = Math.round(durationSec / 60) + deltaMin;
    const clamped = Math.min(MAX_MINUTES, Math.max(MIN_MINUTES, next));
    durationSec = remainingSec = clamped * 60;
    render(remainingSec);
  }

  document.addEventListener("visibilitychange", () => {
    if (tickId) tick();
  });

  render(remainingSec);

  return {
    countdown,
    hold,
    reset,
    plus: () => adjust(1),
    minus: () => adjust(-1),
  };
}
