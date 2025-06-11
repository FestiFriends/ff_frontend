## 📝 GroupCard 컴포넌트

공연 및 모임 정보를 카드 형태로 보여주는 공통 UI 컴포넌트입니다.
모임 카테고리, 포스터, 소개글, 인원 수, 해시태그 및 버튼 등의 정보를 시각적으로 전달합니다.

- 공연 목록에서 사용할 때는 '참가 신청' 버튼을 입력해 주세요.

- 참가중인 모임 목록에서 사용할 때는 '모임 탈퇴' 버튼을 입력해 주세요.

---

## 📦 사용법

```tsx
// 공연에서의 모임 목록 조회에서 사용할 때 : formatperformanceGroups 사용해서 데이터 타입 변환 필수
import GroupCard from '@/components/GroupCard/GroupCard';
import { formatPerformanceGroups } from '@/utils/formatGroupCardData';

formatPerformanceGroups(data).map((group) => (
  <GroupCard
    key={group.id}
    groupData={group}
    buttonText='참가 신청'
    onCardClick={() => alert('카드 클릭')}
    onButtonClick={() => alert('모임 관리 클릭')}
    isHashtagClickable={true}
    onHashtagClick={(tag) => alert(`해시태그 ${tag} 클릭`)}
  />
));

// 참가중인 모임 목록에서 사용할 때 : formatJoinedGroups 사용해서 데이터 타입 변환 필수
import GroupCard from '@/components/GroupCard/GroupCard';
import { formatJoinedGroups } from '@/utils/formatGroupCardData';

formatJoinedGroups(data).map((group) => (
  <GroupCard
    key={group.id}
    groupData={group}
    buttonText='모임 탈퇴'
    onCardClick={() => alert('카드 클릭')}
    onButtonClick={() => alert('모임 탈퇴 버튼 클릭')}
  />
));
```

## ✨ Props

| 이름                 | 타입                            | 필수 여부 | 기본값  | 설명                                                              |
| -------------------- | ------------------------------- | --------- | ------- | ----------------------------------------------------------------- |
| `groupData`          | `Group`                         | ✅        | -       | 모임 정보 객체                                                    |
| `className`          | `string`                        | ❌        | -       | Tailwind 클래스를 덮어쓰거나 확장할 때 사용                       |
| `buttonText`         | `string`                        | ✅        | -       | 버튼에 표시될 텍스트 (`참가 신청`, `모임 탈퇴` 등)                |
| `onCardClick`        | `() => void`                    | ✅        | -       | 카드 전체 영역 클릭 시 실행되는 핸들러                            |
| `onButtonClick`      | `() => void`                    | ✅        | -       | 버튼 클릭 시 실행되는 핸들러                                      |
| `isHashtagClickable` | `boolean`                       | ❌        | `false` | 해시태그 클릭 가능 여부                                           |
| `onHashtagClick`     | `(hashtagText: string) => void` | ❌        | -       | 해시태그 클릭 시 실행되는 핸들러 (`isHashtagClickable=true` 필요) |

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

| 테스트 항목                   | 설명                                                                                      |
| ----------------------------- | ----------------------------------------------------------------------------------------- |
| 주요 정보 렌더링 테스트       | 제목, 위치, 성별, 연령대, 날짜, 설명, 해시태그, 포스터 이미지 등이 정상 렌더링되는지 확인 |
| 버튼 클릭 이벤트 테스트       | 버튼 클릭 시 `onButtonClick`이 정상 호출되는지 확인                                       |
| 카드 전체 클릭 이벤트 테스트  | 카드 클릭 시 `onCardClick`만 호출되고 `onButtonClick`은 호출되지 않는지 확인              |
| 해시태그 클릭 비활성화 테스트 | `isHashtagClickable = false`일 때 `onHashtagClick`이 호출되지 않는지 확인                 |
| 해시태그 클릭 활성화 테스트   | `isHashtagClickable = true`일 때 `onHashtagClick`이 올바른 인자로 호출되는지 확인         |
| 포스터 이미지 테스트          | alt 텍스트와 `src` URL이 기대한 값과 일치하는지 확인                                      |
| 키보드 접근성 테스트          | `Enter`, `Space` 키를 눌러 카드가 클릭되는지 확인                                         |

## 📁 파일 구조

```
/components/GroupCard
├── GroupCard.md
├── GroupCard.tsx
└── GroupCard.test.tsx
```
