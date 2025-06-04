import { useEffect, useState } from 'react';
import { FullProfile } from '@/types/profiles';

export const useProfile = (userId: string) => {
  const [profile, setProfile] = useState<FullProfile | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // 테스트용 인위적 지연
    setTimeout(() => {
      fetch(`/api/profiles/${userId}`)
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((resJson) => setProfile(resJson.data))
        .catch(() => setError('존재하지 않는 유저입니다.'))
        .finally(() => setIsLoading(false));
    }, 5000);
  }, [userId]);

  return { profile, isLoading, error };
};
