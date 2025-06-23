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

const JoinedGroups = () => {
  const router = useRouter();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { mutateAsync: leaveGroup } = useLeaveGroup();
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useGetJoinedGroups();
  const [isToastOpen, setIsToastOpen] = useState(false);

  const bottomRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  if (isPending) return <div className='mx-auto w-fit'>로딩 중...</div>;

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
