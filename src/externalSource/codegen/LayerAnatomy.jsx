import { useState } from 'react';
import { useGrain } from './useGrain';
import { GridSVG } from './GridSVG';
import './codegen.css';

const LAYERS = [
  { id: 1, name: 'L1 Base', detail: '#141417' },
  { id: 2, name: 'L2 Ambient Glow', detail: 'radial-gradient' },
  { id: 3, name: 'L3 CSS Gradient', detail: 'linear-gradient \u2191' },
  { id: 4, name: 'L4 Section Grain', detail: '128px, 100%' },
  { id: 5, name: 'L5 Grid Overlay', detail: 'soft-light blend' },
  { id: 6, name: 'L6 Global Grain', detail: '8% opacity' },
];

export function LayerAnatomy() {
  const [visible, setVisible] = useState({ 1: true, 2: true, 3: true, 4: true, 5: true, 6: true });
  const { light, dark } = useGrain();

  const toggle = (id) => setVisible((v) => ({ ...v, [id]: !v[id] }));

  const layerStyle = (id) => ({
    opacity: visible[id] ? undefined : 0,
  });

  return (
    <div>
      <div className="cg-label">S1 — Layer Anatomy</div>
      <h2 className="cg-title">6-Layer Compositing</h2>
      <p className="cg-desc">
        각 레이어를 토글하며 합성 과정을 확인하세요. 레이어를 하나씩 켜고 끄면서 최종 결과물에 기여하는 바를 시각적으로 이해할 수 있습니다.
      </p>

      <div className="cg-anatomy-layout">
        <div className="cg-anatomy-preview">
          <div className="cg-anatomy-layer" style={{ background: 'var(--c-base)', ...layerStyle(1) }} />
          <div className="cg-anatomy-layer l2" style={layerStyle(2)} />
          <div className="cg-anatomy-layer l3" style={layerStyle(3)} />
          <div className="cg-anatomy-layer l4" style={{
            backgroundImage: dark ? `url(${dark})` : 'none',
            backgroundRepeat: 'repeat', backgroundSize: '128px 128px',
            ...layerStyle(4),
          }} />
          <div className="cg-anatomy-layer l5" style={layerStyle(5)}>
            <GridSVG />
          </div>
          <div className="cg-anatomy-layer l6" style={{
            backgroundImage: light ? `url(${light})` : 'none',
            backgroundRepeat: 'repeat', opacity: visible[6] ? 0.15 : 0,
          }} />
        </div>

        <div className="cg-anatomy-controls">
          <h3>Toggle Layers</h3>
          {LAYERS.map((l) => (
            <button key={l.id} className={`cg-check${visible[l.id] ? ' active' : ''}`} onClick={() => toggle(l.id)}>
              <span className="cg-check-dot">{visible[l.id] ? '\u2713' : ''}</span>
              <span className="cg-check-text">{l.name}<small>{l.detail}</small></span>
            </button>
          ))}
        </div>
      </div>

      <div className="cg-decompose">
        {[
          { label: 'L1 Base', el: <div style={{ position: 'absolute', inset: 0, background: 'var(--c-base)' }} /> },
          { label: 'L2 Glow', el: <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 40%, var(--c-electric-a50), transparent 70%)' }} /> },
          { label: 'L3 Gradient', el: <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--c-lavender), var(--c-electric), transparent)' }} /> },
          { label: 'L4 Grain', el: <div style={{ position: 'absolute', inset: 0, backgroundImage: dark ? `url(${dark})` : 'none', backgroundRepeat: 'repeat', backgroundSize: '64px 64px' }} /> },
          { label: 'L5 Grid', el: <div style={{ position: 'absolute', inset: 0, mixBlendMode: 'soft-light' }}><GridSVG opacity={0.5} /></div> },
          { label: 'L6 Grain', el: <div style={{ position: 'absolute', inset: 0, backgroundImage: light ? `url(${light})` : 'none', backgroundRepeat: 'repeat', opacity: 0.25 }} /> },
        ].map((item) => (
          <div key={item.label}>
            <div className="cg-decompose-cell" style={{ position: 'relative' }}>{item.el}</div>
            <div className="cg-decompose-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
