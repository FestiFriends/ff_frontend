import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import GroupCard from '@/components/common/GroupCard/GroupCard';
import Modal from '@/components/common/Modal/Modal';
import ModalAction from '@/components/common/Modal/ModalAction';
import ModalCancel from '@/components/common/Modal/ModalCancel';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalTrigger from '@/components/common/Modal/ModalTrigger';
import {
  useGetJoinedGroups,
  useLeaveGroup,
} from '@/hooks/groupsManagementsHooks/groupsManagementsHooks';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
import { formatJoinedGroups } from '@/utils/formatGroupCardData';

const JoinedGroups = () => {
  const router = useRouter();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { mutate: leaveGroup } = useLeaveGroup();
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useGetJoinedGroups();

  const bottomRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  if (isPending) return <div>Loading...</div>;

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
  const handleModalConfirm = () => {
    if (selectedGroupId) {
      leaveGroup({ groupId: selectedGroupId });
    }
  };

  return (
    <div className='flex flex-col items-center gap-5 px-4'>
      {data?.pages.flatMap((page) =>
        formatJoinedGroups(page.data).map((group) => (
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
    </div>
  );
};
export default JoinedGroups;
