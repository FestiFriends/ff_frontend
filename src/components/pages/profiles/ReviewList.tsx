import { InfiniteList } from '@/components/common';
import { infiniteReceivedReviewsOptions } from '@/hooks/reviewHooks/reviewHooks';
import { ReviewListResponse } from '@/types/reviews';
import ReviewCardSkeleton from '../reviews/managements/ReviewCardSkeleton';
import ReviewCard from './ReviewCard';

interface ReviewListProps {
  userId: string;
}

const ReviewList = ({ userId }: ReviewListProps) => (
  <InfiniteList<ReviewListResponse, ReviewListResponse['data'][number]>
    className='flex flex-col items-center gap-5'
    fallback={<ReviewCardSkeleton />}
    options={infiniteReceivedReviewsOptions({ userId })}
    getDataId={({ reviews }) => reviews[0].reviewId}
    renderData={(data) => (
      <>
        {data.reviews.map((review) => (
          <ReviewCard
            review={review}
            key={review.reviewId}
          />
        ))}
      </>
    )}
  />
);

export default ReviewList;
