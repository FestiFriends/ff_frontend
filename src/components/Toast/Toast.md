# 🏷️ Toast 컴포넌트

사용자에게 간단한 피드백 메시지를 일시적으로 보여주는 공용 UI 컴포넌트입니다.
자동으로 사라지며, 타입별로 시각적으로 구분되는 스타일을 제공합니다.

## 📦 사용법

```tsx
import { useState } from 'react';
import Toast from '@/components/Toast/Toast';

const [showToast, setShowToast] = useState(false);

{
  showToast && (
    <Toast
      message='저장되었습니다!'
      type='success'
      onClose={() => setShowToast(false)}
      className='right-10 top-10'
    />
  );
}
```

## ✨ Props

| 이름        | 타입                                                       | 필수 | 설명                                                             |
| ----------- | ---------------------------------------------------------- | ---- | ---------------------------------------------------------------- |
| `message`   | `string`                                                   | ✅   | 표시할 메시지 텍스트                                             |
| `type`      | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | ❌   | 메시지 타입. 기본값 `'default'`                                  |
| `onClose`   | `() => void`                                               | ✅   | Toast가 닫힐 때 실행되는 콜백 함수 (보통 상태 업데이트용)        |
| `className` | `string`                                                   | ❌   | Toast의 위치 또는 커스텀 스타일을 지정하기 위한 추가 클래스 이름 |

## 🎨 스타일 가이드 (Tailwind CSS 기준)

- 타입별 배경 색상 적용:

  default: bg-gray-800

  success: bg-green-500

  warning: bg-yellow-400 text-black

  error: bg-red-500

  info: bg-blue-500

- className props 미할당 시 위치 기본값: top-4 left-1/2 -translate-x-1/2

- transition-all duration-500 ease-in-out 애니메이션

- 등장 시 translate-y-0 opacity-100, 사라질 때 -translate-y-4 opacity-0

## ✅ 테스트 정보

> 테스트 도구: jest, @testing-library/react

| 테스트 항목                           | 설명                                                                   |
| ------------------------------------- | ---------------------------------------------------------------------- |
| 메시지 렌더링 테스트                  | `message`로 전달된 문자열이 화면에 렌더링되는지 확인                   |
| type 미지정 시 기본 스타일 테스트     | `type` props가 없을 때 `bg-gray-800` 클래스가 적용되는지 확인          |
| 타입별 스타일 적용 테스트             | `type="error"` 등 지정 시 해당 타입의 배경 색 클래스가 적용되는지 확인 |
| 초기 상태 애니메이션 클래스 테스트    | 렌더링 직후 `opacity-100`, `translate-y-0` 클래스가 포함되는지 확인    |
| onClose 콜백 호출 테스트 (3초 후)     | 3초가 지난 후 `onClose`가 정확히 1회 호출되는지 확인                   |
| onClose 콜백 미호출 테스트 (3초 이전) | 3초가 되기 전까지는 `onClose`가 호출되지 않는지 확인                   |
| 애니메이션 종료 상태 클래스 테스트    | 2.5초 후 `opacity-0`, `-translate-y-4` 클래스가 포함되는지 확인        |
| 접근성 role 테스트 (`role="alert"`)   | 컴포넌트에 `role="alert"` 속성이 적용되어 있는지 확인                  |
| className props 테스트                | 전달된 `className`이 실제 DOM 클래스에 포함되는지 확인                 |

## 🧠 Todo

- 디자인 확정 후 Tailwind 클래스 리팩토링 예정

## 📁 파일 구조

```
/components/Toast/
  ├── Toast.tsx
  ├── Toast.test.tsx
  └── Toast.md
```
