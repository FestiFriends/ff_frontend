## 📝 GroupCard 컴포넌트

공연 및 모임 정보를 카드 형태로 보여주는 공통 UI 컴포넌트입니다.
모임 카테고리, 포스터, 소개글, 인원 수, 해시태그 및 버튼 등의 정보를 시각적으로 전달합니다.

---

## 📦 사용법

```tsx
import GroupCard from '@/components/GroupCard/GroupCard';

<GroupCard
  groupData={group}
  buttonText='신청 취소'
  onButtonClick={handleClick}
  isHashtagClickable
  onHashtagClick={(tag) => console.log(tag)}
/>;
```

## ✨ Props

| 이름                 | 타입                            | 필수 여부 | 기본값  | 설명                                                              |
| -------------------- | ------------------------------- | --------- | ------- | ----------------------------------------------------------------- |
| `groupData`          | `Group`                         | ✅        | -       | 모임 정보 객체                                                    |
| `className`          | `string`                        | ❌        | -       | Tailwind 클래스를 덮어쓰거나 확장할 때 사용                       |
| `buttonText`         | `string`                        | ✅        | -       | 버튼에 표시될 텍스트                                              |
| `onButtonClick`      | `() => void`                    | ✅        | -       | 버튼 클릭 시 실행될 핸들러                                        |
| `isHashtagClickable` | `boolean`                       | ❌        | `false` | 해시태그 클릭 가능 여부                                           |
| `onHashtagClick`     | `(hashtagText: string) => void` | ❌        | -       | 해시태그 클릭 시 실행되는 핸들러 (`isHashtagClickable=true` 필요) |

## 🧩 주요 렌더링 정보

- 포스터 이미지: groupData.performance.poster

- 카테고리 뱃지: groupData.category (스타일은 타입별 Tailwind로 분기)

- 기간: groupData.startDate ~ groupData.endDate

- 모임명/위치/연령대/성별

- 소개글: groupData.description

- 인원 수: 모집 인원 상태 프로그레스 바

- 해시태그: groupData.hashtag를 통해 렌더링

## 🎨 스타일 가이드 (Tailwind CSS 기준)

- 디자인 확정 시 수정 필요

## ✅ 테스트 정보

테스트 도구: jest, @testing-library/react

| 테스트 항목                   | 설명                                                                                                                  |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 주요 정보 렌더링 테스트       | 모임 카테고리, 제목, 위치/성별/연령, 날짜, 설명, 모집 인원, 해시태그, 포스터 이미지 등이 정상적으로 렌더링되는지 확인 |
| 버튼 클릭 이벤트 테스트       | 버튼 텍스트가 정상적으로 출력되고, 클릭 시 전달된 `onButtonClick` 함수가 호출되는지 확인                              |
| 해시태그 클릭 비활성화 테스트 | `isHashtagClickable = false`일 때, 해시태그 클릭 시 `onHashtagClick`이 호출되지 않는지 확인                           |
| 해시태그 클릭 활성화 테스트   | `isHashtagClickable = true`일 때, 해시태그 클릭 시 `onHashtagClick`이 올바른 인자로 호출되는지 확인                   |
| 포스터 이미지 테스트          | 이미지 alt 텍스트로 포스터를 확인하고, `src` URL이 기대한 값과 일치하는지 확인 (디코딩 포함)                          |

---

## 📁 파일 구조

```
/components/GroupCard
├── GroupCard.tsx
└── GroupCard.test.tsx
```
