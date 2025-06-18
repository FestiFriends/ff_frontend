import { StaticImageData } from 'next/image';
import { ApiResponse } from './api';

export interface Image {
  id?: string;
  src: string | StaticImageData;
  alt?: string;
  name?: string; //S3
  file?: File; // S3
}

export type PresignedUrlResponse = ApiResponse & {
  data: { presignedUrl: string };
};
