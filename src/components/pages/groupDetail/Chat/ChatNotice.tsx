'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import MegaphoneIcon from '@/components/icons/MegaphoneIcon';

const id = 'post123';
const content =
  '하고 싶은 곡 여기 댓글에 달아주세요~\n(라이브나 공연영상 등 참고 영상 링크 다셔도 좋습니당)\n\n<4월까지 인당 1곡 이상>';

const ChatNotice = () => {
  const router = useRouter();
  const { groupId } = useParams<{ groupId: string }>();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotice = () => {
    setIsOpen((prev) => !prev);
  };

  const routeToPost = (postId: string) => {
    router.push(`/groups/${groupId}/posts/${postId}`);
  };

  return (
    <div className='rounded-[12px] bg-primary-100 px-4.5 py-2.5'>
      <div className='flex items-start justify-between gap-2'>
        <div className='flex flex-1 items-start gap-2 overflow-hidden'>
          <MegaphoneIcon className='aspect-square h-5 w-5 shrink-0 text-primary-red' />
          <button
            onClick={() => routeToPost(id)}
            className={`text-left text-16_B leading-normal tracking-[-0.4px] text-gray-950 ${
              isOpen
                ? 'whitespace-pre-line'
                : 'line-clamp-1 overflow-hidden text-ellipsis'
            }`}
          >
            {content}
          </button>
        </div>

        <button onClick={toggleNotice}>
          <ChevronDownIcon
            className={`aspect-square h-5 w-5 shrink-0 text-gray-950 transition-all ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ChatNotice;
