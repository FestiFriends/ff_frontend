import { FullProfile } from '@/types/profiles';
import ReviewList from './ReviewList';
import ReviewTagSummary from './ReviewTagSummary';

interface ReceivedReviewsProps {
  profile: FullProfile;
}

const ReceivedReviews = ({ profile }: ReceivedReviewsProps) => {
  const { reviewSummary, reviewCount, reviewList } = profile;

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
