import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';
import ModalClose from './ModalClose';
import ModalContent from './ModalContent';
import { ModalContext } from './ModalContext';
import ModalTrigger from './ModalTrigger';

describe('<Modal>컴포넌트 테스트', () => {
  beforeAll(() => {
    if (!HTMLDialogElement.prototype.showModal) {
      HTMLDialogElement.prototype.showModal = function () {
        this.open = true;
      };
    }

    if (!HTMLDialogElement.prototype.close) {
      HTMLDialogElement.prototype.close = function () {
        this.open = false;
      };
    }

    const portal = document.createElement('div');
    portal.setAttribute('id', 'portal');
    document.body.appendChild(portal);
  });

  afterAll(() => {
    const portal = document.getElementById('portal');
    if (portal) {
      document.body.removeChild(portal);
    }
  });

  test('defaultOpen을 설정하지 않은 경우 초기에 닫힌 상태여야 한다', () => {
    render(
      <Modal>
        <ModalTrigger>열기</ModalTrigger>
        <ModalContent>내용</ModalContent>
      </Modal>
    );

    const content = screen.queryByText('내용');
    expect(content).not.toBeInTheDocument();
  });

  test('defaultOpen을 true로 설정한 경우 초기에 열린 상태여야 한다.', () => {
    render(
      <Modal defaultOpen>
        <ModalTrigger>열기</ModalTrigger>
        <ModalContent>내용</ModalContent>
      </Modal>
    );

    const content = screen.getByText('내용');
    expect(content).toBeInTheDocument();
  });

  test('<ModalTrigger> chilren에 ReactElement가 아닌 것이 들어오면 <button>으로 감싸져야 하며, 클릭시 열려야 한다.', async () => {
    render(
      <Modal defaultOpen>
        <ModalTrigger>열기</ModalTrigger>
        <ModalContent>내용</ModalContent>
      </Modal>
    );

    const triggerButton = screen.getByRole('button', { name: '모달 열기' });
    expect(triggerButton).toBeInTheDocument();
    expect(triggerButton).toHaveTextContent('열기');

    await userEvent.click(triggerButton);
    const content = screen.getByText('내용');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('내용');
  });

  test('<ModalTrigger> chilren에 ReactElement가 들어오면 <button>으로 감싸지지 않아야 하며, 클릭시 모달이 열려야 한다.', async () => {
    const mockFn = jest.fn();
    render(
      <Modal defaultOpen>
        <ModalTrigger>
          <div onClick={mockFn}>열기</div>
        </ModalTrigger>
        <ModalContent>내용</ModalContent>
      </Modal>
    );

    const triggerButton = screen.queryByRole('button', { name: '모달 열기' });
    expect(triggerButton).not.toBeInTheDocument();

    const triggerDiv = screen.getByLabelText('모달 열기');
    expect(triggerDiv).toBeInTheDocument();
    expect(triggerDiv).toHaveTextContent('열기');

    await userEvent.click(triggerDiv);
    const content = screen.getByText('내용');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('내용');
    expect(mockFn).toHaveBeenCalled();
  });

  test('open 상태에 따라 showModal/close 호출', async () => {
    render(
      <Modal>
        <ModalTrigger>열기</ModalTrigger>
        <ModalContent>
          내용
          <ModalClose />
        </ModalContent>
      </Modal>
    );

    const triggerButton = screen.getByRole('button', { name: '모달 열기' });
    await userEvent.click(triggerButton);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    const closeButton = screen.getByLabelText('모달 닫기');
    await userEvent.click(closeButton);

    expect(dialog).not.toBeInTheDocument();
  });

  test('disableBackdropClose가 false면 배경 클릭시 dialog.close 호출됨', async () => {
    const closeMock = jest.fn();
    HTMLDialogElement.prototype.close = closeMock;

    render(
      <Modal
        disableBackdropClose={false}
        defaultOpen
      >
        <ModalContent>내용</ModalContent>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    await userEvent.click(dialog);

    expect(closeMock).toHaveBeenCalled();
  });

  test('disableBackdropClose가 true면 배경 클릭시 dialog.close 무시됨', async () => {
    const closeMock = jest.fn();
    HTMLDialogElement.prototype.close = closeMock;

    render(
      <Modal
        disableBackdropClose
        defaultOpen
      >
        <ModalContent>내용</ModalContent>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    await userEvent.click(dialog);

    expect(closeMock).not.toHaveBeenCalled();
  });

  test('ModalClose 클릭 시 모달이 닫힌다', async () => {
    render(
      <Modal defaultOpen>
        <ModalContent>
          <div>내용</div>
          <ModalClose />
        </ModalContent>
      </Modal>
    );

    const closeButton = screen.getByLabelText('모달 닫기');
    await userEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('내용')).not.toBeInTheDocument();
    });
  });

  test('<ModalClose> chilren에 ReactElement가 들어오면 <button>으로 감싸지지 않아야 하며, 클릭시 모달이 닫혀야 한다.', async () => {
    const mockFn = jest.fn();
    render(
      <Modal defaultOpen>
        <ModalTrigger>열기</ModalTrigger>
        <ModalContent>
          내용
          <ModalClose>
            <div onClick={mockFn}>닫기</div>
          </ModalClose>
        </ModalContent>
      </Modal>
    );

    const triggerButton = screen.queryByRole('button', { name: '모달 닫기' });
    expect(triggerButton).not.toBeInTheDocument();

    const triggerDiv = screen.getByLabelText('모달 닫기');
    expect(triggerDiv).toBeInTheDocument();
    expect(triggerDiv).toHaveTextContent('닫기');

    await userEvent.click(triggerDiv);
    const content = screen.queryByText('내용');
    expect(content).not.toBeInTheDocument();
    expect(mockFn).toHaveBeenCalled();
  });

  test('children이 ReactElement이면 cloneElement로 감싼다', () => {
    const Child = () => <p>리액트 엘리먼트</p>;

    render(
      <Modal defaultOpen>
        <ModalContent>
          <Child />
        </ModalContent>
      </Modal>
    );

    expect(screen.getByText('리액트 엘리먼트')).toBeInTheDocument();
  });

  test('<Modal>과 관련된 컴포넌트를 단독으로 사용시 에러가 발생해야 한다.', () => {
    expect(() => {
      render(<ModalContent>콘텐츠</ModalContent>);
    }).toThrow(
      '<Modal>과 관련된 컴포넌트는 <Modal>컴포넌트 내부에서만 사용해야합니다!'
    );
  });

  test('handleClose 호출 시 onClose와 closeModal이 호출되어야 한다', () => {
    const onCloseMock = jest.fn();
    const closeModalMock = jest.fn();

    render(
      <ModalContext.Provider
        value={{
          open: true,
          openModal: jest.fn(),
          closeModal: closeModalMock,
          onClose: onCloseMock,
          disableBackdropClose: false,
        }}
      >
        <ModalContent>테스트</ModalContent>
      </ModalContext.Provider>
    );

    const dialog = document.querySelector('dialog')!;
    dialog.close();

    const event = new Event('close');
    dialog.dispatchEvent(event);

    expect(onCloseMock).toHaveBeenCalled();
    expect(closeModalMock).toHaveBeenCalled();
  });

  test('disableBackdropClose가 true일 경우 esc로 닫을 수 없다', async () => {
    render(
      <Modal
        defaultOpen
        disableBackdropClose
      >
        <ModalContent>콘텐츠</ModalContent>
      </Modal>
    );

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByText('콘텐츠')).toBeInTheDocument();
  });
});
