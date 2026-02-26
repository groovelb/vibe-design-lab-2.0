# Project Summary (CRITICAL)

Next.js 16 + React 19 + MUI 7 + Storybook 10 기반 디자인 시스템 환경.

## 핵심 원칙

- **UI/로직 분리**: Storybook에서는 순수 프레젠테이션 컴포넌트만 다룸. 비즈니스 로직, 상태 관리, API 호출은 UI 레이어에 포함하지 않는다.
- **컴포넌트 = MUI 기반 + Storybook 스토리 필수**: 모든 UI 컴포넌트는 MUI sx prop으로 스타일링하고, `'use client'` 디렉티브를 포함하며, 스토리와 함께 작성한다.
