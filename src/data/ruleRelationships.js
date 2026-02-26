/**
 * 프로젝트 룰 관계 데이터
 *
 * CLAUDE.md를 포함한 모든 프로젝트 룰의 노드, 엣지, 메타데이터를 정의합니다.
 * 룰 추가/수정/삭제 시 이 파일도 함께 업데이트해야 합니다.
 */

export const priorityMeta = {
  root: { color: '#000000', label: 'Root', order: 0 },
  CRITICAL: { color: '#D32F2F', label: '절대 위반 불가', order: 1 },
  MUST: { color: '#ED6C02', label: '반드시 준수', order: 2 },
  Reference: { color: '#2E7D32', label: 'UX 참조 문서 (on-demand)', order: 3 },
  Skill: { color: '#7B1FA2', label: 'Skill (의도 기반 활성화)', order: 4 },
  'Skill Resource': { color: '#9E9E9E', label: 'Skill Resource (on-demand)', order: 5 },
};

export const ruleNodes = [
  // Root
  {
    id: 'claude-md',
    name: 'CLAUDE.md',
    priority: 'root',
    path: 'CLAUDE.md',
    description: '프로젝트 규칙 진입점 (~49줄, 라우터 역할)',
  },
  // CRITICAL
  {
    id: 'project-summary',
    name: 'project-summary.md',
    priority: 'CRITICAL',
    path: '.claude/rules/project-summary.md',
    description: '핵심 원칙: UI/로직 분리, MUI 기반 + Storybook 필수',
  },
  {
    id: 'mui-grid-usage',
    name: 'mui-grid-usage.md',
    priority: 'CRITICAL',
    path: '.claude/rules/mui-grid-usage.md',
    description: 'MUI Grid import 규칙 (Grid2 사용 금지, size prop)',
  },
  // MUST
  {
    id: 'code-convention',
    name: 'code-convention.md',
    priority: 'MUST',
    path: '.claude/rules/code-convention.md',
    description: 'PascalCase 파일명, Props JSDoc 주석 형식',
  },
  {
    id: 'design-system',
    name: 'design-system.md',
    priority: 'MUST',
    path: '.claude/rules/design-system.md',
    description: '컴포넌트 재활용, 디자인 토큰, sx prop 스타일링',
  },
  {
    id: 'project-directory',
    name: 'project-directory.md',
    priority: 'MUST',
    path: '.claude/rules/project-directory.md',
    description: '텍소노미 기반 디렉토리 구조, Storybook title prefix',
  },
  {
    id: 'nextjs',
    name: 'nextjs.md',
    priority: 'MUST',
    path: '.claude/rules/nextjs.md',
    description: "'use client' 배치 규칙, 애니메이션 규칙 (paths: app/**)",
  },
  {
    id: 'ux-architecture',
    name: 'ux-architecture.md',
    priority: 'MUST',
    path: '.claude/rules/ux-architecture.md',
    description: '작업 전 UX 문서 참조 지도, 문서 기반 구현 원칙',
  },
  // Reference (UX 참조 문서 — ux-architecture에서 on-demand 참조)
  {
    id: 'ux-project-summary',
    name: 'project-summary.md',
    priority: 'Reference',
    path: 'src/docs/ux/project-summary.md',
    description: '서비스 방향, 기능 범위, Non-goal 판단',
  },
  {
    id: 'ux-flow',
    name: 'ux-flow.md',
    priority: 'Reference',
    path: 'src/docs/ux/ux-flow.md',
    description: '화면 구조, 플로우, IA, 인터랙션',
  },
  {
    id: 'ux-design-system-optimization',
    name: 'design-system-optimization.md',
    priority: 'Reference',
    path: 'src/docs/ux/design-system-optimization.md',
    description: '컴포넌트, 스타일, 토큰, 비주얼 설계',
  },
  {
    id: 'ux-technical',
    name: 'technical.md',
    priority: 'Reference',
    path: 'src/docs/ux/technical.md',
    description: '데이터 모델, API, 상태 관리, 라이브러리',
  },
  {
    id: 'ux-contents',
    name: 'contents.md',
    priority: 'Reference',
    path: 'src/docs/ux/contents.md',
    description: '텍스트, 메시지, 이미지, 미디어 상수',
  },
  // Skill
  {
    id: 'component-work',
    name: 'component-work (Skill)',
    priority: 'Skill',
    path: '.claude/skills/component-work/SKILL.md',
    description: '컴포넌트 생성/수정/삭제/스토리 워크플로우',
  },
  {
    id: 'rule-visualization',
    name: 'rule-visualization (Skill)',
    priority: 'Skill',
    path: '.claude/skills/rule-visualization/SKILL.md',
    description: '룰/스킬 변경 시 ruleRelationships.js 동기화',
  },
  {
    id: 'convert-external',
    name: 'convert-external (Skill)',
    priority: 'Skill',
    path: '.claude/skills/convert-external/SKILL.md',
    description: '외부 컴포넌트를 프로젝트 규칙에 맞게 변환',
  },
  // Skill Resources
  {
    id: 'components',
    name: 'components.md',
    priority: 'Skill Resource',
    path: '.claude/skills/component-work/resources/components.md',
    description: '기존 컴포넌트 목록 (텍소노미 기반 분류)',
  },
  {
    id: 'mui-theme',
    name: 'mui-theme.md',
    priority: 'Skill Resource',
    path: '.claude/skills/component-work/resources/mui-theme.md',
    description: 'MUI 커스텀 테마 설정 (Typography, Color, Elevation)',
  },
  {
    id: 'refactoring-guide',
    name: 'refactoring-guide.md',
    priority: 'Skill Resource',
    path: '.claude/skills/component-work/resources/refactoring-guide.md',
    description: '리팩토링 가이드, 기능/로직/형태 보존 원칙',
  },
  {
    id: 'storybook-writing',
    name: 'storybook-writing.md',
    priority: 'Skill Resource',
    path: '.claude/skills/component-work/resources/storybook-writing.md',
    description: 'Storybook 스토리 작성 규칙, 카테고리 구조',
  },
  {
    id: 'interactive-component-principles',
    name: 'interactive-principles.md',
    priority: 'Skill Resource',
    path: '.claude/skills/component-work/resources/interactive-principles.md',
    description: '인터랙티브 컴포넌트 설계 원칙 (애니메이션, 성능)',
  },
  {
    id: 'taxonomy',
    name: 'taxonomy-v0.4.md',
    priority: 'Skill Resource',
    path: '.claude/skills/component-work/resources/taxonomy-v0.4.md',
    description: 'UI 컴포넌트 분류체계 (207개 항목, 21 카테고리)',
  },
  {
    id: 'taxonomy-index',
    name: 'taxonomy-index.md',
    priority: 'Skill Resource',
    path: '.claude/skills/component-work/resources/taxonomy-index.md',
    description: '텍소노미 빠른 참조 인덱스',
  },
  {
    id: 'conversion-checklist',
    name: 'conversion-checklist.md',
    priority: 'Skill Resource',
    path: '.claude/skills/convert-external/resources/conversion-checklist.md',
    description: '외부 컴포넌트 변환 체크리스트',
  },
];

export const edgeTypes = {
  loads: { label: '자동 로드', style: 'solid' },
  references: { label: '텍스트 참조', style: 'dashed' },
  activates: { label: '의도 기반 활성화', style: 'solid' },
  resources: { label: 'on-demand Read', style: 'dashed' },
};

export const ruleEdges = [
  // CLAUDE.md → rules (자동 로드)
  { from: 'claude-md', to: 'project-summary', type: 'loads' },
  { from: 'claude-md', to: 'mui-grid-usage', type: 'loads' },
  { from: 'claude-md', to: 'code-convention', type: 'loads' },
  { from: 'claude-md', to: 'design-system', type: 'loads' },
  { from: 'claude-md', to: 'project-directory', type: 'loads' },
  { from: 'claude-md', to: 'nextjs', type: 'loads' },
  { from: 'claude-md', to: 'ux-architecture', type: 'loads' },

  // CLAUDE.md → Skill (의도 기반 활성화)
  { from: 'claude-md', to: 'component-work', type: 'activates', note: '컴포넌트 작업 시' },
  { from: 'claude-md', to: 'rule-visualization', type: 'activates', note: '룰/스킬 변경 시' },
  { from: 'claude-md', to: 'convert-external', type: 'activates', note: '외부 컴포넌트 변환 시' },

  // ux-architecture → UX 참조 문서 (on-demand)
  { from: 'ux-architecture', to: 'ux-project-summary', type: 'references', note: '서비스 방향·범위 판단 시' },
  { from: 'ux-architecture', to: 'ux-flow', type: 'references', note: '화면·플로우·IA 작업 시' },
  { from: 'ux-architecture', to: 'ux-design-system-optimization', type: 'references', note: '컴포넌트·토큰·비주얼 작업 시' },
  { from: 'ux-architecture', to: 'ux-technical', type: 'references', note: '데이터·API·상태 관리 시' },
  { from: 'ux-architecture', to: 'ux-contents', type: 'references', note: '텍스트·미디어 상수 필요 시' },

  // Skill → Resources (on-demand Read)
  { from: 'component-work', to: 'taxonomy-index', type: 'resources', note: '생성 시 카테고리 후보 파악' },
  { from: 'component-work', to: 'taxonomy', type: 'resources', note: '카테고리 상세 필요 시' },
  { from: 'component-work', to: 'storybook-writing', type: 'resources', note: '스토리 작성/수정 시' },
  { from: 'component-work', to: 'interactive-component-principles', type: 'resources', note: '#11~#15 카테고리 작업 시' },
  { from: 'component-work', to: 'components', type: 'resources', note: '생성/수정/삭제 시 기존 컴포넌트 확인' },
  { from: 'component-work', to: 'mui-theme', type: 'resources', note: '테마/스타일 수정 시' },
  { from: 'component-work', to: 'refactoring-guide', type: 'resources', note: '리팩토링 시' },
  { from: 'convert-external', to: 'conversion-checklist', type: 'resources', note: '변환 절차 확인' },

  // rules 간 참조
  { from: 'project-directory', to: 'taxonomy', type: 'references', note: '분류 기준' },
  { from: 'components', to: 'taxonomy', type: 'references', note: '카테고리 원형 참조' },
  { from: 'components', to: 'taxonomy-index', type: 'references', note: '빠른 인덱스 참조' },
  { from: 'design-system', to: 'components', type: 'references', note: '기존 컴포넌트 재활용 확인' },
  { from: 'nextjs', to: 'interactive-component-principles', type: 'references', note: '애니메이션/reduced-motion 원칙' },
];

export const conditionMatrix = [
  {
    task: '컴포넌트 생성',
    rules: ['design-system', 'project-directory', 'code-convention', 'ux-architecture'],
    skill: 'component-work',
    skillResources: ['components', 'taxonomy-index', 'storybook-writing'],
    uxDocs: ['ux-design-system-optimization'],
  },
  {
    task: '컴포넌트 수정',
    rules: ['design-system', 'code-convention'],
    skill: 'component-work',
    skillResources: ['components', 'storybook-writing'],
  },
  {
    task: '컴포넌트 삭제',
    rules: [],
    skill: 'component-work',
    skillResources: ['components'],
  },
  {
    task: '인터랙티브 컴포넌트',
    rules: ['design-system', 'project-directory', 'code-convention'],
    skill: 'component-work',
    skillResources: ['components', 'taxonomy-index', 'interactive-component-principles', 'storybook-writing'],
  },
  {
    task: '스토리 작성/수정',
    rules: ['project-directory'],
    skill: 'component-work',
    skillResources: ['storybook-writing'],
  },
  {
    task: '리팩토링',
    rules: ['code-convention'],
    skill: 'component-work',
    skillResources: ['refactoring-guide'],
  },
  {
    task: '테마/스타일 수정',
    rules: ['design-system', 'ux-architecture'],
    skill: 'component-work',
    skillResources: ['mui-theme'],
    uxDocs: ['ux-design-system-optimization'],
  },
  {
    task: 'Grid 사용',
    rules: ['mui-grid-usage'],
  },
  {
    task: '룰 수정/추가',
    rules: ['claude-md'],
    skill: 'rule-visualization',
    note: 'ruleRelationships.js 동기화 필수',
  },
  {
    task: '페이지 생성',
    rules: ['nextjs', 'design-system', 'ux-architecture'],
    uxDocs: ['ux-flow', 'ux-design-system-optimization'],
    note: 'app/ 하위에 page.jsx 생성, metadata 필수',
  },
  {
    task: '화면 구조/플로우 작업',
    rules: ['ux-architecture'],
    uxDocs: ['ux-flow', 'ux-project-summary'],
  },
  {
    task: '텍스트/미디어 콘텐츠',
    rules: ['ux-architecture'],
    uxDocs: ['ux-contents'],
    note: '상수 텍스트 임의 작성 금지',
  },
  {
    task: '데이터 모델/API',
    rules: ['ux-architecture'],
    uxDocs: ['ux-technical'],
  },
  {
    task: '외부 컴포넌트 변환',
    rules: ['design-system', 'code-convention'],
    skill: 'convert-external',
    skillResources: ['conversion-checklist'],
  },
];
