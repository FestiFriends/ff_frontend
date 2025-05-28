# Popover 컴포넌트

재사용 가능한 커스텀 Popover 컴포넌트입니다. Context API를 활용하여 열림/닫힘 상태를 전역적으로 관리하며, 트리거 요소와 내용 요소를 분리하여 유연하게 UI를 구성할 수 있습니다. direction 속성을 통해 팝오버의 방향도 설정할 수 있으며, 요소를 밀지 않고 겹쳐서 렌더링됩니다.

---

## 주요 기능

- Popover 열기/닫기 상태를 Context로 관리
- `<PopoverTrigger />`, `<PopoverContent />` 등의 서브 컴포넌트 제공
- 클릭 시 토글 방식으로 동작
- 외부 클릭 시 자동 닫힘
- direction 속성으로 위치 지정 (top, right, bottom, left)
- 요소를 밀치지 않고 absolute로 띄움

---

## 컴포넌트 구조

### `<Popover />`

팝오버의 상태를 관리하고 context를 제공한다.

| 이름        | 타입                                                | 설명                                    |
| ----------- | --------------------------------------------------- | --------------------------------------- |
| `direction` | `top \| bottom \| left \| right` (기본값: `bottom`) | 팝오버의 열리는 방향                    |
| `children`  | `ReactNode`                                         | 내부에 사용할 트리거 및 콘텐츠 구성요소 |

### `<PopoverTrigger />`

팝오버를 열고 닫는 트리거 역할의 컴포넌트

| 이름        | 타입                             | 설명                                                                                                                      |
| ----------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `children`  | `ReactNode` (기본값: `<button>`) | 클릭 가능한 요소로 기본값은 `<button>{children}</button>`이며, `ReactElement`타입이 올 경우 감싸는 `<button>`이 제거된다. |
| `className` | `string` (선택)                  | 트리거 스타일                                                                                                             |

### `<PopoverContent />`

팝오버의 실제 콘텐츠를 렌더링
absolute 포지셔닝으로 트리거에 겹쳐서 렌더링되며, 방향에 따라 위치가 다르게 적용된다.

| 이름        | 타입            | 설명                      |
| ----------- | --------------- | ------------------------- |
| `children`  | `ReactNode`     | 팝오버 내부에 보여질 내용 |
| `className` | `string` (선택) | 모달의 스타일             |

---

## 위치 설명

- top: 트리거 위에 가운데 정렬
- bottom: 트리거 아래에 가운데 정렬
- left: 트리거 왼쪽에 가운데 정렬
- right: 트리거 오른쪽에 가운데 정렬

---

## 사용 예시

```tsx
<Popover direction='top'>
  <PopoverTrigger>
    <button className='bg-blue-500 px-4 py-2 text-white'>열기</button>
  </PopoverTrigger>

  <PopoverContent className='rounded bg-white p-4 shadow-md'>
    <p>이건 팝오버 내용입니다.</p>
  </PopoverContent>
</Popover>
```
