# SlideCard 컴포넌트

공연 또는 모집 그룹의 정보를 카드 형태로 보여주며,  
'더보기' 버튼 클릭 시 상세 콘텐츠를 확장/축소하는 UI를 제공합니다.

---

## Props

| 이름           | 타입                                                                  | 설명                                     |
| -------------- | --------------------------------------------------------------------- | ---------------------------------------- |
| `type`         | `'review'` \| `'application'`                                         | 카드 종류를 구분합니다.                  |
| `groupInfo`    | `ReviewGroupInfo & { memberCount: number }` \| `ApplicationGroupInfo` | 그룹에 대한 상세 정보 (리뷰 또는 모집용) |
| `reviewsCount` | `number` (옵션, `type`이 `'review'`일 때 필수)                        | 리뷰 개수                                |
| `content`      | `ReactNode` (선택)                                                    | '더보기' 클릭 시 표시되는 확장 콘텐츠    |

---

## 주요 기능 및 동작

- **이미지 출력**: 그룹의 공연 포스터를 표시합니다.
- **카테고리 아이콘 및 라벨**: 그룹 카테고리별 아이콘과 텍스트를 보여줍니다.
- **기간 표시**: 그룹 활동 기간을 `yy.MM.dd` 형식으로 표시합니다.
- **그룹 제목 및 공연 제목**: 텍스트가 너무 길면 말줄임 처리(`truncate`) 됩니다.
- **인원 현황**: 멤버 수 또는 모집 인원과 현재 상태를 보여줍니다.
- **진행률 표시**: `ProgressBar` 컴포넌트를 통해 진행률을 시각화합니다.
- **'더보기' 버튼**: 클릭 시 `content` 영역의 최대 높이를 변경하여 확장/축소합니다.
  - 열림 상태일 때는 `max-h-dvh` 클래스가 적용되어 내용이 보임
  - 닫힘 상태일 때는 `max-h-0`으로 숨김 처리

---

## 예시 코드

```tsx
<SlideCard
  type='review'
  groupInfo={mockReviewGroupInfo}
  reviewsCount={5}
  content={<div>추가 상세 내용</div>}
/>
```
