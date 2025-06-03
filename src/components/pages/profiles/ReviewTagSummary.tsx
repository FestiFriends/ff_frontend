import { ReviewTagType } from '@/types/enums';
import { ReviewSummary } from '@/types/profiles';

interface ReviewTagSummaryProps {
  summary: ReviewSummary;
}

const REVIEW_TAG_LABELS: Record<ReviewTagType, string> = {
  PUNCTUAL: '제시간에 와요',
  POLITE: '배려심이 있어요',
  COMFORTABLE: '조용한 편이에요',
  COMMUNICATIVE: '대화를 잘 이끌어요',
  CLEAN: '깔끔해요',
  RESPONSIVE: '응답이 빨라요',
  RECOMMEND: '다시 함께하고 싶어요',
};

const ReviewTagSummary = ({ summary }: ReviewTagSummaryProps) => {
  const sortedTags = Object.entries(summary)
    .filter(([, count]) => count && count > 0)
    .sort((a, b) => b[1] - a[1]) as [ReviewTagType, number][];

  if (sortedTags.length === 0) {
    return <p className='text-sm text-gray-400'>아직 받은 태그가 없어요.</p>;
  }

  return (
    <ul className='flex flex-col gap-2'>
      {sortedTags.map(([tag, count]) => (
        <li
          key={tag}
          className='flex items-center justify-between rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-700 shadow-sm'
        >
          <span>{REVIEW_TAG_LABELS[tag]}</span>
          <span className='ml-4 font-semibold text-gray-900'> {count}</span>
        </li>
      ))}
    </ul>
  );
};

export default ReviewTagSummary;
