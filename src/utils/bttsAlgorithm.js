/**
 * BTTS (Both Teams To Score) Algorithm & Mathematical Analytics Engine
 */

/** A fixture is treated as a "BTTS YES" prediction at or above this score. */
export const HIGH_CONFIDENCE_THRESHOLD = 70;

/** Component weights. Only the components we actually have data for are used;
 *  the remainder are dropped and the rest are renormalised. */
const WEIGHTS = {
  streakSynergy: 0.40,
  recentForm: 0.30,
  h2h: 0.15,
  expectedGoal: 0.15
};

const TIERS = {
  PRIME: { min: 82, label: 'Prime Matchup', color: '#10b981', badge: '🔥 HOT PICK' },
  HIGH: { min: 70, label: 'High Probability', color: '#06b6d4', badge: '⭐ HIGH BTTS' },
  MEDIUM: { min: 55, label: 'Moderate', color: '#f59e0b', badge: '⚡ MODERATE' },
  LOW: { min: 0, label: 'Low Probability', color: '#ef4444', badge: 'Caution' },
  UNKNOWN: { min: null, label: 'No Form Data', color: '#64748b', badge: '— NO DATA' }
};

/**
 * Generates Kalshi exact match market URL or League Hub URL:
 * e.g. https://kalshi.com/markets/kxlaligagame/la-liga-game/kxlaligagame-26aug22esprma
 */
export function getKalshiUrl(fixture) {
  if (!fixture) return 'https://kalshi.com/category/sports';

  const { leagueId, kalshiTicker } = fixture;

  let seriesTicker = 'kxsoccer';
  let seriesSlug = 'soccer-game';

  if (leagueId === 'epl') {
    seriesTicker = 'kxeplgame';
    seriesSlug = 'english-premier-league-game';
  } else if (leagueId === 'laliga') {
    seriesTicker = 'kxlaligagame';
    seriesSlug = 'la-liga-game';
  } else if (leagueId === 'seriea') {
    seriesTicker = 'kxserieagame';
    seriesSlug = 'serie-a-game';
  } else if (leagueId === 'bundesliga') {
    seriesTicker = 'kxbundesligagame';
    seriesSlug = 'bundesliga-game';
  } else if (leagueId === 'ucl') {
    seriesTicker = 'kxchampionsleague';
    seriesSlug = 'champions-league-game';
  }

  // 1. If explicit active Kalshi ticker is set
  if (kalshiTicker) {
    return `https://kalshi.com/markets/${seriesTicker}/${seriesSlug}/${kalshiTicker}`;
  }

  // 2. Direct Kalshi League Market Hub (Guaranteed 100% no 404!)
  return `https://kalshi.com/markets/${seriesTicker}/${seriesSlug}`;
}

/** Coerce to a finite number, or null. Never substitutes a made-up default. */
function num(value) {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function recentBTTSRatio(team) {
  const played = (team?.recentMatches || []).filter(m => typeof m?.btts === 'boolean');
  if (played.length === 0) return null;
  return played.filter(m => m.btts).length / played.length;
}

/**
 * Reads a real, complete final score off a fixture. Returns null when the
 * result is not known - we never guess a scoreline.
 */
export function readFinalScore(match) {
  const candidates = [match?.finalScore, match?.score?.fullTime];
  for (const c of candidates) {
    if (!c) continue;
    const home = num(c.home);
    const away = num(c.away);
    if (home !== null && away !== null) return { home, away };
  }
  return null;
}

export function isFinished(match) {
  const status = String(match?.status || '').toUpperCase();
  return status === 'FINISHED' || status === 'FT';
}

export function calculateBTTSMetrics(match) {
  const { homeTeam = {}, awayTeam = {}, h2h = [] } = match || {};

  // --- Raw inputs. Anything missing stays null rather than being invented. ---
  const homeScoreStreak = num(homeTeam.scoringStreak);
  const awayScoreStreak = num(awayTeam.scoringStreak);
  const homeConcedeStreak = num(homeTeam.concedingStreak);
  const awayConcedeStreak = num(awayTeam.concedingStreak);

  const homeRecentBTTS = recentBTTSRatio(homeTeam);
  const awayRecentBTTS = recentBTTSRatio(awayTeam);

  const gradedH2H = (h2h || []).filter(m => typeof m?.btts === 'boolean');
  const h2hRatio = gradedH2H.length > 0
    ? gradedH2H.filter(m => m.btts).length / gradedH2H.length
    : null;

  const homeAvgScored = num(homeTeam.avgGoalsScored);
  const homeAvgConceded = num(homeTeam.avgGoalsConceded);
  const awayAvgScored = num(awayTeam.avgGoalsScored);
  const awayAvgConceded = num(awayTeam.avgGoalsConceded);

  // --- Component 1: Streak synergy (attack vs. leaky defence) ---
  const haveStreaks = [homeScoreStreak, awayScoreStreak, homeConcedeStreak, awayConcedeStreak]
    .every(v => v !== null);
  let streakSynergyScore = null;
  if (haveStreaks) {
    const homeOffenseVsAwayDef = Math.min(1, (homeScoreStreak + awayConcedeStreak) / 8);
    const awayOffenseVsHomeDef = Math.min(1, (awayScoreStreak + homeConcedeStreak) / 8);
    streakSynergyScore = ((homeOffenseVsAwayDef + awayOffenseVsHomeDef) / 2) * 100;
  }

  // --- Component 2: Recent BTTS form ---
  const combinedRecentBTTS = (homeRecentBTTS !== null && awayRecentBTTS !== null)
    ? (homeRecentBTTS + awayRecentBTTS) / 2
    : null;
  const recentFormScore = combinedRecentBTTS === null ? null : combinedRecentBTTS * 100;

  // --- Component 3: Head to head ---
  const h2hScore = h2hRatio === null ? null : h2hRatio * 100;

  // --- Component 4: Goal expectancy ---
  const haveGoalRates = [homeAvgScored, homeAvgConceded, awayAvgScored, awayAvgConceded]
    .every(v => v !== null);
  let expectedGoalBTTS = null;
  if (haveGoalRates) {
    const homeScoringPower = Math.min(1, homeAvgScored / 2.0);
    const homeVulnerability = Math.min(1, homeAvgConceded / 2.0);
    const awayScoringPower = Math.min(1, awayAvgScored / 2.0);
    const awayVulnerability = Math.min(1, awayAvgConceded / 2.0);

    const homeGoalProb = Math.min(0.95, Math.max(0.2, (homeScoringPower * 0.6) + (awayVulnerability * 0.4)));
    const awayGoalProb = Math.min(0.95, Math.max(0.2, (awayScoringPower * 0.6) + (homeVulnerability * 0.4)));
    expectedGoalBTTS = (homeGoalProb * awayGoalProb) * 100;
  }

  // --- Weighted total over the components we actually have ---
  const componentScores = {
    streakSynergy: streakSynergyScore,
    recentForm: recentFormScore,
    h2h: h2hScore,
    expectedGoal: expectedGoalBTTS
  };

  const available = Object.keys(WEIGHTS).filter(k => componentScores[k] !== null);
  const coverage = available.reduce((sum, k) => sum + WEIGHTS[k], 0);
  const missing = Object.keys(WEIGHTS).filter(k => componentScores[k] === null);

  let bttsPercentage = null;
  if (coverage > 0) {
    const weighted = available.reduce((sum, k) => sum + componentScores[k] * WEIGHTS[k], 0);
    const total = Math.round(weighted / coverage);
    bttsPercentage = Math.max(12, Math.min(98, total));
  }

  const dataQuality = coverage === 0 ? 'none' : (coverage >= 0.999 ? 'full' : 'partial');
  const dataNote = dataQuality === 'full'
    ? null
    : dataQuality === 'none'
      ? 'No form, head-to-head or goal-rate data available for this fixture.'
      : `Scored on ${Math.round(coverage * 100)}% of the model - missing: ${missing.join(', ')}.`;

  // --- Tier ---
  let tierKey = 'UNKNOWN';
  if (bttsPercentage !== null) {
    tierKey = bttsPercentage >= TIERS.PRIME.min ? 'PRIME'
      : bttsPercentage >= TIERS.HIGH.min ? 'HIGH'
        : bttsPercentage >= TIERS.MEDIUM.min ? 'MEDIUM'
          : 'LOW';
  }
  const tier = TIERS[tierKey];

  // --- Key insights ---
  const insights = [];

  if (homeScoreStreak >= 3) {
    insights.push(`${homeTeam.name} has scored in ${homeScoreStreak} consecutive matches.`);
  }
  if (awayScoreStreak >= 3) {
    insights.push(`${awayTeam.name} has scored in ${awayScoreStreak} consecutive matches.`);
  }
  if (homeConcedeStreak >= 3) {
    insights.push(`${homeTeam.name} failed to keep clean sheet in last ${homeConcedeStreak} games.`);
  }
  if (awayConcedeStreak >= 3) {
    insights.push(`${awayTeam.name} failed to keep clean sheet in last ${awayConcedeStreak} games.`);
  }
  if (h2hRatio !== null && h2hRatio >= 0.75 && gradedH2H.length >= 3) {
    insights.push(`H2H Trend: ${Math.round(h2hRatio * 100)}% of last ${gradedH2H.length} meetings ended BTTS YES.`);
  }
  if (combinedRecentBTTS !== null && combinedRecentBTTS >= 0.7) {
    insights.push(`Recent Form: Combined ${Math.round(combinedRecentBTTS * 100)}% BTTS rate in recent games.`);
  }

  if (dataNote) insights.push(dataNote);
  if (insights.length === 0) {
    insights.push('Balanced defensive and offensive match statistics.');
  }

  const fairOdds = bttsPercentage === null ? null : (100 / bttsPercentage).toFixed(2);

  // --- Settlement: only ever from a real, reported scoreline ---
  const finalScore = readFinalScore(match);
  let settlement = null;
  if (finalScore) {
    const actualBTTS = finalScore.home > 0 && finalScore.away > 0;
    const predictedYes = bttsPercentage === null ? null : bttsPercentage >= HIGH_CONFIDENCE_THRESHOLD;
    const won = predictedYes === null ? null : (predictedYes ? actualBTTS : !actualBTTS);

    settlement = {
      isSettled: true,
      actualBTTS,
      predictedYes,
      won,
      scoreText: `${finalScore.home}-${finalScore.away}`,
      badgeText: won === null
        ? (actualBTTS ? 'BTTS YES (ungraded)' : 'BTTS NO (ungraded)')
        : won ? '✅ BTTS HIT' : '❌ BTTS MISSED',
      color: won === null ? TIERS.UNKNOWN.color : (won ? '#10b981' : '#ef4444')
    };
  }

  // Finished, but the provider has not given us a score yet.
  const settlementPending = settlement === null && isFinished(match);

  return {
    score: bttsPercentage,
    tier: tierKey,
    tierLabel: tier.label,
    tierColor: tier.color,
    badgeText: tier.badge,
    fairOdds,
    settlement,
    settlementPending,
    coverage,
    dataQuality,
    dataNote,
    components: {
      streakSynergy: streakSynergyScore === null ? null : Math.round(streakSynergyScore),
      recentForm: recentFormScore === null ? null : Math.round(recentFormScore),
      h2h: h2hScore === null ? null : Math.round(h2hScore),
      expectedGoal: expectedGoalBTTS === null ? null : Math.round(expectedGoalBTTS)
    },
    insights,
    homeScoreStreak,
    homeConcedeStreak,
    awayScoreStreak,
    awayConcedeStreak
  };
}

export function calculateValue(bttsScore, bookieOdds) {
  if (bttsScore === null || bttsScore === undefined ||
      !bookieOdds || isNaN(bookieOdds) || bookieOdds <= 1) {
    return { hasValue: false, valueMargin: 0, impliedBookieProb: 0 };
  }

  const impliedBookieProb = (1 / bookieOdds) * 100;
  const valueMargin = (bttsScore - impliedBookieProb).toFixed(1);
  const hasValue = parseFloat(valueMargin) > 0;

  return {
    hasValue,
    valueMargin: Math.abs(valueMargin),
    isPositive: parseFloat(valueMargin) > 0,
    impliedBookieProb: impliedBookieProb.toFixed(1)
  };
}
