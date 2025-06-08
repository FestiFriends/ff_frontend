# 🏷️ MoreDropdown 컴포넌트 문서

MoreDropdown 컴포넌트는 점 3개 아이콘을 클릭하면 여러 액션 항목(예: 수정, 삭제 등)을 드롭다운으로 표시하는 공통 메뉴 UI입니다. 주로 게시글, 댓글 등의 오른쪽 상단 옵션 메뉴로 사용됩니다.

---

## 📦 사용법

```tsx
import MoreDropdown from '@/components/common/MoreDropdown;

<MoreDropdown
  items={[
    { label: '수정하기', onClick: handleEdit },
    { label: '삭제하기', onClick: handleDelete },
  ]}
/>
```

## ✨ Props

| 이름        | 타입                 | 필수 여부 | 설명                                            |
| ----------- | -------------------- | --------- | ----------------------------------------------- |
| `items`     | `MoreDropdownItem[]` | ✅ 필수   | 드롭다운 메뉴 항목 배열 (label 및 onClick 포함) |
| `className` | `string`             | ❌ 선택   | 드롭다운 트리거 스타일 커스터마이징용 클래스    |
| `ariaLabel` | `string`             | ❌ 선택   | 접근성용 aria-label, 기본값은 `'더보기 메뉴'`   |

## 🎨 스타일 가이드 (Tailwind CSS 기준)

| 요소            | 클래스 설명                                                  |
| --------------- | ------------------------------------------------------------ |
| Wrapper         | `aria-label` 포함                                            |
| Trigger Button  | `.border-none p-0 hover:bg-transparent focus:bg-transparent` |
| 아이콘          | `.h-6 w-6 text-gray-400`                                     |
| DropdownContent | `.right-6 -mt-8`                                             |

## ✅ 테스트 정보

> 테스트 도구: @testing-library/react, jest, @testing-library/jest-dom

| 테스트 항목                       | 설명                                                    |
| --------------------------------- | ------------------------------------------------------- |
| aria-label 적용 여부              | `getByLabelText('더보기 메뉴')`                         |
| 트리거 렌더링 확인                | className으로 `.border-none` 등 확인                    |
| 드롭다운 클릭 시 메뉴 렌더링 확인 | `fireEvent.click(trigger)` → 각 항목 `getByText`로 검증 |

## 🧠 Todo

- 디자인 확정 후 Tailwind 클래스 리팩토링 예정

- date-fns 일자 포맷팅 수정

## 📁 파일 구조

```
📁 components
└── 📁 common
    └── 📁 MoreDropdown
        ├── MoreDropdown.tsx
        └── MoreDropdown.test.tsx
```
