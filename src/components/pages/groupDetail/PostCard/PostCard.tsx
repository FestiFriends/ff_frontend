'use client';

import React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import MoreDropdown from '@/components/common/MoreDropdown/MoreDropdown';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
  children: React.ReactNode;
}

const DATE_FORMAT = 'M월 d일 a hh:mm';

const PostCard = ({ post, children }: PostCardProps) => {
  const {
    // id,
    content,
    isPinned = false,
    imageCount,
    images,
    author,
    createdAt,
    isMine,
  } = post;

  const handlePostClick = () => {
    console.log('페이지 이동');
  };

  return (
    <div className='w-full px-4'>
      {/* 카드 테두리 */}
      <div className='flex w-full flex-col gap-5 rounded-2xl border border-gray-100 bg-white px-6 pt-6 pb-[10px]'>
        {/* 콘텐츠 영역 */}
        <div className='flex w-full flex-col gap-3.5'>
          {/* 게시글 정보 */}
          <div className='relative flex items-start justify-between'>
            <div className='flex items-center gap-2.5'>
              <ProfileImage
                size='sm'
                border={false}
                {...(author.profileImage && { src: author.profileImage })}
              />

              <div className='flex flex-col text-sm'>
                <span className='text-sm font-bold text-gray-950'>
                  {author.name}
                </span>
                {/* Todo : text 폰트 13이 없어서 커스텀 */}
                <div className='flex items-center gap-1 text-[13px] font-medium text-gray-500'>
                  <span>
                    {format(new Date(createdAt), DATE_FORMAT, {
                      locale: ko,
                    })}
                  </span>

                  {isPinned && <span>· 공지</span>}
                </div>
              </div>
            </div>
            <MoreDropdown
              items={[
                ...(isMine
                  ? [
                      {
                        label: '수정하기',
                        onClick: () => console.log('수정하기 클릭'),
                      },
                      {
                        label: '삭제하기',
                        onClick: () => console.log('삭제하기 클릭'),
                      },
                    ]
                  : [
                      {
                        label: '신고하기',
                        onClick: () => console.log('신고하기 클릭'),
                      },
                    ]),
                {
                  label: '공지글 등록',
                  onClick: () => console.log('공지글 등록'),
                },
              ]}
            />
          </div>
          {/* 글, 사진 */}
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
            {imageCount > 1 ? (
              <Carousel
                data-testid='carousel'
                className='relative mx-auto w-full'
              >
                <CarouselContent>
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
            ) : imageCount === 1 && images?.[0]?.src ? (
              <div className='w-full'>
                <Image
                  src={images[0].src}
                  alt={images[0].alt || '첨부 이미지'}
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='h-auto w-full object-contain'
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className='flex h-11 items-center justify-between gap-3.5 border-t border-gray-100 text-sm text-gray-500'>
          {children}
        </div>
      </div>
    </div>
  );
};
export default PostCard;
