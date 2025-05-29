import { Gender, GroupCategory } from '@/types/enums';
import { Group } from '@/types/group';
import { fireEvent, render, screen } from '@testing-library/react';
import GroupCard from './GroupCard';

const mockGroup: Group = {
  id: 'group-001',
  performance: {
    id: 'performance-001',
    poster:
      'https://busanrockfestival.com/wp-content/uploads/2025/05/25BIRF-1st-LINEUP-RELEASEKR-819x1024.jpg',
  },
  title: '락을 사랑하는 사람들',
  category: GroupCategory.COMPANION,
  gender: Gender.FEMALE,
  startAge: 20,
  endAge: 35,
  location: '서울',
  startDate: '2025-08-15',
  endDate: '2025-08-15',
  memberCount: 3,
  maxMembers: 5,
  description: '락페를 함께 즐기실 분을 모집합니다!',
  hashtag: ['페스티벌', '락'],
  host: {
    id: 'host-001',
    name: '홍길동',
    rating: 4.5,
  },
};

describe('GroupCard 컴포넌트', () => {
  test('모임 제목, 위치, 해시태그 등 주요 정보가 올바르게 출력된다', () => {
    render(
      <GroupCard
        groupData={mockGroup}
        onButtonClick={() => {}}
        buttonText='참가 확정'
      />
    );
    expect(screen.getByText('같이 동행')).toBeInTheDocument();
    expect(screen.getByText('락을 사랑하는 사람들')).toBeInTheDocument();
    expect(screen.getByText('서울 · 여성 · 20~35세')).toBeInTheDocument();
    expect(screen.getByText('2025-08-15 ~ 2025-08-15')).toBeInTheDocument();
    expect(
      screen.getByText('락페를 함께 즐기실 분을 모집합니다!')
    ).toBeInTheDocument();
    expect(screen.getByText('3 / 5 명')).toBeInTheDocument();
    expect(screen.getByText('#페스티벌')).toBeInTheDocument();

    const image = screen.getByAltText('공연 포스터') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(decodeURIComponent(image.src)).toContain(
      mockGroup.performance.poster
    );
  });

  test('버튼 텍스트가 렌더링되고 클릭 이벤트가 정상적으로 호출된다', () => {
    const mockClick = jest.fn();
    render(
      <GroupCard
        groupData={mockGroup}
        buttonText='신청 취소'
        onButtonClick={mockClick}
      />
    );

    const button = screen.getByText('신청 취소');
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalled();
  });

  test('isHashtagClickable = false 이면 해시태그 클릭 시 onHashtagClick이 실행되지 않는다', () => {
    const mockTagClick = jest.fn();
    render(
      <GroupCard
        groupData={mockGroup}
        isHashtagClickable={false}
        onButtonClick={() => {}}
        onHashtagClick={mockTagClick}
        buttonText='참가 확정'
      />
    );

    const hashtag = screen.getByText('#페스티벌');
    fireEvent.click(hashtag);
    expect(mockTagClick).not.toHaveBeenCalled();
  });

  test('isHashtagClickable = true 이면 해시태그 클릭 시 onHashtagClick 이 실행된다', () => {
    const mockTagClick = jest.fn();
    render(
      <GroupCard
        groupData={mockGroup}
        isHashtagClickable
        onButtonClick={() => {}}
        onHashtagClick={mockTagClick}
        buttonText='참가 확정'
      />
    );

    const hashtag = screen.getByText('#페스티벌');
    fireEvent.click(hashtag);
    expect(mockTagClick).toHaveBeenCalledWith('#페스티벌');
  });
});
