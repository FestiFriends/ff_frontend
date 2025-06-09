# 🏷️ HashtagBadgeGroup 컴포넌트

여러 개의 해시태그를 한 줄에 알맞게 렌더링하는 해시태그 그룹 UI 컴포넌트입니다.
줄 넘김 없이 표시하며, 넘치는 해시태그는 +N개로 축약해서 보여줍니다.
해시태그 클릭 가능 여부도 설정할 수 있습니다.

---

## 📦 사용법

```tsx
import HashtagBadgeGroup from '@/components/HashtagBadgeGroup/HashtagBadgeGroup';

<HashtagBadgeGroup
  hashtags={['클래식', '락', '뮤지컬', '재즈', '발레']}
  isClickable
  onClick={(tag, e) => {
    e?.stopPropagation();
    console.log(`${tag} 해시태그 클릭됨`);
  }}
/>;
```

## ✨ Props

| 이름          | 타입                                                             | 필수 여부 | 기본값  | 설명                                                         |
| ------------- | ---------------------------------------------------------------- | --------- | ------- | ------------------------------------------------------------ |
| `hashtags`    | `string[]`                                                       | ✅        | -       | 표시할 해시태그 문자열 배열                                  |
| `isClickable` | `boolean`                                                        | ❌        | `false` | 해시태그를 버튼으로 만들고 클릭 이벤트를 허용할지 여부       |
| `onClick`     | `(tag: string, e?: React.MouseEvent<HTMLButtonElement>) => void` | ❌        | -       | 클릭 가능한 상태일 때 클릭 시 실행되는 콜백 함수             |
| `className`   | `string`                                                         | ❌        | -       | 각 배지(`HashtagBadge`)에 전달될 Tailwind 사용자 정의 클래스 |

## 🧩 주요 기능

- 한 줄 이상 넘어가는 해시태그는 자동 계산하여 숨기고 `+N개` 형태로 요약 표시
- 마운트 후 `offsetTop` 기반으로 자동 줄 수 계산
- 실제 렌더링 시 `visibleCount`만큼만 표시
- `isClickable`이 true일 경우 HashtagBadge를 <button>으로 렌더링하며 클릭 이벤트 처리

## ✅ 테스트 정보

> 테스트 도구: jest, @testing-library/react

| 테스트 항목                    | 설명                                                                |
| ------------------------------ | ------------------------------------------------------------------- |
| 해시태그 정상 렌더링 테스트    | 기본적인 `hashtags`가 정상적으로 화면에 표시되는지 확인             |
| `+N개` 축약 렌더링 테스트      | 한 줄 초과 시 숨겨진 태그 수가 `+N개`로 출력되는지 확인             |
| 클릭 핸들러 호출 테스트        | `isClickable=true`일 때 클릭 시 `onClick(tag, e)`가 호출되는지 확인 |
| 클릭 비활성화 테스트           | `isClickable=false`일 때 클릭해도 아무 반응 없는지 확인             |
| `onClick` 미전달 안정성 테스트 | `onClick`이 없어도 오류 없이 클릭 가능 UI가 정상 동작하는지 확인    |

## 🧠 Todo

- 더 정교한 반응형 대응 (줄 제한이 아닌 너비 기반 측정 등)

- +N개 클릭 시 전체 해시태그 보기 등의 확장 기능 고려

## 📁 파일 구조

```
/components/common/HashtagBadgeGroup
  ├── HashtagBadgeGroup.md
  ├── HashtagBadgeGroup.test.tsx
  └── HashtagBadgeGroup.tsx
```
