/**
 * Part 2-A — 왜 바이브 디자인인가
 */
import {
  SlideChapterTitle,
  SlideDescList,
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${t.spacing.text}px` }}>
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
                pt: `${t.spacing.text}px`,
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
          to="이미 어떻게 될지 예측이 가능했기 때문이죠"
        />
        <SlideTypoStack
          headline="모두의 암묵지(바이브)는 다릅니다."
          body={`"Accept All" 위에는 탑 클래스 개발자의 20년 경험이 있습니다. 코드를 안 써도 어떻게 시켜야 원하는 결과물이 나올지 예측 가능한 사람과, 처음 배우는 사람의 접근은 당연히 달라야 합니다. \n \n  내가 던진 말(자연어)이 코드에서 어떤 결과를 만드는지 이해하고, 그 감각을 점차 체화시키는 것. 이 코스는 거기서 시작합니다.`}
        />
      </SlideHSplit>
    ),
  },
  {
    id: '2-A-4',
    title: '바이브 코딩에 대한 오해와 진실',
    render: () => (
      <SlideGrid columns={2} sx={{ gridTemplateRows: '1fr 1fr', '& > *': { justifySelf: 'center', alignSelf: 'center' } }}>
        <SlideTypoStack
          headline="수익화랑 관계 없습니다"
          body={'→ 작업 효율을 높여줄 뿐입니다.\n돈 버는 도구가 아니라 방법론입니다.'}
        />
        <SlideTypoStack
          headline="프로그래밍 지식이 필요합니다"
          body={'→ 만들면서 배울 수 있습니다.\n기초 없이 시작하되, 과정에서 자연스럽게 익힙니다.'}
        />
        <SlideTypoStack
          headline="바이브 코딩은 퀄리티가 낮다?"
          body={'→ 지시를 제대로 못했을 뿐입니다.\n도구가 아니라 지시의 정밀도가 퀄리티를 결정합니다.'}
        />
        <SlideTypoStack
          headline="코드를 어디까지 알아야 하나요?"
          body={'→ 자연어와 코드의 연관성을 이해해야 합니다.\n외울 필요는 없지만, 구조를 읽는 감각은 필요합니다.'}
        />
      </SlideGrid>
    ),
  },
  {
    id: '2-A-5',
    title: '프로그래밍 언어의 추상화 과정',
    render: () => (
      <SlideGrid columns={4} sx={{ alignContent: 'center', gridTemplateRows: 'none' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${t.spacing.text}px` }}>
          <SlideImage src="/presentations/generated/abstraction-punch-card_v3.webp" alt="천공카드의 시대" ratio="1/1" />
          <SlideTypoStack
            headline="천공카드의 시대"
            body="010101010... 인간이 기계의 언어를 학습. 노동에 가까운 프로그래밍"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${t.spacing.text}px` }}>
          <SlideImage src="/presentations/generated/abstraction-compiler_v3.webp" alt="컴파일러 등장" ratio="1/1" />
          <SlideTypoStack
            headline="컴파일러 등장"
            body="0101 → ADD. 자주 사용하는 기계어를 기호화. 인간과 기계 사이의 통역사 역할"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${t.spacing.text}px` }}>
          <SlideImage src="/presentations/generated/abstraction-modern-prog_v3.webp" alt="현대 프로그래밍" ratio="1/1" />
          <SlideTypoStack
            headline="현대 프로그래밍"
            body="기계적 절차 → 인간의 논리 구조. 모듈화, 메모리, 함수 개념 등장"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${t.spacing.text}px` }}>
          <SlideImage src="/presentations/generated/abstraction-vibe-coding_v3.webp" alt="바이브 코딩" ratio="1/1" />
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
    title: '"누구나 개발을 할 수 있다"의 진짜 의미',
    render: () => (
      <SlideStorytelling
        from={'"누구나 개발을 할 수 있다"의 진짜 의미'}
        to="누구나 컴파일러를 통과할 수 있다"
      />
    ),
  },
  {
    id: '2-A-7',
    title: '5분 실습: 글래스모피즘 날씨 대시보드',
    render: () => (
      <SlideHSplit>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${t.spacing.group}px` }}>
          <SlideTypoStack
            title="5분 실습"
            headline="글래스모피즘 날씨 대시보드"
          />
          <Box
            sx={{
              fontFamily: t.fontFamily.body,
              fontSize: t.typo.body.fontSize,
              lineHeight: t.typo.body.lineHeight,
              color: t.color.textSecondary,
              whiteSpace: 'pre-line',
              p: `${t.spacing.group}px`,
              border: '1px solid var(--vdl-700)',
              borderRadius: '8px',
              bgcolor: 'var(--vdl-900)',
            }}
          >
            {'"글래스모피즘 스타일의 날씨 대시보드를 만들어줘\n정보 우선순위 → 레이아웃 분할에 반영\n글래스모피즘에 어울리는 아이콘 세트\n넓은 화이트 스페이스 → 글래스모피즘 효과 극대화\n배경에 현재 날씨에 해당되는 사진 적용"'}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: `${t.spacing.group}px`, height: '100%' }}>
          {[
            { name: 'Claude', href: 'https://claude.ai', viewBox: '0 0 16 16', d: 'm3.127 10.604 3.135-1.76.053-.153-.053-.085H6.11l-.525-.032-1.791-.048-1.554-.065-1.505-.08-.38-.081L0 7.832l.036-.234.32-.214.455.04 1.009.069 1.513.105 1.097.064 1.626.17h.259l.036-.105-.089-.065-.068-.064-1.566-1.062-1.695-1.121-.887-.646-.48-.327-.243-.306-.104-.67.435-.48.585.04.15.04.593.456 1.267.981 1.654 1.218.242.202.097-.068.012-.049-.109-.181-.9-1.626-.96-1.655-.428-.686-.113-.411a2 2 0 0 1-.068-.484l.496-.674L4.446 0l.662.089.279.242.411.94.666 1.48 1.033 2.014.302.597.162.553.06.17h.105v-.097l.085-1.134.157-1.392.154-1.792.052-.504.25-.605.497-.327.387.186.319.456-.045.294-.19 1.23-.37 1.93-.243 1.29h.142l.161-.16.654-.868 1.097-1.372.484-.545.565-.601.363-.287h.686l.505.751-.226.775-.707.895-.585.759-.839 1.13-.524.904.048.072.125-.012 1.897-.403 1.024-.186 1.223-.21.553.258.06.263-.218.536-1.307.323-1.533.307-2.284.54-.028.02.032.04 1.029.098.44.024h1.077l2.005.15.525.346.315.424-.053.323-.807.411-3.631-.863-.872-.218h-.12v.073l.726.71 1.331 1.202 1.667 1.55.084.383-.214.302-.226-.032-1.464-1.101-.565-.497-1.28-1.077h-.084v.113l.295.432 1.557 2.34.08.718-.112.234-.404.141-.444-.08-.911-1.28-.94-1.44-.759-1.291-.093.053-.448 4.821-.21.246-.484.186-.403-.307-.214-.496.214-.98.258-1.28.21-1.016.19-1.263.112-.42-.008-.028-.092.012-.953 1.307-1.448 1.957-1.146 1.227-.274.109-.477-.247.045-.44.266-.39 1.586-2.018.956-1.25.617-.723-.004-.105h-.036l-4.212 2.736-.75.096-.324-.302.04-.496.154-.162 1.267-.871z' },
            { name: 'Gemini', href: 'https://gemini.google.com', viewBox: '0 0 65 65', d: 'M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z' },
            { name: 'ChatGPT', href: 'https://chatgpt.com', viewBox: '0 0 16 16', d: 'M14.949 6.547a3.94 3.94 0 0 0-.348-3.273 4.11 4.11 0 0 0-4.4-1.934A4.1 4.1 0 0 0 8.423.2 4.15 4.15 0 0 0 6.305.086a4.1 4.1 0 0 0-1.891.948 4.04 4.04 0 0 0-1.158 1.753 4.1 4.1 0 0 0-1.563.679A4 4 0 0 0 .554 4.72a3.99 3.99 0 0 0 .502 4.731 3.94 3.94 0 0 0 .346 3.274 4.11 4.11 0 0 0 4.402 1.933c.382.425.852.764 1.377.995.526.231 1.095.35 1.67.346 1.78.002 3.358-1.132 3.901-2.804a4.1 4.1 0 0 0 1.563-.68 4 4 0 0 0 1.14-1.253 3.99 3.99 0 0 0-.506-4.716m-6.097 8.406a3.05 3.05 0 0 1-1.945-.694l.096-.054 3.23-1.838a.53.53 0 0 0 .265-.455v-4.49l1.366.778q.02.011.025.035v3.722c-.003 1.653-1.361 2.992-3.037 2.996m-6.53-2.75a2.95 2.95 0 0 1-.36-2.01l.095.057L5.29 12.09a.53.53 0 0 0 .527 0l3.949-2.246v1.555a.05.05 0 0 1-.022.041L6.473 13.3c-1.454.826-3.311.335-4.15-1.098m-.85-6.94A3.02 3.02 0 0 1 3.07 3.949v3.785a.51.51 0 0 0 .262.451l3.93 2.237-1.366.779a.05.05 0 0 1-.048 0L2.585 9.342a2.98 2.98 0 0 1-1.113-4.094zm11.216 2.571L8.747 5.576l1.362-.776a.05.05 0 0 1 .048 0l3.265 1.86a3 3 0 0 1 1.173 1.207 2.96 2.96 0 0 1-.27 3.2 3.05 3.05 0 0 1-1.36.997V8.279a.52.52 0 0 0-.276-.445m1.36-2.015-.097-.057-3.226-1.855a.53.53 0 0 0-.53 0L6.249 6.153V4.598a.04.04 0 0 1 .019-.04L9.533 2.7a3.07 3.07 0 0 1 3.257.139c.474.325.843.778 1.066 1.303.223.526.289 1.103.191 1.664zM5.503 8.575 4.139 7.8a.05.05 0 0 1-.026-.037V4.049c0-.57.166-1.127.476-1.607s.752-.864 1.275-1.105a3.08 3.08 0 0 1 3.234.41l-.096.054-3.23 1.838a.53.53 0 0 0-.265.455zm.742-1.577 1.758-1 1.762 1v2l-1.755 1-1.762-1z' },
          ].map(({ name, href, viewBox, d }) => (
            <Box
              key={name}
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                color: t.color.text,
                fontFamily: t.fontFamily.body,
                fontSize: t.typo.body.fontSize,
                '&:hover': { color: t.color.accent },
              }}
            >
              <svg width="28" height="28" viewBox={viewBox} fill="currentColor"><path d={d} /></svg>
              {name}
            </Box>
          ))}
        </Box>
      </SlideHSplit>
    ),
  },
  {
    id: '2-A-8',
    title: 'AI는 프롬프트를 어떻게 해석하는가',
    render: () => {
      const footer = {
        title: '의도의 정밀도는 다르지만, "어쨌든" 컴파일러를 통과시켜 줍니다.',
        note: '* 엄밀히 말하면 AI는 컴파일러가 아니라 파서(parser)에 가깝습니다. 컴파일러는 문법 규칙에 따라 코드를 변환하지만, AI는 자연어의 의미를 해석(parse)해서 코드를 생성합니다. 규칙 기반이 아니라 확률 기반이라는 차이가 있죠.',
      };
      const rows = [
        {
          prompt: '"글래스모피즘 스타일"',
          status: 'confident',
          interpretation: '이미 학습된 시각적 패턴. backdrop-filter, 반투명 배경, 블러 등 CSS 속성에 정확히 매핑.',
        },
        {
          prompt: '"날씨 대시보드를 만들어줘"',
          status: 'guessing',
          interpretation: '정확한 기획이 없으므로 AI가 임의로 UI를 구성. 온도, 습도, 풍속 등 "그럴듯한" 배치.',
        },
        {
          prompt: '"정보 우선순위 → 레이아웃 분할에 반영"',
          status: 'partial',
          interpretation: '"우선순위"의 기준을 모르므로 일반적인 대시보드 관행에 따라 크기를 배분.',
        },
        {
          prompt: '"글래스모피즘에 어울리는 아이콘 세트"',
          status: 'confident',
          interpretation: '선형(line) 아이콘, 얇은 스트로크, 단색. 글래스모피즘과의 조합은 학습 데이터에 풍부.',
        },
        {
          prompt: '"넓은 화이트 스페이스"',
          status: 'partial',
          interpretation: '"넓은"의 정도가 모호. padding/gap을 평균보다 크게 잡지만 의도와 다를 수 있음.',
        },
        {
          prompt: '"배경에 현재 날씨 사진 적용"',
          status: 'guessing',
          interpretation: '"현재 날씨"를 판단할 수 없으므로 placeholder 이미지 또는 하드코딩된 예시 사용.',
        },
      ];
      const statusColor = { confident: 'var(--vdl-100)', partial: 'var(--vdl-400)', guessing: 'var(--vdl-600)' };
      const statusLabel = { confident: '정확', partial: '모호', guessing: '추측' };
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${t.spacing.text}px`, height: '100%', justifyContent: 'center' }}>
          {/* 컴파일러/파서 설명 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${t.spacing.text}px`, mb: `${t.spacing.group}px` }}>
            <Box sx={{
              fontFamily: t.fontFamily.heading,
              fontSize: t.typo.body.fontSize,
              fontWeight: 600,
              color: t.color.text,
              lineHeight: 1.6,
            }}>
              {footer.title}
            </Box>
            <Box sx={{
              fontFamily: t.fontFamily.body,
              fontSize: t.typo.caption.fontSize,
              color: t.color.textSecondary,
              lineHeight: 1.6,
            }}>
              {footer.note}
            </Box>
          </Box>
          {rows.map((row, i) => (
            <Box
              key={i}
              sx={{
                display: 'grid',
                gridTemplateColumns: '56px 1fr 1fr',
                gap: `${t.spacing.group}px`,
                alignItems: 'center',
                py: `${t.spacing.text}px`,
                borderBottom: i < rows.length - 1 ? '1px solid var(--vdl-800)' : 'none',
              }}
            >
              <Box sx={{
                fontFamily: t.fontFamily.body,
                fontSize: t.typo.caption.fontSize,
                fontWeight: 600,
                color: statusColor[row.status],
                textAlign: 'center',
              }}>
                {statusLabel[row.status]}
              </Box>
              <Box sx={{
                fontFamily: t.fontFamily.body,
                fontSize: t.typo.body.fontSize - 2,
                fontWeight: 600,
                color: t.color.text,
              }}>
                {row.prompt}
              </Box>
              <Box sx={{
                fontFamily: t.fontFamily.body,
                fontSize: t.typo.body.fontSize - 2,
                color: t.color.textSecondary,
                lineHeight: 1.5,
              }}>
                → {row.interpretation}
              </Box>
            </Box>
          ))}
        </Box>
      );
    },
  },
  {
    id: '2-A-9',
    title: '바이브 코딩 이전의 프로그래밍 오류',
    render: () => (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <SlideTypoStack
          title="바이브 코딩 이전의 프로그래밍 오류"
          subtitle={'"컴파일러가 던지는 경고들 → 프로그래밍이 어려운 이유"'}
        />
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <SlideHSplit columns={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `${t.spacing.text}px` }}>
              <Box component="img" src="/presentations/generated/error-syntax_v1.webp" alt="Syntax Error" sx={{ width: '60%' }} />
              <SlideTypoStack headline="Syntax Error" body="문법이 틀려서 발생하는 오류." />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `${t.spacing.text}px` }}>
              <Box component="img" src="/presentations/generated/error-semantic_v1.webp" alt="Semantic Error" sx={{ width: '60%' }} />
              <SlideTypoStack headline="Semantic Error" body="의미에 맞지 않는 변수 활용" />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `${t.spacing.text}px` }}>
              <Box component="img" src="/presentations/generated/error-linker_v1.webp" alt="Linker Error" sx={{ width: '60%' }} />
              <SlideTypoStack headline="Linker Error" body="필요한 부품들을 연결하지 못할때" />
            </Box>
          </SlideHSplit>
        </Box>
      </Box>
    ),
  },
  {
    id: '2-A-10',
    title: '바이브 코딩 이후의 프로그래밍 오류',
    render: () => (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <SlideTypoStack
          title="바이브 코딩 이후의 프로그래밍 오류"
          subtitle={'"맥락적 오류가 쌓이는 속도가 빨라짐"'}
        />
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <SlideHSplit columns={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `${t.spacing.text}px` }}>
              <Box component="img" src="/presentations/generated/error-intent-drift_v2.webp" alt="의도의 이탈" sx={{ width: '60%' }} />
              <SlideTypoStack headline="의도의 이탈" />
              <SlideList gap={4} items={['의도가 부족하거나', '내가 설명을 잘 못하거나', 'AI자체의 확증편향도 적용']} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `${t.spacing.text}px` }}>
              <Box component="img" src="/presentations/generated/error-fragmented_v1.webp" alt="파편화된 일관성" sx={{ width: '60%' }} />
              <SlideTypoStack headline="파편화된 일관성" />
              <SlideList gap={4} items={['기능적, 시각적 일관성 언급 X', '전체 설계도가 없는 상태', '서로 상충되는 결정을 수락']} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `${t.spacing.text}px` }}>
              <Box component="img" src="/presentations/generated/error-tech-debt_v1.webp" alt="은패된 기술 부채" sx={{ width: '60%' }} />
              <SlideTypoStack headline="은패된 기술 부채" />
              <SlideList gap={4} items={['무조건적인 수락', '단기적인 작업에 과몰입', '실수를 과도한 방법으로 억제']} />
            </Box>
          </SlideHSplit>
        </Box>
      </Box>
    ),
  },
  {
    id: '2-A-11',
    title: '맥락적 오류 VS 컴파일 오류',
    render: () => (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <SlideTypoStack
          title="맥락적 오류 VS 컴파일 오류"
          subtitle="여러분이 진짜 집중해야 할 건 맥락적 오류입니다."
        />
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <SlideHSplit>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${t.spacing.group}px` }}>
              <SlideTypoStack
                headline="맥락적 오류 → 내가 주도"
                body={'의도와 결과의 불일치입니다.\n코드는 작동하지만, 디자인 의도가 반영되지 않은 상태죠.'}
              />
              <SlideList
                items={[
                  '의도의 이탈 — 설명이 부족하거나 부정확할 때',
                  '파편화된 일관성 — 전체 설계도 없이 부분만 수락할 때',
                  '은폐된 기술 부채 — 실수를 과도한 방법으로 억제할 때',
                ]}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${t.spacing.group}px` }}>
              <SlideTypoStack
                headline="컴파일 오류 → AI에게 위임"
                body={'문법 오류입니다.\n현상과 오류 메시지만 전달하면 AI가 해결합니다.'}
              />
              <SlideList
                items={[
                  'Syntax Error — 문법 규칙 위반',
                  'Semantic Error — 변수/타입 불일치',
                  'Linker Error — 모듈 연결 실패',
                ]}
              />
            </Box>
          </SlideHSplit>
        </Box>
      </Box>
    ),
  },
  {
    id: '2-A-12',
    title: '바이브 디자인이란',
    render: () => (
      <SlideHSplit>
        <SlideTypoStack
          title="바이브 디자인"
          subtitle="바이브 코딩 환경에서 디자인 의도를 체계적 언어로 전달하는 방법론"
          body={'결과물의 품질을 결정하는 건 도구의 성능이 아니라\n언어의 정밀도입니다.'}
        />
        <SlideDescList
          items={[
            { title: '① 구현은 언어를 따른다', desc: '도구가 바뀌어도 정밀한 언어는 정밀한 결과를 만듭니다.' },
            { title: '② 언어는 경험을 함축한다', desc: '하나의 디자인 키워드에 수십 개의 설계 결정이 압축되어 있습니다.' },
            { title: '③ 감각도 쪼개면 로직이다', desc: '감성 영역도 분해하면 명명 가능한 결정들의 조합입니다.' },
          ]}
        />
      </SlideHSplit>
    ),
  },
  {
    id: '2-A-13',
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
    id: '2-A-14',
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
