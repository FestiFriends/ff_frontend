# QueryPagination

URL 쿼리 파라미터와 연동된 페이지네이션 컴포넌트입니다.

## 기능

- URL 쿼리 파라미터를 통한 페이지 상태 관리
- 커스텀 페이지 파라미터 키 지원
- 최대 표시 페이지 수 설정
- 커스텀 스타일링 지원

## 사용 방법

```tsx
import QueryPagination from '@/components/common/QueryPagination/QueryPagination';

function MyComponent() {
  return (
    <QueryPagination
      totalPages={10}
      maxVisiblePages={5}
      pageParamKey='page'
      className='my-pagination'
    />
  );
}
```

## Props

| Prop            | 타입   | 필수 | 기본값 | 설명                               |
| --------------- | ------ | ---- | ------ | ---------------------------------- |
| totalPages      | number | ✅   | -      | 전체 페이지 수                     |
| maxVisiblePages | number | ❌   | 5      | 한 번에 표시할 최대 페이지 버튼 수 |
| pageParamKey    | string | ❌   | 'page' | URL 쿼리 파라미터 키               |
| className       | string | ❌   | -      | 추가 CSS 클래스                    |

## 동작 방식

1. 컴포넌트는 URL 쿼리 파라미터에서 현재 페이지 값을 읽어옵니다.
2. 페이지 변경 시 URL 쿼리 파라미터를 업데이트합니다.
3. 페이지네이션 UI는 `Pagination` 컴포넌트를 사용하여 렌더링됩니다.

## 주의사항

- `useQueryParam` 훅이 필요합니다.
- 페이지 파라미터는 문자열로 저장되며, 컴포넌트 내부에서 숫자로 변환됩니다.
- 페이지 파라미터가 없는 경우 기본값 1을 사용합니다.

## 예시

### 기본 사용

```tsx
<QueryPagination totalPages={10} />
```

### 커스텀 페이지 파라미터 키

```tsx
<QueryPagination
  totalPages={10}
  pageParamKey='customPage'
/>
```

### 최대 표시 페이지 수 조정

```tsx
<QueryPagination
  totalPages={20}
  maxVisiblePages={7}
/>
```

### 커스텀 스타일링

```tsx
<QueryPagination
  totalPages={10}
  className='my-custom-pagination'
/>
```
