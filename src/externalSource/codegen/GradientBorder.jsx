import './codegen.css';

export function GradientBorder() {
  return (
    <div>
      <div className="cg-label">S5 — Gradient Border</div>
      <h2 className="cg-title">Dual background-clip Technique</h2>
      <p className="cg-desc">
        이중 <code>background-image</code>와 <code>background-clip</code>으로 구현하는 그래디언트 보더.
      </p>

      <div className="cg-border-showcase">
        <div className="cg-border-card">
          <h3>Feature Card</h3>
          <p>Full codebase context across repositories. Agents understand your entire codebase before making changes.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          <div className="cg-border-icon">{'\u26A1'}</div>
          <div className="cg-border-icon filled">{'\u26A1'}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--c-muted)', textAlign: 'center' }}>Border vs Fill</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
          <div className="cg-border-badge">NEW</div>
          <div className="cg-border-badge">BETA</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--c-muted)' }}>Badges</div>
        </div>
      </div>

      <div className="cg-label" style={{ marginBottom: 16 }}>Technique Decomposition</div>
      <div className="cg-border-decompose">
        <div>
          <div className="cg-border-decompose-cell" style={{ background: 'var(--c-surface)', border: '1px solid rgba(255,255,255,0.15)' }} />
          <div className="cg-border-decompose-label">BG1: solid<br />clip: padding-box</div>
        </div>
        <div className="cg-border-decompose-sym">+</div>
        <div>
          <div className="cg-border-decompose-cell" style={{ background: 'linear-gradient(180deg, var(--c-lavender), var(--c-electric), var(--c-deep))' }} />
          <div className="cg-border-decompose-label">BG2: gradient<br />clip: border-box</div>
        </div>
        <div className="cg-border-decompose-sym">=</div>
        <div>
          <div className="cg-border-decompose-cell" style={{
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(var(--c-surface),var(--c-surface)),linear-gradient(180deg,var(--c-lavender),var(--c-electric),var(--c-deep))',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
          }} />
          <div className="cg-border-decompose-label">Combined<br />gradient border</div>
        </div>
      </div>
    </div>
  );
}
