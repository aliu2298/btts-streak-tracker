import React from 'react';
import { Flame, Calendar, Search, Github, Key, Sparkles, Filter } from 'lucide-react';
import { getAvailableDates } from '../services/demoData';

export default function Header({ 
  selectedDate, 
  onSelectDate, 
  searchQuery, 
  onSearchChange,
  highBttsOnly,
  onToggleHighBtts,
  onOpenGitHubModal,
  onOpenApiModal,
  dataSource
}) {
  const isLive = dataSource === 'live';
  const dates = getAvailableDates();

  return (
    <header className="glass-panel" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Top Bar: Title & Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(0,245,155,0.2), rgba(0,240,255,0.2))',
              border: '1px solid var(--accent-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0,245,155,0.25)'
            }}>
              <Flame size={24} color="var(--accent-emerald)" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  BTTS <span style={{ color: 'var(--accent-emerald)' }}>StreakTracker</span>
                </h1>
                <span className="badge-hot" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>v1.0</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Next-Day Soccer Goal Streak Analytics & BTTS Probability Engine
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenApiModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: isLive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.12)',
                border: `1px solid ${isLive ? 'var(--accent-emerald)' : 'var(--accent-amber)'}`,
                color: isLive ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              <Key size={16} />
              {isLive ? 'Live data' : 'Demo data'}
            </button>

            <button
              onClick={onOpenGitHubModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, rgba(0, 245, 155, 0.15), rgba(0, 240, 255, 0.15))',
                border: '1px solid rgba(0, 245, 155, 0.4)',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                fontWeight: 700,
                transition: 'all 0.2s',
                boxShadow: '0 0 15px rgba(0, 245, 155, 0.15)'
              }}
            >
              <Github size={18} color="var(--accent-emerald)" />
              Host on GitHub Pages
            </button>
          </div>
        </div>

        {/* Bottom Bar: Date Selector, Search & Filter Toggles */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          {/* Date Selector Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 0, 0, 0.25)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
            {dates.map(d => {
              const isSelected = selectedDate === d.dateStr;
              return (
                <button
                  key={d.key}
                  onClick={() => onSelectDate(d.dateStr)}
                  style={{
                    padding: '0.45rem 0.9rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.825rem',
                    fontWeight: isSelected ? 700 : 500,
                    background: isSelected ? 'var(--accent-emerald)' : 'transparent',
                    color: isSelected ? '#000' : 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Calendar size={14} />
                  {d.label}
                  <span style={{ opacity: isSelected ? 0.85 : 0.6, fontSize: '0.75rem' }}>({d.display})</span>
                </button>
              );
            })}
          </div>

          {/* Search Input & High BTTS Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexGrow: 1, maxWidth: '480px' }}>
            <div style={{ position: 'relative', flexGrow: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="text"
                placeholder="Search team, league, or fixture..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem 0.5rem 2.4rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  color: 'var(--text-main)',
                  outline: 'none'
                }}
              />
            </div>

            <button
              onClick={onToggleHighBtts}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: highBttsOnly ? 'rgba(0, 245, 155, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${highBttsOnly ? 'var(--accent-emerald)' : 'var(--border-subtle)'}`,
                color: highBttsOnly ? 'var(--accent-emerald)' : 'var(--text-muted)',
                fontSize: '0.825rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              <Sparkles size={15} color={highBttsOnly ? 'var(--accent-emerald)' : 'var(--text-muted)'} />
              70%+ BTTS Only
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}
