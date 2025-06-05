import Image from 'next/image';
import ProfileIcon from '@/components/icons/ProfileIcon';
import { cn } from '@/lib/utils';

interface ProfileImageProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  border?: boolean;
  className?: string;
}

const sizeMap = {
  xs: 'w-8 h-8',
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

const ProfileImage = ({
  src,
  alt = '프로필 이미지',
  size = 'md',
  rounded = true,
  border = true,
  className,
}: ProfileImageProps) => {
  const sizeClass = sizeMap[size] || sizeMap['md'];

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gray-100',
        sizeClass,
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
          className='object-cover'
        />
      ) : (
        <ProfileIcon className='h-full w-full' />
      )}
    </div>
  );
};

export default ProfileImage;
