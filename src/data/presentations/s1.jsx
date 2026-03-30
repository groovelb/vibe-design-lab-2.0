/**
 * S1 덱 정의
 *
 * 구조: chapters > parts > slides
 * 각 slide = { id, title, render }
 * render: () => JSX — 레이아웃 + 엘리먼트 직접 조합
 *
 * 기반: vdsk_online_curriculum.json S1
 */
import {
  SlideChapterTitle,
  SlideHSplit,
  SlideGrid,
  SlideMessage,
  SlideTypoStack,
  SlideList,
  SlideStorytelling,
} from '../../components/presentation';
import Placeholder from '../../common/ui/Placeholder';

export const S1 = {
  id: 'S1',
  title: '바이브 디자인: 새로운 사고에 적응하기',
  chapters: [
    // ─── Ch1: 프롤로그 ───
    {
      id: 'Ch1',
      title: '디자인의 본질은 도구일까, 의도일까?',
      parts: [
        {
          id: 'S1-P-A',
          title: '10년간의 디발자: 디자이너이자 개발자로서 깨달은 것',
          slides: [
            {
              id: 'S1-P-A-0',
              title: '프롤로그',
              render: () => (
                <SlideChapterTitle
                  overline="PROLOGUE"
                  title="디자인의 본질은 도구일까, 의도일까?"
                  summary="10년간의 디발자: 디자이너이자 개발자로서 깨달은 것"
                  toc={[
                    '10년간 디발자 생활 요약',
                    '회사생활 요약',
                    '왜 의도를 쪼개야 하는가',
                    '언어는 경험을 함축한다',
                    '글로 디자인하는 시대',
                  ]}
                />
              ),
            },
            {
              id: 'S1-P-A-1',
              title: '10년간 디발자 생활 요약',
              render: () => (
                <SlideHSplit>
                  <SlideTypoStack
                    title="10년간의 디발자 생활"
                    subtitle="포트폴리오가 없었다"
                    body="2년간의 취준생 생활. 디자인을 독학하고, 포트폴리오를 직접 개발했다. 그 결과물이 Project Styria — 처음으로 세상에 내놓은 웹사이트."
                  />
                  <Placeholder.Box label="Project Styria 스크린샷" />
                </SlideHSplit>
              ),
            },
            {
              id: 'S1-P-A-2',
              title: '회사생활 요약',
              render: () => (
                <SlideHSplit>
                  <SlideTypoStack
                    headline="첫 번째 회사"
                    body="디자인과 개발을 반복하는 노동자였다. 시키는 대로 만들고, 시키는 대로 고쳤다."
                  />
                  <SlideTypoStack
                    headline="두 번째 회사"
                    body="디자인 시스템을 주도했다. 차이점은 명확했다 — 의도와 디자인과 개발의 관계를 설계하는 것."
                  />
                </SlideHSplit>
              ),
            },
            {
              id: 'S1-P-A-3',
              title: '왜 의도를 쪼개야 하는가',
              render: () => (
                <SlideHSplit>
                  <SlideTypoStack
                    title="왜 의도를 쪼개야 하는가"
                    body="사람끼리 일할 때는 해석의 여지가 있는 정보가 티나지 않는다. AI와 일할 때는 의도의 명확성과 모호함 모두가 증폭된다."
                  />
                  <SlideList
                    items={[
                      '사람: 해석의 여지 → 자연스럽게 보완',
                      'AI: 명확한 의도 → 정확하게 증폭',
                      'AI: 모호한 의도 → 엉뚱하게 증폭',
                      '→ 변하지 않는 큰 목적을 정하고, 세부 의도를 나누는 훈련이 필요',
                    ]}
                    level="headline"
                  />
                </SlideHSplit>
              ),
            },
            {
              id: 'S1-P-A-4',
              title: '언어는 경험을 함축한다',
              render: () => (
                <SlideHSplit>
                  <SlideStorytelling
                    from="'button'은 고작 6bit 데이터 덩어리"
                    to="인간의 경험과 역사가 응축된 언어"
                  />
                  <SlideTypoStack
                    headline="대표성 있는 언어"
                    body="이런 대표성 있는 언어를 조합해서 우리의 의도를 AI에게 전달해야 한다. 단어 하나에 담긴 맥락이 AI의 해석 품질을 결정한다."
                  />
                </SlideHSplit>
              ),
            },
            {
              id: 'S1-P-A-5',
              title: '글로 디자인하는 시대',
              render: () => (
                <SlideHSplit>
                  <SlideStorytelling
                    from="디자인 감각이 부족해서 항상 글로 정리해왔다"
                    to="지금은 이 습관이 최대 장점이 되었다"
                  />
                  <SlideTypoStack
                    headline="이 코스는"
                    body="지난 커리어 10년의 노하우를 바이브 코딩 환경에 녹인 것이다. 도구가 바뀌어도 유효한 디자인 언어 체계를 함께 만들어간다."
                  />
                </SlideHSplit>
              ),
            },
          ],
        },
      ],
    },

    // ─── Ch2: 관점의 전환 ───
    {
      id: 'Ch2',
      title: '바이브 디자인: 관점의 전환',
      parts: [
        {
          id: '2-A',
          title: '왜 바이브 디자인인가',
          slides: [
            {
              id: '2-A-1',
              title: '코스 로드맵 + 4섹션 구조 안내',
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
              title: '바이브코딩에 대한 오해: 캐퍼시의 암묵지',
              render: () => (
                <SlideHSplit>
                  <SlideTypoStack
                    title="바이브코딩에 대한 오해"
                    body="캐퍼시의 암묵지 — 도구 숙련도가 아니라 디자인 언어 체계의 이해가 핵심."
                  />
                  <SlideList
                    items={[
                      '도구를 잘 다루는 것 ≠ 디자인을 잘 아는 것',
                      '암묵지: 경험으로만 전달되던 판단 기준',
                      '바이브코딩: 암묵지를 언어로 명시화하는 과정',
                    ]}
                    level="headline"
                  />
                </SlideHSplit>
              ),
            },
            {
              id: '2-A-3',
              title: '맥락적 오류 VS 컴파일 오류',
              render: () => (
                <SlideHSplit>
                  <SlideTypoStack
                    title="맥락적 오류"
                    body="의도와 결과의 불일치. 코드는 돌아가지만 디자인 의도가 구현되지 않은 상태."
                  />
                  <SlideTypoStack
                    title="컴파일 오류"
                    body="문법 오류. AI가 즉시 수정 가능. 진짜 문제가 아니다."
                  />
                </SlideHSplit>
              ),
            },
            {
              id: '2-A-4',
              title: '바이브 디자인이란',
              render: () => (
                <SlideMessage>"디자인 의도를 체계적 언어로 전달하는 것"</SlideMessage>
              ),
            },
            {
              id: '2-A-5',
              title: '디자인 택소노미 소개',
              render: () => (
                <SlideHSplit>
                  <SlideTypoStack
                    title="디자인은 항상 체계였다"
                    subtitle="디자인 택소노미"
                    body="포화상태 분류체계 — 새로운 UI 패턴이 등장해도 체계 안에서 설명 가능하다."
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
              id: '2-A-6',
              title: 'UX 디자인이 바이브 디자인이 되기까지',
              render: () => (
                <SlideStorytelling
                  from="UX 디자인: 사용자 경험을 설계한다"
                  to="바이브 디자인: 의도를 체계적 언어로 전달한다"
                  arrowLabel="진화"
                />
              ),
            },
          ],
        },
        {
          id: '2-B',
          title: '디자인 택소노미 활용법: 컴포넌트와 스타일의 분류 체계',
          slides: [
            {
              id: '2-B-1',
              title: '15카테고리 분류 체계 소개',
              render: () => (
                <SlideChapterTitle
                  overline="PART B"
                  title="디자인 택소노미 활용법"
                  summary="컴포넌트와 스타일의 분류 체계"
                  toc={[
                    '15카테고리 분류 체계',
                    '디자인 프리뷰: 좋은 디자인은 이렇게 분해된다',
                    '실습: HTML 카페메뉴 만들기',
                  ]}
                />
              ),
            },
            {
              id: '2-B-2',
              title: '좋은 디자인은 이렇게 분해된다',
              render: () => (
                <SlideGrid columns={2}>
                  <Placeholder.Box label="디자인 예시 A" />
                  <Placeholder.Box label="분해 결과 A" />
                  <Placeholder.Box label="디자인 예시 B" />
                  <Placeholder.Box label="분해 결과 B" />
                </SlideGrid>
              ),
            },
            {
              id: '2-B-3',
              title: '실습: HTML 카페메뉴 만들기',
              render: () => (
                <SlideMessage>실습: HTML 카페메뉴 만들기</SlideMessage>
              ),
            },
            {
              id: '2-B-4',
              title: '웹 프로그래밍 기초, 어디까지 알아야 하나요?',
              render: () => (
                <SlideHSplit>
                  <SlideTypoStack
                    title="여기서 잠깐"
                    subtitle="웹 프로그래밍 기초"
                    body="어디까지 알아야 하나요?"
                  />
                  <SlideList
                    items={[
                      'HTML: 구조를 만드는 뼈대',
                      'CSS: 스타일을 입히는 옷',
                      'JavaScript: 동작을 만드는 근육',
                    ]}
                    level="headline"
                  />
                </SlideHSplit>
              ),
            },
            {
              id: '2-B-5',
              title: '실습: 자유 주제 1개 만들기',
              render: () => (
                <SlideMessage>실습: 자유 주제 1개 만들기</SlideMessage>
              ),
            },
          ],
        },
        {
          id: '2-C',
          title: '왜 프레임워크가 필요한가: 피그마와 React.js의 관계',
          slides: [
            {
              id: '2-C-1',
              title: '1세대 UX디자이너가 바꿔놓은 것들',
              render: () => (
                <SlideChapterTitle
                  overline="PART C"
                  title="왜 프레임워크가 필요한가"
                  summary="피그마와 React.js의 관계"
                  toc={[
                    '1세대 UX디자이너가 바꿔놓은 것들',
                    '실습: 카페메뉴를 React로 변환',
                    'React 개발 기초',
                    '코드를 다 읽지 말고 범위를 확인하라',
                  ]}
                />
              ),
            },
            {
              id: '2-C-2',
              title: '실습: 카페메뉴를 React로 변환해보기',
              render: () => (
                <SlideMessage>실습: 카페메뉴를 React로 변환해보기</SlideMessage>
              ),
            },
            {
              id: '2-C-3',
              title: 'React는 어디까지 알아야 하나요?',
              render: () => (
                <SlideHSplit>
                  <SlideTypoStack
                    title="여기서 잠깐"
                    subtitle="React는 어디까지 알아야 하나요?"
                  />
                  <SlideList
                    items={[
                      '컴포넌트: 재사용 가능한 UI 조각',
                      'Props: 컴포넌트에 전달하는 설정값',
                      '상태: 컴포넌트가 기억하는 값',
                    ]}
                    level="headline"
                  />
                </SlideHSplit>
              ),
            },
            {
              id: '2-C-4',
              title: 'React 개발 기초',
              render: () => (
                <SlideGrid columns={2}>
                  <SlideTypoStack headline="JSX" body="HTML처럼 생긴 JavaScript" />
                  <SlideTypoStack headline="Props" body="부모→자식 데이터 전달" />
                  <SlideTypoStack headline="Component" body="재사용 가능한 UI 단위" />
                  <SlideTypoStack headline="기본 문법" body="변수, 조건, 반복" />
                </SlideGrid>
              ),
            },
            {
              id: '2-C-5',
              title: '코드를 다 읽지 말고 범위를 확인하라',
              render: () => (
                <SlideStorytelling
                  from="코드를 한 줄 한 줄 다 읽어야 한다?"
                  to="범위를 먼저 확인하고 필요한 부분만 읽어라"
                />
              ),
            },
          ],
        },
        {
          id: '2-D',
          title: '디자인 vs 개발 생태계 비교하기',
          slides: [
            {
              id: '2-D-1',
              title: '컴포넌트 재사용: 피그마 vs React',
              render: () => (
                <SlideChapterTitle
                  overline="PART D"
                  title="디자인 vs 개발 생태계 비교하기"
                  summary="같은 개념, 다른 도구"
                  toc={[
                    '컴포넌트 재사용: 피그마 vs React',
                    '실행과 배포: 피그마 vs React',
                  ]}
                />
              ),
            },
            {
              id: '2-D-2',
              title: '실행과 배포: 피그마 vs React',
              render: () => (
                <SlideHSplit>
                  <SlideTypoStack
                    headline="피그마"
                    body="프로토타입 → 공유 링크 → 핸드오프"
                  />
                  <SlideTypoStack
                    headline="React"
                    body="개발 → 빌드 → 배포 → URL"
                  />
                </SlideHSplit>
              ),
            },
          ],
        },
        {
          id: '2-E',
          title: '개발환경 세팅 & 익숙해지기',
          slides: [
            {
              id: '2-E-1',
              title: '개발환경 용어 정리',
              render: () => (
                <SlideChapterTitle
                  overline="PART E"
                  title="개발환경 세팅 & 익숙해지기"
                  summary="처음이라 낯설 뿐, 어렵지 않다"
                  toc={[
                    '개발환경 용어 정리',
                    '사전 점검 스크립트',
                    'Claude Code 설치',
                    '빌드와 npm 이해하기',
                    '터미널 첫 경험',
                  ]}
                />
              ),
            },
            {
              id: '2-E-2',
              title: '사전 점검 스크립트 실행',
              render: () => (
                <SlideHSplit>
                  <SlideTypoStack
                    title="사전 점검 스크립트"
                    body="개발환경이 올바르게 설정되었는지 자동으로 확인합니다."
                  />
                  <Placeholder.Box label="터미널 스크린샷" />
                </SlideHSplit>
              ),
            },
            {
              id: '2-E-3',
              title: '개발환경 가이드 실행',
              render: () => (
                <SlideHSplit>
                  <SlideTypoStack
                    title="개발환경 가이드"
                    body="단계별로 따라하면 완성되는 설치 가이드"
                  />
                  <Placeholder.Box label="가이드 스크린샷" />
                </SlideHSplit>
              ),
            },
            {
              id: '2-E-4',
              title: 'Claude Code 설치',
              render: () => (
                <SlideMessage>Claude Code 설치</SlideMessage>
              ),
            },
            {
              id: '2-E-5',
              title: '빌드와 npm 이해하기',
              render: () => (
                <SlideHSplit>
                  <SlideTypoStack
                    title="빌드와 npm"
                    body="npm은 패키지 매니저, 빌드는 코드를 브라우저가 이해할 수 있는 형태로 변환하는 과정"
                  />
                  <SlideList
                    items={[
                      'npm install: 의존성 설치',
                      'npm run dev: 개발 서버 실행',
                      'npm run build: 배포용 빌드',
                    ]}
                    level="body"
                  />
                </SlideHSplit>
              ),
            },
            {
              id: '2-E-6',
              title: '터미널 첫 경험 + 걱정 FAQ',
              render: () => (
                <SlideHSplit>
                  <SlideTypoStack
                    title="터미널 첫 경험"
                    body="터미널은 텍스트로 컴퓨터와 대화하는 도구입니다."
                  />
                  <SlideList
                    items={[
                      'Q. 터미널이 무서워요 → 되돌리기가 가능합니다',
                      'Q. 명령어를 외워야 하나요? → 아니요, 검색하면 됩니다',
                      'Q. 잘못 입력하면? → 대부분 에러 메시지가 알려줍니다',
                    ]}
                    level="body"
                  />
                </SlideHSplit>
              ),
            },
            {
              id: '2-E-7',
              title: 'AntiGravity 사용법',
              render: () => (
                <SlideGrid columns={2}>
                  <Placeholder.Box label="AntiGravity UI 1" />
                  <Placeholder.Box label="AntiGravity UI 2" />
                  <Placeholder.Box label="워크플로우 1" />
                  <Placeholder.Box label="워크플로우 2" />
                </SlideGrid>
              ),
            },
            {
              id: '2-E-8',
              title: 'Claude CLI 사용법',
              render: () => (
                <SlideGrid columns={2}>
                  <Placeholder.Box label="CLI 인터페이스" />
                  <Placeholder.Box label="주요 명령어" />
                  <Placeholder.Box label="실행 예시" />
                  <Placeholder.Box label="팁" />
                </SlideGrid>
              ),
            },
          ],
        },
      ],
    },

    // ─── Ch3: AI 협업 ───
    {
      id: 'Ch3',
      title: 'AI와 협업에 적합한 태도와 접근법',
      parts: [
        {
          id: '3-F',
          title: '감당할 만큼의 사고와 글쓰기',
          slides: [
            {
              id: '3-F-1',
              title: 'AI 협업의 현실',
              render: () => (
                <SlideChapterTitle
                  overline="CHAPTER 03"
                  title="AI와 협업에 적합한 태도와 접근법"
                  summary="감당할 만큼의 사고와 글쓰기"
                  toc={[
                    'AI 협업의 현실: 진짜 vs 가짜 걱정',
                    '질문→결정→검수 프레임',
                    '3단계 글쓰기',
                    'Claude Code의 역할',
                    '워밍업 실습',
                  ]}
                />
              ),
            },
            {
              id: '3-F-2',
              title: '질문→결정→검수 프레임',
              render: () => (
                <SlideHSplit columns={3}>
                  <SlideTypoStack headline="질문" body="무엇을 만들 것인가?" />
                  <SlideTypoStack headline="결정" body="어떻게 구현할 것인가?" />
                  <SlideTypoStack headline="검수" body="의도대로 되었는가?" />
                </SlideHSplit>
              ),
            },
            {
              id: '3-F-3',
              title: '내 말의 영향력 책임지기',
              render: () => (
                <SlideStorytelling
                  from="코드를 직접 쓰지 않으니 책임이 없다?"
                  to="내 말이 곧 코드다. 코드를 부품처럼 다뤄라."
                />
              ),
            },
            {
              id: '3-F-4',
              title: '3단계 글쓰기',
              render: () => (
                <SlideGrid columns={3}>
                  <SlideTypoStack headline="1. 목적" body="왜 만드는가?" />
                  <SlideTypoStack headline="2. 방법" body="어떻게 만드는가?" />
                  <SlideTypoStack headline="3. 스타일" body="어떤 느낌으로?" />
                </SlideGrid>
              ),
            },
            {
              id: '3-F-5',
              title: 'Claude Code의 역할',
              render: () => (
                <SlideHSplit>
                  <SlideTypoStack
                    title="Claude Code의 역할"
                    body="코딩 도구가 아니라 협업 파트너. 의도를 전달하면 구현을 함께 만들어간다."
                  />
                  <SlideList
                    items={[
                      '질문하면 맥락을 파악한다',
                      '코드를 읽고 구조를 이해한다',
                      '수정 범위를 스스로 판단한다',
                    ]}
                    level="headline"
                  />
                </SlideHSplit>
              ),
            },
            {
              id: '3-F-6',
              title: '워밍업 실습 가이드',
              render: () => (
                <SlideMessage>워밍업 실습 가이드</SlideMessage>
              ),
            },
          ],
        },
        {
          id: '3-B',
          title: '오류는 흔한 것이다: 올바른 대처 방법',
          slides: [
            {
              id: '3-B-1',
              title: '어디를 어떻게 수정할지 정확히 아는법',
              render: () => (
                <SlideChapterTitle
                  overline="PART B"
                  title="오류는 흔한 것이다"
                  summary="올바른 대처 방법"
                  toc={[
                    '어디를 어떻게 수정할지 정확히 아는법',
                    '오류 유형과 대처법',
                    '스토리북/디자인 시스템 예고',
                  ]}
                />
              ),
            },
            {
              id: '3-B-2',
              title: '오류 유형과 대처법',
              render: () => (
                <SlideHSplit>
                  <SlideList
                    items={[
                      '빨간 에러: 문법 오류 → AI가 바로 수정',
                      '노란 경고: 개선 권고 → 무시 가능',
                      '흰 화면: 런타임 오류 → 콘솔 확인',
                      '의도 불일치: 맥락적 오류 → 프롬프트 수정',
                    ]}
                    level="headline"
                  />
                  <Placeholder.Box label="에러 화면 예시" />
                </SlideHSplit>
              ),
            },
            {
              id: '3-B-3',
              title: '스토리북/디자인 시스템 예고',
              render: () => (
                <SlideMessage>다음 시간: 스토리북과 디자인 시스템</SlideMessage>
              ),
            },
          ],
        },
        {
          id: '3-EB',
          title: '코드 수정 + 자유 실습',
          slides: [
            {
              id: '3-EB-1',
              title: '코드 수정 실습',
              render: () => (
                <SlideChapterTitle
                  overline="실습"
                  title="코드 수정 + 자유 실습"
                  summary="3가지 수정 실습: 색상, 레이아웃, 폰트"
                  toc={[
                    '코드 수정 실습',
                    '자유 실습: 원하는 것 만들기',
                    'git → Vercel 배포하기',
                  ]}
                />
              ),
            },
            {
              id: '3-EB-2',
              title: '자유 실습',
              render: () => (
                <SlideMessage>자유 실습: 원하는 것 아무거나 만들기</SlideMessage>
              ),
            },
            {
              id: '3-EB-3',
              title: 'git → Vercel 배포하기',
              render: () => (
                <SlideHSplit>
                  <SlideTypoStack
                    title="git → Vercel 배포"
                    body="코드를 GitHub에 올리고, Vercel이 자동으로 웹사이트로 만들어준다."
                  />
                  <SlideList
                    items={[
                      'git add → commit → push',
                      'Vercel 연결',
                      '자동 배포 확인',
                    ]}
                    variant="number"
                    level="headline"
                  />
                </SlideHSplit>
              ),
            },
          ],
        },
      ],
    },
  ],
};
