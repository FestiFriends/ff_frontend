import { render, screen, fireEvent } from '@testing-library/react';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';
import QueryPagination from './QueryPagination';

jest.mock('@/hooks/useQueryParam/useQueryParam');

describe('QueryPagination', () => {
  const mockGetQueryParam = jest.fn();
  const mockSetQueryParam = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useQueryParam as jest.Mock).mockReturnValue({
      getQueryParam: mockGetQueryParam,
      setQueryParam: mockSetQueryParam,
    });
  });

  it('기본 페이지 파라미터로 렌더링되어야 한다.', () => {
    mockGetQueryParam.mockReturnValue('1');
    render(<QueryPagination totalPages={5} />);

    expect(
      screen.getByRole('button', { name: '1 page button' })
    ).toBeInTheDocument();
  });

  it('커스텀 페이지 파라미터 키를 사용할 수 있어야 한다.', () => {
    mockGetQueryParam.mockReturnValue('2');
    render(
      <QueryPagination
        totalPages={5}
        pageParamKey='customPage'
      />
    );

    expect(mockGetQueryParam).toHaveBeenCalledWith('customPage');
  });

  it('페이지 변경 시 올바른 파라미터를 설정해야 한다.', () => {
    mockGetQueryParam.mockReturnValue('1');
    render(<QueryPagination totalPages={5} />);

    const nextPageButton = screen.getByRole('button', {
      name: 'next page button',
    });
    fireEvent.click(nextPageButton);

    expect(mockSetQueryParam).toHaveBeenCalledWith('page', '2');
  });

  it('maxVisiblePages prop이 올바르게 적용되어야 한다.', () => {
    mockGetQueryParam.mockReturnValue('1');
    render(
      <QueryPagination
        totalPages={10}
        maxVisiblePages={3}
      />
    );

    const pageButtons = screen.getAllByRole('button', { name: /page button$/ });
    expect(pageButtons.length).toBeLessThanOrEqual(5);
  });

  it('className prop이 올바르게 적용되어야 한다.', () => {
    mockGetQueryParam.mockReturnValue('1');
    const { container } = render(
      <QueryPagination
        totalPages={5}
        className='custom-class'
      />
    );

    const paginationElement = container.querySelector('.custom-class');
    expect(paginationElement).toBeInTheDocument();
  });
});
