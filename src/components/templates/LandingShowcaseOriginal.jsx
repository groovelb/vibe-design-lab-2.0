"use client";
import { useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HorizontalScrollContainer } from "../content-transition/HorizontalScrollContainer";
import { RatioContainer } from "../container/RatioContainer";
import { AreaConstruct } from "../motion/AreaConstruct";
import { EXAMPLES } from "../../data/example";

/**
 * ShowcaseCard — 호버 시 재생 + grayscale→color 전환 카드
 *
 * @param {object} example - { id, title, description, src } [Required]
 *
 * Example usage:
 * <ShowcaseCard example={EXAMPLES[0]} />
 */
function ShowcaseCard({ example }) {
	const videoRef = useRef(null);

	const handleMouseEnter = useCallback(() => {
		const v = videoRef.current;
		if (v) { v.currentTime = 0; v.play(); }
	}, []);

	const handleMouseLeave = useCallback(() => {
		const v = videoRef.current;
		if (v) v.pause();
	}, []);

	return (
		<Box
			sx={{ width: "calc(50vw - 80px)", cursor: "pointer" }}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<AreaConstruct sx={{ borderRadius: 4 }}>
				<RatioContainer
					ratio="4:3"
					isContained
					sx={{
						borderRadius: 1,
						overflow: "hidden",
						border: "1px solid",
						borderColor: "divider",
						opacity: 0.6,
						transition: "opacity 0.4s ease",
						"&:hover": { opacity: 1 },
					}}
				>
					<video
						ref={videoRef}
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
				variant="body1"
				sx={{ mt: 1.5, color: "text.primary" }}
			>
				{example.title}
			</Typography>
			<Typography variant="body2" sx={{ color: "text.secondary" }}>
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
 * 상단 타이틀 + 하단 예제 요약 + 슬라이드 카드.
 * 각 카드는 hover 시 재생 + opacity 전환.
 *
 * Example usage:
 * <LandingShowcaseOriginal />
 */
export function LandingShowcaseOriginal() {
	return (
		<HorizontalScrollContainer
			gap="24px"
			padding="max(16px, calc(50vw - 704px))"
			headerSpacing={14}
			footerSpacing={14}
			header={
				<Typography variant="h2" sx={{ color: "text.primary" }}>
					Figma를 스킵하고 바이브 디자인으로 만든 결과물입니다.
				</Typography>
			}
			footer={
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 0.5,
					}}
				>
					{EXAMPLES.map((ex) => (
						<Typography
							key={ex.id}
							variant="body2"
							sx={{ color: "text.secondary" }}
						>
							{ex.title} — {ex.description}
						</Typography>
					))}
				</Box>
			}
		>
			{EXAMPLES.map((ex) => (
				<HorizontalScrollContainer.Slide key={ex.id}>
					<ShowcaseCard example={ex} />
				</HorizontalScrollContainer.Slide>
			))}
		</HorizontalScrollContainer>
	);
}
