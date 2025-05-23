import Image from "next/image";

interface PosterProps {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  shadow?: boolean;
  className?: string;
}

const Poster = ({
  src,
  alt = '포스터 이미지',
  width = '100%',
  height = 'auto',
  shadow = true,
  className,
}: PosterProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      style={{ width, height }}
      className="b"
    )
}