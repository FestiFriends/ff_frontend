## 📝 GroupCard 컴포넌트

공연 및 모임 정보를 카드 형태로 보여주는 공통 UI 컴포넌트입니다.
모임 카테고리, 포스터, 소개글, 인원 수, 해시태그 및 버튼 등의 정보를 시각적으로 전달합니다.

- 공연 목록에서는 참가 신청 버튼이 표시됩니다.

- 참가중인 모임 목록에서는 모임 탈퇴 버튼이 표시됩니다.

---

## 📦 사용법

```tsx
import GroupCard from '@/components/GroupCard/GroupCard';

<GroupCard
  groupData={group}
  buttonText='참가 신청' // 또는 '모임 탈퇴'
  onButtonClick={handleClick}
  isHashtagClickable
  onHashtagClick={(tag) => console.log(tag)}
/>;
```

## ✨ Props

| 이름                 | 타입                            | 필수 여부 | 기본값  | 설명                                                                    |
| -------------------- | ------------------------------- | --------- | ------- | ----------------------------------------------------------------------- |
| `groupData`          | `Group`                         | ✅        | -       | 모임 정보 객체                                                          |
| `className`          | `string`                        | ❌        | -       | Tailwind 클래스를 덮어쓰거나 확장할 때 사용                             |
| `buttonText`         | `string`                        | ✅        | -       | 버튼에 표시될 텍스트 (`참가 신청` 또는 `모임 탈퇴` 등 상황에 맞게 설정) |
| `onButtonClick`      | `() => void`                    | ✅        | -       | 버튼 클릭 시 실행될 핸들러                                              |
| `isHashtagClickable` | `boolean`                       | ❌        | `false` | 해시태그 클릭 가능 여부                                                 |
| `onHashtagClick`     | `(hashtagText: string) => void` | ❌        | -       | 해시태그 클릭 시 실행되는 핸들러 (`isHashtagClickable=true` 필요)       |

## 🧩 주요 렌더링 정보

- 포스터 이미지: groupData.performance.poster

- 카테고리 배지: groupData.category (badgeStyles를 통해 스타일 분기)

- 기간: groupData.startDate ~ groupData.endDate (yy.MM.dd 형식)

- 모임명 / 공연명 / 지역 / 성별 / 연령대

- 방장 정보: groupData.host.name, groupData.host.rating

- 소개글: groupData.description (2줄 말줄임)

- 인원 수 프로그레스 바: memberCount / maxMembers

- 해시태그: groupData.hashtag 배열을 map하여 렌더링

## 🎨 스타일 가이드 (Tailwind CSS 기준)

- 반응형 디자인은 디자인 가이드에 따라 수정 예정

## ✅ 테스트 정보

테스트 도구: jest, @testing-library/react

| 테스트 항목                   | 설명                                                                                                       |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 주요 정보 렌더링 테스트       | 제목, 위치, 성별, 연령대, 날짜, 설명, 모집 인원, 해시태그, 포스터 이미지 등이 정상적으로 렌더링되는지 확인 |
| 버튼 클릭 이벤트 테스트       | 버튼 텍스트가 정상 출력되고, 클릭 시 전달된 `onButtonClick` 함수가 호출되는지 확인                         |
| 버튼 텍스트 역할 분기 테스트  | `buttonText='참가 신청'` 또는 `'모임 탈퇴'`처럼 용도에 따라 다른 텍스트가 제대로 보이는지 확인             |
| 해시태그 클릭 비활성화 테스트 | `isHashtagClickable = false`일 때, 해시태그 클릭 시 `onHashtagClick`이 호출되지 않는지 확인                |
| 해시태그 클릭 활성화 테스트   | `isHashtagClickable = true`일 때, 해시태그 클릭 시 `onHashtagClick`이 올바른 인자로 호출되는지 확인        |
| 포스터 이미지 테스트          | alt 텍스트와 `src` URL이 기대한 값과 일치하는지 확인 (디코딩 포함)                                         |

---

## 📁 파일 구조

```
/components/GroupCard
├── GroupCard.md
├── GroupCard.tsx
└── GroupCard.test.tsx
```
