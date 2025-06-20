import { ReviewTagLabels } from '@/constants/reviewLabels';
import { ReviewTagType } from '@/types/enums';
import { ReviewSummary } from '@/types/profiles';

interface ReviewTagSummaryProps {
  summary: ReviewSummary;
}

const ReviewTagSummary = ({ summary }: ReviewTagSummaryProps) => {
  const sortedTags = Object.entries(summary)
    .filter(([, count]) => count && count > 0)
    .sort((a, b) => b[1] - a[1]) as [ReviewTagType, number][];

  if (sortedTags.length === 0) {
    return (
      <p className='flex h-[57px] items-center justify-between rounded-md bg-gray-25 px-4 py-2 text-14_B'>
        아직 받은 리뷰 태그가 없어요.
      </p>
    );
  }

  return (
    <ul className='mt-[22px] flex flex-col gap-2'>
      {sortedTags.map(([tag, count]) => (
        <li
          key={tag}
          className='flex h-[57px] items-center justify-between rounded-md bg-gray-25 px-4 py-2 text-14_B'
        >
          <span>{ReviewTagLabels[tag.toUpperCase() as ReviewTagType]}</span>
          <span className='ml-4 font-semibold text-gray-900'> {count}</span>
        </li>
      ))}
    </ul>
  );
};

export default ReviewTagSummary;
