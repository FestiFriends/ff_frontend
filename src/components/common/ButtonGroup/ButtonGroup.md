# ButtonGroup 컴포넌트

헤드리스 방식의 버튼 그룹 컴포넌트로, 단일 또는 다중 선택이 가능한 버튼들을 그룹화하여 관리합니다.

## 특징

- **헤드리스 디자인**: 스타일링과 로직이 완전히 분리되어 자유로운 커스터마이징 가능
- **단일/다중 선택**: `mode` prop으로 선택 방식 제어
- **최대 선택 제한**: `maxSelections`로 선택 가능한 최대 개수 설정
- **제어/비제어 컴포넌트**: React의 표준 패턴 지원
- **접근성**: ARIA 속성 및 키보드 네비게이션 지원
- **타입 안전**: TypeScript로 작성되어 타입 안전성 보장

## 설치 및 사용

```tsx
import { ButtonGroup, ButtonGroupItem } from './components/ButtonGroup';
```

## API 레퍼런스

### ButtonGroup Props

| Prop            | 타입                                  | 기본값     | 설명                                              |
| --------------- | ------------------------------------- | ---------- | ------------------------------------------------- |
| `mode`          | `'single' \| 'multiple'`              | `'single'` | 선택 모드 설정                                    |
| `maxSelections` | `number`                              | -          | 최대 선택 가능한 버튼 개수 (다중 선택 모드에서만) |
| `defaultValue`  | `string \| string[]`                  | -          | 초기 선택값 (비제어 컴포넌트)                     |
| `value`         | `string \| string[]`                  | -          | 현재 선택값 (제어 컴포넌트)                       |
| `onChange`      | `(value: string \| string[]) => void` | -          | 선택 변경 시 호출되는 콜백                        |
| `disabled`      | `boolean`                             | `false`    | 전체 그룹 비활성화                                |
| `children`      | `ReactNode`                           | -          | ButtonGroupItem 컴포넌트들                        |

### ButtonGroupItem Props

| Prop               | 타입                      | 기본값  | 설명                   |
| ------------------ | ------------------------- | ------- | ---------------------- |
| `value`            | `string`                  | -       | 버튼의 고유값 (필수)   |
| `children`         | `ReactNode`               | -       | 버튼 내용              |
| `disabled`         | `boolean`                 | `false` | 개별 버튼 비활성화     |
| `className`        | `string`                  | -       | CSS 클래스명           |
| `onClick`          | `(value: string) => void` | -       | 버튼 클릭 시 추가 콜백 |
| `data-testid`      | `string`                  | -       | 테스트용 식별자        |
| `id`               | `string`                  | -       | HTML id 속성           |
| `aria-label`       | `string`                  | -       | 접근성용 라벨          |
| `aria-describedby` | `string`                  | -       | 접근성용 설명 참조     |

## 기본 사용법

### 단일 선택 모드

```tsx
function SingleSelectExample() {
  const [selected, setSelected] = useState<string>('');

  return (
    <ButtonGroup
      mode='single'
      value={selected}
      onChange={(value) => setSelected(value as string)}
    >
      <div className='flex gap-2'>
        <ButtonGroupItem
          value='option1'
          className='rounded border px-4 py-2 hover:bg-gray-100 data-[selected=true]:bg-blue-500 data-[selected=true]:text-white'
        >
          옵션 1
        </ButtonGroupItem>
        <ButtonGroupItem
          value='option2'
          className='rounded border px-4 py-2 hover:bg-gray-100 data-[selected=true]:bg-blue-500 data-[selected=true]:text-white'
        >
          옵션 2
        </ButtonGroupItem>
      </div>
    </ButtonGroup>
  );
}
```

### 다중 선택 모드

```tsx
function MultiSelectExample() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <ButtonGroup
      mode='multiple'
      maxSelections={3}
      value={selected}
      onChange={(value) => setSelected(value as string[])}
    >
      <div className='flex gap-2'>
        <ButtonGroupItem
          value='a'
          className='rounded border px-4 py-2'
        >
          A
        </ButtonGroupItem>
        <ButtonGroupItem
          value='b'
          className='rounded border px-4 py-2'
        >
          B
        </ButtonGroupItem>
        <ButtonGroupItem
          value='c'
          className='rounded border px-4 py-2'
        >
          C
        </ButtonGroupItem>
        <ButtonGroupItem
          value='d'
          className='rounded border px-4 py-2'
        >
          D
        </ButtonGroupItem>
      </div>
    </ButtonGroup>
  );
}
```

### 비제어 컴포넌트 (기본값 사용)

```tsx
function UncontrolledExample() {
  return (
    <ButtonGroup
      mode='multiple'
      defaultValue={['default1']}
      onChange={(value) => console.log('선택 변경:', value)}
    >
      <div className='flex gap-2'>
        <ButtonGroupItem
          value='default1'
          className='rounded border px-4 py-2'
        >
          기본 선택
        </ButtonGroupItem>
        <ButtonGroupItem
          value='default2'
          className='rounded border px-4 py-2'
        >
          옵션 2
        </ButtonGroupItem>
        <ButtonGroupItem
          value='default3'
          disabled
          className='rounded border px-4 py-2 disabled:opacity-50'
        >
          비활성화
        </ButtonGroupItem>
      </div>
    </ButtonGroup>
  );
}
```

## 스타일링

헤드리스 컴포넌트이므로 CSS-in-JS, Tailwind CSS, 또는 일반 CSS 등 어떤 스타일링 방법도 사용할 수 있습니다.

### Tailwind CSS 예시

```tsx
<ButtonGroupItem
  value='example'
  className='rounded border border-gray-300 px-4 py-2 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 data-[selected=true]:border-blue-500 data-[selected=true]:bg-blue-500 data-[selected=true]:text-white'
>
  버튼 텍스트
</ButtonGroupItem>
```

### CSS 선택자

컴포넌트에서 제공하는 데이터 속성을 활용하여 스타일링할 수 있습니다:

- `[data-selected="true"]`: 선택된 상태
- `[data-selected="false"]`: 선택되지 않은 상태
- `[data-value="값"]`: 특정 값을 가진 버튼
- `:disabled`: 비활성화된 버튼

## 접근성 (Accessibility)

### ARIA 속성

- `aria-pressed`: 버튼의 선택 상태를 스크린 리더에 전달
- `aria-label`: 버튼의 목적을 명확히 설명
- `aria-describedby`: 추가 설명이 필요한 경우 사용

### 키보드 네비게이션

- **Tab**: 버튼 간 포커스 이동
- **Enter/Space**: 버튼 선택/해제
- **화살표 키**: 기본 HTML 버튼 동작 (브라우저에 따라 다름)

### 예시

```tsx
<ButtonGroupItem
  value="accessible"
  aria-label="중요한 옵션 선택"
  aria-describedby="help-text"
>
  중요 옵션
</ButtonGroupItem>
<div id="help-text" className="sr-only">
  이 옵션을 선택하면 중요한 기능이 활성화됩니다
</div>
```

## 고급 사용법

### 커스텀 onClick 핸들러

```tsx
<ButtonGroupItem
  value='custom'
  onClick={(value) => {
    console.log(`${value} 버튼이 클릭됨`);
    // 추가 로직 수행
  }}
>
  커스텀 버튼
</ButtonGroupItem>
```

### 조건부 비활성화

```tsx
<ButtonGroupItem
  value='conditional'
  disabled={someCondition}
  className={`rounded border px-4 py-2 ${someCondition ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'} `}
>
  조건부 버튼
</ButtonGroupItem>
```

### 동적 옵션 생성

```tsx
function DynamicButtonGroup() {
  const options = ['옵션1', '옵션2', '옵션3'];

  return (
    <ButtonGroup mode='multiple'>
      <div className='flex gap-2'>
        {options.map((option, index) => (
          <ButtonGroupItem
            key={option}
            value={option}
            className='rounded border px-4 py-2'
          >
            {option}
          </ButtonGroupItem>
        ))}
      </div>
    </ButtonGroup>
  );
}
```

## 제한사항 및 주의사항

1. **Context 의존성**: `ButtonGroupItem`은 반드시 `ButtonGroup` 내부에서 사용해야 합니다.

2. **최대 선택 제한**: `maxSelections`는 다중 선택 모드에서만 동작합니다.

3. **value 고유성**: 각 `ButtonGroupItem`의 `value`는 고유해야 합니다.

4. **타입 일관성**: 단일 선택 모드에서는 `string`, 다중 선택 모드에서는 `string[]`를 사용합니다.

## 트러블슈팅

### 자주 발생하는 오류

**Q: "ButtonGroupItem must be used within a ButtonGroup" 오류가 발생합니다.**

```
A: ButtonGroupItem은 ButtonGroup 컴포넌트 내부에서만 사용할 수 있습니다.

// ❌ 잘못된 사용법
<ButtonGroupItem value="test">테스트</ButtonGroupItem>

// ✅ 올바른 사용법
<ButtonGroup>
  <ButtonGroupItem value="test">테스트</ButtonGroupItem>
</ButtonGroup>
```

**Q: onChange가 호출되지 않습니다.**

```
A: disabled 상태이거나 최대 선택 개수에 도달했을 가능성이 있습니다.
- ButtonGroup 또는 ButtonGroupItem의 disabled 속성을 확인하세요.
- 다중 선택 모드에서 maxSelections 설정을 확인하세요.
```

**Q: 스타일이 적용되지 않습니다.**

```
A: 헤드리스 컴포넌트이므로 기본 스타일이 없습니다.
- className prop을 통해 스타일을 직접 지정해야 합니다.
- data-selected 속성을 활용한 CSS 선택자를 사용하세요.
```

## 버전 히스토리

- **v1.0.0**: 초기 릴리스
  - 기본적인 단일/다중 선택 기능
  - 제어/비제어 컴포넌트 지원
  - 접근성 기능 포함
