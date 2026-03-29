"use client";
import { useCallback, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HorizontalScrollContainer } from "../content-transition/HorizontalScrollContainer";
import { RatioContainer } from "../container/RatioContainer";
import { AreaConstruct } from "../motion/AreaConstruct";
import { EXAMPLES } from "../../data/example";

const N = EXAMPLES.length;

/**
 * ShowcaseCard — 비디오 카드
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
				width: { xs: "calc(85vw - 32px)", md: "calc(50vw - 80px)" },
				opacity: 0.5,
				transition: "opacity 0.4s ease",
			}}
		>
			<AreaConstruct sx={{ borderRadius: 4 }}>
				<RatioContainer
					ratio="3:2"
					isContained
					data-role="frame"
					sx={{
						borderRadius: 1,
						overflow: "hidden",
						border: "1px solid transparent",
						transition: "border-color 0.4s ease",
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
			<Typography
				variant="h5"
				sx={{ mt: 2, color: "text.primary" }}
			>
				{example.title}
			</Typography>
			<Typography variant="body1" sx={{ color: "text.secondary" }}>
				{example.description}
			</Typography>
		</Box>
	);
}

/**
 * LandingShowcaseOriginal 섹션 템플릿
 *
 * 바이브 디자인 결과물을 가로 스크롤로 보여주는 쇼케이스 섹션.
 * HorizontalScrollContainer로 세로→가로 스크롤 변환.
 * 활성 카드는 border + 영상 재생, 비활성은 opacity 0.5.
 *
 * Example usage:
 * <LandingShowcaseOriginal />
 */
export function LandingShowcaseOriginal() {
	const cardRefs = useRef([]);

	const updateAll = useCallback((progress) => {
		const activeIdx = Math.round(progress * (N - 1));

		cardRefs.current.forEach((el, i) => {
			if (!el) return;
			const isActive = i === activeIdx;
			const video = el.querySelector("video");
			const frame = el.querySelector("[data-role='frame']");

			el.style.opacity = isActive ? "1" : "0.33";

			if (frame) {
				frame.style.borderColor = isActive ? "rgba(255,255,255,0.3)" : "transparent";
			}

			if (video) {
				if (isActive) {
					if (video.paused) video.play();
				} else {
					if (!video.paused) video.pause();
				}
			}
		});
	}, []);

	useEffect(() => {
		requestAnimationFrame(() => updateAll(0));
	}, [updateAll]);

	return (
		<HorizontalScrollContainer
			gap="24px"
			padding="max(16px, calc(50vw - 704px))"
			headerSpacing={14}
			footerSpacing={14}
			onScrollProgress={updateAll}
			header={
				<Typography variant="h2" sx={{ color: "text.primary" }}>
					Figma를 스킵하고 바이브 디자인으로 만든 결과물입니다.
				</Typography>
			}
		>
			{EXAMPLES.map((ex, i) => (
				<HorizontalScrollContainer.Slide key={ex.id}>
					<ShowcaseCard
						example={ex}
						cardRef={(el) => { cardRefs.current[i] = el; }}
					/>
				</HorizontalScrollContainer.Slide>
			))}
		</HorizontalScrollContainer>
	);
}
