import React from 'react';
import { GAMEWEEKS } from '../services/mockDataGenerator';
import { CalendarRange, Flame } from 'lucide-react';

export default function GameweekSelector({ selectedGameweek, onSelectGameweek, gameweekCounts = {} }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      overflowX: 'auto',
      padding: '0.75rem 1rem',
      marginBottom: '1.25rem',
      background: 'linear-gradient(135deg, rgba(18, 24, 38, 0.8), rgba(13, 17, 26, 0.8))',
      border: '1px solid var(--border-accent)',
      borderRadius: 'var(--radius-md)',
      boxShadow: '0 0 15px rgba(0, 245, 155, 0.1)',
      scrollbarWidth: 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingRight: '0.75rem', borderRight: '1px solid var(--border-subtle)' }}>
        <CalendarRange size={18} color="var(--accent-emerald)" />
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Schedule Focus
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'nowrap' }}>
        {GAMEWEEKS.map(gw => {
          const isSelected = selectedGameweek === gw.id;
          const count = gameweekCounts[gw.id] || 0;

          return (
            <button
              key={gw.id}
              onClick={() => onSelectGameweek(gw.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                background: isSelected ? 'var(--accent-emerald)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${isSelected ? 'var(--accent-emerald)' : 'var(--border-subtle)'}`,
                color: isSelected ? '#000' : 'var(--text-muted)',
                fontSize: '0.825rem',
                fontWeight: isSelected ? 800 : 600,
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 0 12px var(--accent-emerald-glow)' : 'none'
              }}
            >
              {gw.isCurrent && <Flame size={14} color={isSelected ? '#000' : 'var(--accent-emerald)'} />}
              <span>{gw.label}</span>
              <span style={{
                fontSize: '0.725rem',
                padding: '0.1rem 0.4rem',
                borderRadius: '9999px',
                background: isSelected ? '#000' : 'rgba(255, 255, 255, 0.1)',
                color: isSelected ? 'var(--accent-emerald)' : 'var(--text-dim)',
                fontWeight: 800
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
