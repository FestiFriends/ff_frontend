import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tabs from './Tabs';

const TabsWithContent = () => {
  const [selectedTab, setSelectedTab] = useState('공연');
  const tabs = ['공연', '유저'];

  return (
    <>
      <Tabs
        tabs={tabs}
        activeTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      <div>
        {selectedTab === '공연' && (
          <ul>
            <li>뮤지컬</li>
            <li>콘서트</li>
          </ul>
        )}
        {selectedTab === '유저' && (
          <ul>
            <li>유저 A</li>
            <li>유저 B</li>
          </ul>
        )}
      </div>
    </>
  );
};

describe('Tabs 컴포넌트', () => {
  const tabs = ['탭 1', '탭 2', '탭 3'];

  test('탭 목록이 정상적으로 렌더링된다', () => {
    render(
      <Tabs
        tabs={tabs}
        activeTab='탭 1'
        onTabChange={() => {}}
      />
    );

    tabs.forEach((tab) => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });

  test('activeTab에 강조 스타일이 정상적으로 적용된다', () => {
    render(
      <Tabs
        tabs={tabs}
        activeTab='탭 2'
        onTabChange={() => {}}
      />
    );

    const activeButton = screen.getByText('탭 2');
    expect(activeButton).toHaveClass('text-black');
  });

  test('탭 클릭 시 onTabChange가 정상적으로 호출된다', () => {
    const handleChange = jest.fn();
    render(
      <Tabs
        tabs={tabs}
        activeTab='탭 1'
        onTabChange={handleChange}
      />
    );

    fireEvent.click(screen.getByText('탭 3'));
    expect(handleChange).toHaveBeenCalledWith('탭 3');
  });

  test('탭 클릭 시 해당 탭의 콘텐츠가 정상적으로 출력된다', () => {
    render(<TabsWithContent />);
    fireEvent.click(screen.getByText('유저'));

    expect(screen.getByText('유저 A')).toBeInTheDocument();
    expect(screen.getByText('유저 B')).toBeInTheDocument();
  });
});
