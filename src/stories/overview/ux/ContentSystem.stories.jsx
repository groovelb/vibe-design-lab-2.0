import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
} from '../../../components/storybookDocumentation';
import {
  PAGES,
  GNB,
  FOOTER,
  CTA_LABELS,
  COHORT_BADGES,
  COURSE_CARD_LABELS,
  STATUS_MESSAGES,
  ALT_TEXT,
} from '../../../data/contents';

export default {
  title: 'Overview/UX/Content System',
  parameters: {
    layout: 'padded',
  },
};

/* ── 페이지 라우트 매핑 ── */
const PAGE_ROUTES = {
  landing: '/',
  course: '/course',
  courseDetail: '/course/[slug]',
  dictionary: '/dictionary',
  experiment: '/experiment',
  story: '/story',
  chapterLearning: '/course/[slug]/[chapterSlug]',
};

/* ── CTA 키 판별 ── */
const isCtaKey = (key) =>
  key === 'cta' || key === 'ctaPrimary' || key === 'ctaSecondary';

/* ── 섹션 블록 렌더러 ── */
const renderSection = (sectionKey, data) => {
  /* 단순 문자열 필드 (chapterLearning 등) */
  if (typeof data === 'string') {
    return (
      <Box
        key={ sectionKey }
        sx={ { display: 'flex', alignItems: 'center', gap: 1.5, py: 0.75 } }
      >
        <Typography
          variant="caption"
          sx={ { fontFamily: 'monospace', color: 'text.secondary', minWidth: 180, flexShrink: 0 } }
        >
          { sectionKey }
        </Typography>
        <Typography variant="body2">{ data }</Typography>
      </Box>
    );
  }

  /* 빈 객체 (주석만 있는 경우) */
  if (typeof data === 'object' && Object.keys(data).length === 0) {
    return (
      <Box
        key={ sectionKey }
        sx={ { borderLeft: '3px solid', borderColor: 'divider', pl: 2.5, py: 1, mb: 2, opacity: 0.5 } }
      >
        <Chip label={ sectionKey } size="small" variant="outlined" sx={ { fontSize: 11 } } />
        <Typography variant="caption" color="text.secondary" sx={ { ml: 1 } }>
          (별도 상수 참조)
        </Typography>
      </Box>
    );
  }

  /* 객체 섹션 — 와이어프레임 블록 */
  const entries = Object.entries(data);
  const headline = data.headline;
  const subCopy = data.subCopy;
  const ctas = entries.filter(([k]) => isCtaKey(k));
  const rest = entries.filter(
    ([k]) => k !== 'headline' && k !== 'subCopy' && !isCtaKey(k),
  );

  return (
    <Box
      key={ sectionKey }
      sx={ {
        borderLeft: '3px solid',
        borderColor: 'primary.main',
        pl: 2.5,
        py: 1.5,
        mb: 2,
      } }
    >
      <Chip
        label={ sectionKey }
        size="small"
        variant="outlined"
        sx={ { fontSize: 11, mb: headline ? 1 : 0.5 } }
      />

      { headline && (
        <Typography variant="h6" sx={ { fontWeight: 700, lineHeight: 1.3 } }>
          { headline }
        </Typography>
      ) }

      { subCopy && (
        <Typography variant="body2" color="text.secondary" sx={ { mt: 0.5 } }>
          { subCopy }
        </Typography>
      ) }

      { ctas.length > 0 && (
        <Box sx={ { display: 'flex', gap: 1, mt: 1.5 } }>
          { ctas.map(([key, value]) => (
            <Chip
              key={ key }
              label={ value }
              size="small"
              color={ key === 'ctaSecondary' ? 'default' : 'primary' }
              variant={ key === 'ctaSecondary' ? 'outlined' : 'filled' }
            />
          )) }
        </Box>
      ) }

      { rest.map(([key, value]) => {
        /* 배열 필드 (career, learning 등) */
        if (Array.isArray(value)) {
          return (
            <Box key={ key } sx={ { mt: 1.5 } }>
              <Typography
                variant="caption"
                sx={ { fontFamily: 'monospace', color: 'text.secondary', fontWeight: 600 } }
              >
                { key }
              </Typography>
              { value.map((item, idx) => (
                <Box
                  key={ idx }
                  sx={ {
                    pl: 2,
                    py: 0.5,
                    mt: 0.5,
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                  } }
                >
                  { typeof item === 'object'
                    ? Object.entries(item).map(([k, v]) => (
                      <Typography key={ k } variant="body2" sx={ { fontSize: 13 } }>
                        <Box
                          component="span"
                          sx={ { fontFamily: 'monospace', color: 'text.secondary', fontSize: 11, mr: 1 } }
                        >
                          { k }
                        </Box>
                        { v }
                      </Typography>
                    ))
                    : <Typography variant="body2" sx={ { fontSize: 13 } }>{ item }</Typography>
                  }
                </Box>
              )) }
            </Box>
          );
        }

        /* 중첩 객체 (labels 등) */
        if (typeof value === 'object' && value !== null) {
          return (
            <Box key={ key } sx={ { mt: 1.5 } }>
              <Typography
                variant="caption"
                sx={ { fontFamily: 'monospace', color: 'text.secondary', fontWeight: 600 } }
              >
                { key }
              </Typography>
              { Object.entries(value).map(([k, v]) => (
                <Box key={ k } sx={ { display: 'flex', gap: 1, pl: 2, py: 0.25 } }>
                  <Typography
                    variant="caption"
                    sx={ { fontFamily: 'monospace', color: 'text.secondary', minWidth: 140 } }
                  >
                    { k }
                  </Typography>
                  <Typography variant="body2" sx={ { fontSize: 13 } }>{ String(v) }</Typography>
                </Box>
              )) }
            </Box>
          );
        }

        /* 일반 문자열 */
        return (
          <Box key={ key } sx={ { display: 'flex', gap: 1, mt: 0.75, alignItems: 'baseline' } }>
            <Typography
              variant="caption"
              sx={ { fontFamily: 'monospace', color: 'text.secondary', minWidth: 160, flexShrink: 0 } }
            >
              { key }
            </Typography>
            <Typography variant="body2" sx={ { fontSize: 13 } }>{ value }</Typography>
          </Box>
        );
      }) }
    </Box>
  );
};

/* ── 상태 메시지 색상 ── */
const STATUS_COLORS = {
  error: 'error.main',
  empty: 'warning.main',
  success: 'success.main',
};

/** 콘텐츠 시스템 — 페이지 UI 텍스트 */
export const Docs = {
  render: () => (
    <>
      <DocumentTitle
        title="Content System"
        status="Available"
        note="페이지 콘텐츠 맵, 글로벌 UI, 상태 메시지, 대체 텍스트"
        brandName="Vibe Design Labs"
        systemName="UX Documentation"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          Content System
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 5 } }>
          실제 웹 페이지에 들어갈 UI 텍스트. 임의 텍스트 작성 금지 — 이 데이터에서 참조할 것.
        </Typography>

        {/* ═══════════════════ PART 1: 페이지 콘텐츠 맵 ═══════════════════ */}
        <SectionTitle
          title="페이지 콘텐츠 맵"
          description="PAGES 객체 — 각 페이지의 섹션 흐름과 메시지 계층"
        />

        { Object.entries(PAGES).map(([pageName, pageData]) => (
          <Box
            key={ pageName }
            sx={ {
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              mb: 4,
              overflow: 'hidden',
            } }
          >
            {/* 페이지 헤더 */}
            <Box
              sx={ {
                px: 3,
                py: 1.5,
                bgcolor: 'action.hover',
                borderBottom: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'baseline',
                gap: 1.5,
              } }
            >
              <Typography variant="subtitle1" sx={ { fontWeight: 700 } }>
                { pageName }
              </Typography>
              <Typography
                variant="caption"
                sx={ { fontFamily: 'monospace', color: 'text.secondary' } }
              >
                { PAGE_ROUTES[pageName] }
              </Typography>
            </Box>

            {/* 섹션 흐름 */}
            <Box sx={ { p: 3 } }>
              { Object.entries(pageData).map(([sectionKey, sectionData]) =>
                renderSection(sectionKey, sectionData),
              ) }
            </Box>
          </Box>
        )) }

        {/* ═══════════════════ PART 2: 글로벌 UI ═══════════════════ */}
        <SectionTitle
          title="글로벌 UI 요소"
          description="GNB, Footer — 모든 페이지에 공통으로 들어가는 UI"
        />

        {/* GNB 목업 */}
        <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1.5 } }>GNB</Typography>
        <Box
          sx={ {
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            px: 3,
            py: 1.5,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            mb: 3,
          } }
        >
          <Typography sx={ { fontWeight: 700, mr: 2 } }>{ GNB.logo }</Typography>
          <Box sx={ { flex: 1, display: 'flex', gap: 3 } }>
            { GNB.menus.map((menu) => (
              <Typography
                key={ menu.label }
                variant="body2"
                sx={ { color: 'text.secondary', '&:hover': { color: 'text.primary' } } }
              >
                { menu.label }
                <Typography
                  component="span"
                  variant="caption"
                  sx={ { fontFamily: 'monospace', ml: 0.5, color: 'text.disabled', fontSize: 10 } }
                >
                  { menu.href }
                </Typography>
              </Typography>
            )) }
          </Box>
          <Chip label={ GNB.cta } color="primary" size="small" />
        </Box>

        {/* Footer 목업 */}
        <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1.5 } }>Footer</Typography>
        <Box
          sx={ {
            px: 3,
            py: 2.5,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            bgcolor: 'action.hover',
            mb: 5,
          } }
        >
          <Typography variant="body2" sx={ { fontWeight: 500, mb: 1.5 } }>
            { FOOTER.tagline }
          </Typography>
          <Box sx={ { display: 'flex', gap: 2, mb: 1.5 } }>
            { FOOTER.menus.map((menu) => (
              <Typography key={ menu } variant="caption" color="text.secondary">
                { menu }
              </Typography>
            )) }
            <Typography variant="caption" color="primary.main">
              { FOOTER.communityLink }
            </Typography>
          </Box>
          <Typography variant="caption" color="text.disabled">
            { FOOTER.copyright }
          </Typography>
        </Box>

        {/* ═══════════════════ PART 3: 재사용 텍스트 패턴 ═══════════════════ */}
        <SectionTitle
          title="재사용 텍스트 패턴"
          description="CTA, 뱃지, 카드 라벨 — 여러 페이지에서 반복 사용되는 텍스트"
        />

        {/* CTA 라벨 */}
        <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1.5 } }>CTA 라벨</Typography>
        <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 } }>
          { Object.entries(CTA_LABELS).map(([key, label]) => (
            <Box key={ key } sx={ { textAlign: 'center' } }>
              <Chip label={ label } color="primary" size="small" />
              <Typography
                variant="caption"
                display="block"
                sx={ { fontFamily: 'monospace', fontSize: 10, mt: 0.5, color: 'text.secondary' } }
              >
                { key }
              </Typography>
            </Box>
          )) }
        </Box>

        {/* 코호트 뱃지 */}
        <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1.5 } }>코호트 뱃지</Typography>
        <Box sx={ { display: 'flex', gap: 1.5, mb: 4 } }>
          <Box sx={ { textAlign: 'center' } }>
            <Chip label={ COHORT_BADGES.recruiting } color="success" size="small" />
            <Typography
              variant="caption"
              display="block"
              sx={ { fontFamily: 'monospace', fontSize: 10, mt: 0.5, color: 'text.secondary' } }
            >
              recruiting
            </Typography>
          </Box>
          <Box sx={ { textAlign: 'center' } }>
            <Chip label={ COHORT_BADGES.ongoing(3) } color="primary" size="small" />
            <Typography
              variant="caption"
              display="block"
              sx={ { fontFamily: 'monospace', fontSize: 10, mt: 0.5, color: 'text.secondary' } }
            >
              ongoing(n)
            </Typography>
          </Box>
          <Box sx={ { textAlign: 'center' } }>
            <Chip label={ COHORT_BADGES.upcoming(4) } color="default" size="small" variant="outlined" />
            <Typography
              variant="caption"
              display="block"
              sx={ { fontFamily: 'monospace', fontSize: 10, mt: 0.5, color: 'text.secondary' } }
            >
              upcoming(n)
            </Typography>
          </Box>
        </Box>

        {/* 코스 카드 라벨 */}
        <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1.5 } }>코스 카드 라벨</Typography>
        <Box
          sx={ {
            display: 'inline-flex',
            flexDirection: 'column',
            gap: 1,
            p: 2.5,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            mb: 5,
          } }
        >
          <Typography variant="caption" color="text.secondary">
            { COURSE_CARD_LABELS.target('디자이너') }
          </Typography>
          <Typography variant="body2" color="primary.main" sx={ { fontWeight: 500 } }>
            { COURSE_CARD_LABELS.link }
          </Typography>
        </Box>

        {/* ═══════════════════ PART 4: 시스템 메시지 ═══════════════════ */}
        <SectionTitle
          title="시스템 메시지"
          description="STATUS_MESSAGES — 에러, 빈 상태, 성공 피드백"
        />

        <Box sx={ { display: 'flex', flexDirection: 'column', gap: 3, mb: 5 } }>
          { Object.entries(STATUS_MESSAGES).map(([category, messages]) => (
            <Box key={ category }>
              <Typography
                variant="subtitle2"
                sx={ {
                  fontWeight: 700,
                  mb: 1.5,
                  textTransform: 'capitalize',
                  color: STATUS_COLORS[category],
                } }
              >
                { category }
              </Typography>
              <Box sx={ { display: 'flex', flexDirection: 'column', gap: 1 } }>
                { Object.entries(messages).map(([key, msg]) => (
                  <Box
                    key={ key }
                    sx={ {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      pl: 2,
                      py: 1,
                      borderLeft: '3px solid',
                      borderColor: STATUS_COLORS[category],
                      borderRadius: '0 4px 4px 0',
                      bgcolor: 'action.hover',
                    } }
                  >
                    <Typography
                      variant="caption"
                      sx={ {
                        fontFamily: 'monospace',
                        color: 'text.secondary',
                        minWidth: 140,
                        flexShrink: 0,
                        fontSize: 11,
                      } }
                    >
                      { key }
                    </Typography>
                    <Typography variant="body2">{ msg }</Typography>
                  </Box>
                )) }
              </Box>
            </Box>
          )) }
        </Box>

        {/* ═══════════════════ PART 5: 대체 텍스트 ═══════════════════ */}
        <SectionTitle
          title="대체 텍스트 (Alt) 템플릿"
          description="ALT_TEXT — 이미지 접근성을 위한 alt 속성 생성 함수"
        />

        <Box sx={ { display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 } }>
          { [
            { key: 'memberResult(name, course)', output: ALT_TEXT.memberResult('홍길동', '바이브 코딩 입문') },
            { key: 'experimentBefore(title)', output: ALT_TEXT.experimentBefore('색상 토큰') },
            { key: 'experimentAfter(title)', output: ALT_TEXT.experimentAfter('색상 토큰') },
            { key: 'memberAvatar(name)', output: ALT_TEXT.memberAvatar('홍길동') },
            { key: 'decorative', output: '' },
          ].map((item) => (
            <Box
              key={ item.key }
              sx={ {
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 2,
                py: 1.5,
                border: '1px dashed',
                borderColor: 'divider',
                borderRadius: 1,
              } }
            >
              <Box
                sx={ {
                  width: 48,
                  height: 48,
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                } }
              >
                <Typography variant="caption" color="text.disabled" sx={ { fontSize: 10 } }>IMG</Typography>
              </Box>
              <Box sx={ { flex: 1 } }>
                <Typography
                  variant="caption"
                  sx={ { fontFamily: 'monospace', color: 'text.secondary', fontSize: 11 } }
                >
                  { item.key }
                </Typography>
                <Typography variant="body2" sx={ { fontWeight: 500 } }>
                  { item.output
                    ? `alt="${item.output}"`
                    : <Box component="span" sx={ { color: 'text.disabled', fontStyle: 'italic' } }>alt=&quot;&quot; (장식 이미지)</Box>
                  }
                </Typography>
              </Box>
            </Box>
          )) }
        </Box>
      </PageContainer>
    </>
  ),
};
