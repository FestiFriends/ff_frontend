# 📝 TextInput 컴포넌트

사용자 입력을 받을 수 있는 **공통 텍스트 입력 컴포넌트**입니다.  
텍스트, 이메일, 비밀번호 등의 입력을 지원하며, 에러 메시지, 헬퍼 텍스트, 비밀번호 보기/숨기기, 사이즈 대응 등 다양한 입력 UI를 제공합니다.

---

## 📦 사용법

```tsx
import TextInput from '@/components/TextInput/TextInput';

<TextInput
  id='nickname'
  label='닉네임'
  value={nickname}
  onChange={(e) => setNickname(e.target.value)}
  placeholder='닉네임을 입력하세요'
  helperText='2~20자 입력'
  required
  touched={touched}
  error={nicknameError}
/>;
```

---

## ✨ Props

| 이름           | 타입                                                | 기본값    | 설명                                                                 |
| -------------- | --------------------------------------------------- | --------- | -------------------------------------------------------------------- |
| `type`         | `'text' \| 'email' \| 'password' \| 'new-password'` | `'text'`  | 입력 필드 타입                                                       |
| `id`           | `string`                                            | -         | input 요소의 id                                                      |
| `name`         | `string`                                            | -         | input 요소의 name                                                    |
| `label`        | `string`                                            | -         | 입력 필드 라벨 텍스트                                                |
| `value`        | `string`                                            | (필수)    | 입력 값                                                              |
| `onChange`     | `(e: React.ChangeEvent<HTMLInputElement>) => void`  | (필수)    | 입력값 변경 핸들러                                                   |
| `onBlur`       | `(e: React.FocusEvent<HTMLInputElement>) => void`   | -         | blur 이벤트 핸들러                                                   |
| `touched`      | `boolean`                                           | -         | 입력 필드가 blur 되었는지 여부 (에러 표시 여부 판단용)               |
| `placeholder`  | `string`                                            | `''`      | placeholder 텍스트                                                   |
| `required`     | `boolean`                                           | `false`   | 필수 입력 여부                                                       |
| `readOnly`     | `boolean`                                           | `false`   | 읽기 전용 상태                                                       |
| `disabled`     | `boolean`                                           | `false`   | 비활성 상태                                                          |
| `error`        | `string`                                            | -         | 에러 메시지                                                          |
| `autoComplete` | `string`                                            | 자동 설정 | 브라우저 자동완성 속성 (`email`, `current-password`, `new-password`) |
| `size`         | `'sm' \| 'md' \| 'lg' \| 'xl'`                      | `'md'`    | 입력 필드 크기                                                       |
| `className`    | `string`                                            | -         | 사용자 정의 Tailwind 클래스                                          |
| `helperText`   | `string`                                            | -         | 입력 도움말 텍스트                                                   |

---

## 🎨 스타일 가이드 (Tailwind CSS 기준)

### 기본 클래스

- `w-full`, `rounded-xl`, `border`, `transition-colors`, `focus:outline-none`

### 크기별 클래스 (`size`)

| size | 클래스                |
| ---- | --------------------- |
| sm   | `text-sm py-1.5 px-3` |
| md   | `text-base py-2 px-4` |
| lg   | `text-lg py-3 px-5`   |
| xl   | `text-xl py-4 px-6`   |

### 상태별 클래스

- **에러 시**: `border-red-500`, `focus:ring-red-500`, `aria-invalid=true`
- **비활성(disabled)**: `cursor-not-allowed`, `bg-gray-100`, `text-gray-400`
- **읽기 전용(readOnly)**: `bg-gray-50`, `text-gray-500`

### 비밀번호 토글 버튼

- `Eye`, `EyeOff` 아이콘 (lucide-react 사용)
- `aria-label`을 통해 접근성 고려: `'비밀번호 보기'`, `'비밀번호 숨기기'`

---

## ✅ 테스트 정보

> 테스트 도구: `jest`, `@testing-library/react`

| 테스트 항목                            | 설명                                                                 |
| -------------------------------------- | -------------------------------------------------------------------- |
| 라벨, 플레이스홀더, 헬퍼 텍스트 렌더링 | 각 요소들이 정상적으로 DOM에 렌더링되는지 확인                       |
| 필수 입력 `*` 표시 확인                | `required`일 때 별표(`*`) 표시 확인                                  |
| 에러 메시지 출력 테스트                | `error`, `touched` 조합 시 메시지 표시 확인                          |
| 비밀번호 보기/숨기기 버튼 동작 확인    | 클릭 시 `Eye ↔ EyeOff` 전환 동작 확인                               |
| 지원되지 않는 size 기본 처리           | 잘못된 size 입력 시 기본 `'md'` 스타일(`text-base`) 적용 확인        |
| `disabled`, `readOnly` 스타일 확인     | 상태에 맞는 스타일 클래스(`bg-gray-*`, `text-gray-*`) 포함 여부 확인 |

---

## 📁 파일 구조

```
/components/TextInput
  ├── TextInput.tsx
  └── TextInput.test.tsx
```
