'use client';

import React from 'react';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import { WritableReviewsData } from '@/types/reviews';

interface WritableReviewsContentProps {
  reviews: WritableReviewsData['reviews'];
}

const WritableReviewsContent = ({ reviews }: WritableReviewsContentProps) => (
  <div className='flex w-full flex-col gap-4 bg-gray-25 p-4'>
    {reviews.map((review) => (
      <div
        key={review.targetUserId}
        className='flex justify-between'
      >
        <div className='flex items-center gap-2'>
          <ProfileImage
            size='sm'
            src={review.targetUserProfileImage}
          />
          {review.targetUserName}
        </div>
      </div>
    ))}
  </div>
);

export default WritableReviewsContent;
