import { http, HttpResponse } from 'msw';

export const nicknameHandlers = [
  http.get('/api/v1/users/check-nickname', ({ request }) => {
    const url = new URL(request.url);
    const nickname = url.searchParams.get('nickname');

    const takenNicknames = ['중복확인', 'admin', '관리자'];
    const isAvailable = !takenNicknames.includes(nickname ?? '');

    return HttpResponse.json({
      code: 200,
      message: isAvailable
        ? '사용 가능한 닉네임입니다.'
        : '이미 사용 중인 닉네임입니다.',
      data: {
        isAvailable,
      },
    });
  }),
];
