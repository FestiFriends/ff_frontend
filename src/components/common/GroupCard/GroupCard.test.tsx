import { fireEvent, render, screen } from '@testing-library/react';
import GroupCard from './GroupCard';

// IntersectionObserver mocking
Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

const mockPerformance = {
  performanceId: 'pf-20250522',
  groupCount: 3,
  groups: [
    {
      id: 'g1',
      title: '클래식 애호가 모임',
      category: 'COMPANION',
      gender: 'ALL',
      startAge: 25,
      endAge: 40,
      location: '서울',
      startDate: '2025-05-30T19:00:00Z',
      endDate: '2025-06-02T19:00:00Z',
      memberCount: 8,
      maxMembers: 10,
      description: '클래식 애호가 모집합니다!'.repeat(5),
      hashtag: ['클래식', '음악감상'],
      host: {
        hostId: 'host123',
        name: '김음악',
        rating: 4.8,
        profileImage: '',
      },
      isHost: false,
    },
  ],
};

const mockJoined = {
  id: 'group-001',
  performance: {
    id: 'performance-123',
    title: '인천 펜타포트 락 페스티벌 2025 new',
    poster:
      'https://busanrockfestival.com/wp-content/uploads/2025/05/25BIRF-1st-LINEUP-RELEASEKR-819x1024.jpg',
  },
  title: '인천 펜타포트 락 페스티벌 2025 new 뮤지컬 같이 봐요',
  category: 'ROOM_SHARE',
  gender: 'FEMALE',
  startAge: 20,
  endAge: 30,
  location: '서울',
  startDate: '2025-06-01T15:00:00Z',
  endDate: '2025-06-01T18:00:00Z',
  memberCount: 5,
  maxMembers: 10,
  description: '뮤지컬 레미제라블을 함께 관람하고 이야기 나눠요!',
  hashtag: ['뮤지컬', '공연모임', '문화생활'],
  host: {
    id: 'host-789',
    name: '김호스트',
    rating: 4.8,
    profileImage: '',
  },
  isHost: true,
};

describe('공연목록 - GroupCard 컴포넌트', () => {
  const transformedGroup = {
    ...mockPerformance.groups[0],
    performance: {
      id: mockPerformance.performanceId,
    },
    host: {
      id: mockPerformance.groups[0].host.hostId,
      name: mockPerformance.groups[0].host.name,
      rating: mockPerformance.groups[0].host.rating,
    },
  };

  test('모임 제목, 위치, 해시태그 등 주요 정보가 출력된다', () => {
    render(
      <GroupCard
        groupData={transformedGroup}
        onCardClick={jest.fn()}
        onButtonClick={() => {}}
        buttonText='참가 신청'
      />
    );

    expect(screen.getByText('클래식 애호가 모임')).toBeInTheDocument();
    expect(screen.getByText('서울')).toBeInTheDocument();
    expect(screen.getByText('25~40세')).toBeInTheDocument();
    expect(screen.getByText('김음악')).toBeInTheDocument();
    expect(screen.getByText('클래식')).toBeInTheDocument();
    expect(screen.getByText('음악감상')).toBeInTheDocument();
  });

  test('버튼 클릭 이벤트가 정상적으로 호출된다', () => {
    const mockClick = jest.fn();
    render(
      <GroupCard
        groupData={transformedGroup}
        buttonText='참가 신청'
        onCardClick={jest.fn()}
        onButtonClick={mockClick}
      />
    );

    fireEvent.click(screen.getByText('참가 신청'));
    expect(mockClick).toHaveBeenCalled();
  });

  test('해시태그 클릭이 비활성화되었을 때 이벤트가 발생하지 않는다', () => {
    const mockTagClick = jest.fn();
    render(
      <GroupCard
        groupData={transformedGroup}
        onHashtagClick={mockTagClick}
        onCardClick={jest.fn()}
        onButtonClick={() => {}}
        buttonText='참가 신청'
      />
    );

    fireEvent.click(screen.getByText('클래식'));
    expect(mockTagClick).not.toHaveBeenCalled();
  });

  test('해시태그 클릭이 활성화되었을 때 이벤트가 발생한다', () => {
    const mockTagClick = jest.fn();
    render(
      <GroupCard
        groupData={transformedGroup}
        onCardClick={jest.fn()}
        isHashtagClickable
        onHashtagClick={mockTagClick}
        onButtonClick={() => {}}
        buttonText='참가 신청'
      />
    );

    fireEvent.click(screen.getByText('클래식'));
    expect(mockTagClick).toHaveBeenCalledWith('클래식');
  });

  test('카드 전체 클릭 시 onCardClick만 호출되고 onButtonClick은 호출되지 않음', () => {
    const mockCardClick = jest.fn();
    const mockButtonClick = jest.fn();

    const { container } = render(
      <GroupCard
        groupData={transformedGroup}
        onCardClick={mockCardClick}
        isHashtagClickable
        onHashtagClick={jest.fn()}
        onButtonClick={mockButtonClick}
        buttonText='참가 신청'
      />
    );

    const cardElement = container.querySelector('[role="button"]')!;
    fireEvent.click(cardElement);

    expect(mockCardClick).toHaveBeenCalled();
    expect(mockButtonClick).not.toHaveBeenCalled();
  });
});

describe('참가중인 모임 목록 - GroupCard 컴포넌트', () => {
  test('포스터, 제목, 설명, 해시태그가 제대로 보인다', () => {
    render(
      <GroupCard
        groupData={mockJoined}
        onCardClick={jest.fn()}
        onButtonClick={() => {}}
        buttonText='모임 탈퇴'
      />
    );

    expect(
      screen.getByText('인천 펜타포트 락 페스티벌 2025 new 뮤지컬 같이 봐요')
    ).toBeInTheDocument();
    expect(screen.getByText('서울')).toBeInTheDocument();
    expect(screen.getByText('20~30세')).toBeInTheDocument();
    expect(screen.getByText('김호스트')).toBeInTheDocument();
    expect(screen.getByText('뮤지컬')).toBeInTheDocument();
    expect(
      screen.getByAltText('인천 펜타포트 락 페스티벌 2025 new')
    ).toBeInTheDocument();
  });

  test('해시태그 클릭이 비활성화되었을 때 이벤트가 발생하지 않는다', () => {
    const mockTagClick = jest.fn();
    render(
      <GroupCard
        groupData={mockJoined}
        onHashtagClick={mockTagClick}
        onCardClick={jest.fn()}
        onButtonClick={() => {}}
        buttonText='모임 탈퇴'
      />
    );

    expect(mockTagClick).not.toHaveBeenCalled();
  });

  test('버튼 클릭 시 onButtonClick이 호출된다', () => {
    const mockClick = jest.fn();
    render(
      <GroupCard
        groupData={mockJoined}
        onCardClick={jest.fn()}
        buttonText='모임 탈퇴'
        onButtonClick={mockClick}
      />
    );

    fireEvent.click(screen.getByText('모임 탈퇴'));
    expect(mockClick).toHaveBeenCalled();
  });

  test('카드 전체 클릭 시 onCardClick만 호출되고 onButtonClick은 호출되지 않음', () => {
    const mockCardClick = jest.fn();
    const mockButtonClick = jest.fn();

    const { container } = render(
      <GroupCard
        groupData={mockJoined}
        buttonText='모임 탈퇴'
        onCardClick={mockCardClick}
        onButtonClick={mockButtonClick}
      />
    );

    const cardElement = container.querySelector('[role="button"]')!;
    fireEvent.click(cardElement);

    expect(mockCardClick).toHaveBeenCalled();
    expect(mockButtonClick).not.toHaveBeenCalled();
  });
});
