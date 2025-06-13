import ProfileIcon from '@/components/icons/ProfileIcon';
import UserIcon from '@/components/icons/UserIcon';

const title = '8/16 공연 같이 가요';
const memberCount = 8;

const ChatInfo = () => (
  <div className='mb-3.5 flex items-center gap-2.5'>
    <ProfileIcon className='aspect-square h-10 w-10 shrink-0' />
    <div className='flex flex-col gap-2'>
      <span className='text-14_B leading-normal tracking-[-0.35px] text-gray-950'>
        {title}
      </span>
      <div className='flex items-center gap-0.5'>
        <UserIcon className='aspect-square h-4 w-4 text-gray-600' />
        <span className='shrink-0 text-13_M leading-normal tracking-[-0.325px] text-gray-600'>
          {memberCount}
        </span>
      </div>
    </div>
  </div>
);

export default ChatInfo;
