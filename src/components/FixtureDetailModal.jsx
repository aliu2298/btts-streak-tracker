import React, { useState } from 'react';
import { X, Flame, ShieldAlert, Award, Calculator, TrendingUp, CheckCircle, AlertTriangle, Layers, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { calculateValue, getKalshiUrl } from '../utils/bttsAlgorithm';

export default function FixtureDetailModal({ fixture, metrics, onClose }) {
  if (!fixture || !metrics) return null;

  const { homeTeam, awayTeam, h2h = [] } = fixture;
  const hasScore = metrics.score !== null;
  const pct = (v) => (v === null || v === undefined ? '—' : `${v}%`);

  const kalshiMarketUrl = getKalshiUrl(fixture);

  // Bookmaker odds state
  const defaultOdds = fixture.bookmakerBTTSOdds ? fixture.bookmakerBTTSOdds.yes : '';
  const [userOdds, setUserOdds] = useState(defaultOdds);
  
  const valueResult = calculateValue(metrics.score, parseFloat(userOdds));

  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f59b', '#00f0ff', '#f59e0b']
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0,0,0,0.2)'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              {fixture.leagueName} • Kick-off {fixture.time}
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {homeTeam.name} vs {awayTeam.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Top BTTS Summary Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(18, 24, 38, 0.9), rgba(13, 17, 26, 0.9))',
            border: `1px solid ${metrics.tierColor}`,
            boxShadow: `0 0 25px ${metrics.tierColor}20`,
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div>
              <span className={`badge-${metrics.tier.toLowerCase()}`} style={{ marginBottom: '0.5rem' }}>
                {metrics.badgeText}
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {hasScore ? `${metrics.score}% BTTS Probability` : 'Not enough data to score'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {hasScore
                  ? <>Fair Market Odds: <strong style={{ color: 'var(--text-main)' }}>{metrics.fairOdds}</strong></>
                  : metrics.dataNote}
              </p>
            </div>
            
            <div className={`score-circle tier-${metrics.tier}`} style={{ width: '80px', height: '80px', fontSize: '1.5rem' }}>
              {hasScore ? `${metrics.score}%` : '—'}
            </div>
          </div>

          {/* Kalshi Direct Market Link Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.12), rgba(0, 245, 155, 0.08))',
            border: '1px solid var(--accent-cyan)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            boxShadow: '0 0 15px rgba(0, 240, 255, 0.15)'
          }}>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <TrendingUp size={18} /> Trade this match on Kalshi Prediction Markets
              </span>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                View live orderbooks and market prices for {homeTeam.name} vs {awayTeam.name}
              </p>
            </div>

            <a
              href={kalshiMarketUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-cyan)',
                color: '#000',
                fontWeight: 800,
                fontSize: '0.85rem',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 0 12px rgba(0, 240, 255, 0.3)'
              }}
            >
              <span>View on Kalshi</span>
              <ExternalLink size={15} />
            </a>
          </div>

          {/* Component Score Breakdown */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={16} color="var(--accent-emerald)" />
              BTTS Rating Factors Breakdown
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
              
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Streak Synergy (40%)</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{pct(metrics.components.streakSynergy)}</span>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Recent Form (30%)</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{pct(metrics.components.recentForm)}</span>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>H2H History (15%)</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-amber)' }}>{pct(metrics.components.h2h)}</span>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Expected Goal (15%)</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>{pct(metrics.components.expectedGoal)}</span>
              </div>

            </div>
          </div>

          {/* Key Insights List */}
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Flame size={16} color="var(--accent-emerald)" />
              Streak & Form Insights
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-main)' }}>
              {metrics.insights.map((insight, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--accent-emerald)' }}>•</span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>

          {/* Side by Side Recent Form Matrix */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            
            {/* Home Form */}
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {homeTeam.name} (Recent)
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {(homeTeam.recentMatches || []).map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>vs {m.opponent}</span>
                    <span style={{ fontWeight: 700, color: m.btts ? 'var(--accent-emerald)' : 'var(--text-dim)' }}>
                      {m.score} {m.btts ? '(BTTS YES)' : '(NO)'}
                    </span>
                  </div>
                ))}
                {(homeTeam.recentMatches || []).length === 0 && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                    No recent results available.
                  </span>
                )}
              </div>
            </div>

            {/* Away Form */}
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {awayTeam.name} (Recent)
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {(awayTeam.recentMatches || []).map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>vs {m.opponent}</span>
                    <span style={{ fontWeight: 700, color: m.btts ? 'var(--accent-emerald)' : 'var(--text-dim)' }}>
                      {m.score} {m.btts ? '(BTTS YES)' : '(NO)'}
                    </span>
                  </div>
                ))}
                {(awayTeam.recentMatches || []).length === 0 && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                    No recent results available.
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Interactive Odds & Value Calculator */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0,240,255,0.08), rgba(0,245,155,0.08))',
            border: '1px solid rgba(0,240,255,0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem'
          }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calculator size={18} />
              Bookmaker / Kalshi Odds Value Calculator
            </h4>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flexGrow: 1 }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  Enter Odds / Implied Price for BTTS YES:
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1.85"
                  value={userOdds}
                  onChange={(e) => setUserOdds(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-main)',
                    fontSize: '1rem',
                    fontWeight: 700
                  }}
                />
              </div>

              {/* Result Indicator */}
              <div style={{ flexGrow: 2 }}>
                {userOdds && parseFloat(userOdds) > 1 ? (
                  valueResult.isPositive ? (
                    <div style={{ padding: '0.75rem', background: 'rgba(0, 245, 155, 0.15)', border: '1px solid var(--accent-emerald)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <CheckCircle size={16} /> +{valueResult.valueMargin}% Expected Value Bet!
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Market Implied Prob: {valueResult.impliedBookieProb}% vs Model: {pct(metrics.score)}
                        </span>
                      </div>
                      <button 
                        onClick={triggerConfetti}
                        style={{ padding: '0.3rem 0.6rem', background: 'var(--accent-emerald)', color: '#000', borderRadius: '4px', fontWeight: 800, fontSize: '0.75rem' }}
                      >
                        Celebrate 🎉
                      </button>
                    </div>
                  ) : (
                    <div style={{ padding: '0.75rem', background: 'rgba(244, 63, 94, 0.15)', border: '1px solid var(--accent-rose)', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-rose)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertTriangle size={16} /> No Value (-{valueResult.valueMargin}% Margin)
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Market implied probability ({valueResult.impliedBookieProb}%) is higher than model prediction ({pct(metrics.score)}).
                      </span>
                    </div>
                  )
                ) : (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    Type odds above to evaluate value margin.
                  </span>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
