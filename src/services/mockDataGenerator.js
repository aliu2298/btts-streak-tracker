/**
 * Top 5 European Leagues & UEFA Gameweek Schedule Data Generator
 * Focuses on: Premier League, La Liga, Serie A, Bundesliga, Ligue 1 & UCL
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
    { key: 'tomorrow', label: 'Tomorrow (Focus)', dateStr: getFormattedDate(1), display: getDisplayDate(1), isDefault: true },
    { key: 'nextDay', label: 'Day After', dateStr: getFormattedDate(2), display: getDisplayDate(2) },
  ];
}

export const GAMEWEEKS = [
  { id: 'gw1', label: 'Gameweek 1 (Top 5 Focus)', isCurrent: true },
  { id: 'gw2', label: 'Gameweek 2', isCurrent: false },
  { id: 'gw3', label: 'Gameweek 3', isCurrent: false },
];

export const LEAGUES = [
  { id: 'all', name: 'All Top Leagues', icon: '⚽' },
  { id: 'epl', name: 'Premier League', icon: '🦁' },
  { id: 'laliga', name: 'La Liga', icon: '🇪🇸' },
  { id: 'seriea', name: 'Serie A', icon: '🇮🇹' },
  { id: 'bundesliga', name: 'Bundesliga', icon: '🇩🇪' },
  { id: 'ligue1', name: 'Ligue 1', icon: '🇫🇷' },
  { id: 'ucl', name: 'Champions League', icon: '🏆' }
];

export function generateFixtures() {
  const todayStr = getFormattedDate(0);
  const tomorrowStr = getFormattedDate(1);
  const dayAfterStr = getFormattedDate(2);

  return [
    // ==========================================
    // GAMEWEEK 1: TOP 5 EUROPEAN LEAGUES FIXTURES
    // ==========================================

    // --- PREMIER LEAGUE (GAMEWEEK 1) ---
    {
      id: 'gw1-epl-1',
      gameweek: 'gw1',
      gameweekName: 'Gameweek 1',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '16:30 UTC',
      status: 'SCHEDULED',
      leagueId: 'epl',
      leagueName: 'English Premier League',
      homeTeam: {
        id: 'che',
        name: 'Chelsea',
        shortName: 'CHE',
        logo: 'https://media.api-sports.io/football/teams/49.png',
        primaryColor: '#034694',
        scoringStreak: 7,
        concedingStreak: 5,
        avgGoalsScored: 2.1,
        avgGoalsConceded: 1.5,
        recentMatches: [
          { opponent: 'Man City', score: '1-3', btts: true, isHome: true },
          { opponent: 'Aston Villa', score: '2-2', btts: true, isHome: false },
          { opponent: 'Fulham', score: '3-1', btts: true, isHome: false }
        ]
      },
      awayTeam: {
        id: 'mci',
        name: 'Manchester City',
        shortName: 'MCI',
        logo: 'https://media.api-sports.io/football/teams/50.png',
        primaryColor: '#6cabdd',
        scoringStreak: 12,
        concedingStreak: 4,
        avgGoalsScored: 2.6,
        avgGoalsConceded: 1.1,
        recentMatches: [
          { opponent: 'Liverpool', score: '1-1', btts: true, isHome: true },
          { opponent: 'Arsenal', score: '2-2', btts: true, isHome: false },
          { opponent: 'Brighton', score: '2-1', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-11-12', score: '4-4', btts: true },
        { date: '2025-01-15', score: '1-1', btts: true }
      ],
      kalshiTicker: 'kxeplgame-26aug18chemci',
      bookmakerBTTSOdds: { yes: 1.55, no: 2.45 }
    },
    {
      id: 'gw1-epl-2',
      gameweek: 'gw1',
      gameweekName: 'Gameweek 1',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '15:00 UTC',
      status: 'SCHEDULED',
      leagueId: 'epl',
      leagueName: 'English Premier League',
      homeTeam: {
        id: 'ars',
        name: 'Arsenal',
        shortName: 'ARS',
        logo: 'https://media.api-sports.io/football/teams/42.png',
        primaryColor: '#ef0107',
        scoringStreak: 9,
        concedingStreak: 3,
        avgGoalsScored: 2.5,
        avgGoalsConceded: 1.0,
        recentMatches: [
          { opponent: 'Chelsea', score: '3-1', btts: true, isHome: true },
          { opponent: 'Liverpool', score: '2-2', btts: true, isHome: false }
        ]
      },
      awayTeam: {
        id: 'wol',
        name: 'Wolverhampton Wanderers',
        shortName: 'WOL',
        logo: 'https://media.api-sports.io/football/teams/39.png',
        primaryColor: '#fdb913',
        scoringStreak: 6,
        concedingStreak: 7,
        avgGoalsScored: 1.5,
        avgGoalsConceded: 1.8,
        recentMatches: [
          { opponent: 'Spurs', score: '2-1', btts: true, isHome: false },
          { opponent: 'West Ham', score: '1-1', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-12-02', score: '2-1', btts: true }
      ],
      kalshiTicker: 'kxeplgame-26aug17arswol',
      bookmakerBTTSOdds: { yes: 1.80, no: 2.00 }
    },

    // --- LA LIGA (GAMEWEEK 1) ---
    {
      id: 'gw1-laliga-1',
      gameweek: 'gw1',
      gameweekName: 'Gameweek 1',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '20:30 UTC',
      status: 'SCHEDULED',
      leagueId: 'laliga',
      leagueName: 'La Liga',
      homeTeam: {
        id: 'mal',
        name: 'RCD Mallorca',
        shortName: 'MAL',
        logo: 'https://media.api-sports.io/football/teams/543.png',
        primaryColor: '#e20613',
        scoringStreak: 5,
        concedingStreak: 6,
        avgGoalsScored: 1.4,
        avgGoalsConceded: 1.5,
        recentMatches: [
          { opponent: 'Betis', score: '2-1', btts: true, isHome: true },
          { opponent: 'Girona', score: '1-1', btts: true, isHome: false }
        ]
      },
      awayTeam: {
        id: 'rma',
        name: 'Real Madrid',
        shortName: 'RMA',
        logo: 'https://media.api-sports.io/football/teams/541.png',
        primaryColor: '#00529f',
        scoringStreak: 11,
        concedingStreak: 3,
        avgGoalsScored: 2.6,
        avgGoalsConceded: 1.0,
        recentMatches: [
          { opponent: 'Villarreal', score: '2-1', btts: true, isHome: true },
          { opponent: 'Sevilla', score: '3-1', btts: true, isHome: false }
        ]
      },
      h2h: [
        { date: '2025-04-13', score: '1-1', btts: true },
        { date: '2024-08-18', score: '1-1', btts: true }
      ],
      kalshiTicker: 'kxlaligagame-26aug18malrma',
      bookmakerBTTSOdds: { yes: 1.72, no: 2.10 }
    },
    {
      id: 'gw1-laliga-2',
      gameweek: 'gw1',
      gameweekName: 'Gameweek 1',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '18:30 UTC',
      status: 'SCHEDULED',
      leagueId: 'laliga',
      leagueName: 'La Liga',
      homeTeam: {
        id: 'val',
        name: 'Valencia CF',
        shortName: 'VAL',
        logo: 'https://media.api-sports.io/football/teams/532.png',
        primaryColor: '#ff7e00',
        scoringStreak: 6,
        concedingStreak: 7,
        avgGoalsScored: 1.6,
        avgGoalsConceded: 1.7,
        recentMatches: [
          { opponent: 'Sevilla', score: '2-2', btts: true, isHome: true },
          { opponent: 'Villarreal', score: '1-2', btts: true, isHome: false }
        ]
      },
      awayTeam: {
        id: 'bar',
        name: 'FC Barcelona',
        shortName: 'BAR',
        logo: 'https://media.api-sports.io/football/teams/529.png',
        primaryColor: '#a50044',
        scoringStreak: 15,
        concedingStreak: 6,
        avgGoalsScored: 2.7,
        avgGoalsConceded: 1.2,
        recentMatches: [
          { opponent: 'Atletico', score: '3-1', btts: true, isHome: true },
          { opponent: 'Sociedad', score: '2-2', btts: true, isHome: false }
        ]
      },
      h2h: [
        { date: '2025-01-26', score: '2-4', btts: true },
        { date: '2024-08-17', score: '1-2', btts: true }
      ],
      kalshiTicker: 'kxlaligagame-26aug17valbar',
      bookmakerBTTSOdds: { yes: 1.58, no: 2.30 }
    },

    // --- SERIE A (GAMEWEEK 1) ---
    {
      id: 'gw1-seriea-1',
      gameweek: 'gw1',
      gameweekName: 'Gameweek 1',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:45 UTC',
      status: 'SCHEDULED',
      leagueId: 'seriea',
      leagueName: 'Serie A',
      homeTeam: {
        id: 'juv',
        name: 'Juventus',
        shortName: 'JUV',
        logo: 'https://media.api-sports.io/football/teams/496.png',
        primaryColor: '#000000',
        scoringStreak: 8,
        concedingStreak: 4,
        avgGoalsScored: 2.0,
        avgGoalsConceded: 1.1,
        recentMatches: [
          { opponent: 'Atalanta', score: '2-2', btts: true, isHome: true },
          { opponent: 'Lazio', score: '1-1', btts: true, isHome: false }
        ]
      },
      awayTeam: {
        id: 'com',
        name: 'Como 1907',
        shortName: 'COM',
        logo: 'https://media.api-sports.io/football/teams/869.png',
        primaryColor: '#003366',
        scoringStreak: 7,
        concedingStreak: 6,
        avgGoalsScored: 1.7,
        avgGoalsConceded: 1.6,
        recentMatches: [
          { opponent: 'Cagliari', score: '2-1', btts: true, isHome: true },
          { opponent: 'Verona', score: '2-2', btts: true, isHome: false }
        ]
      },
      h2h: [
        { date: '2024-08-19', score: '3-0', btts: false }
      ],
      kalshiTicker: 'kxserieagame-26aug19juvcom',
      bookmakerBTTSOdds: { yes: 1.85, no: 1.95 }
    },
    {
      id: 'gw1-seriea-2',
      gameweek: 'gw1',
      gameweekName: 'Gameweek 1',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '17:30 UTC',
      status: 'SCHEDULED',
      leagueId: 'seriea',
      leagueName: 'Serie A',
      homeTeam: {
        id: 'mil',
        name: 'AC Milan',
        shortName: 'MIL',
        logo: 'https://media.api-sports.io/football/teams/489.png',
        primaryColor: '#fb090b',
        scoringStreak: 10,
        concedingStreak: 6,
        avgGoalsScored: 2.2,
        avgGoalsConceded: 1.4,
        recentMatches: [
          { opponent: 'Inter', score: '2-2', btts: true, isHome: true },
          { opponent: 'Roma', score: '3-1', btts: true, isHome: false }
        ]
      },
      awayTeam: {
        id: 'tor',
        name: 'Torino FC',
        shortName: 'TOR',
        logo: 'https://media.api-sports.io/football/teams/503.png',
        primaryColor: '#8a1c14',
        scoringStreak: 6,
        concedingStreak: 5,
        avgGoalsScored: 1.5,
        avgGoalsConceded: 1.5,
        recentMatches: [
          { opponent: 'Fiorentina', score: '1-1', btts: true, isHome: true },
          { opponent: 'Bologna', score: '2-1', btts: true, isHome: false }
        ]
      },
      h2h: [
        { date: '2024-08-17', score: '2-2', btts: true }
      ],
      kalshiTicker: 'kxserieagame-26aug17miltor',
      bookmakerBTTSOdds: { yes: 1.75, no: 2.10 }
    },

    // --- BUNDESLIGA (GAMEWEEK 1) ---
    {
      id: 'gw1-bundesliga-1',
      gameweek: 'gw1',
      gameweekName: 'Gameweek 1',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '14:30 UTC',
      status: 'SCHEDULED',
      leagueId: 'bundesliga',
      leagueName: 'Bundesliga',
      homeTeam: {
        id: 'wol',
        name: 'VfL Wolfsburg',
        shortName: 'WOL',
        logo: 'https://media.api-sports.io/football/teams/161.png',
        primaryColor: '#65b32e',
        scoringStreak: 7,
        concedingStreak: 8,
        avgGoalsScored: 1.8,
        avgGoalsConceded: 1.9,
        recentMatches: [
          { opponent: 'Frankfurt', score: '2-2', btts: true, isHome: true },
          { opponent: 'Stuttgart', score: '1-3', btts: true, isHome: false }
        ]
      },
      awayTeam: {
        id: 'bay',
        name: 'FC Bayern München',
        shortName: 'BAY',
        logo: 'https://media.api-sports.io/football/teams/157.png',
        primaryColor: '#dc052d',
        scoringStreak: 16,
        concedingStreak: 5,
        avgGoalsScored: 3.1,
        avgGoalsConceded: 1.2,
        recentMatches: [
          { opponent: 'Dortmund', score: '2-2', btts: true, isHome: true },
          { opponent: 'Leverkusen', score: '3-1', btts: true, isHome: false }
        ]
      },
      h2h: [
        { date: '2024-08-25', score: '2-3', btts: true }
      ],
      kalshiTicker: 'kxbundesligagame-26aug25wolbay',
      bookmakerBTTSOdds: { yes: 1.52, no: 2.45 }
    },
    {
      id: 'gw1-bundesliga-2',
      gameweek: 'gw1',
      gameweekName: 'Gameweek 1',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '17:30 UTC',
      status: 'SCHEDULED',
      leagueId: 'bundesliga',
      leagueName: 'Bundesliga',
      homeTeam: {
        id: 'bvb',
        name: 'Borussia Dortmund',
        shortName: 'BVB',
        logo: 'https://media.api-sports.io/football/teams/165.png',
        primaryColor: '#fde100',
        scoringStreak: 12,
        concedingStreak: 7,
        avgGoalsScored: 2.6,
        avgGoalsConceded: 1.6,
        recentMatches: [
          { opponent: 'Bayern', score: '2-2', btts: true, isHome: true },
          { opponent: 'Leipzig', score: '3-2', btts: true, isHome: false }
        ]
      },
      awayTeam: {
        id: 'efr',
        name: 'Eintracht Frankfurt',
        shortName: 'EFR',
        logo: 'https://media.api-sports.io/football/teams/169.png',
        primaryColor: '#e1000f',
        scoringStreak: 9,
        concedingStreak: 8,
        avgGoalsScored: 2.2,
        avgGoalsConceded: 1.7,
        recentMatches: [
          { opponent: 'Hoffenheim', score: '3-1', btts: true, isHome: true },
          { opponent: 'Wolfsburg', score: '2-2', btts: true, isHome: false }
        ]
      },
      h2h: [
        { date: '2024-08-24', score: '2-0', btts: false }
      ],
      kalshiTicker: 'kxbundesligagame-26aug24bvbefr',
      bookmakerBTTSOdds: { yes: 1.48, no: 2.60 }
    },

    // --- LIGUE 1 (GAMEWEEK 1) ---
    {
      id: 'gw1-ligue1-1',
      gameweek: 'gw1',
      gameweekName: 'Gameweek 1',
      date: tomorrowStr,
      exactDateStr: '2026-08-19',
      time: '19:45 UTC',
      status: 'SCHEDULED',
      leagueId: 'ligue1',
      leagueName: 'Ligue 1',
      homeTeam: {
        id: 'lhv',
        name: 'Le Havre AC',
        shortName: 'LHV',
        logo: 'https://media.api-sports.io/football/teams/1063.png',
        primaryColor: '#00529b',
        scoringStreak: 5,
        concedingStreak: 7,
        avgGoalsScored: 1.4,
        avgGoalsConceded: 1.8,
        recentMatches: [
          { opponent: 'Rennes', score: '1-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'psg',
        name: 'Paris Saint-Germain',
        shortName: 'PSG',
        logo: 'https://media.api-sports.io/football/teams/85.png',
        primaryColor: '#001c58',
        scoringStreak: 14,
        concedingStreak: 6,
        avgGoalsScored: 2.9,
        avgGoalsConceded: 1.2,
        recentMatches: [
          { opponent: 'Marseille', score: '3-1', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2024-08-16', score: '1-4', btts: true }
      ],
      kalshiTicker: 'kxsoccer-26aug16lhvpsg',
      bookmakerBTTSOdds: { yes: 1.60, no: 2.30 }
    },

    // ==========================================
    // GAMEWEEK 2: TOP 5 EUROPEAN LEAGUES FIXTURES
    // ==========================================
    {
      id: 'gw2-epl-1',
      gameweek: 'gw2',
      gameweekName: 'Gameweek 2',
      date: dayAfterStr,
      exactDateStr: '2026-08-20',
      time: '16:30 UTC',
      status: 'SCHEDULED',
      leagueId: 'epl',
      leagueName: 'English Premier League',
      homeTeam: {
        id: 'mci',
        name: 'Manchester City',
        shortName: 'MCI',
        logo: 'https://media.api-sports.io/football/teams/50.png',
        primaryColor: '#6cabdd',
        scoringStreak: 13,
        concedingStreak: 4,
        avgGoalsScored: 2.7,
        avgGoalsConceded: 1.0,
        recentMatches: [
          { opponent: 'Chelsea', score: '3-1', btts: true, isHome: false }
        ]
      },
      awayTeam: {
        id: 'ipsw',
        name: 'Ipswich Town',
        shortName: 'IPS',
        logo: 'https://media.api-sports.io/football/teams/65.png',
        primaryColor: '#004f9e',
        scoringStreak: 6,
        concedingStreak: 8,
        avgGoalsScored: 1.5,
        avgGoalsConceded: 2.0,
        recentMatches: [
          { opponent: 'Liverpool', score: '0-2', btts: false, isHome: true }
        ]
      },
      h2h: [
        { date: '2024-08-24', score: '4-1', btts: true }
      ],
      kalshiTicker: 'kxeplgame-26aug24mciips',
      bookmakerBTTSOdds: { yes: 1.82, no: 1.95 }
    },
    {
      id: 'gw2-laliga-1',
      gameweek: 'gw2',
      gameweekName: 'Gameweek 2',
      date: dayAfterStr,
      exactDateStr: '2026-08-20',
      time: '20:30 UTC',
      status: 'SCHEDULED',
      leagueId: 'laliga',
      leagueName: 'La Liga',
      homeTeam: {
        id: 'rma',
        name: 'Real Madrid',
        shortName: 'RMA',
        logo: 'https://media.api-sports.io/football/teams/541.png',
        primaryColor: '#00529f',
        scoringStreak: 12,
        concedingStreak: 3,
        avgGoalsScored: 2.7,
        avgGoalsConceded: 1.0,
        recentMatches: [
          { opponent: 'Mallorca', score: '1-1', btts: true, isHome: false }
        ]
      },
      awayTeam: {
        id: 'esp',
        name: 'RCD Espanyol',
        shortName: 'ESP',
        logo: 'https://media.api-sports.io/football/teams/543.png',
        primaryColor: '#0072ce',
        scoringStreak: 6,
        concedingStreak: 6,
        avgGoalsScored: 1.4,
        avgGoalsConceded: 1.6,
        recentMatches: [
          { opponent: 'Valladolid', score: '0-1', btts: false, isHome: false }
        ]
      },
      h2h: [
        { date: '2024-09-21', score: '4-1', btts: true }
      ],
      kalshiTicker: 'kxlaligagame-26aug22esprma',
      bookmakerBTTSOdds: { yes: 1.70, no: 2.15 }
    }
  ];
}
