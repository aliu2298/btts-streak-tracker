/**
 * The one place calendar dates are computed.
 *
 * There were previously two copies of these helpers - one in demoData.js and
 * one in mockDataGenerator.js - and App.jsx imported getAvailableDates from
 * the second while Header.jsx imported it from the first. Two
 * implementations of the same function, either of which could drift.
 */

/**
 * Formats a Date as YYYY-MM-DD in the *viewer's own timezone*.
 *
 * This used to be `d.toISOString().split('T')[0]`, which is UTC, while the
 * label rendered beside it came from toLocaleDateString, which is local. The
 * two disagree for part of every day: after ~8pm in New York the tab read
 * "Today (Sat, Aug 22)" and fetched Aug 23, so "Tomorrow (Focus)" - the
 * default tab and the whole point of the app - showed the day after
 * tomorrow. East of UTC it failed the other way, showing yesterday.
 */
export function toLocalDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Local calendar date `offsetDays` from `now`, as YYYY-MM-DD. */
export function getFormattedDate(offsetDays = 0, now = new Date()) {
  const d = new Date(now);
  d.setDate(d.getDate() + offsetDays);
  return toLocalDateStr(d);
}

export function getDisplayDate(offsetDays = 0, now = new Date()) {
  const d = new Date(now);
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

/**
 * The three selectable days. `now` is injectable so the timezone behaviour
 * can be tested at specific instants.
 */
export function getAvailableDates(now = new Date()) {
  return [
    { key: 'today', label: 'Today', shortLabel: 'Today', dateStr: getFormattedDate(0, now), display: getDisplayDate(0, now) },
    { key: 'tomorrow', label: 'Tomorrow (Focus)', shortLabel: 'Tomorrow', dateStr: getFormattedDate(1, now), display: getDisplayDate(1, now), isDefault: true },
    { key: 'nextDay', label: 'Day After', shortLabel: 'Day After', dateStr: getFormattedDate(2, now), display: getDisplayDate(2, now) },
  ];
}
