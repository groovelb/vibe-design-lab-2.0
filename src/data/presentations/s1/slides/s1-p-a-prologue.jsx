/**
 * Part S1-P-A — 프롤로그: 10년간의 디발자
 */
import {
	SlideChapterTitle,
	SlideHSplit,
	SlideGrid,
	SlideTypoStack,
	SlideList,
	SlideStorytelling,
	SlideImage,
	SlideDescList,
} from "../../../../components/presentation";
import Box from "@mui/material/Box";
import { presentationTokens as t } from "../../../../styles/themes/presentation";

import refDashboard from "../../assets/reference/dashboard.png";
import refDynamicGrid from "../../assets/reference/dynamic-grid.png";
import refLumenState from "../../assets/reference/lumen-state.png";
import refPlasticLiteracy from "../../assets/reference/plastic-literacy.png";
import refDigitalMayor from "../../assets/reference/digital_mayor.png";

// ═══════════════════════════════════════════════════════════
// 텍스트 & 이미지 데이터
// ═══════════════════════════════════════════════════════════

const CHAPTER = {
	overline: "PROLOGUE",
	title: "디자인의 본질은 도구일까, 의도일까?",
	summary: "10년간의 디발자: 디자이너이자 개발자로서 깨달은 것",
};

const INTRO = {
	title: "Data Driven Design",
	body: "https://dddesign.io",
	services: [
		{
			title: "팀빌딩이 완성되지 않은 스타트업",
			desc: "이빨이 하나 없어도 사업이 돌아가게 도와줍니다.",
		},
		{
			title: "R & D 가 필요한 MVP 시장 진출",
			desc: "결정장애가 왔을때 무엇을 어떻게 만들지 고민합니다.",
		},
		{
			title: "인터랙티브 웹 + 데이터 시각화",
			desc: "이런건 어떻게 만들지? 라는걸 만들어 줍니다.",
		},
	],
};

const CAREER = {
	roles: [
		"Researcher",
		"UX Design",
		"UX Engineer",
		"UI Design",
		"Front-End Developer",
	],
	history: [
		{
			title: "소셜 미디어 스타트업",
			desc: "사용자 리서치, UX 디자인, 프로토타이핑",
		},
		{
			title: "여행 스타트업",
			desc: "프로덕트 디자인, 디자인 시스템, 프론트엔드 개발",
		},
		{
			title: "Data Driven Design",
			desc: "조직 체질 개선, 디자인 컨설팅, 제품 개발",
		},
		{
			title: "Vibe Design Lab",
			desc: "바이브 코딩 교육, 바이브 코딩 환경 컨설팅",
		},
	],
};

const PORTFOLIO = {
	title: "유저 리서치 → 기획 → UX설계 → \n 디자인 시스템 → 디자인 고도화",
	body: "*위 업무간의 연결고리가 바이브 코딩에서도 중요합니다",
	image: "/presentations/project_ddd.png",
};

const INTENT_DIAGRAM = {
	phases: ["맥락", "구조", "표면"],
	processChain: [
		"유저 리서치",
		"기획",
		"UX 설계",
		"디자인 시스템",
		"디자인 고도화",
	],
	centerMessage: "생각의 흐름이 깨지고, 결과물을 해석하게 됩니다.",
	bottomAnnotations: [
		"의도가 발생하는 지점",
		"구현이 시작되야하는 지점",
		"실제로 개발이 시작되는 지점",
	],
};

const CAR_DESIGN = {
	steps: ["스케치", "조감도", "설계도", "부품도", "최종 렌더링"],
	images: [
		{
			src: "/presentations/generated/car-01-sketch_v3.webp",
			alt: "스케치 — 아이디어를 빠르게 시각화",
		},
		{
			src: "/presentations/generated/car-02-birdseye_v3.webp",
			alt: "조감도 — 전체 형태와 비율 확인",
		},
		{
			src: "/presentations/generated/car-03-blueprint_v3.webp",
			alt: "설계도 — 구조와 치수를 정밀하게 정의",
		},
		{
			src: "/presentations/generated/car-04-parts_v4.webp",
			alt: "부품도 — 개별 파트를 분리하여 제작 가능하게",
		},
		{
			src: "/presentations/generated/car-05-final_v2.webp",
			alt: "최종 렌더링 — 실제 환경에서의 완성 모습",
		},
	],
};

const DIGITAL_DESIGN = {
	steps: ["스케치", "목업(시안)", "UX 설계", "디자인 시스템", "최종 GUI"],
	images: [
		{
			src: "/presentations/generated/app-01-sketch_v1.webp",
			alt: "스케치 — 손으로 그리는 와이어프레임",
		},
		{
			src: "/presentations/generated/app-02-mockup_v1.webp",
			alt: "목업(시안) — 시각적 방향성 제시",
		},
		{
			src: "/presentations/generated/app-03-ux_v1.webp",
			alt: "UX 설계 — 구조와 흐름을 정밀하게 정의",
		},
		{
			src: "/presentations/generated/app-04-system_v1.webp",
			alt: "디자인 시스템 — 재사용 가능한 요소 체계화",
		},
		{
			src: "/presentations/generated/app-05-final_v1.webp",
			alt: "최종 GUI — 실제 환경에서의 완성 인터페이스",
		},
	],
};

const COMPARISON = {
	rows: [
		{
			phase: "아이디어",
			num: 1,
			desc: "",
			car: "스케치",
			carImg: CAR_DESIGN.images[0].src,
			bridge: "",
			digital: "스케치",
			digitalImg: DIGITAL_DESIGN.images[0].src,
			sep: "dashed",
		},
		{
			num: 2,
			desc: "",
			car: "조감도",
			carImg: CAR_DESIGN.images[1].src,
			bridge: "",
			digital: "시안",
			digitalImg: DIGITAL_DESIGN.images[1].src,
			sep: "accent",
		},
		{
			phase: "설계",
			num: 3,
			desc: "아이디어가 구현되기 위한 구조를 설계",
			car: "설계도",
			carImg: CAR_DESIGN.images[2].src,
			bridge: "코드와 디자인이 만나는 지점",
			digital: "UX 설계",
			digitalImg: DIGITAL_DESIGN.images[2].src,
			sep: "normal",
		},
		{
			num: 4,
			desc: "각 구성 요소의 상세가 정해지는 시점",
			car: "부품 상세",
			carImg: CAR_DESIGN.images[3].src,
			bridge: "",
			digital: "디자인 시스템",
			digitalImg: DIGITAL_DESIGN.images[3].src,
			sep: "accent",
		},
		{
			phase: "디자인",
			num: 5,
			desc: "구성 요소들을 설계도에 맞게 조립",
			car: "최종 렌더링",
			carImg: CAR_DESIGN.images[4].src,
			bridge: "실제로 사람들이 집중하는 지점",
			digital: "최종 GUI",
			digitalImg: DIGITAL_DESIGN.images[4].src,
		},
	],
};

const LANGUAGE = {
	storytelling: {
		from: `BUTTON이라는 글자는 고작\n6bit 데이터 덩어리`,
		to: `하지만 언어는 인간의 경험과 역사를 응축합니다`,
	},
	headline: "대표성 있는 언어",
	body: "이런 대표성 있는 언어를 조합해서 우리의 의도를 AI에게 전달해야 합니다. 단어 하나에 담긴 맥락이 AI의 해석 품질을 결정하기 때문이죠.",
	buttons: [
		{
			src: "/presentations/generated/btn-physical_v1.webp",
			label: "물리적 버튼",
		},
		{ src: "/presentations/generated/btn-ui_v1.webp", label: "UI 버튼" },
		{ src: "/presentations/generated/btn-sewing_v1.webp", label: "단추" },
	],
};

const WRITING_ERA = {
	storytelling: {
		from: "디자인 감각이 부족해서 항상 글로 정리해왔습니다.",
		to: "지금은 이 습관이 AI 시대의 최대 장점이 되었습니다.",
	},
	headline: "이 코스는",
	body: "지난 커리어 10년의 노하우를 바이브 코딩 환경에 녹인 것입니다. 도구가 바뀌어도 유효한 디자인 언어 체계를 함께 만들어갑니다.",
};

const REFERENCE = [
	{
		src: refDashboard.src,
		caption: "Dashboard",
		rules: [
			"정보의 우선순위 & 정책이 중요",
			"색상 의미에 따른 규칙",
			"중요도에 따른 레이아웃 규칙",
		],
	},
	{
		src: refDigitalMayor.src,
		caption: "Digital Mayor",
		rules: [
			"시정 지표의 분류가 중요",
			"적합한 분류 체계와 그리드",
			"상황에 알맞은 시각화 규칙",
		],
	},
	{
		src: refDynamicGrid.src,
		caption: "Dynamic Grid",
		rules: [
			"안정적인 그리드에 인터랙티브 요소",
			"이미지 톤과 무드에 대한 규칙",
			"그리드가 움직임에 대한 규칙",
		],
	},
	{
		src: refPlasticLiteracy.src,
		caption: "Plastic Literacy",
		rules: [
			"실제 데이터 기반의 인터랙티브 차트",
			"시각화에 대한 규칙",
			"움직임에 대한 규칙",
		],
	},
	{
		src: refLumenState.src,
		caption: "Lumen State",
		rules: [
			"밤과 낮의 전환을 자연스럽게 표현",
			"이미지 톤 & 무드에 대한 규칙",
			"철저히 계산된 그리드에 대한 규칙",
		],
	},
];

// ═══════════════════════════════════════════════════════════
// 슬라이드 (ChapterTitle 제외)
// ═══════════════════════════════════════════════════════════

const contentSlides = [
	{
		id: "S1-P-A-1",
		title: "코스 리드 소개: DDD",
		render: () => (
			<SlideHSplit>
				<SlideTypoStack title={INTRO.title} body={INTRO.body} />
				<SlideDescList items={INTRO.services} />
			</SlideHSplit>
		),
	},
	{
		id: "S1-P-A-2",
		// title: '커리어 타임라인',
		render: () => (
			<SlideHSplit>
				<SlideList items={CAREER.roles} level="headline" />
				<SlideDescList items={CAREER.history} />
			</SlideHSplit>
		),
	},
	{
		id: "S1-P-A-3",
		// title: '포트폴리오',
		render: () => (
			<SlideHSplit>
				<SlideTypoStack title={PORTFOLIO.title} body={PORTFOLIO.body} />
				<SlideImage src={PORTFOLIO.image} alt="포트폴리오 프로젝트 그리드" />
			</SlideHSplit>
		),
	},
	{
		id: "S1-P-A-4",
		title: "왜 의도를 쪼개야 하는가",
		render: () => (
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					height: "100%",
					position: "relative",
				}}
			>
				<Box
					sx={{
						position: "absolute",
						left: "33.33%",
						top: 0,
						bottom: 0,
						width: "1px",
						background:
							"repeating-linear-gradient(to bottom, var(--vdl-700) 0px, var(--vdl-700) 6px, transparent 6px, transparent 20px)",
						zIndex: 0,
					}}
				/>
				<Box
					sx={{
						position: "absolute",
						left: "66.66%",
						top: 0,
						bottom: 0,
						width: "1px",
						background:
							"repeating-linear-gradient(to bottom, var(--vdl-700) 0px, var(--vdl-700) 6px, transparent 6px, transparent 20px)",
						zIndex: 0,
					}}
				/>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr 1fr",
						position: "relative",
						zIndex: 1,
					}}
				>
					{INTENT_DIAGRAM.phases.map((label) => (
						<Box
							key={label}
							sx={{
								textAlign: "center",
								fontFamily: t.fontFamily.heading,
								fontSize: t.typo.title.fontSize,
								fontWeight: t.typo.title.fontWeight,
								lineHeight: t.typo.title.lineHeight,
								color: t.color.textSecondary,
							}}
						>
							{label}
						</Box>
					))}
				</Box>
				<Box
					component="svg"
					viewBox="0 0 1200 600"
					preserveAspectRatio="xMidYMid meet"
					sx={{
						flex: 1,
						width: "100%",
						mt: `${t.spacing.section}px`,
						position: "relative",
						zIndex: 1,
					}}
				>
					<path
						d="M40,390 V210 H1160 V390"
						fill="none"
						stroke="var(--vdl-100)"
						strokeWidth="1"
					/>
					<line
						x1="40"
						y1="390"
						x2="1160"
						y2="390"
						stroke="var(--vdl-100)"
						strokeWidth="1"
					/>
					<path
						d="M52,308 L40,292 L28,308"
						fill="none"
						stroke="var(--vdl-100)"
						strokeWidth="1.5"
					/>
					<path
						d="M1150,292 L1160,308 L1170,292"
						fill="none"
						stroke="var(--vdl-100)"
						strokeWidth="1.5"
					/>

					{/* Process chain labels */}
					{[
						{ x: 120, w: 124, label: INTENT_DIAGRAM.processChain[0] },
						{ x: 340, w: 64, label: INTENT_DIAGRAM.processChain[1] },
						{
							x: 600,
							w: 112,
							label: INTENT_DIAGRAM.processChain[2],
							hero: true,
						},
						{ x: 880, w: 136, label: INTENT_DIAGRAM.processChain[3] },
						{ x: 1100, w: 136, label: INTENT_DIAGRAM.processChain[4] },
					].map(({ x, w, label, hero }) => (
						<g key={label}>
							<rect
								x={x - w / 2}
								y={hero ? 195 : 197}
								width={w}
								height={hero ? 30 : 26}
								fill="var(--vdl-950)"
							/>
							<text
								x={x}
								y="210"
								fill="var(--vdl-100)"
								fontSize={hero ? 22 : 18}
								fontWeight={hero ? 700 : undefined}
								fontFamily={t.fontFamily.heading}
								textAnchor="middle"
								dominantBaseline="central"
							>
								{label}
							</text>
						</g>
					))}

					<text
						x="600"
						y="305"
						fill="var(--vdl-100)"
						fontSize="22"
						fontWeight="600"
						fontFamily={t.fontFamily.heading}
						textAnchor="middle"
					>
						{INTENT_DIAGRAM.centerMessage}
					</text>

					{INTENT_DIAGRAM.bottomAnnotations.map((text, i) => (
						<text
							key={text}
							x={200 + i * 400}
							y="510"
							fill="var(--vdl-100)"
							fontSize="16"
							fontWeight="700"
							fontFamily={t.fontFamily.heading}
							textAnchor="middle"
						>
							{text}
						</text>
					))}
				</Box>
			</Box>
		),
	},
	{
		id: "S1-P-A-5",
		title: "설계 과정: 자동차",
		render: () => (
			<SlideGrid columns={3}>
				<SlideList items={CAR_DESIGN.steps} variant="number" level="headline" />
				{CAR_DESIGN.images.map(({ src, alt }) => (
					<SlideImage key={src} src={src} alt={alt} />
				))}
			</SlideGrid>
		),
	},
	{
		id: "S1-P-A-6",
		title: "설계 과정: 디지털 프로덕트",
		render: () => (
			<SlideGrid columns={3}>
				<SlideList
					items={DIGITAL_DESIGN.steps}
					variant="number"
					level="headline"
				/>
				{DIGITAL_DESIGN.images.map(({ src, alt }) => (
					<SlideImage key={src} src={src} alt={alt} />
				))}
			</SlideGrid>
		),
	},
	{
		id: "S1-P-A-7",
		title: "시각 언어의 대응 관계",
		render: () => {
			const SEP_STYLES = {
				dashed: `1px dashed var(--vdl-700)`,
				accent: `2px solid var(--vdl-500)`,
				normal: `1px solid var(--vdl-800)`,
			};
			return (
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "100px 200px 1fr 1.2fr 1fr",
						gridTemplateRows: `repeat(${COMPARISON.rows.length}, 1fr)`,
						height: "100%",
						width: "100%",
					}}
				>
					{COMPARISON.rows.flatMap((row, i) => {
						const bb = row.sep ? SEP_STYLES[row.sep] : "none";
						const vDash = "1px dashed var(--vdl-700)";
						const cellBase = {
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							borderBottom: bb,
						};
						const labelStyle = {
							fontFamily: t.fontFamily.heading,
							fontSize: t.typo.caption.fontSize,
							fontWeight: t.typo.caption.fontWeight,
							lineHeight: t.typo.caption.lineHeight,
							color: t.color.text,
							textAlign: "center",
						};
						return [
							/* Stage */
							<Box
								key={`${i}-s`}
								sx={{
									...cellBase,
									borderRight: vDash,
									flexDirection: "column",
								}}
							>
								{row.phase && (
									<Box
										sx={{
											...labelStyle,
											fontWeight: 700,
											fontSize: t.typo.body.fontSize,
										}}
									>
										{row.phase}
									</Box>
								)}
								<Box
									sx={{
										...labelStyle,
										color: row.phase ? t.color.textSecondary : t.color.text,
									}}
								>
									{row.num}
								</Box>
							</Box>,
							/* Desc */
							<Box
								key={`${i}-d`}
								sx={{
									...cellBase,
									borderRight: vDash,
									px: `${t.spacing.tight}px`,
								}}
							>
								{row.desc && (
									<Box
										sx={{
											fontFamily: t.fontFamily.body,
											fontSize: t.typo.caption.fontSize,
											fontWeight: 700,
											lineHeight: t.typo.caption.lineHeight,
											color: t.color.text,
										}}
									>
										{row.desc}
									</Box>
								)}
							</Box>,
							/* Car */
							<Box
								key={`${i}-c`}
								sx={{
									...cellBase,
									flexDirection: "column",
									gap: `${t.spacing.tight / 2}px`,
								}}
							>
								{row.carImg && (
									<Box
										component="img"
										src={row.carImg}
										alt={row.car}
										sx={{
											height: 48,
											width: "auto",
											borderRadius: "4px",
											objectFit: "cover",
										}}
									/>
								)}
								<Box sx={labelStyle}>{row.car}</Box>
							</Box>,
							/* Bridge */
							<Box key={`${i}-b`} sx={cellBase}>
								{row.bridge && (
									<Box
										sx={{
											fontFamily: t.fontFamily.heading,
											fontSize: t.typo.body.fontSize,
											fontWeight: 700,
											color: "var(--vdl-50)",
											textAlign: "center",
											filter:
												"drop-shadow(0 0 12px var(--vdl-300)) drop-shadow(0 0 40px var(--vdl-500))",
											transition: "filter 1.5s ease-in-out",
											"&:hover": {
												filter:
													"drop-shadow(0 0 24px var(--vdl-200)) drop-shadow(0 0 60px var(--vdl-400))",
											},
										}}
									>
										{row.bridge}
									</Box>
								)}
							</Box>,
							/* Digital */
							<Box
								key={`${i}-g`}
								sx={{
									...cellBase,
									flexDirection: "column",
									gap: `${t.spacing.tight / 2}px`,
								}}
							>
								{row.digitalImg && (
									<Box
										component="img"
										src={row.digitalImg}
										alt={row.digital}
										sx={{
											height: 48,
											width: "auto",
											borderRadius: "4px",
											objectFit: "cover",
										}}
									/>
								)}
								<Box sx={labelStyle}>{row.digital}</Box>
							</Box>,
						];
					})}
				</Box>
			);
		},
	},
	{
		id: "S1-P-A-8",
		title: "언어로 만드는 디자인",
		render: () => (
			<SlideStorytelling
				from="왠만한 디자인은 규칙의 조합으로 정의할 수 있습니다."
				to="언어로 만드는 디자인"
			/>
		),
	},
	...REFERENCE.map((ref, i) => ({
		id: `S1-P-A-${9 + i}`,
		// title: ref.caption,
		render: () => (
			<SlideHSplit sx={{ gridTemplateColumns: "1fr 1.618fr" }}>
				<SlideList items={ref.rules} level="body" />
				<Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
					<SlideImage src={ref.src} alt={ref.caption} />
					<Box
						sx={{
							fontFamily: t.fontFamily.body,
							fontSize: t.typo.caption.fontSize,
							color: t.color.textSecondary,
							mt: `${t.spacing.tight}px`,
							textAlign: "center",
						}}
					>
						{ref.caption}
					</Box>
				</Box>
			</SlideHSplit>
		),
	})),
	{
		id: "S1-P-A-14",
		title: "언어는 경험을 함축한다",
		render: () => (
			<SlideHSplit>
				<SlideStorytelling
					from={LANGUAGE.storytelling.from}
					to={LANGUAGE.storytelling.to}
				/>
				<Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
					<SlideTypoStack headline={LANGUAGE.headline} body={LANGUAGE.body} />
					<Box
						sx={{
							mt: `${t.spacing.element}px`,
							display: "flex",
							flexDirection: "column",
							gap: `${t.spacing.tight}px`,
						}}
					>
						{/* UI 버튼 — 히어로 */}
						<Box sx={{ textAlign: "center" }}>
							<SlideImage
								src={LANGUAGE.buttons[1].src}
								alt={LANGUAGE.buttons[1].label}
							/>
							<Box
								sx={{
									fontFamily: t.fontFamily.body,
									fontSize: t.typo.caption.fontSize,
									color: t.color.textSecondary,
									mt: `${t.spacing.tight}px`,
								}}
							>
								{LANGUAGE.buttons[1].label}
							</Box>
						</Box>
						{/* 물리적 버튼 + 단추 — 2col */}
						<Box sx={{ display: "flex", gap: `${t.spacing.tight}px` }}>
							{[LANGUAGE.buttons[0], LANGUAGE.buttons[2]].map(
								({ src, label }) => (
									<Box key={label} sx={{ flex: 1, textAlign: "center" }}>
										<SlideImage src={src} alt={label} />
										<Box
											sx={{
												fontFamily: t.fontFamily.body,
												fontSize: t.typo.caption.fontSize,
												color: t.color.textSecondary,
												mt: `${t.spacing.tight}px`,
											}}
										>
											{label}
										</Box>
									</Box>
								),
							)}
						</Box>
					</Box>
				</Box>
			</SlideHSplit>
		),
	},
	{
		id: "S1-P-A-15",
		title: "글로 디자인하는 시대",
		render: () => (
			<SlideHSplit>
				<SlideStorytelling
					from={WRITING_ERA.storytelling.from}
					to={WRITING_ERA.storytelling.to}
				/>
				<SlideTypoStack
					headline={WRITING_ERA.headline}
					body={WRITING_ERA.body}
				/>
			</SlideHSplit>
		),
	},
];

// ═══════════════════════════════════════════════════════════
// Export — ChapterTitle toc는 contentSlides titles에서 자동 생성
// ═══════════════════════════════════════════════════════════

export const prologueSlides = [
	{
		id: "S1-P-A-0",
		title: "프롤로그",
		render: () => (
			<SlideChapterTitle
				overline={CHAPTER.overline}
				title={CHAPTER.title}
				summary={CHAPTER.summary}
				toc={contentSlides.map((s) => s.title)}
			/>
		),
	},
	...contentSlides,
];
