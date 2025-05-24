# 🏷️ HashtagBadge 컴포넌트

공통적으로 사용 가능한 **해시태그 배지 UI 컴포넌트**입니다.  
모임, 유저, 카드 등 다양한 맥락에서 스타일별로 구분된 태그를 보여줄 수 있으며, 클릭 이벤트도 지원합니다.

---

## 📦 사용법

```tsx
import HashtagBadge from '@/components/HashtagBadge';

<HashtagBadge
  type='groupCard'
  isClickable={true}
  onClick={() => {
    console.log('모임 카드 클릭');
  }}
  text='#모임카드'
/>;
```

## ✨ Props

| 이름          | 타입                                              | 기본값  | 설명                                                        |
| ------------- | ------------------------------------------------- | ------- | ----------------------------------------------------------- |
| `text`        | `string`                                          | (필수)  | 배지 내부에 표시될 텍스트 (`#` 포함 여부는 호출부에서 조정) |
| `type`        | `'groupInfo'` \| `'groupCard'` \| `'userProfile'` | (필수)  | 배지 스타일 유형                                            |
| `isClickable` | `boolean`                                         | `false` | 클릭 가능한 배지인지 여부                                   |
| `onClick`     | `() => void`                                      | -       | 클릭 가능 시 실행되는 이벤트 핸들러                         |
| `className`   | `string`                                          | -       | 사용자 정의 Tailwind 클래스 (스타일 덮어쓰기 또는 확장용)   |

## 🎨 스타일 가이드 (Tailwind CSS 기준)

- 공통 클래스

  - cursor-pointer, px-4 py-2, select-none

- type별 스타일

  - groupInfo: bg-yellow-200 text-gray-800, rounded-full, font-semibold

  - groupCard: bg-blue-100 text-blue-600, rounded-lg, font-medium

  - userProfile: bg-purple-100 text-purple-600, rounded-lg, font-semibold

- className 병합

  - cn() 유틸을 사용하여 스타일에 병합 적용됨

## ✅ 테스트 정보

> 테스트 도구: jest, @testing-library/react

| 테스트 항목                | 설명                                                       |
| -------------------------- | ---------------------------------------------------------- |
| 렌더링 테스트              | `text`가 화면에 정상적으로 표시되는지 확인                 |
| 스타일 클래스 적용 테스트  | `type` 값에 따라 올바른 클래스가 적용되는지 테스트         |
| className 병합 테스트      | 사용자 정의 클래스가 병합 적용되는지 확인                  |
| onClick 핸들러 호출 테스트 | 클릭 시 핸들러가 호출되는지 (`isClickable`가 true일 때)    |
| 클릭 무효화 테스트         | `isClickable = false`일 때 클릭해도 핸들러가 호출되지 않음 |
| 핸들러 미전달 테스트       | `onClick`이 전달되지 않아도 에러 없이 작동하는지 확인      |

## 🧠 Todo

- 디자인 확정 후 Tailwind 클래스 리팩토링 예정

## 📁 파일 구조

```
/components/HashtagBadge
  ├── HashtagBadge.tsx
  └── HashtagBadge.test.tsx
```
