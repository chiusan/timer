import { loadSessions } from "./sessions.js";

const dateKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function last7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
}

const round1 = (n) => Math.round(n * 10) / 10;

function minutesPerDay(sessions) {
  const totals = {};
  sessions.forEach((s) => {
    const date = new Date(s.finishedAt);
    if (!Number.isFinite(s.minutes) || Number.isNaN(date.getTime())) return;
    const key = dateKey(date);
    totals[key] = (totals[key] || 0) + s.minutes;
  });

  const days = last7Days();
  return {
    labels: days.map((d) =>
      d.toLocaleDateString("en-US", { weekday: "short" }),
    ),
    data: days.map((d) => round1(totals[dateKey(d)] || 0)),
  };
}

export default function Stats() {
  const dialog = document.getElementById("stats-dialog");
  const canvas = document.getElementById("stats-chart");
  const todayEl = document.getElementById("stat-today");
  const totalEl = document.getElementById("stat-total");
  let chart = null;

  function destroyChart() {
    chart?.destroy();
    chart = null;
  }

  function draw(labels, data) {
    const css = getComputedStyle(document.documentElement);
    const accent = css.getPropertyValue("--accent").trim();
    const muted = css.getPropertyValue("--muted").trim();
    const grid = css.getPropertyValue("--grid").trim();
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;

    destroyChart();
    chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: accent,
            borderRadius: 4,
            maxBarThickness: 48,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...(reduceMotion && { animation: false }),
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y} min` } },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: muted } },
          y: {
            beginAtZero: true,
            grid: { color: grid },
            ticks: { color: muted },
            title: { display: true, text: "Minutes", color: muted },
          },
        },
      },
    });
  }

  function open() {
    if (typeof Chart === "undefined") {
      alert("Chart library failed to load. Please check your connection.");
      return;
    }

    const { labels, data } = minutesPerDay(loadSessions());
    const total = round1(data.reduce((a, b) => a + b, 0));

    todayEl.textContent = data[data.length - 1];
    totalEl.textContent = total;
    canvas.setAttribute(
      "aria-label",
      `Bar chart of focus minutes over the last 7 days. Today: ${data[data.length - 1]} minutes. Total: ${total} minutes.`,
    );

    dialog.showModal();
    draw(labels, data);
  }

  document.querySelector(".buttonStats").addEventListener("click", open);
  dialog
    .querySelector(".stats-close")
    .addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", destroyChart);
}
