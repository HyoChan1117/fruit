export function getTodayDateString() {
  return new Date().toISOString().slice(0, 10);
}
