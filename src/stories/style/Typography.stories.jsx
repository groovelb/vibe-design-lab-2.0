import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
  TreeNode,
} from '../../components/storybookDocumentation';

export default {
  title: 'Style/Typography',
  parameters: {
    layout: 'padded',
  },
};

/**
 * 폰트 패밀리에서 첫 번째 이름만 추출
 * var(--font-suit, "SUIT Variable"), SUIT, ... → SUIT Variable
 */
const extractFontName = (fontFamily) => {
  if (!fontFamily) return '-';
  const match = fontFamily.match(/"([^"]+)"/);
  if (match) return match[1];
  const first = fontFamily.split(',')[0].trim();
  return first.replace(/^var\([^,]+,\s*/, '').replace(/\)$/, '').replace(/"/g, '');
};

/** 타이포그래피 시스템 문서 */
export const Docs = {
  render: () => {
    const theme = useTheme();

    // 토큰 구조 (트리 뷰용)
    const tokenStructure = {
      typography: {
        fontFamily: theme.typography.fontFamily,
        headingFontFamily: theme.typography.headingFontFamily,
        brandFontFamily: theme.typography.brandFontFamily,
        codeFontFamily: theme.typography.codeFontFamily,
        fontSize: theme.typography.fontSize,
        fontWeightLight: theme.typography.fontWeightLight,
        fontWeightRegular: theme.typography.fontWeightRegular,
        fontWeightMedium: theme.typography.fontWeightMedium,
        fontWeightBold: theme.typography.fontWeightBold,
        display: theme.typography.display,
        h1: theme.typography.h1,
        h2: theme.typography.h2,
        h3: theme.typography.h3,
        h4: theme.typography.h4,
        h5: theme.typography.h5,
        h6: theme.typography.h6,
        body1: theme.typography.body1,
        body2: theme.typography.body2,
        subtitle1: theme.typography.subtitle1,
        subtitle2: theme.typography.subtitle2,
        button: theme.typography.button,
        caption: theme.typography.caption,
        overline: theme.typography.overline,
        code: theme.typography.code,
        codeBlock: theme.typography.codeBlock,
      },
    };

    // 토큰 값 (테이블용)
    const tokenValues = [
      { variant: 'display', fontSize: theme.typography.display?.fontSize, fontWeight: theme.typography.display?.fontWeight, fontName: extractFontName(theme.typography.display?.fontFamily), usage: '히어로, 태그라인' },
      { variant: 'h1', fontSize: theme.typography.h1?.fontSize, fontWeight: theme.typography.h1?.fontWeight, fontName: extractFontName(theme.typography.h1?.fontFamily), usage: '페이지 메인 타이틀' },
      { variant: 'h2', fontSize: theme.typography.h2?.fontSize, fontWeight: theme.typography.h2?.fontWeight, fontName: extractFontName(theme.typography.h2?.fontFamily), usage: '섹션 타이틀' },
      { variant: 'h3', fontSize: theme.typography.h3?.fontSize, fontWeight: theme.typography.h3?.fontWeight, fontName: extractFontName(theme.typography.h3?.fontFamily), usage: '서브섹션 타이틀' },
      { variant: 'h4', fontSize: theme.typography.h4?.fontSize, fontWeight: theme.typography.h4?.fontWeight, fontName: extractFontName(theme.typography.h4?.fontFamily), usage: '카드 타이틀' },
      { variant: 'h5', fontSize: theme.typography.h5?.fontSize, fontWeight: theme.typography.h5?.fontWeight, fontName: extractFontName(theme.typography.h5?.fontFamily), usage: '작은 타이틀' },
      { variant: 'h6', fontSize: theme.typography.h6?.fontSize, fontWeight: theme.typography.h6?.fontWeight, fontName: extractFontName(theme.typography.h6?.fontFamily), usage: '라벨 타이틀' },
      { variant: 'subtitle1', fontSize: theme.typography.subtitle1?.fontSize, fontWeight: theme.typography.subtitle1?.fontWeight, fontName: extractFontName(theme.typography.fontFamily), usage: '서브타이틀' },
      { variant: 'subtitle2', fontSize: theme.typography.subtitle2?.fontSize, fontWeight: theme.typography.subtitle2?.fontWeight, fontName: extractFontName(theme.typography.fontFamily), usage: '작은 서브타이틀' },
      { variant: 'body1', fontSize: theme.typography.body1?.fontSize, fontWeight: theme.typography.body1?.fontWeight, fontName: extractFontName(theme.typography.fontFamily), usage: '본문 텍스트' },
      { variant: 'body2', fontSize: theme.typography.body2?.fontSize, fontWeight: theme.typography.body2?.fontWeight, fontName: extractFontName(theme.typography.fontFamily), usage: '보조 본문' },
      { variant: 'button', fontSize: theme.typography.button?.fontSize, fontWeight: theme.typography.button?.fontWeight, fontName: extractFontName(theme.typography.fontFamily), usage: '버튼 텍스트' },
      { variant: 'caption', fontSize: theme.typography.caption?.fontSize, fontWeight: theme.typography.caption?.fontWeight, fontName: extractFontName(theme.typography.fontFamily), usage: '캡션, 주석' },
      { variant: 'overline', fontSize: theme.typography.overline?.fontSize, fontWeight: theme.typography.overline?.fontWeight, fontName: extractFontName(theme.typography.fontFamily), usage: '라벨, 카테고리' },
      { variant: 'code', fontSize: theme.typography.code?.fontSize, fontWeight: theme.typography.code?.fontWeight, fontName: extractFontName(theme.typography.code?.fontFamily), usage: '인라인 코드' },
      { variant: 'codeBlock', fontSize: theme.typography.codeBlock?.fontSize, fontWeight: theme.typography.codeBlock?.fontWeight, fontName: extractFontName(theme.typography.codeBlock?.fontFamily), usage: '코드 블록' },
    ];

    // Font Weight 데이터
    const fontWeights = [
      { name: 'Light', token: 'fontWeightLight', value: theme.typography.fontWeightLight },
      { name: 'Regular', token: 'fontWeightRegular', value: theme.typography.fontWeightRegular },
      { name: 'Medium', token: 'fontWeightMedium', value: theme.typography.fontWeightMedium },
      { name: 'Bold', token: 'fontWeightBold', value: theme.typography.fontWeightBold },
    ];

    // display, code, codeBlock은 커스텀 variant이므로 sx로 렌더링
    const isCustomVariant = (v) => ['display', 'code', 'codeBlock'].includes(v);

    return (
      <>
        <DocumentTitle
          title="Typography"
          status="Available"
          note="Font and text style system"
          brandName="Vibe Design Labs"
          systemName="Design System"
          version="1.1"
        />
        <PageContainer>
          {/* 제목 + 1줄 개요 */}
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Typography System
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
            3-font 시스템: SUIT (프로덕트/헤딩) · IBM Plex Sans (브랜드/디스플레이) · IBM Plex Mono (코드)
          </Typography>

          {/* 토큰 구조 (트리 뷰) */}
          <SectionTitle title="토큰 구조" description="theme.typography 계층 구조" />
          <Box sx={ { p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 4 } }>
            { Object.entries(tokenStructure).map(([key, value]) => (
              <TreeNode key={ key } keyName={ key } value={ value } defaultOpen />
            )) }
          </Box>

          {/* 토큰 값 (테이블) - Typography Scale */}
          <SectionTitle title="토큰 값" description="Typography variant별 설정" />
          <TableContainer sx={ { mb: 4 } }>
            <Table sx={ { tableLayout: 'auto' } }>
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap' } }>Variant</TableCell>
                  <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap' } }>Font</TableCell>
                  <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap' } }>Size</TableCell>
                  <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap' } }>Weight</TableCell>
                  <TableCell sx={ { fontWeight: 600, width: '99%' } }>Sample</TableCell>
                  <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap' } }>용도</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { tokenValues.map((row) => (
                  <TableRow key={ row.variant }>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12, whiteSpace: 'nowrap', py: 2 } }>{ row.variant }</TableCell>
                    <TableCell sx={ { fontSize: 12, color: 'text.secondary', whiteSpace: 'nowrap', py: 2 } }>{ row.fontName }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12, whiteSpace: 'nowrap', py: 2 } }>{ row.fontSize || '-' }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12, whiteSpace: 'nowrap', py: 2 } }>{ row.fontWeight || '-' }</TableCell>
                    <TableCell sx={ { py: 2 } }>
                      { isCustomVariant(row.variant) ? (
                        <Box
                          component="span"
                          sx={ {
                            ...theme.typography[row.variant],
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          } }
                        >
                          Typography
                        </Box>
                      ) : (
                        <Typography
                          variant={ row.variant }
                          sx={ {
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          } }
                        >
                          Typography
                        </Typography>
                      ) }
                    </TableCell>
                    <TableCell sx={ { color: 'text.secondary', fontSize: 12, whiteSpace: 'nowrap', py: 2 } }>{ row.usage }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* Font Weight 테이블 */}
          <SectionTitle title="Font Weight" description="사용 가능한 폰트 굵기" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>Name</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Token</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Value</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Sample</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { fontWeights.map((row) => (
                  <TableRow key={ row.token }>
                    <TableCell>{ row.name }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ row.token }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ row.value }</TableCell>
                    <TableCell>
                      <Box component="span" sx={ { fontWeight: row.value } }>
                        The quick brown fox
                      </Box>
                    </TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* 사용 예시 */}
          <SectionTitle title="사용 예시" description="MUI Typography 컴포넌트 활용" />
          <Box
            component="pre"
            sx={ {
              backgroundColor: 'grey.100',
              p: 2,
              fontSize: 12,
              fontFamily: 'monospace',
              overflow: 'auto',
              borderRadius: 1,
              mb: 4,
            } }
          >
{ `// Typography variant 사용
<Typography variant="h1">페이지 타이틀</Typography>
<Typography variant="body1">본문 텍스트</Typography>

// 신규 variant (sx로 적용)
<Box sx={theme.typography.display}>히어로 텍스트</Box>
<Box component="code" sx={theme.typography.code}>인라인 코드</Box>
<Box component="pre" sx={theme.typography.codeBlock}>코드 블록</Box>

// color와 함께 사용
<Typography variant="h4" color="primary">Primary 컬러 제목</Typography>
<Typography variant="body2" color="text.secondary">보조 텍스트</Typography>` }
          </Box>

          {/* Vibe Coding Prompt */}
          <SectionTitle
            title="Vibe Coding Prompt"
            description="AI 코딩 도구에서 활용할 수 있는 프롬프트 예시"
          />
          <Box
            component="pre"
            sx={ {
              backgroundColor: 'grey.900',
              color: 'grey.100',
              p: 2,
              fontSize: 12,
              fontFamily: 'monospace',
              overflow: 'auto',
              borderRadius: 1,
            } }
          >
{ `/* 타이포그래피 토큰 활용 프롬프트 예시 */

"theme.typography.display를 사용해서 히어로 텍스트를 만들어줘.
IBM Plex Sans 700으로 렌더링되어야 해."

"인라인 코드는 theme.typography.code,
코드 블록은 theme.typography.codeBlock을 사용해줘."

"h1~h6은 SUIT 폰트, display는 IBM Plex Sans,
code/codeBlock은 IBM Plex Mono를 사용해야 해."` }
          </Box>
        </PageContainer>
      </>
    );
  },
};
