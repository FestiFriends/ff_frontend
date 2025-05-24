import { render, screen } from '@testing-library/react';
import Poster from './Poster';

describe('Poster', () => {
  test('이미지와 컨테이너가 렌더링 되어야한다', () => {
    render(<Poster src='/poster.jpg' />);
    const image = screen.getByAltText('포스터 이미지');
    expect(image).toBeInTheDocument();
  });
});

test('alt props가 전달되면 해당 텍스트로 렌더링되어야 한다', () => {
  render(
    <Poster
      src='/poster.jpg'
      alt='테스트 이미지'
    />
  );
  const image = screen.getByAltText('테스트 이미지');
  expect(image).toBeInTheDocument();
});

test('shadow가 false일 때 shadow 클래스가 없어야 한다', () => {
  const { container } = render(
    <Poster
      src='/poster.jpg'
      shadow={false}
    />
  );
  const wrapper = container.firstChild as HTMLElement;
  expect(wrapper.className).not.toContain('shadow-md');
});

test('border가 false일 때 border 클래스가 없어야 한다', () => {
  const { container } = render(
    <Poster
      src='/poster.jpg'
      border={false}
    />
  );
  const wrapper = container.firstChild as HTMLElement;
  expect(wrapper.className).not.toContain('border');
});

test.each([
  ['sm', 'w-20 h-28'],
  ['md', 'w-28 h-40'],
  ['lg', 'w-40 h-56'],
  ['xl', 'w-52 h-72'],
])(
  'size props를 받으면 해당 클래스가 포함되어야 한다',
  (size, expectedClass) => {
    const { container } = render(
      <Poster
        src='/poster.jpg'
        size={size as any}
      />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain(expectedClass);
  }
);

test('className props가 전달되면 해당 클래스가 포함되어야 한다', () => {
  const { container } = render(
    <Poster
      src='/poster.jpg'
      className='custom-class'
    />
  );
  const wrapper = container.firstChild as HTMLElement;
  expect(wrapper.className).toContain('custom-class');
});
