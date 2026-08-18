import React from 'react';
import { Flame, Trophy, TrendingUp, Zap } from 'lucide-react';

export default function StatsBanner({ fixtures = [], metricsList = [] }) {
  const totalFixtures = fixtures.length;
  
  // Highest BTTS Candidate
  let topPick = null;
  let topScore = 0;
  let highStreakCount = 0;
  let totalScoreSum = 0;

  metricsList.forEach(({ fixture, metrics }) => {
    totalScoreSum += metrics.score;
    if (metrics.score > topScore) {
      topScore = metrics.score;
      topPick = { fixture, metrics };
    }
    if (metrics.homeScoreStreak >= 5 || metrics.awayScoreStreak >= 5 || metrics.homeConcedeStreak >= 5 || metrics.awayConcedeStreak >= 5) {
      highStreakCount++;
    }
  });

  const avgBtts = totalFixtures > 0 ? Math.round(totalScoreSum / totalFixtures) : 0;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem'
    }}>
      
      {/* Total Fixtures */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(0, 240, 255, 0.1)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Trophy size={24} color="var(--accent-cyan)" />
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Scheduled Fixtures
          </span>
          <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {totalFixtures} Matches
          </span>
        </div>
      </div>

      {/* Top Hot Pick */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(0, 245, 155, 0.12)',
          border: '1px solid var(--accent-emerald)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(0, 245, 155, 0.2)'
        }}>
          <Flame size={24} color="var(--accent-emerald)" />
        </div>
        <div style={{ flexGrow: 1, minWidth: 0 }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Top BTTS Pick
          </span>
          {topPick ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-emerald)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {topPick.fixture.homeTeam.shortName} vs {topPick.fixture.awayTeam.shortName}
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, background: 'rgba(0,245,155,0.2)', padding: '0.1rem 0.4rem', borderRadius: '4px', color: 'var(--accent-emerald)' }}>
                {topPick.metrics.score}%
              </span>
            </div>
          ) : (
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>N/A</span>
          )}
        </div>
      </div>

      {/* Avg BTTS Score */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TrendingUp size={24} color="var(--accent-amber)" />
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Average BTTS Score
          </span>
          <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {avgBtts}%
          </span>
        </div>
      </div>

      {/* Active High-Streak Teams */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Zap size={24} color="var(--accent-rose)" />
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            High-Streak Matches (5+ G)
          </span>
          <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {highStreakCount}
          </span>
        </div>
      </div>

    </div>
  );
}
