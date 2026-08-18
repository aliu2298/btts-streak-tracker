import { describe, it, expect } from 'vitest';
import { getDemoFixtures, deriveTeamStats } from './demoData';

describe('deriveTeamStats', () => {
  it('derives every model input from the results, most recent first', () => {
    const stats = deriveTeamStats({
      id: 'x', name: 'X', shortName: 'X', logo: null, primaryColor: '#fff',
      form: [
        { opp: 'A', gf: 2, ga: 1, home: true },
        { opp: 'B', gf: 1, ga: 0, home: false },
        { opp: 'C', gf: 0, ga: 2, home: true }
      ]
    });
    expect(stats.scoringStreak).toBe(2);
    expect(stats.concedingStreak).toBe(1);
    expect(stats.avgGoalsScored).toBeCloseTo(1, 2);
    expect(stats.avgGoalsConceded).toBeCloseTo(1, 2);
    expect(stats.recentMatches[0]).toMatchObject({ score: '2-1', btts: true, isHome: true });
  });
});

describe('demo fixtures', () => {
  const fixtures = getDemoFixtures();

  it('flags itself as demo data', () => {
    expect(fixtures.every(f => f.isDemo)).toBe(true);
  });

  it('keeps every derived stat consistent with the results it came from', () => {
    fixtures.flatMap(f => [f.homeTeam, f.awayTeam])
      .filter(t => t.recentMatches)
      .forEach(t => {
        t.recentMatches.forEach(m => {
          const [gf, ga] = m.score.split('-').map(Number);
          expect(m.btts).toBe(gf > 0 && ga > 0);
        });
        // A scoring streak of N means the N most recent matches all scored.
        t.recentMatches.slice(0, t.scoringStreak).forEach(m => {
          expect(Number(m.score.split('-')[0])).toBeGreaterThan(0);
        });
      });
  });

  it('has a BTTS rate in a realistic range rather than near 100%', () => {
    const all = fixtures
      .flatMap(f => [f.homeTeam, f.awayTeam])
      .flatMap(t => t.recentMatches || []);
    const rate = all.filter(m => m.btts).length / all.length;
    expect(rate).toBeGreaterThan(0.35);
    expect(rate).toBeLessThan(0.65);
  });

  it('grades head-to-head entries from their own scorelines', () => {
    fixtures.flatMap(f => f.h2h).forEach(m => {
      const [home, away] = m.score.split('-').map(Number);
      expect(m.btts).toBe(home > 0 && away > 0);
    });
  });

  it('covers the unscored and settled paths', () => {
    expect(fixtures.some(f => !f.homeTeam.recentMatches)).toBe(true);
    expect(fixtures.some(f => f.status === 'FINISHED' && f.finalScore)).toBe(true);
  });
});
