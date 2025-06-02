import { http, HttpResponse } from 'msw';
import { mockProfiles } from '../mockProfiles';

export const profileHandlers = [
  http.get('/api/profile/:userId', ({ params }) => {
    const { userId } = params;

    if (userId === 'loading') {
      return new Promise(() => {}) as never;
    }

    const profile = mockProfiles[userId as keyof typeof mockProfiles];
    if (profile) {
      return HttpResponse.json(profile);
    }

    return HttpResponse.json(
      { message: '존재하지 않는 유저입니다.' },
      { status: 404 }
    );
  }),
];
