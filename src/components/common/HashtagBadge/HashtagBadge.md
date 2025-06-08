# 🏷️ HashtagBadge 컴포넌트

공통적으로 사용 가능한 **해시태그 배지 UI 컴포넌트**입니다.  
모임, 유저, 카드 등 다양한 맥락에서 스타일별로 구분된 태그를 보여줄 수 있으며, 클릭 이벤트도 지원합니다.

---

## 📦 사용법

```tsx
import HashtagBadge from '@/components/HashtagBadge';

<HashtagBadge
  isClickable={true}
  onClick={(tag) => {
    console.log(`${tag} 배지를 클릭했어요`);
  }}
  text='모임카드'
  className='bg-blue-100 text-blue-600'
/>;
```

## ✨ Props

| 이름          | 타입                     | 기본값       | 설명                                                             |
| ------------- | ------------------------ | ------------ | ---------------------------------------------------------------- |
| `text`        | `string`                 | (필수)       | 배지 내부에 표시될 텍스트 (`#` 포함 여부는 호출부에서 조정)      |
| `isClickable` | `boolean`                | `false`      | 클릭 가능한 배지인지 여부                                        |
| `onClick`     | `(text: string) => void` | `undefined`  | 클릭 시 호출되는 함수 (`isClickable`가 `true`일 때만 실행됨)     |
| `className`   | `string`                 | `'bg-white'` | 사용자 정의 Tailwind 클래스 (기본 스타일 확장 또는 오버라이드용) |

## 🎨 스타일 가이드 (Tailwind CSS 기준)

- 기본 클래스:
  rounded-full px-2.5 py-2 text-12_M text-gray-700

- 사용자 정의 클래스는 className을 통해 추가적으로 적용 가능
  예: bg-blue-100, font-bold, text-purple-600 등

## ✅ 테스트 정보

> 테스트 도구: jest, @testing-library/react

| 테스트 항목                | 설명                                                                 |
| -------------------------- | -------------------------------------------------------------------- |
| 렌더링 테스트              | `text`가 화면에 정상적으로 표시되는지 확인                           |
| 스타일 클래스 적용 테스트  | `className`으로 전달한 클래스가 제대로 적용되는지 확인               |
| onClick 호출 테스트        | `isClickable=true` 상태에서 클릭 시 `text`가 인자로 전달되는지 확인  |
| 클릭 무효화 테스트         | `isClickable=false`일 경우 클릭해도 `onClick`이 실행되지 않는지 확인 |
| 핸들러 미전달 시 정상 동작 | `onClick`이 없어도 에러 없이 정상 동작하는지 확인                    |

## 🧠 Todo

- 디자인 확정 후 Tailwind 클래스 리팩토링 예정

## 📁 파일 구조

```
/components/HashtagBadge
  ├── HashtagBadge.md
  ├── HashtagBadge.tsx
  └── HashtagBadge.test.tsx
```
