export const validateNickname = (val: string): string | undefined => {
  const regex = /^[가-힣a-zA-Z0-9_]{2,20}$/;
  return regex.test(val)
    ? undefined
    : '2~20자 한글/영문/숫자/_만 입력 가능합니다';
};

export const validateEmail = (val: string): string | undefined => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(val) ? undefined : '이메일 형식이 아닙니다';
};

export const validatePassword = (val: string): string | undefined => {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(val)
    ? undefined
    : '8자 이상, 영문/숫자/특수문자를 포함해야 합니다';
};

export const validatePasswordConfirm = (
  confirm: string,
  original: string
): string | undefined =>
  confirm !== original ? '비밀번호가 일치하지 않습니다' : undefined;
