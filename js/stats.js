import { loadSessions } from "./sessions.js";

const dateKey = (d) => d.toLocaleDateString("sv-SE");

function last7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
}

function minutesPerDay(sessions) {
  const totals = {};
  sessions.forEach((s) => {
    const key = dateKey(new Date(s.finishedAt));
    totals[key] = (totals[key] || 0) + s.minutes;
  });

  const days = last7Days();

  return {
    labels: days.map((d) =>
      d.toLocaleDateString("en-US", { weekday: "short" }),
    ),
    data: days.map((d) => Math.round((totals[dateKey(d)] || 0) * 10) / 10),
  };
}

export default function Stats() {
  const dialog = document.getElementById("stats-dialog");
  const canvas = document.getElementById("stats-chart");
  const todayEl = document.getElementById("stat-today");
  const totalEl = document.getElementById("stat-total");

  let chart = null;

  function draw(labels, data) {
    const css = getComputedStyle(document.documentElement);
    const accent = css.getPropertyValue("--accent").trim();
    const muted = css.getPropertyValue("--muted").trim();
    const grid = `color-mix(in srgb, ${muted} 25%, transparent)`;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    chart?.destroy();
    chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels,
        datasets: [{ data, backgroundColor: accent, borderRadius: 4 }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: reduceMotion ? false : undefined,
        font: { family: getComputedStyle(document.body).fontFamily },
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
    const { labels, data } = minutesPerDay(loadSessions());
    todayEl.textContent = data[data.length - 1];
    totalEl.textContent = Math.round(data.reduce((a, b) => a + b, 0) * 10) / 10;

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
}
