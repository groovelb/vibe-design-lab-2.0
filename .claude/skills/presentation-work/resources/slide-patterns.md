# Slide Patterns

> 자주 쓰이는 슬라이드 구성 패턴. 새 슬라이드를 만들 때 이 패턴 중 하나를 기반으로 한다.

---

## 1. ChapterTitle (파트 진입)

각 Part의 첫 슬라이드. overline으로 챕터/파트 라벨, title로 대주제, toc로 이 파트에서 다룰 내용.

```jsx
<SlideChapterTitle
  overline="CHAPTER 02"
  title="바이브 디자인: 관점의 전환"
  summary="핵심 개념을 소개하고 택소노미를 탐구합니다."
  toc={['주제 A', '주제 B', '주제 C']}
/>
```

**규칙**: Part의 0번(첫 번째) 슬라이드에 배치. 삭제 금지.

---

## 2. HSplit: TypoStack + List

왼쪽에 제목+설명, 오른쪽에 불렛/넘버 리스트. 가장 빈번한 패턴.

```jsx
<SlideHSplit>
  <SlideTypoStack
    title="주제 제목"
    body="주제에 대한 설명"
  />
  <SlideList
    items={['포인트 1', '포인트 2', '포인트 3']}
    level="headline"
  />
</SlideHSplit>
```

---

## 3. HSplit: TypoStack + DescList

왼쪽에 제목+설명, 오른쪽에 제목-설명 쌍 반복. 서비스 소개, 경력 등.

```jsx
<SlideHSplit>
  <SlideTypoStack
    title="회사명"
    body="https://example.com"
  />
  <SlideDescList
    items={[
      { title: '사업 영역 A', desc: '설명 A' },
      { title: '사업 영역 B', desc: '설명 B' },
    ]}
  />
</SlideHSplit>
```

**밀도 상한**: DescList 항목 4개.

---

## 4. HSplit: TypoStack + Image

왼쪽에 텍스트, 오른쪽에 이미지.

```jsx
<SlideHSplit>
  <SlideTypoStack
    title="포트폴리오"
    body="설명 텍스트"
  />
  <SlideImage src="/presentations/image.png" alt="설명" />
</SlideHSplit>
```

---

## 5. HSplit: Storytelling + TypoStack

왼쪽에 인과관계 화살표, 오른쪽에 해설.

```jsx
<SlideHSplit>
  <SlideStorytelling
    from="AS-IS 상태"
    to="TO-BE 상태"
  />
  <SlideTypoStack
    headline="핵심 메시지"
    body="부연 설명"
  />
</SlideHSplit>
```

---

## 6. HSplit: List + DescList

왼쪽에 역할/키워드 리스트, 오른쪽에 상세 설명 쌍. 커리어 타임라인 등.

```jsx
<SlideHSplit>
  <SlideList
    items={['역할 A', '역할 B', '역할 C']}
    level="headline"
  />
  <SlideDescList
    items={[
      { title: '회사 A', desc: '담당 업무 설명' },
      { title: '회사 B', desc: '담당 업무 설명' },
    ]}
  />
</SlideHSplit>
```

---

## 7. HSplit: 비교 (TypoStack × 2)

두 개념을 나란히 비교.

```jsx
<SlideHSplit>
  <SlideTypoStack title="개념 A" body="설명 A" />
  <SlideTypoStack title="개념 B" body="설명 B" />
</SlideHSplit>
```

---

## 8. HSplit 3컬럼

3개 개념을 균등 분할.

```jsx
<SlideHSplit columns={3}>
  <SlideTypoStack headline="1단계" body="설명" />
  <SlideTypoStack headline="2단계" body="설명" />
  <SlideTypoStack headline="3단계" body="설명" />
</SlideHSplit>
```

**밀도 상한**: 각 컬럼 headline + body 1세트.

---

## 9. Grid 2×2

4개 항목 균등 배치. 개념 비교, 카테고리 분류.

```jsx
<SlideGrid columns={2}>
  <SlideTypoStack headline="A" body="설명" />
  <SlideTypoStack headline="B" body="설명" />
  <SlideTypoStack headline="C" body="설명" />
  <SlideTypoStack headline="D" body="설명" />
</SlideGrid>
```

---

## 10. Message (단일 강조)

한 문장 또는 짧은 문구를 화면 중앙에 크게.

```jsx
<SlideMessage>"핵심 메시지"</SlideMessage>
```

---

## 11. Storytelling (단독)

Layout 없이 Element 단독 사용. 전체 화면 인과관계.

```jsx
<SlideStorytelling
  from="질문"
  to="답변"
  arrowLabel="전환"
/>
```

---

## 조합 원칙

- Layout 1개 + Element 1~N개로 구성
- Layout을 중첩하지 않는다 (HSplit 안에 HSplit 금지)
- Element를 Layout 없이 단독 사용 가능 (Storytelling, Message)
- Placeholder.Box는 임시 마커 — 실제 콘텐츠 준비되면 반드시 교체
