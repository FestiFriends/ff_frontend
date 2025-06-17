import { useMutation } from '@tanstack/react-query';
import { imagesApi } from '@/services/imagesService';

export const useGetPresignedURL = () =>
  useMutation({
    mutationFn: (fileName: string) => imagesApi.getPresignedURL(fileName),
  });
