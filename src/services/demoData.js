/**
 * Bundled demo dataset.
 *
 * This exists so the app runs with no API token on a static host. It is a
 * sample, NOT real upcoming fixtures, and the UI labels it as such.
 *
 * Each team is defined by its recent results, and every stat the model reads
 * is derived from those results - so the demo data is internally consistent
 * and cannot drift the way hand-written streaks and averages did. The results
 * are also weighted to a realistic BTTS base rate (~50%, in line with the top
 * European leagues) rather than the near-100% the previous fixtures implied.
 */

// Helper to format date strings YYYY-MM-DD
function getFormattedDate(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

function getDisplayDate(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function getAvailableDates() {
  return [
    { key: 'today', label: 'Today', dateStr: getFormattedDate(0), display: getDisplayDate(0) },
    { key: 'tomorrow', label: 'Tomorrow (Focus)', dateStr: getFormattedDate(1), display: getDisplayDate(1), isDefault: true },
    { key: 'nextDay', label: 'Day After', dateStr: getFormattedDate(2), display: getDisplayDate(2) },
  ];
}

export const LEAGUES = [
  { id: 'all', name: 'All Leagues', icon: '⚽' },
  { id: 'epl', name: 'English Premier League', icon: '🦁' },
  { id: 'laliga', name: 'La Liga', icon: '🇪🇸' },
  { id: 'seriea', name: 'Serie A', icon: '🇮🇹' },
  { id: 'bundesliga', name: 'Bundesliga', icon: '🇩🇪' },
  { id: 'ucl', name: 'UEFA Champions League', icon: '🏆' },
  { id: 'mls', name: 'MLS', icon: '🇺🇸' }
];

/**
 * Derives the model's inputs from a team's results, most recent first.
 * Same shape the live path produces in apiService.computeTeamForm.
 */
export function deriveTeamStats(team) {
  const { form } = team;

  let scoringStreak = 0;
  for (const m of form) {
    if (m.gf > 0) scoringStreak++; else break;
  }
  let concedingStreak = 0;
  for (const m of form) {
    if (m.ga > 0) concedingStreak++; else break;
  }

  const avg = (fn) => Number((form.reduce((t, m) => t + fn(m), 0) / form.length).toFixed(2));

  return {
    id: team.id,
    name: team.name,
    shortName: team.shortName,
    logo: team.logo,
    primaryColor: team.primaryColor,
    scoringStreak,
    concedingStreak,
    avgGoalsScored: avg(m => m.gf),
    avgGoalsConceded: avg(m => m.ga),
    recentMatches: form.slice(0, 5).map(m => ({
      opponent: m.opp,
      score: `${m.gf}-${m.ga}`,
      btts: m.gf > 0 && m.ga > 0,
      isHome: !!m.home
    }))
  };
}

/** Results are `gf-ga` from that team's own perspective, most recent first. */
const TEAMS = {
  ars: {
    id: 'ars', name: 'Arsenal', shortName: 'ARS', primaryColor: '#ef0107',
    logo: 'https://media.api-sports.io/football/teams/42.png',
    form: [
      { opp: 'Wolves', gf: 2, ga: 0, home: true },
      { opp: 'Newcastle', gf: 1, ga: 1, home: false },
      { opp: 'West Ham', gf: 3, ga: 1, home: true },
      { opp: 'Everton', gf: 0, ga: 1, home: false },
      { opp: 'Brighton', gf: 2, ga: 2, home: true },
      { opp: 'Fulham', gf: 1, ga: 0, home: false }
    ]
  },
  che: {
    id: 'che', name: 'Chelsea', shortName: 'CHE', primaryColor: '#034694',
    logo: 'https://media.api-sports.io/football/teams/49.png',
    form: [
      { opp: 'Aston Villa', gf: 1, ga: 2, home: false },
      { opp: 'Man City', gf: 2, ga: 2, home: true },
      { opp: 'Fulham', gf: 3, ga: 0, home: true },
      { opp: 'Brighton', gf: 1, ga: 0, home: false },
      { opp: 'Wolves', gf: 0, ga: 2, home: false },
      { opp: 'Crystal Palace', gf: 2, ga: 1, home: true }
    ]
  },
  lev: {
    id: 'lev', name: 'Bayer Leverkusen', shortName: 'LEV', primaryColor: '#e32219',
    logo: 'https://media.api-sports.io/football/teams/168.png',
    form: [
      { opp: 'Freiburg', gf: 2, ga: 1, home: true },
      { opp: 'RB Leipzig', gf: 1, ga: 1, home: false },
      { opp: 'Bochum', gf: 4, ga: 2, home: true },
      { opp: 'Union Berlin', gf: 0, ga: 0, home: false },
      { opp: 'Mainz', gf: 3, ga: 0, home: true },
      { opp: 'Stuttgart', gf: 2, ga: 3, home: false }
    ]
  },
  bvb: {
    id: 'bvb', name: 'Borussia Dortmund', shortName: 'BVB', primaryColor: '#fde100',
    logo: 'https://media.api-sports.io/football/teams/165.png',
    form: [
      { opp: 'Bayern', gf: 1, ga: 1, home: false },
      { opp: 'Mgladbach', gf: 3, ga: 0, home: true },
      { opp: 'Wolfsburg', gf: 0, ga: 2, home: false },
      { opp: 'Freiburg', gf: 2, ga: 2, home: true },
      { opp: 'Union Berlin', gf: 1, ga: 0, home: true },
      { opp: 'RB Leipzig', gf: 2, ga: 4, home: false }
    ]
  },
  rma: {
    id: 'rma', name: 'Real Madrid', shortName: 'RMA', primaryColor: '#00529f',
    logo: 'https://media.api-sports.io/football/teams/541.png',
    form: [
      { opp: 'Getafe', gf: 2, ga: 0, home: true },
      { opp: 'Sevilla', gf: 1, ga: 0, home: false },
      { opp: 'Valencia', gf: 3, ga: 1, home: true },
      { opp: 'Osasuna', gf: 2, ga: 0, home: false },
      { opp: 'Betis', gf: 1, ga: 2, home: true },
      { opp: 'Alaves', gf: 4, ga: 1, home: false }
    ]
  },
  vil: {
    id: 'vil', name: 'Villarreal', shortName: 'VIL', primaryColor: '#ffe600',
    logo: 'https://media.api-sports.io/football/teams/533.png',
    form: [
      { opp: 'Real Sociedad', gf: 1, ga: 1, home: true },
      { opp: 'Girona', gf: 2, ga: 3, home: false },
      { opp: 'Getafe', gf: 1, ga: 0, home: true },
      { opp: 'Mallorca', gf: 0, ga: 2, home: false },
      { opp: 'Osasuna', gf: 2, ga: 0, home: true },
      { opp: 'Celta Vigo', gf: 1, ga: 1, home: false }
    ]
  },
  nap: {
    id: 'nap', name: 'Napoli', shortName: 'NAP', primaryColor: '#008fd7',
    logo: 'https://media.api-sports.io/football/teams/492.png',
    form: [
      { opp: 'Torino', gf: 1, ga: 0, home: true },
      { opp: 'Juventus', gf: 0, ga: 0, home: false },
      { opp: 'Lazio', gf: 2, ga: 1, home: true },
      { opp: 'Atalanta', gf: 1, ga: 2, home: false },
      { opp: 'Empoli', gf: 2, ga: 0, home: true },
      { opp: 'Milan', gf: 0, ga: 1, home: false }
    ]
  },
  ata: {
    id: 'ata', name: 'Atalanta', shortName: 'ATA', primaryColor: '#0054a6',
    logo: 'https://media.api-sports.io/football/teams/499.png',
    form: [
      { opp: 'Bologna', gf: 3, ga: 1, home: true },
      { opp: 'Roma', gf: 2, ga: 0, home: false },
      { opp: 'Udinese', gf: 1, ga: 0, home: true },
      { opp: 'Verona', gf: 2, ga: 1, home: false },
      { opp: 'Inter', gf: 0, ga: 2, home: true },
      { opp: 'Fiorentina', gf: 3, ga: 3, home: false }
    ]
  },
  psg: {
    id: 'psg', name: 'Paris Saint-Germain', shortName: 'PSG', primaryColor: '#001c58',
    logo: 'https://media.api-sports.io/football/teams/85.png',
    form: [
      { opp: 'Lyon', gf: 4, ga: 0, home: true },
      { opp: 'Nice', gf: 2, ga: 1, home: false },
      { opp: 'Lens', gf: 1, ga: 1, home: true },
      { opp: 'Monaco', gf: 3, ga: 2, home: false },
      { opp: 'Rennes', gf: 2, ga: 0, home: true },
      { opp: 'Marseille', gf: 0, ga: 1, home: false }
    ]
  },
  bar: {
    id: 'bar', name: 'FC Barcelona', shortName: 'BAR', primaryColor: '#a50044',
    logo: 'https://media.api-sports.io/football/teams/529.png',
    form: [
      { opp: 'Sevilla', gf: 3, ga: 1, home: true },
      { opp: 'Atletico', gf: 1, ga: 2, home: false },
      { opp: 'Betis', gf: 2, ga: 0, home: true },
      { opp: 'Espanyol', gf: 4, ga: 0, home: true },
      { opp: 'Valencia', gf: 1, ga: 1, home: false },
      { opp: 'Athletic', gf: 0, ga: 0, home: false }
    ]
  },
  mia: {
    id: 'mia', name: 'Inter Miami', shortName: 'MIA', primaryColor: '#f7b5cd',
    logo: 'https://media.api-sports.io/football/teams/14603.png',
    form: [
      { opp: 'Orlando', gf: 3, ga: 2, home: true },
      { opp: 'Atlanta', gf: 1, ga: 0, home: false },
      { opp: 'NYCFC', gf: 2, ga: 3, home: false },
      { opp: 'Columbus', gf: 4, ga: 1, home: true },
      { opp: 'Nashville', gf: 2, ga: 0, home: true },
      { opp: 'Charlotte', gf: 1, ga: 0, home: false }
    ]
  },
  lag: {
    id: 'lag', name: 'LA Galaxy', shortName: 'LAG', primaryColor: '#00245d',
    logo: 'https://media.api-sports.io/football/teams/1601.png',
    form: [
      { opp: 'Seattle', gf: 2, ga: 2, home: true },
      { opp: 'LAFC', gf: 1, ga: 4, home: false },
      { opp: 'Portland', gf: 3, ga: 0, home: true },
      { opp: 'Dallas', gf: 0, ga: 1, home: false },
      { opp: 'San Jose', gf: 2, ga: 1, home: true },
      { opp: 'Houston', gf: 1, ga: 0, home: false }
    ]
  },
  mci: {
    id: 'mci', name: 'Manchester City', shortName: 'MCI', primaryColor: '#6cabdd',
    logo: 'https://media.api-sports.io/football/teams/50.png',
    form: [
      { opp: 'Brentford', gf: 2, ga: 0, home: true },
      { opp: 'Liverpool', gf: 1, ga: 1, home: false },
      { opp: 'Crystal Palace', gf: 3, ga: 1, home: true },
      { opp: 'Spurs', gf: 2, ga: 0, home: false },
      { opp: 'Everton', gf: 1, ga: 0, home: true },
      { opp: 'Luton', gf: 4, ga: 2, home: false }
    ]
  },
  liv: {
    id: 'liv', name: 'Liverpool', shortName: 'LIV', primaryColor: '#c8102e',
    logo: 'https://media.api-sports.io/football/teams/40.png',
    form: [
      { opp: 'Man City', gf: 1, ga: 1, home: true },
      { opp: 'Aston Villa', gf: 2, ga: 0, home: false },
      { opp: 'Burnley', gf: 3, ga: 0, home: true },
      { opp: 'Brighton', gf: 1, ga: 2, home: false },
      { opp: 'Wolves', gf: 2, ga: 1, home: true },
      { opp: 'Everton', gf: 0, ga: 0, home: false }
    ]
  },
  int: {
    id: 'int', name: 'Inter Milan', shortName: 'INT', primaryColor: '#0066b2',
    logo: 'https://media.api-sports.io/football/teams/505.png',
    form: [
      { opp: 'Milan', gf: 2, ga: 0, home: true },
      { opp: 'Roma', gf: 1, ga: 0, home: false },
      { opp: 'Genoa', gf: 3, ga: 1, home: true },
      { opp: 'Lazio', gf: 0, ga: 0, home: false },
      { opp: 'Sassuolo', gf: 2, ga: 1, home: true },
      { opp: 'Cagliari', gf: 1, ga: 1, home: false }
    ]
  },
  juv: {
    id: 'juv', name: 'Juventus', shortName: 'JUV', primaryColor: '#000000',
    logo: 'https://media.api-sports.io/football/teams/496.png',
    form: [
      { opp: 'Lazio', gf: 1, ga: 1, home: true },
      { opp: 'Napoli', gf: 0, ga: 0, home: false },
      { opp: 'Frosinone', gf: 2, ga: 0, home: true },
      { opp: 'Torino', gf: 1, ga: 2, home: false },
      { opp: 'Empoli', gf: 0, ga: 1, home: false },
      { opp: 'Monza', gf: 2, ga: 2, home: true }
    ]
  }
};

/** h2h entries are graded from the scoreline, so they cannot contradict it. */
function h2h(...entries) {
  return entries.map(([date, home, away]) => ({
    date,
    score: `${home}-${away}`,
    btts: home > 0 && away > 0
  }));
}

export function getDemoFixtures() {
  const todayStr = getFormattedDate(0);
  const tomorrowStr = getFormattedDate(1);
  const dayAfterStr = getFormattedDate(2);

  const fixtures = [
    // --- TOMORROW ---
    {
      id: 'demo-1', date: tomorrowStr, time: '19:45', status: 'SCHEDULED',
      leagueId: 'epl', leagueName: 'English Premier League',
      home: 'ars', away: 'che',
      h2h: h2h(['2025-11-10', 2, 2], ['2025-04-23', 3, 1], ['2024-10-21', 1, 0], ['2024-03-16', 5, 0]),
      bookmakerBTTSOdds: { yes: 1.75, no: 2.10 }
    },
    {
      id: 'demo-2', date: tomorrowStr, time: '20:00', status: 'SCHEDULED',
      leagueId: 'bundesliga', leagueName: 'Bundesliga',
      home: 'lev', away: 'bvb',
      h2h: h2h(['2025-12-03', 3, 2], ['2025-04-21', 1, 1], ['2024-12-03', 2, 0], ['2024-04-21', 1, 1]),
      bookmakerBTTSOdds: { yes: 1.57, no: 2.35 }
    },
    {
      id: 'demo-3', date: tomorrowStr, time: '20:30', status: 'SCHEDULED',
      leagueId: 'laliga', leagueName: 'La Liga',
      home: 'rma', away: 'vil',
      h2h: h2h(['2025-10-05', 2, 1], ['2025-05-19', 4, 4], ['2024-12-17', 4, 0]),
      kalshiTicker: 'kxlaligagame-26aug22esprma',
      bookmakerBTTSOdds: { yes: 1.62, no: 2.20 }
    },
    {
      id: 'demo-4', date: tomorrowStr, time: '19:00', status: 'SCHEDULED',
      leagueId: 'seriea', leagueName: 'Serie A',
      home: 'nap', away: 'ata',
      h2h: h2h(['2025-11-03', 0, 3], ['2025-03-30', 0, 3], ['2024-11-25', 2, 1]),
      bookmakerBTTSOdds: { yes: 1.95, no: 1.85 }
    },
    {
      id: 'demo-5', date: tomorrowStr, time: '20:00', status: 'SCHEDULED',
      leagueId: 'ucl', leagueName: 'UEFA Champions League',
      home: 'psg', away: 'bar',
      h2h: h2h(['2024-04-16', 1, 4], ['2024-04-10', 2, 3], ['2021-03-10', 1, 1]),
      bookmakerBTTSOdds: { yes: 1.48, no: 2.60 }
    },
    {
      id: 'demo-6', date: tomorrowStr, time: '21:00', status: 'SCHEDULED',
      leagueId: 'mls', leagueName: 'MLS',
      home: 'mia', away: 'lag',
      h2h: h2h(['2025-02-25', 1, 1], ['2024-06-03', 3, 2]),
      bookmakerBTTSOdds: { yes: 1.42, no: 2.75 }
    },
    // A fixture with no form or head-to-head data at all, so the "we cannot
    // score this" path is visible in the demo rather than only in production.
    {
      id: 'demo-7', date: tomorrowStr, time: '18:00', status: 'SCHEDULED',
      leagueId: 'all', leagueName: 'Club Friendly',
      unknownTeams: [
        { id: 'tbd-a', name: 'Vitoria Guimaraes', shortName: 'VIT', primaryColor: '#ffffff' },
        { id: 'tbd-b', name: 'Rio Ave', shortName: 'RIO', primaryColor: '#00a651' }
      ],
      h2h: [],
      bookmakerBTTSOdds: { yes: 1.72, no: 2.05 }
    },

    // --- TODAY ---
    {
      id: 'demo-8', date: todayStr, time: '18:30', status: 'SCHEDULED',
      leagueId: 'epl', leagueName: 'English Premier League',
      home: 'mci', away: 'liv',
      h2h: h2h(['2025-12-01', 2, 2], ['2025-03-10', 1, 1], ['2024-11-25', 2, 0]),
      bookmakerBTTSOdds: { yes: 1.55, no: 2.40 }
    },
    // A finished match with a real reported scoreline, so settlement has
    // something genuine to grade against.
    {
      id: 'demo-9', date: todayStr, time: '13:00', status: 'FINISHED',
      leagueId: 'seriea', leagueName: 'Serie A',
      home: 'int', away: 'juv',
      finalScore: { home: 2, away: 1 },
      h2h: h2h(['2025-10-27', 4, 4], ['2025-02-16', 1, 0]),
      bookmakerBTTSOdds: { yes: 1.90, no: 1.90 }
    },

    // --- DAY AFTER ---
    {
      id: 'demo-10', date: dayAfterStr, time: '19:45', status: 'SCHEDULED',
      leagueId: 'seriea', leagueName: 'Serie A',
      home: 'int', away: 'nap',
      h2h: h2h(['2025-09-14', 1, 1], ['2025-03-02', 1, 0]),
      bookmakerBTTSOdds: { yes: 1.88, no: 1.92 }
    }
  ];

  return fixtures.map(f => {
    const { home, away, unknownTeams, ...rest } = f;
    const [unknownHome, unknownAway] = unknownTeams || [];
    return {
      ...rest,
      isDemo: true,
      homeTeam: home ? deriveTeamStats(TEAMS[home]) : { ...unknownHome, logo: null },
      awayTeam: away ? deriveTeamStats(TEAMS[away]) : { ...unknownAway, logo: null }
    };
  });
}
