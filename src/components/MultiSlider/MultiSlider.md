# 🎚️ MultiSlider 컴포넌트

두 개의 thumb으로 범위 값을 선택할 수 있는 **범위 선택 슬라이더 컴포넌트**입니다.  
React와 TailwindCSS 기반이며, 컴포넌트 내부/외부 제어 모두 지원합니다.

---

## 📦 사용법

```tsx
import MultiSlider from '@/components/MultiSlider';
import { useState } from 'react';

export default function Example() {
  const [value, setValue] = useState<[number, number]>([20, 80]);

  return (
    <MultiSlider
      min={0}
      max={100}
      step={1}
      value={value}
      onChange={setValue}
      valuePosition='top'
      marks={{ 0: '0%', 50: '중간', 100: '100%' }}
    />
  );
}
```

---

## ✨ Props

| 이름            | 타입                                | 기본값       | 필수 | 설명                                |
| --------------- | ----------------------------------- | ------------ | ---- | ----------------------------------- |
| `min`           | `number`                            | `0`          | ❌   | 슬라이더 최소값                     |
| `max`           | `number`                            | `100`        | ❌   | 슬라이더 최대값                     |
| `step`          | `number`                            | -            | ❌   | 슬라이더 이동 단위                  |
| `disabled`      | `boolean`                           | `false`      | ❌   | 슬라이더 비활성화                   |
| `defaultValue`  | `[number, number]`                  | `[min, max]` | ❌   | 초기값 (uncontrolled 모드에서 사용) |
| `value`         | `[number, number]`                  | -            | ❌   | 현재값 (controlled 모드에서 사용)   |
| `onChange`      | `(value: [number, number]) => void` | -            | ❌   | 값 변경 시 호출되는 콜백            |
| `valuePosition` | `'top'` \| `'bottom'` \| `'none'`   | `'top'`      | ❌   | thumb 위/아래에 값 표시 위치        |
| `marks`         | `Record<number, string>`            | -            | ❌   | 슬라이더 아래 마크 및 라벨          |

---

## 🎨 스타일 가이드 (기본 Tailwind 기반)

- 슬라이더 track과 thumb 기본 스타일 적용 (추후 디자인 시안에 따라 조정 가능)
- disabled 시 회색으로 스타일 변경
- thumb 값 위치는 `valuePosition` prop으로 조절 가능 (`top`, `bottom`, `none`)

---

## ✅ 테스트 정보

> 테스트 도구: `jest`, `@testing-library/react`

| 테스트 항목                         | 설명                                    |
| ----------------------------------- | --------------------------------------- |
| 값 자동 정렬 기능 검증              | 입력값이 [큰값, 작은값]이어도 정렬 확인 |
| 컴포넌트 내부/외부 제어 동작 테스트 | 내부 상태 관리 및 prop 동기화 확인      |
| disabled 상태 렌더링 테스트         | disabled 적용 시 스타일과 동작 검증     |
| 마크 표시 기능 테스트               | marks prop에 따른 라벨 렌더링 확인      |

---

## 🧠 Todo

- 디자인 시안 도출 후 스타일 세부 조정
- 접근성(ARIA) 강화 및 키보드 조작 지원 강화

---

## 📁 파일 구조

```
/components/MultiSlider
├── MultiSlider.md
├── MultiSlider.tsx
├── MultiSlider.test.tsx

/lib
└── utils.ts (sortRangeValues 등 유틸 함수)
```
