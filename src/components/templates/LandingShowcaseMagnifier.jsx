"use client";
import { useCallback, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HorizontalScrollContainer } from "../content-transition/HorizontalScrollContainer";
import { RatioContainer } from "../container/RatioContainer";
import { AreaConstruct } from "../motion/AreaConstruct";
import { EXAMPLES } from "../../data/example";

/* ── 레이아웃 상수 ────
 * 중앙 프레임(45vw) 실제 크기 기준 사이드 카드 배치:
 * [24px peek] [gap] [W_side] [gap] [FRAME 45vw] [gap] [W_side] [gap] [24px peek] = 100vw
 * W_side = (100vw − 45vw − 6×24px) / 2 = 27.5vw − 72px
 * push offset = (FRAME_W − W_side) / 2 → 좌우 카드를 프레임 밖으로 밀어냄
 */
const FRAME_VW = 45;
const GAP_PX = 24;

const FRAME_W = `${FRAME_VW}vw`;
const CARD_W = `calc(27.5vw - 72px)`;
const TRACK_PAD = `calc(36.25vw + 36px)`;
const GAP = `${GAP_PX}px`;
const N = EXAMPLES.length;

/**
 * ShowcaseCard — 베이스 레이어 카드 (실제 크기 + 디밍)
 *
 * @param {object} example - { id, title, description, src } [Required]
 * @param {function} cardRef - DOM 참조 콜백 [Required]
 *
 * Example usage:
 * <ShowcaseCard example={EXAMPLES[0]} cardRef={(el) => { refs[0] = el; }} />
 */
function ShowcaseCard({ example, cardRef }) {
	return (
		<Box
			ref={cardRef}
			sx={{
				width: CARD_W,
				willChange: "opacity, filter, transform",
				opacity: 0.75,
				filter: "brightness(0.4)",
			}}
		>
			<AreaConstruct>
				<RatioContainer
					ratio="3:2"
					isContained
					sx={{
						overflow: "hidden",
						outline: (t) => `1px solid ${t.palette.divider}`,
					}}
				>
					<video
						src={example.src}
						loop
						muted
						playsInline
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
				</RatioContainer>
			</AreaConstruct>
		</Box>
	);
}

/**
 * LandingShowcaseMagnifier 섹션 템플릿
 *
 * Fixed-Frame Magnifier Carousel (dual-layer):
 * - Base layer: 축소(0.75×) + 디밍된 카드들이 가로 스크롤
 * - Magnified layer: 뷰포트 중앙 고정 프레임(overflow:hidden)이
 *   원본 크기 카드를 클리핑하여 노출. 프레임이 마스크 역할.
 * - 두 레이어는 동일 progress로 동기 스크롤.
 *
 * Example usage:
 * <LandingShowcaseMagnifier />
 */
export function LandingShowcaseMagnifier() {
	const cardRefs = useRef([]);
	const magnifiedTrackRef = useRef(null);
	const frameRef = useRef(null);
	const labelRefs = useRef([]);
	const titleRef = useRef(null);
	const labelWrapRef = useRef(null);
	const isHighlightRef = useRef(false);
	const prevDxRef = useRef([]);

	/**
	 * 1. 베이스 카드: proximity 기반 brightness 디밍
	 * 2. 확대 트랙: progress × scrollDistance 만큼 translateX
	 *
	 * stride = 인접 카드 중심 간 거리 (실제 레이아웃 기준)
	 * scrollDistance = stride × (N - 1)
	 */
	const updateAll = useCallback((progress) => {
		/* ── Highlight 모드: sticky 고정 중일 때 활성화 ── */
		const shouldHighlight = progress > 0.01 && progress < 0.99;
		if (shouldHighlight !== isHighlightRef.current) {
			isHighlightRef.current = shouldHighlight;
			window.dispatchEvent(
				new CustomEvent("ag-highlight", { detail: { active: shouldHighlight } }),
			);
		}

		const vCenter = window.innerWidth / 2;
		const isReduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		/* ── 베이스 카드 디밍 + 클리핑 + push offset ── */
		const fr = frameRef.current?.getBoundingClientRect();
		const clearL = fr ? fr.left - GAP_PX : -Infinity;
		const clearR = fr ? fr.right + GAP_PX : Infinity;
		const frameWpx = fr ? fr.width : 0;
		const firstCard = cardRefs.current[0];
		const cardWpx = firstCard ? firstCard.getBoundingClientRect().width : 0;
		const pushOffset = (frameWpx - cardWpx) / 2;
		const exactIdx = progress * (N - 1);
		const prevDx = prevDxRef.current;

		cardRefs.current.forEach((el, i) => {
			if (!el) return;
			if (isReduced) {
				el.style.opacity = "1";
				el.style.filter = "brightness(1)";
				el.style.clipPath = "none";
				el.style.transform = "none";
				return;
			}

			const rect = el.getBoundingClientRect();
			/* 이전 transform 보정 → 레이아웃 위치 복원 */
			const layoutLeft = rect.left - (prevDx[i] || 0);

			/* push offset: 프레임 좌우로 카드를 밀어냄 */
			const relPos = i - exactIdx;
			const sign = Math.abs(relPos) >= 0.5 ? Math.sign(relPos) : relPos * 2;
			const dx = sign * pushOffset;

			/* 시각적 위치 */
			const visLeft = layoutLeft + dx;
			const visRight = visLeft + rect.width;
			const visCenter = visLeft + rect.width / 2;

			const distance = Math.abs(visCenter - vCenter);
			const proximity = Math.min(distance / vCenter, 1);

			el.style.opacity = "0.75";
			el.style.filter = `brightness(${0.5 + (1 - proximity) * 0.5})`;

			/* 프레임+gap 영역 내 카드 clip */
			if (visRight <= clearL || visLeft >= clearR) {
				el.style.clipPath = "none";
			} else if (visLeft < clearL) {
				el.style.clipPath = `inset(0 ${visRight - clearL}px 0 0)`;
			} else if (visRight > clearR) {
				el.style.clipPath = `inset(0 0 0 ${clearR - visLeft}px)`;
			} else {
				el.style.clipPath = "inset(0 100% 0 0)";
			}

			el.style.transform = `translateX(${dx}px)`;
			prevDx[i] = dx;
		});

		/* ── 프레임 수직 중앙 정렬 (트랙 기준) + 타이틀 동기화 ── */
		if (frameRef.current && cardRefs.current[0]) {
			const cardRect = cardRefs.current[0].getBoundingClientRect();
			const trackCenterY = cardRect.top + cardRect.height / 2;
			frameRef.current.style.top = `${trackCenterY}px`;

			const frameH = frameRef.current.clientHeight;
			const frameTop = trackCenterY - frameH / 2;
			const frameBottom = trackCenterY + frameH / 2;

			if (titleRef.current) {
				titleRef.current.style.top = `${frameTop}px`;
			}
			if (labelWrapRef.current) {
				labelWrapRef.current.style.top = `${frameBottom + 16}px`;
			}
		}

		/* ── 확대 트랙 동기 스크롤 ── */
		if (magnifiedTrackRef.current && frameRef.current) {
			const frameW = frameRef.current.clientWidth;
			const magnifiedStride = frameW + 24;
			const totalScroll = magnifiedStride * (N - 1);
			magnifiedTrackRef.current.style.transform = `translateX(${-progress * totalScroll}px)`;
		}

		/* ── 활성 라벨만 표시 ── */
		const activeIdx = Math.round(progress * (N - 1));
		labelRefs.current.forEach((el, i) => {
			if (!el) return;
			el.style.opacity = i === activeIdx ? "1" : "0";
		});
	}, []);

	useEffect(() => {
		requestAnimationFrame(() => updateAll(0));
		return () => {
			if (isHighlightRef.current) {
				window.dispatchEvent(
					new CustomEvent("ag-highlight", { detail: { active: false } }),
				);
			}
		};
	}, [updateAll]);

	return (
		<HorizontalScrollContainer
			gap={GAP}
			padding={TRACK_PAD}
			snapCount={N}
			onScrollProgress={updateAll}
			header={
				<>
					{/* ── 좌측 상단 타이틀 오버레이 (top은 JS로 프레임 상단에 동기화) ── */}
					{/* <Typography
						ref={titleRef}
						variant="h3"
						sx={{
							position: "absolute",
							top: "50%",
							left: (t) => t.spacing(5),
							color: "text.primary",
							zIndex: 11,
						}}
					>
						Figma를 스킵하고
						<br />바이브 디자인으로 만들었습니다.
					</Typography> */}

					{/* ── 마스킹 프레임 (overflow:hidden = clip mask) ── */}
					<Box
						ref={frameRef}
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: FRAME_W,
							aspectRatio: "3/2",
							outline: (t) => `1px solid ${t.palette.divider}`,
							overflow: "hidden",
							pointerEvents: "none",
							zIndex: 10,
						}}
					>
						{/* 확대 트랙 — base track과 동기 스크롤 */}
						<Box
							ref={magnifiedTrackRef}
							sx={{
								display: "flex",
								gap: "24px",
								height: "100%",
								alignItems: "center",
								willChange: "transform",
							}}
						>
							{EXAMPLES.map((ex) => (
								<Box
									key={ex.id}
									sx={{
										width: FRAME_W,
										flexShrink: 0,
										height: "100%",
									}}
								>
									<RatioContainer
										ratio="3:2"
										isContained
										sx={{
											overflow: "hidden",
										}}
									>
										<video
											src={ex.src}
											loop
											muted
											playsInline
											autoPlay
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
											}}
										/>
									</RatioContainer>
								</Box>
							))}
						</Box>
					</Box>

					{/* ── 프레임 하단 라벨 (top은 JS로 프레임 bottom+16px에 동기화) ── */}
					<Box
						ref={labelWrapRef}
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translateX(-50%)",
							textAlign: "center",
							pointerEvents: "none",
							zIndex: 11,
						}}
					>
						{EXAMPLES.map((ex, i) => (
							<Typography
								key={ex.id}
								ref={(el) => { labelRefs.current[i] = el; }}
								variant="h6"
								sx={{
									color: "text.secondary",
									position: "absolute",
									left: "50%",
									transform: "translateX(-50%)",
									whiteSpace: "nowrap",
									opacity: i === 0 ? 1 : 0,
									transition: "opacity 0.25s ease",
									willChange: "opacity",
								}}
							>
								{ex.title} — {ex.description}
							</Typography>
						))}
					</Box>
				</>
			}
		>
			{EXAMPLES.map((ex, i) => (
				<HorizontalScrollContainer.Slide key={ex.id}>
					<ShowcaseCard
						example={ex}
						cardRef={(el) => {
							cardRefs.current[i] = el;
						}}
					/>
				</HorizontalScrollContainer.Slide>
			))}
		</HorizontalScrollContainer>
	);
}
