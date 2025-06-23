'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import { WritableReviewsData } from '@/types/reviews';
import ReviewWriteModal from './ReviewWriteModal';

interface WritableReviewsContentProps {
  reviews: WritableReviewsData['reviews'];
  groupId: string;
}

const WritableReviewsContent = ({
  reviews,
  groupId,
}: WritableReviewsContentProps) => {
  const router = useRouter();
  return (
    <div className='flex w-full flex-col gap-4 bg-gray-25'>
      {reviews.map((review) => (
        <div
          key={review.targetUserId}
          className='flex justify-between py-0.5'
        >
          <button
            className='flex w-fit cursor-pointer items-center gap-1'
            onClick={() => router.push(`/profiles/${review.targetUserId}`)}
          >
            <div className='flex h-6 w-6 items-center justify-center'>
              <ProfileImage
                size='xs'
                src={review.targetUserProfileImage}
              />
            </div>
            <span className='text-14_B text-gray-950'>
              {review.targetUserName}
            </span>
          </button>

          <ReviewWriteModal
            review={review}
            groupId={groupId}
          />
        </div>
      ))}
    </div>
  );
};

export default WritableReviewsContent;
