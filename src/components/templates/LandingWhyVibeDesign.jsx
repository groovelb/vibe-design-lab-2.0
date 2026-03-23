"use client";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { SectionContainer } from "../container/SectionContainer";
import { StickyScrollContainer } from "../scroll/StickyScrollContainer";
import { ContextEngineAmbient } from "../motion/ContextEngineAmbient";
import { VdlLogo } from "../typography/VdlLogo";
import ScrollRevealText from "../kinetic-typography/ScrollRevealText";
import { BG_PARALLAX_SPEED } from "../motion/constants";
import { PAGES } from "../../data/contents";

const { whyVibeDesign } = PAGES.landing;

/**
 * LandingWhyVibeDesign 섹션 템플릿
 *
 * VDL의 디자인 철학을 전달하는 섹션.
 * VdlLogo + ScrollRevealText가 sticky 고정된 상태에서
 * 스크롤에 따라 텍스트가 순차적으로 드러난다.
 * 배경에 ContextEngineAmbient가 스크롤 진행에 따라 서서히 드러난다.
 * 배경색은 별도로 지정하지 않고 페이지 배경을 그대로 사용한다.
 *
 * Example usage:
 * <LandingWhyVibeDesign />
 */
export function LandingWhyVibeDesign() {
	const [progress, setProgress] = useState(0);

	return (
		<SectionContainer isFullWidth sx={{ py: 0 }}>
			<StickyScrollContainer onScrollProgress={setProgress}>
				{/* BG — 앰비언트 데이터 흐름 시각화 + 패럴럭스 */}
				<ContextEngineAmbient
					progress={progress}
					sx={{
						position: "absolute",
						inset: 0,
						zIndex: 0,
						transform: `translateY(${progress * (BG_PARALLAX_SPEED - 1) * 100}%)`,
						willChange: "transform",
					}}
				/>
				<Container
					maxWidth="xl"
					sx={{
						width: { md: "75%" },
						position: "relative",
						zIndex: 1,
						height: "100%",
						display: "flex",
						alignItems: "center",
					}}
				>
					<Stack spacing={{ xs: 8, md: 14 }}>
						<VdlLogo size={64} />
						<ScrollRevealText
							text={whyVibeDesign.statement}
							progress={progress}
							variant="h2"
							isSplitSentences={false}
							sx={{
								fontWeight: "600 !important",
								te67xtAlign: "left",
								letterSpacing: "-0.02em",
								wordSpacing: "0.15em",
								"& .MuiTypography-root": {
									lineHeight: 1.71,
									textAlign: "left",
								},
							}}
							mb={{ xs: 8, md: 14 }}
						/>
					</Stack>
				</Container>
			</StickyScrollContainer>
		</SectionContainer>
	);
}
