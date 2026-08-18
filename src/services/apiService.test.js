import { describe, it, expect } from 'vitest';
import { computeTeamForm, computeH2H, toFixture, mapCompetitionToLeagueId } from './apiService';

const match = (utcDate, homeId, awayId, home, away) => ({
  id: 1,
  utcDate,
  homeTeam: { id: homeId, name: `Team ${homeId}`, shortName: `T${homeId}` },
  awayTeam: { id: awayId, name: `Team ${awayId}`, shortName: `T${awayId}` },
  score: { fullTime: { home, away } }
});

describe('computeTeamForm', () => {
  const matches = [
    match('2026-08-01T12:00:00Z', 1, 2, 0, 0),   // oldest
    match('2026-08-08T12:00:00Z', 3, 1, 1, 2),
    match('2026-08-15T12:00:00Z', 1, 4, 3, 1)    // newest
  ];

  it('reads results from the given team\'s perspective', () => {
    const form = computeTeamForm(matches, 1);
    expect(form.matchesAnalysed).toBe(3);
    expect(form.avgGoalsScored).toBeCloseTo((3 + 2 + 0) / 3, 2);
    expect(form.avgGoalsConceded).toBeCloseTo((1 + 1 + 0) / 3, 2);
  });

  it('counts streaks from the most recent match backwards', () => {
    const form = computeTeamForm(matches, 1);
    expect(form.scoringStreak).toBe(2);  // 3-1, 2-1, then a 0-0
    expect(form.concedingStreak).toBe(2);
  });

  it('orders recent matches newest first regardless of input order', () => {
    const shuffled = [matches[1], matches[2], matches[0]];
    expect(computeTeamForm(shuffled, 1).recentMatches[0].score).toBe('3-1');
  });

  it('marks per-match BTTS and home/away correctly', () => {
    const [newest, middle, oldest] = computeTeamForm(matches, 1).recentMatches;
    expect(newest).toMatchObject({ score: '3-1', btts: true, isHome: true, opponent: 'T4' });
    expect(middle).toMatchObject({ score: '2-1', btts: true, isHome: false, opponent: 'T3' });
    expect(oldest).toMatchObject({ score: '0-0', btts: false, isHome: true });
  });

  it('skips matches with no full-time score and matches the team did not play', () => {
    const withGaps = [
      ...matches,
      match('2026-08-16T12:00:00Z', 1, 5, null, null),
      match('2026-08-17T12:00:00Z', 6, 7, 2, 2)
    ];
    expect(computeTeamForm(withGaps, 1).matchesAnalysed).toBe(3);
  });

  it('returns null rather than inventing stats when there is nothing to read', () => {
    expect(computeTeamForm([], 1)).toBeNull();
    expect(computeTeamForm(null, 1)).toBeNull();
    expect(computeTeamForm(matches, 999)).toBeNull();
  });
});

describe('computeH2H', () => {
  it('grades BTTS from each scoreline and drops ungraded matches', () => {
    const h2h = computeH2H([
      match('2026-01-01T12:00:00Z', 1, 2, 1, 1),
      match('2026-02-01T12:00:00Z', 1, 2, 2, 0),
      match('2026-03-01T12:00:00Z', 1, 2, null, null)
    ]);
    expect(h2h).toEqual([
      { date: '2026-01-01', score: '1-1', btts: true },
      { date: '2026-02-01', score: '2-0', btts: false }
    ]);
  });
});

describe('toFixture', () => {
  const raw = {
    id: 55,
    utcDate: '2026-08-20T18:45:00Z',
    status: 'SCHEDULED',
    competition: { code: 'PL', name: 'Premier League' },
    homeTeam: { id: 1, name: 'Arsenal', tla: 'ARS', crest: 'https://x/ars.png' },
    awayTeam: { id: 2, name: 'Chelsea', tla: 'CHE' },
    score: { fullTime: { home: null, away: null } }
  };

  it('carries identity through without attaching any stats', () => {
    const f = toFixture(raw);
    expect(f.id).toBe('api-55');
    expect(f.leagueId).toBe('epl');
    expect(f.date).toBe('2026-08-20');
    expect(f.homeTeam.name).toBe('Arsenal');
    expect(f.homeTeam.scoringStreak).toBeUndefined();
    expect(f.homeTeam.avgGoalsScored).toBeUndefined();
    expect(f.homeTeam.recentMatches).toBeUndefined();
    expect(f.h2h).toEqual([]);
  });

  it('leaves the crest null instead of borrowing another club\'s badge', () => {
    expect(toFixture(raw).awayTeam.logo).toBeNull();
  });

  it('only carries a final score once the provider reports one', () => {
    expect(toFixture(raw).finalScore).toBeNull();
    expect(toFixture({ ...raw, score: { fullTime: { home: 1, away: 2 } } }).finalScore)
      .toEqual({ home: 1, away: 2 });
  });
});

describe('mapCompetitionToLeagueId', () => {
  it('maps known codes and falls back to all', () => {
    expect(mapCompetitionToLeagueId('PD')).toBe('laliga');
    expect(mapCompetitionToLeagueId('bl1')).toBe('bundesliga');
    expect(mapCompetitionToLeagueId('ZZZ')).toBe('all');
    expect(mapCompetitionToLeagueId(undefined)).toBe('all');
  });
});
