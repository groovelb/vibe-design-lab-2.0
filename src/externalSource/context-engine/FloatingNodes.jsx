import { useRef, useEffect, useState, useCallback, memo } from 'react';

/**
 * Mobile-only floating nodes background
 * 25 DOM divs with Brownian-motion physics
 * Matching augmentcode.com's FloatingNodesBackground exactly
 */

const NODE_COUNT = 25;
const GREEN_RATIO = 0.2;
const BOUNDS = { min: 5, max: 95 };

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

const FloatingNodes = memo(function FloatingNodes({ className = '', accentColor = '#1aa049' }) {
  const containerRef = useRef(null);
  const nodesDataRef = useRef([]);
  const domRefsRef = useRef([]);
  const rafRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [visible, setVisible] = useState(true);

  // Initialize nodes
  useEffect(() => {
    if (nodesDataRef.current.length > 0) return;
    const initial = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      initial.push({
        id: i,
        x: BOUNDS.min + (BOUNDS.max - BOUNDS.min) * Math.random(),
        y: BOUNDS.min + (BOUNDS.max - BOUNDS.min) * Math.random(),
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        size: 3 + 4 * Math.random(),
        isGreen: Math.random() < GREEN_RATIO,
      });
    }
    nodesDataRef.current = initial;
    setNodes(initial);
  }, []);

  // IO + visibility pause
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(el);

    const onVisChange = () => {
      if (document.hidden) setVisible(false);
      else setVisible(true);
    };
    document.addEventListener('visibilitychange', onVisChange);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisChange);
    };
  }, []);

  // Physics update
  const updatePositions = useCallback(() => {
    const data = nodesDataRef.current;
    const refs = domRefsRef.current;

    for (let i = 0; i < data.length; i++) {
      const n = data[i];
      const el = refs[i];
      if (!el) continue;

      n.x += n.vx;
      n.y += n.vy;

      // Bounce
      if (n.x < BOUNDS.min || n.x > BOUNDS.max) {
        n.vx = -(0.8 * n.vx);
        n.x = clamp(n.x, BOUNDS.min, BOUNDS.max);
      }
      if (n.y < BOUNDS.min || n.y > BOUNDS.max) {
        n.vy = -(0.8 * n.vy);
        n.y = clamp(n.y, BOUNDS.min, BOUNDS.max);
      }

      // Brownian drift
      n.vx += (Math.random() - 0.5) * 0.008;
      n.vy += (Math.random() - 0.5) * 0.008;

      // Friction
      n.vx *= 0.999;
      n.vy *= 0.999;

      // Min velocity
      if (Math.abs(n.vx) < 0.015) n.vx = (Math.random() - 0.5) * 0.08;
      if (Math.abs(n.vy) < 0.015) n.vy = (Math.random() - 0.5) * 0.08;

      el.style.left = `${n.x}%`;
      el.style.top = `${n.y}%`;
    }
  }, []);

  // RAF loop
  useEffect(() => {
    if (!visible || nodes.length === 0) return;

    const loop = () => {
      updatePositions();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible, nodes.length, updatePositions]);

  return (
    <div ref={containerRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Horizontal gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, var(--ce-bg, #0a0a0a), transparent, var(--ce-bg, #0a0a0a))',
      }} />
      {/* Vertical gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.4,
        background: 'linear-gradient(to bottom, var(--ce-bg, #0a0a0a), transparent, var(--ce-bg, #0a0a0a))',
      }} />

      {/* Nodes */}
      {nodes.map((node, i) => (
        <div
          key={node.id}
          ref={el => { domRefsRef.current[i] = el; }}
          style={{
            position: 'absolute',
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            borderRadius: '50%',
            backgroundColor: node.isGreen ? accentColor : '#a1a1a1',
            opacity: node.isGreen ? 0.25 : 0.2,
            transform: 'translate(-50%, -50%)',
            willChange: 'left, top',
          }}
        />
      ))}
    </div>
  );
});

export default FloatingNodes;
