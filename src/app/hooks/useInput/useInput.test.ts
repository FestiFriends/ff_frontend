import { renderHook, act } from '@testing-library/react';
import useInput from '@/app/hooks/useInput/useInput';

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
