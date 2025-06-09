import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PosterProps {
  src: string | StaticImport;
  alt?: string;
  shadow?: boolean;
  border?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'w-20 h-28',
  md: 'w-28 h-40',
  lg: 'w-40 h-56',
  xl: 'w-52 h-72',
};

const Poster = ({
  src,
  alt = '포스터 이미지',
  shadow,
  border,
  size = 'md',
  className,
}: PosterProps) => {
  const sizeClass = sizeMap[size] ?? '';

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        sizeClass,
        shadow && 'shadow-md',
        border && 'border border-gray-300',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className='object-contain'
      />
    </div>
  );
};

export default Poster;
