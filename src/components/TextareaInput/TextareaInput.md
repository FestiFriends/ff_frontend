# 📝 TextareaInput 컴포넌트

사용자 입력을 받을 수 있는 **공통 텍스트 영역 컴포넌트**입니다.  
글자 수 제한, 비속어 감지, 유효성 시각화 등 다양한 폼 검증 UI를 제공합니다.

---

## 📦 사용법

```tsx
import TextareaInput from '@/components/TextareaInput/TextareaInput';

<TextareaInput
  value={text}
  onChange={handleChange}
  isValidText={isValid}
  maxLength={150}
  rows={4}
  placeholder='내용을 입력해주세요'
/>;
```

---

## ✨ Props

| 이름            | 타입                      | 기본값 | 설명                                                        |
| --------------- | ------------------------- | ------ | ----------------------------------------------------------- |
| `value`         | `string`                  | (필수) | 입력 필드의 값                                              |
| `onChange`      | `(value: string) => void` | (필수) | 입력값 변경 시 호출되는 함수                                |
| `isValidText`   | `boolean`                 | `true` | 텍스트 유효성 여부. false일 경우 경고 메시지 및 스타일 적용 |
| `placeholder`   | `string`                  | `''`   | placeholder 텍스트                                          |
| `rows`          | `number`                  | `4`    | 기본 textarea 높이 (행 수 기준)                             |
| `maxLength`     | `number`                  | `150`  | 입력 가능한 최대 글자 수                                    |
| `className`     | `string`                  | `-`    | 사용자 정의 Tailwind 클래스 (스타일 덮어쓰기 또는 확장용)   |
| `hideScrollbar` | `boolean`                 | `true` | 스크롤바 숨김 여부                                          |

---

## 🎨 스타일 가이드 (Tailwind CSS 기준)

- 기본 클래스

  - resize-none, rounded-md, text-sm, shadow-sm, focus:ring, outline-none

- 유효성 스타일

  - isValidText: false인 경우:

    - ring-red-500, aria-invalid=true

    - 경고 메시지 (text-red-500)

- 길이 카운터

  - 오른쪽 하단 text-xs text-gray-500

  - 최대 글자 수 도달 시 색상 text-red-500으로 변경

- 클래스 병합

  - cn() 유틸을 통해 사용자 정의 클래스와 기본 클래스 병합 적용됨

---

## ✅ 테스트 정보

> 테스트 도구: `jest`, `@testing-library/react`

| 테스트 항목                         | 설명                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------- |
| 렌더링 테스트                       | `placeholder`, `rows` 값이 정상적으로 렌더링되는지 확인                   |
| `onChange` 이벤트 테스트            | 입력 시 외부 핸들러가 호출되는지 확인                                     |
| `maxLength` 제한 테스트             | 설정된 최대 글자 수를 초과하지 않도록 제한하는지 확인                     |
| 글자 수 카운트 테스트               | 입력한 글자 수가 우측 하단에 `"n / maxLength자"` 형식으로 출력되는지 확인 |
| `hideScrollbar = true` 클래스 확인  | `scrollbar-hide` 클래스가 적용되는지 확인                                 |
| `hideScrollbar = false` 클래스 확인 | `scrollbar-hide` 클래스가 적용되지 않는지 확인                            |
| 욕설 입력 통합 테스트               | 욕설 입력 시 `hasProfanity`가 동작하여 `isValidText=false`가 되는지 확인  |

## 📁 파일 구조

```
/components/TextareaInput
  ├── TextareaInput.tsx
  └── TextareaInput.test.tsx
```
