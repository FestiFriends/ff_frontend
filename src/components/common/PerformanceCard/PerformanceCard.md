# PerformanceCard 컴포넌트

공연 정보를 표시하는 재사용 가능한 컴포넌트입니다. Compound Component 패턴을 사용하여 유연한 커스터마이징을 제공합니다.

## 🎯 특징

- **Compound Component 패턴**: 개별 요소를 자유롭게 조합
- **스타일 분리**: 로직과 스타일의 완전한 분리
- **TypeScript 완전 지원**: 타입 안전성 보장
- **접근성 지원**: 키보드 네비게이션, ARIA 레이블
- **Context 기반**: 효율적인 데이터 공유

## 📋 목차

1. [기본 사용법](#기본-사용법)
2. [Import 방법](#import-방법)
3. [컴포넌트 구조](#컴포넌트-구조)
4. [API Reference](#api-reference)
5. [유의사항](#유의사항)
6. [예제 모음](#예제-모음)

## 🚀 기본 사용법

### 1단계: Import 하기

```typescript
// 방법 1: Named import (권장 - 트리 쉐이킹 최적화)
import {
  Root,
  Image,
  Title,
  Status,
  LikeButton,
} from '@/components/PerformanceCard';

// 방법 2: 전체 import
import * as PerformanceCard from '@/components/PerformanceCard';
```

### 2단계: Root 컴포넌트로 감싸기

**⚠️ 중요**: 모든 하위 컴포넌트는 반드시 `Root` 내부에서 사용해야 합니다!

```typescript
// ✅ 올바른 사용법
<Root performance={performanceData}>
  <Title />
  <Status />
  <Image />
</Root>

// ❌ 잘못된 사용법 - 에러 발생!
<Title />  {/* Context 에러 발생 */}
<Status /> {/* Context 에러 발생 */}
```

### 3단계: 필요한 컴포넌트 조합하기

```typescript
function PerformanceCardExample() {
  const handleCardClick = (performance) => {
    console.log('카드 클릭:', performance.title);
  };

  const handleLikeClick = (performance, isLiked) => {
    console.log(`좋아요 ${isLiked ? '추가' : '제거'}:`, performance.title);
  };

  return (
    <Root
      performance={performanceData}
      onCardClick={handleCardClick}
      onLikeClick={handleLikeClick}
    >
      <div className="flex gap-4 p-4 border rounded-lg">
        <Image className="w-24 h-32" />
        <div className="flex-1">
          <Title />
          <Status />
          <DateRange />
          <Location />
          <Cast />
          <Price />
        </div>
        <LikeButton isLiked={false} />
      </div>
    </Root>
  );
}
```

## 📦 Import 방법

### Named Import (권장)

```typescript
import {
  Root,
  Image,
  Title,
  Status,
  DateRange,
  Location,
  Cast,
  Price,
  LikeButton
} from '@/components/PerformanceCard';

// 사용법
<Root performance={data}>
  <Title />
  <Status />
</Root>
```

**장점**: 사용하지 않는 컴포넌트는 번들에 포함되지 않음 (트리 쉐이킹)

### Namespace Import

```typescript
import * as PerformanceCard from '@/components/PerformanceCard';

// 사용법
<PerformanceCard.Root performance={data}>
  <PerformanceCard.Title />
  <PerformanceCard.Status />
</PerformanceCard.Root>
```

**장점**: 네임스페이스로 명확한 구분, IDE 자동완성 지원

## 🏗️ 컴포넌트 구조

### Context 기반 아키텍처

```
Root (Context Provider)
├── 공연 데이터 제공
├── 이벤트 핸들러 관리
└── 하위 컴포넌트들이 데이터 접근 가능
    ├── Image
    ├── Title
    ├── Status
    ├── DateRange
    ├── Location
    ├── Cast
    ├── Price
    └── LikeButton
```

### 데이터 흐름

1. `Root`가 `performance` 데이터를 받음
2. `formatPerformanceData`로 데이터 가공
3. Context를 통해 모든 하위 컴포넌트에서 접근 가능
4. 각 컴포넌트는 필요한 데이터만 추출하여 렌더링

## 📚 API Reference

### Root

루트 컴포넌트로, 모든 하위 컴포넌트를 감싸는 컨테이너입니다.

```typescript
interface RootProps {
  performance: Performance; // 필수: 공연 데이터
  onCardClick?: (performance) => void; // 카드 클릭 핸들러
  onLikeClick?: (performance, isLiked) => void; // 좋아요 핸들러
  children: React.ReactNode; // 필수: 하위 컴포넌트들
  className?: string; // 추가 CSS 클래스
}
```

### Image

공연 포스터 이미지를 표시합니다.

```typescript
interface ImageProps {
  className?: string; // CSS 클래스
  alt?: string; // 대체 텍스트 (기본: "공연제목 포스터")
  fallback?: ReactNode; // 이미지 없을 때 표시할 컴포넌트
  priority?: boolean; // Next.js Image 우선 로딩
}
```

### 컨텐츠 컴포넌트들

Title, Status, DateRange, Location, Cast, Price 모두 동일한 인터페이스를 사용합니다.

```typescript
interface ContentProps {
  className?: string; // CSS 클래스
  children?: ReactNode; // 커스텀 내용 (기본값 대신 사용)
  fallback?: ReactNode; // 데이터 없을 때 표시할 내용
}
```

### LikeButton

좋아요 버튼 컴포넌트입니다.

```typescript
interface LikeButtonProps {
  isLiked?: boolean; // 좋아요 상태 (기본: false)
  showText?: boolean; // 텍스트 표시 여부 (기본: false)
  className?: string; // CSS 클래스
  children?: ReactNode; // 커스텀 텍스트
  icon?: {
    // 커스텀 아이콘
    liked: ReactNode; // 좋아요 상태 아이콘
    unLiked: ReactNode; // 좋아요 해제 상태 아이콘
  };
}
```

## 🏗️ 컴포넌트 구조 및 의존성 다이어그램

### 전체 아키텍처 Overview

```
📦 사용자 컴포넌트 (User Component)
 │
 ├── 📋 Performance 데이터 (필수)
 ├── 🎯 이벤트 핸들러 (선택)
 │   ├── onCardClick (카드 클릭용)
 │   └── onLikeClick (좋아요용) ⚠️ 없으면 LikeButton 미표시
 │
 └── 🎨 PerformanceCard.Root
     │
     ├── 📊 Context Provider (데이터 공급자)
     │   ├── performance → formatPerformanceData()
     │   ├── onCardClick (조건부 버튼 role 부여)
     │   └── onLikeClick (조건부 LikeButton 렌더링)
     │
     └── 🧩 하위 컴포넌트들 (Context 소비자)
         ├── Image (poster 이미지)
         ├── Title (공연 제목)
         ├── Status (공연 상태 + 상태별 스타일)
         ├── DateRange (공연 기간)
         ├── Location (공연 장소)
         ├── Cast (출연진)
         ├── Price (가격 범위)
         └── LikeButton ⚠️ onLikeClick 필수!
```

### 의존성 주입 흐름

```
외부 의존성 → Root → Context → 하위 컴포넌트들

Performance 데이터 ──┐
onCardClick (선택)  ──┤
onLikeClick (선택)  ──┼──→ Root ──→ Context ──→ 모든 하위 컴포넌트
className (선택)    ──┤
기타 props (선택)   ──┘
```

## ⚠️ 유의사항

### 🚨 Critical: 조건부 렌더링 규칙

#### 1. LikeButton은 onLikeClick 필수!

```typescript
// ✅ LikeButton이 표시됨
<Root
  performance={data}
  onLikeClick={handleLike} // 🔑 이것이 있어야 LikeButton 렌더링
>
  <LikeButton isLiked={true} />
</Root>

// ❌ LikeButton이 아예 표시되지 않음!
<Root performance={data}>
  <LikeButton isLiked={true} /> {/* null 반환! */}
</Root>
```

**⚠️ 중요**: `onLikeClick`이 없으면 `LikeButton` 컴포넌트는 DOM에서 완전히 제거됩니다.

#### 2. 카드 클릭 가능성은 onCardClick에 의존

```typescript
// ✅ 클릭 가능한 카드 (role="button", tabIndex="0")
<Root
  performance={data}
  onCardClick={handleClick} // 🔑 클릭 핸들러 제공
>
  {/* 카드가 버튼처럼 동작 */}
</Root>

// ✅ 클릭 불가능한 정적 카드
<Root performance={data}>
  {/* 일반 div로 렌더링 */}
</Root>
```

### 🏗️ Context 사용 규칙

**모든 하위 컴포넌트는 반드시 Root 내부에서 사용!**

```typescript
// ✅ 올바른 사용법
<Root performance={data}>
  <Title />
  <Status />
  <LikeButton /> {/* Context에서 데이터 접근 */}
</Root>

// ❌ 잘못된 사용법 - 런타임 에러!
<Title />  {/* Error: usePerformanceCardContext must be used within... */}
<Status /> {/* Context 접근 불가 */}
```

### 📦 Import 가이드

```typescript
// ✅ 권장: Named Import (트리 쉐이킹)
import { Root, Title, Status, LikeButton } from '@/components/PerformanceCard';

// ✅ 대안: Namespace Import
import * as PerformanceCard from '@/components/PerformanceCard';

// ❌ 지원하지 않음
import PerformanceCard from '@/components/PerformanceCard'; // default export 없음
```

### 🎯 외부에서 주입해야 하는 필수 의존성

#### 필수 의존성

```typescript
interface RequiredDependencies {
  // 1. 공연 데이터 (필수)
  performance: Performance; // ⚠️ 모든 필수 필드 포함 필요

  // 2. Next.js Image 컴포넌트 (내부 사용)
  // 3. Tailwind CSS 클래스 (스타일링)
  // 4. formatPerformanceData 유틸리티 (내부 사용)
  // 5. cn 유틸리티 함수 (클래스 병합)
}
```

#### Performance 타입 요구사항

```typescript
// ⚠️ 모든 필드가 필수입니다!
interface Performance {
  id: string;
  title: string;
  startDate: string; // ISO 날짜 문자열
  endDate: string; // ISO 날짜 문자열
  location: string;
  cast: string[]; // 출연진 배열
  price: string[]; // 가격 배열
  poster: string; // 이미지 URL (빈 문자열 가능)
  state: string;
  visit: string;
  time: string[];
  groupCount: number; // 🚨 누락 시 TypeScript 에러
  favoriteCount: number; // 🚨 누락 시 TypeScript 에러
}
```

#### 선택적 의존성

```typescript
interface OptionalDependencies {
  // 카드 클릭 기능을 원할 때
  onCardClick?: (performance: Performance) => void;

  // 좋아요 기능을 원할 때 (LikeButton 표시용)
  onLikeClick?: (performance: Performance, isLiked: boolean) => void;

  // 커스텀 스타일링
  className?: string;

  // 각 컴포넌트별 커스텀 props
  // (fallback, priority, icon 등)
}
```

### 🎨 스타일 의존성

```typescript
// 외부에서 제공되어야 하는 스타일 시스템
interface StyleDependencies {
  // 1. Tailwind CSS 설치 및 설정
  // 2. cn() 함수 (clsx + tailwind-merge)
  // 3. PerformanceCard.styles.ts의 스타일 정의
}
```

### 🔄 데이터 흐름 상세

```
1. 사용자가 performance 데이터 제공
   ↓
2. Root가 formatPerformanceData()로 데이터 가공
   ↓
3. Context Provider가 가공된 데이터 제공
   ↓
4. 하위 컴포넌트들이 Context에서 필요한 데이터 추출
   ↓
5. 각 컴포넌트가 해당 데이터를 렌더링

특별한 경우:
- LikeButton: onLikeClick 없으면 early return (null)
- 카드 클릭: onCardClick 없으면 일반 div, 있으면 button role
```

### 💡 실제 사용 시 체크리스트

#### ✅ 사용 전 확인사항

1. **Performance 데이터 완성도**

   ```typescript
   // 모든 필수 필드가 있는지 확인
   const isValid =
     performance.groupCount !== undefined
     && performance.favoriteCount !== undefined;
   ```

2. **좋아요 기능 사용 여부**

   ```typescript
   // LikeButton을 사용하려면 onLikeClick 필수
   const needsLikeButton = true;
   const onLikeClick = needsLikeButton ? handleLikeClick : undefined;
   ```

3. **Context 내부 사용 확인**
   ```typescript
   // 모든 컴포넌트가 Root 안에 있는지 확인
   <Root performance={data} onLikeClick={onLikeClick}>
     {/* 여기 안에만 하위 컴포넌트들 */}
   </Root>
   ```

### 4. 스타일 커스터마이징

스타일은 `PerformanceCard.styles.ts`에서 중앙 관리됩니다.

```typescript
// className으로 추가 스타일 적용
<Title className="text-2xl font-bold text-blue-600" />

// 기본 스타일 + 커스텀 스타일이 병합됨
// cn() 함수가 자동으로 처리
```

### 5. TypeScript 타입 안전성

```typescript
// Performance 타입이 올바르게 정의되어야 함
interface Performance {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  cast: string[];
  price: string[];
  poster: string;
  state: string;
  visit: string;
  time: string[];
  groupCount: number; // 필수
  favoriteCount: number; // 필수
}
```

## 💡 예제 모음

### 기본 카드

```typescript
import { Root, Image, Title, Status, DateRange, Location, Price } from '@/components/PerformanceCard';

function BasicCard({ performance }) {
  return (
    <Root performance={performance}>
      <div className="flex gap-4 p-4 border rounded-lg">
        <Image className="w-24 h-32" />
        <div>
          <Title />
          <Status />
          <DateRange />
          <Location />
          <Price />
        </div>
      </div>
    </Root>
  );
}
```

### 클릭 가능한 카드

```typescript
import { Root, Image, Title, Status } from '@/components/PerformanceCard';

function ClickableCard({ performance }) {
  const handleCardClick = (perf) => {
    router.push(`/performance/${perf.id}`);
  };

  return (
    <Root
      performance={performance}
      onCardClick={handleCardClick}
    >
      <div className="p-4 border rounded-lg hover:shadow-lg cursor-pointer">
        <Image />
        <Title />
        <Status />
      </div>
    </Root>
  );
}
```

### 좋아요 기능이 있는 카드

```typescript
import { Root, Image, Title, LikeButton } from '@/components/PerformanceCard';

function LikableCard({ performance, isLiked }) {
  const handleLikeClick = (perf, liked) => {
    if (liked) {
      addToFavorites(perf.id);
    } else {
      removeFromFavorites(perf.id);
    }
  };

  return (
    <Root
      performance={performance}
      onLikeClick={handleLikeClick}
    >
      <div className="relative p-4 border rounded-lg">
        <LikeButton isLiked={isLiked} />
        <Image />
        <Title />
      </div>
    </Root>
  );
}
```

### 컴팩트 카드

```typescript
import { Root, Title, Status, Price } from '@/components/PerformanceCard';

function CompactCard({ performance }) {
  return (
    <Root performance={performance}>
      <div className="flex items-center gap-2 p-2 border rounded">
        <div>
          <Title className="text-sm font-medium" />
          <Status />
        </div>
        <Price className="ml-auto text-xs" />
      </div>
    </Root>
  );
}
```

### 세로형 카드

```typescript
import { Root, Image, Title, Status, Location } from '@/components/PerformanceCard';

function VerticalCard({ performance }) {
  return (
    <Root performance={performance}>
      <div className="w-48 border rounded-lg overflow-hidden">
        <Image className="w-full h-64" />
        <div className="p-3">
          <Title />
          <Status />
          <Location />
        </div>
      </div>
    </Root>
  );
}
```

### 리스트에서 사용

```typescript
import { Root, Image, Title, Status, DateRange } from '@/components/PerformanceCard';

function PerformanceList({ performances }) {
  return (
    <div className="space-y-4">
      {performances.map((performance) => (
        <Root key={performance.id} performance={performance}>
          <div className="flex gap-4 p-4 border rounded-lg">
            <Image className="w-16 h-20" />
            <div className="flex-1">
              <Title />
              <Status />
              <DateRange />
            </div>
          </div>
        </Root>
      ))}
    </div>
  );
}
```

### 커스텀 fallback 사용

```typescript
import { Root, Image, Title, Cast } from '@/components/PerformanceCard';

function CustomFallbackCard({ performance }) {
  return (
    <Root performance={performance}>
      <div className="p-4 border rounded-lg">
        <Image
          fallback={
            <div className="w-24 h-32 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">이미지 없음</span>
            </div>
          }
        />
        <Title fallback="제목 미정" />
        <Cast fallback="출연진 정보 없음" />
      </div>
    </Root>
  );
}
```

## 🎨 스타일링 가이드

### 기본 스타일 클래스

컴포넌트별 기본 스타일은 `PerformanceCard.styles.ts`에 정의되어 있습니다:

```typescript
// 예시: Status 컴포넌트의 기본 스타일
const statusStyles = {
  base: 'mr-2 inline-block rounded px-2 py-1 text-sm',
  ended: 'bg-gray-100 text-gray-600', // 종료된 공연
  ongoing: 'bg-green-100 text-green-700', // 진행 중인 공연
  upcoming: 'bg-blue-100 text-blue-700', // 예정된 공연
};
```

### 커스텀 스타일 적용

```typescript
// className prop으로 추가 스타일 적용
<Title className="text-2xl font-bold text-purple-600" />
<Status className="rounded-full px-3 py-1" />
<Image className="rounded-lg shadow-lg" />
```

## 🔧 트러블슈팅

### 자주 발생하는 에러

1. **Context 에러**

   ```
   Error: usePerformanceCardContext must be used within PerformanceCardContext
   ```

   **해결법**: 모든 하위 컴포넌트를 `Root`로 감싸세요.

2. **Import 에러**

   ```
   Module not found: Can't resolve 'PerformanceCard'
   ```

   **해결법**: Named import를 사용하세요: `import { Root } from './PerformanceCard'`

3. **TypeScript 타입 에러**
   ```
   Property 'groupCount' is missing in type
   ```
   **해결법**: Performance 인터페이스에 누락된 속성을 추가하세요.

### 성능 최적화 팁

1. **Named Import 사용**: 필요한 컴포넌트만 import하여 번들 크기 최적화
2. **Image priority 설정**: 중요한 이미지에 `priority={true}` 설정
3. **메모화**: 자주 렌더링되는 카드는 `React.memo` 사용 고려
