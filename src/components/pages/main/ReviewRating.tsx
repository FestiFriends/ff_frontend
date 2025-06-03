'use client';

import { Rating, Star } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

interface ReviewRatingProps {
  rating: number;
}

const ReviewRating = ({ rating }: ReviewRatingProps) => (
  <div className='flex h-[14px] w-fit items-center justify-center gap-[3px]'>
    <Rating
      style={{ maxWidth: 68 }}
      value={rating}
      itemStyles={{
        itemShapes: Star,
        activeFillColor: '#FFCB02',
        inactiveFillColor: '#fbf1a9',
      }}
      readOnly
    />
    <span className='w-[18px] text-12_B text-gray-950'>
      {rating.toFixed(1)}
    </span>
  </div>
);

export default ReviewRating;
