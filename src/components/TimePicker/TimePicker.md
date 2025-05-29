# TimePicker 컴포넌트

## 특징

- 🕐 12시간 형식 (AM/PM)
- ⚙️ 시간/분 간격 설정 가능
- 📱 반응형 디자인 (모바일/데스크톱)
- 🎨 다양한 크기 및 상태 스타일
- ♿ 접근성 지원

## 사용법

### 기본 사용

```tsx
import TimePicker from './components/TimePicker';

function App() {
  const handleTimeChange = (date: Date) => {
    console.log('선택된 시간:', date);
  };

  return <TimePicker onChange={handleTimeChange} />;
}
```

### 고급 설정

```tsx
<TimePicker
  onChange={handleTimeChange}
  size='lg'
  hourStep={2} // 2시간 간격
  minuteStep={15} // 15분 간격
  status='error' // 에러 상태
  disabled={false}
/>
```

## Props

| 속성         | 타입                   | 기본값  | 설명                |
| ------------ | ---------------------- | ------- | ------------------- |
| `onChange`   | `(date: Date) => void` | -       | 시간 변경 콜백 함수 |
| `size`       | `'sm' \| 'md' \| 'lg'` | `'md'`  | 컴포넌트 크기       |
| `disabled`   | `boolean`              | `false` | 비활성화 여부       |
| `hourStep`   | `number`               | `1`     | 시간 선택 간격      |
| `minuteStep` | `number`               | `1`     | 분 선택 간격        |
| `status`     | `'error' \| 'warn'`    | -       | 상태 스타일         |

## 의존성

- date-fns
- shadcn/ui
  - Button
  - PopOver
  - ScrollArea

## 라이선스

MIT
