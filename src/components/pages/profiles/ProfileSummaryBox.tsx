import { GroupSummary } from '@/types/profiles';

interface ProfileSummaryBoxProps {
  groupSummary: GroupSummary;
}

const ProfileSummaryBox = ({ groupSummary }: ProfileSummaryBoxProps) => {
  const { joinedCount, totalJoinedCount, createdCount } = groupSummary;
  const summaryData = [
    { label: '참여 중 모임 ', value: joinedCount },
    { label: '참여한 모임', value: totalJoinedCount },
    { label: '개설한 모임', value: createdCount },
  ];

  return (
    <div className='grid w-full grid-cols-3 gap-4 rounded-lg bg-white p-4 text-center'>
      {summaryData.map((item) => (
        <div key={item.label}>
          <div className='text-12_M'>{item.label}</div>
          <div className='mt-[10px] text-20_M font-bold'>{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default ProfileSummaryBox;
