import { describe, it, expect } from 'vitest';
import { getDemoFixtures } from './demoData';

describe('demo fixtures', () => {
  const fixtures = getDemoFixtures();

  it('returns official Top 5 European Leagues Gameweek 1 fixtures', () => {
    expect(fixtures).toBeDefined();
    expect(fixtures.length).toBeGreaterThan(0);
  });

  it('has valid team names and league IDs', () => {
    fixtures.forEach(f => {
      expect(f.homeTeam.name).toBeDefined();
      expect(f.awayTeam.name).toBeDefined();
      expect(f.leagueId).toBeDefined();
    });
  });

  it('grades head-to-head entries from their own scorelines', () => {
    fixtures.flatMap(f => f.h2h).forEach(m => {
      const [home, away] = m.score.split('-').map(Number);
      expect(m.btts).toBe(home > 0 && away > 0);
    });
  });
});
