import React from 'react';
import { Rating, Star } from '@smastrom/react-rating';
import { ProfileImage } from '@/components/common';
import { ReceivedSimpleReview } from '@/types/reviews';
import '@smastrom/react-rating/style.css';

interface ReviewCardProps {
  review: ReceivedSimpleReview['reviews'][number];
}

const ReviewCard = ({ review }: ReviewCardProps) => (
  <div className='w-full rounded-2xl border border-gray-100 p-5'>
    <div className='flex flex-col gap-3'>
      <div className='flex h-10 gap-2.5'>
        <ProfileImage
          size='sm'
          className='shrink-0'
        />
        <div className='h-p[37px] flex flex-col gap-1'>
          <h2 className='text-16_B text-gray-950'>익명의 리뷰어</h2>
          <div className='flex items-center gap-1'>
            <Rating
              style={{ maxWidth: 68 }}
              value={review.rating}
              itemStyles={{
                itemShapes: Star,
                activeFillColor: '#FFCB02',
                inactiveFillColor: '#fbf1a9',
              }}
              readOnly
            />

            <span className='text-12_M text-gray-600'>
              {review.createdAt.split('T')[0]}
            </span>
          </div>
        </div>
      </div>

      {review.content && <span className='h-[1px] w-full bg-gray-50' />}

      {review.content && (
        <p className='text-14_body_M text-gray-950'>{review.content}</p>
      )}
    </div>
  </div>
);

export default ReviewCard;
