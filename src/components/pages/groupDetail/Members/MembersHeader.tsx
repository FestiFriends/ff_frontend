import { ReactNode, RefObject } from 'react';
import { InfiniteList } from '@/components/common';
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalTrigger,
} from '@/components/common/Modal';
import { Skeleton } from '@/components/ui/skeleton';
import { infiniteGroupMembersOptions } from '@/hooks/groupHooks/groupHooks';
import { GetGroupMembersFormattedResponse } from '@/types/group';
import MemberCard from './MemberCard';

interface MembersHeaderProps {
  groupId: string;
  memberCount?: number;
  isHost?: boolean;
  modalTriggerRef: RefObject<HTMLButtonElement | null>;
}

const MembersHeader = ({
  groupId,
  memberCount,
  isHost,
  modalTriggerRef,
}: MembersHeaderProps) => (
  <div className='flex justify-between'>
    <span className='text-16_B leading-normal tracking-[-0.4px] text-gray-950'>
      멤버 <span>{memberCount ? memberCount : '0'}</span>명
    </span>

    <Modal>
      <ModalTrigger>
        <button ref={modalTriggerRef}>
          <span
            className='text-sm leading-normal font-medium tracking-[-0.35px] text-gray-500 underline decoration-solid decoration-1 underline-offset-auto'
            style={{
              textDecorationSkipInk: 'none',
              textUnderlinePosition: 'from-font',
            }}
          >
            더보기
          </span>
        </button>
      </ModalTrigger>
      <ModalContent className='relative scrollbar-hide h-full w-full rounded-[16px] p-5'>
        <ModalClose className='sticky top-0 right-0 mb-4 ml-auto block' />
        <InfiniteList<
          GetGroupMembersFormattedResponse,
          GetGroupMembersFormattedResponse['data'][number]
        >
          options={infiniteGroupMembersOptions(groupId, 20)}
          getDataId={(member) => member.memberId}
          renderData={(member): ReactNode => (
            <MemberCard
              member={member}
              isHost={isHost}
            />
          )}
          fallback={<Skeleton className='mt-5 h-20 w-full rounded-[16px]' />}
          isFetchingFallback={
            <Skeleton className='mt-5 h-20 w-full rounded-[16px]' />
          }
          className='flex flex-col gap-5'
        />
      </ModalContent>
    </Modal>
  </div>
);

export default MembersHeader;
