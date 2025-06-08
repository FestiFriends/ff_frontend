# 🏷️ CheckButton 컴포넌트

사용자가 게시글에 반응(확인)을 했는지 여부를 나타내고, 클릭 시 반응 상태를 토글하는 버튼입니다.

---

## 📦 사용법

```tsx
import CheckButton from '@/components/pages/groupDetail/CheckButton/CheckButton';

<CheckButton
  isReactioned={true}
  reactionCount={5}
  onClick={() => console.log('반응 클릭')}
```

## ✨ Props

| 이름            | 타입         | 필수 여부 | 설명                                                     |
| --------------- | ------------ | --------- | -------------------------------------------------------- |
| `isReactioned`  | `boolean`    | ✅        | 사용자가 게시글에 반응했는지 여부 (true: 반응함)         |
| `reactionCount` | `number`     | ✅        | 현재까지 반응한 사용자 수                                |
| `onClick`       | `() => void` | ✅        | 버튼 클릭 시 실행되는 함수                               |
| `className`     | `string`     | ❌        | 버튼에 적용할 Tailwind 클래스 등 추가 커스텀 스타일 지정 |

## 🎨 스타일 가이드 (Tailwind CSS 기준)

| 요소   | 클래스 설명                                                                |
| ------ | -------------------------------------------------------------------------- |
| 버튼   | `flex w-1/2 items-center justify-center gap-1 px-6 pt-3.5 pb-2.5`          |
| 아이콘 | `h-5 w-5`, 색상: `text-[#ED3639]`(활성 시) 또는 `text-gray-500`(비활성 시) |
| 텍스트 | `확인 {reactionCount}` 형태로 출력                                         |

## ✅ 테스트 정보

> 테스트 도구: @testing-library/react, jest

| 테스트 항목               | 설명                                                       |
| ------------------------- | ---------------------------------------------------------- |
| 기본 렌더링 확인          | `isReactioned`에 따라 아이콘 타입(`filled`, `stroke`) 확인 |
| 텍스트 및 aria-label 확인 | `screen.getByText()`, `getByLabelText()` 사용              |
| 클릭 이벤트 작동 확인     | `fireEvent.click()` 후 `onClick` 함수 실행 여부 테스트     |

## 🧠 Todo

디자인 시스템 확정 시 색상 토큰으로 대체 예정

## 📁 파일 구조

```
📁 components
└── 📁 pages
    └── 📁 groupDetail
        └── 📁 CheckButton
            ├── CheckButton.tsx
            ├── CheckButton.test.tsx
            └── CheckButton.md
```
