import { CrownIcon } from 'lucide-react';
import Link from 'next/link';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import { RoleLabels } from '@/constants/roleLabels';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { RoleType } from '@/types/enums';
import { Member } from '@/types/group';
import MemberDeleteModal from './MemberDeleteModal';
import MemberRoleModal from './MemberRoleModal';

interface MemberCardProps {
  member: Member;
  isHost?: boolean;
}

const MemberCard = ({ member, isHost }: MemberCardProps) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedin);

  return (
    <div
      key={member.memberId}
      className='flex items-center justify-between rounded-[16px] border-1 border-gray-100 bg-white p-3.5'
    >
      <div className='flex items-center justify-start gap-3'>
        <Link href={`/profiles/${member.memberId}`}>
          <ProfileImage
            size='md'
            src={member.profileImage}
            alt={member.name}
            border={false}
            className='aspect-square shrink-0'
          />
        </Link>
        <div className='flex flex-col justify-center gap-0.5'>
          <span className='ml-[0.5px] flex items-center text-center text-12_M tracking-[-0.35px] text-gray-500'>
            {member.role === 'HOST' && (
              <CrownIcon className='mr-[1px] aspect-square h-3 w-3' />
            )}
            {RoleLabels[member.role as RoleType]}
          </span>
          <Link
            href={`/profiles/${member.memberId}`}
            className='text-center text-16_B leading-normal tracking-[-0.4px] text-gray-950'
          >
            {member.name}
          </Link>
        </div>
      </div>

      {isHost && member.role !== 'HOST' && isLoggedIn && (
        <div className='flex gap-3'>
          <MemberRoleModal member={member} />
          <MemberDeleteModal member={member} />
        </div>
      )}
    </div>
  );
};

export default MemberCard;
