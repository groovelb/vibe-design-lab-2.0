# Prompt Template — Isometric Line Art

> 아이소메트릭 라인아트 일러스트의 스타일·구도·좌표계 통일을 위한 공유 템플릿.
> 모든 이미지는 `[SHARED]` + `[CONTENT]`를 결합하여 프롬프트를 구성한다.

---

## [SHARED] 스타일 + 구도 + 좌표계

모든 이미지에 아래 블록을 그대로 선행한다. 수정하지 않는다.

```
Pure white contour line art illustration. Every form is defined
exclusively by thin, consistent white outline strokes — all shapes
are transparent, with the dark background visible through them.
Rendering style resembles a linocut print carved from darkness
or a technical wireframe blueprint.

Stroke rules:
- Single consistent stroke weight throughout the entire image
- Round line caps and line joins
- All outlines are white (#FFFFFF or near-white)

Isometric rules:
- Strict isometric projection at approximately 30 degrees
- All parallel edges remain parallel — vanishing points prohibited
- Vertical lines stay perfectly vertical
- All objects share the same isometric angle and grid

Background:
- Solid very dark near-black violet-gray (approximately hsl 260, 20%, 4%)
- Completely flat, no texture, no gradient, no grid pattern

Consistency:
- Maintain the same level of detail and line density across all
  elements — foreground figures and background objects should feel
  like they belong to the same drawing
- Human figures use the same stroke weight as architectural/UI elements
```

---

## [CONTENT] 이미지별 템플릿

### A. Canvas Designer

```
[이 블록 앞에 SHARED 블록을 선행]

Using the provided reference image, transform this exact scene
into the line art style defined above.

Preserve from reference:
- The woman with her hair in a bun, seen from behind
- Her pose: both hands reaching toward the interface canvas
- The large isometric design tool interface floating at an angle
- The proportions between the figure and the interface panel
- The right-side properties sidebar with horizontal placeholder lines

Required changes:
- Left panel must clearly display the Figma logo — three overlapping
  rounded rectangles arranged vertically, recognizable at a glance
- Convert all filled/shaded areas to white outline strokes only
- Background becomes the shared dark violet-gray

Composition: maintain the original framing and negative space.
```

### B. Pipeline Developer

```
[이 블록 앞에 SHARED 블록을 선행]

Using the provided reference image, recreate the developer character
and his single monitor in the line art style defined above.

Preserve from reference:
- The young man wearing a cap, sitting posture
- A keyboard on his lap
- A single isometric monitor floating in front of him showing
  code editor lines and terminal output
- His proportions, clothing style, and relaxed pose

Replace background with:
- A virtual node-based development pipeline rendered as an abstract
  directed graph in isometric space
- Four to five geometric nodes (circles or rounded rectangles)
  labeled CODE, BUILD, TEST, DEPLOY, floating at consistent
  isometric angles
- Nodes connected by thin flowing lines with small arrow indicators
  showing data direction from left to right
- The developer sits at one of the nodes (BUILD or center position)
  as if he is a station within the digital flow
- Small data packet dots travel along the connection lines
- The node graph should feel like a clean flowchart diagram —
  digital and abstract, not physical machinery

Composition: wide isometric view, developer at center-left,
pipeline nodes extending to the right.
```

---

## 조합 방법

최종 프롬프트 = `[SHARED]` + 빈 줄 + `[CONTENT]`

```
{SHARED 블록 전체}

{CONTENT 블록 전체}
```

## 새 이미지 추가 시

1. `[SHARED]`는 수정하지 않는다
2. 새 `[CONTENT]` 블록만 추가한다
3. 레퍼런스 이미지가 있으면 "Using the provided reference image" 패턴 사용
4. 레퍼런스 없으면 5요소 공식(Style/Subject/Setting/Action/Composition)으로 작성
