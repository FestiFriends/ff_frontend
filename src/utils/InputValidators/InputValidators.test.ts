import {
  validateNickname,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from '@/utils/InputValidators/InputValidators';

describe('InputValidators 유효성 검사 테스트', () => {
  test('닉네임: 유효하지 않은 값', () => {
    expect(validateNickname('a')).toBe(
      '2~20자 한글/영문/숫자/_만 입력 가능합니다'
    );
    expect(validateNickname('!@#')).toBe(
      '2~20자 한글/영문/숫자/_만 입력 가능합니다'
    );
  });

  test('닉네임: 유효한 값', () => {
    expect(validateNickname('홍길동')).toBeUndefined();
    expect(validateNickname('user_01')).toBeUndefined();
  });

  test('이메일: 잘못된 형식', () => {
    expect(validateEmail('abc@email')).toBe('이메일 형식이 아닙니다');
    expect(validateEmail('abc')).toBe('이메일 형식이 아닙니다');
  });

  test('이메일: 올바른 형식', () => {
    expect(validateEmail('abc@example.com')).toBeUndefined();
  });

  test('비밀번호: 유효하지 않은 값', () => {
    expect(validatePassword('12345678')).toBe(
      '8자 이상, 영문/숫자/특수문자를 포함해야 합니다'
    );
    expect(validatePassword('qwer!@#$')).toBe(
      '8자 이상, 영문/숫자/특수문자를 포함해야 합니다'
    );
  });

  test('비밀번호: 유효한 값', () => {
    expect(validatePassword('qwer123!@')).toBeUndefined();
  });

  test('비밀번호 확인: 불일치', () => {
    expect(validatePasswordConfirm('qwer123!', 'qwer123@')).toBe(
      '비밀번호가 일치하지 않습니다'
    );
  });

  test('비밀번호 확인: 일치', () => {
    expect(validatePasswordConfirm('qwer123!', 'qwer123!')).toBeUndefined();
  });
});
