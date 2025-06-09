# 🧩 Button 컴포넌트

공통적으로 사용 가능한 **재사용 버튼 UI 컴포넌트**입니다.\
크기(sm, md, lg), 스타일(variant), 비활성화 등 다양한 상태를 Tailwind 기반으로 지원합니다.

---

## 📦 사용법

```tsx
import Button from '@/components/Button/Button';

<Button
  variant='normalPrimary'
  size='md'
  onClick={() => console.log('clicked')}
>
  클릭
</Button>;
```

---

## ✨ Props

| 이름        | 타입                                                                                                                             | 필수 | 기본값            | 설명                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------- | ---- | ----------------- | ------------------------------------------------------------- |
| `variant`   | `'normalPrimary'` \| `'normalSecondary'` \| `'labelPrimary'` \| `'labelSecondary'` \| `'disablePrimary'` \| `'disableSecondary'` | ❌   | `'normalPrimary'` | 버튼 색상 및 스타일 유형 선택                                 |
| `size`      | `'sm'` \| `'md'` \| `'lg'`                                                                                                       | ❌   | `'md'`            | 버튼 크기                                                     |
| `disabled`  | `boolean`                                                                                                                        | ❌   | `false`           | 버튼 비활성화 여부 (`true`일 경우 클릭 불가능 및 스타일 변경) |
| `className` | `string`                                                                                                                         | ❌   | `-`               | 사용자 정의 Tailwind CSS 클래스 추가                          |
| `onClick`   | `() => void`                                                                                                                     | ❌   | `-`               | 버튼 클릭 시 실행되는 핸들러                                  |
| 기타        | `ButtonHTMLAttributes<HTMLButtonElement>`                                                                                        | ❌   | -                 | HTML 표준 `<button>` 속성 모두 사용 가능                      |

---

## 🎨 스타일 가이드 (기본 Tailwind 기반)

- variant

  | 값                 | 설명                                         |
  | ------------------ | -------------------------------------------- |
  | `normalPrimary`    | `bg-primary-red text-white`                  |
  | `normalSecondary`  | `border border-primary-red text-primary-red` |
  | `labelPrimary`     | `bg-[#FFEEEF] text-primary-red`              |
  | `labelSecondary`   | `border border-primary-100 text-primary-red` |
  | `disablePrimary`   | `bg-gray-200 text-gray-100`                  |
  | `disableSecondary` | `border border-gray-200 text-gray-100`       |

- size

  | 값   | 설명          |
  | ---- | ------------- |
  | `sm` | `px-2 py-1`   |
  | `md` | `px-5 py-2.5` |
  | `lg` | `px-8 py-2`   |

- disabled = true
  - 공통 스타일: cursor-not-allowed border-none bg-gray-200 text-white

## ✅ 테스트 정보

> 테스트 도구: `jest`, `@testing-library/react`

| 테스트 항목                    | 설명                                                                |
| ------------------------------ | ------------------------------------------------------------------- |
| 텍스트 렌더링 테스트           | children 텍스트가 정상적으로 화면에 표시되는지 확인                 |
| 스타일 클래스 적용 테스트      | `variant` 및 `size`에 따라 올바른 Tailwind 클래스가 적용되는지 확인 |
| 이벤트 핸들러 호출 테스트      | 버튼 클릭 시 `onClick` 함수가 정상 호출되는지 확인                  |
| 비활성화 상태 클릭 무효 테스트 | `disabled = true`일 때 `onClick`이 호출되지 않는지 확인             |
| 비활성화 상태 클래스 테스트    | 비활성 상태 시 스타일 클래스(`cursor-not-allowed`, 등) 확인         |

---

## 🧠 Todo

- 버튼 내 로딩 상태 등 추가 UI 고려 가능

## 📁 파일 구조

```
/components/Button
  ├── Button.md
  ├── Button.tsx
  └── Button.test.tsx
```
