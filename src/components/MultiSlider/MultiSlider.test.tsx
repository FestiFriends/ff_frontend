import { render, screen, fireEvent } from '@testing-library/react';
import MultiSlider from './MultiSlider';

describe('MultiSlider 컴포넌트 테스트', () => {
  test('두 개의 range input이 렌더링된다', () => {
    render(<MultiSlider />);
    const inputs = screen.getAllByRole('slider');
    expect(inputs).toHaveLength(2);
  });

  test('값이 변경될 때 onChange 콜백이 호출된다', () => {
    const handleChange = jest.fn();
    render(<MultiSlider onChange={handleChange} />);
    const [left] = screen.getAllByRole('slider');

    fireEvent.change(left, { target: { value: '30' } });

    expect(handleChange).toHaveBeenCalledWith([30, 100]);
  });

  test('props로 value를 주지 않으면 컴포넌트 내부에서 값을 제어한다', () => {
    render(<MultiSlider defaultValue={[10, 90]} />);
    const [left, right] = screen.getAllByRole('slider') as HTMLInputElement[];

    fireEvent.change(left, { target: { value: '20' } });
    fireEvent.change(right, { target: { value: '80' } });

    expect(left.value).toBe('20');
    expect(right.value).toBe('80');
  });

  test('props로 value를 주면 컴포넌트 외부에서 값을 제어한다', () => {
    render(<MultiSlider value={[20, 60]} />);
    const [left, right] = screen.getAllByRole('slider') as HTMLInputElement[];

    expect(left.value).toBe('20');
    expect(right.value).toBe('60');
  });

  test('defaultValue가 [큰값, 작은값]일 때 자동으로 [작은값, 큰값]으로 정렬해서 반영한다', () => {
    render(<MultiSlider defaultValue={[80, 20]} />);

    const thumbs = screen.getAllByText(/^\d+$/); // 숫자만 있는 span 2개

    const values = thumbs.map((el) => Number(el.textContent));
    expect(values).toEqual([20, 80]);
  });

  test('value prop이 [큰값, 작은값]일 때 자동으로 [작은값, 큰값]으로 정렬해서 반영한다', () => {
    render(
      <MultiSlider
        value={[90, 30]}
        onChange={() => {}}
      />
    );

    const thumbs = screen.getAllByText(/^\d+$/);

    const values = thumbs.map((el) => Number(el.textContent));
    expect(values).toEqual([30, 90]);
  });

  test('marks가 있으면 해당 라벨들이 렌더링된다', () => {
    render(<MultiSlider marks={{ 0: '0%', 50: '50%', 100: '100%' }} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  test('valuePosition이 top이면 thumbs 위에 값 라벨이 보인다', () => {
    render(
      <MultiSlider
        defaultValue={[15, 45]}
        valuePosition='top'
      />
    );
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('15')).toHaveClass('-top-full -translate-y-1/2');
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('45')).toHaveClass('-top-full -translate-y-1/2');
  });

  test('valuePosition이 bottom이면 thumbs 아래에 값 라벨이 보인다', () => {
    render(
      <MultiSlider
        defaultValue={[5, 6]}
        valuePosition='bottom'
      />
    );
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('5')).toHaveClass('-bottom-full translate-y-1/2');
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('6')).toHaveClass('-bottom-full translate-y-1/2');
  });

  test('valuePosition이 none이면 값 라벨이 보이지 않는다', () => {
    render(
      <MultiSlider
        defaultValue={[10, 30]}
        valuePosition='none'
      />
    );
    const valueLabels = screen.queryByLabelText('thumb-value');
    expect(valueLabels).not.toBeInTheDocument();
  });

  test('disabled 상태에서는 슬라이더 조작이 비활성화된다', () => {
    render(
      <MultiSlider
        defaultValue={[10, 90]}
        disabled
      />
    );
    const [left, right] = screen.getAllByRole('slider');

    expect(left).toBeDisabled();
    expect(right).toBeDisabled();
  });
});
