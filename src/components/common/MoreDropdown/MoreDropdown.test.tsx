import { fireEvent, render, screen } from '@testing-library/react';
import MoreDropdown from '@/components/common/MoreDropdown/MoreDropdown';

describe('MoreDropdown 컴포넌트', () => {
  const items = [
    { label: '수정하기' },
    { label: '삭제하기' },
    { label: '공지글 등록' },
  ];

  test('더보기 메뉴가 aria-label로 렌더링된다', () => {
    render(<MoreDropdown items={items} />);
    expect(screen.getByLabelText('더보기 메뉴')).toBeInTheDocument();
  });

  test('드롭다운 메뉴가 클릭 시 열리고 아이템이 렌더링된다', () => {
    const { container } = render(<MoreDropdown items={items} />);

    const trigger = container.querySelector(
      '.border-none.p-0.hover\\:bg-transparent.focus\\:bg-transparent'
    );
    expect(trigger).toBeInTheDocument();

    fireEvent.click(trigger!);

    items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });
});
