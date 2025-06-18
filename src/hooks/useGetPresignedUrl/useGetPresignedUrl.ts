import { useMutation } from '@tanstack/react-query';
import { imagesApi } from '@/services/imagesService';

export const useGetPresignedURL = () =>
  useMutation({
    mutationFn: (fileName: string) => imagesApi.getPresignedURL(fileName),
  });

export const useUploadMultipleFiles = () =>
  useMutation({
    mutationFn: async (files: File[]) => {
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const { presignedUrl } = (await imagesApi.getPresignedURL(file.name))
          .data;
        await imagesApi.uploadImage(presignedUrl, file);
        uploadedUrls.push(presignedUrl.split('?')[0]);
      }

      return uploadedUrls;
    },
  });
