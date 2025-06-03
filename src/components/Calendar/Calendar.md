# 📅 Calendar 컴포넌트

**날짜 범위 선택(Date Range Selection)** 이나 **단일 날짜 선택(Single Date Selection)** 에 사용할 수 있는 커스텀 캘린더 컴포넌트입니다.

---

## ✅ 기본 사용법

```tsx
import Calendar from '@/components/Calendar';

<Calendar
  month={new Date()}
  startDate={selectedStartDate}
  endDate={selectedEndDate}
  onDateClick={(date) => {
    // 날짜 클릭 시 동작
  }}
/>;
```

---

## 🧩 Props

| 이름             | 타입                   | 설명                                                            |
| ---------------- | ---------------------- | --------------------------------------------------------------- |
| `month`          | `Date`                 | 캘린더에서 표시할 기준 월입니다. 기본값은 `new Date()`입니다.   |
| `startDate`      | `Date \| null`         | 선택된 시작 날짜입니다.                                         |
| `endDate`        | `Date \| null`         | 선택된 종료 날짜입니다.                                         |
| `onDateClick`    | `(date: Date) => void` | 날짜 클릭 시 호출되는 콜백입니다.                               |
| `isControllable` | `boolean`              | 내부 상태로 월을 조작할 수 있는지 여부입니다. 기본값은 `false`. |
| `className`      | `string`               | 컴포넌트에 커스텀 클래스를 추가할 수 있습니다.                  |

---

## 🔄 isControllable 동작 예시

```tsx
<Calendar
  isControllable
  month={new Date('2025-06-01')}
/>
```

- `이전 달`, `다음 달` 버튼이 활성화됩니다.
- 내부 상태로 월이 변경됩니다.

---

## 🎨 날짜 스타일링 기준

- **회색 텍스트**: 이번 달이 아닌 날짜
- **파란 배경, 흰색 텍스트**: `startDate` 또는 `endDate`
- **연한 파란 배경, 파란 텍스트**: `startDate` ~ `endDate` 사이의 날짜

> 디자인 시안이 확정되면 스타일은 향후 업데이트 예정입니다.

---

## 🧪 테스트

`Jest` 및 `@testing-library/react`를 활용해 기본 동작(요일 렌더링, 날짜 클릭, 월 이동 등)을 테스트하고 있습니다.  
테스트 파일: `Calendar.test.tsx`

---

## 📌 TODO

- 디자인 확정 시 스타일 적용
- 오늘 날짜 강조
- 키보드 접근성 향상
- 비활성 날짜(disabledDate) 처리
