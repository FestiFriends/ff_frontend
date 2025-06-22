import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import GroupCard from '@/components/common/GroupCard/GroupCard';
import Modal from '@/components/common/Modal/Modal';
import ModalAction from '@/components/common/Modal/ModalAction';
import ModalCancel from '@/components/common/Modal/ModalCancel';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalTrigger from '@/components/common/Modal/ModalTrigger';
import Toast from '@/components/common/Toast/Toast';
import {
  useGetJoinedGroups,
  useLeaveGroup,
} from '@/hooks/groupsManagementsHooks/groupsManagementsHooks';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
import { formatJoinedGroups } from '@/utils/formatGroupCardData';
import JoinedGroupsSkeleton from './JoinedGroupsSkeleton';

const JoinedGroups = () => {
  const router = useRouter();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { mutateAsync: leaveGroup } = useLeaveGroup();
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useGetJoinedGroups();
  const [isToastOpen, setIsToastOpen] = useState(false);

  const groups =
    data && data?.pages.flatMap((page) => formatJoinedGroups(page.data));

  const activeGroups = groups?.filter((group) => {
    if (!group.endDate) return true;
    return new Date(group.endDate) >= new Date();
  });

  const bottomRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  if (isPending && !data) {
    return <JoinedGroupsSkeleton />;
  }

  const handleButtonClick = (
    groupId: string,
    isHost: boolean,
    memberCount: number
  ) => {
    if (!isHost || memberCount === 1) {
      setSelectedGroupId(groupId);
      triggerRef.current?.click();
    }
  };

  const handleModalConfirm = async () => {
    if (selectedGroupId) {
      const res = await leaveGroup({ groupId: selectedGroupId });
      if (res.code === 200) {
        setIsToastOpen(true);
      }
    }
  };

  if (isPending && !data) {
    return (
      <div className='flex flex-col items-center gap-5 px-4'>
        <JoinedGroupsSkeleton />
      </div>
    );
  }

  //TODO: 데이터 없을 때 빈 화면 추가
  if (activeGroups?.length === 0) {
    return (
      <div className='flex h-full items-center justify-center'>
        <p>참가 중인 모임이 없습니다.</p>
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
      {activeGroups?.map((group) => (
        <GroupCard
          key={group.id}
          groupData={group}
          buttonText='모임 탈퇴'
          {...(group.isHost
            && group.memberCount > 1 && {
              buttonColor: 'disable',
              buttonDisabled: true,
            })}
          onCardClick={() => router.push(`/groups/${group.id}`)}
          onButtonClick={() =>
            handleButtonClick(group.id, group.isHost, group.memberCount)
          }
        />
      ))}

      {hasNextPage && (
        <>
          {isFetchingNextPage && <JoinedGroupsSkeleton />}
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
            모임을 탈퇴하시겠습니까?
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

      {isToastOpen && (
        <Toast
          message='모임 탈퇴가 완료되었습니다'
          onClose={() => setIsToastOpen(false)}
        />
      )}
    </div>
  );
};
export default JoinedGroups;
