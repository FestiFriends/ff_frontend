import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RadioGroup from './RadioGroup';
import RadioGroupItem from './RadioGroupItem';

const TestRadioGroup = ({
  value,
  onChange,
  direction = 'vertical',
  disabled = false,
}: {
  value?: string;
  onChange?: (value: string) => void;
  direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
}) => (
  <RadioGroup
    value={value}
    onChange={onChange}
    direction={direction}
  >
    <RadioGroupItem
      value='option1'
      label='옵션 1'
      disabled={disabled}
    />
    <RadioGroupItem
      value='option2'
      label='옵션 2'
    />
    <RadioGroupItem
      value='option3'
      label='옵션 3'
    >
      커스텀 라벨
    </RadioGroupItem>
  </RadioGroup>
);

describe('RadioGroup', () => {
  describe('기본 렌더링', () => {
    it('라디오 그룹이 올바르게 렌더링된다', () => {
      render(<TestRadioGroup />);

      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
      expect(screen.getByLabelText('옵션 1')).toBeInTheDocument();
      expect(screen.getByLabelText('옵션 2')).toBeInTheDocument();
      expect(screen.getByLabelText('커스텀 라벨')).toBeInTheDocument();
    });

    it('모든 라디오 버튼이 같은 name 속성을 가진다', () => {
      render(<TestRadioGroup />);

      const radioButtons = screen.getAllByRole('radio');
      const firstName = radioButtons[0].getAttribute('name');

      radioButtons.forEach((radio) => {
        expect(radio).toHaveAttribute('name', firstName);
      });
    });

    it('초기값이 없을 때 아무것도 선택되지 않는다', () => {
      render(<TestRadioGroup />);

      const radioButtons = screen.getAllByRole('radio');
      radioButtons.forEach((radio) => {
        expect(radio).not.toBeChecked();
      });
    });
  });

  describe('선택 상태 관리', () => {
    it('초기값이 설정되면 해당 옵션이 선택된다', () => {
      render(<TestRadioGroup value='option2' />);

      expect(screen.getByLabelText('옵션 1')).not.toBeChecked();
      expect(screen.getByLabelText('옵션 2')).toBeChecked();
      expect(screen.getByLabelText('커스텀 라벨')).not.toBeChecked();
    });

    it('라디오 버튼 클릭 시 onChange가 호출된다', async () => {
      const user = userEvent.setup();
      const mockOnChange = jest.fn();

      render(<TestRadioGroup onChange={mockOnChange} />);

      await user.click(screen.getByLabelText('옵션 2'));

      expect(mockOnChange).toHaveBeenCalledWith('option2');
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('다른 옵션 선택 시 이전 선택이 해제된다', async () => {
      const user = userEvent.setup();
      const mockOnChange = jest.fn();

      render(
        <TestRadioGroup
          value='option1'
          onChange={mockOnChange}
        />
      );

      expect(screen.getByLabelText('옵션 1')).toBeChecked();

      await user.click(screen.getByLabelText('옵션 2'));

      expect(mockOnChange).toHaveBeenCalledWith('option2');
    });
  });

  describe('키보드 접근성', () => {
    it('Enter 키로 라디오 버튼을 선택할 수 있다', () => {
      const mockOnChange = jest.fn();
      render(<TestRadioGroup onChange={mockOnChange} />);

      const radio = screen.getByLabelText('옵션 2');
      radio.focus();
      fireEvent.keyDown(radio, { key: 'Enter' });

      expect(mockOnChange).toHaveBeenCalledWith('option2');
    });

    it('Space 키로 라디오 버튼을 선택할 수 있다', () => {
      const mockOnChange = jest.fn();
      render(<TestRadioGroup onChange={mockOnChange} />);

      // 'option3' value를 가진 라디오 버튼을 직접 찾아서 키보드 이벤트 발생
      const radio = screen.getByDisplayValue('option3');
      radio.focus();
      fireEvent.keyDown(radio, { key: ' ' });

      expect(mockOnChange).toHaveBeenCalledWith('option3');
    });

    it('다른 키는 무시된다', () => {
      const mockOnChange = jest.fn();
      render(<TestRadioGroup onChange={mockOnChange} />);

      const radio = screen.getByLabelText('옵션 1');
      radio.focus();
      fireEvent.keyDown(radio, { key: 'a' });

      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  describe('비활성화 상태', () => {
    it('비활성화된 라디오 버튼은 클릭할 수 없다', async () => {
      const user = userEvent.setup();
      const mockOnChange = jest.fn();

      render(
        <TestRadioGroup
          onChange={mockOnChange}
          disabled={true}
        />
      );

      const disabledRadio = screen.getByLabelText('옵션 1');
      expect(disabledRadio).toBeDisabled();

      await user.click(disabledRadio);
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('비활성화된 라디오 버튼은 키보드로 선택할 수 없다', () => {
      const mockOnChange = jest.fn();
      render(
        <TestRadioGroup
          onChange={mockOnChange}
          disabled={true}
        />
      );

      const disabledRadio = screen.getByLabelText('옵션 1');
      fireEvent.keyDown(disabledRadio, { key: 'Enter' });

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('비활성화된 요소에 올바른 스타일 클래스가 적용된다', () => {
      render(<TestRadioGroup disabled={true} />);

      const disabledLabel = screen.getByLabelText('옵션 1').closest('label');
      expect(disabledLabel).toHaveClass('cursor-not-allowed', 'opacity-60');
    });
  });

  describe('커스텀 props', () => {
    it('커스텀 className이 적용된다', () => {
      render(
        <RadioGroup className='custom-class'>
          <RadioGroupItem
            value='test'
            label='테스트'
          />
        </RadioGroup>
      );

      expect(screen.getByRole('radiogroup')).toHaveClass('custom-class');
    });

    it('커스텀 name이 적용된다', () => {
      render(
        <RadioGroup name='custom-name'>
          <RadioGroupItem
            value='test'
            label='테스트'
          />
        </RadioGroup>
      );

      expect(screen.getByRole('radio')).toHaveAttribute('name', 'custom-name');
    });

    it('RadioGroupItem에 커스텀 className이 적용된다', () => {
      render(
        <RadioGroup>
          <RadioGroupItem
            value='test'
            label='테스트'
            className='custom-item-class'
          />
        </RadioGroup>
      );

      const label = screen.getByLabelText('테스트').closest('label');
      expect(label).toHaveClass('custom-item-class');
    });

    it('RadioGroupItem에 커스텀 labelClassName이 적용된다', () => {
      render(
        <RadioGroup>
          <RadioGroupItem
            value='test'
            label='테스트'
            labelClassName='custom-label-class'
          />
        </RadioGroup>
      );

      const span = screen.getByText('테스트');
      expect(span).toHaveClass('custom-label-class');
    });
  });

  describe('children vs label', () => {
    it('children이 있으면 label 대신 children이 렌더링된다', () => {
      render(
        <RadioGroup>
          <RadioGroupItem
            value='test'
            label='원래 라벨'
          >
            커스텀 children
          </RadioGroupItem>
        </RadioGroup>
      );

      expect(screen.getByText('커스텀 children')).toBeInTheDocument();
      expect(screen.queryByText('원래 라벨')).not.toBeInTheDocument();
      // value로 라디오 버튼을 찾을 수 있는지 확인
      expect(screen.getByDisplayValue('test')).toBeInTheDocument();
    });

    it('children이 없으면 label이 렌더링된다', () => {
      render(
        <RadioGroup>
          <RadioGroupItem
            value='test'
            label='원래 라벨'
          />
        </RadioGroup>
      );

      expect(screen.getByText('원래 라벨')).toBeInTheDocument();
      expect(screen.getByDisplayValue('test')).toBeInTheDocument();
    });
  });

  describe('방향 설정', () => {
    it('horizontal 방향이 올바르게 설정된다', () => {
      render(<TestRadioGroup direction='horizontal' />);

      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveStyle('grid-auto-flow: column');
    });

    it('vertical 방향이 기본값으로 설정된다', () => {
      render(<TestRadioGroup />);

      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveStyle('grid-template-columns: 1fr');
    });
  });
});

describe('RadioGroupContext', () => {
  it('RadioGroup 외부에서 RadioGroupItem 사용 시 에러가 발생한다', () => {
    // 콘솔 에러를 숨김
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      render(
        <RadioGroupItem
          value='test'
          label='테스트'
        />
      );
    }).toThrow('RadioGroupItem은 RadioGroup 내부에서만 사용할 수 있습니다.');

    consoleSpy.mockRestore();
  });
});
