"use client";
import Box from "@mui/material/Box";
import { SectionContainer } from "../container/SectionContainer";
import { VdlLogo } from "../typography/VdlLogo";
import ScrollRevealText from "../kinetic-typography/ScrollRevealText";
import { PAGES } from "../../data/contents";

const { whyVibeDesign } = PAGES.landing;

/**
 * LandingWhyVibeDesign 섹션 템플릿
 *
 * VDL의 디자인 철학을 전달하는 ScrollRevealText 섹션.
 * 뷰포트 높이만큼 차지하며 스크롤에 따라 텍스트가 드러난다.
 *
 * Example usage:
 * <LandingWhyVibeDesign />
 */
export function LandingWhyVibeDesign() {
	return (
		<SectionContainer
			sx={{
				minHeight: "100svh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				py: 0,
			}}
		>
			<Box sx={{ mb: { xs: 6, md: 10 } }}>
				<VdlLogo size={120} />
			</Box>
			<ScrollRevealText
				text={whyVibeDesign.statement}
				variant="h1"
				component="h2"
				isSplitSentences={false}
				sx={{
					textAlign: "left",
					letterSpacing: "-0.02em",
					wordSpacing: "0.15em",
					"& .MuiTypography-root": { lineHeight: 1.71, textAlign: "left" },
				}}
			/>
		</SectionContainer>
	);
}
