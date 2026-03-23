"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HorizontalScrollContainer } from "../content-transition/HorizontalScrollContainer";
import { RatioContainer } from "../container/RatioContainer";
import { AreaConstruct } from "../motion/AreaConstruct";
import { EXAMPLES } from "../../data/example";

/**
 * LandingShowcase 섹션 템플릿
 *
 * 바이브 디자인 결과물을 가로 스크롤로 보여주는 쇼케이스 섹션.
 * HorizontalScrollContainer로 세로→가로 스크롤 변환.
 * 상단 타이틀 + 하단 예제 요약 + 6장 슬라이드 카드.
 *
 * Example usage:
 * <LandingShowcase />
 */
export function LandingShowcase() {
	return (
		<HorizontalScrollContainer
			gap="24px"
			padding="max(16px, calc(50vw - 704px))"
			headerSpacing={8}
			footerSpacing={8}
			header={
				<Typography variant="h1" sx={{ color: "text.primary" }}>
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
					<Box sx={{ width: "calc(50vw - 80px)" }}>
						<AreaConstruct sx={{ borderRadius: 4 }}>
							<RatioContainer
								ratio="4:3"
								isContained
								sx={{
									borderRadius: 4,
									overflow: "hidden",
									border: "1px solid",
									borderColor: "divider",
								}}
							>
								<video
									src={ex.src}
									autoPlay
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
							{ex.title}
						</Typography>
						<Typography variant="body2" sx={{ color: "text.secondary" }}>
							{ex.description}
						</Typography>
					</Box>
				</HorizontalScrollContainer.Slide>
			))}
		</HorizontalScrollContainer>
	);
}
