import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import ModalAction from '@/components/common/Modal/ModalAction';
import ModalCancel from '@/components/common/Modal/ModalCancel';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalTrigger from '@/components/common/Modal/ModalTrigger';
import SlideCard from '@/components/common/SlideCard/SlideCard';
import StateNotice from '@/components/common/StateNotice/StateNotice';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useGetApplications,
  usePatchApplication,
} from '@/hooks/groupsManagementsHooks/groupsManagementsHooks';
import { renderErrorNotice } from '@/hooks/useErrorNoticePreset/useErrorNoticePreset';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
import { ApplicationGroupInfo } from '@/types/application';
import { ApplicationStatus } from '@/types/enums';
import {
  ApplicationsApiResponse,
  extractGroupInfo,
  formatApplications,
} from '@/utils/formatApplicationData';
import ApplicationComponent from './Application/Application';
import ApplicationsSkeleton from './ApplicationsSkeleton';

const Applications = () => {
  const router = useRouter();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useGetApplications();
  const [actionType, setActionType] = useState<'accept' | 'reject' | null>(
    null
  );
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    string | null
  >(null);
  const { mutate: patchApplication } = usePatchApplication();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const bottomRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  const groups =
    data && formatApplications(data?.pages[0]?.data as ApplicationsApiResponse);

  const handleAcceptClick = (applicationId: string) => {
    setActionType('accept');
    setSelectedApplicationId(applicationId);
    triggerRef.current?.click();
  };

  const handleRejectClick = (applicationId: string) => {
    setActionType('reject');
    setSelectedApplicationId(applicationId);
    triggerRef.current?.click();
  };

  const handleConfirmModal = () => {
    if (!actionType || !selectedApplicationId) return;

    patchApplication({
      applicationId: selectedApplicationId,
      status:
        actionType === 'accept'
          ? ApplicationStatus.ACCEPTED
          : ApplicationStatus.REJECTED,
    });
    handleCancelModal();
  };

  const handleCancelModal = () => {
    setActionType(null);
    setSelectedApplicationId(null);
  };

  const handleCardClick = (groupId: string) => {
    router.push(`/groups/${groupId}`);
  };

  if (isPending && !data) {
    return <ApplicationsSkeleton />;
  }

  if (groups?.length === 0) {
    return (
      <div className='flex h-full items-center justify-center'>
        <StateNotice preset='applicationsEmpty' />
      </div>
    );
  }

  if (error) {
    return <div>{renderErrorNotice(error, '100%')}</div>;
  }

  return (
    <div className='flex flex-col items-center gap-5 px-4'>
      {groups?.map((item) => (
        <SlideCard
          onCardClick={() => handleCardClick(item.groupId)}
          key={item.groupId}
          type='application'
          groupInfo={extractGroupInfo(item) as ApplicationGroupInfo}
          content={
            item.applications.length > 0 ? (
              <>
                {item.applications.map((application, index) => (
                  <ApplicationComponent
                    key={application.applicationId}
                    applicationData={application}
                    primaryButtonText='수락'
                    secondaryButtonText='거절'
                    onPrimaryClick={() =>
                      handleAcceptClick(application.applicationId)
                    }
                    onSecondaryClick={() =>
                      handleRejectClick(application.applicationId)
                    }
                    className={
                      index !== item.applications.length - 1
                        ? 'border-b border-gray-200'
                        : 'pb-0'
                    }
                  />
                ))}
              </>
            ) : (
              <div
                className='flex items-center justify-center py-3 text-14_body_M text-gray-950'
                role='button'
                tabIndex={0}
                onKeyDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <p>받은 신청서가 없습니다.</p>
              </div>
            )
          }
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
            {actionType
              && `신청을 ${actionType === 'accept' ? '수락' : '거절'}하시겠습니까?`}
          </p>
          <div className='flex w-full justify-between gap-2.5'>
            <ModalCancel className='w-1/2'>
              <Button
                onClick={handleCancelModal}
                variant='secondary'
              >
                아니요
              </Button>
            </ModalCancel>
            <ModalAction className='w-1/2'>
              <Button onClick={handleConfirmModal}>네</Button>
            </ModalAction>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Applications;
