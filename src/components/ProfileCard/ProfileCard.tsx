import ProfileCardUi from './ProfileCardUi';

const ProfileCard = () => {
  const mockProfile = {
    profileImageUrl: '',
    nickname: '락서니',
    rating: 4.9,
    description: '공연과 여행을 사랑하는 자유로운 영혼, 락서니입니다 🎸🌍',
    sns: 'https://instagram.com/roxani.rocks',
    tags: ['시간 잘 지켜요', '배려심 있어요', '대화를 잘 이끌어요'],
    isMyProfile: true,
  };

  return <ProfileCardUi {...mockProfile} />;
};

export default ProfileCard;
