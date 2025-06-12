import { FullProfile } from '@/types/profiles';
import ReviewList from './ReviewList';
import ReviewTagSummary from './ReviewTagSummary';

interface ReceivedReviewsProps {
  profile: FullProfile;
}

const ReceivedReviews = ({ profile }: ReceivedReviewsProps) => {
  const { reviewSummary, reviewCount, reviewList } = profile;

  const noTag = Object.values(reviewSummary).every((count) => !count);
  const noReview = !reviewList || reviewList.length === 0;

  if (noTag && noReview) {
    return (
      <p className='text-center text-gray-500'>아직 받은 리뷰가 없어요.</p>
    );
  }

  return (
    <section className='space-y-6'>
      <ReviewTagSummary summary={reviewSummary} />

      {reviewList && (
        <ReviewList
          reviews={reviewList}
          reviewCount={reviewCount}
        />
      )}
    </section>
  );
};
export default ReceivedReviews;
