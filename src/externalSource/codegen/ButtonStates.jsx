import { GradientButton } from './GradientButton';
import './codegen.css';

export function ButtonStates() {
  return (
    <div>
      <div className="cg-label">S6 — Button States</div>
      <h2 className="cg-title">::before Gradient Hover</h2>
      <p className="cg-desc">
        <code>::before</code> 의사 요소에 3색 그래디언트를 미리 깔아두고, hover 시 opacity를 전환하여 부드러운 색상 이동을 구현합니다.
      </p>

      <div className="cg-btn-state-demo">
        <div style={{ textAlign: 'center' }}>
          <GradientButton disabled>Get Started</GradientButton>
          <div className="cg-btn-state-label">Idle — 2 colors</div>
        </div>
        <div className="cg-btn-state-arrow">{'\u2192'} 300ms {'\u2192'}</div>
        <div style={{ textAlign: 'center' }}>
          <GradientButton forceHover disabled>Get Started</GradientButton>
          <div className="cg-btn-state-label">Hover — 3 colors</div>
        </div>
      </div>

      <div className="cg-btn-state-demo">
        <div style={{ textAlign: 'center' }}>
          <GradientButton variant="secondary" disabled>Schedule Demo</GradientButton>
          <div className="cg-btn-state-label">Idle — outline</div>
        </div>
        <div className="cg-btn-state-arrow">{'\u2192'} 300ms {'\u2192'}</div>
        <div style={{ textAlign: 'center' }}>
          <GradientButton variant="secondary" forceHover disabled>Schedule Demo</GradientButton>
          <div className="cg-btn-state-label">Hover — fill</div>
        </div>
      </div>

      <div className="cg-label" style={{ marginTop: 32, marginBottom: 16 }}>Live Buttons (hover to interact)</div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <GradientButton>Get Started</GradientButton>
        <GradientButton variant="secondary">Schedule Demo</GradientButton>
      </div>
    </div>
  );
}
