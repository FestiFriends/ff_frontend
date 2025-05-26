# useDropdownState 훅

`useDropdownState`는 드롭다운 컴포넌트의 열림/닫힘 상태와 선택된 아이템 상태를 관리하는 커스텀 React 훅입니다.

---

## 주요 기능

- 드롭다운의 열림(`isOpen`) 상태를 관리합니다.
- 선택된 아이템(`selectedItem`)의 값을 관리합니다.
- 드롭다운 상태를 토글하는 함수(`toggleDropdown`)를 제공합니다.
- 드롭다운을 닫는 함수(`closeDropdown`)를 제공합니다.
- 선택된 아이템을 변경하는 함수(`setSelectedItem`)를 제공합니다.

---

## 반환 값

| 이름              | 타입                      | 설명                              |
| ----------------- | ------------------------- | --------------------------------- |
| `isOpen`          | `boolean`                 | 드롭다운이 열려있는지 여부        |
| `toggleDropdown`  | `() => void`              | 드롭다운 열림/닫힘 상태 토글 함수 |
| `closeDropdown`   | `() => void`              | 드롭다운을 닫는 함수              |
| `selectedItem`    | `string`                  | 현재 선택된 아이템 값             |
| `setSelectedItem` | `(value: string) => void` | 선택된 아이템 값을 변경하는 함수  |

---

## 사용 예시

```tsx
import React from 'react';
import useDropdownState from './useDropdownState';

const DropdownExample = () => {
  const {
    isOpen,
    toggleDropdown,
    closeDropdown,
    selectedItem,
    setSelectedItem,
  } = useDropdownState();

  return (
    <div>
      <button onClick={toggleDropdown}>{selectedItem || '선택하세요'}</button>

      {isOpen && (
        <ul>
          <li
            onClick={() => {
              setSelectedItem('option1');
              closeDropdown();
            }}
          >
            옵션 1
          </li>
          <li
            onClick={() => {
              setSelectedItem('option2');
              closeDropdown();
            }}
          >
            옵션 2
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownExample;
```

---

## 설명

- `isOpen` 상태를 통해 드롭다운이 열려있는지 여부를 알 수 있습니다.
- `toggleDropdown` 함수는 드롭다운을 열거나 닫는 기능을 수행합니다.
- `closeDropdown` 함수는 드롭다운을 닫는 용도로 별도 제공됩니다.
- `selectedItem`에는 현재 선택된 아이템의 문자열 값이 저장됩니다.
- `setSelectedItem` 함수를 사용해 선택된 아이템 값을 업데이트 할 수 있습니다.
