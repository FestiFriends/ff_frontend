# PerformanceCard 컴포넌트

공연 정보 표시용 재사용 가능 컴포넌트 (Compound Component + Headless UI 패턴)

## 특징

- Type prop으로 간편한 카드 타입 선택
- Compound Component 패턴으로 유연한 커스터마이징
- Headless UI 구조로 스타일과 로직 분리
- 4가지 사전 정의 카드 레이아웃
- **가시성 제어 Props로 각 요소 표시/숨김 제어**
- 접근성 지원 (키보드 네비게이션, ARIA)
- TypeScript 완전 지원

## 사용법

### 1. Type Prop 방식 (권장)

```tsx
// 기본 카드
<PerformanceCard
  performance={performance}
  type="default"
  onCardClick={handleClick}
  onLikeClick={handleLike}
  isLiked={false}
/>

// 타입별 카드
<PerformanceCard performance={performance} type="compact" />
<PerformanceCard performance={performance} type="vertical" />
<PerformanceCard performance={performance} type="detailed" />

// 가시성 제어
<PerformanceCard
  performance={performance}
  type="compact"
  showCast={false}
  showPrice={false}
/>
```

### 2. Compound Component 방식 (커스터마이징)

```tsx
import PerformanceCard from './PerformanceCard';

<PerformanceCard.Root
  performance={performance}
  onCardClick={handleClick}
>
  <PerformanceCard.LikeButton isLiked={isLiked} />
  <div className='flex gap-4'>
    <PerformanceCard.Image className='h-40 w-32' />
    <div>
      <PerformanceCard.Title />
      <PerformanceCard.Status />
      <PerformanceCard.DateRange />
      <PerformanceCard.Location />
      <PerformanceCard.Price />
    </div>
  </div>
</PerformanceCard.Root>;
```

### 3. Named Import 방식 (트리 쉐이킹)

```tsx
import { Root, Title, Image, Status } from './PerformanceCard';

<Root performance={performance}>
  <Image />
  <Title />
  <Status />
</Root>;
```

## API

### PerformanceCard (메인 컴포넌트)

- `performance`: Performance (필수) - 공연 데이터
- `type`: 'default' | 'compact' | 'vertical' | 'detailed' (기본: 'default')
- `onCardClick`: (performance) => void - 카드 클릭 핸들러
- `onLikeClick`: (performance, isLiked) => void - 좋아요 핸들러
- `isLiked`: boolean (기본: false) - 좋아요 상태
- `className`: string

#### 가시성 제어 Props

- `showImage`: boolean - 이미지 표시 여부
- `showTitle`: boolean - 제목 표시 여부
- `showStatus`: boolean - 상태 표시 여부
- `showDateRange`: boolean - 공연 기간 표시 여부
- `showLocation`: boolean - 장소 표시 여부
- `showCast`: boolean - 출연진 표시 여부
- `showPrice`: boolean - 가격 표시 여부
- `showLikeButton`: boolean - 좋아요 버튼 표시 여부

### Compound Components

#### PerformanceCard.Root

- `performance`: Performance (필수)
- `onCardClick`: (performance) => void
- `onLikeClick`: (performance, isLiked) => void
- `children`: ReactNode (필수)
- `className`: string

#### PerformanceCard.Image

- `className`: string
- `alt`: string - 이미지 대체 텍스트
- `fallback`: ReactNode - 이미지 없을 때 표시
- `priority`: boolean - Next.js Image 우선 로딩

#### PerformanceCard.LikeButton

- `isLiked`: boolean (기본: false)
- `showText`: boolean (기본: false) - 텍스트 표시 여부
- `icon`: { liked, unliked } - 커스텀 아이콘
- `children`: ReactNode - 커스텀 텍스트

#### 기타 컴포넌트

- `Title`, `Status`, `DateRange`, `Location`, `Cast`, `Price`
- 공통 props: `className`, `children`, `fallback`

## 카드 타입

- **default**: 표준 가로형, 모든 정보 표시
- **compact**: 압축형 가로형, 주요 정보만 표시 (출연진 기본 숨김)
- **vertical**: 세로형, 이미지 상단 배치
- **detailed**: 확장형 가로형, 상세 정보 강조

### 카드 타입별 기본 가시성

- **default/detailed/vertical**: 모든 요소 표시
- **compact**: `showCast=false` (출연진 기본 숨김)

## 예제

### 동적 타입 선택

```tsx
const cardType = isMobile ? 'compact' : 'default';

<PerformanceCard
  performance={performance}
  type={cardType}
  onCardClick={handleClick}
/>;
```

### 가시성 제어

```tsx
// 특정 요소만 표시
<PerformanceCard
  performance={performance}
  type="compact"
  showImage={true}
  showTitle={true}
  showStatus={false}  // 상태 숨김
  showPrice={false}   // 가격 숨김
  showCast={false}    // 출연진 숨김
/>

// 이미지 없는 카드
<PerformanceCard
  performance={performance}
  showImage={false}
  showLikeButton={false}
/>

// 최소 정보만 표시
<PerformanceCard
  performance={performance}
  type="compact"
  showTitle={true}
  showStatus={true}
  showImage={false}
  showDateRange={false}
  showLocation={false}
  showCast={false}
  showPrice={false}
  showLikeButton={false}
/>
```

### 리스트 렌더링

```tsx
{
  performances.map((perf) => (
    <PerformanceCard
      key={perf.id}
      performance={perf}
      type='compact'
      onCardClick={handleClick}
      isLiked={likedPerfs.includes(perf.id)}
      showCast={false} // 리스트에서는 출연진 숨김
    />
  ));
}
```

### 완전 커스터마이징

```tsx
<PerformanceCard.Root performance={performance}>
  <div className='rounded-lg bg-white p-4 shadow-lg'>
    <div className='mb-2 flex items-start justify-between'>
      <PerformanceCard.Title className='text-xl font-bold' />
      <PerformanceCard.LikeButton showText />
    </div>
    <PerformanceCard.Image className='mb-3 h-48 w-full' />
    <div className='space-y-1'>
      <PerformanceCard.Status />
      <PerformanceCard.DateRange className='text-gray-600' />
      <PerformanceCard.Location className='text-gray-600' />
      <PerformanceCard.Price className='font-medium text-blue-600' />
    </div>
  </div>
</PerformanceCard.Root>
```

### Named Import로 최적화

```tsx
import { Root, Image, Title, Status } from './PerformanceCard';

<Root performance={performance}>
  <Image priority />
  <Title />
  <Status />
</Root>;
```

## Export 방식

### Default Export

```tsx
import PerformanceCard from './PerformanceCard';
// 메인 컴포넌트 + Compound 방식 모두 사용 가능
```

### Named Exports

```tsx
import { Root, Title, Image } from './PerformanceCard';
// 개별 컴포넌트만 import (트리 쉐이킹 최적화)
```

### Compound Properties

```tsx
import PerformanceCard from './PerformanceCard';
// PerformanceCard.Root, PerformanceCard.Title 등으로 사용
```

## 주요 규칙

- 모든 하위 컴포넌트는 `Root` 내부에서 사용 필수
- `onCardClick` 제공 시에만 카드 클릭 가능
- `onLikeClick` 제공 시에만 좋아요 버튼 표시
- 이미지 없을 경우 자동 fallback UI 표시
- Context 밖에서 하위 컴포넌트 사용 시 에러 발생
- **가시성 Props가 `false`일 때 해당 요소는 DOM에서 완전히 제거됨**
- `onLikeClick` 제공 시에만 좋아요 버튼 표시
- 이미지 없을 경우 자동 fallback UI 표시
- Context 밖에서 하위 컴포넌트 사용 시 에러 발생

## 접근성

- 클릭 가능한 카드: `role="button"`, `tabIndex={0}`, 키보드 이벤트 지원
- 좋아요 버튼: 적절한 `aria-label` 설정
- 이미지: 의미있는 `alt` 텍스트 자동 생성
- 키보드 네비게이션: Enter, Space 키 지원
