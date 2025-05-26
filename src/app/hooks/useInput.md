# 🧩 useInput 훅

입력 필드의 상태 관리와 유효성 검사를 간편하게 처리할 수 있도록 도와주는 **커스텀 훅**입니다.  
`value`, `onChange`, `onBlur`, `error`, `reset` 등의 기능을 제공합니다.

---

## 📦 사용법

```tsx
import useInput from '@/app/hooks/useInput';

const validateNickname = (val: string) =>
  val.length < 2 ? '2자 이상 입력해주세요' : undefined;

const nickname = useInput('', validateNickname);

<input
  value={nickname.value}
  onChange={nickname.onChange}
  onBlur={nickname.onBlur}
/>;

{
  nickname.touched && nickname.error && (
    <p className='text-red-500'>{nickname.error}</p>
  );
}
```

---

## ✨ 리턴 값

| 이름       | 타입                                         | 설명                                              |
| ---------- | -------------------------------------------- | ------------------------------------------------- |
| `value`    | `string`                                     | 현재 입력값                                       |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | 입력 변경 이벤트 핸들러                           |
| `onBlur`   | `() => void`                                 | 포커스 아웃 시 호출되는 핸들러 (touched를 true로) |
| `touched`  | `boolean`                                    | 입력 필드가 포커스 아웃 되었는지 여부             |
| `error`    | `string \| undefined`                        | 유효성 검사 에러 메시지                           |
| `setValue` | `(val: string) => void`                      | 입력값 직접 설정 함수                             |
| `reset`    | `() => void`                                 | 입력값과 touched 초기화 함수                      |

---

## 🧪 테스트 정보

> 테스트 도구: `jest`, `@testing-library/react`

| 테스트 항목                 | 설명                                                             |
| --------------------------- | ---------------------------------------------------------------- |
| 초기 상태 확인              | 초기 `value`, `touched`, `error` 값이 올바르게 설정되는지 확인   |
| onChange와 onBlur 작동 여부 | 입력값 변경 후, blur 시 `touched`, `error`가 업데이트되는지 확인 |
| reset 기능 작동 여부        | `reset()` 호출 시 value와 touched가 초기화되는지 확인            |

---

## ✅ 테스트 예시

```tsx
import { renderHook, act } from '@testing-library/react';
import useInput from '@/app/hooks/useInput';

describe('useInput 훅 테스트', () => {
  const validate = (v: string) =>
    v.length < 3 ? '3자 이상 입력해주세요' : undefined;

  test('초기 상태가 정상적으로 설정되어야 한다', () => {
    const { result } = renderHook(() => useInput('', validate));

    expect(result.current.value).toBe('');
    expect(result.current.touched).toBe(false);
    expect(result.current.error).toBe(undefined);
  });

  test('onChange로 값이 변경되어야 하고, 포커스가 빠지면 error가 나와야 한다', () => {
    const { result } = renderHook(() => useInput('', validate));

    act(() => {
      result.current.onChange({ target: { value: 'hi' } } as any);
    });
    expect(result.current.value).toBe('hi');
    expect(result.current.error).toBe(undefined);

    act(() => {
      result.current.onBlur();
    });
    expect(result.current.touched).toBe(true);
    expect(result.current.error).toBe('3자 이상 입력해주세요');
  });

  test('reset 함수가 value와 touched를 초기화해야 한다', () => {
    const { result } = renderHook(() => useInput('hello', validate));

    act(() => {
      result.current.onChange({ target: { value: 'hi' } } as any);
      result.current.onBlur();
    });

    expect(result.current.value).toBe('hi');
    expect(result.current.touched).toBe(true);
    expect(result.current.error).toBe('3자 이상 입력해주세요');

    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toBe('');
    expect(result.current.touched).toBe(false);
    expect(result.current.error).toBe(undefined);
  });
});
```

---

## 📁 파일 구조

```
/hooks
  └── useInput.ts
  └── useInput.test.ts
```
