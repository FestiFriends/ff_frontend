# 📄 ReportItem 컴포넌트

사용자의 신고 내역을 보여주는 UI 컴포넌트입니다.
신고 날짜와 신고 사유를 간결하게 표시합니다.

## 📦 사용법

```tsx
import ReportItem from '@/components/ReportItem/ReportItem';
import { ReportReason } from '@/types/enums';

<ReportItem
  reportedAt='2025-01-09T07:05:00'
  reason={ReportReason.PROFANITY}
  onClick={() => console.log('신고 아이템 클릭됨')}
/>;
```

## ✨ Props

| 이름         | 타입               | 필수 | 설명                                              |
| ------------ | ------------------ | ---- | ------------------------------------------------- |
| `reportedAt` | `string`           | ✅   | ISO 형식 날짜 문자열 (`"2025-01-09T07:05:00"` 등) |
| `reason`     | `ReportReasonType` | ✅   | 신고 사유 enum (`PROFANITY`, `SPAM`, 등)          |
| `onClick`    | `() => void`       | ✅   | 클릭 시 실행될 함수                               |
| `className`  | `string`           | ❌   | 추가 Tailwind CSS 클래스                          |

## 🧩 주요 렌더링 정보

- 날짜를 컴포넌트 내부에서 "YY.MM.DD HH:mm" 포맷으로 변환, 추후 date-fns으로 적용

- ReportReasonLabels 객체를 통해 신고 사유 한글 문자열로 매핑

- div에 role="button" 적용으로 클릭 가능 요소 명시

## 🎨 스타일 가이드 (Tailwind CSS 기준)

- 디자인 확정 시 수정 필요

## ✅ 테스트 정보

테스트 도구: jest, @testing-library/react

## 🧪 테스트 명세

| 테스트 항목             | 설명                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| 날짜 포맷 렌더링 테스트 | `reportedAt` props로 전달된 ISO 문자열이 `"YY.MM.DD HH:mm"` 형식으로 올바르게 표시되는지 확인 |
| 신고 사유 렌더링 테스트 | `reason` props가 한글 레이블로 올바르게 매핑되어 표시되는지 확인                              |
| className 적용 테스트   | 외부에서 전달한 `className`이 컴포넌트 최상위 요소에 정상적으로 적용되는지 확인               |
| 클릭 이벤트 호출 테스트 | 컴포넌트를 클릭했을 때, 전달된 `onClick` 콜백 함수가 정확히 1번 호출되는지 확인               |

---

## 📁 파일 구조

```
/components/ReportItem
├── ReportItem.tsx
└── ReportItem.test.tsx
└── ReportItem.md
```
