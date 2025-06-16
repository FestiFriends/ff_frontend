'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import GroupCard from '@/components/common/GroupCard/GroupCard';
import Toast from '@/components/common/Toast/Toast';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import {
  formatPerformanceGroups,
  PerformanceGroupsApiResponse,
} from '@/utils/formatGroupCardData';
import GroupApplyModal from './GroupApplyModal';

interface PerformanceDetailGroupsListProps {
  isPending: boolean;
  groups?: PerformanceGroupsApiResponse;
}

const PerformanceDetailGroupsList = ({
  isPending,
  groups,
}: PerformanceDetailGroupsListProps) => {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedin);
  const [showToast, setShowToast] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');

  const routeToGroupPage = (groupId: string) => {
    router.push(`/groups/${groupId}`);
  };

  const onOpenApplyModal = (groupId: string) => {
    if (!isLoggedIn) {
      setShowToast(true);
      return;
    }

    if (groupId) {
      setSelectedGroupId(groupId);
      setIsOpen(true);
    }
  };

  if (isPending)
    return (
      <div className='flex flex-col gap-4'>
        <span className='text-14_M leading-normal tracking-[-0.35px] text-black'>
          총 모임{' '}
          <span className='text-14_B leading-normal tracking-[-0.35px] text-black'>
            0개
          </span>
        </span>
        <div className='flex flex-col gap-5'>
          <Skeleton className='h-[20vh] w-full' />
          <Skeleton className='h-[20vh] w-full' />
        </div>
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

      <div className='flex flex-col gap-4'>
        <span className='text-14_M leading-normal tracking-[-0.35px] text-black'>
          총 모임{' '}
          <span className='text-14_B leading-normal tracking-[-0.35px] text-black'>
            {groups?.data.groupCount}개
          </span>
        </span>

        <div className='flex flex-col gap-5'>
          {groups
            && formatPerformanceGroups(groups).map((group) => (
              <div key={group.id}>
                <GroupCard
                  onCardClick={() => routeToGroupPage(group.id)}
                  key={group.id}
                  groupData={group}
                  buttonText='참가 신청'
                  onButtonClick={() => onOpenApplyModal(group.id)}
                />
              </div>
            ))}

          {/* 모임 참가 신청 모달 */}
          <GroupApplyModal
            groupId={selectedGroupId}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setSelectedGroupId={setSelectedGroupId}
          />
        </div>
      </div>
    </>
  );
};

export default PerformanceDetailGroupsList;
