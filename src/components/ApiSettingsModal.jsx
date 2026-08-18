import React, { useState } from 'react';
import { X, Key, ShieldCheck, RefreshCw, Trash2, Info } from 'lucide-react';
import { getStoredApiKey, saveApiKey, clearApiKey } from '../services/apiService';

export default function ApiSettingsModal({ onClose, onReloadData }) {
  const [key, setKey] = useState(getStoredApiKey());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (key.trim()) {
      saveApiKey(key.trim());
    } else {
      clearApiKey();
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
    onReloadData();
  };

  const handleClear = () => {
    clearApiKey();
    setKey('');
    onReloadData();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px' }}>
        
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0,0,0,0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(0, 240, 255, 0.15)',
              border: '1px solid var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Key size={22} color="var(--accent-cyan)" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Live API & Data Settings
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Optional live data connection settings
              </p>
            </div>
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

        {/* Form Body */}
        <form onSubmit={handleSave} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{ background: 'rgba(0, 245, 155, 0.08)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--accent-emerald)', fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', gap: '0.75rem' }}>
            <Info size={20} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
            <div>
              <strong>Built-in Offline Engine Active!</strong>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                By default, this app generates realistic next-day fixtures with comprehensive scoring streak data. You do NOT need an API key to host or use this app on GitHub Pages!
              </p>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.4rem' }}>
              Optional Football-Data.org API Token:
            </label>
            <input
              type="text"
              placeholder="Paste your free API token here..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.35rem', display: 'block' }}>
              Free tokens can be obtained at <a href="https://www.football-data.org/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}>football-data.org</a>.
            </span>
          </div>

          {savedSuccess && (
            <div style={{ padding: '0.6rem 1rem', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid var(--accent-emerald)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-emerald)', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} /> API Key settings saved successfully!
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            {key ? (
              <button
                type="button"
                onClick={handleClear}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--accent-rose)',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                <Trash2 size={16} /> Clear API Key
              </button>
            ) : <div />}

            <button
              type="submit"
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-emerald)',
                color: '#000',
                fontSize: '0.85rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <RefreshCw size={16} /> Save & Refresh Data
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
