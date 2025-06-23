import React from 'react';
import { TwoButton } from '@/components/common';
import { buttonStyles } from '@/components/common';
import { Modal, ModalTrigger, ModalContent } from '@/components/common/Modal';
import { useModalContext } from '@/components/common/Modal/ModalContext';
import BottomSheetContent from './BottomSheetContent';

interface TwoButtonControl {
  leftText: string;
  rightText: string;
  leftAction?: () => void;
  rightAction?: () => void;
  leftVariant?: keyof typeof buttonStyles.variants;
  rightVariant?: keyof typeof buttonStyles.variants;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
}

interface Props {
  children: React.ReactNode;
  trigger: React.ReactNode;
  title?: string;
  height?: 'half' | 'full' | 'auto';
  className?: string;
  disableBackdropClose?: boolean;
  hasHandle?: boolean;
  hasClose?: boolean;
  controlType?: 'none' | 'headerControl' | 'bottomControl';
  twoButtonProps?: TwoButtonControl;
}

const BottomSheetModalContent: React.FC<{
  children: React.ReactNode;
  title?: string;
  height: 'half' | 'full' | 'auto';
  className: string;
  disableBackdropClose: boolean;
  hasHandle: boolean;
  hasClose: boolean;
  controlType: 'none' | 'headerControl' | 'bottomControl';
  twoButtonProps?: TwoButtonControl;
}> = ({
  children,
  title,
  height,
  className,
  disableBackdropClose,
  hasHandle,
  hasClose,
  controlType,
  twoButtonProps,
}) => {
  const { closeModal } = useModalContext();

  const handleRightAction = () => {
    twoButtonProps?.rightAction?.();
    closeModal();
  };

  return (
    <>
      <BottomSheetContent
        title={title}
        height={height}
        className={className}
        disableBackdropClose={disableBackdropClose}
        hasHandle={hasHandle}
        hasClose={controlType === 'headerControl' ? true : hasClose}
      >
        <div className='flex h-full flex-col'>
          {controlType === 'headerControl' && twoButtonProps && (
            <div className='mb-4 px-4 pt-4'>
              <TwoButton
                leftText={twoButtonProps.leftText}
                rightText={twoButtonProps.rightText}
                leftAction={twoButtonProps.leftAction}
                rightAction={handleRightAction}
                leftVariant={twoButtonProps.leftVariant}
                rightVariant={twoButtonProps.rightVariant}
                leftDisabled={twoButtonProps.leftDisabled}
                rightDisabled={twoButtonProps.rightDisabled}
              />
            </div>
          )}

          <div className='flex-1'>{children}</div>

          {controlType === 'bottomControl' && twoButtonProps && (
            <div className='mt-4 px-4 pb-4'>
              <TwoButton
                leftText={twoButtonProps.leftText}
                rightText={twoButtonProps.rightText}
                leftAction={twoButtonProps.leftAction}
                rightAction={handleRightAction}
                leftVariant={twoButtonProps.leftVariant}
                rightVariant={twoButtonProps.rightVariant}
                leftDisabled={twoButtonProps.leftDisabled}
                rightDisabled={twoButtonProps.rightDisabled}
              />
            </div>
          )}
        </div>
      </BottomSheetContent>
    </>
  );
};

const BottomSheetModal: React.FC<Props> = ({
  children,
  trigger,
  title,
  height = 'half',
  className = '',
  disableBackdropClose = false,
  hasHandle = true,
  hasClose = true,
  controlType = 'none',
  twoButtonProps,
}) => (
  <Modal disableBackdropClose={true}>
    <ModalTrigger>{trigger}</ModalTrigger>
    <ModalContent
      restoreDialogStyle={true}
      className=''
    >
      <BottomSheetModalContent
        title={title}
        height={height}
        className={className}
        disableBackdropClose={disableBackdropClose}
        hasHandle={hasHandle}
        hasClose={hasClose}
        controlType={controlType}
        twoButtonProps={twoButtonProps}
      >
        {children}
      </BottomSheetModalContent>
    </ModalContent>
  </Modal>
);

export type { Props as BottomSheetModalProps };
export default BottomSheetModal;
