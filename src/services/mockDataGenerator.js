/**
 * Realistic Next-Day Soccer Fixtures & Goal Streak Data Generator
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

export function generateFixtures() {
  const todayStr = getFormattedDate(0);
  const tomorrowStr = getFormattedDate(1);
  const dayAfterStr = getFormattedDate(2);

  const rawFixtures = [
    // --- TOMORROW MATCHES (HIGH PRIORITY) ---
    {
      id: 'fix-1',
      date: tomorrowStr,
      time: '19:45',
      status: 'SCHEDULED',
      leagueId: 'epl',
      leagueName: 'English Premier League',
      homeTeam: {
        id: 'ars',
        name: 'Arsenal',
        shortName: 'ARS',
        logo: 'https://media.api-sports.io/football/teams/42.png',
        primaryColor: '#ef0107',
        scoringStreak: 8,
        concedingStreak: 4,
        avgGoalsScored: 2.4,
        avgGoalsConceded: 1.2,
        recentMatches: [
          { opponent: 'Chelsea', score: '3-1', btts: true, isHome: true },
          { opponent: 'Liverpool', score: '2-2', btts: true, isHome: false },
          { opponent: 'West Ham', score: '4-1', btts: true, isHome: true },
          { opponent: 'Spurs', score: '2-1', btts: true, isHome: false },
          { opponent: 'Newcastle', score: '1-1', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'che',
        name: 'Chelsea',
        shortName: 'CHE',
        logo: 'https://media.api-sports.io/football/teams/49.png',
        primaryColor: '#034694',
        scoringStreak: 6,
        concedingStreak: 5,
        avgGoalsScored: 2.1,
        avgGoalsConceded: 1.5,
        recentMatches: [
          { opponent: 'Aston Villa', score: '2-2', btts: true, isHome: false },
          { opponent: 'Man City', score: '1-3', btts: true, isHome: true },
          { opponent: 'Fulham', score: '3-1', btts: true, isHome: false },
          { opponent: 'Brighton', score: '2-1', btts: true, isHome: true },
          { opponent: 'Wolves', score: '1-1', btts: true, isHome: false }
        ]
      },
      h2h: [
        { date: '2025-11-10', score: '2-2', btts: true },
        { date: '2025-04-23', score: '3-1', btts: true },
        { date: '2024-10-21', score: '2-1', btts: true },
        { date: '2024-03-16', score: '5-0', btts: false }
      ],
      bookmakerBTTSOdds: { yes: 1.75, no: 2.10 }
    },
    {
      id: 'fix-2',
      date: tomorrowStr,
      time: '20:00',
      status: 'SCHEDULED',
      leagueId: 'bundesliga',
      leagueName: 'Bundesliga',
      homeTeam: {
        id: 'bayer',
        name: 'Bayer Leverkusen',
        shortName: 'LEV',
        logo: 'https://media.api-sports.io/football/teams/168.png',
        primaryColor: '#e32219',
        scoringStreak: 12,
        concedingStreak: 6,
        avgGoalsScored: 2.8,
        avgGoalsConceded: 1.4,
        recentMatches: [
          { opponent: 'Dortmund', score: '3-2', btts: true, isHome: true },
          { opponent: 'RB Leipzig', score: '2-2', btts: true, isHome: false },
          { opponent: 'Eintracht', score: '4-1', btts: true, isHome: true },
          { opponent: 'Stuttgart', score: '3-3', btts: true, isHome: false },
          { opponent: 'Hoffenheim', score: '2-1', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'bvb',
        name: 'Borussia Dortmund',
        shortName: 'BVB',
        logo: 'https://media.api-sports.io/football/teams/165.png',
        primaryColor: '#fde100',
        scoringStreak: 9,
        concedingStreak: 7,
        avgGoalsScored: 2.5,
        avgGoalsConceded: 1.6,
        recentMatches: [
          { opponent: 'Bayern', score: '2-2', btts: true, isHome: true },
          { opponent: 'Mgladbach', score: '3-1', btts: true, isHome: false },
          { opponent: 'Wolfsburg', score: '2-1', btts: true, isHome: true },
          { opponent: 'Freiburg', score: '4-2', btts: true, isHome: false },
          { opponent: 'Union Berlin', score: '1-1', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-12-03', score: '3-2', btts: true },
        { date: '2025-04-21', score: '1-1', btts: true },
        { date: '2024-12-03', score: '2-2', btts: true },
        { date: '2024-04-21', score: '1-1', btts: true }
      ],
      bookmakerBTTSOdds: { yes: 1.57, no: 2.35 }
    },
    {
      id: 'fix-3',
      date: tomorrowStr,
      time: '20:30',
      status: 'SCHEDULED',
      leagueId: 'laliga',
      leagueName: 'La Liga',
      homeTeam: {
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
          { opponent: 'Sevilla', score: '3-1', btts: true, isHome: false },
          { opponent: 'Athletic', score: '2-0', btts: false, isHome: true },
          { opponent: 'Valencia', score: '4-1', btts: true, isHome: false },
          { opponent: 'Betis', score: '2-1', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'vil',
        name: 'Villarreal',
        shortName: 'VIL',
        logo: 'https://media.api-sports.io/football/teams/533.png',
        primaryColor: '#ffe600',
        scoringStreak: 7,
        concedingStreak: 8,
        avgGoalsScored: 1.9,
        avgGoalsConceded: 1.7,
        recentMatches: [
          { opponent: 'Sociedad', score: '2-2', btts: true, isHome: true },
          { opponent: 'Girona', score: '3-2', btts: true, isHome: false },
          { opponent: 'Getafe', score: '1-1', btts: true, isHome: true },
          { opponent: 'Mallorca', score: '2-1', btts: true, isHome: false },
          { opponent: 'Osasuna', score: '4-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-10-05', score: '2-1', btts: true },
        { date: '2025-05-19', score: '4-4', btts: true },
        { date: '2024-12-17', score: '4-1', btts: true }
      ],
      kalshiTicker: 'kxlaligagame-26aug22esprma',
      bookmakerBTTSOdds: { yes: 1.62, no: 2.20 }
    },
    {
      id: 'fix-4',
      date: tomorrowStr,
      time: '19:00',
      status: 'SCHEDULED',
      leagueId: 'seriea',
      leagueName: 'Serie A',
      homeTeam: {
        id: 'nap',
        name: 'Napoli',
        shortName: 'NAP',
        logo: 'https://media.api-sports.io/football/teams/492.png',
        primaryColor: '#008fd7',
        scoringStreak: 5,
        concedingStreak: 2,
        avgGoalsScored: 1.8,
        avgGoalsConceded: 0.9,
        recentMatches: [
          { opponent: 'Lazio', score: '2-1', btts: true, isHome: true },
          { opponent: 'Torino', score: '1-0', btts: false, isHome: false },
          { opponent: 'Fiorentina', score: '2-1', btts: true, isHome: true },
          { opponent: 'Atalanta', score: '0-1', btts: false, isHome: false },
          { opponent: 'Monza', score: '2-0', btts: false, isHome: true }
        ]
      },
      awayTeam: {
        id: 'ata',
        name: 'Atalanta',
        shortName: 'ATA',
        logo: 'https://media.api-sports.io/football/teams/499.png',
        primaryColor: '#0054a6',
        scoringStreak: 10,
        concedingStreak: 5,
        avgGoalsScored: 2.2,
        avgGoalsConceded: 1.3,
        recentMatches: [
          { opponent: 'Juventus', score: '2-2', btts: true, isHome: true },
          { opponent: 'Roma', score: '2-1', btts: true, isHome: false },
          { opponent: 'Bologna', score: '3-1', btts: true, isHome: true },
          { opponent: 'Milan', score: '1-1', btts: true, isHome: false },
          { opponent: 'Udinese', score: '2-1', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-11-03', score: '0-3', btts: false },
        { date: '2025-03-30', score: '0-3', btts: false },
        { date: '2024-11-25', score: '2-1', btts: true }
      ],
      bookmakerBTTSOdds: { yes: 1.95, no: 1.85 }
    },
    {
      id: 'fix-5',
      date: tomorrowStr,
      time: '20:00',
      status: 'SCHEDULED',
      leagueId: 'ucl',
      leagueName: 'UEFA Champions League',
      homeTeam: {
        id: 'psg',
        name: 'Paris Saint-Germain',
        shortName: 'PSG',
        logo: 'https://media.api-sports.io/football/teams/85.png',
        primaryColor: '#001c58',
        scoringStreak: 14,
        concedingStreak: 7,
        avgGoalsScored: 2.9,
        avgGoalsConceded: 1.3,
        recentMatches: [
          { opponent: 'Inter', score: '3-2', btts: true, isHome: true },
          { opponent: 'Monaco', score: '2-1', btts: true, isHome: false },
          { opponent: 'Lille', score: '4-1', btts: true, isHome: true },
          { opponent: 'Barca', score: '2-3', btts: true, isHome: false },
          { opponent: 'Marseille', score: '3-1', btts: true, isHome: true }
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
          { opponent: 'Sociedad', score: '2-2', btts: true, isHome: false },
          { opponent: 'Bayern', score: '4-1', btts: true, isHome: true },
          { opponent: 'Espanyol', score: '3-1', btts: true, isHome: false },
          { opponent: 'Benfica', score: '2-1', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2024-04-16', score: '1-4', btts: true },
        { date: '2024-04-10', score: '2-3', btts: true },
        { date: '2021-03-10', score: '1-1', btts: true }
      ],
      bookmakerBTTSOdds: { yes: 1.48, no: 2.60 }
    },
    {
      id: 'fix-6',
      date: tomorrowStr,
      time: '21:00',
      status: 'SCHEDULED',
      leagueId: 'mls',
      leagueName: 'MLS',
      homeTeam: {
        id: 'mia',
        name: 'Inter Miami',
        shortName: 'MIA',
        logo: 'https://media.api-sports.io/football/teams/14603.png',
        primaryColor: '#f7b5cd',
        scoringStreak: 10,
        concedingStreak: 9,
        avgGoalsScored: 2.6,
        avgGoalsConceded: 1.8,
        recentMatches: [
          { opponent: 'LA Galaxy', score: '3-2', btts: true, isHome: true },
          { opponent: 'Atlanta', score: '2-2', btts: true, isHome: false },
          { opponent: 'Orlando', score: '4-2', btts: true, isHome: true },
          { opponent: 'NYCFC', score: '1-1', btts: true, isHome: false },
          { opponent: 'Columbus', score: '3-2', btts: true, isHome: true }
        ]
      },
      awayTeam: {
        id: 'lag',
        name: 'LA Galaxy',
        shortName: 'LAG',
        logo: 'https://media.api-sports.io/football/teams/1601.png',
        primaryColor: '#00245d',
        scoringStreak: 8,
        concedingStreak: 8,
        avgGoalsScored: 2.3,
        avgGoalsConceded: 1.9,
        recentMatches: [
          { opponent: 'Seattle', score: '2-2', btts: true, isHome: true },
          { opponent: 'LAFC', score: '4-2', btts: true, isHome: false },
          { opponent: 'Portland', score: '3-3', btts: true, isHome: true },
          { opponent: 'Dallas', score: '2-1', btts: true, isHome: false },
          { opponent: 'San Jose', score: '3-1', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-02-25', score: '1-1', btts: true },
        { date: '2024-06-03', score: '3-2', btts: true }
      ],
      bookmakerBTTSOdds: { yes: 1.42, no: 2.75 }
    },

    // --- TODAY MATCHES ---
    {
      id: 'fix-7',
      date: todayStr,
      time: '18:30',
      status: 'SCHEDULED',
      leagueId: 'epl',
      leagueName: 'English Premier League',
      homeTeam: {
        id: 'mci',
        name: 'Manchester City',
        shortName: 'MCI',
        logo: 'https://media.api-sports.io/football/teams/50.png',
        primaryColor: '#6cabdd',
        scoringStreak: 12,
        concedingStreak: 4,
        avgGoalsScored: 2.5,
        avgGoalsConceded: 1.1,
        recentMatches: [
          { opponent: 'Liverpool', score: '1-1', btts: true, isHome: true },
          { opponent: 'Brighton', score: '2-1', btts: true, isHome: false }
        ]
      },
      awayTeam: {
        id: 'liv',
        name: 'Liverpool',
        shortName: 'LIV',
        logo: 'https://media.api-sports.io/football/teams/40.png',
        primaryColor: '#c8102e',
        scoringStreak: 10,
        concedingStreak: 5,
        avgGoalsScored: 2.4,
        avgGoalsConceded: 1.3,
        recentMatches: [
          { opponent: 'Man City', score: '1-1', btts: true, isHome: false },
          { opponent: 'Aston Villa', score: '2-2', btts: true, isHome: true }
        ]
      },
      h2h: [
        { date: '2025-12-01', score: '2-2', btts: true }
      ],
      bookmakerBTTSOdds: { yes: 1.55, no: 2.40 }
    },

    // --- DAY AFTER MATCHES ---
    {
      id: 'fix-8',
      date: dayAfterStr,
      time: '19:45',
      status: 'SCHEDULED',
      leagueId: 'seriea',
      leagueName: 'Serie A',
      homeTeam: {
        id: 'int',
        name: 'Inter Milan',
        shortName: 'INT',
        logo: 'https://media.api-sports.io/football/teams/505.png',
        primaryColor: '#0066b2',
        scoringStreak: 9,
        concedingStreak: 2,
        avgGoalsScored: 2.3,
        avgGoalsConceded: 0.8,
        recentMatches: [
          { opponent: 'Milan', score: '2-0', btts: false, isHome: true },
          { opponent: 'Roma', score: '1-0', btts: false, isHome: false }
        ]
      },
      awayTeam: {
        id: 'juv',
        name: 'Juventus',
        shortName: 'JUV',
        logo: 'https://media.api-sports.io/football/teams/496.png',
        primaryColor: '#000000',
        scoringStreak: 6,
        concedingStreak: 3,
        avgGoalsScored: 1.7,
        avgGoalsConceded: 0.9,
        recentMatches: [
          { opponent: 'Lazio', score: '1-1', btts: true, isHome: true },
          { opponent: 'Napoli', score: '0-0', btts: false, isHome: false }
        ]
      },
      h2h: [
        { date: '2025-10-27', score: '4-4', btts: true }
      ],
      bookmakerBTTSOdds: { yes: 1.90, no: 1.90 }
    }
  ];

  return rawFixtures;
}
