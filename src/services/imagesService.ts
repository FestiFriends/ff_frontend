import apiFetcher from '@/lib/apiFetcher';
import { PresignedUrlResponse } from '@/types/image';

export const imagesApi = {
  getPresignedURL: async (fileName: string) => {
    const res = await apiFetcher.post<PresignedUrlResponse>(
      `/api/v1/images/presigned`,
      {
        fileName: fileName,
      }
    );
    return res.data;
  },

  uploadImage: async (presignedUrl: string, file: File): Promise<void> => {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });
    if (!response.ok) {
      throw new Error(`파일 업로드 실패: ${file.name}`);
    }
  },
};
