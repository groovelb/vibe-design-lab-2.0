import { useGrain } from './useGrain';
import { GradientButton } from './GradientButton';
import './codegen.css';

export function CTABanner() {
  const { dark } = useGrain();

  return (
    <div>
      <div className="cg-label">S9 — CTA Banner</div>
      <h2 className="cg-title">Horizontal Gradient + Blend Mode</h2>
      <p className="cg-desc">
        수평 4색 그래디언트와 <code>background-blend-mode: multiply</code>의 조합.
      </p>

      <div className="cg-cta">
        {dark && <div className="cg-cta-grain" style={{ backgroundImage: `url(${dark})` }} />}
        <div className="cg-cta-glow" />
        <div className="cg-cta-content">
          <h2>Ready to ship faster?</h2>
          <p>Deploy your first code agent in minutes.</p>
          <div className="cg-glow-buttons">
            <GradientButton>Get Started</GradientButton>
            <GradientButton variant="secondary">Schedule Demo</GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
}
