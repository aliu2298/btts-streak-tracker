import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import StatsBanner from './components/StatsBanner';
import LeagueFilter from './components/LeagueFilter';
import FixtureCard from './components/FixtureCard';
import FixtureDetailModal from './components/FixtureDetailModal';
import GitHubGuideModal from './components/GitHubGuideModal';
import ApiSettingsModal from './components/ApiSettingsModal';
import { fetchMatches, getStoredApiKey } from './services/apiService';
import { getAvailableDates } from './services/mockDataGenerator';
import { calculateBTTSMetrics } from './utils/bttsAlgorithm';
import { Flame, SlidersHorizontal, ArrowUpDown, RefreshCw, AlertCircle } from 'lucide-react';

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
  
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(!!getStoredApiKey());

  // Load Fixtures on date change
  const loadData = async () => {
    setIsLoading(true);
    setHasApiKey(!!getStoredApiKey());
    try {
      const data = await fetchMatches(selectedDate);
      setFixtures(data);
    } catch (err) {
      console.error('Failed to load match fixtures:', err);
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
      if (highBttsOnly && metrics.score < 70) {
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
        return b.metrics.score - a.metrics.score;
      } else if (sortBy === 'time_asc') {
        return a.fixture.time.localeCompare(b.fixture.time);
      } else if (sortBy === 'streak_desc') {
        const streakA = Math.max(a.metrics.homeScoreStreak, a.metrics.awayScoreStreak);
        const streakB = Math.max(b.metrics.homeScoreStreak, b.metrics.awayScoreStreak);
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
        hasApiKey={hasApiKey}
      />

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
          {filteredMetricsList.map(({ fixture }) => (
            <FixtureCard
              key={fixture.id}
              fixture={fixture}
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
          fixture={selectedFixture}
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
