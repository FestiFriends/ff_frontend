'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import CreateReportModal from '@/components/common/CreateReportModal/CreateReportModal';
import Modal from '@/components/common/Modal/Modal';
import ModalAction from '@/components/common/Modal/ModalAction';
import ModalCancel from '@/components/common/Modal/ModalCancel';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalTrigger from '@/components/common/Modal/ModalTrigger';
import MoreDropdown from '@/components/common/MoreDropdown/MoreDropdown';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useDeletePost, usePinPost } from '@/hooks/postHooks/postHook';
import { ReportTarget } from '@/types/enums';
import { Post } from '@/types/post';
import { formatPostDate } from '@/utils/date';

interface PostCardProps {
  post: Post;
  type?: 'posts' | 'detail';
  children?: React.ReactNode;
}

const PostCard = ({ post, type = 'posts', children }: PostCardProps) => {
  const {
    content,
    isPinned = false,
    imageCount,
    images,
    author,
    createdAt,
    isMine,
    id,
    groupId,
  } = post;

  const { profileImage, name } = author ?? {};
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reportTriggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [selectedPostId, setSelectedPostId] = useState<string>('');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const { mutate: deletePost } = useDeletePost();
  const { mutate: pinPost } = usePinPost();

  const baseItems = isMine
    ? [
        {
          label: '수정하기',
          onClick: () => router.push(`/groups/${groupId}/posts/${id}/edit`),
        },
        {
          label: '삭제하기',
          onClick: () => {
            setSelectedGroupId(groupId);
            setSelectedPostId(id);
            triggerRef.current?.click();
          },
        },
      ]
    : [
        {
          label: '신고하기',
          onClick: () => handleReportPost(),
        },
      ];

  const moreDropdownItems = [
    ...baseItems,
    isPinned
      ? {
          label: '고정 해제',
          onClick: () => {
            setSelectedGroupId(groupId);
            setSelectedPostId(id);
            pinPost({ groupId, postId: id, isPinned: false });
          },
        }
      : {
          label: '상단 고정',
          onClick: () => {
            setSelectedGroupId(groupId);
            setSelectedPostId(id);
            pinPost({ groupId, postId: id, isPinned: true });
          },
        },
  ];

  const handlePostClick = () => {
    if (type === 'posts') {
      router.push(`/groups/${groupId}/posts/${id}`);
    }
  };

  const handleReportPost = () => {
    reportTriggerRef.current?.click();
  };

  const handleModalConfirm = () => {
    deletePost({ groupId: selectedGroupId, postId: selectedPostId });
    router.replace(`/groups/${groupId}`);
  };

  return (
    <div className='w-full'>
      <div
        className={`flex w-full flex-col gap-5 bg-white pt-6 ${
          type === 'posts'
            ? 'rounded-2xl border border-gray-100 px-6'
            : 'border-b border-b-gray-100'
        }`}
      >
        <div className='flex w-full flex-col gap-3.5'>
          <div className='relative flex items-start justify-between'>
            <div className='flex items-center gap-2.5'>
              <button
                type='button'
                onClick={() => router.push(`/profiles/${author.id}`)}
              >
                <ProfileImage
                  size='sm'
                  border={false}
                  {...(profileImage
                    && profileImage.src && {
                      src: profileImage.src.toString(),
                    })}
                />
              </button>

              <div className='flex flex-col items-start gap-1'>
                <button
                  type='button'
                  onClick={() => router.push(`/profiles/${author.id}`)}
                  className='text-left'
                >
                  <span className='line-clamp-1 text-14_B text-gray-950'>
                    {name}
                  </span>
                </button>
                <div className='flex items-center gap-1 text-13_M text-gray-500'>
                  <span>{formatPostDate(createdAt)}</span>
                  {isPinned && <span>· 공지</span>}
                </div>
              </div>
            </div>
            <MoreDropdown items={moreDropdownItems} />
          </div>
          <div
            className='flex flex-col gap-5'
            role='button'
            aria-label='게시글 상세 이동'
            tabIndex={0}
            onClick={handlePostClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handlePostClick();
            }}
          >
            <div className='text-base whitespace-pre-wrap text-gray-950'>
              {content}
            </div>
            {imageCount > 1 && type === 'posts' ? (
              <Carousel
                data-testid='carousel'
                className='relative mx-auto w-full'
              >
                <CarouselContent className='flex items-center'>
                  {Array.from(images ?? [], (img) => (
                    <CarouselItem key={img.id}>
                      <Image
                        src={img.src}
                        alt={img.alt || '첨부 이미지'}
                        width={0}
                        height={0}
                        sizes='100vw'
                        className='h-auto w-full object-contain'
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className='left-0.5' />
                <CarouselNext className='right-0.5' />
              </Carousel>
            ) : (
              <div className='flex w-full flex-col gap-2.5'>
                {Array.from(images ?? [], (img) => (
                  <Image
                    key={img.id}
                    src={img.src}
                    alt={img.alt || '첨부 이미지'}
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='h-auto w-full object-contain'
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='flex h-11 items-center justify-between gap-3.5 border-t border-gray-100 text-sm text-gray-500'>
          {children}
        </div>
      </div>

      <Modal>
        <ModalTrigger>
          <button
            ref={triggerRef}
            className='hidden'
          ></button>
        </ModalTrigger>
        <ModalContent className='flex w-[343px] flex-col rounded-2xl bg-white p-5 pt-11'>
          <p className='mb-[30px] flex w-full justify-center text-16_B text-black'>
            게시글을 삭제하시겠습니까?
          </p>
          <div className='flex w-full justify-between gap-2.5'>
            <ModalCancel className='w-1/2'>
              <Button variant='secondary'>아니요</Button>
            </ModalCancel>
            <ModalAction className='w-1/2'>
              <Button
                onClick={() => {
                  handleModalConfirm();
                }}
              >
                네
              </Button>
            </ModalAction>
          </div>
        </ModalContent>
      </Modal>

      <CreateReportModal
        targetId={author.id || ''}
        category={ReportTarget.POST}
      >
        <button
          ref={reportTriggerRef}
          className='hidden'
        ></button>
      </CreateReportModal>
    </div>
  );
};
export default PostCard;
