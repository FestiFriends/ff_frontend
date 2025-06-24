'use client';

import StateNotice from '@/components/common/StateNotice/StateNotice';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetUserId } from '@/hooks/userHooks/userHooks';
import { GroupInfo } from '@/types/group';
import PostNotice from '../PostNotice/PostNotice';
import ChatArea from './ChatArea';
import ChatInfo from './ChatInfo';

const hasNotice = true;

interface ChatProps {
  groupInfo?: GroupInfo;
}

const Chat = ({ groupInfo }: ChatProps) => {
  const { data: userId, isPending, isError } = useGetUserId();

  if (isPending)
    return (
      <div className='flex flex-col gap-3.5 px-4'>
        <Skeleton className='h-[10vh]' />
        <Skeleton className='h-[50dvh]' />
      </div>
    );

  if (isError || !userId || !groupInfo?.isMember) {
    return (
      <div className='flex h-full items-center justify-center py-20'>
        <StateNotice
          message='채팅 접근 권한이 없습니다.'
          height='100%'
        />
      </div>
    );
  }

  return (
    <div className='px-4 pt-4 pb-6'>
      <div className='flex flex-col rounded-[16px] bg-[#fffcfc] px-4 py-4 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.16)]'>
        <ChatInfo groupInfo={groupInfo} />
        {hasNotice && <PostNotice className='mt-3.5' />}
        <ChatArea
          userId={userId.data?.userId}
          chatRoomId={groupInfo?.chatRoomId}
        />
      </div>
    </div>
  );
};

export default Chat;
