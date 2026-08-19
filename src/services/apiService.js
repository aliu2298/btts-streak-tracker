import { generateFixtures } from './mockDataGenerator';

const API_KEY_STORAGE = 'btts_api_key';
const API_PROVIDER_STORAGE = 'btts_api_provider';
const CACHE_PREFIX = 'btts_cache_';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

const API_BASE = 'https://api.football-data.org/v4';

/**
 * football-data.org's free tier allows 10 requests/minute. Enriching one
 * fixture costs up to 3 (two team-form calls + one head-to-head), so we spend
 * a bounded budget per load and report exactly what we could not cover.
 */
const REQUEST_BUDGET = 9;
const FORM_WINDOW = 10;

export function getStoredApiKey() {
  return safeStorage.get(API_KEY_STORAGE) || '';
}

export function saveApiKey(key, provider = 'football-data') {
  safeStorage.set(API_KEY_STORAGE, key);
  safeStorage.set(API_PROVIDER_STORAGE, provider);
}

export function clearApiKey() {
  safeStorage.remove(API_KEY_STORAGE);
  safeStorage.remove(API_PROVIDER_STORAGE);
}

/** localStorage is unavailable in private mode and in tests. */
const safeStorage = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
  remove(k) { try { localStorage.removeItem(k); } catch { /* ignore */ } }
};

function cacheGet(key) {
  const raw = safeStorage.get(CACHE_PREFIX + key);
  if (!raw) return null;
  try {
    const { at, value } = JSON.parse(raw);
    if (!at || Date.now() - at > CACHE_TTL_MS) return null;
    return value;
  } catch {
    return null;
  }
}

function cacheSet(key, value) {
  safeStorage.set(CACHE_PREFIX + key, JSON.stringify({ at: Date.now(), value }));
}

/**
 * Maps Football-Data.org competition codes to UI league filter IDs
 */
export function mapCompetitionToLeagueId(code) {
  if (!code) return 'all';
  const c = code.toUpperCase();
  switch (c) {
    case 'PL': return 'epl';
    case 'PD': return 'laliga';
    case 'SA': return 'seriea';
    case 'BL1': return 'bundesliga';
    case 'CL': return 'ucl';
    case 'MLS': return 'mls';
    default: return 'all';
  }
}

class ApiError extends Error {
  constructor(message, kind) {
    super(message);
    this.kind = kind; // 'auth' | 'rate-limit' | 'blocked' | 'http'
  }
}

async function apiGet(path, apiKey) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, { headers: { 'X-Auth-Token': apiKey } });
  } catch {
    // A network-level throw from fetch is almost always the browser refusing
    // the request: football-data.org does not send CORS headers, so a static
    // page cannot call it directly.
    throw new ApiError(
      'The browser blocked the request to football-data.org (no CORS headers). ' +
      'A static page cannot call this API directly - it needs a small proxy or server.',
      'blocked'
    );
  }
  if (res.status === 401 || res.status === 403) {
    throw new ApiError('football-data.org rejected the API token (401/403).', 'auth');
  }
  if (res.status === 429) {
    throw new ApiError('Hit the football-data.org rate limit (10 requests/minute on the free tier).', 'rate-limit');
  }
  if (!res.ok) {
    throw new ApiError(`football-data.org returned HTTP ${res.status}.`, 'http');
  }
  return res.json();
}

/* ------------------------------------------------------------------ *
 * Pure helpers - these turn provider responses into model inputs.
 * ------------------------------------------------------------------ */

function fullTime(match) {
  const ft = match?.score?.fullTime;
  if (!ft) return null;
  // The provider reports nulls for matches that have not been played.
  // Number(null) is 0, so coercing first would read an unplayed fixture as a
  // genuine 0-0 - and a 0-0 settles as BTTS NO.
  if (ft.home === null || ft.home === undefined || ft.away === null || ft.away === undefined) {
    return null;
  }
  const home = Number(ft.home);
  const away = Number(ft.away);
  if (!Number.isFinite(home) || !Number.isFinite(away)) return null;
  return { home, away };
}

/**
 * Derives real form for one team from its finished matches.
 * Returns null when there is nothing usable - callers must not invent stats.
 */
export function computeTeamForm(matches, teamId) {
  const played = (matches || [])
    .map(m => {
      const ft = fullTime(m);
      if (!ft) return null;
      const isHome = String(m.homeTeam?.id) === String(teamId);
      const isAway = String(m.awayTeam?.id) === String(teamId);
      if (!isHome && !isAway) return null;
      return {
        utcDate: m.utcDate,
        isHome,
        opponent: (isHome ? m.awayTeam : m.homeTeam)?.shortName
          || (isHome ? m.awayTeam : m.homeTeam)?.name
          || 'Unknown',
        goalsFor: isHome ? ft.home : ft.away,
        goalsAgainst: isHome ? ft.away : ft.home
      };
    })
    .filter(Boolean)
    .sort((a, b) => String(b.utcDate).localeCompare(String(a.utcDate)));

  if (played.length === 0) return null;

  let scoringStreak = 0;
  for (const m of played) {
    if (m.goalsFor > 0) scoringStreak++; else break;
  }
  let concedingStreak = 0;
  for (const m of played) {
    if (m.goalsAgainst > 0) concedingStreak++; else break;
  }

  const sum = (fn) => played.reduce((t, m) => t + fn(m), 0);

  return {
    matchesAnalysed: played.length,
    scoringStreak,
    concedingStreak,
    avgGoalsScored: Number((sum(m => m.goalsFor) / played.length).toFixed(2)),
    avgGoalsConceded: Number((sum(m => m.goalsAgainst) / played.length).toFixed(2)),
    recentMatches: played.slice(0, 5).map(m => ({
      opponent: m.opponent,
      score: `${m.goalsFor}-${m.goalsAgainst}`,
      btts: m.goalsFor > 0 && m.goalsAgainst > 0,
      isHome: m.isHome
    }))
  };
}

/** Turns head-to-head matches into the graded h2h list the model expects. */
export function computeH2H(matches) {
  return (matches || [])
    .map(m => {
      const ft = fullTime(m);
      if (!ft) return null;
      return {
        date: String(m.utcDate || '').split('T')[0],
        score: `${ft.home}-${ft.away}`,
        btts: ft.home > 0 && ft.away > 0
      };
    })
    .filter(Boolean);
}

/**
 * Base fixture shape from a provider match. Team stats are deliberately
 * absent here - they are only filled in from real observed results.
 */
export function toFixture(m) {
  const kickoff = new Date(m.utcDate);
  return {
    id: `api-${m.id}`,
    providerId: m.id,
    date: String(m.utcDate).split('T')[0],
    time: kickoff.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    status: m.status,
    finalScore: fullTime(m),
    leagueId: mapCompetitionToLeagueId(m.competition?.code),
    leagueName: m.competition?.name || 'International Soccer',
    homeTeam: {
      id: m.homeTeam?.id,
      name: m.homeTeam?.name || 'Home',
      shortName: m.homeTeam?.tla || (m.homeTeam?.name || 'HOM').substring(0, 3).toUpperCase(),
      logo: m.homeTeam?.crest || null,
      primaryColor: '#10b981'
    },
    awayTeam: {
      id: m.awayTeam?.id,
      name: m.awayTeam?.name || 'Away',
      shortName: m.awayTeam?.tla || (m.awayTeam?.name || 'AWY').substring(0, 3).toUpperCase(),
      logo: m.awayTeam?.crest || null,
      primaryColor: '#06b6d4'
    },
    h2h: [],
    bookmakerBTTSOdds: null
  };
}

/* ------------------------------------------------------------------ *
 * Fetching
 * ------------------------------------------------------------------ */

async function loadTeamForm(teamId, apiKey, budget) {
  const cacheKey = `form_${teamId}`;
  const cached = cacheGet(cacheKey);
  if (cached) return cached;
  if (budget.remaining <= 0) return null;

  budget.remaining--;
  const data = await apiGet(
    `/teams/${teamId}/matches?status=FINISHED&limit=${FORM_WINDOW}`, apiKey);
  const form = computeTeamForm(data?.matches, teamId);
  if (form) cacheSet(cacheKey, form);
  return form;
}

async function loadH2H(matchId, apiKey, budget) {
  const cacheKey = `h2h_${matchId}`;
  const cached = cacheGet(cacheKey);
  if (cached) return cached;
  if (budget.remaining <= 0) return null;

  budget.remaining--;
  const data = await apiGet(`/matches/${matchId}/head2head?limit=10`, apiKey);
  const h2h = computeH2H(data?.matches);
  cacheSet(cacheKey, h2h);
  return h2h;
}

/**
 * Fetch matches for the target date.
 *
 * Returns { fixtures, source, warnings }:
 *   source 'live' - real fixtures from football-data.org
 *   source 'demo' - the bundled demo dataset (no key, or the API was unusable)
 * `warnings` explains anything the caller should not silently assume away,
 * including fixtures left unenriched because the rate-limit budget ran out.
 */
export async function fetchMatches(dateStr) {
  const apiKey = getStoredApiKey();
  const warnings = [];

  if (!apiKey || apiKey.trim().length <= 5) {
    return { fixtures: demoFixtures(dateStr), source: 'demo', warnings };
  }

  let matches;
  try {
    const data = await apiGet(`/matches?dateFrom=${dateStr}&dateTo=${dateStr}`, apiKey.trim());
    matches = data?.matches || [];
  } catch (err) {
    warnings.push(err instanceof ApiError ? err.message : `Live fetch failed: ${err.message}`);
    warnings.push('Showing the bundled demo dataset instead.');
    return { fixtures: demoFixtures(dateStr), source: 'demo', warnings };
  }

  if (matches.length === 0) {
    warnings.push(`football-data.org has no matches on ${dateStr} for the competitions your token covers.`);
    return { fixtures: [], source: 'live', warnings };
  }

  const fixtures = matches.map(toFixture);
  const budget = { remaining: REQUEST_BUDGET };
  let enriched = 0;
  let stopped = null;

  // Pass 1: real team form (drives 70% of the model's weight).
  for (const fixture of fixtures) {
    if (stopped || budget.remaining <= 0) break;
    try {
      const [home, away] = [
        await loadTeamForm(fixture.homeTeam.id, apiKey, budget),
        await loadTeamForm(fixture.awayTeam.id, apiKey, budget)
      ];
      if (home) Object.assign(fixture.homeTeam, home);
      if (away) Object.assign(fixture.awayTeam, away);
      if (home && away) enriched++;
    } catch (err) {
      stopped = err instanceof ApiError ? err.message : err.message;
    }
  }

  // Pass 2: head-to-head for fixtures that already have both teams' form.
  for (const fixture of fixtures) {
    if (stopped || budget.remaining <= 0) break;
    if (!fixture.homeTeam.recentMatches || !fixture.awayTeam.recentMatches) continue;
    try {
      const h2h = await loadH2H(fixture.providerId, apiKey, budget);
      if (h2h) fixture.h2h = h2h;
    } catch (err) {
      stopped = err instanceof ApiError ? err.message : err.message;
    }
  }

  if (stopped) warnings.push(stopped);
  const unenriched = fixtures.length - enriched;
  if (unenriched > 0) {
    warnings.push(
      `${unenriched} of ${fixtures.length} fixtures have no form data yet ` +
      `(free tier allows 10 requests/minute; ${REQUEST_BUDGET} were budgeted for this load). ` +
      'They are listed but not scored. Refresh in a minute to fill in more - results are cached for 6 hours.'
    );
  }

  return { fixtures, source: 'live', warnings };
}

function demoFixtures() {
  return generateFixtures();
}
