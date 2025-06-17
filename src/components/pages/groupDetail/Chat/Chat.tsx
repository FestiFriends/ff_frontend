'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useGetUserId } from '@/hooks/userHooks/userHooks';
import PostNotice from '../PostNotice/PostNotice';
import ChatArea from './ChatArea';
import ChatInfo from './ChatInfo';

const hasNotice = true;
const chatRoomId = 1;

const Chat = () => {
  const { data: userId, isPending, isError } = useGetUserId();

  if (isPending)
    return (
      <div className='flex flex-col gap-3.5 px-4'>
        <Skeleton className='h-[10vh]' />
        <Skeleton className='h-[50dvh]' />
      </div>
    );

  if (isError || !userId) {
    return (
      <div className='flex flex-col items-center justify-center px-4 py-5'>
        <p className='font-semibold text-gray-500'>
          채팅 접근 권한이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className='px-4'>
      <div className='flex flex-col rounded-[16px] bg-[#fffcfc] px-4 py-4 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.16)]'>
        <ChatInfo />
        {hasNotice && <PostNotice />}
        <ChatArea
          userId={userId.data?.userId}
          chatRoomId={chatRoomId}
        />
      </div>
    </div>
  );
};

export default Chat;
