import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonGroup, ButtonGroupItem } from './ButtonGroup';
import MESSAGE from './ButtonGroupMessage';

interface TestButtonGruopProps {
  mode?: 'single' | 'multiple';
  maxSelections?: number;
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
}

const TestButtonGroup = ({
  mode = 'single',
  maxSelections,
  defaultValue,
  onChange = jest.fn(),
}: TestButtonGruopProps) => (
  <ButtonGroup
    mode={mode}
    maxSelections={maxSelections}
    defaultValue={defaultValue}
    onChange={onChange}
  >
    <ButtonGroupItem
      value='option1'
      data-testid='option1'
    >
      Option 1
    </ButtonGroupItem>
    <ButtonGroupItem
      value='option2'
      data-testid='option2'
    >
      Option 2
    </ButtonGroupItem>
    <ButtonGroupItem
      value='option3'
      data-testid='option3'
    >
      Option 3
    </ButtonGroupItem>
  </ButtonGroup>
);

const ControlledButtonGroup = () => {
  const [value, setValue] = useState<string>('');

  return (
    <div>
      <ButtonGroup
        mode='single'
        value={value}
        onChange={(v) => setValue(v as string)}
      >
        <ButtonGroupItem
          value='controlled1'
          data-testid='controlled1'
        >
          Controlled 1
        </ButtonGroupItem>
        <ButtonGroupItem
          value='controlled2'
          data-testid='controlled2'
        >
          Controlled 2
        </ButtonGroupItem>
      </ButtonGroup>
      <div data-testid='current-value'>{value}</div>
    </div>
  );
};

describe('ButtonGroup', () => {
  describe('단일 선택 모드', () => {
    it('하나의 버튼만 선택할 수 있다', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <TestButtonGroup
          mode='single'
          onChange={onChange}
        />
      );

      const option1 = screen.getByTestId('option1');
      const option2 = screen.getByTestId('option2');

      await user.click(option1);
      expect(onChange).toHaveBeenCalledWith('option1');
      expect(option1).toHaveAttribute('aria-pressed', 'true');

      await user.click(option2);
      expect(onChange).toHaveBeenCalledWith('option2');
      expect(option1).toHaveAttribute('aria-pressed', 'false');
      expect(option2).toHaveAttribute('aria-pressed', 'true');
    });

    it('선택된 버튼을 다시 클릭하면 선택이 해제된다', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <TestButtonGroup
          mode='single'
          onChange={onChange}
        />
      );

      const option1 = screen.getByTestId('option1');

      await user.click(option1);
      expect(onChange).toHaveBeenCalledWith('option1');

      await user.click(option1);
      expect(onChange).toHaveBeenCalledWith('');
      expect(option1).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('다중 선택 모드', () => {
    it('여러 버튼을 선택할 수 있다', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <TestButtonGroup
          mode='multiple'
          onChange={onChange}
        />
      );

      const option1 = screen.getByTestId('option1');
      const option2 = screen.getByTestId('option2');

      await user.click(option1);
      expect(onChange).toHaveBeenCalledWith(['option1']);

      await user.click(option2);
      expect(onChange).toHaveBeenCalledWith(['option1', 'option2']);

      expect(option1).toHaveAttribute('aria-pressed', 'true');
      expect(option2).toHaveAttribute('aria-pressed', 'true');
    });

    it('선택된 버튼을 다시 클릭하면 해당 선택만 해제된다', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <TestButtonGroup
          mode='multiple'
          onChange={onChange}
        />
      );

      const option1 = screen.getByTestId('option1');
      const option2 = screen.getByTestId('option2');

      await user.click(option1);
      await user.click(option2);

      await user.click(option1);

      expect(onChange).toHaveBeenCalledWith(['option2']);
      expect(option1).toHaveAttribute('aria-pressed', 'false');
      expect(option2).toHaveAttribute('aria-pressed', 'true');
    });

    it('최대 선택 개수를 제한할 수 있다', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <TestButtonGroup
          mode='multiple'
          maxSelections={2}
          onChange={onChange}
        />
      );

      const option1 = screen.getByTestId('option1');
      const option2 = screen.getByTestId('option2');
      const option3 = screen.getByTestId('option3');

      await user.click(option1);
      await user.click(option2);

      await user.click(option3);

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(option3).toHaveAttribute('aria-pressed', 'false');
      expect(option3).toBeDisabled();
    });
  });

  describe('제어/비제어 컴포넌트', () => {
    it('defaultValue로 초기값을 설정할 수 있다', () => {
      render(
        <TestButtonGroup
          mode='single'
          defaultValue='option2'
        />
      );

      const option2 = screen.getByTestId('option2');
      expect(option2).toHaveAttribute('aria-pressed', 'true');
    });

    it('제어 컴포넌트로 동작한다', async () => {
      const user = userEvent.setup();

      render(<ControlledButtonGroup />);

      const controlled1 = screen.getByTestId('controlled1');
      const currentValue = screen.getByTestId('current-value');

      expect(currentValue).toHaveTextContent('');

      await user.click(controlled1);
      expect(currentValue).toHaveTextContent('controlled1');
      expect(controlled1).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('비활성화 상태', () => {
    it('개별 버튼을 비활성화할 수 있다', () => {
      render(
        <ButtonGroup>
          <ButtonGroupItem
            value='normal'
            data-testid='normal'
          >
            Normal
          </ButtonGroupItem>
          <ButtonGroupItem
            value='disabled'
            disabled
            data-testid='disabled'
          >
            Disabled
          </ButtonGroupItem>
        </ButtonGroup>
      );

      const normalButton = screen.getByTestId('normal');
      const disabledButton = screen.getByTestId('disabled');

      expect(normalButton).not.toBeDisabled();
      expect(disabledButton).toBeDisabled();
    });

    it('전체 ButtonGroup을 비활성화할 수 있다', () => {
      render(
        <ButtonGroup disabled>
          <ButtonGroupItem
            value='option1'
            data-testid='option1'
          >
            Option 1
          </ButtonGroupItem>
          <ButtonGroupItem
            value='option2'
            data-testid='option2'
          >
            Option 2
          </ButtonGroupItem>
        </ButtonGroup>
      );

      const option1 = screen.getByTestId('option1');
      const option2 = screen.getByTestId('option2');

      expect(option1).toBeDisabled();
      expect(option2).toBeDisabled();
    });
  });

  describe('커스텀 onClick 핸들러', () => {
    it('ButtonGroupItem의 onClick이 호출된다', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();

      render(
        <ButtonGroup>
          <ButtonGroupItem
            value='test'
            onClick={onClick}
            data-testid='test'
          >
            Test
          </ButtonGroupItem>
        </ButtonGroup>
      );

      const testButton = screen.getByTestId('test');
      await user.click(testButton);

      expect(onClick).toHaveBeenCalledWith('test');
    });
  });

  describe('에러 처리', () => {
    it(MESSAGE.NOT_IN_BUTTON_GROUP, () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(<ButtonGroupItem value='test'>Test</ButtonGroupItem>);
      }).toThrow(MESSAGE.NOT_IN_BUTTON_GROUP);

      consoleSpy.mockRestore();
    });
  });

  describe('접근성', () => {
    it('aria-pressed 속성이 올바르게 설정된다', async () => {
      const user = userEvent.setup();

      render(<TestButtonGroup mode='single' />);

      const option1 = screen.getByTestId('option1');

      expect(option1).toHaveAttribute('aria-pressed', 'false');

      await user.click(option1);
      expect(option1).toHaveAttribute('aria-pressed', 'true');
    });

    it('data-selected 속성이 올바르게 설정된다', async () => {
      const user = userEvent.setup();

      render(<TestButtonGroup mode='single' />);

      const option1 = screen.getByTestId('option1');

      expect(option1).toHaveAttribute('data-selected', 'false');

      await user.click(option1);
      expect(option1).toHaveAttribute('data-selected', 'true');
    });

    it('data-value 속성이 설정된다', () => {
      render(<TestButtonGroup />);

      const option1 = screen.getByTestId('option1');
      expect(option1).toHaveAttribute('data-value', 'option1');
    });
  });

  describe('키보드 네비게이션', () => {
    it('Enter 키로 버튼을 선택할 수 있다', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <TestButtonGroup
          mode='single'
          onChange={onChange}
        />
      );

      const option1 = screen.getByTestId('option1');
      option1.focus();

      await user.keyboard('{Enter}');
      expect(onChange).toHaveBeenCalledWith('option1');
    });

    it('Space 키로 버튼을 선택할 수 있다', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <TestButtonGroup
          mode='single'
          onChange={onChange}
        />
      );

      const option1 = screen.getByTestId('option1');
      option1.focus();

      await user.keyboard(' ');
      expect(onChange).toHaveBeenCalledWith('option1');
    });
  });

  describe('복잡한 시나리오', () => {
    it('다중 선택에서 배열 타입 defaultValue 처리', () => {
      render(
        <TestButtonGroup
          mode='multiple'
          defaultValue={['option1', 'option3']}
        />
      );

      const option1 = screen.getByTestId('option1');
      const option2 = screen.getByTestId('option2');
      const option3 = screen.getByTestId('option3');

      expect(option1).toHaveAttribute('aria-pressed', 'true');
      expect(option2).toHaveAttribute('aria-pressed', 'false');
      expect(option3).toHaveAttribute('aria-pressed', 'true');
    });

    it('최대 선택 개수에 도달했을 때 선택된 버튼은 해제 가능', async () => {
      const user = userEvent.setup();

      render(
        <TestButtonGroup
          mode='multiple'
          maxSelections={2}
          defaultValue={['option1', 'option2']}
        />
      );

      const option1 = screen.getByTestId('option1');
      const option3 = screen.getByTestId('option3');

      expect(option3).toBeDisabled();

      await user.click(option1);
      expect(option1).toHaveAttribute('aria-pressed', 'false');
      expect(option3).not.toBeDisabled();
    });
  });
});
