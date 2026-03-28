/**
 * Glass Morphism 공유 스타일
 *
 * 반투명 배경 + 블러 효과의 글래스 컨테이너 패턴.
 * 투명도가 필수인 오버레이 특성상 opaque 시멘틱 토큰으로 대체 불가.
 * 글래스 패턴이 필요한 컴포넌트에서 공유 참조한다.
 *
 * @example
 * import { GLASS_SX } from '../../common/ui/glassSx';
 * <Box sx={{ ...GLASS_SX, p: 4 }}>내용</Box>
 */

/** 글래스 컨테이너 기본 스타일 */
export const GLASS_SX = {
	border: '1px solid',
	borderColor: 'rgba(255,255,255,0.08)',
	bgcolor: 'rgba(0,0,0,0.15)',
	backdropFilter: 'blur(24px)',
	WebkitBackdropFilter: 'blur(24px)',
};

/** 글래스 패턴 내부 구분선 */
export const GLASS_DIVIDER_SX = {
	borderTop: '1px solid',
	borderColor: 'rgba(255,255,255,0.12)',
};
