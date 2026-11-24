const KEY = "sessions";

export function loadSessions() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addSession({ label, minutes }) {
  if (!(minutes > 0)) return;

  const sessions = loadSessions();
  sessions.push({
    id: Date.now(),
    label: label.trim(),
    minutes,
    finishedAt: new Date().toISOString(),
  });
  try {
    localStorage.setItem(KEY, JSON.stringify(sessions));
  } catch (err) {
    console.error("Failed to save session:", err);
  }
}
