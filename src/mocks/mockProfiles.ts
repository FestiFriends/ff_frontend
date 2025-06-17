export const mockProfiles = {
  me: {
    profileImageUrl: '/images/sample1.webp',
    nickname: '락서니',
    rating: 4.9,
    gender: 'MALE',
    description:
      '공연과 여행을 사랑하는 자유로운 영혼, 락서니입니다 🎸🌍'.repeat(4),
    sns: 'https://instagram.com/roxani.rocks',
    tags: [
      'INCHEON PENTAPORT MUSIC FESTIVAL',
      '배려심 있어요',
      '대화를 잘 이끌어요',
    ],
    isMyProfile: true,
  },
  guest1: {
    profileImageUrl: '',
    nickname: '비트보이',
    rating: 4.2,
    gender: 'MALE',
    description: ' ',
    sns: ' ',
    tags: ['서울 재즈 페스티벌', ' ', '조용한 편이에요'],
    isMyProfile: false,
  },
  guest2: {
    profileImageUrl: '/images/sample2.jpg',
    nickname: '페스타걸',
    rating: 4.7,
    gender: 'FEMALE',
    description: '매년 페스티벌 전국투어 중인 진짜 마니아 🤘 '.repeat(4),
    sns: 'https://instagram.com/festagirl',
    tags: [
      '부산 록 페스티벌',
      '친절하고 매너가 좋아요',
      '다음에도 함께하고 싶어요',
    ],
    isMyProfile: false,
  },
};
