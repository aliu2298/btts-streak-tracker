import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import StatsBanner from './components/StatsBanner';
import LeagueFilter from './components/LeagueFilter';
import FixtureCard from './components/FixtureCard';
import FixtureDetailModal from './components/FixtureDetailModal';
import GitHubGuideModal from './components/GitHubGuideModal';
import ApiSettingsModal from './components/ApiSettingsModal';
import { fetchMatches } from './services/apiService';
import { getAvailableDates } from './services/mockDataGenerator';
import { calculateBTTSMetrics, HIGH_CONFIDENCE_THRESHOLD } from './utils/bttsAlgorithm';
import { Flame, ArrowUpDown, RefreshCw, AlertCircle, Info } from 'lucide-react';

function DataSourceBanner({ source, warnings }) {
  const isDemo = source === 'demo';
  if (!isDemo && warnings.length === 0) return null;

  const accent = isDemo ? 'var(--accent-amber)' : 'var(--text-dim)';
  return (
    <div
      className="glass-panel"
      style={{
        padding: '0.85rem 1.1rem',
        marginBottom: '1.5rem',
        borderRadius: 'var(--radius-md)',
        borderLeft: `4px solid ${accent}`,
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'flex-start'
      }}
    >
      <Info size={18} color={accent} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        {isDemo && (
          <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.2rem' }}>
            Demo data - these fixtures and stats are a bundled sample, not live results.
          </strong>
        )}
        {warnings.map((w, i) => (
          <div key={i} style={{ marginTop: i === 0 ? 0 : '0.25rem' }}>{w}</div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const dates = getAvailableDates();
  const defaultDate = dates.find(d => d.isDefault)?.dateStr || dates[1].dateStr;

  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [highBttsOnly, setHighBttsOnly] = useState(false);
  const [sortBy, setSortBy] = useState('score_desc'); // score_desc | time_asc | streak_desc

  const [fixtures, setFixtures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFixture, setSelectedFixture] = useState(null);
  const [dataSource, setDataSource] = useState('demo');
  const [warnings, setWarnings] = useState([]);

  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);

  // Load Fixtures on date change
  const loadData = async () => {
    setIsLoading(true);
    try {
      const { fixtures: data, source, warnings: notes } = await fetchMatches(selectedDate);
      setFixtures(data);
      setDataSource(source);
      setWarnings(notes || []);
    } catch (err) {
      console.error('Failed to load match fixtures:', err);
      setFixtures([]);
      setWarnings([`Could not load fixtures: ${err.message}`]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  // Compute metrics for each fixture & compute league counts
  const processedFixtures = useMemo(() => {
    return fixtures.map(fixture => ({
      fixture,
      metrics: calculateBTTSMetrics(fixture)
    }));
  }, [fixtures]);

  // League match counts
  const leagueCounts = useMemo(() => {
    const counts = {};
    fixtures.forEach(f => {
      counts[f.leagueId] = (counts[f.leagueId] || 0) + 1;
    });
    return counts;
  }, [fixtures]);

  // Filtered and Sorted Fixtures
  const filteredMetricsList = useMemo(() => {
    return processedFixtures.filter(({ fixture, metrics }) => {
      // League filter
      if (selectedLeague !== 'all' && fixture.leagueId !== selectedLeague) {
        return false;
      }
      // High BTTS filter (>70%)
      if (highBttsOnly && (metrics.score === null || metrics.score < HIGH_CONFIDENCE_THRESHOLD)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTeam = fixture.homeTeam.name.toLowerCase().includes(q) || 
                            fixture.awayTeam.name.toLowerCase().includes(q);
        const matchesLeague = fixture.leagueName.toLowerCase().includes(q);
        if (!matchesTeam && !matchesLeague) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'score_desc') {
        // Unscored fixtures (no form data) always sort last.
        if (a.metrics.score === null || b.metrics.score === null) {
          return (a.metrics.score === null ? 1 : 0) - (b.metrics.score === null ? 1 : 0);
        }
        return b.metrics.score - a.metrics.score;
      } else if (sortBy === 'time_asc') {
        return a.fixture.time.localeCompare(b.fixture.time);
      } else if (sortBy === 'streak_desc') {
        const streakA = Math.max(a.metrics.homeScoreStreak || 0, a.metrics.awayScoreStreak || 0);
        const streakB = Math.max(b.metrics.homeScoreStreak || 0, b.metrics.awayScoreStreak || 0);
        return streakB - streakA;
      }
      return 0;
    });
  }, [processedFixtures, selectedLeague, highBttsOnly, searchQuery, sortBy]);

  return (
    <div className="app-container">
      
      {/* Top Header */}
      <Header
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        highBttsOnly={highBttsOnly}
        onToggleHighBtts={() => setHighBttsOnly(prev => !prev)}
        onOpenGitHubModal={() => setShowGitHubModal(true)}
        onOpenApiModal={() => setShowApiModal(true)}
        dataSource={dataSource}
      />

      {/* Honest banner: what the numbers below are actually built from */}
      <DataSourceBanner source={dataSource} warnings={warnings} />

      {/* Top KPI Metrics Banner */}
      <StatsBanner fixtures={fixtures} metricsList={processedFixtures} />

      {/* League Filter Navigation */}
      <LeagueFilter
        selectedLeague={selectedLeague}
        onSelectLeague={setSelectedLeague}
        leagueCounts={leagueCounts}
      />

      {/* Feed Control Bar: Sort & Results Count */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Upcoming Matches
          </span>
          <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.08)', padding: '0.15rem 0.6rem', borderRadius: '9999px', color: 'var(--text-muted)', fontWeight: 700 }}>
            {filteredMetricsList.length} matches found
          </span>
        </div>

        {/* Sort Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowUpDown size={15} color="var(--text-muted)" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: 'rgba(18, 24, 38, 0.9)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.35rem 0.65rem',
              fontSize: '0.825rem',
              color: 'var(--text-main)',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="score_desc">🔥 Highest BTTS Score</option>
            <option value="streak_desc">⚡ Longest Goal Streak</option>
            <option value="time_asc">⏰ Kick-off Time</option>
          </select>
        </div>
      </div>

      {/* Match Cards Feed */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <RefreshCw size={36} className="animate-spin" color="var(--accent-emerald)" style={{ margin: '0 auto 1rem auto' }} />
          <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Calculating Goal Streaks & BTTS Models...</p>
        </div>
      ) : filteredMetricsList.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.25rem'
        }}>
          {filteredMetricsList.map(({ fixture, metrics }) => (
            <FixtureCard
              key={fixture.id}
              fixture={fixture}
              metrics={metrics}
              onSelectFixture={setSelectedFixture}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3.5rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <AlertCircle size={44} color="var(--accent-amber)" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
            No Matches Found
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 1.25rem auto' }}>
            No fixtures match your current filters or date selection. Try clearing search filters or changing target date.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedLeague('all');
              setHighBttsOnly(false);
            }}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-emerald)',
              color: '#000',
              fontWeight: 800,
              fontSize: '0.85rem'
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: '1px solid var(--border-subtle)',
        textAlign: 'center',
        color: 'var(--text-dim)',
        fontSize: '0.8rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Flame size={16} color="var(--accent-emerald)" />
          <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>BTTS StreakTracker</span>
          <span>• Ready for GitHub Pages</span>
        </div>
        <p>
          Designed for soccer fans & goal streak analytics. Educational probability model only.
        </p>
      </footer>

      {/* Modals */}
      {selectedFixture && (
        <FixtureDetailModal
          fixture={selectedFixture.fixture}
          metrics={selectedFixture.metrics}
          onClose={() => setSelectedFixture(null)}
        />
      )}

      {showGitHubModal && (
        <GitHubGuideModal
          onClose={() => setShowGitHubModal(false)}
        />
      )}

      {showApiModal && (
        <ApiSettingsModal
          onClose={() => setShowApiModal(false)}
          onReloadData={loadData}
        />
      )}

    </div>
  );
}
