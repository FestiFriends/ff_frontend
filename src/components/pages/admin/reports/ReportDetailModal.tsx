import React, { ReactNode, useState } from 'react';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { LoadingOverlay } from '@/components/common';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import ModalAction from '@/components/common/Modal/ModalAction';
import ModalCancel from '@/components/common/Modal/ModalCancel';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalTrigger from '@/components/common/Modal/ModalTrigger';
import {
  reportDetailOption,
  usePatchReport,
} from '@/hooks/reportHooks/reportHooks';
import { ReportAction } from '@/types/report';
import ReportDetailCard from './ReportDetailCard';

interface ReportDetailModalProps {
  reportId: string;
  children: ReactNode;
}

const ReportDetailModal = ({ reportId, children }: ReportDetailModalProps) => {
  const [status, setStatus] = useState<ReportAction['reportStatus']>();
  const { mutateAsync, isPending } = usePatchReport();

  const handleStatus = (action: ReportAction['reportStatus']) => {
    setStatus(action);
  };

  const handleSubmit = async () => {
    if (status && !isPending) {
      await mutateAsync({ id: reportId, action: status });
    }
  };

  return (
    <>
      <Modal disableBackdropClose>
        <ModalTrigger>{children}</ModalTrigger>
        <ModalContent className='w-4/5 rounded-12 p-4'>
          <div className='flex flex-col gap-2'>
            <ErrorBoundary fallback={({ error }) => <p>{error.message}</p>}>
              <Suspense fallback={<LoadingOverlay />}>
                <SuspenseQuery {...reportDetailOption(reportId)}>
                  {({ data }) => (
                    <ReportDetailCard
                      report={data.data}
                      onStatus={handleStatus}
                    />
                  )}
                </SuspenseQuery>
              </Suspense>
            </ErrorBoundary>
            <div className='flex gap-3'>
              <ModalCancel disabled={isPending}>
                <Button variant='secondary'>취소</Button>
              </ModalCancel>
              <ModalAction>
                <Button
                  disabled={!status || isPending}
                  onClick={handleSubmit}
                >
                  확인
                </Button>
              </ModalAction>
            </div>
          </div>
          {isPending && <LoadingOverlay style={{ height: '100%' }} />}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportDetailModal;
