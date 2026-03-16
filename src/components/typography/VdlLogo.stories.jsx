import { useState } from 'react';
import { VdlLogo } from './VdlLogo';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default {
  title: 'Component/1. Typography/VdlLogo',
  component: VdlLogo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## VdlLogo

VIBE DESIGN LAB 브랜드 로고 컴포넌트. Inter Black(900) 기반.

### 핵심 기능
- **타이핑 애니메이션**: \`isExtend\` 토글 시 V ↔ VIBE DESIGN LAB 타이핑 효과로 전환
- **블링킹 커서**: 축소 상태에서 커서 깜빡임, 확장 완료 후 페이드아웃
- **사이즈 조절**: \`size\` prop으로 폰트 크기(px) 제어, 커서도 비례 스케일링
- **접근성**: \`prefers-reduced-motion\` 감지 시 애니메이션 없이 즉시 전환

### 용도
- GNB 로고
- 히어로 섹션 브랜드 마크
- 로딩/스플래시 인트로 연출
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 10, max: 72, step: 1 },
      description: '폰트 크기 (px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '18' },
      },
    },
    isExtend: {
      control: 'boolean',
      description: '전체 텍스트 펼침 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

/** 기본 사용 — 확장 상태 */
export const Default = {
  args: {
    size: 18,
    isExtend: true,
  },
};

/** 축소 상태 — V + 블링킹 커서 */
export const Collapsed = {
  args: {
    size: 18,
    isExtend: false,
  },
};

/** 사이즈 스케일 비교 */
export const Sizes = {
  args: {
    isExtend: true,
  },
  render: ({ isExtend }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
      {[12, 16, 18, 24, 36, 48, 64].map((s) => (
        <Box key={s} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', width: 40, textAlign: 'right' }}>
            {s}px
          </Typography>
          <VdlLogo size={s} isExtend={isExtend} />
        </Box>
      ))}
    </Box>
  ),
};

/**
 * 타이핑 인터랙션 데모
 *
 * 버튼을 눌러 V ↔ VIBE DESIGN LAB 전환 애니메이션을 확인한다.
 * 타이핑 50ms/char, 삭제 30ms/char.
 */
export const TypingDemo = {
  args: {
    size: 32,
  },
  render: ({ size }) => {
    const [isExtend, setIsExtend] = useState(false);
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
        <VdlLogo size={size} isExtend={isExtend} />
        <Button
          variant="outlined"
          size="small"
          onClick={() => setIsExtend((v) => !v)}
        >
          {isExtend ? 'Collapse' : 'Extend'}
        </Button>
      </Box>
    );
  },
};
