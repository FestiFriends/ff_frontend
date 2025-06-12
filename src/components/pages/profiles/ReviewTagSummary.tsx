import { ReviewTagType } from '@/types/enums';
import { ReviewSummary } from '@/types/profiles';

interface ReviewTagSummaryProps {
  summary: ReviewSummary;
}

const REVIEW_TAG_LABELS: Record<ReviewTagType, string> = {
  COMMUNICATIVE: '대화가 잘 통했어요',
  RECOMMEND: '다음에도 함께하고 싶어요',
  POLITE: '친절하고 매너가 좋아요',
  PUNCTUAL: '시간 약속을 잘 지켜요',
  CLEAN: '청결하고 깔끔했어요',
  COMFORTABLE: '편안한 분위기였어요',
  RESPONSIVE: '소통이 잘 되고 응답이 빨라요',
};

const ReviewTagSummary = ({ summary }: ReviewTagSummaryProps) => {
  const sortedTags = Object.entries(summary)
    .filter(([, count]) => count && count > 0)
    .sort((a, b) => b[1] - a[1]) as [ReviewTagType, number][];

  if (sortedTags.length === 0) {
    return (
      <p className='text-sm text-gray-400'>아직 받은 리뷰 태그가 없어요.</p>
    );
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
