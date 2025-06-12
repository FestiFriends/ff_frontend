import React from 'react';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import { WrittenReviewsData } from '@/types/reviews';
import WrittenReviewsModal from './WrittenReviewsModal';

interface WrittenReviewsContentProps {
  reviews: WrittenReviewsData['reviews'];
}

const WrittenReviewsContent = ({ reviews }: WrittenReviewsContentProps) => (
  <div className='flex w-full flex-col gap-[14px] bg-gray-25'>
    {reviews.map((review) => (
      <div
        key={review.reviewId}
        className='flex justify-between py-0.5'
      >
        <div className='flex w-fit items-center gap-1'>
          <div className='flex h-6 w-6 items-center justify-center'>
            <ProfileImage
              size='xs'
              src={review.targetUserProfileImage}
            />
          </div>
          <span className='text-14_B text-gray-950'>
            {review.targetUserName}
          </span>
        </div>

        <WrittenReviewsModal review={review} />
      </div>
    ))}
  </div>
);

export default WrittenReviewsContent;
