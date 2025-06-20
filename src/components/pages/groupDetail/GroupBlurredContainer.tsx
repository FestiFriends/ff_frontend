import { useState } from 'react';
import { CrownIcon } from 'lucide-react';
import { ProfileImage, Tabs } from '@/components/common';
import { Skeleton } from '@/components/ui/skeleton';
import { RoleLabels } from '@/constants/roleLabels';
import { RoleType } from '@/types/enums';
import { GroupInfo } from '@/types/group';

const blurredMembers = Array.from({ length: 3 }, (_, i) => ({
  memberId: `member-${i + 1}`,
  name: i === 0 ? '모임장' : `모임원 ${i}`,
  profileImage: '',
  role: i === 0 ? 'HOST' : 'MEMBER',
}));

const groupTabs = ['게시글', '채팅', '캘린더'];

interface GroupBlurredContainerProps {
  isPending: boolean;
  groupInfo?: GroupInfo;
}

const GroupBlurredContainer = ({
  isPending,
  groupInfo,
}: GroupBlurredContainerProps) => {
  const [selectedTab, setSelectedTab] = useState(groupTabs[0]);

  if (isPending) {
    return (
      <div className='flex flex-col gap-7.5 px-4'>
        <Skeleton className='h-[20dvh] w-full rounded-[16px]' />
        <Skeleton className='h-[40dvh] w-full rounded-[16px]' />
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-col gap-5 px-4'>
        <div className='flex justify-between'>
          <span className='text-16_B leading-normal tracking-[-0.4px] text-gray-950'>
            멤버{' '}
            <span>{groupInfo?.memberCount ? groupInfo.memberCount : '0'}</span>
            명
          </span>
        </div>

        <div className='relative'>
          <div className='absolute top-1/2 left-1/2 z-1 -translate-x-1/2 -translate-y-1/2'>
            <p className='text-16_B leading-normal tracking-[-0.35px] text-gray-700'>
              모임에 참가하면 볼 수 있어요 👀
            </p>
          </div>

          <div className='w-full blur-[6px]'>
            <div className='m-0 flex gap-3 overflow-hidden'>
              {blurredMembers?.map((member) => (
                <div
                  key={member.memberId}
                  className='flex h-30 shrink-0 basis-[calc(100%/2.7)] flex-col items-center justify-center gap-3.5 rounded-[16px] border-1 border-gray-100 bg-white p-5'
                >
                  <div className='flex items-center justify-center gap-2.5'>
                    <ProfileImage
                      size='lg'
                      src=''
                      alt={member.name}
                      border={false}
                      className='aspect-square shrink-0'
                    />
                  </div>
                  <div className='flex min-w-0 flex-col items-center gap-0.5'>
                    <span className='flex items-center text-center text-12_M tracking-[-0.35px] text-gray-500'>
                      {member.role === 'HOST' && (
                        <CrownIcon className='mr-[1px] aspect-square h-3 w-3' />
                      )}
                      {RoleLabels[member.role as RoleType]}
                    </span>
                    <span className='w-full truncate text-center text-16_B leading-normal tracking-[-0.4px] text-gray-950'>
                      {member.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Tabs
          tabs={groupTabs}
          activeTab={selectedTab}
          onTabChange={setSelectedTab}
        />
        <div className='w-ull mt-5 flex h-50 flex-col items-center justify-center gap-3.5 bg-white p-5'>
          <p className='-ml-1 text-16_B leading-normal tracking-[-0.35px] text-gray-500'>
            모임에 참가하고 이용해 보세요 ☺️
          </p>
        </div>
      </div>
    </>
  );
};

export default GroupBlurredContainer;
