import React, { useRef, useState } from 'react';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import ModalAction from '@/components/common/Modal/ModalAction';
import ModalCancel from '@/components/common/Modal/ModalCancel';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalTrigger from '@/components/common/Modal/ModalTrigger';
import Toast from '@/components/common/Toast/Toast';
import { GROUPS_MANAGEMENTS_QUERY_KEYS } from '@/constants/queryKeys';
import {
  useCancelApplication,
  useConfirmApplication,
} from '@/hooks/groupsManagementsHooks/groupsManagementsHooks';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
import { groupsManagementsApi } from '@/services/groupsManagementsService';
import { ApiResponse } from '@/types/api';
import { ApplicationStatus } from '@/types/enums';
import {
  AppliedGroupsApiResponse,
  formatAppliedGroups,
} from '@/utils/formatApplicationCardData';
import ApplicationCard from './ApplicationCard/ApplicationCard';

const size = 20;

const AppliedGroups = () => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { mutate: cancelApplication } = useCancelApplication();
  const { mutate: confirmApplication } = useConfirmApplication();
  const [showToast, setShowToast] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] =
    useState<string>('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      AxiosResponse<AppliedGroupsApiResponse>,
      ApiResponse,
      InfiniteData<AxiosResponse<AppliedGroupsApiResponse>>,
      string[],
      number | undefined
    >({
      queryKey: [GROUPS_MANAGEMENTS_QUERY_KEYS.appliedGroups],
      queryFn: ({ pageParam }) =>
        groupsManagementsApi.getAppliedGroups({ cursorId: pageParam, size }),
      getNextPageParam: (lastPage) =>
        lastPage.data?.hasNext ? lastPage.data?.cursorId : undefined,
      initialPageParam: undefined,
    });

  const bottomRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  const handlePrimaryClick = (applicationId: string, status: string) => {
    if (status === ApplicationStatus.ACCEPTED) {
      confirmApplication({ applicationId });
      setShowToast(true);
    } else {
      setSelectedApplicationId(applicationId);
      triggerRef.current?.click();
    }
  };

  const handleSecondaryClick = (applicationId: string) => {
    setSelectedApplicationId(applicationId);
    triggerRef.current?.click();
  };

  const handleModalConfirm = () => {
    if (selectedApplicationId) {
      cancelApplication({ applicationId: selectedApplicationId });
    }
  };

  type ApplicationStatus =
    (typeof ApplicationStatus)[keyof typeof ApplicationStatus];

  const primaryText = (status: ApplicationStatus) =>
    status === ApplicationStatus.ACCEPTED ? '참가 확정' : '신청 취소';

  return (
    <div className='flex flex-col items-center gap-5 px-4'>
      {data?.pages.flatMap((page) =>
        formatAppliedGroups(page.data).map((group) => (
          <ApplicationCard
            key={group.applicationId}
            applicationData={group}
            primaryButtonText={primaryText(group.status)}
            onPrimaryClick={() =>
              handlePrimaryClick(group.applicationId, group.status)
            }
            {...(group.status === ApplicationStatus.ACCEPTED && {
              secondaryButtonText: '신청 취소',
              onSecondaryClick: () => handleSecondaryClick(group.applicationId),
            })}
          />
        ))
      )}
      {hasNextPage && (
        <div
          ref={bottomRef}
          className='h-10'
        />
      )}
      <Modal>
        <ModalTrigger>
          <button ref={triggerRef}></button>
        </ModalTrigger>
        <ModalContent className='flex w-[343px] flex-col rounded-2xl bg-white p-5 pt-11'>
          <p className='mb-[30px] flex w-full justify-center text-16_B text-black'>
            신청을 취소하시겠습니까?
          </p>
          <div className='flex w-full justify-between gap-2.5'>
            <ModalCancel className='w-1/2'>
              <Button variant='secondary'>아니요</Button>
            </ModalCancel>
            <ModalAction className='w-1/2'>
              <Button onClick={handleModalConfirm}>네</Button>
            </ModalAction>
          </div>
        </ModalContent>
      </Modal>

      {showToast && (
        <Toast
          message='참가 확정되었습니다'
          onClose={() => setShowToast(false)}
          className='bottom-4 left-1/2 -translate-x-1/2'
        />
      )}
    </div>
  );
};

export default AppliedGroups;
