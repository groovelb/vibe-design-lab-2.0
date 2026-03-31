/**
 * Part 2-A — 왜 바이브 디자인인가
 */
import {
  SlideChapterTitle,
  SlideGrid,
  SlideHSplit,
  SlideImage,
  SlideMessage,
  SlideTypoStack,
  SlideList,
  SlideStorytelling,
} from '../../../../components/presentation';
import Box from '@mui/material/Box';
import { presentationTokens as t } from '../../../../styles/themes/presentation';

export const vibeDesignSlides = [
  {
    id: '2-A-1',
    // title: '바이브 코딩의 오해: 안드레이 캐퍼시의 암묵지',
    render: () => (
      <SlideChapterTitle
        overline="CHAPTER 02"
        title="바이브 디자인: 관점의 전환"
        summary="이 챕터에서는 바이브 디자인의 핵심 개념을 소개하고, 디자인 택소노미가 왜 중요한지 탐구합니다."
        toc={[
          '왜 바이브 디자인인가',
          '디자인 택소노미 활용법: 컴포넌트와 스타일의 분류 체계',
          '왜 프레임워크가 필요한가: 피그마와 React.js의 관계',
          '디자인 vs 개발 생태계 비교하기',
          '개발환경 세팅 & 익숙해지기',
        ]}
      />
    ),
  },
  {
    id: '2-A-2',
    title: '안드레이 캐퍼시의 암묵지',
    render: () => {
      const hl = { color: 'var(--vdl-50)', fontWeight: 700 };
      return (
        <SlideHSplit>
          <SlideStorytelling
            from="바이브 코딩을 어떻게 바라봐야 할까?"
            to={'바이브 코딩은 어렵습니다.\n왜 쉬워야 하죠??'}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${t.spacing.tight}px` }}>
            <Box
              component="img"
              src="/presentations/cursor-composer.jpg"
              alt="Cursor Composer UI"
              sx={{
                width: '100%',
                borderRadius: '8px',
                border: '1px solid var(--vdl-800)',
                objectFit: 'cover',
                maxHeight: '30%',
              }}
            />
            <Box sx={{ fontFamily: t.fontFamily.body, fontSize: t.typo.caption.fontSize, color: t.color.textSecondary }}>
              @karpathy · Feb 2025
            </Box>
            <Box
              sx={{
                fontFamily: t.fontFamily.body,
                fontSize: t.typo.body.fontSize - 2,
                lineHeight: 1.7,
                color: t.color.textSecondary,
              }}
            >
              There's a new kind of coding I call "vibe coding", where you{' '}
              <span style={hl}>fully give in to the vibes</span>, embrace exponentials, and{' '}
              <span style={hl}>forget that the code even exists</span>.
              {' '}I{' '}<span style={hl}>"Accept All" always</span>,{' '}
              <span style={hl}>I don't read the diffs anymore</span>.
              {' '}When I get error messages I just copy paste them in with no comment.
              {' '}<span style={hl}>The code grows beyond my usual comprehension</span>.
              {' '}I'm building a project or webapp, but{' '}
              <span style={hl}>it's not really coding</span>{' '}
              — I just see stuff, say stuff, run stuff, and copy paste stuff.
            </Box>
            <Box
              sx={{
                fontFamily: t.fontFamily.body,
                fontSize: t.typo.body.fontSize - 2,
                lineHeight: 1.7,
                color: t.color.textTertiary,
                borderTop: '1px solid var(--vdl-800)',
                pt: `${t.spacing.tight}px`,
              }}
            >
              "바이브 코딩"이라 부르는 새로운 코딩 방식이 있습니다.{' '}
              <span style={hl}>완전히 분위기에 몸을 맡기고</span>, 지수적 성장을 받아들이며,{' '}
              <span style={hl}>코드가 존재한다는 사실 자체를 잊는 거죠</span>.
              {' '}<span style={hl}>항상 "전부 수락"</span>을 누르고,{' '}
              <span style={hl}>변경사항을 더 이상 읽지 않습니다</span>.
              {' '}에러가 나면 그냥 복사해서 붙여넣습니다.
              {' '}<span style={hl}>코드가 제 이해 범위를 넘어섭니다</span>.
              {' '}프로젝트를 만들고 있지만{' '}
              <span style={hl}>사실 코딩이 아닙니다</span>{' '}
              — 그냥 보고, 말하고, 실행하고, 복사해서 붙여넣을 뿐이죠.
            </Box>
          </Box>
        </SlideHSplit>
      );
    },
  },
  {
    id: '2-A-3',
    // title: '모두의 바이브는 다릅니다',
    render: () => (
      <SlideHSplit>
        <SlideStorytelling
          from="그는 코드를 읽지 않습니다"
          to="이미 읽을 수 있기 때문이죠"
        />
        <SlideTypoStack
          headline="모두의 바이브는 다릅니다"
          body={'"Accept All" 위에는 30년의 컴퓨터 과학이 있습니다.\n바이브는 축적된 전문성의 다른 이름이죠.'}
        />
      </SlideHSplit>
    ),
  },
  {
    id: '2-A-4',
    title: '바이브 코딩에 대한 오해와 진실',
    render: () => (
      <SlideGrid columns={2} sx={{ alignContent: 'center', gridTemplateRows: 'none', '& > *': { justifySelf: 'center', alignSelf: 'center' } }}>
        <SlideTypoStack
          headline="수익화랑 관계 없습니다"
          body="→ 작업 효율을 높여줄 뿐입니다."
        />
        <SlideTypoStack
          headline="프로그래밍 지식이 필요합니다"
          body="→ 만들면서 배울 수 있습니다."
        />
        <SlideTypoStack
          headline="바이브 코딩은 퀄리티가 낮다?"
          body="→ 지시를 제대로 못했을 뿐입니다."
        />
        <SlideTypoStack
          headline="코드를 100% 몰라도 된다?"
          body="→ 자연어와 코드의 연관성을 이해해야 합니다."
        />
      </SlideGrid>
    ),
  },
  {
    id: '2-A-5',
    title: '프로그래밍 언어의 추상화 과정',
    render: () => (
      <SlideGrid columns={4} sx={{ alignContent: 'center', gridTemplateRows: 'none' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${t.spacing.tight}px` }}>
          <SlideImage src="/presentations/generated/abstraction-punch-card_v2.webp" alt="천공카드의 시대" ratio="1/1" />
          <SlideTypoStack
            headline="천공카드의 시대"
            body="010101010... 인간이 기계의 언어를 학습. 노동에 가까운 프로그래밍"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${t.spacing.tight}px` }}>
          <SlideImage src="/presentations/generated/abstraction-compiler_v2.webp" alt="컴파일러 등장" ratio="1/1" />
          <SlideTypoStack
            headline="컴파일러 등장"
            body="0101 → ADD. 자주 사용하는 기계어를 기호화. 인간과 기계 사이의 통역사 역할"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${t.spacing.tight}px` }}>
          <SlideImage src="/presentations/generated/abstraction-modern-prog_v2.webp" alt="현대 프로그래밍" ratio="1/1" />
          <SlideTypoStack
            headline="현대 프로그래밍"
            body="기계적 절차 → 인간의 논리 구조. 모듈화, 메모리, 함수 개념 등장"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${t.spacing.tight}px` }}>
          <SlideImage src="/presentations/generated/abstraction-vibe-coding_v2.webp" alt="바이브 코딩" ratio="1/1" />
          <SlideTypoStack
            headline="바이브 코딩"
            body="자연어로 컴파일 오류가 없는 코드를 생성. 어떻게 연결시킬 것인가의 문제만 남음"
          />
        </Box>
      </SlideGrid>
    ),
  },
  {
    id: '2-A-6',
    title: '맥락적 오류 VS 컴파일 오류',
    render: () => (
      <SlideHSplit>
        <SlideTypoStack
          title="맥락적 오류"
          body="의도와 결과의 불일치입니다. 코드는 돌아가지만 디자인 의도가 구현되지 않은 상태죠."
        />
        <SlideTypoStack
          title="컴파일 오류"
          body="문법 오류입니다. AI가 즉시 수정 가능하죠. 진짜 문제가 아닙니다."
        />
      </SlideHSplit>
    ),
  },
  {
    id: '2-A-7',
    title: '바이브 디자인이란',
    render: () => (
      <SlideMessage>"디자인 의도를 체계적 언어로 전달하는 것"</SlideMessage>
    ),
  },
  {
    id: '2-A-8',
    title: '디자인 택소노미 소개',
    render: () => (
      <SlideHSplit>
        <SlideTypoStack
          title="디자인은 항상 체계였다"
          subtitle="디자인 택소노미"
          body="포화상태 분류체계 — 새로운 UI 패턴이 등장해도 체계 안에서 설명 가능합니다."
        />
        <SlideList
          items={[
            'Typography', 'Container', 'Card', 'Media', 'Data Display',
            'In-page Navigation', 'Input & Control', 'Layout',
            'Overlay & Feedback', 'Navigation (Global)',
          ]}
          variant="number"
          level="body"
        />
      </SlideHSplit>
    ),
  },
  {
    id: '2-A-9',
    title: 'UX 디자인이 바이브 디자인이 되기까지',
    render: () => (
      <SlideStorytelling
        from="UX 디자인: 사용자 경험을 설계합니다"
        to="바이브 디자인: 의도를 체계적 언어로 전달합니다"
        arrowLabel="진화"
      />
    ),
  },
];
