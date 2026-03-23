"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { SectionContainer } from "../container/SectionContainer";
import { StickyScrollContainer } from "../scroll/StickyScrollContainer";
import { VdlLogo } from "../typography/VdlLogo";
import ScrollRevealText from "../kinetic-typography/ScrollRevealText";
import { PAGES } from "../../data/contents";

const { whyVibeDesign } = PAGES.landing;

/**
 * LandingWhyVibeDesign 섹션 템플릿
 *
 * VDL의 디자인 철학을 전달하는 섹션.
 * VdlLogo + ScrollRevealText가 sticky 고정된 상태에서
 * 스크롤에 따라 텍스트가 순차적으로 드러난다.
 *
 * Example usage:
 * <LandingWhyVibeDesign />
 */
export function LandingWhyVibeDesign() {
	const [progress, setProgress] = useState(0);

	return (
		<SectionContainer isFullWidth sx={{ py: 0 }}>
			<StickyScrollContainer onScrollProgress={setProgress}>
				<Container maxWidth="xl" sx={{ width: { md: "75%" } }}>
					<Box sx={{ mb: { xs: 6, md: 10 } }}>
						<VdlLogo size={64} />
					</Box>
					<ScrollRevealText
						text={whyVibeDesign.statement}
						progress={progress}
						variant="h1"
						isSplitSentences={false}
						sx={{
							textAlign: "left",
							letterSpacing: "-0.02em",
							wordSpacing: "0.15em",
							"& .MuiTypography-root": { lineHeight: 1.71, textAlign: "left" },
						}}
					/>
				</Container>
			</StickyScrollContainer>
		</SectionContainer>
	);
}
