'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SlideMaster } from './SlideMaster';
import { SlideChapterTitle } from './layouts/SlideChapterTitle';
import { SlideHSplit } from './layouts/SlideHSplit';
import { SlideMessage } from './layouts/SlideMessage';
import { SlideTitle } from './elements/SlideTitle';
import { SlideTypoStack } from './elements/SlideTypoStack';
import { SlideList } from './elements/SlideList';
import { SlideStorytelling } from './elements/SlideStorytelling';
import { presentationTokens as t } from '../../styles/themes/presentation';

export default {
  title: 'Component/Presentation/Shell/SlideMaster',
  component: SlideMaster,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    breadcrumb: { control: 'object', description: '브레드크럼 { section, chapter, part }' },
    slideIndex: { control: { type: 'number', min: 1 }, description: '현재 슬라이드 번호' },
    totalSlides: { control: { type: 'number', min: 1 }, description: '전체 슬라이드 수' },
    onPrev: { action: 'prev', description: '이전 슬라이드 핸들러' },
    onNext: { action: 'next', description: '다음 슬라이드 핸들러' },
  },
};

export const Docs = {
  args: {
    breadcrumb: { section: 'S2. 관점의 전환', chapter: 'Ch2', part: 'Part A' },
    slideIndex: 3,
    totalSlides: 12,
  },
  render: (args) => (
    <SlideMaster {...args}>
      <SlideChapterTitle
        overline="CHAPTER 02"
        title="바이브 디자인: 관점의 전환"
        summary="이 챕터에서는 바이브 디자인의 핵심 개념을 소개합니다."
        toc={['왜 바이브 디자인인가', '디자인 택소노미 활용법', '프레임워크가 필요한 이유']}
      />
    </SlideMaster>
  ),
};

/** 슬라이드 간 네비게이션 데모 */
export const NavigationDemo = {
  render: () => {
    const slides = [
      {
        breadcrumb: { section: 'S1. 프롤로그', chapter: 'Ch1', part: 'Part A' },
        content: (
          <SlideChapterTitle
            overline="CHAPTER 01"
            title="디자인의 본질은 도구일까, 의도일까?"
            summary="10년간의 디발자: 디자이너이자 개발자로서 깨달은 것"
          />
        ),
      },
      {
        breadcrumb: { section: 'S1. 프롤로그', chapter: 'Ch1', part: 'Part A' },
        content: (
          <SlideStorytelling
            from="도구가 바뀌면 무엇이 남는가?"
            to="디자인 언어 체계가 남는다"
          />
        ),
      },
      {
        breadcrumb: { section: 'S2. 관점의 전환', chapter: 'Ch2', part: 'Part A' },
        content: (
          <SlideHSplit>
            <SlideTypoStack
              title="바이브코딩에 대한 오해"
              body="캐퍼시의 암묵지 — 도구 숙련도가 아니라 디자인 언어 체계의 이해가 핵심."
            />
            <SlideList
              items={[
                '맥락적 오류 vs 컴파일 오류',
                '의도를 쪼개는 능력',
                '디자인 택소노미의 활용',
              ]}
              level="headline"
            />
          </SlideHSplit>
        ),
      },
      {
        breadcrumb: { section: 'S2. 관점의 전환', chapter: 'Ch2', part: 'Part B' },
        content: (
          <SlideMessage>"디자인은 항상 체계였다"</SlideMessage>
        ),
      },
    ];

    const [idx, setIdx] = useState(0);
    const current = slides[idx];

    return (
      <SlideMaster
        breadcrumb={current.breadcrumb}
        slideIndex={idx + 1}
        totalSlides={slides.length}
        onPrev={() => setIdx((p) => Math.max(0, p - 1))}
        onNext={() => setIdx((p) => Math.min(slides.length - 1, p + 1))}
        drawerContent={
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {slides.map((s, i) => (
              <Typography
                key={i}
                variant="caption"
                onClick={() => setIdx(i)}
                sx={{
                  cursor: 'pointer',
                  p: 0.5,
                  color: i === idx ? t.color.accent : t.color.textSecondary,
                  '&:hover': { color: t.color.text },
                }}
              >
                {i + 1}. {s.breadcrumb.part}
              </Typography>
            ))}
          </Box>
        }
      >
        {current.content}
      </SlideMaster>
    );
  },
};
