import { renderHook, act } from '@testing-library/react';
import { useForm } from '@/hooks/useForm/useForm';

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
      result.current.onChange('email')({
        target: { value: 'abc' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.onBlur('email')();
    });

    expect(result.current.form.email).toBe('abc');
    expect(result.current.touched.email).toBe(true);
    expect(result.current.errors.email).toBe('이메일 형식이 아닙니다');
  });

  test('reset이 폼 상태와 touched를 초기화해야 한다', () => {
    const { result } = renderHook(() => useForm(initialValues, validators));

    act(() => {
      result.current.onChange('name')({
        target: { value: '홍길동' },
      } as React.ChangeEvent<HTMLInputElement>);
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
