'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import Toast from '@/components/common/Toast/Toast';
import PlusIcon from '@/components/icons/PlusIcon';
import { Summary, Tabs } from '@/components/pages/performanceDetail';
import { useGetPerformanceDetail } from '@/hooks/performanceHooks/performanceHooks';
import { useAuthStore } from '@/providers/AuthStoreProvider';

type PerformanceDetailWrapperProps = {
  performanceId: string;
};

const PerformanceDetailWrapper = ({
  performanceId,
}: PerformanceDetailWrapperProps) => {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedin);
  const [showToast, setShowToast] = useState(false);
  const {
    data: performanceDetail,
    isPending,
    isError,
  } = useGetPerformanceDetail(performanceId);

  const routeToCreateGroupPage = () => {
    if (!isLoggedIn) {
      setShowToast(true);
      return;
    }

    if (!isError && performanceDetail?.data) {
      router.push(`performances/${performanceDetail?.data?.id}/createGroup`);
    }
  };

  if (isError)
    return (
      <div className='flex h-[80dvh] flex-col items-center justify-center gap-2 px-4 py-5'>
        <p className='font-semibold text-gray-500'>존재하지 않는 공연입니다.</p>
      </div>
    );

  return (
    <>
      {showToast && (
        <Toast
          message='로그인이 필요합니다!'
          type='error'
          onClose={() => setShowToast(false)}
          className='bottom-4 left-1/2 -translate-x-1/2'
        />
      )}

      <div className='flex flex-col gap-3 bg-gray-25'>
        <Summary
          isPending={isPending}
          performanceDetail={performanceDetail?.data}
        />

        <Tabs
          isPending={isPending}
          performanceDetail={performanceDetail?.data}
        />

        <Button
          onClick={routeToCreateGroupPage}
          className='fixed right-4 bottom-23 z-2 w-fit min-w-30 gap-1 rounded-[100px] py-2.5 pr-4 pl-2.5'
        >
          <PlusIcon className='aspect-square h-6 w-6' />
          <span className='text-16_B leading-normal tracking-[-0.4px]'>
            모임 개설
          </span>
        </Button>
      </div>
    </>
  );
};

export default PerformanceDetailWrapper;
