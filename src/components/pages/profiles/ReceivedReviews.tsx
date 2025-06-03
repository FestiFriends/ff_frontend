import { FullProfile } from '@/types/profiles';

interface ReceivedReviewsProps {
  profile: FullProfile;
}

const ReceivedReviews = ({ profile }: ReceivedReviewsProps) => {
  const { reviewSummary, reviewCount, reviewList } = profile;

  return (
    <section className='space-y-6'>
      <ReviewTagSummary summary={reviewSummary} />
      <p className='text-sm text-gray-600'>
        총 {reviewCount}개의 리뷰를 받았어요.
      </p>
      {reviewList && <ReviewList reviews={reviewList} />}
    </section>
  );
};
export default ReceivedReviews;
