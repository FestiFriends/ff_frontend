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
  sm: { width: 80, height: 112, className: 'w-20 h-28' },
  md: { width: 112, height: 160, className: 'w-28 h-40' },
  lg: { width: 160, height: 224, className: 'w-40 h-56' },
  xl: { width: 208, height: 288, className: 'w-52 h-72' },
};

const Poster = ({
  src,
  alt = '포스터 이미지',
  shadow,
  border,
  size = 'md',
  className,
}: PosterProps) => {
  const sizeConfig = sizeMap[size] ?? sizeMap.md;

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        sizeConfig.className,
        shadow && 'shadow-md',
        border && 'border border-gray-300',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={sizeConfig.width}
        height={sizeConfig.height}
        sizes={`${sizeConfig.width}px`}
        className='object-contain'
      />
    </div>
  );
};

export default Poster;
