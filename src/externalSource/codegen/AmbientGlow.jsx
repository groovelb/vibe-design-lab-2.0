import { useGrain } from './useGrain';
import { GridSVG } from './GridSVG';
import { GradientButton } from './GradientButton';
import './codegen.css';

export function AmbientGlow() {
  const { dark } = useGrain();

  return (
    <div>
      <div className="cg-label">S4 — Ambient Glow Panel</div>
      <h2 className="cg-title">Volumetric Lighting</h2>
      <p className="cg-desc">글로우 + 그래디언트 + 그레인의 삼중 합성이 만들어내는 볼류메트릭 라이팅 효과.</p>

      <div className="cg-glow-panel">
        <div className="cg-glow-base" />
        <div className="cg-glow-l" />
        <div className="cg-glow-r" />
        <div className="cg-glow-gradient" />
        {dark && <div className="cg-glow-grain" style={{ backgroundImage: `url(${dark})` }} />}
        <div className="cg-glow-grid"><GridSVG /></div>
        <div className="cg-glow-content">
          <h2>The OS for Code Agents</h2>
          <p>Deploy coding agents that plan, build, and review with full context and production-ready results.</p>
          <div className="cg-glow-buttons">
            <GradientButton>Get Started</GradientButton>
            <GradientButton variant="secondary">Schedule Demo</GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
}
