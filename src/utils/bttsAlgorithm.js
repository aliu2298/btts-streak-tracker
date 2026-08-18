/**
 * BTTS (Both Teams To Score) Algorithm & Mathematical Analytics Engine
 */

export function calculateBTTSMetrics(match) {
  const { homeTeam, awayTeam, h2h = [] } = match;

  // 1. Scoring Streaks (Max 25 pts each)
  const homeScoreStreak = homeTeam.scoringStreak || 0;
  const awayScoreStreak = awayTeam.scoringStreak || 0;

  // Consecutive matches conceded
  const homeConcedeStreak = homeTeam.concedingStreak || 0;
  const awayConcedeStreak = awayTeam.concedingStreak || 0;

  // 2. Recent BTTS Ratios (Last 5 matches)
  const homeRecentBTTS = (homeTeam.recentMatches || []).filter(m => m.btts).length / Math.max(1, (homeTeam.recentMatches || []).length);
  const awayRecentBTTS = (awayTeam.recentMatches || []).filter(m => m.btts).length / Math.max(1, (awayTeam.recentMatches || []).length);
  const combinedRecentBTTS = (homeRecentBTTS + awayRecentBTTS) / 2;

  // 3. Head to Head BTTS Ratio
  const h2hBTTSCount = h2h.filter(m => m.btts).length;
  const h2hRatio = h2h.length > 0 ? h2hBTTSCount / h2h.length : 0.5;

  // 4. Scoring Power & Defensive Vulnerability
  const homeScoringPower = Math.min(1, (homeTeam.avgGoalsScored || 1.2) / 2.0);
  const homeVulnerability = Math.min(1, (homeTeam.avgGoalsConceded || 1.1) / 2.0);
  const awayScoringPower = Math.min(1, (awayTeam.avgGoalsScored || 1.2) / 2.0);
  const awayVulnerability = Math.min(1, (awayTeam.avgGoalsConceded || 1.1) / 2.0);

  // Weight Calculation:
  // Component 1: Streak Synergies (40% weight)
  const homeOffenseVsAwayDef = Math.min(1, (homeScoreStreak + awayConcedeStreak) / 8);
  const awayOffenseVsHomeDef = Math.min(1, (awayScoreStreak + homeConcedeStreak) / 8);
  const streakSynergyScore = ((homeOffenseVsAwayDef + awayOffenseVsHomeDef) / 2) * 100;

  // Component 2: Recent Form BTTS Ratio (30% weight)
  const recentFormScore = combinedRecentBTTS * 100;

  // Component 3: H2H History (15% weight)
  const h2hScore = h2hRatio * 100;

  // Component 4: Goal Expectancy Model (15% weight)
  const homeGoalProb = Math.min(0.95, Math.max(0.2, (homeScoringPower * 0.6) + (awayVulnerability * 0.4)));
  const awayGoalProb = Math.min(0.95, Math.max(0.2, (awayScoringPower * 0.6) + (homeVulnerability * 0.4)));
  const expectedGoalBTTS = (homeGoalProb * awayGoalProb) * 100;

  // Weighted Total Calculation
  const totalScore = Math.round(
    (streakSynergyScore * 0.40) +
    (recentFormScore * 0.30) +
    (h2hScore * 0.15) +
    (expectedGoalBTTS * 0.15)
  );

  const bttsPercentage = Math.max(12, Math.min(98, totalScore));

  // Determine Tier & Tag
  let tier = 'LOW';
  let tierLabel = 'Low Probability';
  let tierColor = '#ef4444'; // Red
  let badgeText = 'Caution';

  if (bttsPercentage >= 82) {
    tier = 'PRIME';
    tierLabel = 'Prime Matchup';
    tierColor = '#10b981'; // Vibrant Pitch Emerald
    badgeText = '🔥 HOT PICK';
  } else if (bttsPercentage >= 70) {
    tier = 'HIGH';
    tierLabel = 'High Probability';
    tierColor = '#06b6d4'; // Electric Cyan
    badgeText = '⭐ HIGH BTTS';
  } else if (bttsPercentage >= 55) {
    tier = 'MEDIUM';
    tierLabel = 'Moderate';
    tierColor = '#f59e0b'; // Amber
    badgeText = '⚡ MODERATE';
  }

  // Key Insights Generator
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
  if (h2hRatio >= 0.75 && h2h.length >= 3) {
    insights.push(`H2H Trend: ${Math.round(h2hRatio * 100)}% of last ${h2h.length} meetings ended BTTS YES.`);
  }
  if (combinedRecentBTTS >= 0.7) {
    insights.push(`Recent Form: Combined ${Math.round(combinedRecentBTTS * 100)}% BTTS rate in last 5 games.`);
  }

  if (insights.length === 0) {
    insights.push('Balanced defensive and offensive match statistics.');
  }

  // Implied Decimal Odds (Fair Odds)
  const fairOdds = (100 / bttsPercentage).toFixed(2);

  // Auto-Settlement Logic for Finished Matches
  let settlement = null;
  if (match.status === 'FINISHED' || match.status === 'FT' || match.finalScore) {
    const score = match.finalScore || { home: 2, away: 1 };
    const actualBTTS = score.home > 0 && score.away > 0;
    const isPredictionHigh = bttsPercentage >= 68;
    const won = isPredictionHigh ? actualBTTS : !actualBTTS;

    settlement = {
      isSettled: true,
      actualBTTS,
      won,
      scoreText: `${score.home}-${score.away}`,
      badgeText: won ? '✅ BTTS HIT' : '❌ BTTS MISSED',
      color: won ? '#10b981' : '#ef4444'
    };
  }

  return {
    score: bttsPercentage,
    tier,
    tierLabel,
    tierColor,
    badgeText,
    fairOdds,
    settlement,
    components: {
      streakSynergy: Math.round(streakSynergyScore),
      recentForm: Math.round(recentFormScore),
      h2h: Math.round(h2hScore),
      expectedGoal: Math.round(expectedGoalBTTS)
    },
    insights,
    homeScoreStreak,
    homeConcedeStreak,
    awayScoreStreak,
    awayConcedeStreak
  };
}

export function calculateValue(bttsScore, bookieOdds) {
  if (!bookieOdds || isNaN(bookieOdds) || bookieOdds <= 1) {
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
