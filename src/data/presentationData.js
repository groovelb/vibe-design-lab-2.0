/**
 * S1 프레젠테이션 데이터
 *
 * vdsk_online_curriculum.json S1 기반
 * 구조: chapters > parts > slides
 * slide = curriculum item (슬라이드 1장)
 *
 * layoutType: 'chapterTitle' | 'hSplit' | 'grid' | 'message'
 * 각 part 첫 슬라이드는 chapterTitle, 나머지는 임의 배정
 */

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
          title: '디자인의 언어 체계가 AI를 위한 설계도가 되는 과정',
          slides: [
            { id: 'S1-P-A-1', layoutType: 'chapterTitle', title: '10년간의 디발자: 디자이너이자 개발자로서 깨달은 것', content: '' },
            { id: 'S1-P-A-2', layoutType: 'hSplit', title: '왜 의도를 쪼개야 하는가: 디자인 언어가 설계도가 되는 구조', content: '' },
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
            { id: '2-A-1', layoutType: 'chapterTitle', title: '코스 로드맵 + 4섹션 구조 안내', content: '' },
            { id: '2-A-2', layoutType: 'hSplit', title: '바이브코딩에 대한 오해: 캐퍼시의 암묵지', content: '' },
            { id: '2-A-3', layoutType: 'hSplit', title: '어디에 더 집중해야할까?: 맥락적 오류 VS 컴파일 오류', content: '' },
            { id: '2-A-4', layoutType: 'message', title: '바이브 디자인이란', content: '' },
            { id: '2-A-5', layoutType: 'hSplit', title: "'디자인은 항상 체계였다': 디자인 택소노미 소개", content: '' },
            { id: '2-A-6', layoutType: 'hSplit', title: 'UX 디자인이 바이브 디자인이 되기까지', content: '' },
          ],
        },
        {
          id: '2-B',
          title: '디자인 택소노미 활용법: 컴포넌트와 스타일의 분류 체계',
          slides: [
            { id: '2-B-1', layoutType: 'chapterTitle', title: '15카테고리 분류 체계 소개', content: '' },
            { id: '2-B-2', layoutType: 'grid', title: '디자인 프리뷰: "좋은 디자인은 이렇게 분해된다"', content: '' },
            { id: '2-B-3', layoutType: 'message', title: '실습: HTML 카페메뉴 만들기', content: '' },
            { id: '2-B-4', layoutType: 'hSplit', title: '여기서 잠깐: 웹 프로그래밍 기초, 어디까지 알아야 하나요?', content: '' },
            { id: '2-B-5', layoutType: 'message', title: '실습: 자유 주제 1개 만들기', content: '' },
          ],
        },
        {
          id: '2-C',
          title: '왜 프레임워크가 필요한가: 피그마와 React.js의 관계',
          slides: [
            { id: '2-C-1', layoutType: 'chapterTitle', title: '1세대 UX디자이너가 바꿔놓은 것들', content: '' },
            { id: '2-C-2', layoutType: 'message', title: '실습: 카페메뉴를 React로 변환해보기', content: '' },
            { id: '2-C-3', layoutType: 'hSplit', title: '여기서 잠깐: React는 어디까지 알아야 하나요?', content: '' },
            { id: '2-C-4', layoutType: 'grid', title: 'React 개발 기초: JSX, Props, Component, 기본 문법', content: '' },
            { id: '2-C-5', layoutType: 'hSplit', title: '코드를 다 읽지 말고 범위를 확인하라', content: '' },
          ],
        },
        {
          id: '2-D',
          title: '디자인 vs 개발 생태계 비교하기',
          slides: [
            { id: '2-D-1', layoutType: 'chapterTitle', title: '컴포넌트 재사용: 피그마 vs React', content: '' },
            { id: '2-D-2', layoutType: 'hSplit', title: '실행과 배포: 피그마 vs React', content: '' },
          ],
        },
        {
          id: '2-E',
          title: '개발환경 세팅 & 익숙해지기',
          slides: [
            { id: '2-E-1', layoutType: 'chapterTitle', title: '개발환경 용어 정리', content: '' },
            { id: '2-E-2', layoutType: 'hSplit', title: '사전 점검 스크립트 실행', content: '' },
            { id: '2-E-3', layoutType: 'hSplit', title: '개발환경 가이드 실행', content: '' },
            { id: '2-E-4', layoutType: 'message', title: 'Claude Code 설치', content: '' },
            { id: '2-E-5', layoutType: 'hSplit', title: '빌드와 npm 이해하기', content: '' },
            { id: '2-E-6', layoutType: 'hSplit', title: '터미널 첫 경험 + 걱정 FAQ', content: '' },
            { id: '2-E-7', layoutType: 'grid', title: 'AntiGravity 사용법', content: '' },
            { id: '2-E-8', layoutType: 'grid', title: 'Claude CLI 사용법', content: '' },
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
            { id: '3-F-1', layoutType: 'chapterTitle', title: 'AI 협업의 현실: 진짜 vs 가짜 걱정', content: '' },
            { id: '3-F-2', layoutType: 'hSplit', title: '질문→결정→검수 프레임 + 상황 인식 3가지 습관', content: '' },
            { id: '3-F-3', layoutType: 'hSplit', title: '내 말의 영향력 책임지기: 코드를 부품처럼 다뤄라', content: '' },
            { id: '3-F-4', layoutType: 'grid', title: '3단계 글쓰기: 목적, 방법, 스타일', content: '' },
            { id: '3-F-5', layoutType: 'hSplit', title: 'Claude Code의 역할: 코딩 도구가 아니라 협업 파트너', content: '' },
            { id: '3-F-6', layoutType: 'message', title: '워밍업 실습 가이드', content: '' },
          ],
        },
        {
          id: '3-B',
          title: '오류는 흔한 것이다: 올바른 대처 방법',
          slides: [
            { id: '3-B-1', layoutType: 'chapterTitle', title: "'어디를 어떻게 수정할지 정확히 아는법'", content: '' },
            { id: '3-B-2', layoutType: 'hSplit', title: '오류 유형과 대처법', content: '' },
            { id: '3-B-3', layoutType: 'message', title: '스토리북/디자인 시스템 예고', content: '' },
          ],
        },
        {
          id: '3-EB',
          title: '코드 수정 + 자유 실습',
          slides: [
            { id: '3-EB-1', layoutType: 'chapterTitle', title: '코드 수정 실습 (3가지: 색상, 레이아웃, 폰트)', content: '' },
            { id: '3-EB-2', layoutType: 'message', title: '자유 실습: 원하는 것 아무거나 만들기', content: '' },
            { id: '3-EB-3', layoutType: 'hSplit', title: 'git → Vercel 배포하기', content: '' },
          ],
        },
      ],
    },
  ],
};
