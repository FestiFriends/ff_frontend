import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import NavLink from './NavLink';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('<Link>컴포넌트 테스트', () => {
  test('활성 상태일 경우 activeClassName이 적용되고 aria-current="page"가 설정된다', () => {
    (usePathname as jest.Mock).mockReturnValue('/about');
    render(
      <NavLink
        href='/about'
        activeClassName='active'
      >
        About
      </NavLink>
    );
    const link = screen.getByRole('link', { name: 'About' });
    expect(link).toHaveClass('active');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  test('end 옵션이 true일 때 경로 끝 일치만 활성으로 간주', () => {
    (usePathname as jest.Mock).mockReturnValue('/about/abc');
    render(
      <>
        <NavLink
          href='/about'
          activeClassName='active'
          end
        >
          About
        </NavLink>
        <NavLink
          href='/abc'
          activeClassName='active'
          end
        >
          Abc
        </NavLink>
      </>
    );
    const link = screen.getByRole('link', { name: 'About' });
    expect(link).not.toHaveClass('active');
    expect(link).not.toHaveAttribute('aria-current', 'page');

    const abcLink = screen.getByRole('link', { name: 'Abc' });
    expect(abcLink).toHaveClass('active');
    expect(abcLink).toHaveAttribute('aria-current', 'page');
  });

  test('isActive가 true일경우 항상 활성화 한다', () => {
    (usePathname as jest.Mock).mockReturnValue('/somewhere');
    render(
      <NavLink
        href='/about'
        activeClassName='active'
        isActive
        end
      >
        About
      </NavLink>
    );
    const link = screen.getByRole('link', { name: 'About' });
    expect(link).toHaveClass('active');
    expect(link).toHaveAttribute('aria-current', 'page');
  });
});
