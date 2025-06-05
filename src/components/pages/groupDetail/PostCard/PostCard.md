# 🏷️ PostCard 컴포넌트

PostCard는 게시글의 작성자, 작성일, 내용, 이미지, 더보기 메뉴, 반응/댓글 버튼 등을 카드 형태로 보여주는 UI 컴포넌트입니다.

---

## 📦 사용법

```tsx
import PostCard from '@/components/pages/groupDetail/PostCard/PostCard';

<PostCard post={mockPost}>
  <CheckButton
    isReactioned={mockPost.isReactioned}
    reactionCount={mockPost.reactionCount}
    onClick={() => handleReaction(mockPost.id)}
  />
  <CommentButton
    commentCount={mockPost.commentCount}
    onClick={() => handleComment(mockPost.id)}
  />
</PostCard>;
```

## ✨ Props

| 이름       | 타입        | 필수 여부 | 설명                                               |
| ---------- | ----------- | --------- | -------------------------------------------------- |
| `post`     | `Post`      | ✅ 필수   | 게시글 정보 객체. 작성자, 내용, 이미지 등 포함됨   |
| `children` | `ReactNode` | ⛔ 선택   | 카드 하단에 표시될 영역 (예: 댓글, 리액션 버튼 등) |

## 🧱 주요 구성

- 작성자 프로필: ProfileImage 컴포넌트로 렌더링됨

- 작성일 포맷: date-fns를 사용하여 'M월 d일 a hh:mm' 형식으로 출력

- 더보기 메뉴: MoreDropdown 컴포넌트 사용 (수정하기, 삭제하기, 공지글 등록)

- 이미지 출력:

  - 이미지 1개: 단일 이미지 렌더링

  - 이미지 2개 이상: Carousel 컴포넌트 사용

- 클릭 이벤트: 카드 본문 클릭 시 console.log("페이지 이동") 출력

- 하단 영역: 외부에서 전달된 children (예: 댓글 버튼, 리액션 버튼 등)

## 🎨 스타일 가이드 (Tailwind CSS 기준)

| 요소          | 클래스 설명                                                               |
| ------------- | ------------------------------------------------------------------------- |
| 카드          | `rounded-2xl`, `border`, `px-6`, `bg-white`, `gap-5`, `pt-6`, `pb-[10px]` |
| 작성자 텍스트 | `font-bold`, `text-sm`, `text-gray-950`                                   |
| 작성일        | `text-[13px]`, `text-gray-500`, `font-medium`                             |
| 본문 텍스트   | `text-base`, `text-gray-950`, `whitespace-pre-wrap`                       |
| 이미지        | `object-contain`, `w-full`, `h-auto`                                      |
| children      | `flex h-11 items-center justify-between gap-3.5 border-t`                 |

## ✅ 테스트 정보

> 테스트 도구: @testing-library/react, jest, jest.mock을 활용한 Carousel 관련 컴포넌트 mocking

| 테스트 항목                 | 설명                                            |
| --------------------------- | ----------------------------------------------- |
| 작성자 이름 및 시간 출력    | `screen.getByText()` 사용                       |
| 본문 내용 렌더링            | `screen.getByText()`                            |
| 공지 여부 조건부 렌더링     | `screen.getByText('· 공지')` or `queryByText()` |
| 이미지 렌더링               | 이미지 개수에 따라 단일/다중 처리               |
| Carousel 내부 이미지 렌더링 | `getByTestId('carousel')` 내부 `img` 태그 검사  |
| children 삽입 확인          | 전달된 버튼이 정상 렌더링되는지 확인            |
| 더보기 메뉴 렌더링 여부     | `getByLabelText('더보기 메뉴')` 사용            |

## 🧠 Todo

- 디자인 확정 후 Tailwind 클래스 리팩토링 예정

- date-fns 일자 포맷팅 수정

## 📁 파일 구조

```
📁 components
└── 📁 pages
    └── 📁 groupDetail
        └── 📁 PostCard
            ├── PostCard.md
            ├── PostCard.tsx
            └── PostCard.test.tsx
```
