import { GroupSummary } from '@/types/profiles';

interface ProfileSummaryBoxProps {
  groupSummary: GroupSummary;
}

const ProfileSummaryBox = ({ groupSummary }: ProfileSummaryBoxProps) => {
  const { joinedCount, totalJoinedCount, createdCount } = groupSummary;
  const summaryData = [
    { label: '참여 중인 모임', value: joinedCount },
    { label: '참여한 모임', value: totalJoinedCount },
    { label: '개설한 모임', value: createdCount },
  ];

  return (
    <div className='mt-4 grid w-full grid-cols-3 gap-4 rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm'>
      {summaryData.map((item) => (
        <div key={item.label}>
          <div className='text-sm text-gray-500'>{item.label}</div>
          <div className='mt-1 text-xl font-bold text-gray-900'>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileSummaryBox;
