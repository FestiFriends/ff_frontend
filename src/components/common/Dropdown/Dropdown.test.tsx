import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Dropdown from './Dropdown';
import DropdownContent from './DropdownContent';
import { useDropdownContext } from './DropdownContext';
import DropdownItem from './DropdownItem';
import DropdownTrigger from './DropdownTrigger';

const renderDropdown = () => {
  render(
    <div>
      <Dropdown>
        <DropdownTrigger placeholder='선택하세요' />
        <DropdownContent>
          <DropdownItem label='옵션 레이블 1'>옵션 1</DropdownItem>
          <DropdownItem label='옵션 레이블 2'>옵션 2</DropdownItem>
        </DropdownContent>
      </Dropdown>
      <div data-testid='outside'>외부</div>
    </div>
  );
};

const getTrigger = () => screen.getByRole('button');

describe('Dropdown 컴포넌트 테스트', () => {
  describe('기본 동작 테스트', () => {
    test('트리거 클릭 시 드롭다운 콘텐츠가 나타나고 사라진다', () => {
      renderDropdown();
      const trigger = getTrigger();

      expect(screen.queryByText('옵션 1')).not.toBeInTheDocument();

      fireEvent.click(trigger);
      expect(screen.getByText('옵션 1')).toBeInTheDocument();

      fireEvent.click(trigger);
      expect(screen.queryByText('옵션 1')).not.toBeInTheDocument();
    });

    test('드롭다운 아이템 클릭 시 선택한 아이템의 label값이 트리거에 표시된다', () => {
      renderDropdown();
      fireEvent.click(getTrigger());
      fireEvent.click(screen.getByText('옵션 2'));

      expect(
        screen.getByRole('button', { name: '옵션 레이블 2' })
      ).toBeInTheDocument();
    });

    test('isStatic props가 있으면 label값이 트리거에 표시되지 않는다', () => {
      render(
        <div>
          <Dropdown>
            <DropdownTrigger
              isStatic
              placeholder='선택하세요'
            >
              스태틱
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem label='옵션 레이블 1'>옵션 1</DropdownItem>
              <DropdownItem label='옵션 레이블 2'>옵션 2</DropdownItem>
            </DropdownContent>
          </Dropdown>
          <div data-testid='outside'>외부</div>
        </div>
      );

      fireEvent.click(getTrigger());
      fireEvent.click(screen.getByText('옵션 2'));
      expect(
        screen.getByRole('button', { name: '스태틱' })
      ).toBeInTheDocument();
    });

    test('onClick 함수가 props로 있는 아이템 클릭 시 onClick 함수가 실행된다', () => {
      const handleClick = jest.fn();
      render(
        <div>
          <Dropdown>
            <DropdownTrigger
              isStatic
              placeholder='선택하세요'
            />
            <DropdownContent>
              <DropdownItem label='옵션 레이블 1'>옵션 1</DropdownItem>
              <DropdownItem
                label='옵션 레이블 2'
                onClick={handleClick}
              >
                옵션 2
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
          <div data-testid='outside'>외부</div>
        </div>
      );

      fireEvent.click(getTrigger());
      fireEvent.click(screen.getByText('옵션 2'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('드롭다운이 열릴 때 선택된 드롭다운 아이템에 포커스가 간다', () => {
      renderDropdown();
      fireEvent.click(getTrigger());
      fireEvent.click(screen.getByText('옵션 2'));
      fireEvent.click(getTrigger());

      expect(screen.getByText('옵션 2')).toHaveFocus();
    });
  });

  describe('키보드 접근성 테스트', () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
      renderDropdown();
      user = userEvent.setup();
    });

    test('Tab으로 트리거에 포커스 후 Enter로 드롭다운을 열 수 있다', async () => {
      await user.tab();
      expect(getTrigger()).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(screen.getByText('옵션 1')).toBeInTheDocument();
    });

    test('Tab으로 드롭다운 아이템에 접근하고 Enter로 선택할 수 있다', async () => {
      await user.tab();
      await user.keyboard('{Enter}');
      await user.tab();
      await user.keyboard('{Enter}');

      expect(getTrigger()).toHaveTextContent('옵션 레이블 1');
    });

    test('Space 키로도 드롭다운을 열고 선택할 수 있다', async () => {
      await user.tab();
      await user.keyboard(' ');
      expect(screen.getByText('옵션 2')).toBeInTheDocument();

      await user.tab();
      await user.tab();
      await user.keyboard(' ');

      expect(getTrigger()).toHaveTextContent('옵션 레이블 2');
    });
  });

  describe('Dropdown에서 useClickOutside 동작 테스트', () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
      renderDropdown();
      user = userEvent.setup();
    });

    test('외부 클릭 시 드롭다운이 닫힌다', async () => {
      await user.click(getTrigger());
      expect(screen.getByText('옵션 1')).toBeInTheDocument();

      await user.click(screen.getByTestId('outside'));
      expect(screen.queryByText('옵션 1')).not.toBeInTheDocument();
    });

    test('외부 터치 시 드롭다운이 닫힌다', async () => {
      await user.click(getTrigger());
      expect(screen.getByText('옵션 1')).toBeInTheDocument();

      fireEvent.touchStart(screen.getByTestId('outside'));
      expect(screen.queryByText('옵션 1')).not.toBeInTheDocument();
    });

    test('Escape 키 입력 시 드롭다운이 닫힌다', async () => {
      await user.click(getTrigger());
      expect(screen.getByText('옵션 2')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      expect(screen.queryByText('옵션 2')).not.toBeInTheDocument();
    });
  });

  describe('useDropdownContext 예외 테스트', () => {
    beforeEach(() => renderDropdown());

    test('DropdownContext.Provider 외부에서 호출 시 에러를 던진다', () => {
      expect(() => {
        renderHook(() => useDropdownContext());
      }).toThrowError('Dropdown 컴포넌트 내부에서만 사용할 수 있습니다.');
    });
  });
});
