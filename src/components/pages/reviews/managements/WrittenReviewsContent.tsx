import React from 'react';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import { ReviewTag } from '@/types/enums';
import { WrittenReviewsData } from '@/types/reviews';
import ReviewRating from '../../main/ReviewRating';

interface WrittenReviewsContentProps {
  reviews: WrittenReviewsData['reviews'];
}

const WrittenReviewsContent = ({ reviews }: WrittenReviewsContentProps) => (
  <div className='flex w-full flex-col gap-4 bg-gray-25'>
    {reviews.map((review) => (
      <div
        key={review.targetUserId}
        className='flex flex-col gap-4 rounded-2xl bg-blue-200 p-4'
      >
        <div className='flex items-center gap-2'>
          <ProfileImage
            size='sm'
            src={review.targetUserProfileImage}
          />
          {review.targetUserName}
        </div>
        <div className='flex flex-col gap-2'>
          <ReviewRating rating={review.rating} />
          <p className='text-14_M'>{review.content}</p>
          <div className='flex flex-wrap gap-2'>
            {review.defaultTag.map((tag) => (
              <span
                key={tag}
                className='w-fit rounded-full bg-gray-100 p-2 text-12_M'
              >
                {ReviewTag[tag]}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default WrittenReviewsContent;
