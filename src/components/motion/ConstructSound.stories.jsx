'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snd from 'snd-lib';
import { playAreaConstructSound, playConstructBlockSound } from './constructSounds';
import { useConstruct } from './useConstruct';
import { ConstructOverlay } from './ConstructOverlay';
import Placeholder from '../../common/ui/Placeholder';

export default {
  title: 'Interactive/14. Motion/ConstructSound',
  parameters: {
    layout: 'padded',
  },
};

// ── SND 전체 사운드 팔레트 ────────────────────────────────

function SoundPaletteStory() {
  const [snd, setSnd] = useState(null);
  const [kit, setKit] = useState('SND01');

  useEffect(() => {
    const s = new Snd();
    s.load(Snd.KITS[kit]).then(() => setSnd(s));
  }, [kit]);

  const allSounds = [
    { key: 'TAP', desc: 'tap — 클릭/탭 확인' },
    { key: 'BUTTON', desc: 'button — 기능 실행 확인' },
    { key: 'DISABLED', desc: 'disabled — 비활성 버튼' },
    { key: 'TOGGLE', desc: 'toggle — ON/OFF 전환' },
    { key: 'SWIPE', desc: 'swipe — 수평 이동' },
    { key: 'SELECT', desc: 'select — 체크/라디오 선택' },
    { key: 'MODAL', desc: 'modal — 레이어 열기/닫기' },
    { key: 'TASK', desc: 'task — 처리/로딩' },
    { key: 'TYPE', desc: 'type — 키 입력' },
    { key: 'NOTIFICATION', desc: 'notification — 알림' },
    { key: 'CAUTION', desc: 'caution — 경고' },
    { key: 'CELEBRATION', desc: 'celebration — 완료' },
  ];

  const kits = ['SND01', 'SND02', 'SND03'];

  return (
    <Stack spacing={4} sx={{ maxWidth: 480 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
          SND Sound Palette
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          킷을 바꿔가며 각 사운드를 들어보세요. 적합한 조합을 찾아 매핑합니다.
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          {kits.map((k) => (
            <Button
              key={k}
              variant={kit === k ? 'contained' : 'outlined'}
              size="small"
              onClick={() => { setKit(k); setSnd(null); }}
            >
              {k}
            </Button>
          ))}
        </Stack>
        {!snd && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Loading...</Typography>
        )}
        {snd && (
          <Stack spacing={1}>
            {allSounds.map(({ key, desc }) => (
              <Box
                key={key}
                component="button"
                onClick={() => snd.play(Snd.SOUNDS[key])}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  px: 2,
                  py: 1.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s',
                  '&:hover': { bgcolor: 'action.hover' },
                  '&:active': { bgcolor: 'action.selected' },
                }}
              >
                <Typography sx={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 700, color: 'primary.main', minWidth: 100, textAlign: 'left' }}>
                  {key}
                </Typography>
                <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                  {desc}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Stack>
  );
}

export const SoundPalette = {
  render: () => <SoundPaletteStory />,
};

// ── AreaConstruct + Sound ─────────────────────────────────

function AreaWithSoundStory() {
  const [key, setKey] = useState(0);
  return (
    <Stack spacing={3} sx={{ maxWidth: 480 }}>
      <Button variant="outlined" size="small" onClick={() => setKey((k) => k + 1)} sx={{ alignSelf: 'flex-start' }}>
        Replay
      </Button>
      <AreaConstructWithSound key={key} />
    </Stack>
  );
}

export const AreaWithSound = {
  render: () => <AreaWithSoundStory />,
};

// ── ConstructBlock + Sound ────────────────────────────────

function BlockWithSoundStory() {
  const [key, setKey] = useState(0);
  return (
    <Stack spacing={3} sx={{ maxWidth: 600 }}>
      <Button variant="outlined" size="small" onClick={() => setKey((k) => k + 1)} sx={{ alignSelf: 'flex-start' }}>
        Replay
      </Button>
      <ConstructBlockWithSound key={key} />
    </Stack>
  );
}

export const BlockWithSound = {
  render: () => <BlockWithSoundStory />,
};

// ── Combined ──────────────────────────────────────────────

function CombinedStory() {
  const [key, setKey] = useState(0);
  return (
    <Stack spacing={4} sx={{ maxWidth: 600 }}>
      <Button variant="outlined" size="small" onClick={() => setKey((k) => k + 1)} sx={{ alignSelf: 'flex-start' }}>
        Replay All
      </Button>
      <AreaConstructWithSound key={`a-${key}`} />
      <ConstructBlockWithSound key={`b-${key}`} delay={600} />
    </Stack>
  );
}

export const Combined = {
  render: () => <CombinedStory />,
};

// ── Internal ──────────────────────────────────────────────

function AreaConstructWithSound() {
  const { phase, handleRef, size } = useConstruct({ isTriggerOnView: false, delay: 0 });
  const prevPhase = useRef('idle');

  useEffect(() => {
    if (phase !== prevPhase.current) {
      prevPhase.current = phase;
      playAreaConstructSound(phase);
    }
  }, [phase]);

  const showContent = phase === 'reveal' || phase === 'done';

  return (
    <Box ref={handleRef} sx={{ position: 'relative' }}>
      <Box sx={{ opacity: showContent ? 1 : 0.01, transition: 'opacity 600ms cubic-bezier(0.4,0,0.2,1)', willChange: 'opacity' }}>
        <Placeholder.Media ratio="16/9" />
      </Box>
      <ConstructOverlay phase={phase} size={size} />
    </Box>
  );
}

function ConstructBlockWithSound({ delay = 0 }) {
  const textRef = useRef(null);
  const lineRef = useRef(null);
  const slotRefs = useRef([]);
  const [isActive, setIsActive] = useState(false);

  const GRID_SLOTS = 16;
  const ACTIVE_COUNT = 7;
  const SHUFFLE_INTERVAL = 80;
  const duration = 800;
  const [slotPx, setSlotPx] = useState(4);
  const [slotPositions, setSlotPositions] = useState([]);

  const text = '채용 시장은 디자인 엔지니어를 찾는데, 나는 Figma 안에서만 영향력이 있다. 시스템으로 사고하면 도구가 바뀌어도 유효하다.';

  useEffect(() => {
    const t = setTimeout(() => setIsActive(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const blockHeight = el.offsetHeight;
    const size = Math.floor(blockHeight / GRID_SLOTS);
    const positions = Array.from({ length: GRID_SLOTS }, (_, i) =>
      Math.round((i / (GRID_SLOTS - 1)) * (blockHeight - size)),
    );
    setSlotPx(size);
    setSlotPositions(positions);
  }, [text]);

  useEffect(() => {
    if (!isActive) return;
    const textEl = textRef.current;
    const lineEl = lineRef.current;
    if (!textEl || !lineEl) return;

    const blockWidth = textEl.offsetWidth;

    const pickActive = () => {
      const indices = Array.from({ length: GRID_SLOTS }, (_, i) => i);
      for (let i = indices.length - 1; i > indices.length - 1 - ACTIVE_COUNT; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      return new Set(indices.slice(-ACTIVE_COUNT));
    };

    let activeSet = pickActive();
    const applySlots = () => {
      slotRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = activeSet.has(i) ? '1' : '0.01';
      });
    };

    applySlots();
    lineEl.style.opacity = '1';
    playConstructBlockSound('start');

    let lastShuffleTime = 0;
    const startTime = performance.now();
    let rafId;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      textEl.style.clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`;
      lineEl.style.transform = `translate3d(${progress * blockWidth}px, 0, 0)`;

      if (now - lastShuffleTime > SHUFFLE_INTERVAL) {
        lastShuffleTime = now;
        activeSet = pickActive();
        applySlots();
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        lineEl.style.opacity = '0.01';
        textEl.style.clipPath = 'inset(0 0 0 0)';
        playConstructBlockSound('complete');
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isActive]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography ref={textRef} variant="body1" sx={{ clipPath: 'inset(0 100% 0 0)' }}>
        {text}
      </Typography>
      <Box
        ref={lineRef}
        sx={{
          position: 'absolute', top: 0, left: 0, height: '100%',
          opacity: 0.01, transition: 'opacity 150ms cubic-bezier(0.16,1,0.3,1)',
          willChange: 'transform', pointerEvents: 'none',
        }}
      >
        {Array.from({ length: GRID_SLOTS }).map((_, i) => (
          <Box
            key={i}
            ref={(el) => { slotRefs.current[i] = el; }}
            sx={{
              position: 'absolute', left: 0, top: slotPositions[i] ?? 0,
              width: slotPx, height: slotPx, backgroundColor: 'primary.main',
              opacity: 0.01, transition: `opacity ${SHUFFLE_INTERVAL}ms cubic-bezier(0.16,1,0.3,1)`,
              willChange: 'opacity',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
