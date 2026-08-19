/**
 * Official Top 5 European Leagues Gameweek 1 Dataset Provider
 */

import { generateFixtures as getMockFixtures } from './mockDataGenerator';

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
