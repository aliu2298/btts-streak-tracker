/**
 * Official Top 5 European Leagues Gameweek 1 Dataset Provider
 */

import { generateFixtures as getMockFixtures } from './mockDataGenerator';

export { toLocalDateStr, getFormattedDate, getDisplayDate, getAvailableDates } from './dates';

export const LEAGUES = [
  { id: 'all', name: 'All Top 5 Leagues', icon: '⚽' },
  { id: 'epl', name: 'Premier League', icon: '🦁' },
  { id: 'laliga', name: 'La Liga', icon: '🇪🇸' },
  { id: 'seriea', name: 'Serie A', icon: '🇮🇹' },
  { id: 'bundesliga', name: 'Bundesliga', icon: '🇩🇪' },
  { id: 'ligue1', name: 'Ligue 1', icon: '🇫🇷' },
  { id: 'ucl', name: 'Champions League', icon: '🏆' }
];

export function getDemoFixtures() {
  return getMockFixtures();
}
