import { cleanup, render, screen } from '@testing-library/react';
import { Gender } from '@/types/enums';
import ProfileCard from './ProfileCard';

const dummyProfile = {
  id: '1',
  name: '홍길동',
  age: 25,
  gender: Gender.MALE,
  profileImage: {
    id: '1',
    src: '/profile.jpg',
    alt: '프로필 이미지',
  },
  description: '안녕하세요',
  hashtag: ['친절함', '시간 약속'],
  sns: 'https://example.com',
  rating: 4.5,
  isLiked: false,
};

afterEach(() => {
  cleanup(); // 명시적으로 DOM 정리, 보통 jest에서 자동 처리됨
});

test('로딩 중일 때 스켈레톤 컴포넌트 렌더링', () => {
  render(<ProfileCard isLoading />);
  expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
});

test('에러 있을 때 에러 메시지 출력', () => {
  render(<ProfileCard error='유저를 찾을 수 없습니다' />);
  expect(screen.getByText(/유저를 찾을 수 없습니다/i)).toBeInTheDocument();
});

test('에러 메시지가 없으면 기본 에러 메시지를 출력한다', () => {
  render(<ProfileCard error={undefined} />);
  expect(screen.getByText(/존재하지 않는 유저입니다/i)).toBeInTheDocument();
});

test('정상 데이터일 때 프로필 정보 렌더링', () => {
  render(<ProfileCard profile={dummyProfile} />);
  expect(screen.getByText('홍길동')).toBeInTheDocument();
  expect(screen.getByText('안녕하세요')).toBeInTheDocument();
  expect(screen.getByText('친절함')).toBeInTheDocument();
  expect(screen.getByText('시간 약속')).toBeInTheDocument();
});

test('자기소개가 없으면 기본 안내 문구가 출력된다', () => {
  render(<ProfileCard profile={{ ...dummyProfile, description: ' ' }} />);
  expect(
    screen.getByText(/이 사용자는 아직 자기소개를 작성하지 않았어요/i)
  ).toBeInTheDocument();
});

test('hashtag가 undefined이면 아무 태그도 렌더링되지 않는다', () => {
  render(<ProfileCard profile={{ ...dummyProfile, hashtag: undefined }} />);

  dummyProfile.hashtag?.forEach((tag) => {
    expect(screen.queryByText(tag)).not.toBeInTheDocument();
  });
});

test('태그가 빈 배열일 때 렌더링되지 않는다', () => {
  render(<ProfileCard profile={{ ...dummyProfile, hashtag: [] }} />);
  expect(screen.queryByText(/친절함/)).not.toBeInTheDocument();
});

test('태그가 공백 문자열만 있을 때 렌더링되지 않는다', () => {
  render(<ProfileCard profile={{ ...dummyProfile, hashtag: ['  ', ''] }} />);

  dummyProfile.hashtag?.forEach((tag) => {
    const tagElement = screen.queryByText(tag.trim());
    expect(tagElement).not.toBeInTheDocument();
  });
});
