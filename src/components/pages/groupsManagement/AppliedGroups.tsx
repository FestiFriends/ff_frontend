import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import ModalAction from '@/components/common/Modal/ModalAction';
import ModalCancel from '@/components/common/Modal/ModalCancel';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalTrigger from '@/components/common/Modal/ModalTrigger';
import Toast from '@/components/common/Toast/Toast';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useCancelApplication,
  useConfirmApplication,
  useGetAppliedGroups,
} from '@/hooks/groupsManagementsHooks/groupsManagementsHooks';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
import { ApplicationStatus, ApplicationStatusType } from '@/types/enums';
import { formatAppliedGroups } from '@/utils/formatApplicationData';
import AppliedGroup from './AppliedGroup/AppliedGroup';
import AppliedGroupsSkeleton from './AppliedGroupsSkeleton';

const AppliedGroups = () => {
  const router = useRouter();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { mutate: cancelApplication } = useCancelApplication();
  const { mutate: confirmApplication } = useConfirmApplication();
  const [showToast, setShowToast] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] =
    useState<string>('');

  const primaryText = (status: ApplicationStatusType) =>
    status === ApplicationStatus.ACCEPTED ? '참가 확정' : '신청 취소';

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useGetAppliedGroups();

  const groups =
    data && data?.pages.flatMap((page) => formatAppliedGroups(page.data));

  const bottomRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  const routeToGroupPage = (groupId: string) => {
    router.push(`/groups/${groupId}`);
  };

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

  if (isPending && !data) {
    return <AppliedGroupsSkeleton />;
  }

  //TODO: 데이터 없을 때 빈 화면 추가
  if (groups?.length === 0) {
    return (
      <div className='flex h-full items-center justify-center'>
        <p>신청한 모임이 없습니다.</p>
      </div>
    );
  }

  if (error || data?.pages[0]?.data?.code !== 200) {
    return (
      <div className='flex h-full items-center justify-center'>
        <p>{error?.message || data?.pages[0]?.data?.message}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center gap-5 px-4'>
      {groups?.map((group) => (
        <AppliedGroup
          key={group.applicationId}
          applicationData={group}
          primaryButtonText={primaryText(group.status)}
          onCardClick={() => routeToGroupPage(group.groupId)}
          onPrimaryClick={() =>
            handlePrimaryClick(group.applicationId, group.status)
          }
          {...(group.status === ApplicationStatus.ACCEPTED && {
            secondaryButtonText: '신청 취소',
            onSecondaryClick: () => handleSecondaryClick(group.applicationId),
          })}
        />
      ))}

      {hasNextPage && (
        <>
          {isFetchingNextPage && (
            // TODO: 다음 꺼 스켈레톤
            <Skeleton className='h-10 w-full rounded-[16px]' />
          )}
          <div
            ref={bottomRef}
            className='h-10'
          />
        </>
      )}

      <Modal>
        <ModalTrigger>
          <button
            ref={triggerRef}
            className='hidden'
          ></button>
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
