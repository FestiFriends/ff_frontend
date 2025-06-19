import { useQuery } from '@tanstack/react-query';
import { reviewsApi } from '@/services/reviewsService';
import { ReceivedSimpleReview } from '@/types/reviews';

interface ReviewListProps {
  userId: string;
}

const ReviewList = ({ userId }: ReviewListProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['receivedSimpleReviews', userId],
    queryFn: () => reviewsApi.getReceivedSimpleReviews(userId),
  });

  if (isLoading) return <p className='text-sm text-gray-400'>로딩 중...</p>;

  if (isError) return <p className='text-sm text-red-500'>리뷰 로딩 실패</p>;

  const reviews: ReceivedSimpleReview[] = data?.data ?? [];
  const reviewCount = reviews.length;

  if (reviewCount === 0) {
    return (
      <p className='text-sm text-gray-400'>아직 받은 한 줄 리뷰가 없어요.</p>
    );
  }

  return (
    <div>
      <p className='mt-[20px] text-12_M'>
        총 {reviewCount}개의 리뷰를 받았어요.
      </p>
      <ul className='mt-2 space-y-3'>
        {reviews.map((review) => (
          <li
            key={review.reviewId}
            className='rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm'
          >
            <div className='mb-1 flex items-center justify-between'>
              <span className='text-xs text-yellow-500'>
                {'★'.repeat(Math.round(review.rating))}
                {'☆'.repeat(5 - Math.round(review.rating))}
              </span>
              <span className='text-xs text-gray-400'>
                {new Date(review.createdAt).toLocaleDateString('ko-KR', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </span>
            </div>
            <p>{review.content || '리뷰 내용 없음'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
