# InfiniteList 컴포넌트 문서

React에서 무한 스크롤 기반의 리스트 UI를 쉽게 구현할 수 있도록 만든 범용 컴포넌트입니다.  
`@suspensive/react-query`의 `SuspenseInfiniteQuery`와 사용자 정의 훅 `useInfiniteScroll`을 활용합니다.

---

## 특징

- **Suspense + ErrorBoundary** 기반으로 안정적인 데이터 요청 처리
- **무한 스크롤** 자동 트리거 (화면 하단에 도달 시 다음 페이지 fetch)
- `renderData`, `emptyFallback`, `isFetchingFallback` 등을 통한 **유연한 UI 커스터마이징**
- **타입 안전성** 확보 (`Generics` 사용)

---

## 데이터 타입 형식 제한

InfiniteList 컴포넌트는 내부적으로 다음과 같은 데이터 구조를 기대합니다:

```ts
type ApiResponse = {
  // 공통 API 응답 필드 예: status, message 등
};

type CursorResponse = {
  hasNext: boolean; // 다음 페이지 존재 여부
  cursorId?: number; // 다음 페이지 요청 시 사용하는 커서 ID
};

type ApiPageResponse = {
  data: TData[]; // 실제 데이터 배열 - 반드시 'data'라는 키에 있어야 합니다
} & ApiResponse
  & CursorResponse;
```

`ApiResponse`와 `CursorResponse`의 구조는 다를 수 있지만 반드시 `data: TData[]`타입을 가지고 있어야 합니다.

---

## UseSuspenseInfiniteQueryOptions 타입 예시

```ts
import type { UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';

export const infiniteListOptions = (): UseSuspenseInfiniteQueryOptions<
  ApiPageResponse,
  ApiResponse,
  InfiniteData<ApiPageResponse>,
  ApiPageResponse,
  string[],
  number | undefined
> => ({
  queryKey: ['your-query-key'],
  queryFn: ({ pageParam }) => yourApi.getData({ pageParam }),
  getNextPageParam: (lastPage) =>
    lastPage.hasNext ? lastPage.cursorId : undefined,
  initialPageParam: undefined,
});
```

---

## InfiniteList 컴포넌트 제네릭 타입 사용법

- InfiniteList는 두 개의 제네릭 타입 파라미터를 받습니다
  - TPage : 페이지 단위 응답 타입. 반드시 { data: TData[] } 형식을 만족해야 합니다.
  - TData : 각 페이지 내 데이터 아이템 타입

사용 예:

```tsx
<InfiniteList<ApiPageResponse, TData>
  options={infiniteListOptions()}
  getDataId={(data) => data.id}
  renderData={(data) => <YourItemComponent item={data} />}
/>
```

`getDataId`와 `renderData`에서 사용하는 `data`는 `TData`타입으로, `getDataId`에서는 무한 스크롤로 인해 렌더링 되는 컴포넌트들에 전달할 고유한 key값을 설정합니다.
`renderData`에서는 `data`를 넘겨 받아 사용하여 실제 컴포넌트를 렌더링합니다.

---

## Props

```ts
type InfiniteReviewListProps<TPage extends { data: TData[] }, TData> = {
  options: UseSuspenseInfiniteQueryOptions<...>; // react-query 무한 쿼리 옵션
  getDataId: (data: TData) => string | number; // 고유 ID 추출 함수
  renderData: (data: TData) => ReactNode; // 각 항목 렌더링
  fallback?: ReactNode; // 첫 로딩 시 fallback (기본: <p>로딩 중...</p>)
  isFetchingFallback?: ReactNode; // 다음 페이지 로딩 시 fallback
  emptyFallback?: ReactNode; // 데이터 없을 경우 fallback
  className?: string; // 리스트 wrapper에 사용할 클래스명
};
```

---

## 커스터마이징 팁

- **빈 데이터 처리:**

  ```tsx
  emptyFallback={<p>아직 리뷰가 없습니다.</p>}
  ```

- **추가 페이지 로딩 표시:**

  ```tsx
  isFetchingFallback={<p>불러오는 중...</p>}
  ```

- **로딩 중 커스텀 스피너:**
  ```tsx
  fallback={<CustomSpinner />}
  ```

---

## 내부 구조 요약

- `InfiniteList`: 최상위 Suspense + ErrorBoundary 래퍼
- `SuspenseInfiniteQuery`: react-query 무한 쿼리 실행
- `ListContent`: 실제 렌더링 처리 및 `useInfiniteScroll` 연결

---

## 주의사항

- API 응답은 반드시 `data: TData[]` 형태를 포함해야 합니다.
- `SuspenseInfiniteQuery` 사용 시 React 18 이상 권장

---

## 만든 이유

리스트 기반 UI에서 반복되는 무한 스크롤 + Suspense 패턴을 범용화하기 위해 제작되었습니다.  
팀 프로젝트나 블로그, 커뮤니티 등 다양한 곳에서 재사용 가능합니다.

---
