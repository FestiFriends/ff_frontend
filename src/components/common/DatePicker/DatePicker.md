# 📅 DatePicker 컴포넌트

`DatePicker`는 사용자로부터 날짜 범위를 선택받을 수 있는 UI 컴포넌트입니다.  
Popover와 Calendar를 활용하여 UX를 높였고, 외부 상태와 연동도 쉽게 할 수 있도록 설계되었습니다.

---

## ✅ 기본 사용법

```tsx
import DatePicker from '@/components/DatePicker';

<DatePicker
  startDate={startDate}
  endDate={endDate}
  onChange={({ startDate, endDate }) => {
    // 선택된 날짜 범위 처리
  }}
/>;
```

---

## ✨ 주요 기능

- 날짜 범위 선택 (시작일 - 종료일)
- 현재 달 기준으로 캘린더 렌더링
- 이전 / 다음 달 이동 가능
- 선택된 날짜 표시
- Popover를 이용한 드롭다운 형태 UI

---

## ⚙️ Props

| Prop        | Type                         | Description                     |
| ----------- | ---------------------------- | ------------------------------- |
| `startDate` | `Date \| null`               | 선택된 시작 날짜                |
| `endDate`   | `Date \| null`               | 선택된 종료 날짜                |
| `onChange`  | `(range: DateRange) => void` | 날짜 선택 시 호출되는 콜백 함수 |

`DateRange` 타입은 다음과 같습니다:

```ts
type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};
```

---

## 🧪 테스트 포인트

- "날짜를 선택하세요" 문구가 조건에 맞게 나타나는가?
- startDate, endDate가 있으면 날짜가 제대로 표시되는가?
- Popover를 열면 현재 달이 나타나는가?
- 날짜를 두 번 클릭하면 올바른 range가 `onChange`로 전달되는가?
- 이전/다음 버튼으로 달 변경이 가능한가?

---

## 📁 구성 요소

- `Popover`: 외부 클릭 시 닫히는 드롭다운 레이어
- `Calendar`: 날짜 클릭 및 렌더링 UI
- `CalendarIcon`, `ChevronLeft`, `ChevronRight`: 아이콘 구성 요소

---

## 📌 주의사항

- 날짜를 두 번 선택해야 범위가 설정되며, 첫 번째 클릭 시 이전 값을 초기화합니다.
- 선택된 날짜가 바깥쪽에서 변경되더라도 내부 상태에 반영되도록 처리되어야 한다면 props에 의존하는 로직을 수정해야 할 수 있습니다.

---

## 🧼 예외 처리

- 시작일만 선택된 경우: 다시 클릭 시 종료일로 간주
- 시작일보다 빠른 날짜 클릭 시 자동으로 정렬 (start < end)

---

## 🖼️ 예시

선택 전:

> 📅 날짜를 선택하세요

선택 후:

> 📅 2025년 6월 1일 - 2025년 6월 10일

---

## 📂 관련 컴포넌트

- [`Calendar`](./Calendar.tsx)
- [`Popover`](../Popover)

---

## 📌 TODO

- 디자인 확정 시 스타일 적용
