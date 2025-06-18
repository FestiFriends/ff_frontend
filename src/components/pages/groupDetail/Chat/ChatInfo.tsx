import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import UserIcon from '@/components/icons/UserIcon';
import { GroupInfo } from '@/types/group';

interface ChatInfoProps {
  groupInfo?: GroupInfo;
}

const ChatInfo = ({ groupInfo }: ChatInfoProps) => (
  <div className='flex items-center gap-2.5'>
    <ProfileImage
      size='sm'
      src={groupInfo?.performance?.poster}
      alt={groupInfo?.performance?.title}
      border={false}
      className='aspect-square shrink-0'
    />
    <div className='flex flex-col gap-2'>
      <span className='text-14_B leading-normal tracking-[-0.35px] text-gray-950'>
        {groupInfo?.title}
      </span>
      <div className='flex items-center gap-0.5'>
        <UserIcon className='aspect-square h-4 w-4 text-gray-600' />
        <span className='shrink-0 text-13_M leading-normal tracking-[-0.325px] text-gray-600'>
          {groupInfo?.memberCount}
        </span>
      </div>
    </div>
  </div>
);

export default ChatInfo;
