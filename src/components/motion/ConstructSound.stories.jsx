'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { playConstructClick } from './constructSounds';
import { AreaConstruct } from './AreaConstruct';
import { ConstructBlock } from './ConstructBlock';
import Placeholder from '../../common/ui/Placeholder';

export default {
  title: 'Interactive/14. Motion/ConstructSound',
  parameters: {
    layout: 'padded',
  },
};

// ── 사운드 단독 시청 ─────────────────────────────────────

export const SoundOnly = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 400 }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        click
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
        900Hz detuned dual-sine + bandpass 1200Hz. 300ms 디바운스 적용.
      </Typography>
      <Button variant="outlined" size="small" onClick={playConstructClick} sx={{ alignSelf: 'flex-start' }}>
        Play click
      </Button>
    </Stack>
  ),
};

// ── AreaConstruct + Sound ─────────────────────────────────

function AreaDemo() {
  const [key, setKey] = useState(0);
  return (
    <Stack spacing={3} sx={{ maxWidth: 480 }}>
      <Button variant="outlined" size="small" onClick={() => setKey((k) => k + 1)} sx={{ alignSelf: 'flex-start' }}>
        Replay
      </Button>
      <AreaConstruct key={key} isTriggerOnView={false}>
        <Placeholder.Media ratio="16/9" />
      </AreaConstruct>
    </Stack>
  );
}

export const AreaWithSound = {
  render: () => <AreaDemo />,
};

// ── ConstructBlock + Sound ────────────────────────────────

function BlockDemo() {
  const [key, setKey] = useState(0);
  return (
    <Stack spacing={3} sx={{ maxWidth: 600 }}>
      <Button variant="outlined" size="small" onClick={() => setKey((k) => k + 1)} sx={{ alignSelf: 'flex-start' }}>
        Replay
      </Button>
      <ConstructBlock
        key={key}
        text="채용 시장은 디자인 엔지니어를 찾는데, 나는 Figma 안에서만 영향력이 있다. 시스템으로 사고하면 도구가 바뀌어도 유효하다."
        isTriggerOnView={false}
      />
    </Stack>
  );
}

export const BlockWithSound = {
  render: () => <BlockDemo />,
};

// ── Combined ──────────────────────────────────────────────

function CombinedDemo() {
  const [key, setKey] = useState(0);
  return (
    <Stack spacing={4} sx={{ maxWidth: 600 }}>
      <Button variant="outlined" size="small" onClick={() => setKey((k) => k + 1)} sx={{ alignSelf: 'flex-start' }}>
        Replay All
      </Button>
      <AreaConstruct key={`a-${key}`} isTriggerOnView={false}>
        <Placeholder.Media ratio="16/9" />
      </AreaConstruct>
      <ConstructBlock
        key={`b-${key}`}
        text="시스템으로 사고하면 도구가 바뀌어도 유효하다."
        isTriggerOnView={false}
        delay={600}
      />
    </Stack>
  );
}

export const Combined = {
  render: () => <CombinedDemo />,
};
