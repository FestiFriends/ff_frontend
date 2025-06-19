import { useRef } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import Badge from '@/components/common/Badge/Badge';
import Button from '@/components/common/Button/Button';
import CreateReportModal from '@/components/common/CreateReportModal/CreateReportModal';
import HashtagBadgeGroup from '@/components/common/HashtagBadgeGroup/HashtagBadgeGroup';
import MoreDropdown from '@/components/common/MoreDropdown/MoreDropdown';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import ProgressBar from '@/components/common/ProgressBar/ProgressBar';
import StarIcon from '@/components/icons/StarIcon';
import { useGetUserId } from '@/hooks/userHooks/userHooks';
import { ReportTarget } from '@/types/enums';
import { GroupInfo } from '@/types/group';

const DATE_FORMAT = 'yy.MM.dd';

interface GroupInfoCardProps {
  groupInfo: GroupInfo;
  handleButtonClick?: () => void;
}

const GroupInfoCard = ({
  groupInfo,
  handleButtonClick,
}: GroupInfoCardProps) => {
  const { data: userId, isPending, isError } = useGetUserId();
  const isHost = String(userId?.data?.userId) === String(groupInfo.host.id);
  const router = useRouter();
  const reportTriggerRef = useRef<HTMLButtonElement>(null);

  const handleReportPost = () => {
    reportTriggerRef.current?.click();
  };

  // TODO: 로딩 상태 처리
  if (isPending || isError) return null;

  return (
    <div className='px-4'>
      <div className='flex w-full flex-col items-start justify-center gap-4 rounded-2xl bg-gray-25 p-5'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex gap-0.5'>
            <Badge
              label={groupInfo.category}
              className='flex items-center gap-1 text-14_M text-gray-600'
            />
          </div>
          <span className='text-12_M text-gray-600'>
            {/* TODO: date.ts 파일 추가 후 수정 */}
            {format(new Date(groupInfo.startDate), DATE_FORMAT, {
              locale: ko,
            })}
            ~
            {format(new Date(groupInfo.endDate), DATE_FORMAT, {
              locale: ko,
            })}
          </span>
          <MoreDropdown
            items={[
              ...(isHost
                ? [
                    {
                      label: '수정하기',
                      onClick: () =>
                        router.push(`/groups/${groupInfo.id}/edit`),
                    },
                  ]
                : [
                    {
                      label: '신고하기',
                      onClick: () => handleReportPost(),
                    },
                  ]),
            ]}
          />
        </div>

        <div className='flex w-full justify-between gap-4'>
          <div className='flex flex-1 flex-col justify-between overflow-hidden'>
            <h4 className='mb-1.5 truncate text-16_B text-black'>
              {groupInfo.title}
            </h4>
            <div className='mb-2.5 flex items-center gap-2 text-13_M text-gray-700'>
              <span>{groupInfo.location}</span>
              <div className='h-2 w-[1px] bg-gray-200' />
              <span>{groupInfo.gender}</span>
              <div className='h-2 w-[1px] bg-gray-200' />
              <span>
                {groupInfo.startAge}~{groupInfo.endAge}세
              </span>
            </div>
            <div className='flex items-center gap-0.5'>
              <ProfileImage
                size='xs'
                src={groupInfo.host.profileImage}
                alt={groupInfo.host.name}
                border={false}
              />
              <span className='text-12_M text-gray-700'>
                {groupInfo.host.name}
              </span>
              <span className='flex text-12_M text-gray-700'>
                (<StarIcon className='h-3 w-3' />
                {groupInfo.host.rating})
              </span>
            </div>
            <p className='line-clamp-2 w-full text-14_body_M text-gray-950'>
              {groupInfo.description}
            </p>
          </div>
        </div>

        <ProgressBar
          current={groupInfo.memberCount}
          total={groupInfo.maxMembers}
        />

        {groupInfo.hashtag && (
          <HashtagBadgeGroup hashtags={groupInfo.hashtag} />
        )}

        <div className='flex w-full gap-2'>
          <Button
            variant='primary'
            color='normal'
            onClick={handleButtonClick}
          >
            {groupInfo.isMember ? '모임 탈퇴' : '참가 신청'}
          </Button>
        </div>
      </div>
      <CreateReportModal
        targetId={groupInfo.host.id || ''}
        category={ReportTarget.GROUP}
      >
        <button ref={reportTriggerRef}></button>
      </CreateReportModal>
    </div>
  );
};

export default GroupInfoCard;
