import { http, HttpResponse } from 'msw';
import { mockProfiles } from '../mockProfiles';

export const profileHandlers = [
  http.get('/api/profiles/me', () =>
    HttpResponse.json({
      code: 200,
      message: '프로필 조회 성공',
      data: mockProfiles['me'],
    })
  ),

  http.get('/api/profiles/:userId', ({ params }) => {
    const { userId } = params;

    const profile = mockProfiles[userId as keyof typeof mockProfiles];

    if (!profile) {
      return HttpResponse.json(
        { message: '존재하지 않는 유저입니다.' },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      code: 200,
      message: '프로필 조회 성공',
      data: profile,
    });
  }),
];
