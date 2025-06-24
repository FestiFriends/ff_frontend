---
marp: true
theme: default
paginate: true
backgroundColor: #f3f3f3
color: #444444
style:  |
  @import url("https://cdn.jsdelivr.net/gh/Jihwan-Suh/PyeojinGothic/CSS/pyeojin-font.css");
  
  section {
    justify-content: center;
    text-align: center;
    padding: 0;
    font-family: 'Fira Code Retina', 'PyeojinGothic', 'Pyeojin Gothic', 'Pretendard', 'Interop';
  }
  ul {
    display: inline-block;
    margin: 0 auto;
    text-align: left;
    padding-left: 0;
  }
  
  /* 기본 간격 증가 */
  li {
    line-height: 1.7;     /* 줄 간격도 증가 */
  }
  
  /* 중첩 리스트 간격 */
  ul ul {
    margin-top: 6px;
    margin-bottom: 10px;
    padding-left: 40px;
  }
  
  ul ul ul {
    margin-top: 4px;
    margin-bottom: 6px;
    padding-left: 40px;
  }

  .split {
    display: flex;
    gap: 20px;
  }
  .split img {
    height: auto;
  }

  .center {
    width: full;
    margin: 0 auto 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .left {
    width: fit-content;
    display: flex;
    margin: 0 auto 0 auto;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
  }
  code {
  font-size: 1.1em;
  display: inline;
  padding: 2px 4px;
  }

  pre {
    font-size: 1.1em;
    margin: 0 auto;
    text-align: left;
  }
  .md {
    width: 80%;
    margin: 0 auto;
  }
  strong {
    color: #d70087;
  }
---


# 3조: Festi Friends (FF)

- **Frontend**: 고성인, 송지현, 임찬호, 정유진, 지서경
- **Backend**: 박성민, 이정우  
- **Design**: 반수정

<!--
안녕하세요. 3조 Festi Friends입니다.
저희는 프론트엔드 5명, 백엔드 2명, 디자이너 1명으로 구성된 팀으로,
공연 동행 매칭 플랫폼을 개발했습니다. 지금부터 저희가 약 한 달간 개발한 결과물을 보여드리겠습니다.
-->

---

# 목차

- **프로젝트 개요** - 서비스 아이디어와 핵심 가치
- **팀 구성 및 역할** - 팀원별 담당 업무
- **기술 스택** - 사용 기술과 선택 이유
- **개발 방법론** - 체계적인 개발 프로세스
- **핵심 기능** - 주요 기능 구현 내용
- **기술적 도전과제** - 해결한 복잡한 문제들
- **성과 및 시연** - 개발 결과와 실제 데모
- **QNA** 
---

# 프로젝트 개요

## 신뢰 기반 공연/페스티벌 동행 매칭 플랫폼

<div class="center">

### "함께가는 공연, 더 안전하게"

</div>

<!--
저희 서비스는 혼자 공연을 보기 부담스러운 사람들을 위한 동행 매칭 플랫폼입니다.
기존의 단순한 매칭이 아닌, 신뢰를 기반으로 한 안전한 동행을 목표로 삼았습니다.
-->

---

# 핵심 아이디어

<div class="center">

## 경제적 이익 <=> 안전 + 편의성

### **리뷰 시스템**으로 신뢰도 확보
### **실시간 채팅**으로 소통 강화

</div>

<!--
공연 동행에는 중요한 딜레마가 있습니다. 경제적 이익과 안전성 사이의 균형이죠.
저희는 이 문제를 두 가지 방법으로 해결했습니다. 리뷰 시스템을 통한 신뢰도 확보와, 실시간 채팅을 통한 사전 소통입니다.
-->

---

# 팀 구성 - Frontend

## Frontend 개발팀

- **고성인**: 아키텍처, 메인 페이지, 레이아웃, 리뷰 관리페이지
- **송지현**: 모임 상세 페이지, 모임 관리 페이지, 신고 페이지
- **임찬호**: 캘린더 페이지, 마이 페이지, 프로필 페이지
- **정유진**: PM, 형상 관리, 공연 목록, 찜, 모임 개설 페이지
- **지서경**: 공연 상세 페이지, 모임 상세 페이지, 실시간 채팅

<!--
프론트엔드 개발팀은 효율적인 작업을 위해 도메인별로 역할을 분담했습니다.
각자 맡은 영역에서 전문성을 발휘하면서도, 전체적인 일관성을 유지하는 데 집중했습니다.
-->

---

# 팀 구성 - Backend & Design

## Backend 개발팀 
- **박성민**, **이정우**

## Design
- **반수정**: UI/UX 디자인, 프로토타입

<!--
백엔드 팀은 안정적인 API 서버 구축을, 디자이너는 일관된 UI/UX 설계를 담당했습니다.
이제 저희가 왜 이런 기술들을 선택했는지, 기술 스택에 대해 말씀드리겠습니다.
-->

---

# 기술 스택

<div class="center">

## **Frontend 중심의 현대적 기술 스택**

### Next.js 15 + React 19 + TypeScript 기반
### 확장 가능하고 안정적인 아키텍처

</div>

<!--
저희는 현대적이고 확장 가능한 아키텍처를 위해 최신 기술 스택을 선택했습니다.
특히 Next.js 15와 React 19를 기반으로, TypeScript의 강력한 타입 안전성을 확보하는 데 중점을 두었습니다.
-->

---

# Frontend Core


- **`Next.js 15.3.2`** 
  - App Router, Server Components 활용
- **`React 19.0.0`**   
  - 최신 React 기능 적극 활용  
- **`TypeScript 5`**  
  -  타입 안전성 및 개발 생산성 확보
- **`TailwindCSS 4`**
  - 유틸리티 기반 일관된 스타일링


<!--
핵심 기술부터 살펴보면, Next.js 15의 App Router와 Server Components로 성능을 최적화했고,
React 19의 최신 기능들을 적극 활용했습니다.
그리고 TailwindCSS로 일관되고 유지보수하기 쉬운 스타일링 시스템을 구축했습니다.
-->

---

# 상태 관리 & 데이터

- **`Zustand 5.0.5`**
  - 경량화된 클라이언트 상태 관리
- **`TanStack Query 5.76.1`**
  - 서버 상태 관리 및 캐싱 최적화
- **`Axios 1.9.0`**
  - HTTP 클라이언트 및 인터셉터

<!--
상태 관리는 명확한 분리 원칙을 적용했습니다. Zustand로 클라이언트 상태를, TanStack Query로 서버 상태를 각각 관리해서,
복잡성을 줄이면서도 효율적인 데이터 플로우와 캐싱 최적화를 달성할 수 있었습니다.
-->

---



  # 개발 도구 & 품질 관리

- **`Jest` + `Testing Library`**
  -  단위/통합 테스트
- **`MSW 2.8.4`**
  - API 모킹으로 독립적 개발
- **`ESLint` + `Prettier`**
  - 코드 품질 및 스타일 통일
- **`Husky`**
  - Git Hook 기반 자동화

<!--
코드 품질 확보를 위해서는 테스트 커버리지 70% 이상을 달성했고,
MSW를 활용해 백엔드와 완전히 독립적인 개발 환경을 구축했습니다.
또한 ESLint, Prettier, Husky로 코드 품질을 자동화해서 일관성을 유지했습니다.
다음으로는 이런 기술들을 어떻게 구조화했는지 보겠습니다.
-->

---

# 프로젝트 아키텍처

<div class="center">

### 도메인 기반 폴더 구조
### 컴포넌트 중심 설계

</div>

<!--
저희는 확장성과 유지보수성을 고려한 모듈러 아키텍처를 설계했습니다.
특히 5명의 개발자가 동시에 작업할 때 충돌을 최소화하면서, 각자의 역할을 명확히 할 수 있는 구조에 집중했습니다.
-->

---

<style>
.a {
  width: 60%;
  margin: 0 auto;
}
</style>

# 폴더 구조

<div class="a">

```
src/
├── components/   # UI 컴포넌트
├── hooks/        # 커스텀 훅  
├── services/     # API 통신
├── stores/       # 전역 상태
├── types/        # 타입 정의
└── utils/        # 유틸리티
```

</div>

<!--
보시는 것처럼 각 폴더의 역할이 명확하게 분리되어 있습니다.
이런 구조 덕분에 개발자가 원하는 코드를 쉽게 찾을 수 있고, 실제로 5명이 동시에 작업해도 거의 충돌이 발생하지 않았습니다.
-->

---

# 컴포넌트 계층 구조

<div class="a">

```
components/
├── common/             # 범용 UI 컴포넌트
│   ├── Button/         # 기본 버튼
│   ├── Modal/          # 모달 시스템
│   └── Form/           # 폼 컴포넌트
├── pages/              # 페이지 특화 컴포넌트
└── icons/              # SVG 아이콘
```

</div>

<!--
컴포넌트는 재사용성을 기준으로 계층적으로 구조화했습니다.
가장 범용적인 공통 컴포넌트부터 시작해서, 페이지에 특화된 컴포넌트까지 체계적으로 관리했습니다.
이제 실제 개발 과정에서 적용한 방법론들을 보겠습니다.
-->

---

# 개발 방법론

<div class="center">

## Component Driven Development
## API First Development

</div>

<!--
효율적인 개발을 위해 두 가지 핵심 방법론을 채택했습니다.
이 방법론들 덕분에 안정적이면서도 빠른 개발이 가능했는데, 먼저 컴포넌트 중심 개발부터 설명드리겠습니다.
-->

---

# Component Driven Development

## 상향식 컴포넌트 개발

- **컴포넌트 → 페이지 → 뷰**
  - 재사용 가능한 단위부터 구축
- **공통 컴포넌트 우선**
  - Button, Modal, Form 등 기반 컴포넌트
- **테스트 기반 검증**
  - React Testing Library로 동작 보장

<!--
상향식 개발 방식으로, 가장 작은 단위인 재사용 가능한 컴포넌트부터 구축했습니다.
공통 컴포넌트를 먼저 완성하고 충분히 테스트한 후, 이를 조합해서 페이지를 만드는 방식이었습니다.
덕분에 안정성과 UI 일관성을 동시에 확보할 수 있었습니다.
-->

---

# API First Development

## 병렬 개발을 위한 전략

- **API 스펙 우선 정의**
  - TypeScript 인터페이스 먼저 작성
- **MSW 기반 모킹**
  - 백엔드와 독립적인 프론트엔드 개발  
- **실제 API 전환**
  - 개발 완료 후 실제 API로 교체

<!--
두 번째는 API First Development입니다.
TypeScript 인터페이스를 먼저 정의하고 MSW로 실제와 똑같이 모킹해서,
백엔드 개발을 기다리지 않고 완전히 병렬로 작업할 수 있었습니다.
이제 팀 협업을 위한 형상 관리 전략을 보겠습니다.
-->

---

# 형상 관리 전략

<div class="center">

## GitHub Flow 기반
## 3단계 브랜치 전략

</div>

<!--
체계적인 협업을 위해 3단계 브랜치 전략을 구축했습니다.
무엇보다 안전한 코드 통합과 충돌 최소화에 중점을 두었습니다.
-->

---
<style>
.b {
  width: 80%;
  margin: 0 auto;
}
</style>


# 브랜치 전략

<div class="b">

```
develop (메인)
 │  
 └─ base: prefix/issue-***/base (기능 통합)
      │   
      └─ sub-base: prefix/issue-***/feature (기능 개발)
```

</div>


<!--
develop은 안정적인 메인 브랜치, base는 기능별 통합 공간, sub-base는 개별 작업 공간으로 운영했습니다.
이런 구조로 개발자들이 서로 방해받지 않으면서도, 안정적으로 코드를 통합할 수 있었습니다.
-->

---

# 코드 리뷰 프로세스

- **전원 승인 원칙**
  - 모든 PR은 팀원 전체가 리뷰
  
- **코드 품질 검증**
  - 기능, 스타일, 성능 등 다각도 검토
- **지식 공유**
  - 리뷰를 통한 팀 전체 역량 향상

<!--
모든 PR은 팀원 전체가 리뷰하는 전원 승인 원칙을 적용했습니다.
처음엔 시간이 오래 걸릴 것 같았지만, 오히려 코드 품질 향상과 함께 팀 전체의 기술 수준을 함께 높일 수 있는 좋은 기회였습니다.
이제 실제 구현한 핵심 기능들을 보겠습니다.
-->

---

# 주요 기능 구현

<div class="center">


## 공연 검색 → 그룹 매칭 → 신뢰도 확인
## 완전한 동행 매칭 플로우

</div>

<!--
사용자가 실제로 서비스를 이용하는 전체 플로우를 고려해서,
공연 검색부터 시작해서 동행 매칭, 신뢰도 확인까지 완전한 서비스 경험을 설계했습니다.
-->

---

# 공연 목록 & 검색


- **무한 스크롤**
  - Intersection Observer 기반 성능 최적화
  
- **다중 필터링**
  - 지역, 날짜, 카테고리별 정렬 지원
- **실시간 검색**
  - 공연명, 장소 기반 즉시 검색

<!--
사용자가 원하는 공연을 빠르고 쉽게 찾을 수 있도록
무한 스크롤, 다중 필터링, 실시간 검색 기능을 모두 구현했습니다.
특히 Intersection Observer를 활용해서 스크롤 성능을 크게 최적화했습니다.
-->

---

# 그룹 매칭 시스템


- **상세 필터링**
  - 연령대, 성별, 관심사 기반 매칭
  
- **실시간 채팅**
  - WebSocket 기반 즉시 소통 지원
- **일정 관리**
  - 그룹별 공유 캘린더 시스템

<!--
단순한 매칭이 아닌, 정말 맞는 사람을 찾을 수 있도록 세밀한 필터링 시스템을 만들었습니다.
그리고 WebSocket 기반 실시간 채팅으로 미리 충분히 소통할 수 있게 했고,
그룹별 공유 캘린더로 약속 관리까지 지원합니다.
-->

---

# 신뢰도 시스템

- **상호 리뷰 시스템**
  - 동행 후 양방향 평가 진행
  
- **성향별 태그**
  - 시간 준수, 친화력 등 세분화된 평가
- **객관적 지표**
  - 평점과 리뷰 수 기반 신뢰도 표시

<!--
서비스의 핵심인 신뢰도 시스템입니다.
동행이 끝난 후 서로를 평가하는 상호 리뷰 시스템을 만들었고, 시간 약속이나 친화력 같은 세분화된 태그로 구체적인 평가가 가능합니다.
이제 이런 기능들을 구현하면서 해결한 기술적 도전들을 살펴보겠습니다.
-->

---

# 핵심 기술 구현


<!--
정말 품질 높은 웹 애플리케이션을 만들기 위해서는 여러 복잡한 기술적 문제들을 해결해야 했습니다.
가장 중요했던 상태 관리 아키텍처부터 차근차근 설명드리겠습니다.
-->

---

# 상태 관리 아키텍처

<div class="center">

##  **3단계 상태 관리 전략**

### URL State + Server State + Client State
### 사용자 경험과 개발 효율성 극대화

</div>

<!--
저희만의 3단계 상태 관리 전략을 설계했습니다.
URL 상태, 서버 상태, 클라이언트 상태를 명확히 분리해서 각각의 책임을 나누었는데, 이게 정말 개발 복잡성을 크게 줄여줬습니다.
-->

---

# URL 기반 상태 관리


- **북마크 가능한 검색 결과**
  - 필터링된 공연 목록 URL 직접 공유
  
- **브라우저 뒤로가기 지원**
  - 자연스러운 네비게이션 경험
- **새로고침 후 상태 유지**
  - 검색 조건과 페이지 상태 보존

<!--
URL을 단순한 주소가 아닌 상태 관리의 핵심 도구로 활용했습니다.
사용자가 검색하고 필터링한 결과를 URL로 그대로 공유할 수 있고, 새로고침해도 똑같은 상태가 유지되죠.
-->

---

# 쿼리 파라미터 관리 시스템

<div class="b">

```typescript
const useQueryParam = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const setQueryParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(key, value) : params.delete(key);
    router.replace(`${window.location.pathname}?${params.toString()}`);
  }, [router, searchParams]);

  const setMultipleQueryParams = useCallback((
    params: Record<string, string | null>
  ) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      value ? newParams.set(key, value) : newParams.delete(key);
    });
    router.replace(`${window.location.pathname}?${newParams.toString()}`);
  }, [router, searchParams]);

  return { getQueryParam, setQueryParam, setMultipleQueryParams };
};
```

</div>

<!--
이런 URL 상태 관리를 위해 전용 커스텀 훅을 만들었습니다.
복잡한 쿼리 파라미터들을 효율적으로 관리하면서, Next.js 라우터와 완벽하게 연동되도록 구현했습니다.
-->

---

# 서버 상태 관리 - TanStack Query

<div class="b">

```typescript
// URL 쿼리스트링 기반 공연 목록 조회
export const useGetPerformances = (
  queryString: string, 
  enabled?: boolean
) => useQuery<PerformancesResponsePagination>({
  queryKey: [PERFORMANCES_QUERY_KEYS.performances, queryString],
  queryFn: async () => await performancesApi.getPerformances(queryString),
  enabled: enabled && Boolean(queryString), // 조건부 실행
  staleTime: 30 * 1000,  // 30초간 캐시 유지
  gcTime: 5 * 60 * 1000, // 5분간 메모리 보관
});
```

</div>

<!--
여기서 흥미로운 점은, URL이 변경될 때마다 자동으로 새로운 캐시 키가 생성된다는 것입니다.
그래서 각 검색 조건별로 완전히 독립적인 캐싱이 이루어져서, 사용자 경험이 훨씬 좋아졌습니다.
-->

---

# 실제 구현 사례 - 공연 목록 페이지

<div class="b">

```typescript
const PerformancesListContainer = () => {
  const { getPerformanceQueryString } = useQueryParam();
  
  // URL 쿼리스트링을 API 쿼리스트링으로 변환
  const queryString = getPerformanceQueryString();
  
  // 쿼리스트링 기반 데이터 페칭
  const { data: performancesData, isLoading } = useGetPerformances(
    queryString,
    Boolean(queryString) // 쿼리스트링이 있을 때만 실행
  );

  return (
    <div>
      <PerformancesSearchInput />      {/* 검색어 → URL */}
      <PerformancesLocationSelector /> {/* 지역 → URL */}
      <PerformancesDatePicker />       {/* 날짜 → URL */}
      <CustomSortDropdown />           {/* 정렬 → URL */}
      
      <PerformanceList data={performancesData?.data} />
      
      {/* URL 기반 페이지네이션 */}
      <QueryPagination totalPages={performancesData?.totalPages || 1} />
    </div>
  );
};
```

</div>

<!--
실제 공연 목록 페이지에서 이 모든 개념들이 어떻게 통합되는지 보시면,
검색어, 필터, 정렬, 페이지네이션 모든 상태가 URL로 관리되어서 완전히 공유 가능하고 복원 가능한 검색 결과를 만들어냅니다.
이제 실시간 채팅 구현으로 넘어가보겠습니다.
-->


---

# 클라이언트 상태 관리 - Zustand

<div class="b">

```typescript
// 인증 상태만 클라이언트에서 관리
export const createAuthStore = (initState: AuthState = defaultInitState) =>
  createStore<AuthStore>()(
    persist(
      (set) => ({
        ...initState,
        login: (token: string) =>
          set({
            accessToken: token,
            isLoggedIn: true,
          }),
        logout: () => {
          set({
            accessToken: null,
            isLoggedIn: false,
          });
          localStorage.removeItem('authInfo');
        },
      }),
      { name: 'authInfo' }
    )
  );
```

</div>


<!--
Zustand로는 정말 꼭 필요한 인증 상태만 관리해서 전체 상태 관리의 복잡성을 최소화했습니다.
대부분의 상태는 URL과 서버 상태로 충분히 처리할 수 있었거든요.
-->

---

# 실시간 채팅 시스템

##  WebSocket 기반 실시간 통신

- **토큰 만료 시 재인증**: JWT 토큰 갱신 중 연결 유지
- **다중 그룹 채팅 관리**: 사용자가 여러 그룹에 동시 참여
- **HTTP + WebSocket 통합**: 히스토리 조회와 실시간 메시지 병합

<!--
실시간 채팅 구현에서는 정말 까다로운 문제들이 많았습니다.
토큰이 만료되었을 때의 자동 재인증, 사용자가 여러 그룹에 동시 참여하는 상황 관리, 그리고 HTTP API와 WebSocket을 자연스럽게 통합하는 것까지.
-->

---

# WebSocket 연결 관리 구현
## STOMP + SockJS 기반 안정적 연결


<div class="b">

```typescript
export const useChatWebSocket = (userId: number, chatRoomId: number) => {
  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const connectWebSocket = async (token: string) => {
    const socket = new SockJS(`${WEBSOCKET_URL}/chat`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { Authorization: `Bearer ${token}` },
```

</div>

<!--
STOMP와 SockJS를 조합해서 정말 안정적인 WebSocket 연결을 구현했습니다.
토큰 기반 인증부터 연결 상태 관리까지, 모든 복잡함을 하나의 커스텀 훅으로 추상화했습니다.
-->

---

# WebSocket 에러 처리 & 재연결
## 토큰 갱신과 자동 재연결


<div class="b">

```typescript
      onConnect: () => {
        setIsConnected(true);
        // 그룹별 채팅방 구독
        stompClient.subscribe(`/sub/chat/${chatRoomId}`, (message) => {
          const body = JSON.parse(message.body);
          setMessages(prev => [...prev, body]);
        });
      },
      
      onStompError: async () => {
        // 토큰 만료 시 자동 갱신 후 재연결
        const newToken = await getNewAccessToken();
        if (newToken) {
          stompClient.deactivate();
          connectWebSocket(newToken);
        }
      }
```

</div>

<!--
특히 토큰이 만료되었을 때 자동으로 새 토큰을 받아와서 재연결하는 로직을 구현했는데,
사용자는 연결이 끊어진 걸 전혀 느끼지 못할 정도로 매끄럽게 처리됩니다.
-->

---

# HTTP + WebSocket 데이터 통합

## 히스토리와 실시간 메시지 병합

<div class="b">

```typescript
const ChatArea = ({ userId, chatRoomId }: ChatAreaProps) => {
  // WebSocket 실시간 메시지
  const { messages: liveMessages, sendMessage } = 
    useChatWebSocket(userId, chatRoomId);
  
  // HTTP API 채팅 히스토리 (무한스크롤)
  const { data: chatHistory, fetchNextPage } = 
    useGetChatHistory(chatRoomId, 20);

  // 히스토리 + 실시간 메시지 병합
  const historyMessages: ChatMessage[] = (chatHistory?.pages ?? [])
    .flatMap(page => page.data ?? [])
    .reverse(); // 시간순 정렬

  const allMessages = [...historyMessages, ...liveMessages];
```

</div>

<!--
그리고 HTTP API로 받은 채팅 히스토리와 WebSocket으로 받는 실시간 메시지를 자연스럽게 병합해서,
정말 끊김 없는 하나의 연속된 채팅 경험을 만들어냈습니다.
-->


---

# 낙관적 업데이트 (Optimistic Updates)


<div class="b">

```typescript
// 찜하기 기능의 낙관적 업데이트
export const usePatchPerformanceLiked = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: performancesApi.patchLiked,
    
    onMutate: async ({ performanceId, isLiked }) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({
        queryKey: [PERFORMANCES_QUERY_KEYS.performances],
      });

      // 모든 관련 쿼리 데이터 즉시 업데이트
      const queries = queryClient.getQueriesData({
        queryKey: [PERFORMANCES_QUERY_KEYS.performances],
      });

      queries.forEach(([queryKey, queryData]) => {
        // ... 
      });
    },
  });
};
```

</div>

<!--
사용자가 버튼을 클릭했을 때 즉시 반응하는 UI를 위해 낙관적 업데이트도 구현했습니다.
서버 응답을 기다리지 않고 바로 UI를 업데이트해서, 정말 빠르고 반응성 좋은 경험을 제공합니다.
-->

---

# 반응형 디자인 구현

## Mobile-First 반응형 구현

- **완전히 다른 UI 패턴**: 모바일과 데스크톱에서 다른 네비게이션
- **터치 vs 마우스 인터랙션**: hover 효과와 터치 이벤트 분기 처리
- **드래그 스크롤 구현**: 모바일에서 자연스러운 스크롤 경험

<!--
반응형 디자인에서는 단순히 화면 크기만 조정하는 게 아니라,
모바일과 데스크톱에서 완전히 다른 인터랙션 패턴을 구현해야 했습니다.
-->

---

# 디바이스별 UI 패턴 분기

##  조건부 렌더링 전략

<div class="a">

```typescript
// useIsMobile.tsx - 768px 기준 모바일 감지
const useIsMobile = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return IS_MOBILE_IN_DESKTOP || isMobile;
};

// 네비게이션 분기 처리
const Layout = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen">
      {isMobile && <Header />}
      {children}
      {!isMobile && <GlobalNavigationBar />}
    </div>
  )
}
```

  </div>

<!--
각 디바이스에 정말 최적화된 경험을 제공하기 위해서,
모바일은 헤더와 하단 탭바, 데스크톱은 사이드 GNB로 완전히 다른 네비게이션 구조를 만들었습니다.
-->

---

# 터치 인터랙션 최적화

## Hover vs Touch 이벤트 분기

<div class="a">

```typescript
const PerformanceHoverCard = ({ performance }) => {
  const isMobile = useIsMobile();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    if (isMobile) {
      // 모바일: 클릭으로 카드 토글
      setShow(prev => !prev);
    }
  };

  const handleEnter = () => {
    if (!isMobile) {
      // 데스크톱: 호버로 카드 표시
      setShow(true);
    }
  };
```

</div>


<!--
인터랙션도 디바이스 특성에 맞게 분기 처리했습니다.
모바일에서는 hover가 없으니까 클릭으로, 데스크톱에서는 hover로 각각 다르게 동작하도록 해서 정말 자연스러운 경험을 만들었습니다.
-->

---

# 드래그 스크롤 구현

## 마우스 드래그로 수평 스크롤

<div class="b">

```typescript
export const useDragScroll = <T extends HTMLElement>(
  options: { direction?: 'horizontal' | 'vertical' | 'both'; sensitivity?: number }
) => {
  const elementRef = useRef<T>(null);
  const isDragging = useRef(false);
  const startPosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !elementRef.current) return;
    
    e.preventDefault();
    const deltaX = (startPosition.current.x - e.clientX) * sensitivity;
    
    if (direction === 'horizontal') {
      elementRef.current.scrollLeft = scrollStart.current.x + deltaX;
    }
  }, [direction, sensitivity]);

  return elementRef;
};
```

</div>


<!--
특히 수평 스크롤이 필요한 부분에서는 터치 스크롤과 마우스 드래그를 모두 지원하는 범용 커스텀 훅을 만들어서,
어떤 디바이스에서든 편안한 스크롤 경험을 제공합니다.
-->

---

# 무한 스크롤 성능 최적화

## Intersection Observer + TanStack Query

- **성능 최적화**: 스크롤 이벤트 대신 네이티브 API 활용
- **복잡한 상태 관리**: 로딩, 에러, 페이지네이션 상태 통합
- **재사용성**: 다양한 목록에서 동일한 패턴 활용

<!--
성능 최적화 측면에서는, 기존의 스크롤 이벤트 방식 대신
Intersection Observer라는 브라우저 네이티브 API를 활용했습니다.
-->

---

# Intersection Observer 기반 무한 스크롤


<div class="b">

```typescript
export const useInfiniteScroll = <T extends HTMLElement>(
  fetchNextPage: () => void,
  hasNextPage: boolean,
  isFetchingNextPage?: boolean
) => {
  const bottomRef = useRef<T | null>(null);

  useEffect(() => {
    if (!bottomRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage(); // 화면에 보이면 다음 페이지 로드
      }
    });

    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return bottomRef;
};
```

</div>


<!--
이 방법으로 무한 스크롤을 구현하니까 성능이 정말 크게 향상되었습니다.
스크롤할 때마다 이벤트가 발생하는 게 아니라, 필요한 시점에만 트리거되거든요.
-->

---

# 범용 무한 스크롤 컴포넌트

##  Suspense + ErrorBoundary 통합

<div class="a">

```tsx
const InfiniteList = ({
  options, getDataId, renderData, className,
  emptyFallback = <p>데이터가 없습니다.</p>,
  fallback = <p>로딩 중...</p>,
  isFetchingFallback = <p>로딩 중...</p>,
}) => (
  <ErrorBoundary fallback={({ error }) => <p>{error.message}</p>}>
    <Suspense fallback={fallback}>
      <SuspenseInfiniteQuery {...options}>
        {(queryResult) => (
          <ListContent
            {...queryResult}
            getDataId={getDataId}
            renderData={renderData}
            isFetchingFallback={isFetchingFallback}
            emptyFallback={emptyFallback}
            className={className}
          />
        )}
      </SuspenseInfiniteQuery>
    </Suspense>
  </ErrorBoundary>
);
```

</div>


<!--
그리고 이걸 재사용 가능한 범용 컴포넌트로 만들어서 다양한 목록에서 활용할 수 있게 했습니다.
Suspense와 ErrorBoundary까지 통합해서 정말 견고한 컴포넌트가 되었습니다.
-->

---

# 타입 안전성 확보

## 런타임 검증 + 컴파일 타임 안전성

- **API 응답 검증**: 서버에서 예상과 다른 데이터 전송 시 처리
- **폼 데이터 검증**: 사용자 입력값 런타임 검증
- **타입 추론 강화**: 복잡한 제네릭 타입의 정확한 추론

<!--
마지막으로 타입 안전성 확보입니다.
컴파일 타임의 TypeScript만으로는 부족해서, 런타임에서도 안전한 애플리케이션을 만들기 위해 Zod 스키마를 도입했습니다.
-->

---

# Zod 스키마 기반 폼 검증

<div class="a">

```typescript
// 그룹 생성 폼 스키마
const groupCreateSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').max(50),
  description: z.string().min(1, '설명을 입력해주세요').max(500),
  participantLimit: z.number().min(2).max(30),
  ageRange: z.object({
    min: z.number().min(10).max(100),
    max: z.number().min(10).max(100),
  }).refine(data => data.min <= data.max, {
    message: '최소 연령이 최대 연령보다 클 수 없습니다',
    path: ['min'],
  }),
  genderRestriction: z.enum(['MALE', 'FEMALE', 'ALL']),
  tags: z.array(z.string()).max(5),
});

type GroupCreateForm = z.infer<typeof groupCreateSchema>;
```

</div>


<!--
Zod를 활용해서 복잡한 폼 검증 로직을 정말 선언적이고 읽기 쉽게 표현했습니다.
단순한 데이터 타입뿐만 아니라 복잡한 비즈니스 룰까지 스키마에 포함시켜서 완벽한 안전성을 확보했습니다.
-->

---

# 폼 컴포넌트 구현

<div class="b">

```typescript
// 폼 컴포넌트에서 사용
const GroupCreateForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<GroupCreateForm>({
    resolver: zodResolver(groupCreateSchema), // Zod 검증 연동
  });

  const createGroupMutation = useMutation({
    mutationFn: (data: GroupCreateForm) => 
      groupsServiceApi.createGroup(data), // 타입 안전한 API 호출
  });

  return (
    <form onSubmit={handleSubmit(createGroupMutation.mutate)}>
      <input {...register('title')} />
      {errors.title && <span>{errors.title.message}</span>}
      {/* 에러 메시지 표시 */}
    </form>
  );
};
```

</div>


<!--
React Hook Form과 Zod를 완벽하게 연동해서, 컴파일 타임과 런타임 모두에서 안전한 폼을 만들어냈습니다.
이제 이런 노력들의 결과인 프로젝트 성과를 보겠습니다.
-->

---

# 프로젝트 성과

<div class="center">

## **프로젝트 완성도**

### 정량적 성과 + 정성적 성취
### 실제 서비스 수준의 완성도

</div>

<!--
한 달 동안의 개발 결과로, 정말 실제 서비스 수준의 완성도를 달성할 수 있었습니다.
구체적인 수치와 함께 성과를 보여드리겠습니다.
-->

---

# 개발 성과 지표

## 체계적인 개발 프로세스

- **총 500+ 커밋**
  - 체계적인 형상 관리와 지속적 개발
- **80+ 재사용 컴포넌트**
  - 확장 가능한 UI 라이브러리 구축
- **40+ 커스텀 훅**
  - 비즈니스 로직 모듈화 달성

<!--
정량적으로 보면 총 500개 이상의 커밋, 80개 이상의 재사용 컴포넌트, 40개 이상의 커스텀 훅으로
정말 체계적이고 확장 가능한 코드베이스를 구축할 수 있었습니다.
-->

---

# 기능 구현 성과

##  완전한 서비스 구현

- **15개 주요 페이지**
  - 완전한 사용자 플로우 제공
- **실시간 채팅 시스템**
  - WebSocket 기반 즉시 소통 지원
- **신뢰도 기반 매칭**
  - 리뷰 시스템으로 안전한 동행 보장

<!--
기능적으로는 15개의 주요 페이지로 완전한 사용자 경험을 제공하고,
실시간 채팅부터 신뢰도 기반 매칭까지 복잡한 기능들을 모두 안정적으로 구현했습니다.
-->

---

# 품질 지표

##  안정성과 신뢰성

- **테스트 커버리지 70%+**
  - 핵심 로직 안정성 보장
- **성능 최적화 달성**
  - Core Web Vitals 기준 충족

<!--
품질 측면에서도 70% 이상의 테스트 커버리지와 Core Web Vitals 기준을 모두 충족해서,
안정성과 성능을 동시에 확보할 수 있었습니다.
-->

---

# 시연


### 주요 사용자 플로우
- **회원가입/로그인** - 카카오 소셜 로그인
- **공연 검색** - 필터링 및 정렬 기능
- **그룹 생성/참여** - 매칭 시스템
- **실시간 채팅** - 그룹 내 소통
- **리뷰 작성** - 신뢰도 평가 시스템

<!--
이론적인 설명보다는 직접 보시는 게 좋을 것 같습니다.
지금부터 실제 개발한 서비스를 주요 사용자 플로우에 따라 시연해보겠습니다.
-->

---


# 🙋‍♂️ Q & A

<div class="center">

## 질문과 답변

### 궁금한 점이 있으시면 언제든 질문해주세요!

</div>

<!--
이상으로 Festi Friends 프로젝트 발표를 마치겠습니다.
한 달간 정말 많은 것을 배우고 성장할 수 있었던 값진 경험이었습니다. 감사합니다.
-->

