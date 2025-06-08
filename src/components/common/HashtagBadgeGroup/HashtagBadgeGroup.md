# 🏷️ HashtagBadgeGroup 컴포넌트

다수의 해시태그 배지를 한 줄에 적절히 표시하는 **해시태그 그룹 UI 컴포넌트**입니다.
해시태그가 너무 많을 경우 줄 넘김 없이 첫 줄만 표시하고, 나머지 수량은 `+N개`로 표시합니다.

---

## 📦 사용법

```tsx
import HashtagBadgeGroup from '@/components/HashtagBadgeGroup/HashtagBadgeGroup';

<HashtagBadgeGroup
  hashtags={['클래식', '락', '뮤지컬', '재즈', '발레']}
  isClickable
  onClick={(tag) => console.log(`${tag} 클릭됨`)}
/>;
```

## ✨ Props

| 이름          | 타입                    | 기본값  | 설명                                                          |
| ------------- | ----------------------- | ------- | ------------------------------------------------------------- |
| `hashtags`    | `string[]`              | (필수)  | 해시태그 문자열 리스트                                        |
| `isClickable` | `boolean`               | `false` | 해시태그 클릭 여부 설정                                       |
| `onClick`     | `(tag: string) => void` | -       | `isClickable = true`일 때 해시태그 클릭 시 호출되는 콜백 함수 |
| `className`   | `string`                | -       | Tailwind 사용자 정의 스타일 추가 및 병합용                    |

## 🧩 주요 기능

- 한 줄 이상 넘어가는 해시태그는 자동 계산하여 숨기고 `+N개` 형태로 요약 표시
- 마운트 후 `offsetTop` 기반으로 자동 줄 수 계산
- 실제 렌더링 시 `visibleCount`만큼만 표시
- `isClickable` 조건에 따라 클릭 이벤트 발생 여부 결정

## ✅ 테스트 정보

> 테스트 도구: jest, @testing-library/react

| 테스트 항목                          | 설명                                                               |
| ------------------------------------ | ------------------------------------------------------------------ |
| 해시태그 정상 렌더링 테스트          | 기본적인 `hashtags`가 정상적으로 표시되는지 확인                   |
| 줄 넘김 계산 후 `+N개` 렌더링 테스트 | 한 줄 넘는 경우 `+N개` 형태로 숨겨진 해시태그 수를 표시하는지 확인 |
| 클릭 핸들러 호출 테스트              | `isClickable = true`일 때 클릭 이벤트가 동작하는지 확인            |
| 클릭 무효화 테스트                   | `isClickable = false`일 때 클릭해도 아무 일도 일어나지 않는지 확인 |
| onClick 미전달 안정성 테스트         | `onClick`이 전달되지 않아도 오류 없이 렌더링 되는지 확인           |

## 🧠 Todo

- 더 정교한 반응형 대응 (줄 제한이 아닌 너비 기반 측정 등)

## 📁 파일 구조

```
/components/common/HashtagBadgeGroup
  ├── HashtagBadgeGroup.md
  ├── HashtagBadgeGroup.tsx
  └── HashtagBadgeGroup.test.tsx
```
