import clsx from "clsx";
import Image from "next/image";

interface PosterProps {
  src: string;
  alt?: string;
  shadow?: boolean;
  border?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'w-20 h-28', 
  md: 'w-28 h-40', 
  lg: 'w-40 h-60', 
  xl: 'w-52 h-72', 
};

const Poster = ({
  src,
  alt = '포스터 이미지',
  shadow = true,
  border = true,
  size = 'md',
  className,
}: PosterProps) => {
  const sizeClass = sizeMap[size] ?? '';

  return (
    <Image
      src={src}
      alt={alt}
      width={160}
      height={240}
      className={clsx(
        'object-contain',
        sizeClass,
        shadow && 'shadow-md',
        border && 'border border-gray-300',
        className
      )}
    />
  );
};

export default Poster;