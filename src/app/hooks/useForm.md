# 🧩 useForm 훅

다수의 입력값과 유효성 검사를 간편하게 관리할 수 있는 **커스텀 폼 훅**입니다.  
필드별 상태(`value`, `touched`, `error`)를 한 번에 관리하며, `onChange`, `onBlur`, `reset` 함수도 제공합니다.

---

## 📦 사용법

```tsx
import { useForm } from '@/app/hooks/useForm';

const { form, onChange, onBlur, touched, errors, reset } = useForm(
  { name: '', email: '' },
  {
    name: (v) => (v ? undefined : '이름은 필수입니다'),
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? undefined
        : '이메일 형식이 아닙니다',
  }
);

<input
  name='name'
  value={form.name}
  onChange={onChange('name')}
  onBlur={onBlur('name')}
/>;
{
  touched.name && errors.name && <p>{errors.name}</p>;
}
```

---

## ✨ 리턴 값

| 이름       | 타입                                                            | 설명                                            |
| ---------- | --------------------------------------------------------------- | ----------------------------------------------- |
| `form`     | `T`                                                             | 현재 입력 상태 객체                             |
| `setForm`  | `Dispatch<SetStateAction<T>>`                                   | 입력 상태 수동 업데이트 함수                    |
| `onChange` | `(name: keyof T) => (e: ChangeEvent<HTMLInputElement>) => void` | 개별 필드의 입력 변경 핸들러 생성 함수          |
| `onBlur`   | `(name: keyof T) => () => void`                                 | 포커스 아웃 시 `touched`를 true로 설정하는 함수 |
| `touched`  | `Record<keyof T, boolean>`                                      | 각 필드의 포커스 여부 상태                      |
| `reset`    | `() => void`                                                    | 모든 필드 상태와 touched를 초기화               |
| `errors`   | `Partial<Record<keyof T, string>>`                              | 각 필드의 에러 메시지 (유효성 실패 시)          |

---

## 🎯 주요 기능

- 제네릭 타입 `T`을 통해 다양한 폼 필드 구성 지원
- 각 필드에 대해 `validate` 함수를 개별적으로 지정 가능
- `touched` 상태 기반의 조건부 에러 메시지 제공
- `reset()`으로 폼 상태 일괄 초기화 가능

---

## ✅ 테스트 정보

> 테스트 도구: `jest`, `@testing-library/react`

| 테스트 항목                 | 설명                                                               |
| --------------------------- | ------------------------------------------------------------------ |
| 초기 상태 확인              | `form`과 `touched`가 초기값으로 올바르게 설정되는지 확인           |
| onChange / onBlur 작동 확인 | 필드 입력 후 blur 시 값과 touched, errors 상태가 적절히 업데이트됨 |
| reset 함수 동작 확인        | `form`, `touched` 값이 모두 초기화되는지 확인                      |

---

## 🧪 테스트 예시

```tsx
import { renderHook, act } from '@testing-library/react';
import { useForm } from '@/app/hooks/useForm';

describe('useForm 훅 테스트', () => {
  const initialValues = { name: '', email: '' };
  const validators = {
    name: (v: string) => (v ? undefined : '이름은 필수입니다'),
    email: (v: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? undefined
        : '이메일 형식이 아닙니다',
  };

  test('초기값과 touched 상태가 올바르게 설정되어야 한다', () => {
    const { result } = renderHook(() => useForm(initialValues, validators));
    expect(result.current.form.name).toBe('');
    expect(result.current.touched.name).toBe(false);
    expect(result.current.errors.name).toBeUndefined();
  });

  test('onChange 및 onBlur 작동 테스트', () => {
    const { result } = renderHook(() => useForm(initialValues, validators));

    act(() => {
      result.current.onChange('email')({ target: { value: 'abc' } } as any);
      result.current.onBlur('email')();
    });

    expect(result.current.form.email).toBe('abc');
    expect(result.current.touched.email).toBe(true);
    expect(result.current.errors.email).toBe('이메일 형식이 아닙니다');
  });

  test('reset이 폼 상태와 touched를 초기화해야 한다', () => {
    const { result } = renderHook(() => useForm(initialValues, validators));

    act(() => {
      result.current.onChange('name')({ target: { value: '홍길동' } } as any);
      result.current.onBlur('name')();
    });

    expect(result.current.form.name).toBe('홍길동');
    expect(result.current.touched.name).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.form.name).toBe('');
    expect(result.current.touched.name).toBe(false);
  });
});
```

---

## 📁 파일 구조

```
/hooks
  └── useForm.ts
  └── useForm.test.ts
```
