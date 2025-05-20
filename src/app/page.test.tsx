import { render, screen } from '@testing-library/react';
import Home from './page';

test('메인 페이지가 제대로 렌더링되는지 테스트', () => {
  // 메인 페이지 렌더링
  render(<Home />);

  // "컴포넌트 테스트 연습하기" 텍스트를 가진 요소를 찾기
  const element = screen.getByText('hello');

  // 요소가 화면에 있는지 확인
  expect(element).toBeInTheDocument();
});
