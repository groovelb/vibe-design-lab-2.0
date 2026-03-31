/**
 * Part 2-E — 개발환경 세팅 & 익숙해지기
 */
import {
  SlideChapterTitle,
  SlideGrid,
  SlideHSplit,
  SlideMessage,
  SlideTypoStack,
  SlideList,
} from '../../../../components/presentation';
import Placeholder from '../../../../common/ui/Placeholder';

export const devSetupSlides = [
  {
    id: '2-E-1',
    title: '개발환경 용어 정리',
    render: () => (
      <SlideChapterTitle
        overline="PART E"
        title="개발환경 세팅 & 익숙해지기"
        summary="처음이라 낯설 뿐, 어렵지 않습니다"
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
          body="npm은 패키지 매니저, 빌드는 코드를 브라우저가 이해할 수 있는 형태로 변환하는 과정입니다."
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
];
