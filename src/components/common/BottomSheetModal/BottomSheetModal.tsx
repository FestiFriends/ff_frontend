import { Modal, ModalTrigger, ModalContent } from '@/components/common/Modal';
import BottomSheetContent from './BottomSheetContent';

interface Props {
  children: React.ReactNode;
  trigger: React.ReactNode;
  title?: string;
  height?: 'half' | 'full' | 'auto';
  className?: string;
  disableBackdropClose?: boolean;
  hasHandle?: boolean;
  hasClose?: boolean;
}

const BottomSheetModal: React.FC<Props> = ({
  children,
  trigger,
  title,
  height = 'half',
  className = '',
  disableBackdropClose = false,
  hasHandle = true,
  hasClose = true,
}) => (
  <Modal disableBackdropClose={true}>
    <ModalTrigger>{trigger}</ModalTrigger>
    <ModalContent
      restoreDialogStyle={true}
      className=''
    >
      <BottomSheetContent
        title={title}
        height={height}
        className={className}
        disableBackdropClose={disableBackdropClose}
        hasHandle={hasHandle}
        hasClose={hasClose}
      >
        {children}
      </BottomSheetContent>
    </ModalContent>
  </Modal>
);

export type { Props as BottomSheetModalProps };
export default BottomSheetModal;
