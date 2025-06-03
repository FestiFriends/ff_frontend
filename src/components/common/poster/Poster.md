# 🖼️ Poster 컴포넌트

공연이나 콘텐츠 포스터 이미지를 표시하는 컴포넌트입니다.  
크기, 그림자, 테두리, 사용자 정의 클래스 등을 props를 통해 설정할 수 있으며, `next/image`의 `fill` 속성을 사용하여 반응형으로 이미지를 표시합니다.

---

## 📦 사용법

```tsx
import Poster from '@/components/Poster';

<Poster
  src='/images/poster.jpg'
  alt='포스터 이미지'
  size='lg'
  shadow
  border
  className='rounded-lg'
/>;
```

---

## ✨ Props

| 이름        | 타입                                 | 기본값            | 설명                                       |
| ----------- | ------------------------------------ | ----------------- | ------------------------------------------ |
| `src`       | `string`                             | (필수)            | 이미지 URL                                 |
| `alt`       | `string`                             | `'포스터 이미지'` | 이미지 대체 텍스트                         |
| `size`      | `'sm'` \| `'md'` \| `'lg'` \| `'xl'` | `'md'`            | 컴포넌트 크기                              |
| `shadow`    | `boolean`                            | `true`            | 그림자(`shadow-md`) 표시 여부              |
| `border`    | `boolean`                            | `true`            | 테두리(`border border-gray-300`) 표시 여부 |
| `className` | `string`                             | `-`               | 사용자 정의 Tailwind CSS 클래스            |

---

## 🎨 스타일 가이드 (Tailwind 기준)

- **기본 클래스**  
  `relative overflow-hidden bg-gray-100`

- **크기별 클래스**

  - `sm`: `w-20 h-28`
  - `md`: `w-28 h-40`
  - `lg`: `w-40 h-56`
  - `xl`: `w-52 h-72`

- **그림자**

  - `shadow=true` → `shadow-md`
  - `shadow=false` → 그림자 없음

- **테두리**

  - `border=true` → `border border-gray-300`
  - `border=false` → 테두리 없음

---

## ✅ 테스트 정보

> 테스트 도구: `jest`, `@testing-library/react`

| 테스트 항목                          | 설명                                                              |
| ------------------------------------ | ----------------------------------------------------------------- |
| 기본 렌더링 확인                     | 이미지와 컨테이너가 올바르게 렌더링되는지 확인                    |
| alt 텍스트 렌더링 확인               | `alt` prop에 따라 적절한 텍스트가 적용되는지 확인                 |
| shadow = false일 때 그림자 제거 확인 | `shadow-md` 클래스가 존재하지 않는지 확인                         |
| border = false일 때 테두리 제거 확인 | `border` 클래스가 존재하지 않는지 확인                            |
| size props에 따른 크기 클래스 확인   | 각 `size` 값에 맞는 `w-* h-*` 클래스가 포함되는지 확인            |
| 잘못된 size 값 처리                  | 유효하지 않은 size일 경우 size 관련 클래스가 적용되지 않는지 확인 |
| className prop 반영                  | 전달된 사용자 정의 클래스가 컴포넌트에 적용되는지 확인            |

---

## 📁 파일 구조

```
/components/Poster
  ├── Poster.tsx
  └── Poster.test.tsx
```

---
