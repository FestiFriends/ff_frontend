import { RefObject } from 'react';
import { CrownIcon } from 'lucide-react';
import Link from 'next/link';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { RoleLabels } from '@/constants/roleLabels';
import { RoleType } from '@/types/enums';
import { Member } from '@/types/group';

interface MembersListProps {
  members?: Member[];
  memberCount?: number;
  isPending: boolean;
  isError: boolean;
  modalTriggerRef: RefObject<HTMLButtonElement | null>;
}

const MembersList = ({
  members,
  memberCount,
  isPending,
  isError,
  modalTriggerRef,
}: MembersListProps) => {
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

  if (isError || members?.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center px-4 py-5'>
        <p className='font-semibold text-gray-500'>
          모임원 목록을 불러오지 못했습니다.
        </p>
      </div>
    );
  }

  const handleOpenMembersModal = () => {
    modalTriggerRef.current?.click();
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
            className='flex basis-[calc(100%/2.4)] flex-col items-center justify-center gap-3.5 rounded-[16px] border-1 border-gray-100 bg-white p-5'
          >
            <div className='flex items-center justify-center gap-2.5'>
              <Link href={`/profiles/${member.memberId}`}>
                <ProfileImage
                  size='lg'
                  src={member.profileImage}
                  alt={member.name}
                  border={false}
                  className='aspect-square shrink-0'
                />
              </Link>
            </div>
            <div className='flex w-full min-w-0 flex-col items-center gap-0.5'>
              <span className='flex items-center text-12_M tracking-[-0.35px] text-gray-500 select-none'>
                {member.role === 'HOST' && (
                  <CrownIcon className='mr-[1px] aspect-square h-3 w-3' />
                )}
                {RoleLabels[member.role as RoleType]}
              </span>
              <div className='w-full overflow-hidden text-center'>
                <Link
                  href={`/profiles/${member.memberId}`}
                  className='inline-block max-w-full truncate text-16_B leading-normal tracking-[-0.4px] text-gray-950 select-none'
                >
                  {member.name}
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
        {memberCount !== undefined && memberCount > 5 && (
          <CarouselItem
            onClick={handleOpenMembersModal}
            className='flex basis-[calc(100%/5)] flex-col items-center justify-center gap-3.5 rounded-[16px] border-1 border-gray-100 bg-white p-5'
          >
            <span className='flex items-center text-center text-12_M tracking-[-0.35px] text-gray-500'>
              ...
            </span>
          </CarouselItem>
        )}
      </CarouselContent>
    </Carousel>
  );
};

export default MembersList;
