import { StaticImageData } from 'next/image';

export interface Image {
  id?: string;
  src: string | StaticImageData;
  alt?: string;
  name?: string; //S3
  file?: File; // S3
}
