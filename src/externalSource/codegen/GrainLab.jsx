import { useState } from 'react';
import { useGrain } from './useGrain';
import './codegen.css';

const SIZES = [
  { v: 64, label: '64px', desc: 'Ultra-fine' },
  { v: 128, label: '128px', desc: 'Fine (codegen)', active: true },
  { v: 256, label: '256px', desc: 'Medium' },
  { v: 512, label: '512px', desc: 'Coarse' },
  { v: 1024, label: '1024px', desc: 'Very coarse' },
];

const OPACITIES = [
  { v: 3, desc: 'Barely visible' },
  { v: 5, desc: 'Subtle' },
  { v: 8, desc: 'Optimal (codegen)', active: true },
  { v: 15, desc: 'Visible' },
  { v: 25, desc: 'Strong' },
];

export function GrainLab() {
  const { light, dark } = useGrain();
  const [size, setSize] = useState(128);
  const [opacity, setOpacity] = useState(100);
  const [isDark, setIsDark] = useState(true);

  return (
    <div>
      <div className="cg-label">S2 — Grain Density Lab</div>
      <h2 className="cg-title">Grain Texture Control</h2>
      <p className="cg-desc">
        같은 노이즈 텍스처를 <code>background-size</code>와 <code>opacity</code>만으로 전혀 다른 밀도의 그레인 효과를 만들어냅니다.
      </p>

      <div className="cg-grain-row-label">Dark Grain — background-size comparison</div>
      <div className="cg-grain-row">
        {SIZES.map((s) => (
          <div className="cg-grain-cell" key={s.v}>
            <div className={`cg-grain-preview${s.active ? ' is-active' : ''}`}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--c-lavender), var(--c-electric), var(--c-deep))' }} />
              {dark && <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${dark})`, backgroundRepeat: 'repeat', backgroundSize: `${s.v}px ${s.v}px` }} />}
            </div>
            <div className="cg-grain-label">
              {s.label}{s.active && <> <span className="cg-badge">USED</span></>}
              <small>{s.desc}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="cg-grain-row-label">Light Grain — opacity comparison</div>
      <div className="cg-grain-row">
        {OPACITIES.map((o) => (
          <div className="cg-grain-cell" key={o.v}>
            <div className={`cg-grain-preview${o.active ? ' is-active' : ''}`}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-base)' }} />
              {light && <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${light})`, backgroundRepeat: 'repeat', opacity: o.v / 100 }} />}
            </div>
            <div className="cg-grain-label">
              {o.v}%{o.active && <> <span className="cg-badge">USED</span></>}
              <small>{o.desc}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="cg-grain-row-label">Interactive Control</div>
      <div className="cg-grain-interactive">
        <div>
          <div className="cg-slider-group">
            <label>background-size <span>{size}px</span></label>
            <input type="range" min={32} max={512} step={4} value={size} onChange={(e) => setSize(+e.target.value)} />
          </div>
          <div className="cg-slider-group">
            <label>opacity <span>{opacity}%</span></label>
            <input type="range" min={0} max={100} step={1} value={opacity} onChange={(e) => setOpacity(+e.target.value)} />
          </div>
          <div className="cg-slider-group">
            <label>Texture <span>{isDark ? 'Dark' : 'Light'}</span></label>
            <input type="range" min={0} max={1} step={1} value={isDark ? 0 : 1} onChange={(e) => setIsDark(e.target.value === '0')} />
          </div>
        </div>
        <div className="cg-grain-live">
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--c-lavender), var(--c-electric), var(--c-deep))' }} />
          {(isDark ? dark : light) && (
            <div style={{
              position: 'absolute', inset: 0, backgroundRepeat: 'repeat',
              backgroundImage: `url(${isDark ? dark : light})`,
              backgroundSize: `${size}px ${size}px`,
              opacity: opacity / 100,
            }} />
          )}
        </div>
      </div>
    </div>
  );
}
