# NavLink 컴포넌트

Next.js의 `<Link />`를 감싸 확장한 커스텀 네비게이션 링크 컴포넌트입니다. 현재 경로 기반으로 활성 상태를 자동 판별하고, 이를 통해 스타일 및 접근성을 개선합니다.

---

## 주요 기능

- `next/link`를 감싼 커스텀 컴포넌트
- `usePathname()` 기반 경로 판별
- `aria-current="page"`로 접근성 향상
- `isActive` 속성으로 수동 활성화 가능
- `end` 속성으로 정확한 경로 일치 지원
- `activeClassName` 속성으로 활성화 스타일 설정

---

## Props

| 이름 | 타입 | 설명 |
|--------|--------|--------|
| `href` | `string` (필수) | 이동할 경로 |
| `className` | `string` (선택) | 기본 스타일 클래스 |
| `activeClassName` | `string` (선택) | 활성 상태일 때 적용할 클래스 |
| `isActive` | `boolean` (선택) | 활성 상태를 수동으로 지정하고 싶을 때 사용 |
| `end` | `boolean` (선택) | 경로가 정확히 일치할 경우만 활성화(기본값은 해당 경로가 포함되어있을 경우에 활성화) |
| `children` | `React.ReactNode` (필수) | 링크 내부에 표시될 콘텐츠 |
| `...props` | `Link` 컴포넌트의 props | Next.js의 `<Link>` 컴포넌트가 받을 수 있는 모든 속성들을 그대로 사용할 수 있습니다. |

---

## 활성 상태 판별 로직

컴포넌트 내부에서 isActive, end, 현재 경로(usePathname())를 조합해 다음과 같이 활성 여부를 판단합니다:

```tsx
const path = usePathname();

const activePath = typeof isActive === 'boolean'
  ? isActive
  : end
    ? path === href
    : path.startsWith(href);
```

---

## 활성화 예시

| 현재 경로   | href       | end | isActive | 활성화 여부 |
|:----------:|:----------:|:---:|:--------:|:----------:|
| `/about` | `/about` | - | - | ✅ |
| `/about` | `/about` | `true`  | - | ✅ |
| `/about` | `/about` | - | `false` | ❌ |
| `/about` | `/about/team` | - | - | ❌ |
| `/about` | `/about/team` | - | `true` | ✅ |
| `/about/team` | `/about` | - | - | ✅ |
| `/about/team` | `/about` | `true`  | - | ❌ |
| `/about/team` | `/about` | `true`  | `true` | ✅ |

---

## 사용법

```tsx
import NavLink from '@/components/NavLink';

<NavLink
  href="/about"
  className="text-gray-500 hover:text-black"
  activeClassName="text-black font-bold underline"
>
  소개
</NavLink>
```

```tsx
import NavLink from '@/components/NavLink';

<NavLink
  href="/about"
  className="text-gray-500 hover:text-black"
  activeClassName="text-black font-bold underline"
  end
>
  소개
</NavLink>
```

```tsx
import NavLink from '@/components/NavLink';

<NavLink
  href="/about"
  className="text-gray-500 hover:text-black"
  activeClassName="text-black font-bold underline"
  isActive
>
  소개
</NavLink>
```

---

## 접근성

활성 상태일 경우 ```<Link>``` 태그에 다음과 같은 속성이 자동 부여됩니다

```tsx
<Link
  href={href}
  aria-current={activePath ? 'page' : undefined}
>
```
