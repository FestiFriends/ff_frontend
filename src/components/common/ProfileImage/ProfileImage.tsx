import Image from 'next/image';
import ProfileIcon from '@/components/icons/ProfileIcon';
import { cn } from '@/lib/utils';

interface ProfileImageProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'md-lg' | 'lg';
  rounded?: boolean;
  border?: boolean;
  className?: string;
}

const sizeMap = {
  xs: { width: 16, height: 16, className: 'w-4 h-4' },
  sm: { width: 40, height: 40, className: 'w-10 h-10' },
  md: { width: 48, height: 48, className: 'w-12 h-12' },
  'md-lg': { width: 60, height: 60, className: 'w-[60px] h-[60px]' },
  lg: { width: 64, height: 64, className: 'w-16 h-16' },
};

const ProfileImage = ({
  src,
  alt = '프로필 이미지',
  size = 'md',
  rounded = true,
  border = true,
  className,
}: ProfileImageProps) => {
  const sizeConfig = sizeMap[size] || sizeMap['md'];

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gray-100',
        sizeConfig.className,
        rounded ? 'rounded-full' : 'rounded-md',
        border && 'border border-gray-300',
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className='object-cover object-center'
        />
      ) : (
        <ProfileIcon className='h-full w-full' />
      )}
    </div>
  );
};

export default ProfileImage;
