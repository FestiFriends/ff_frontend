# RadioGroup 컴포넌트

React에서 라디오 버튼 그룹을 쉽게 만들 수 있는 컴포넌트입니다. Context API를 사용하여 상태를 관리하고, 다양한 레이아웃 옵션을 제공합니다.

## 설치 및 가져오기

```javascript
import { RadioGroup, RadioGroupItem } from '@/components/RadioGroup';
```

## 기본 사용법

```jsx
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/RadioGroup';

function App() {
  const [selectedValue, setSelectedValue] = useState('option1');

  return (
    <RadioGroup
      value={selectedValue}
      onChange={setSelectedValue}
    >
      <RadioGroupItem
        value='option1'
        label='옵션 1'
      />
      <RadioGroupItem
        value='option2'
        label='옵션 2'
      />
      <RadioGroupItem
        value='option3'
        label='옵션 3'
      />
    </RadioGroup>
  );
}
```

## RadioGroup Props

| 속성        | 타입                         | 기본값       | 필수 | 설명                              |
| ----------- | ---------------------------- | ------------ | ---- | --------------------------------- |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | ❌   | 라디오 버튼들의 배치 방향         |
| `value`     | `string`                     | `undefined`  | ❌   | 현재 선택된 값                    |
| `onChange`  | `(value: string) => void`    | `undefined`  | ❌   | 값이 변경될 때 호출되는 콜백 함수 |
| `name`      | `string`                     | 자동 생성    | ❌   | 라디오 그룹의 name 속성           |
| `className` | `string`                     | `''`         | ❌   | 추가 CSS 클래스                   |
| `children`  | `React.ReactNode`            | -            | ✅   | RadioGroupItem 컴포넌트들         |
| `gap`       | `number`                     | `12`         | ❌   | 아이템 간의 간격 (픽셀)           |
| `columns`   | `number`                     | `undefined`  | ❌   | 수평 배치 시 열의 개수            |

## RadioGroupItem Props

| 속성             | 타입              | 기본값      | 필수 | 설명                            |
| ---------------- | ----------------- | ----------- | ---- | ------------------------------- |
| `value`          | `string`          | -           | ✅   | 라디오 버튼의 값                |
| `label`          | `string`          | -           | ✅   | 표시될 라벨 텍스트              |
| `disabled`       | `boolean`         | `false`     | ❌   | 비활성화 여부                   |
| `className`      | `string`          | `''`        | ❌   | label 요소에 적용될 CSS 클래스  |
| `labelClassName` | `string`          | `''`        | ❌   | 라벨 텍스트에 적용될 CSS 클래스 |
| `children`       | `React.ReactNode` | `undefined` | ❌   | label 대신 표시될 커스텀 콘텐츠 |

## 사용 예제

### 1. 세로 배치 (기본)

```jsx
<RadioGroup
  value={selectedValue}
  onChange={setSelectedValue}
>
  <RadioGroupItem
    value='small'
    label='소형'
  />
  <RadioGroupItem
    value='medium'
    label='중형'
  />
  <RadioGroupItem
    value='large'
    label='대형'
  />
</RadioGroup>
```

### 2. 가로 배치

```jsx
<RadioGroup
  direction='horizontal'
  value={selectedValue}
  onChange={setSelectedValue}
>
  <RadioGroupItem
    value='yes'
    label='예'
  />
  <RadioGroupItem
    value='no'
    label='아니오'
  />
</RadioGroup>
```

### 3. 그리드 레이아웃 (열 개수 지정)

```jsx
<RadioGroup
  direction='horizontal'
  columns={2}
  value={selectedValue}
  onChange={setSelectedValue}
  gap={20}
>
  <RadioGroupItem
    value='option1'
    label='옵션 1'
  />
  <RadioGroupItem
    value='option2'
    label='옵션 2'
  />
  <RadioGroupItem
    value='option3'
    label='옵션 3'
  />
  <RadioGroupItem
    value='option4'
    label='옵션 4'
  />
</RadioGroup>
```

### 4. 비활성화된 옵션

```jsx
<RadioGroup
  value={selectedValue}
  onChange={setSelectedValue}
>
  <RadioGroupItem
    value='available'
    label='사용 가능'
  />
  <RadioGroupItem
    value='unavailable'
    label='사용 불가'
    disabled
  />
  <RadioGroupItem
    value='pending'
    label='대기 중'
  />
</RadioGroup>
```

### 5. 커스텀 콘텐츠

```jsx
<RadioGroup
  value={selectedValue}
  onChange={setSelectedValue}
>
  <RadioGroupItem
    value='premium'
    label='프리미엄'
  >
    <div>
      <strong>프리미엄 플랜</strong>
      <p>모든 기능 이용 가능</p>
    </div>
  </RadioGroupItem>
  <RadioGroupItem
    value='basic'
    label='기본'
  >
    <div>
      <strong>기본 플랜</strong>
      <p>기본 기능만 이용 가능</p>
    </div>
  </RadioGroupItem>
</RadioGroup>
```

### 6. 스타일 커스터마이제이션

```jsx
<RadioGroup
  className='my-radio-group'
  value={selectedValue}
  onChange={setSelectedValue}
>
  <RadioGroupItem
    value='option1'
    label='옵션 1'
    className='rounded border p-2 hover:bg-gray-100'
    labelClassName='font-semibold text-blue-600'
  />
  <RadioGroupItem
    value='option2'
    label='옵션 2'
    className='rounded border p-2 hover:bg-gray-100'
    labelClassName='font-semibold text-blue-600'
  />
</RadioGroup>
```

## 접근성 (Accessibility)

이 컴포넌트는 접근성을 고려하여 설계되었습니다:

- `role="radiogroup"`이 자동으로 설정됩니다
- 키보드 네비게이션을 지원합니다 (Enter, Space 키)
- 각 라디오 그룹은 고유한 `name` 속성을 가집니다
- 비활성화된 옵션은 적절한 시각적 피드백을 제공합니다

## 주의사항

1. **RadioGroupItem은 반드시 RadioGroup 내부에서 사용해야 합니다.** 그렇지 않으면 에러가 발생합니다.

2. **value prop은 문자열이어야 합니다.** 다른 타입의 값을 사용하려면 문자열로 변환해서 사용하세요.

3. **onChange 함수를 제공하지 않으면 읽기 전용으로 동작합니다.**

## CSS 스타일링

컴포넌트는 기본적인 Tailwind CSS 클래스를 사용합니다. 커스텀 스타일을 적용하려면:

```css
.radio-group {
  /* RadioGroup 컨테이너 스타일 */
}

.radio-group label {
  /* RadioGroupItem 라벨 스타일 */
}

.radio-group label.selected {
  /* 선택된 아이템 스타일 */
}

.radio-group input[type='radio'] {
  /* 라디오 버튼 스타일 */
}
```

## 타입 정의

```typescript
interface RadioGroupProps {
  direction?: 'horizontal' | 'vertical';
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  className?: string;
  children: React.ReactNode;
  gap?: number;
  columns?: number;
}

interface RadioGroupItemProps {
  value: string;
  label: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  children?: React.ReactNode;
}
```
