import React, { useState } from 'react';
import { X, Github, Copy, Check, ExternalLink, Terminal, Globe, Rocket } from 'lucide-react';

export default function GitHubGuideModal({ onClose }) {
  const [copiedStep, setCopiedStep] = useState(null);

  const copyToClipboard = (text, stepId) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepId);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const gitCommands = `# Navigate to this project folder
git init
git add .
git commit -m "Initial commit: BTTS Streak Tracker App"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/btts-streak-tracker.git
git push -u origin main`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px' }}>
        
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
              background: 'rgba(0, 245, 155, 0.15)',
              border: '1px solid var(--accent-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Github size={22} color="var(--accent-emerald)" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Deploy to GitHub Pages
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Host your BTTS Streak Tracker free in 3 simple steps
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

        {/* Content Steps */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Step 1 */}
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ background: 'var(--accent-emerald)', color: '#000', fontWeight: 800, borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>1</span>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Create a New Repository on GitHub
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '2rem' }}>
              Go to <a href="https://github.com/new" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>github.com/new</a> and create a public repository named <strong>btts-streak-tracker</strong> (do not check initialize with README).
            </p>
          </div>

          {/* Step 2 */}
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: 'var(--accent-emerald)', color: '#000', fontWeight: 800, borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>2</span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Terminal size={16} color="var(--accent-cyan)" /> Push Code to GitHub
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard(gitCommands, 'cmd')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: copiedStep === 'cmd' ? 'rgba(0, 245, 155, 0.2)' : 'rgba(255,255,255,0.08)',
                  border: `1px solid ${copiedStep === 'cmd' ? 'var(--accent-emerald)' : 'var(--border-subtle)'}`,
                  color: copiedStep === 'cmd' ? 'var(--accent-emerald)' : 'var(--text-main)',
                  fontSize: '0.78rem',
                  fontWeight: 600
                }}
              >
                {copiedStep === 'cmd' ? <Check size={14} /> : <Copy size={14} />}
                {copiedStep === 'cmd' ? 'Copied Commands!' : 'Copy Terminal Commands'}
              </button>
            </div>

            <pre style={{
              background: '#04070c',
              padding: '1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              fontFamily: 'monospace',
              fontSize: '0.825rem',
              color: '#34d399',
              overflowX: 'auto',
              marginLeft: '2rem'
            }}>
              {gitCommands}
            </pre>
          </div>

          {/* Step 3 */}
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ background: 'var(--accent-emerald)', color: '#000', fontWeight: 800, borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>3</span>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Rocket size={16} color="var(--accent-amber)" /> Enable GitHub Pages (Automated Workflow)
              </h3>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p>In your GitHub repository:</p>
              <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>Go to <strong>Settings</strong> tab → <strong>Pages</strong> (on left sidebar).</li>
                <li>Under <strong>Build and deployment</strong> → <strong>Source</strong>, select <strong>GitHub Actions</strong>.</li>
                <li>That's it! The included <code>.github/workflows/deploy.yml</code> workflow will automatically build and publish your app every time you push code!</li>
              </ol>
              <div style={{ marginTop: '0.5rem', padding: '0.6rem 0.85rem', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid var(--accent-cyan)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-cyan)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Globe size={16} />
                Your live site will be accessible at: <strong>https://YOUR_USERNAME.github.io/btts-streak-tracker/</strong>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
