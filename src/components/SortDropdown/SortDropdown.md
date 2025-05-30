# 🧮 SortDropdown 컴포넌트

사용자가 데이터를 다양한 기준으로 정렬할 수 있게 해주는 **정렬 드롭다운 컴포넌트**입니다.  
선택된 정렬 기준은 URL 쿼리 파라미터와 동기화되어, 브라우저 새로고침이나 공유 시에도 유지됩니다.

---

## ✨ 주요 기능

- 정렬 기준 선택 UI 제공
- 쿼리 파라미터 (?sort=...) 와 동기화
- 사용자 정의 정렬 함수 적용 가능
- defaultSortMap 또는 custom sort 함수로 동작

---

## 🧩 사용법

```tsx
const sortOptions = [
  { label: '이름순', value: 'name' },
  { label: '날짜순', value: 'date' },
  { label: '조회수순', value: 'views' },
];

const customSortMap = {
  name: (a, b) => a.name.localeCompare(b.name),
  date: (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  views: (a, b) => b.views - a.views,
};

const { sortedData } = useSortWithQuery(data, {
  defaultKey: 'date',
  customSortMap,
});
```

```tsx
<SortDropdown
  options={sortOptions}
  defaultValue='date'
  onChange={(value) => {
    // 필요 시 정렬값 변경시 추가 동작
  }}
/>
```

---

## ⚙️ Props

### SortDropdown

| 이름         | 타입                               | 설명                                  |
| ------------ | ---------------------------------- | ------------------------------------- |
| options      | { label: string, value: string }[] | 정렬 항목 목록                        |
| defaultValue | string                             | 초기 정렬 값                          |
| onChange     | (value: string) => void            | 정렬 값이 변경될 때 호출됨            |
| placeholder  | string                             | 선택되지 않았을 때 표시할 기본 텍스트 |

---

## 🧠 내부 훅 설명

### useSortWithQuery

- 정렬 기준을 쿼리 파라미터와 동기화
- 내부에서 useSort, useQueryParam 사용

```ts
const { sortKey, sortedData, setSortKey } = useSortWithQuery(data, {
  defaultKey: 'views',
  paramKey: 'sort',
  customSortMap,
});
```

---

## 🧪 테스트 관련

- useSort: 정렬 함수 적용 및 fallback 동작 테스트 가능
- useQueryParam: URLSearchParams mock 필요
- useSortWithQuery: 통합적으로 쿼리 파라미터 → 정렬 연동 확인 가능
- SortDropdown: 렌더링 및 클릭 시 onChange 발생 테스트 가능

---

## 📂 폴더 구조

/components/SortDropdown
├── SortDropdown.tsx
├── SortDropdownUi.tsx
└── SortDropdown.md

/hooks/useSort
└── useSort.ts

/hooks/useQueryParam
└── useQueryParam.ts

/hooks/useSortWithQuery
└── useSortWithQuery.ts

/utils
└── sortPresets.ts
