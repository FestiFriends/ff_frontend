# 🪄 useClickOutside

React에서 특정 컴포넌트 외부를 클릭/터치했을 때, 또는 `Escape` 키 입력 시 지정한 콜백 함수를 실행하는 커스텀 훅입니다.  
예를 들어, 드롭다운, 모달, 팝오버 등 외부 이벤트로 닫혀야 하는 UI에 유용하게 사용할 수 있습니다.

---

## ✨ 주요 기능

- 요소 외부의 mousedown 또는 touchstart 이벤트 감지
- `Escape` 키 입력 감지
- 이벤트 발생 시 콜백(`onClose`) 실행
- `ref.current`가 없는 경우 안전하게 무시

---

## 🔧 매개변수

```ts
interface UseOutsideClickProps {
  ref: React.RefObject<HTMLElement | null>;
  onClose: () => void;
}
```

| 이름      | 타입                           | 설명                                                        |
| --------- | ------------------------------ | ----------------------------------------------------------- |
| `ref`     | `React.RefObject<HTMLElement>` | 감지 기준이 될 DOM 요소의 ref                               |
| `onClose` | `() => void`                   | 외부 영역 클릭/터치 또는 Escape 키 입력 시 실행할 콜백 함수 |

---

## 💡 사용 예시

```tsx
import React, { useRef, useState } from 'react';
import useClickOutside from './useClickOutside';

const ExampleComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);

  useClickOutside({
    ref,
    onClose: () => {
      setIsOpen(false);
    },
  });

  return (
    <>
      {isOpen && (
        <div
          ref={ref}
          style={{ border: '1px solid black', padding: '1rem' }}
        >
          이 영역 외부를 클릭하거나 Escape 키를 누르면 닫힙니다.
        </div>
      )}
      {!isOpen && <button onClick={() => setIsOpen(true)}>열기</button>}
    </>
  );
};

export default ExampleComponent;
```

---

## 📋 동작 요약

| 조건                          | 콜백 호출 여부 |
| ----------------------------- | -------------- |
| 외부 클릭                     | ✅ 호출됨      |
| 외부 터치                     | ✅ 호출됨      |
| `Escape` 키 입력              | ✅ 호출됨      |
| 내부 클릭                     | ❌ 호출 안 됨  |
| 내부 터치                     | ❌ 호출 안 됨  |
| `ref.current`가 `null`일 경우 | ❌ 호출 안 됨  |

---

## 📎 참고사항

- `ref.current`가 `null`인 경우 클릭/터치를 무시하고 콜백이 호출되지 않습니다.
- `useEffect` 의존성 배열에는 `ref`와 `onClose`를 포함해야 메모리 누수 없이 안전하게 동작합니다.
- SSR에서는 브라우저 환경이 아니므로 이 훅은 실행되지 않아야 합니다. 클라이언트 전용 코드에서만 사용하세요.
- 포커스 관리나 애니메이션 등의 부가 로직이 필요한 경우 별도로 조합하여 사용해야 합니다.
