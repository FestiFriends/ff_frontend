import clsx from "clsx";
import Image from "next/image";

interface PosterProps {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  shadow?: boolean;
  border?: boolean;
  className?: string;
}

const Poster = ({
  src,
  alt = '포스터 이미지',
  shadow = true,
  border = true,
  className,
}: PosterProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={160}
      height={240}
      className={clsx(
        'object-contain',
        shadow && 'shadow-md',
        border && 'border border-gray-300',
        className
      )}
    />
  );
};

export default Poster;