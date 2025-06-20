'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import MegaphoneIcon from '@/components/icons/MegaphoneIcon';
import { useGetGroupPosts } from '@/hooks/groupHooks/groupHooks';
import { cn } from '@/lib/utils';

interface PostNoticeProps {
  className?: string;
}

const PostNotice = ({ className }: PostNoticeProps) => {
  const { groupId } = useParams<{ groupId: string }>();
  const { data: posts } = useGetGroupPosts({ groupId });
  const [isOpen, setIsOpen] = useState(false);

  if (posts?.posts.length === 0 || !posts?.posts[0].isPinned) {
    return null;
  }

  const toggleNotice = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={cn('relative mb-11', className)}>
      <div className='absolute top-0 z-1 w-full rounded-[12px] bg-primary-100 px-4.5 py-2.5'>
        <div className='flex items-start justify-between gap-2'>
          <div className='flex w-full flex-1 items-start gap-2 overflow-hidden'>
            <MegaphoneIcon className='aspect-square h-5 w-5 shrink-0 text-primary-red' />
            <div
              className={`text-left text-16_B leading-normal tracking-[-0.4px] text-gray-950 ${
                isOpen
                  ? 'whitespace-pre-line'
                  : 'line-clamp-1 overflow-hidden text-ellipsis'
              }`}
            >
              <Link href={`/groups/${groupId}/posts/${posts?.posts[0].id}`}>
                {posts?.posts[0].content}
              </Link>
            </div>
          </div>

          <button onClick={toggleNotice}>
            <ChevronDownIcon
              className={`aspect-square h-5 w-5 shrink-0 cursor-pointer text-gray-950 transition-all ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostNotice;
