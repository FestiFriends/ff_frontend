import { useEffect, useState } from 'react';
import { getProfile } from '@/services/profileService';
import { FullProfile } from '@/types/profiles';

export const useProfile = (userId: string) => {
  const [profile, setProfile] = useState<FullProfile | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProfile(userId)
      .then(setProfile)
      .catch(() => setError('존재하지 않는 유저입니다.'))
      .finally(() => setIsLoading(false));
  }, [userId]);

  return { profile, isLoading, error };
};
