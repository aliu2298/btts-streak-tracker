import React from 'react';
import { LEAGUES } from '../services/mockDataGenerator';

export default function LeagueFilter({ selectedLeague, onSelectLeague, leagueCounts = {} }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      overflowX: 'auto',
      paddingBottom: '0.5rem',
      marginBottom: '1.5rem',
      scrollbarWidth: 'thin'
    }}>
      {LEAGUES.map(league => {
        const isSelected = selectedLeague === league.id;
        const count = league.id === 'all' 
          ? Object.values(leagueCounts).reduce((a, b) => a + b, 0)
          : (leagueCounts[league.id] || 0);

        return (
          <button
            key={league.id}
            onClick={() => onSelectLeague(league.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: isSelected 
                ? 'linear-gradient(135deg, rgba(0, 245, 155, 0.2), rgba(0, 240, 255, 0.2))' 
                : 'rgba(18, 24, 38, 0.75)',
              border: `1px solid ${isSelected ? 'var(--accent-emerald)' : 'var(--border-subtle)'}`,
              color: isSelected ? 'var(--text-main)' : 'var(--text-muted)',
              fontSize: '0.85rem',
              fontWeight: isSelected ? 700 : 500,
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
              boxShadow: isSelected ? '0 0 12px rgba(0, 245, 155, 0.2)' : 'none'
            }}
          >
            <span style={{ fontSize: '1rem' }}>{league.icon}</span>
            <span>{league.name}</span>
            <span style={{
              fontSize: '0.75rem',
              padding: '0.1rem 0.45rem',
              borderRadius: '9999px',
              background: isSelected ? 'var(--accent-emerald)' : 'rgba(255, 255, 255, 0.08)',
              color: isSelected ? '#000' : 'var(--text-dim)',
              fontWeight: 700
            }}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
