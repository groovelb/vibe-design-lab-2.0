import './codegen.css';

const GRADIENTS = [
  { name: 'Dark Vertical', dir: '\u2191 to top', bg: 'var(--c-base)',
    css: 'linear-gradient(to top, var(--c-lavender), var(--c-electric), transparent)',
    code: 'linear-gradient(to top,\n  --c-lavender,\n  --c-electric,\n  transparent)' },
  { name: 'Light Vertical', dir: '\u2191 360deg',
    css: 'linear-gradient(360deg, var(--c-white) 12.82%, var(--c-pale) 66.56%, var(--c-soft) 83.79%, var(--c-lavender) 100.06%)',
    code: 'linear-gradient(360deg,\n  --c-white 12.82%,\n  --c-pale 66.56%,\n  --c-soft 83.79%,\n  --c-lavender 100.06%)' },
  { name: 'CTA Horizontal', dir: '\u2192 90deg',
    css: 'linear-gradient(90deg, var(--c-base) -10.23%, var(--c-deep) 46.27%, var(--c-electric) 74.52%, var(--c-lavender) 99.99%)',
    code: 'linear-gradient(90deg,\n  --c-base, --c-deep,\n  --c-electric, --c-lavender)\nblend: multiply' },
  { name: 'Step Vertical', dir: '\u2193 to bottom',
    css: 'linear-gradient(to bottom, var(--c-deep), var(--c-electric), var(--c-lavender))',
    code: 'linear-gradient(to bottom,\n  --c-deep,\n  --c-electric,\n  --c-lavender)' },
  { name: 'Icon Diagonal', dir: '\u2197 1.65deg',
    css: 'linear-gradient(1.65deg, var(--c-deep) -54.52%, var(--c-electric) 15.2%, var(--c-lavender) 87.04%)',
    code: 'linear-gradient(1.65deg,\n  --c-deep -54.52%,\n  --c-electric 15.2%,\n  --c-lavender 87.04%)' },
  { name: 'Button Idle', dir: '\u2192 to right (2)',
    css: 'linear-gradient(to right, var(--c-deep), var(--c-electric))',
    code: 'from: --c-deep\nto:   --c-electric' },
  { name: 'Button Hover', dir: '\u2192 to right (3)',
    css: 'linear-gradient(to right, var(--c-deep), var(--c-electric), var(--c-lavender))',
    code: '::before\nfrom: --c-deep\nvia:  --c-electric\nto:   --c-lavender\nopacity 0\u21921 (300ms)' },
];

export function GradientSpectrum() {
  return (
    <div>
      <div className="cg-label">S3 — Gradient Spectrum</div>
      <h2 className="cg-title">7 Gradient Patterns</h2>
      <p className="cg-desc">codegen.com에서 사용하는 7가지 그래디언트 패턴. 각 카드를 호버하면 CSS 코드를 확인할 수 있습니다.</p>

      <div className="cg-spectrum-grid">
        {GRADIENTS.map((g) => (
          <div className="cg-spectrum-card" key={g.name}>
            <div className="cg-spectrum-preview" style={g.bg ? { background: g.bg } : undefined}>
              <div style={{ position: 'absolute', inset: 0, background: g.css }} />
            </div>
            <div className="cg-spectrum-code"><code>{g.code}</code></div>
            <div className="cg-spectrum-info">
              <div className="cg-spectrum-name">{g.name}</div>
              <div className="cg-spectrum-dir">{g.dir}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
