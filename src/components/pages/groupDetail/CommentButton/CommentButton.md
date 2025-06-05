# 🏷️ CommentButton 컴포넌트

댓글 개수를 보여주고 클릭 시 상세 게시글(댓글)로 이동되는 컴포넌트입니다.
클릭 시 전달된 onClick 함수가 실행됩니다.

---

## 📦 사용법

```tsx
import CommentButton from '@/components/pages/groupDetail/CommentButton/CommentButton';

<CommentButton
  commentCount={2}
  onClick={() => console.log('댓글 보기 클릭')}
/>;
```

## ✨ Props

| 이름           | 타입         | 필수 여부 | 설명                                                      |
| -------------- | ------------ | --------- | --------------------------------------------------------- |
| `commentCount` | `number`     | ✅        | 버튼에 표시할 댓글 수입니다.                              |
| `onClick`      | `() => void` | ✅        | 버튼 클릭 시 실행할 함수입니다.                           |
| `className`    | `string`     | ❌        | Tailwind 클래스 등 커스텀 스타일을 위한 className 입니다. |

## 🎨 스타일 가이드 (Tailwind CSS 기준)

| 요소   | 클래스 설명                                                       |
| ------ | ----------------------------------------------------------------- |
| 버튼   | `flex w-1/2 items-center justify-center gap-1 px-6 pt-3.5 pb-2.5` |
| 아이콘 | `h-5 w-5 text-gray-500`                                           |
| 텍스트 | `확인 {commentCount}` 형태로 출력됨 (Tailwind 스타일은 별도 없음) |

## ✅ 테스트 정보

> 테스트 도구: @testing-library/react, jest

| 테스트 항목                | 설명                                                   |
| -------------------------- | ------------------------------------------------------ |
| 버튼 렌더링 여부 확인      | `getByLabelText('댓글 목록 이동')` 로 버튼 존재 확인   |
| 댓글 수 표시 확인          | `getByText('확인 {commentCount}')` 로 텍스트 존재 확인 |
| 클릭 이벤트 정상 작동 여부 | `fireEvent.click()` 후 `onClick` 핸들러 호출 여부 확인 |

## 📁 파일 구조

```
📁 components
└── 📁 pages
    └── 📁 groupDetail
        └── 📁 CommentButton
            ├── CommentButton.md
            ├── CommentButton.tsx
            └── CommentButton.test.tsx
```
