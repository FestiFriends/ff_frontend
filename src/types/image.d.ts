import type { StaticImageData } from 'next/image';

export interface Image {
  id: string;
  alt: string;
  src: string | StaticImageData;
}
