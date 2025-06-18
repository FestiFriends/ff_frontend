'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/common/Toast/Toast';
import { Summary, Tabs } from '@/components/pages/performanceDetail';
import { useGetPerformanceDetail } from '@/hooks';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import CreateGroupButton from './CreateGroupButton';

type PerformanceDetailWrapperProps = {
  performanceId: string;
};

const PerformanceDetailWrapper = ({
  performanceId,
}: PerformanceDetailWrapperProps) => {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
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
      <div className='flex h-full flex-col items-center justify-center px-4 py-5'>
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

        <CreateGroupButton onClick={routeToCreateGroupPage} />
      </div>
    </>
  );
};

export default PerformanceDetailWrapper;
