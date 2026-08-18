import { describe, it, expect } from 'vitest';
import {
  calculateBTTSMetrics,
  calculateValue,
  getKalshiUrl,
  readFinalScore,
  KALSHI_BTTS_SERIES,
  HIGH_CONFIDENCE_THRESHOLD
} from './bttsAlgorithm';

const team = (over = {}) => ({
  name: 'Team',
  scoringStreak: 4,
  concedingStreak: 3,
  avgGoalsScored: 1.8,
  avgGoalsConceded: 1.4,
  recentMatches: [{ btts: true }, { btts: false }, { btts: true }, { btts: true }],
  ...over
});

const fixture = (over = {}) => ({
  homeTeam: team({ name: 'Home' }),
  awayTeam: team({ name: 'Away' }),
  h2h: [{ btts: true }, { btts: false }],
  ...over
});

describe('calculateBTTSMetrics - scoring', () => {
  it('scores a fully populated fixture on all four components', () => {
    const m = calculateBTTSMetrics(fixture());
    expect(m.dataQuality).toBe('full');
    expect(m.coverage).toBeCloseTo(1);
    expect(m.score).toBeGreaterThan(0);
    expect(m.score).toBeLessThanOrEqual(98);
    Object.values(m.components).forEach(c => expect(c).not.toBeNull());
  });

  it('returns no score at all when there is nothing to score on', () => {
    const m = calculateBTTSMetrics({ homeTeam: { name: 'A' }, awayTeam: { name: 'B' } });
    expect(m.score).toBeNull();
    expect(m.fairOdds).toBeNull();
    expect(m.tier).toBe('UNKNOWN');
    expect(m.dataQuality).toBe('none');
    expect(m.coverage).toBe(0);
  });

  it('does not substitute defaults for missing goal rates', () => {
    const noRates = fixture({
      homeTeam: team({ name: 'Home', avgGoalsScored: undefined, avgGoalsConceded: undefined })
    });
    const m = calculateBTTSMetrics(noRates);
    expect(m.components.expectedGoal).toBeNull();
    expect(m.dataQuality).toBe('partial');
    expect(m.coverage).toBeCloseTo(0.85);
    expect(m.dataNote).toMatch(/expectedGoal/);
  });

  it('renormalises weights so a partial fixture is not dragged toward zero', () => {
    // Streak synergy alone, at a value well above the other components.
    const streaksOnly = {
      homeTeam: { name: 'A', scoringStreak: 8, concedingStreak: 8 },
      awayTeam: { name: 'B', scoringStreak: 8, concedingStreak: 8 },
      h2h: []
    };
    const m = calculateBTTSMetrics(streaksOnly);
    expect(m.coverage).toBeCloseTo(0.4);
    // Unrenormalised this would have been 100 * 0.4 = 40.
    expect(m.score).toBe(98);
  });

  it('grades h2h only from entries that have a result', () => {
    const m = calculateBTTSMetrics(fixture({ h2h: [{ date: '2025-01-01' }] }));
    expect(m.components.h2h).toBeNull();
  });
});

describe('calculateBTTSMetrics - settlement', () => {
  it('never settles a finished match with no reported score', () => {
    const m = calculateBTTSMetrics(fixture({ status: 'FINISHED' }));
    expect(m.settlement).toBeNull();
    expect(m.settlementPending).toBe(true);
  });

  it('settles from a real scoreline', () => {
    const m = calculateBTTSMetrics(fixture({ status: 'FINISHED', finalScore: { home: 2, away: 1 } }));
    expect(m.settlement.scoreText).toBe('2-1');
    expect(m.settlement.actualBTTS).toBe(true);
    expect(m.settlementPending).toBe(false);
  });

  it('reads a 0-0 draw rather than treating it as missing', () => {
    const m = calculateBTTSMetrics(fixture({ status: 'FINISHED', finalScore: { home: 0, away: 0 } }));
    expect(m.settlement.actualBTTS).toBe(false);
    expect(readFinalScore({ finalScore: { home: 0, away: 0 } })).toEqual({ home: 0, away: 0 });
  });

  it('accepts the provider score.fullTime shape', () => {
    expect(readFinalScore({ score: { fullTime: { home: 3, away: 1 } } })).toEqual({ home: 3, away: 1 });
    expect(readFinalScore({ score: { fullTime: { home: null, away: null } } })).toBeNull();
    expect(readFinalScore({})).toBeNull();
  });

  it('grades a below-threshold prediction as a NO bet', () => {
    const lowScoring = fixture({
      status: 'FINISHED',
      finalScore: { home: 1, away: 0 },
      homeTeam: team({ name: 'H', scoringStreak: 0, concedingStreak: 0, avgGoalsScored: 0.4, avgGoalsConceded: 0.3, recentMatches: [{ btts: false }] }),
      awayTeam: team({ name: 'A', scoringStreak: 0, concedingStreak: 0, avgGoalsScored: 0.3, avgGoalsConceded: 0.4, recentMatches: [{ btts: false }] }),
      h2h: [{ btts: false }]
    });
    const m = calculateBTTSMetrics(lowScoring);
    expect(m.score).toBeLessThan(HIGH_CONFIDENCE_THRESHOLD);
    expect(m.settlement.predictedYes).toBe(false);
    expect(m.settlement.won).toBe(true); // predicted NO, and it was NO
  });

  it('leaves the result ungraded when the fixture was never scored', () => {
    const m = calculateBTTSMetrics({
      homeTeam: { name: 'A' }, awayTeam: { name: 'B' },
      status: 'FINISHED', finalScore: { home: 1, away: 1 }
    });
    expect(m.settlement.actualBTTS).toBe(true);
    expect(m.settlement.won).toBeNull();
  });
});

describe('calculateValue', () => {
  it('flags a positive edge against the book', () => {
    const v = calculateValue(70, 1.80); // book implies 55.6%
    expect(v.hasValue).toBe(true);
    expect(Number(v.impliedBookieProb)).toBeCloseTo(55.6, 1);
  });

  it('returns no value for an unscored fixture or unusable odds', () => {
    expect(calculateValue(null, 1.8).hasValue).toBe(false);
    expect(calculateValue(70, 1).hasValue).toBe(false);
    expect(calculateValue(70, undefined).hasValue).toBe(false);
  });
});

describe('getKalshiUrl', () => {
  // Every ticker asserted here was checked against Kalshi's public series
  // list; the app models BTTS, so it must link to the BTTS series and not
  // the match-winner one.
  it('links each league to its BTTS series, not the match-winner series', () => {
    const expected = {
      epl: 'kxeplbtts',
      laliga: 'kxlaligabtts',
      seriea: 'kxserieabtts',
      bundesliga: 'kxbundesligabtts',
      ucl: 'kxuclbtts',
      mls: 'kxmlsbtts'
    };
    Object.entries(expected).forEach(([leagueId, ticker]) => {
      expect(getKalshiUrl({ leagueId })).toBe(`https://kalshi.com/markets/${ticker}`);
    });
  });

  it('never emits a match-winner series', () => {
    const urls = [...Object.keys(KALSHI_BTTS_SERIES), 'all', undefined]
      .map(leagueId => getKalshiUrl({ leagueId }));
    urls.forEach(u => expect(u).not.toMatch(/game/));
    Object.keys(KALSHI_BTTS_SERIES).forEach(leagueId => {
      expect(getKalshiUrl({ leagueId })).toMatch(/btts/);
    });
  });

  it('sends unmapped competitions to the soccer browse page', () => {
    // KXSOCCER and KXCHAMPIONSLEAGUE, used previously, do not exist, and
    // KXSOCCERBTTS has no open events, so its page renders empty.
    expect(getKalshiUrl({ leagueId: 'all' })).toBe('https://kalshi.com/category/soccer');
    expect(getKalshiUrl({ leagueId: 'ligue1' })).toBe('https://kalshi.com/category/soccer');
    expect(getKalshiUrl(null)).toBe('https://kalshi.com/category/soccer');
  });

  it('links straight to a known event, with the ticker as the third segment', () => {
    expect(getKalshiUrl({ leagueId: 'epl', kalshiTicker: 'KXEPLBTTS-26AUG22HULMUN' }))
      .toBe('https://kalshi.com/markets/kxeplbtts/epl-both-teams-to-score/kxeplbtts-26aug22hulmun');
  });

  it('ignores an event ticker from a different series instead of linking to a dead market', () => {
    // The shape the demo data actually carried.
    expect(getKalshiUrl({ leagueId: 'laliga', kalshiTicker: 'kxlaligagame-26aug22esprma' }))
      .toBe('https://kalshi.com/markets/kxlaligabtts');
    expect(getKalshiUrl({ leagueId: 'epl', kalshiTicker: 'KXMLSBTTS-26AUG19CINNYC' }))
      .toBe('https://kalshi.com/markets/kxeplbtts');
    expect(getKalshiUrl({ leagueId: 'epl', kalshiTicker: '   ' }))
      .toBe('https://kalshi.com/markets/kxeplbtts');
  });
});
