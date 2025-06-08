# Pagination 컴포넌트 사용법

페이지(offset) 기반의 리스트를 구성할 때 사용하는 공용 Pagination 컴포넌트입니다.
`currentPage`, `totalPages`, `onPageChange`을 필수로 전달해야 하며,
최대 몇 개의 페이지 버튼을 보여줄지 `maxVisiblePages`로 조정할 수 있습니다.

---

## ✅ 사용 예시

```tsx
import Pagination from '@/components/common/Pagination';

const MyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      {/* 리스트 등 렌더링 */}

      <Pagination
        currentPage={currentPage}
        totalPages={20}
        onPageChange={(page) => setCurrentPage(page)}
        maxVisiblePages={5} // 선택 사항
      />
    </div>
  );
};
```

---

## ✏️ Props

| Prop              | Type                     | Required | Default | Description                          |
| ----------------- | ------------------------ | -------- | ------- | ------------------------------------ |
| `currentPage`     | `number`                 | ✅       |         | 현재 선택된 페이지 번호              |
| `totalPages`      | `number`                 | ✅       |         | 전체 페이지 수                       |
| `onPageChange`    | `(page: number) => void` | ✅       |         | 페이지 변경 시 호출되는 콜백 함수    |
| `maxVisiblePages` | `number`                 | ❌       | `5`     | 한 번에 보여줄 페이지 버튼 최대 개수 |
| `className`       | `string`                 | ❌       | `''`    | 외부에서 스타일 추가 시 사용         |

---

## 🎨 스타일 가이드

- 현재 페이지는 `border-b-2`와 `text-14_B`로 강조됩니다.
- 비활성 버튼(`첫 페이지의 이전`, `마지막 페이지의 다음`)은 `text-gray-300`으로 표시됩니다.
- 아이콘 버튼에는 `aria-label`이 지정되어 있어 접근성/테스트 모두 지원됩니다.

---

## 🧪 테스트

이 컴포넌트는 `jest` + `@testing-library/react` 기반으로 테스트됩니다.

### 테스트 항목:

- 페이지 버튼 렌더링 확인
- 버튼 클릭 시 페이지 이동 확인
- 이전/다음 버튼 비활성 조건 확인
- maxVisiblePages 옵션에 따른 출력 제어 확인

---

## 🛠 참고 사항

- Tailwind CSS v4 기준으로 작성됨.
- `ChevronLeftIcon`, `ChevronRightIcon`은 커스텀 아이콘 컴포넌트입니다.
- 숫자 버튼 및 아이콘 버튼은 접근성을 위해 `aria-label`, `aria-current` 사용 중입니다.

---

## 📁 파일 구조

```
/components/common/
  └── Pagination.md
  └── Pagination.test.tsx
  └── Pagination.tsx
```
