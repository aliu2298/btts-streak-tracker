import React from 'react';
import { Flame, ChevronRight, ShieldAlert, Target, Award } from 'lucide-react';
import { calculateBTTSMetrics } from '../utils/bttsAlgorithm';

export default function FixtureCard({ fixture, onSelectFixture }) {
  const metrics = calculateBTTSMetrics(fixture);
  const { homeTeam, awayTeam } = fixture;

  return (
    <div className="glass-panel" style={{
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
      gap: '1.25rem',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.2s ease, border-color 0.2s ease',
      borderLeft: `4px solid ${metrics.tierColor}`
    }}>
      
      {/* Top Bar: League & Kickoff Time */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {fixture.leagueName}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className={`badge-${metrics.tier.toLowerCase()}`}>
            {metrics.badgeText}
          </span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', background: 'rgba(0,0,0,0.3)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
            ⏰ {fixture.time}
          </span>
        </div>
      </div>

      {/* Main Teams & Score Display */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '1rem' }}>
        
        {/* Home Team */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textCenter: 'center', gap: '0.5rem' }}>
          <img 
            src={homeTeam.logo} 
            alt={homeTeam.name} 
            style={{ width: '48px', height: '48px', objectFit: 'contain', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} 
            onError={(e) => { e.target.src = 'https://media.api-sports.io/football/teams/42.png'; }}
          />
          <span style={{ fontWeight: 800, fontSize: '1rem', textAlign: 'center', color: 'var(--text-main)' }}>
            {homeTeam.name}
          </span>
          
          {/* Home Team Streaks */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.3rem' }}>
            {metrics.homeScoreStreak >= 2 && (
              <span className="streak-pill home-streak">
                <Target size={12} /> Scored {metrics.homeScoreStreak} in a row
              </span>
            )}
            {metrics.homeConcedeStreak >= 2 && (
              <span className="streak-pill away-streak">
                <ShieldAlert size={12} /> Conceded {metrics.homeConcedeStreak} in a row
              </span>
            )}
          </div>
        </div>

        {/* Center BTTS Score Display */}
        <div className="btts-score-display">
          <div className={`score-circle tier-${metrics.tier}`}>
            {metrics.score}%
          </div>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: metrics.tierColor, marginTop: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {metrics.tierLabel}
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.1rem' }}>
            Fair Odds: {metrics.fairOdds}
          </span>
        </div>

        {/* Away Team */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textCenter: 'center', gap: '0.5rem' }}>
          <img 
            src={awayTeam.logo} 
            alt={awayTeam.name} 
            style={{ width: '48px', height: '48px', objectFit: 'contain', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} 
            onError={(e) => { e.target.src = 'https://media.api-sports.io/football/teams/49.png'; }}
          />
          <span style={{ fontWeight: 800, fontSize: '1rem', textAlign: 'center', color: 'var(--text-main)' }}>
            {awayTeam.name}
          </span>

          {/* Away Team Streaks */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.3rem' }}>
            {metrics.awayScoreStreak >= 2 && (
              <span className="streak-pill home-streak">
                <Target size={12} /> Scored {metrics.awayScoreStreak} in a row
              </span>
            )}
            {metrics.awayConcedeStreak >= 2 && (
              <span className="streak-pill away-streak">
                <ShieldAlert size={12} /> Conceded {metrics.awayConcedeStreak} in a row
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Key Insights Preview */}
      <div style={{
        background: 'rgba(0,0,0,0.25)',
        padding: '0.75rem 1rem',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-subtle)',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <Flame size={15} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {metrics.insights[0]}
        </span>
      </div>

      {/* Card Action Button */}
      <button
        onClick={() => onSelectFixture(fixture)}
        style={{
          width: '100%',
          padding: '0.7rem',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-main)',
          fontSize: '0.85rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-emerald)';
          e.currentTarget.style.color = 'var(--accent-emerald)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-subtle)';
          e.currentTarget.style.color = 'var(--text-main)';
        }}
      >
        <span>Analyze Streak Breakdown & Value</span>
        <ChevronRight size={16} />
      </button>

    </div>
  );
}
