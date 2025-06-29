import StateNotice from '@/components/common/StateNotice/StateNotice';
import { FullProfile } from '@/types/profiles';
import ReviewList from './ReviewList';
import ReviewTagSummary from './ReviewTagSummary';

interface ReceivedReviewsProps {
  profile: FullProfile;
}

const ReceivedReviews = ({ profile }: ReceivedReviewsProps) => {
  const { reviewSummary, reviewList } = profile;

  const noTag = Object.values(reviewSummary).every((count) => !count);
  const noReview = !reviewList || reviewList.length === 0;

  if (noTag && noReview) {
    return (
      <p className='text-center text-14_body_M text-gray-500'>
        <StateNotice preset='reviewEmpty' />
      </p>
    );
  }

  return (
    <section className='space-y-2'>
      <ReviewTagSummary summary={reviewSummary} />

      {reviewList && <ReviewList userId={profile.id} />}
    </section>
  );
};
export default ReceivedReviews;
