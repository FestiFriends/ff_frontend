# QueryTabs

URL 쿼리 파라미터와 탭 상태를 자동 동기화하는 래퍼 컴포넌트입니다.

## 핵심 동작 코드 분석

### 1. 쿼리 파라미터에서 활성 탭 결정

```typescript
const { getQueryParam, setQueryParam } = useQueryParam();

// URL에서 쿼리 파라미터 읽기 (예: ?tab=사용자 → "사용자")
const currentTab = getQueryParam(queryParamKey) || defaultTab;

// 유효성 검사: tabs 배열에 없는 값이면 defaultTab 사용
const activeTab = tabs.includes(currentTab) ? currentTab : defaultTab;
```

**동작 예시:**

- URL: `?tab=사용자` → `currentTab = "사용자"` → `activeTab = "사용자"`
- URL: `?tab=invalid` → `currentTab = "invalid"` → `activeTab = defaultTab`
- URL: 파라미터 없음 → `currentTab = defaultTab` → `activeTab = defaultTab`

### 2. 탭 클릭 시 URL 업데이트

```typescript
const handleTabChange = (tab: string) => {
  // 1. URL 쿼리 파라미터 업데이트 (브라우저 URL 변경)
  setQueryParam(queryParamKey, tab);

  // 2. 부모 컴포넌트 콜백 실행 (옵셔널)
  onTabChange?.(tab);
};
```

**setQueryParam 내부 동작:**

```typescript
const setQueryParam = (key: string, value: string) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(key, value);
  router.replace(`${window.location.pathname}?${params.toString()}`);
  return params.toString();
};
```

## 실제 구현에서 사용하는 방법

### 1. QueryTabs 컴포넌트 배치

```typescript
const TABS = ['공연', '사용자'];

return (
  <>
    <QueryTabs
      tabs={TABS}
      queryParamKey="tab"  // URL: ?tab=값
      defaultTab={TABS[0]} // 기본값: "공연"
    />
    {/* 탭 내용 렌더링 영역 */}
  </>
);
```

### 2. 탭별 내용 렌더링 로직

```typescript
const { getQueryParam } = useQueryParam();
const selectedTab = getQueryParam('tab') || TABS[0];

// 조건부 렌더링
{selectedTab === '공연' && <PerformanceTabContent />}
{selectedTab === '사용자' && <UserTabContent />}

// 또는 switch 문
const renderTabContent = () => {
  switch (selectedTab) {
    case '공연': return <PerformanceTabContent />;
    case '사용자': return <UserTabContent />;
    default: return <PerformanceTabContent />;
  }
};
```

### 3. 완전한 구현 예시

```typescript
'use client';
import QueryTabs from '@/components/common/QueryTabs';
import useQueryParam from '@/hooks/useQueryParam';

const TABS = ['공연', '사용자'];

const FavoriteTabContainer = () => {
  const { getQueryParam } = useQueryParam();
  const selectedTab = getQueryParam('tab') || TABS[0];

  return (
    <>
      {/* URL 상태 관리 */}
      <QueryTabs
        tabs={TABS}
        defaultTab={TABS[0]}
        queryParamKey="tab"
      />

      {/* 상태 기반 렌더링 */}
      <div className="p-4">
        {selectedTab === '공연' && <PerformanceTabContent />}
        {selectedTab === '사용자' && <UserTabContent />}
      </div>
    </>
  );
};
```

## 상태 동기화 메커니즘

### 렌더링 사이클

```typescript
1. useSearchParams() → URL 변경 감지
2. getQueryParam(queryParamKey) → 새로운 탭 값 추출
3. activeTab 계산 → 유효성 검사 후 활성 탭 결정
4. <Tabs activeTab={activeTab} /> → 하위 컴포넌트에 전달
5. 탭 내용 조건부 렌더링 → selectedTab 기반으로 내용 변경
```

### URL 업데이트 사이클

```typescript
1. 사용자 탭 클릭
2. handleTabChange(tab) 실행
3. setQueryParam(queryParamKey, tab) → router.replace() 호출
4. URL 변경 → useSearchParams() 훅이 감지
5. 컴포넌트 리렌더링 → 새로운 activeTab으로 업데이트
```

## Props 및 설정

```typescript
interface QueryTabsProps {
  tabs: string[]; // 탭 목록
  defaultTab?: string; // 기본 활성 탭 (tabs[0])
  queryParamKey?: string; // URL 파라미터 키 ('tab')
  onTabChange?: (tab: string) => void; // 탭 변경 콜백
}
```

### 커스터마이징 예시

```typescript
// 다른 쿼리 키 사용
<QueryTabs
  tabs={['대시보드', '설정']}
  queryParamKey="section"  // ?section=설정
/>

// 탭 변경 시 추가 로직
<QueryTabs
  tabs={TABS}
  onTabChange={(tab) => {
    console.log('탭 변경:', tab);
    // analytics 이벤트 전송 등
  }}
/>
```

## 의존성 구조

```typescript
QueryTabs
├── useQueryParam (커스텀 훅)
│   ├── useSearchParams (Next.js)
│   └── useRouter (Next.js)
└── Tabs (기본 탭 컴포넌트)
```

이 컴포넌트는 **상태 관리 없이 URL만으로 탭 상태를 유지**하므로, 페이지 새로고침이나 브라우저 히스토리 이동 시에도 탭 상태가 보존됩니다.
