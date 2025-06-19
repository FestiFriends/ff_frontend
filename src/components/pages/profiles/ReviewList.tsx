import { Rating, Star } from '@smastrom/react-rating';
import { useQuery } from '@tanstack/react-query';
import Poster from '@/components/common/poster/Poster';
import { GroupCategoryLabels } from '@/constants';
import { reviewsApi } from '@/services/reviewsService';
import { ReceivedSimpleReview } from '@/types/reviews';
import '@smastrom/react-rating/style.css';

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

  const formatDate = (isoDate: string) =>
    new Date(isoDate).toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    });

  const formatDateRange = (start: string, end: string) => {
    const format = (date: string) =>
      new Date(date).toLocaleDateString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      });
    return `${format(start)}~${format(end)}`;
  };

  return (
    <div>
      <p className='mt-[20px] text-12_M'>
        총 {reviewCount}개의 리뷰를 받았어요.
      </p>
      <ul className='mt-2 space-y-3'>
        {reviews.map((review) => (
          <li
            key={review.reviewId}
            className='rounded-[16px] border border-gray-200 bg-white p-[20px] shadow-sm'
          >
            <div className='mb-[8px] flex justify-between'>
              <div className='flex h-[20px] w-fit items-center justify-center gap-[3px]'>
                <Rating
                  style={{ maxWidth: 110 }}
                  value={review.rating}
                  itemStyles={{
                    itemShapes: Star,
                    activeFillColor: '#FFCB02',
                    inactiveFillColor: '#fbf1a9',
                  }}
                  readOnly
                />
                <span className='ml-[2px] w-[18px] pt-[2px] text-12_B text-gray-950'>
                  {review.rating.toFixed(1)}
                </span>
              </div>

              <span className='ml-auto text-12_M text-gray-400'>
                {formatDate(review.createdAt)}
              </span>
            </div>
            <p className='text-14_body_M text-gray-800'>{review.content}</p>

            <div className='mt-[12px] mb-[12px] border-t border-gray-200' />
            <div className='text-14_B text-gray-950'>{review.groupTitle}</div>
            <div className='mt-[8px] flex items-start'>
              <div>
                <Poster
                  src={review.performance.poster}
                  alt={review.performance.title}
                  size='xs'
                />
              </div>
              <div className='ml-[6px] space-y-[2px]'>
                <div className='mb-[6px] text-12_B text-gray-800'>
                  {review.performance.title}
                </div>
                <div className='text-12_M text-gray-500'>
                  {GroupCategoryLabels[review.category]} | {review.memberCount}
                  인
                </div>
                <div className='text-12_M text-gray-400'>
                  {formatDateRange(review.groupStartDate, review.groupEndDate)}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
