'use client';

import { ReactNode, useEffect, useState } from 'react';
import {
  Button,
  LoadingOverlay,
  TextareaInput,
  Toast,
} from '@/components/common';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@/components/common/Dropdown';
import {
  Modal,
  ModalAction,
  ModalCancel,
  ModalContent,
  ModalTrigger,
} from '@/components/common/Modal';
import { ReportReasonLabels } from '@/constants/reportLabels';
import { useImageUploader } from '@/hooks';
import { usePostReport } from '@/hooks/reportHooks';
import { useUploadMultipleFiles } from '@/hooks/useGetPresignedUrl';
import { ReportReasonType, ReportTargetType } from '@/types/enums';
import { Image } from '@/types/image';
import { CreateReportRequest } from '@/types/report';
import ImageUpload from './ImageUpload';

const REPORT_REASON = Object.entries(ReportReasonLabels).map(
  ([key, value]) => ({
    key: key as ReportReasonType,
    value,
  })
);

interface CreateReportModalProps {
  targetId: string;
  category: ReportTargetType;
  children: ReactNode;
}

const CreateReportModal = ({
  targetId,
  category,
  children,
}: CreateReportModalProps) => {
  const [data, setData] = useState<CreateReportRequest>({
    targetId,
    category,
    reason: undefined,
    snapshots: [],
    details: '',
  });

  const { images, upload, remove, reset } = useImageUploader('multi');
  const {
    mutateAsync: imageMutate,
    isPending: imageIsPending,
    error: imageError,
  } = useUploadMultipleFiles();
  const {
    mutateAsync: reportMutate,
    isPending: reportIsPending,
    error: reportError,
  } = usePostReport();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');

  type UpdateField = 'reason' | 'snapshots' | 'details';

  const handleSetData = (
    field: UpdateField,
    value: CreateReportRequest[UpdateField]
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    let snapshotsData: Image[] = [];
    if (images.length > 0) {
      await imageMutate(
        images.map((image) => image.file),
        {
          onSuccess: (urls) => {
            snapshotsData = urls.map((url) => ({
              src: url,
              alt: '신고 이미지',
            }));
          },
        }
      );
    }

    const submitData: CreateReportRequest = {
      ...data,
      snapshots: snapshotsData,
    };
    const message = (await reportMutate(submitData)).message;
    setShowToast(true);
    setMessage(message);
    console.log(message);
    handleReset();
    reset();
  };

  const handleReset = () => {
    setData((prev) => ({
      ...prev,
      details: '',
      reason: undefined,
      snapshots: [],
    }));
  };

  useEffect(() => {
    if (imageError) {
      setShowToast(true);
      setMessage(imageError.message);
      handleReset();
      reset();
    }
  }, [imageError]);

  useEffect(() => {
    if (reportError) {
      setShowToast(true);
      setMessage(reportError.message);
      handleReset();
      reset();
    }
  }, [reportError]);

  return (
    <>
      {showToast && (
        <Toast
          message={message}
          type={reportError || imageError ? 'error' : 'success'}
          onClose={() => setShowToast(false)}
          className='bottom-4 left-1/2 w-fit -translate-x-1/2'
        />
      )}
      <Modal disableBackdropClose>
        <ModalTrigger>{children}</ModalTrigger>

        <ModalContent className='w-4/5 rounded-12 p-5'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-14_B'>신고 사유를 선택해 주세요.(필수)</h2>
              <Dropdown>
                <DropdownTrigger
                  placeholder='신고 사유'
                  className='w-full rounded-full bg-gray-25 px-2 py-1'
                />
                <DropdownContent>
                  {REPORT_REASON.map((reason) => (
                    <DropdownItem
                      key={reason.key}
                      label={reason.value}
                      onClick={() => handleSetData('reason', reason.key)}
                    >
                      {reason.value}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            </div>

            <div className='flex flex-col gap-1'>
              <h2 className='text-14_B'>신고 상세 내용을 작성해주세요.</h2>
              <TextareaInput
                value={data.details || ''}
                onChange={(v) => handleSetData('details', v)}
                maxLength={200}
                className='h-[100px]'
                placeholder='상세 내용을 작성해주세요'
              />
            </div>

            <div>
              <ImageUpload
                images={images}
                upload={upload}
                remove={remove}
                reset={reset}
              />
            </div>

            <div className='flex gap-3'>
              <ModalCancel>
                <Button
                  variant='secondary'
                  type='button'
                  onClick={handleReset}
                  disabled={imageIsPending || reportIsPending}
                >
                  취소
                </Button>
              </ModalCancel>
              <ModalAction>
                <Button
                  onClick={handleSubmit}
                  disabled={imageIsPending || reportIsPending || !data.reason}
                >
                  확인
                </Button>
              </ModalAction>
            </div>
          </div>
          {(imageIsPending || reportIsPending) && (
            <LoadingOverlay style={{ height: '100%' }} />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateReportModal;
