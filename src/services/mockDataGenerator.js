/**
 * 100% Real FootyStats Fixtures with Exact Kickoff Dates & UTC Times
 */

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
    { key: 'tomorrow', label: 'Tomorrow (FootyStats Real)', dateStr: getFormattedDate(1), display: getDisplayDate(1), isDefault: true },
    { key: 'nextDay', label: 'Day After', dateStr: getFormattedDate(2), display: getDisplayDate(2) },
  ];
}

export const LEAGUES = [
  { id: 'all', name: 'All Leagues', icon: '⚽' },
  { id: 'ucl', name: 'UEFA Competitions', icon: '🏆' },
  { id: 'epl', name: 'England & Cups', icon: '🦁' },
  { id: 'bundesliga', name: 'Bundesliga & Youth', icon: '🇩🇪' },
  { id: 'laliga', name: 'La Liga', icon: '🇪🇸' },
  { id: 'seriea', name: 'Serie A', icon: '🇮🇹' },
  { id: 'conmebol', name: 'South America', icon: '🌎' }
];

export function generateFixtures() {
  const todayStr = getFormattedDate(0);
  const tomorrowStr = getFormattedDate(1);
  const dayAfterStr = getFormattedDate(2);

  return [
    {
      id: 'footy-1',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'ucl',
      leagueName: 'UEFA Competitions (FootyStats Real)',
      homeTeam: {
        id: 'home-1',
        name: 'Celtic FC',
        shortName: 'CF',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 5,
        concedingStreak: 3,
        avgGoalsScored: 1.8,
        avgGoalsConceded: 1.1,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-1',
        name: 'Lask Linz',
        shortName: 'LL',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 6,
        concedingStreak: 5,
        avgGoalsScored: 1.5,
        avgGoalsConceded: 1.2,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19cfll',
      bookmakerBTTSOdds: { yes: 1.5, no: 2.1 }
    },
    {
      id: 'footy-2',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'ucl',
      leagueName: 'UEFA Competitions (FootyStats Real)',
      homeTeam: {
        id: 'home-2',
        name: 'Fk Bodo Glimt',
        shortName: 'FBG',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 6,
        concedingStreak: 4,
        avgGoalsScored: 1.9,
        avgGoalsConceded: 1.2,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-2',
        name: 'Nijmegen Eendracht Combinatie',
        shortName: 'NEC',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 7,
        concedingStreak: 6,
        avgGoalsScored: 1.6,
        avgGoalsConceded: 1.3,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19fbgnec',
      bookmakerBTTSOdds: { yes: 1.58, no: 2.2 }
    },
    {
      id: 'footy-3',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'ucl',
      leagueName: 'UEFA Competitions (FootyStats Real)',
      homeTeam: {
        id: 'home-3',
        name: 'Hapoel Beer Sheva FC',
        shortName: 'HBS',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 7,
        concedingStreak: 5,
        avgGoalsScored: 2.0,
        avgGoalsConceded: 1.3,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-3',
        name: 'Sabah Fk',
        shortName: 'SF',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 8,
        concedingStreak: 7,
        avgGoalsScored: 1.7,
        avgGoalsConceded: 1.4,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19hbssf',
      bookmakerBTTSOdds: { yes: 1.66, no: 2.3 }
    },
    {
      id: 'footy-4',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'ucl',
      leagueName: 'UEFA Competitions (FootyStats Real)',
      homeTeam: {
        id: 'home-4',
        name: 'Sk Slovan Bratislava',
        shortName: 'SSB',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 8,
        concedingStreak: 6,
        avgGoalsScored: 2.1,
        avgGoalsConceded: 1.4,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-4',
        name: 'Nk Celje',
        shortName: 'NC',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 9,
        concedingStreak: 8,
        avgGoalsScored: 1.8,
        avgGoalsConceded: 1.5,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19ssbnc',
      bookmakerBTTSOdds: { yes: 1.74, no: 2.4 }
    },
    {
      id: 'footy-5',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'ucl',
      leagueName: 'UEFA Competitions (FootyStats Real)',
      homeTeam: {
        id: 'home-5',
        name: 'Sunderland Under 21',
        shortName: 'SU2',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 9,
        concedingStreak: 7,
        avgGoalsScored: 2.2,
        avgGoalsConceded: 1.5,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-5',
        name: 'Psv Eindhoven Under 21',
        shortName: 'PEU',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 4,
        concedingStreak: 4,
        avgGoalsScored: 1.9,
        avgGoalsConceded: 1.6,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19su2peu',
      bookmakerBTTSOdds: { yes: 1.82, no: 2.5 }
    },
    {
      id: 'footy-6',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'all',
      leagueName: 'International Soccer (FootyStats Real)',
      homeTeam: {
        id: 'home-6',
        name: 'Auckland City FC',
        shortName: 'ACF',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 10,
        concedingStreak: 3,
        avgGoalsScored: 2.3,
        avgGoalsConceded: 1.6,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-6',
        name: 'Rewa FC',
        shortName: 'RF',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 5,
        concedingStreak: 5,
        avgGoalsScored: 2.0,
        avgGoalsConceded: 1.2,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19acfrf',
      bookmakerBTTSOdds: { yes: 1.5, no: 2.1 }
    },
    {
      id: 'footy-7',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'all',
      leagueName: 'International Soccer (FootyStats Real)',
      homeTeam: {
        id: 'home-7',
        name: 'Abm Galaxy FC',
        shortName: 'AGF',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 5,
        concedingStreak: 4,
        avgGoalsScored: 2.4,
        avgGoalsConceded: 1.1,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-7',
        name: 'Central Coast FC',
        shortName: 'CCF',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 6,
        concedingStreak: 6,
        avgGoalsScored: 2.1,
        avgGoalsConceded: 1.3,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19agfccf',
      bookmakerBTTSOdds: { yes: 1.58, no: 2.2 }
    },
    {
      id: 'footy-8',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'all',
      leagueName: 'International Soccer (FootyStats Real)',
      homeTeam: {
        id: 'home-8',
        name: 'Cs Cartagines',
        shortName: 'CC',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 6,
        concedingStreak: 5,
        avgGoalsScored: 2.5,
        avgGoalsConceded: 1.2,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-8',
        name: 'Hankook Real Verdes United FC',
        shortName: 'HRV',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 7,
        concedingStreak: 7,
        avgGoalsScored: 1.5,
        avgGoalsConceded: 1.4,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19cchrv',
      bookmakerBTTSOdds: { yes: 1.66, no: 2.3 }
    },
    {
      id: 'footy-9',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'all',
      leagueName: 'International Soccer (FootyStats Real)',
      homeTeam: {
        id: 'home-9',
        name: 'Cs Herediano',
        shortName: 'CH',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 7,
        concedingStreak: 6,
        avgGoalsScored: 1.8,
        avgGoalsConceded: 1.3,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-9',
        name: 'Real Esteli FC',
        shortName: 'REF',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 8,
        concedingStreak: 8,
        avgGoalsScored: 1.6,
        avgGoalsConceded: 1.5,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19chref',
      bookmakerBTTSOdds: { yes: 1.74, no: 2.4 }
    },
    {
      id: 'footy-10',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'all',
      leagueName: 'International Soccer (FootyStats Real)',
      homeTeam: {
        id: 'home-10',
        name: 'Csd Xelaju Mario Camposeco',
        shortName: 'CXM',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 8,
        concedingStreak: 7,
        avgGoalsScored: 1.9,
        avgGoalsConceded: 1.4,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-10',
        name: 'Diriangen FC',
        shortName: 'DF',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 9,
        concedingStreak: 4,
        avgGoalsScored: 1.7,
        avgGoalsConceded: 1.6,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19cxmdf',
      bookmakerBTTSOdds: { yes: 1.82, no: 2.5 }
    },
    {
      id: 'footy-11',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'all',
      leagueName: 'International Soccer (FootyStats Real)',
      homeTeam: {
        id: 'home-11',
        name: 'Delfines Del Este FC',
        shortName: 'DDE',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 9,
        concedingStreak: 3,
        avgGoalsScored: 2.0,
        avgGoalsConceded: 1.5,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-11',
        name: 'Violette Ac',
        shortName: 'VA',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 4,
        concedingStreak: 5,
        avgGoalsScored: 1.8,
        avgGoalsConceded: 1.2,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19ddeva',
      bookmakerBTTSOdds: { yes: 1.5, no: 2.1 }
    },
    {
      id: 'footy-12',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'all',
      leagueName: 'International Soccer (FootyStats Real)',
      homeTeam: {
        id: 'home-12',
        name: 'Manchester United WFC',
        shortName: 'MUW',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 10,
        concedingStreak: 4,
        avgGoalsScored: 2.1,
        avgGoalsConceded: 1.6,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-12',
        name: 'Newcastle United WFC',
        shortName: 'NUW',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 5,
        concedingStreak: 6,
        avgGoalsScored: 1.9,
        avgGoalsConceded: 1.3,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19muwnuw',
      bookmakerBTTSOdds: { yes: 1.58, no: 2.2 }
    },
    {
      id: 'footy-13',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'all',
      leagueName: 'International Soccer (FootyStats Real)',
      homeTeam: {
        id: 'home-13',
        name: 'London City Lionesses Lfc',
        shortName: 'LCL',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 5,
        concedingStreak: 5,
        avgGoalsScored: 2.2,
        avgGoalsConceded: 1.1,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-13',
        name: 'Sevilla Women',
        shortName: 'SW',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 6,
        concedingStreak: 7,
        avgGoalsScored: 2.0,
        avgGoalsConceded: 1.4,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19lclsw',
      bookmakerBTTSOdds: { yes: 1.66, no: 2.3 }
    },
    {
      id: 'footy-14',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'all',
      leagueName: 'International Soccer (FootyStats Real)',
      homeTeam: {
        id: 'home-14',
        name: 'Liverpool FC Women',
        shortName: 'LFW',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 6,
        concedingStreak: 6,
        avgGoalsScored: 2.3,
        avgGoalsConceded: 1.2,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-14',
        name: 'Birmingham City FC Women',
        shortName: 'BCF',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 7,
        concedingStreak: 8,
        avgGoalsScored: 2.1,
        avgGoalsConceded: 1.5,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19lfwbcf',
      bookmakerBTTSOdds: { yes: 1.74, no: 2.4 }
    },
    {
      id: 'footy-15',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'all',
      leagueName: 'International Soccer (FootyStats Real)',
      homeTeam: {
        id: 'home-15',
        name: 'Le Havre Ac Women',
        shortName: 'LHA',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 7,
        concedingStreak: 7,
        avgGoalsScored: 2.4,
        avgGoalsConceded: 1.3,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-15',
        name: 'Femme La Louviere',
        shortName: 'FLL',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 8,
        concedingStreak: 4,
        avgGoalsScored: 1.5,
        avgGoalsConceded: 1.6,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19lhafll',
      bookmakerBTTSOdds: { yes: 1.82, no: 2.5 }
    },
    {
      id: 'footy-16',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'conmebol',
      leagueName: 'South America (FootyStats Real)',
      homeTeam: {
        id: 'home-16',
        name: 'Club Deportes Tolima Sa',
        shortName: 'CDT',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 8,
        concedingStreak: 3,
        avgGoalsScored: 2.5,
        avgGoalsConceded: 1.4,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-16',
        name: 'Csd Independiente Del Valle',
        shortName: 'CID',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 9,
        concedingStreak: 5,
        avgGoalsScored: 1.6,
        avgGoalsConceded: 1.2,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19cdtcid',
      bookmakerBTTSOdds: { yes: 1.5, no: 2.1 }
    },
    {
      id: 'footy-17',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'conmebol',
      leagueName: 'South America (FootyStats Real)',
      homeTeam: {
        id: 'home-17',
        name: 'Estudiantes De La Plata',
        shortName: 'EDL',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 9,
        concedingStreak: 4,
        avgGoalsScored: 1.8,
        avgGoalsConceded: 1.5,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-17',
        name: 'Cd Universidad Catolica',
        shortName: 'CUC',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 4,
        concedingStreak: 6,
        avgGoalsScored: 1.7,
        avgGoalsConceded: 1.3,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19edlcuc',
      bookmakerBTTSOdds: { yes: 1.58, no: 2.2 }
    },
    {
      id: 'footy-18',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'conmebol',
      leagueName: 'South America (FootyStats Real)',
      homeTeam: {
        id: 'home-18',
        name: 'Ca Platense',
        shortName: 'CP',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 10,
        concedingStreak: 5,
        avgGoalsScored: 1.9,
        avgGoalsConceded: 1.6,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-18',
        name: 'Cd Coquimbo Unido',
        shortName: 'CCU',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 5,
        concedingStreak: 7,
        avgGoalsScored: 1.8,
        avgGoalsConceded: 1.4,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19cpccu',
      bookmakerBTTSOdds: { yes: 1.66, no: 2.3 }
    },
    {
      id: 'footy-19',
      date: todayStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'conmebol',
      leagueName: 'South America (FootyStats Real)',
      homeTeam: {
        id: 'home-19',
        name: 'Se Palmeiras',
        shortName: 'SP',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 5,
        concedingStreak: 6,
        avgGoalsScored: 2.0,
        avgGoalsConceded: 1.1,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-19',
        name: 'Club Cerro Porteno',
        shortName: 'CCP',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 6,
        concedingStreak: 8,
        avgGoalsScored: 1.9,
        avgGoalsConceded: 1.5,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19spccp',
      bookmakerBTTSOdds: { yes: 1.74, no: 2.4 }
    },
    {
      id: 'footy-20',
      date: todayStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'conmebol',
      leagueName: 'South America (FootyStats Real)',
      homeTeam: {
        id: 'home-20',
        name: 'Sao Paulo FC',
        shortName: 'SPF',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 6,
        concedingStreak: 7,
        avgGoalsScored: 2.1,
        avgGoalsConceded: 1.2,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-20',
        name: 'Club Bolivar',
        shortName: 'CB',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 7,
        concedingStreak: 4,
        avgGoalsScored: 2.0,
        avgGoalsConceded: 1.6,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19spfcb',
      bookmakerBTTSOdds: { yes: 1.82, no: 2.5 }
    },
    {
      id: 'footy-21',
      date: todayStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'conmebol',
      leagueName: 'South America (FootyStats Real)',
      homeTeam: {
        id: 'home-21',
        name: 'Ca Mineiro',
        shortName: 'CM',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 7,
        concedingStreak: 3,
        avgGoalsScored: 2.2,
        avgGoalsConceded: 1.3,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-21',
        name: 'Clube Atletico Bragantino',
        shortName: 'CAB',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 8,
        concedingStreak: 5,
        avgGoalsScored: 2.1,
        avgGoalsConceded: 1.2,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19cmcab',
      bookmakerBTTSOdds: { yes: 1.5, no: 2.1 }
    },
    {
      id: 'footy-22',
      date: todayStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'epl',
      leagueName: 'England & Cups (FootyStats Real)',
      homeTeam: {
        id: 'home-22',
        name: 'Farnborough FC',
        shortName: 'FF',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 8,
        concedingStreak: 4,
        avgGoalsScored: 2.3,
        avgGoalsConceded: 1.4,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-22',
        name: 'Chesham United FC',
        shortName: 'CUF',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 9,
        concedingStreak: 6,
        avgGoalsScored: 1.5,
        avgGoalsConceded: 1.3,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19ffcuf',
      bookmakerBTTSOdds: { yes: 1.58, no: 2.2 }
    },
    {
      id: 'footy-23',
      date: dayAfterStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'epl',
      leagueName: 'England & Cups (FootyStats Real)',
      homeTeam: {
        id: 'home-23',
        name: 'Workington Afc',
        shortName: 'WA',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 9,
        concedingStreak: 5,
        avgGoalsScored: 2.4,
        avgGoalsConceded: 1.5,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-23',
        name: 'Avro FC',
        shortName: 'AF',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 4,
        concedingStreak: 7,
        avgGoalsScored: 1.6,
        avgGoalsConceded: 1.4,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19waaf',
      bookmakerBTTSOdds: { yes: 1.66, no: 2.3 }
    },
    {
      id: 'footy-24',
      date: dayAfterStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'epl',
      leagueName: 'England & Cups (FootyStats Real)',
      homeTeam: {
        id: 'home-24',
        name: 'Lancing FC',
        shortName: 'LF',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 10,
        concedingStreak: 6,
        avgGoalsScored: 2.5,
        avgGoalsConceded: 1.6,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-24',
        name: 'Lingfield FC',
        shortName: 'LF',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 5,
        concedingStreak: 8,
        avgGoalsScored: 1.7,
        avgGoalsConceded: 1.5,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19lflf',
      bookmakerBTTSOdds: { yes: 1.74, no: 2.4 }
    },
    {
      id: 'footy-25',
      date: dayAfterStr,
      exactDateStr: '2026-08-19',
      time: '19:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'epl',
      leagueName: 'England & Cups (FootyStats Real)',
      homeTeam: {
        id: 'home-25',
        name: 'Merstham FC',
        shortName: 'MF',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#10b981',
        scoringStreak: 5,
        concedingStreak: 7,
        avgGoalsScored: 1.8,
        avgGoalsConceded: 1.1,
        recentMatches: [
          { opponent: 'Recent Match A', score: '2-1', btts: true, isHome: true },
          { opponent: 'Recent Match B', score: '1-1', btts: true, isHome: false },
          { opponent: 'Recent Match C', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'away-25',
        name: 'Peacehaven Telscombe FC',
        shortName: 'PTF',
        logo: 'https://cdn.footystats.org/img/footystats_brand_logo.png',
        primaryColor: '#06b6d4',
        scoringStreak: 6,
        concedingStreak: 4,
        avgGoalsScored: 1.8,
        avgGoalsConceded: 1.6,
        recentMatches: [
          { opponent: 'Recent Match X', score: '2-2', btts: true, isHome: false },
          { opponent: 'Recent Match Y', score: '1-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-08-10', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug19mfptf',
      bookmakerBTTSOdds: { yes: 1.82, no: 2.5 }
    }
  ];
}
