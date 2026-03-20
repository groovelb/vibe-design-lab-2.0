import { useMemo } from 'react';
import './codegen.css';

const LOGOS = ['Acme', 'Vercel', 'Stripe', 'GitHub', 'Linear', 'Notion', 'Figma', 'Slack'];
const COLORS = ['#1e1e2e', '#23232f', '#1a1a26', '#201c2e', '#1c1c28', '#251e32', '#1e1a28', '#221e30'];

function TrackItems() {
  const items = useMemo(() => {
    const arr = [];
    for (let r = 0; r < 4; r++) {
      LOGOS.forEach((name, i) => arr.push({ name, color: COLORS[i], key: `${r}-${i}` }));
    }
    return arr;
  }, []);

  return items.map((item) => (
    <div className="cg-carousel-item" key={item.key} style={{ background: item.color }}>
      {item.name}
    </div>
  ));
}

export function FadeCarousel() {
  return (
    <div>
      <div className="cg-label">S8 — Fade Edge Carousel</div>
      <h2 className="cg-title">color-mix() Fade + Infinite Scroll</h2>
      <p className="cg-desc">
        <code>color-mix(in srgb, color 50%, transparent)</code>로 만드는 부드러운 페이드 엣지와 무한 스크롤 캐러셀.
      </p>

      <div className="cg-carousel">
        <div className="cg-carousel-heading">Trusted by 1000+ teams</div>
        <div className="cg-carousel-wrap" style={{ marginBottom: 16 }}>
          <div className="cg-fade-left" />
          <div className="cg-fade-right" />
          <div className="cg-carousel-track"><TrackItems /></div>
        </div>
        <div className="cg-carousel-wrap">
          <div className="cg-fade-left" />
          <div className="cg-fade-right" />
          <div className="cg-carousel-track reverse"><TrackItems /></div>
        </div>
      </div>
    </div>
  );
}
