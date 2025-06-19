import { ReactNode } from 'react';
import { Button } from '@/components/common';
import {
  Modal,
  ModalAction,
  ModalCancel,
  ModalContent,
  ModalTrigger,
} from '@/components/common/Modal';

interface DrawModalProps {
  children: ReactNode;
  onAction: () => void;
}

const DrawModal = ({ children, onAction }: DrawModalProps) => (
  <Modal>
    <ModalTrigger>{children}</ModalTrigger>
    <ModalContent className='rounded-12 p-4'>
      <div className='flex flex-col gap-4'>
        <p className='text-16_B whitespace-nowrap'>
          정말로 회원 탈퇴하시겠습니까?
        </p>
        <div className='flex gap-2'>
          <ModalCancel>
            <Button variant='secondary'>취소</Button>
          </ModalCancel>
          <ModalAction>
            <Button onClick={onAction}>확인</Button>
          </ModalAction>
        </div>
      </div>
    </ModalContent>
  </Modal>
);

export default DrawModal;
