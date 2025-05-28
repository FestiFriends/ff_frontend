import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Popover from './Popover';
import PopoverTrigger from './PopoverTrigger';
import PopoverContent from './PopoverContent';

describe('Popover 컴포넌트 테스트', () => {
  test('초기에는 PopoverContent가 보이지 않아야 함', () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>열기</button>
        </PopoverTrigger>
        <PopoverContent>팝오버 내용</PopoverContent>
      </Popover>
    );

    expect(screen.queryByText('팝오버 내용')).not.toBeInTheDocument();
  });

  test('트리거 클릭 시 PopoverContent가 나타나야 함', () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>열기</button>
        </PopoverTrigger>
        <PopoverContent>팝오버 내용</PopoverContent>
      </Popover>
    );

    fireEvent.click(screen.getByText('열기'));
    expect(screen.getByText('팝오버 내용')).toBeInTheDocument();
  });

  test('다시 트리거 클릭 시 PopoverContent가 닫혀야 함', () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>열기</button>
        </PopoverTrigger>
        <PopoverContent>팝오버 내용</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText('열기');
    fireEvent.click(trigger);
    expect(screen.getByText('팝오버 내용')).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByText('팝오버 내용')).not.toBeInTheDocument();
  });

  test('팝오버 열림 상태에서 외부 클릭 시 닫혀야 함', () => {
    render(
      <div>
        <Popover>
          <PopoverTrigger>
            <button>열기</button>
          </PopoverTrigger>
          <PopoverContent>팝오버 내용</PopoverContent>
        </Popover>
        <div data-testid='outside'>외부</div>
      </div>
    );

    fireEvent.click(screen.getByText('열기'));
    expect(screen.getByText('팝오버 내용')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByText('팝오버 내용')).not.toBeInTheDocument();
  });

  test('direction이 top일 경우 위에 위치해야 함', () => {
    render(
      <Popover direction='top'>
        <PopoverTrigger>
          <button>열기</button>
        </PopoverTrigger>
        <PopoverContent>팝오버 내용</PopoverContent>
      </Popover>
    );

    fireEvent.click(screen.getByText('열기'));
    const content = screen.getByText('팝오버 내용');
    expect(content).toHaveClass('bottom-full left-1/2 -translate-x-1/2');
  });

  test('direction이 없거나 bottom일 경우 아래에 위치해야 함', () => {
    render(
      <Popover direction='bottom'>
        <PopoverTrigger>
          <button>열기</button>
        </PopoverTrigger>
        <PopoverContent>팝오버 내용</PopoverContent>
      </Popover>
    );

    fireEvent.click(screen.getByText('열기'));
    const content = screen.getByText('팝오버 내용');
    expect(content).toHaveClass('top-full left-1/2 -translate-x-1/2');
  });

  test('direction이 right일 경우 오른쪽에 위치해야 함', () => {
    render(
      <Popover direction='right'>
        <PopoverTrigger>
          <button>열기</button>
        </PopoverTrigger>
        <PopoverContent>팝오버 내용</PopoverContent>
      </Popover>
    );

    fireEvent.click(screen.getByText('열기'));
    const content = screen.getByText('팝오버 내용');
    expect(content).toHaveClass('top-1/2 left-full -translate-y-1/2');
  });

  test('direction이 left일 경우 왼쪽에 위치해야 함', () => {
    render(
      <Popover direction='left'>
        <PopoverTrigger>
          <button>열기</button>
        </PopoverTrigger>
        <PopoverContent>팝오버 내용</PopoverContent>
      </Popover>
    );

    fireEvent.click(screen.getByText('열기'));
    const content = screen.getByText('팝오버 내용');
    expect(content).toHaveClass('top-1/2 right-full -translate-y-1/2');
  });

  test('<PopoverContent>가 <Popover>외부에서 사용될 경우 오류를 발생시켜야 함', () => {
    const renderOutside = () =>
      render(
        <div>
          <PopoverContent>팝오버 내용</PopoverContent>
        </div>
      );

    expect(renderOutside).toThrow(
      '<Popover>와 관련된 컴포넌트는 <Popover>컴포넌트 내부에서만 사용해야합니다!'
    );
  });

  test('<PopoverTrigger>가 <Popover>외부에서 사용될 경우 오류를 발생시켜야 함', () => {
    const renderOutside = () =>
      render(
        <div>
          <PopoverTrigger>팝오버 열기</PopoverTrigger>
        </div>
      );

    expect(renderOutside).toThrow(
      '<Popover>와 관련된 컴포넌트는 <Popover>컴포넌트 내부에서만 사용해야합니다!'
    );
  });

  test('<PopoverTrigger> chilren에 ReactElement가 아닌 것이 들어오면 <button>으로 감싸져야 하며, 클릭시 열려야 한다.', async () => {
    render(
      <Popover>
        <PopoverTrigger>열기</PopoverTrigger>
        <PopoverContent>내용</PopoverContent>
      </Popover>
    );

    const triggerButton = screen.getByRole('button', { name: 'popover open' });
    expect(triggerButton).toBeInTheDocument();

    fireEvent.click(triggerButton);
    const content = screen.getByText('내용');
    expect(content).toBeInTheDocument();
  });

  test('<PopoverTrigger> chilren에 ReactElement가 들어오면 <button>으로 감싸지지 않아야 하며, 클릭시 모달이 열려야 한다.', async () => {
    const mockFn = jest.fn();
    render(
      <Popover>
        <PopoverTrigger>
          <div onClick={mockFn}>열기</div>
        </PopoverTrigger>
        <PopoverContent>내용</PopoverContent>
      </Popover>
    );

    const triggerButton = screen.queryByRole('button', {
      name: 'popover open',
    });
    expect(triggerButton).not.toBeInTheDocument();

    const triggerDiv = screen.getByLabelText('popover open');
    expect(triggerDiv).toBeInTheDocument();
    expect(triggerDiv).toHaveTextContent('열기');

    fireEvent.click(triggerDiv);
    const content = screen.getByText('내용');
    expect(content).toBeInTheDocument();
    expect(mockFn).toHaveBeenCalled();
  });
});
