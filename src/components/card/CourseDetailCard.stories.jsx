import Placeholder from '../../common/ui/Placeholder';
import { CourseDetailCard } from './CourseDetailCard';
import courseThumbnail from '../../assets/course/coure_thumbnail_starterkit.png';
const courseVideo = '/assets/course/coure_thumbnail_starterkit.mp4';

export default {
  title: 'Component/3. Card/CourseDetailCard',
  component: CourseDetailCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## CourseDetailCard

코스 상세 정보를 horizontal 레이아웃으로 표시하는 카드.
좌측 비디오/썸네일 + 우측 코스 정보 구조. 모바일에서는 수직 스택으로 전환.

- 비디오 + 포스터 썸네일 지원 (레이지 로딩)
- mediaSlot으로 커스텀 미디어 교체 가능
- CardTextStack 기반 텍스트 영역
        `,
      },
    },
  },
  argTypes: {
    videoSrc: { control: 'text', description: '비디오 소스 URL' },
    posterSrc: { control: 'text', description: '포스터/썸네일 이미지 URL' },
    mediaRatio: {
      control: 'select',
      options: ['16/9', '4/3', '1/1', '21/9'],
      description: '미디어 영역 비율',
    },
    cohortStatus: {
      control: 'radio',
      options: ['recruiting', 'ongoing', 'upcoming'],
      description: '코호트 상태',
    },
    duration: { control: 'text', description: '기간 텍스트' },
    chapters: { control: { type: 'number', min: 1 }, description: '챕터 수' },
    title: { control: 'text', description: '코스 제목' },
    subtitle: { control: 'text', description: '한 줄 부제' },
    description: { control: 'text', description: '코스 설명' },
    target: { control: 'text', description: '수강 대상' },
    ctaLabel: { control: 'text', description: 'CTA 버튼 텍스트' },
    ctaHref: { control: 'text', description: 'CTA 링크 URL' },
    onCtaClick: { action: 'ctaClicked', description: 'CTA 클릭 핸들러' },
  },
};

/**
 * 비디오 + 썸네일 포스터 (실제 에셋)
 */
export const Docs = {
  args: {
    videoSrc: courseVideo,
    posterSrc: courseThumbnail,
    mediaRatio: '16/9',
    cohortStatus: 'recruiting',
    duration: '8주',
    chapters: 4,
    title: 'Vibe Design Starter Kit',
    subtitle: '디자인 자체를 구현 수단으로 활용하는 바이브 코딩 실전 코스',
    description:
      '디자인 사고로 제품을 설계하는 바이브 코딩. 준비된 Starter Kit과 함께 디자인 자체를 구현 수단으로 활용하는 연습을 합니다.',
    target: '프로덕트 디자이너 · 프론트엔드 개발자',
    ctaLabel: '자세히 보기',
    ctaHref: '/course/starter-kit',
  },
};

/**
 * 썸네일 이미지만 (비디오 없음)
 */
export const ThumbnailOnly = {
  args: {
    posterSrc: courseThumbnail,
    mediaRatio: '16/9',
    cohortStatus: 'ongoing',
    duration: '6주',
    chapters: 12,
    title: '바이브 코딩 실전',
    subtitle: 'AI와 협업하여 프로덕션 레벨 UI를 구현한다',
    target: '시니어 디자이너 · PM',
    ctaLabel: '자세히 보기',
  },
};

/**
 * Placeholder 미디어 (에셋 없이)
 */
export const WithPlaceholder = {
  args: {
    mediaSlot: <Placeholder.Media index={0} ratio="16/9" />,
    cohortStatus: 'upcoming',
    duration: '4주',
    chapters: 8,
    title: '디자인 시스템 입문',
    subtitle: 'MUI 기반 컴포넌트 설계와 토큰 시스템을 배운다',
    description:
      '토큰 설계부터 컴포넌트 라이브러리 구축까지, 실무 기반 디자인 시스템의 기초를 다집니다.',
    target: '주니어 디자이너',
    ctaLabel: '자세히 보기',
  },
};

/**
 * 최소 정보
 */
export const Minimal = {
  args: {
    title: '커뮤니티 워크숍',
    subtitle: '비정기 무료 세션',
  },
};
