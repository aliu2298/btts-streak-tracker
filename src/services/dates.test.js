import { describe, it, expect, afterAll } from 'vitest';
import { toLocalDateStr, getFormattedDate, getAvailableDates } from './dates';

const originalTZ = process.env.TZ;
afterAll(() => { process.env.TZ = originalTZ; });

describe('local calendar dates', () => {
  it('echoes the local calendar parts it was built from', () => {
    expect(toLocalDateStr(new Date(2026, 7, 22, 23, 30))).toBe('2026-08-22');
    expect(toLocalDateStr(new Date(2026, 7, 22, 0, 5))).toBe('2026-08-22');
    expect(toLocalDateStr(new Date(2026, 0, 1, 23, 59))).toBe('2026-01-01');
  });

  it('pads single-digit months and days', () => {
    expect(toLocalDateStr(new Date(2026, 2, 4, 12))).toBe('2026-03-04');
  });

  it('rolls over month and year boundaries by local date', () => {
    expect(getFormattedDate(1, new Date(2026, 11, 31, 22, 0))).toBe('2027-01-01');
    expect(getFormattedDate(1, new Date(2026, 1, 28, 22, 0))).toBe('2026-03-01'); // 2026 is not a leap year
  });
});

describe('timezone regression: label and query must agree', () => {
  // 9pm in New York is already the next day in UTC. The old UTC-based
  // implementation queried tomorrow while labelling it today.
  it('does not roll to the next day late in the evening (UTC-4)', () => {
    process.env.TZ = 'America/New_York';
    const ninePm = new Date(2026, 7, 22, 21, 0);
    expect(ninePm.toISOString().split('T')[0]).toBe('2026-08-23'); // the old behaviour
    expect(getFormattedDate(0, ninePm)).toBe('2026-08-22');        // the fixed behaviour
    expect(getFormattedDate(1, ninePm)).toBe('2026-08-23');
  });

  // Early morning east of UTC is still the previous day in UTC.
  it('does not roll back a day early in the morning (UTC+9)', () => {
    process.env.TZ = 'Asia/Tokyo';
    const sevenAm = new Date(2026, 7, 23, 7, 0);
    expect(sevenAm.toISOString().split('T')[0]).toBe('2026-08-22'); // the old behaviour
    expect(getFormattedDate(0, sevenAm)).toBe('2026-08-23');        // the fixed behaviour
  });

  it('keeps every tab label consistent with the date it queries', () => {
    for (const tz of ['America/New_York', 'America/Los_Angeles', 'Asia/Tokyo', 'UTC']) {
      process.env.TZ = tz;
      for (const hour of [0, 7, 12, 21, 23]) {
        const now = new Date(2026, 7, 22, hour, 30);
        getAvailableDates(now).forEach(({ dateStr, display }) => {
          // The label is rendered from the same instant, so the day-of-month
          // in the label must match the day the tab actually queries.
          const dayInLabel = Number(display.match(/(\d+)$/)[1]);
          expect(dayInLabel, `${tz} @ ${hour}:30`).toBe(Number(dateStr.split('-')[2]));
        });
      }
    }
  });
});
