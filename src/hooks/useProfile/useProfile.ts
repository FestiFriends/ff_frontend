import { useEffect, useState } from 'react';
import type { ProfileData } from '@/types/profile';

export const useProfile = (userId: string) => {
  const [profile, setProfile] = useState<ProfileData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/profiles/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch(() => setError('존재하지 않는 유저입니다.'))
      .finally(() => setIsLoading(false));
  }, [userId]);

  return { profile, isLoading, error };
};
