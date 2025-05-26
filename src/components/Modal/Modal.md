# Modal 컴포넌트

재사용 가능한 커스텀 Modal 컴포넌트입니다. 다양한 서브 컴포넌트를 제공하여 유연한 모달 UI 구성이 가능합니다. Context API를 기반으로 하여 모달 상태를 전역에서 관리할 수 있습니다.

---

## 주요 기능

- 모달 열기/닫기 상태를 Context로 관리
- `<ModalTrigger />`, `<ModalContent />`, `<ModalClose />`, `<ModalAction />`, `<ModalCancel />` 등 분리된 서브 컴포넌트 제공
- `backdrop` 클릭으로 닫기 허용/비허용 설정 가능
- `Portal`을 사용한 모달 렌더링
- 모달 외부 클릭 감지

---

## 컴포넌트 구조

### `<Modal />`

모달의 상태를 관리하고 context를 제공한다.

| 이름                   | 타입                        | 설명                         |
| ---------------------- | --------------------------- | ---------------------------- |
| `defaultOpen`          | `boolean` (기본값: `false`) | 초기 열림 상태 여부          |
| `disableBackdropClose` | `boolean` (기본값: `false`) | 바깥 영역 클릭 시 닫기 방지  |
| `onClose`              | `() => void` (선택)         | 모달이 닫힐 때 실행되는 콜백 |
| `children`             | `React.ReactNode` (선택)    | Modal 내부에 렌더링할 콘텐츠 |

### `<ModalTrigger />`

모달을 열기 위한 트리거 버튼을 감싸는 컴포넌트

| 이름        | 타입                             | 설명                                                                                                                      |
| ----------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `children`  | `ReactNode` (기본값: `<button>`) | 클릭 가능한 요소로 기본값은 `<button>{children}</button>`이며, `ReactElement`타입이 올 경우 감싸는 `<button>`이 제거된다. |
| `className` | `string` (선택)                  | 트리거 스타일                                                                                                             |

### `<ModalContent />`

모달의 실제 내용을 감싸는 컴포넌트
Portal을 이용해 body 바깥으로 렌더링되며, `<dialog>` 요소를 사용한다.

| 이름        | 타입            | 설명           |
| ----------- | --------------- | -------------- |
| `children`  | `ReactNode`     | 모달 본문 내용 |
| `className` | `string` (선택) | 모달의 스타일  |

### `<ModalClose />`

모달을 닫는 용도의 닫기 버튼
자식이 ReactElement일 경우 onClick에 closeModal()이 자동으로 추가됩니다.

| 이름        | 타입            | 설명                        |
| ----------- | --------------- | --------------------------- |
| `children`  | `ReactNode`     | 닫기 아이콘 또는 버튼       |
| `className` | `string` (선택) | 위치 및 스타일 커스터마이징 |

### `<ModalAction />`

모달 내 "확인", "제출" 등의 액션 버튼
onClick 실행 이후 자동으로 모달이 닫히며, 비동기 함수도 지원됩니다.

| 이름        | 타입               | 설명                     |
| ----------- | ------------------ | ------------------------ |
| `onClick`   | `(e) => void`      | 버튼 클릭 시 실행할 로직 |
| `children`  | `ReactNode` (선택) | 버튼의 children          |
| `className` | `string` (선택)    | 스타일 커스터마이징      |

### `<ModalCancel />`

모달 내 "취소" 버튼으로 사용
항상 모달을 닫으며, onClick은 먼저 실행됩니다.

| 이름        | 타입               | 설명                     |
| ----------- | ------------------ | ------------------------ |
| `onClick`   | `(e) => void`      | 버튼 클릭 시 실행할 로직 |
| `children`  | `ReactNode` (선택) | 버튼의 children          |
| `className` | `string` (선택)    | 스타일 커스터마이징      |

---

## 사용 예시

```tsx
<Modal>
  <ModalTrigger>
    <button>모달 열기</button>
  </ModalTrigger>

  <ModalContent className='rounded-md bg-white p-4'>
    <h2 className='text-lg font-bold'>모달 제목</h2>
    <p>모달 내용입니다.</p>
    <div className='mt-4 flex justify-end gap-2'>
      <ModalCancel className='text-gray-500'>취소</ModalCancel>
      <ModalAction className='text-blue-500'>확인</ModalAction>
    </div>
    <ModalClose />
  </ModalContent>
</Modal>
```
