import { CrownIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { RoleLabels } from '@/constants/roleLabels';
import { useGetGroupMembers } from '@/hooks/groupHooks/groupHooks';
import { RoleType } from '@/types/enums';
import { Member } from '@/types/group';

interface MembersListProps {
  groupId: string;
}

const MembersList = ({ groupId }: MembersListProps) => {
  const router = useRouter();
  const {
    data: groupMembers,
    isPending,
    isError,
  } = useGetGroupMembers(groupId, 5);

  if (isPending) {
    return (
      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full'
      >
        <CarouselContent>
          <CarouselItem className='basis-[calc(100%/2.4)] rounded-[16px]'>
            <Skeleton className='h-30 w-full' />
          </CarouselItem>
          <CarouselItem className='basis-[calc(100%/2.4)] rounded-[16px]'>
            <Skeleton className='h-30 w-full' />
          </CarouselItem>
          <CarouselItem className='basis-[calc(100%/2.4)] rounded-[16px]'>
            <Skeleton className='h-30 w-full' />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    );
  }

  if (isError || !groupMembers.data) {
    return (
      <div className='flex flex-col items-center justify-center px-4 py-5'>
        <p className='font-semibold text-gray-500'>
          모임원 목록을 불러오지 못했습니다.
        </p>
      </div>
    );
  }

  const members: Member[] = groupMembers.data.members;

  const routeToMemberProfile = (memberId: string) => {
    router.push(`/profiles/${memberId}`);
  };

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className='w-full'
    >
      <CarouselContent className='m-0 gap-3'>
        {members?.map((member) => (
          <CarouselItem
            key={member.memberId}
            onClick={() => routeToMemberProfile(member.memberId)}
            className='flex basis-[calc(100%/2.4)] flex-col gap-3.5 rounded-[16px] border-1 border-gray-100 bg-white p-5'
          >
            <div className='flex items-center justify-center gap-2.5'>
              <ProfileImage
                size='lg'
                src={member.profileImage}
                alt={member.name}
                border={false}
                className='aspect-square shrink-0'
              />
            </div>
            <div className='flex flex-col items-center gap-0.5'>
              <span className='flex items-center text-center text-12_M tracking-[-0.35px] text-gray-500'>
                {member.role === 'HOST' && (
                  <CrownIcon className='mr-[1px] aspect-square h-3 w-3' />
                )}
                {RoleLabels[member.role as RoleType]}
              </span>
              <span className='text-center text-16_B leading-normal tracking-[-0.4px] text-gray-950'>
                {member.name}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default MembersList;
