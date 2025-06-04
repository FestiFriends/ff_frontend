import { FullProfile } from '@/types/profiles';

export const getProfile = async (userId: string): Promise<FullProfile> => {
  const res = await fetch(`/api/profiles/${userId}`);
  if (!res.ok) throw new Error('유저 정보를 불러올 수 없습니다.');

  const json = await res.json();
  return json.data;
};

export const updateProfile = async (data: Partial<FullProfile>) => {
  const res = await fetch(`/api/profiles/me`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('프로필 수정 실패');
  return res.json();
};
