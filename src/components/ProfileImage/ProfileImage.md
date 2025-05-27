# 🖼️ ProfileImage 컴포넌트

사용자의 프로필 이미지를 표시하는 컴포넌트입니다.  
`src`가 없을 경우 기본 이미지(`/assets/ico__profileDefault.png`)를 보여주며, 이미지 크기, 모양(둥근 처리), 테두리 여부, 사용자 정의 클래스 적용이 가능합니다.

---

## 📦 사용법

```tsx
import ProfileImage from '@/components/ProfileImage';

<ProfileImage
  src='/user.png'
  size='lg'
/>;
```

---

## ✨ Props

| 이름        | 타입                       | 기본값            | 설명                                                                      |
| ----------- | -------------------------- | ----------------- | ------------------------------------------------------------------------- |
| `src`       | `string`                   | 기본 이미지       | 프로필 이미지 경로. 없을 경우 기본 이미지(`ico__profileDefault.png`) 사용 |
| `alt`       | `string`                   | `"프로필 이미지"` | 이미지 대체 텍스트                                                        |
| `size`      | `'sm'` \| `'md'` \| `'lg'` | `'md'`            | 이미지 크기 (`w-8 h-8`, `w-12 h-12`, `w-16 h-16`)                         |
| `rounded`   | `boolean`                  | `true`            | `true`면 원형(`rounded-full`), `false`면 사각형(`rounded-md`)             |
| `border`    | `boolean`                  | `true`            | 테두리(`border border-gray-300`) 표시 여부                                |
| `className` | `string`                   | `-`               | 사용자 정의 Tailwind CSS 클래스                                           |

---

## 🎨 스타일 가이드 (Tailwind 기준)

- **기본 클래스**  
  `relative overflow-hidden bg-gray-100`

- **size 별 클래스**

  - `sm`: `w-8 h-8`
  - `md`: `w-12 h-12`
  - `lg`: `w-16 h-16`

- **둥근 처리**

  - `rounded=true` → `rounded-full`
  - `rounded=false` → `rounded-md`

- **테두리**
  - `border=true` → `border border-gray-300`
  - `border=false` → 클래스 미적용

---

## ✅ 테스트 정보

> 테스트 도구: `jest`, `@testing-library/react`

| 테스트 항목                            | 설명                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------- |
| 기본 이미지 렌더링                     | `src`가 없을 때 기본 이미지가 렌더링되는지 확인                           |
| 커스텀 이미지 렌더링                   | `src`로 전달한 이미지가 제대로 반영되는지 확인                            |
| size 별 클래스 적용                    | `size="lg"` 등의 프롭에 따라 올바른 클래스(`w-16 h-16`)가 적용되는지 확인 |
| 지원되지 않는 size fallback 확인       | 잘못된 size를 입력했을 때 기본값(`md`)이 적용되는지 확인                  |
| rounded = false일 때 스타일 확인       | `rounded-md`가 적용되는지 확인                                            |
| border = false일 때 테두리 미적용 확인 | `border` 클래스가 없는지 확인                                             |
| className 프롭 반영 확인               | 전달한 사용자 정의 클래스가 포함되는지 확인                               |

---

## 📁 파일 구조

```
/components/ProfileImage
  ├── ProfileImage.tsx
  └── ProfileImage.test.tsx

/assets
  └── ico__profileDefault.png
```

---
