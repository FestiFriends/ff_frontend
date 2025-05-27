import { http, HttpResponse } from 'msw';

export const profileHandlers = [
  http.get('/api/profile/:userId', ({ params }) => {
    const { userId } = params;

    return HttpResponse.json({
      profileImageUrl: '',
      nickname: '락서니',
      rating: 4.9,
      gender: 'MALE',
      description: '공연과 여행을 사랑하는 자유로운 영혼, 락서니입니다 🎸🌍',
      sns: 'https://instagram.com/roxani.rocks',
      tags: [
        'INCHEON PENTAPORT MUSIC FESTIVAL',
        '배려심 있어요',
        '대화를 잘 이끌어요',
      ],
      isMyProfile: userId === 'me',
    });
  }),
];
