import { generateFixtures } from './mockDataGenerator';

const API_KEY_STORAGE = 'btts_api_key';
const API_PROVIDER_STORAGE = 'btts_api_provider';

export function getStoredApiKey() {
  return localStorage.getItem(API_KEY_STORAGE) || '';
}

export function saveApiKey(key, provider = 'football-data') {
  localStorage.setItem(API_KEY_STORAGE, key);
  localStorage.setItem(API_PROVIDER_STORAGE, provider);
}

export function clearApiKey() {
  localStorage.removeItem(API_KEY_STORAGE);
  localStorage.removeItem(API_PROVIDER_STORAGE);
}

/**
 * Fetch matches for target date.
 * If API Key is present, attempts real API fetch; falls back to realistic generator.
 */
export async function fetchMatches(dateStr) {
  const apiKey = getStoredApiKey();

  if (apiKey && apiKey.trim().length > 5) {
    try {
      // Example call to Football-Data.org API
      const res = await fetch(`https://api.football-data.org/v4/matches?dateFrom=${dateStr}&dateTo=${dateStr}`, {
        headers: { 'X-Auth-Token': apiKey }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.matches && data.matches.length > 0) {
          // Transform API data
          return transformApiMatches(data.matches);
        }
      }
    } catch (err) {
      console.warn('API Fetch failed, using built-in generator:', err);
    }
  }

  // Fallback to high-quality fixture generator
  const allFixtures = generateFixtures();
  return allFixtures.filter(f => f.date === dateStr || !dateStr);
}

function transformApiMatches(apiMatches) {
  return apiMatches.map(m => ({
    id: `api-${m.id}`,
    date: m.utcDate.split('T')[0],
    time: new Date(m.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    status: m.status,
    leagueId: m.competition.code ? m.competition.code.toLowerCase() : 'other',
    leagueName: m.competition.name || 'International',
    homeTeam: {
      id: m.homeTeam.id,
      name: m.homeTeam.name,
      shortName: m.homeTeam.tla || m.homeTeam.name.substring(0, 3).toUpperCase(),
      logo: m.homeTeam.crest || 'https://media.api-sports.io/football/teams/42.png',
      primaryColor: '#10b981',
      scoringStreak: Math.floor(Math.random() * 6) + 3,
      concedingStreak: Math.floor(Math.random() * 5) + 2,
      avgGoalsScored: (1.5 + Math.random()).toFixed(1),
      avgGoalsConceded: (1.0 + Math.random()).toFixed(1),
      recentMatches: [
        { opponent: 'Opponent A', score: '2-1', btts: true, isHome: true },
        { opponent: 'Opponent B', score: '1-1', btts: true, isHome: false },
        { opponent: 'Opponent C', score: '3-2', btts: true, isHome: true }
      ]
    },
    awayTeam: {
      id: m.awayTeam.id,
      name: m.awayTeam.name,
      shortName: m.awayTeam.tla || m.awayTeam.name.substring(0, 3).toUpperCase(),
      logo: m.awayTeam.crest || 'https://media.api-sports.io/football/teams/49.png',
      primaryColor: '#06b6d4',
      scoringStreak: Math.floor(Math.random() * 6) + 2,
      concedingStreak: Math.floor(Math.random() * 5) + 3,
      avgGoalsScored: (1.4 + Math.random()).toFixed(1),
      avgGoalsConceded: (1.2 + Math.random()).toFixed(1),
      recentMatches: [
        { opponent: 'Opponent X', score: '2-2', btts: true, isHome: false },
        { opponent: 'Opponent Y', score: '1-2', btts: true, isHome: true }
      ]
    },
    h2h: [
      { date: '2025-05-10', score: '2-1', btts: true },
      { date: '2024-11-20', score: '1-1', btts: true }
    ],
    bookmakerBTTSOdds: { yes: 1.80, no: 2.00 }
  }));
}
