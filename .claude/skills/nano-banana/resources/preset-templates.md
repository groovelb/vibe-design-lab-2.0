# Nano Banana — Preset Templates

> 용도별 사전 정의된 파라미터 프리셋. 스킬이 사용자 의도를 파악한 뒤 적절한 프리셋을 추천한다.

---

## 프리셋 목록

### 1. SNS 포스트 (Instagram/TikTok)

```json
{
  "label": "SNS 포스트",
  "description": "소셜 미디어 정사각/세로 이미지",
  "generationConfig": {
    "temperature": 1.0,
    "topP": 0.95,
    "responseModalities": ["IMAGE"],
    "imageConfig": {
      "aspectRatio": "1:1",
      "imageSize": "2K",
      "numberOfImages": 2
    }
  },
  "notes": "세로 필요 시 aspectRatio → 4:5 또는 9:16"
}
```

### 2. 블로그/웹 히어로 배너

```json
{
  "label": "웹 히어로 배너",
  "description": "랜딩페이지, 블로그 헤더용 와이드 이미지",
  "generationConfig": {
    "temperature": 0.7,
    "topP": 0.9,
    "responseModalities": ["IMAGE"],
    "imageConfig": {
      "aspectRatio": "16:9",
      "imageSize": "4K",
      "numberOfImages": 1
    }
  },
  "notes": "초와이드 필요 시 aspectRatio → 21:9"
}
```

### 3. 썸네일

```json
{
  "label": "썸네일",
  "description": "YouTube, 카드, OG 이미지용",
  "generationConfig": {
    "temperature": 0.8,
    "topP": 0.9,
    "responseModalities": ["IMAGE"],
    "imageConfig": {
      "aspectRatio": "16:9",
      "imageSize": "1K",
      "numberOfImages": 3
    }
  },
  "notes": "여러 후보 중 선택용. 비용 절감 위해 1K"
}
```

### 4. UI 목업/와이어프레임 보조

```json
{
  "label": "UI 목업 보조",
  "description": "디자인 목업에 삽입할 에셋 이미지",
  "generationConfig": {
    "temperature": 0.3,
    "topP": 0.8,
    "topK": 10,
    "responseModalities": ["IMAGE"],
    "imageConfig": {
      "aspectRatio": "1:1",
      "imageSize": "2K",
      "numberOfImages": 1
    }
  },
  "notes": "일관성 중시. temperature 낮게 유지"
}
```

### 5. 아트/컨셉 탐색

```json
{
  "label": "아트 컨셉 탐색",
  "description": "스타일 실험, 무드보드용 창의적 이미지",
  "generationConfig": {
    "temperature": 1.8,
    "topP": 0.98,
    "responseModalities": ["TEXT", "IMAGE"],
    "imageConfig": {
      "aspectRatio": "3:2",
      "imageSize": "2K",
      "numberOfImages": 4
    }
  },
  "notes": "TEXT 포함으로 모델의 해석 설명도 함께 받음. 최대 창의성"
}
```

### 6. 프로덕션 에셋 (고해상도)

```json
{
  "label": "프로덕션 에셋",
  "description": "인쇄, 프레젠테이션, 고품질 최종 산출물",
  "generationConfig": {
    "temperature": 0.5,
    "topP": 0.85,
    "responseModalities": ["IMAGE"],
    "imageConfig": {
      "aspectRatio": "3:2",
      "imageSize": "4K",
      "numberOfImages": 1
    }
  },
  "notes": "4K 단일 이미지. 비용 높음. 프롬프트 정교하게"
}
```

### 7. 빠른 프로토타입

```json
{
  "label": "빠른 프로토타입",
  "description": "아이디어 빠르게 시각화. 속도 최우선",
  "generationConfig": {
    "temperature": 0.8,
    "topP": 0.9,
    "maxOutputTokens": 4096,
    "responseModalities": ["IMAGE"],
    "imageConfig": {
      "aspectRatio": "1:1",
      "imageSize": "512px",
      "numberOfImages": 4
    }
  },
  "notes": "512px로 빠르게 4장 생성. 확정 후 고해상도로 재생성"
}
```

---

## 파라미터 조합 가이드

| 의도 | temperature | topP | imageSize | numberOfImages |
|------|-------------|------|-----------|----------------|
| 일관된 결과 | 0.0~0.3 | 0.7~0.8 | 2K | 1 |
| 적당한 변주 | 0.5~0.8 | 0.85~0.9 | 2K | 2~3 |
| 최대 창의성 | 1.0~2.0 | 0.95~1.0 | 2K | 4 |
| 속도 우선 | 0.5~0.8 | 0.9 | 512px~1K | 1~2 |
| 품질 우선 | 0.4~0.7 | 0.85 | 4K | 1 |

---

## aspectRatio 선택 가이드

| 비율 | 용도 |
|------|------|
| `1:1` | SNS 피드, 프로필, 아이콘 |
| `4:5` | Instagram 세로 포스트 |
| `9:16` | 스토리, 릴스, TikTok |
| `16:9` | 유튜브 썸네일, 웹 배너, OG 이미지 |
| `21:9` | 울트라와이드 히어로, 시네마틱 |
| `3:2` | 사진 표준, 프레젠테이션 |
| `4:3` | 전통적 모니터 비율, 슬라이드 |
| `5:4` | 인쇄, 포스터 |
| `2:3` | 세로 포스터, 북커버 |
| `3:4` | 세로 태블릿 |
