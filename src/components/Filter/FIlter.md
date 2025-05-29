# 🧩 Filter 컴포넌트

다단계 선택형 필터 컴포넌트입니다.  
트리 형태의 데이터를 기반으로 하위 선택지를 단계적으로 노출하며, 각 단계는 커스텀 `Dropdown` 컴포넌트를 사용해 구성됩니다.

---

## ✨ 주요 기능

- 트리 구조 데이터를 기반으로 다단계 필터링 지원
- 각 단계별 옵션 조건부 렌더링
- 선택 시 부모 값에 따라 하위 단계 옵션 갱신
- `Dropdown` 기반의 UI (선택지 클릭으로 옵션 변경)
- `placeholder` 프롭을 통해 각 단계 라벨 커스터마이징 가능

---

## 💡 Props

### `Filter`

| 이름                 | 타입                         | 설명                                                               |
| -------------------- | ---------------------------- | ------------------------------------------------------------------ |
| `data`               | `MultiLevelData[]`           | 필터링에 사용할 트리형 데이터                                      |
| `onChange`           | `(values: string[]) => void` | 선택 값이 변경될 때 호출됨 (단계별 값 배열)                        |
| `levelPlaceholders?` | `string[]`                   | 각 단계별 placeholder 지정 (없을 경우 "단계 n 선택" 기본값 사용됨) |

### `MultiLevelData`

```ts
interface MultiLevelData {
  label: string;
  value: string;
  children?: MultiLevelData[];
}
```

---

## 🧪 테스트

모든 주요 로직 및 조건 분기 흐름에 대해 **Jest + React Testing Library** 기반의 테스트가 작성되어 있습니다.

### ✅ 테스트 커버 범위

- 각 단계별 UI 렌더링 여부
- 조건부 렌더링: 이전 단계 미선택 또는 옵션 없음
- placeholder 기본값 / 커스텀 값 동작
- 사용자 상호작용 시 onChange 이벤트
- 마지막 옵션 선택 후 상태 업데이트

```tsx
test('placeholder가 전달되지 않으면 기본값이 적용된다', () => {
  render(<Filter data={mockData} />);
  expect(screen.getByText('단계 1 선택')).toBeInTheDocument();
});

test('placeholder가 프롭스로 전달되면 해당 값이 표시된다', () => {
  render(
    <Filter
      data={mockData}
      levelPlaceholders={['1단계 선택해주세요']}
    />
  );
  expect(screen.getByText('1단계 선택해주세요')).toBeInTheDocument();
});
```

추가적으로 `FilterUi` 내부에서 사용하는 `Dropdown` 컴포넌트에 필요한 프롭스를 확장하였으며, 해당 프롭에 따라 동작이 변화하는 것도 함께 테스트를 통해 확인되었습니다.

---

## 📦 사용 예시

```tsx
const festivalRegionFilter: MultiLevelData[] = [
  {
    label: '서울',
    value: 'seoul',
    children: [
      {
        label: '마포구',
        value: 'mapo',
        children: [{ label: '합정동', value: 'hapjeong' }],
      },
    ],
  },
];

<Filter
  data={festivalRegionFilter}
  onChange={(values) => console.log(values)}
  levelPlaceholders={['도시 선택', '구 선택', '동 선택']}
/>;
```

---

## 🛠️ 기타

해당 컴포넌트는 `Dropdown`, `DropdownTrigger`, `DropdownContent`, `DropdownItem` 등과 조합되어 동작합니다.  
UI/UX는 Tailwind 기반으로 구성되어 있으며, 디자인 시스템에 따라 커스터마이징 가능합니다.

> 참고: `FilterUi` 컴포넌트는 내부적으로 커스텀 `Dropdown` 컴포넌트를 사용하며,  
> `DropdownTrigger`에 `value`, `placeholder` 프롭을 전달하고,  
> 각 `DropdownItem`에 `label`, `onClick`을 연결해 동작합니다.
