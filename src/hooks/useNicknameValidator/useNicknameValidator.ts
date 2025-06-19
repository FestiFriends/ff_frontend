import { useState } from 'react';
import { hasProfanity } from '@/lib/utils';
import { getCheckNickname } from '@/services/usersService';
import { validateNickname } from '@/utils/InputValidators/InputValidators';

export const useNicknameValidator = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string>();

  const validate = async (value: string) => {
    const basicError = validateNickname(value);
    if (basicError) {
      setError(basicError);
      setIsAvailable(null);
      return;
    }

    if (hasProfanity(value)) {
      setError('비속어는 사용할 수 없습니다.');
      setIsAvailable(null);
      return;
    }

    setIsChecking(true);
    try {
      const available = await getCheckNickname(value);
      setIsAvailable(true);
      setError(
        available
          ? undefined
          : '이미 사용 중인 닉네임입니다. 사용하실 수 있지만, 구별을 위해 고유한 닉네임을 고려해보세요'
      );
    } catch {
      setIsAvailable(null);
      setError('닉네임 중복 확인에 실패했습니다.');
    } finally {
      setIsChecking(false);
    }
  };

  return { isChecking, isAvailable, error, validate };
};
