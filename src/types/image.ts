import { StaticImageData } from 'next/image';

export interface Image {
  id?: string; // 이미지 ID
  src: string | StaticImageData; // 이미지 경로 (url)
  alt?: string; // 이미지 파일명
}
