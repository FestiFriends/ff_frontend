# Dropdown 컴포넌트

여러 곳에서 재사용 가능한 드롭다운 UI 컴포넌트입니다.  
Context와 커스텀 훅을 활용해 상태를 관리하며, `useClickOutside` 훅으로 외부 클릭 시 닫힘 동작을 지원합니다.

---

## 주요 기능

- 드롭다운 열기/닫기 상태 관리 및 공유 (`useDropdownState` 훅 사용)
- 외부 클릭 및 `Escape` 키 입력 시 드롭다운 닫힘 처리 (`useClickOutside` 훅 사용)
- 키보드 접근성 지원 (Enter, Space키로 아이템 선택 가능)
- 선택한 아이템 표시 및 관리
- 합성 컴포넌트 패턴으로 유연한 사용 가능
- 기본 스타일과 hover/focus 스타일 포함 (디자인 시안 나오면 업데이트 예정)

---

## 사용법

```tsx
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from '@/components/Dropdown';

export default function Example() {
  return (
    <Dropdown>
      <DropdownTrigger placeholder='옵션 선택' />
      <DropdownContent>
        <DropdownItem label='option1'>옵션 1</DropdownItem>
        <DropdownItem label='option2'>옵션 2</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}
```

---

## 주요 컴포넌트

| 컴포넌트          | 설명                                         |
| ----------------- | -------------------------------------------- |
| `Dropdown`        | 드롭다운 전체 래퍼 및 상태 관리 제공         |
| `DropdownTrigger` | 드롭다운 토글 버튼                           |
| `DropdownContent` | 드롭다운 메뉴 콘텐츠 영역 (열릴 때만 렌더링) |
| `DropdownItem`    | 드롭다운 선택 항목, 클릭 시 선택 처리        |

---

## 컴포넌트별 설명

### Dropdown

- 드롭다운 전체 컨테이너
- 내부 상태 관리 및 `useClickOutside` 훅 연결
- `DropdownContext`로 상태 하위 컴포넌트에 전달
- 기본적으로 `relative inline-block` 스타일 적용
- `className`으로 추가 스타일 커스터마이징 가능

### DropdownTrigger

- 드롭다운 토글 버튼
- 클릭 시 드롭다운 열기/닫기 상태 변경
- 선택된 아이템 혹은 `placeholder` 텍스트 표시
- 기본 스타일 및 hover/focus 스타일 포함
- `className`으로 스타일 추가 가능

### DropdownContent

- 드롭다운 내용 영역 (아이템 리스트 감싸는 역할)
- 드롭다운이 열렸을 때만 렌더링
- 기본적으로 절대 위치, 그림자, 테두리 등 스타일 적용
- `className`으로 추가 스타일 지정 가능

### DropdownItem

- 드롭다운 내 선택 가능한 개별 아이템
- 클릭 또는 키보드(Enter, Space)로 선택 가능
- 선택 시 해당 아이템 label이 `selectedItem` 상태에 저장되고 드롭다운 닫힘
- Tab/Shift+Tab으로 포커스 이동 가능
- 선택된 아이템은 포커싱 처리되어 키보드 접근성 지원
- 기본 스타일, hover 및 focus 스타일 포함
- `label` 속성으로 아이템 식별용 값 전달
- `className`으로 스타일 커스터마이징 가능

---

## 상태 관리 및 훅

- 내부 상태는 `useDropdownState` 커스텀 훅에서 관리
  - `isOpen`: 드롭다운 열림 여부 (boolean)
  - `selectedItem`: 선택된 항목 값 (string)
  - `toggleDropdown()`: 열림/닫힘 토글 함수
  - `closeDropdown()`: 드롭다운 닫기 함수
  - `setSelectedItem(item: string)`: 선택 항목 설정 함수
- 외부 클릭 및 Escape 키 감지는 `useClickOutside` 훅으로 처리

---

## 스타일 가이드 (기본 Tailwind CSS 사용)

| 컴포넌트          | 상태   | 클래스 내용                                                                           |
| ----------------- | ------ | ------------------------------------------------------------------------------------- |
| `Dropdown`        | 기본   | `relative inline-block`                                                               |
| `DropdownTrigger` | 기본   | `inline-flex cursor-pointer items-center justify-between rounded-md border px-4 py-2` |
|                   | 호버   | `hover:bg-gray-200`                                                                   |
|                   | 포커스 | `focus:bg-gray-300 focus:outline-none`                                                |
| `DropdownContent` | 기본   | `absolute z-10 mt-2 w-48 overflow-hidden rounded-md border bg-white shadow-md`        |
|                   | 포커스 | `focus:outline-none`                                                                  |
| `DropdownItem`    | 기본   | `cursor-pointer bg-white px-4 py-2 select-none`                                       |
|                   | 호버   | `hover:bg-gray-200`                                                                   |
|                   | 포커스 | `focus:bg-gray-300 focus:outline-none`                                                |

---

## 테스트 정보

> 테스트 도구: `jest`, `@testing-library/react`, `@testing-library/user-event`

| 테스트 항목                            | 설명                                                      |
| -------------------------------------- | --------------------------------------------------------- |
| 렌더링 테스트                          | 각 컴포넌트가 정상적으로 렌더링되는지 확인                |
| 드롭다운 열림/닫힘 상태 테스트         | 트리거 클릭 시 드롭다운이 토글되는지 테스트               |
| 항목 선택 시 상태 변경 테스트          | `DropdownItem` 클릭 시 선택 상태가 변경되는지 확인        |
| 외부 클릭/터치 및 ESC 키 이벤트 테스트 | 드롭다운 외부 클릭/터치 또는 ESC 키 입력 시 닫히는지 확인 |

---

## Todo

- 디자인 시안에 따른 스타일 및 애니메이션 추가 예정
- DropdownLabel, DropdownSeparator 컴포넌트 추가 예정

## 파일 구조

```
/components/Dropdown
  ├── Dropdown.tsx
  ├── DropdownTrigger.tsx
  ├── DropdownContent.tsx
  ├── DropdownItem.tsx
  ├── DropdownContext.tsx
  └── index.ts
```

---

## 참고 사항

- 컴포넌트들은 `'use client'` 모드로 작성되어 클라이언트 사이드 렌더링에서만 사용 가능합니다.
- `cn` 함수는 여러 클래스명을 조건부로 합쳐주는 유틸리티 함수입니다 (예: Tailwind CSS와 같이 사용).

---
