import { render } from '@testing-library/react';
import defaultProfileImg from '@/assets/ico__profileDefault.png';
import ProfileImage from './ProfileImage';

describe('ProfileImage 컴포넌트', () => {
  test('기본 이미지가 렌더링되어야 한다', () => {
    const { getByAltText } = render(<ProfileImage />);
    const image = getByAltText('프로필 이미지') as HTMLImageElement;

    const renderedUrl = new URL(image.src).searchParams.get('url');
    expect(renderedUrl).toBe(defaultProfileImg.src);
  });

  test('커스텀 이미지 src가 적용되어야 한다', () => {
    const customSrc = '/custom.png';
    const { getByAltText } = render(<ProfileImage src={customSrc} />);
    const image = getByAltText('프로필 이미지') as HTMLImageElement;

    expect(decodeURIComponent(image.src)).toContain(customSrc);
  });

  test('size props에 따라 클래스가 적용되어야 한다', () => {
    const { container } = render(<ProfileImage size='lg' />);
    expect(container.firstChild).toHaveClass('w-16', 'h-16');
  });

  test('rounded=false일 경우 둥근 스타일이 적용되지 않아야 한다', () => {
    const { container } = render(<ProfileImage rounded={false} />);
    expect(container.firstChild).toHaveClass('rounded-md');
  });

  test('border=false일 경우 테두리 클래스가 없어야 한다', () => {
    const { container } = render(<ProfileImage border={false} />);
    expect(container.firstChild).not.toHaveClass('border');
  });
});

test('지원되지 않는 size는 기본 md 크기로 설정되어야 한다', () => {
  const { container } = render(<ProfileImage size={'xxl' as any} />);
  expect(container.firstChild).toHaveClass('w-12', 'h-12');
});
