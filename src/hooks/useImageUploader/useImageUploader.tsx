import { useCallback, useState } from 'react';
import axios from 'axios';

export interface UploadedImage {
  file: File;
  url: string;
}

const loadFile = async (url: string) => {
  try {
    const response = await axios.get(url, { responseType: 'blob' });
    const blob = response.data;

    const random = Math.random().toString(36).substring(2, 10);
    const timestamp = Date.now();

    const extensionMap: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
    };

    const ext = extensionMap[blob.type] || 'jpg';

    const file = new File([blob], `${timestamp}_${random}.${ext}`, {
      type: blob.type,
    });

    return file;
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface useMultiImageUploaderReturn {
  images: UploadedImage[];
  upload: (files: File | File[] | FileList | null) => void;
  remove: (index: number) => void;
  reset: () => void;
  defaultUrlUpload: (urls: string[] | string) => Promise<void>;
}

interface useSingleImageUploaderReturn {
  images: UploadedImage | undefined;
  upload: (files: File | File[] | FileList | null) => void;
  remove: () => void;
  reset: () => void;
  defaultUrlUpload: (urls: string[] | string) => Promise<void>;
}

export function useImageUploader(type: 'multi'): useMultiImageUploaderReturn;

export function useImageUploader(type: 'single'): useSingleImageUploaderReturn;

export function useImageUploader(type: 'multi' | 'single') {
  const [images, setImages] = useState<UploadedImage[]>([]);

  const defaultUrlUpload = useCallback(
    async (urls: string[] | string) => {
      const defaultUrls = Array.isArray(urls) ? urls : [urls];

      const filePromises = defaultUrls.map(async (url) => {
        const file = await loadFile(url);
        return file ? { file, url } : null;
      });

      const imageDataArray = (await Promise.all(filePromises)).filter(
        (data) => data !== null
      );

      if (type === 'multi') {
        setImages(imageDataArray);
      } else {
        setImages([imageDataArray[0]]);
      }
    },
    [type]
  );

  const upload = useCallback(
    (files: File | File[] | FileList | null) => {
      if (!files) return;

      const fileArray =
        files instanceof FileList || Array.isArray(files)
          ? Array.from(files)
          : [files];

      const uploadFileInfo = fileArray.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

      if (type === 'multi') {
        setImages((prev) => [...prev, ...uploadFileInfo]);
      }
      if (type === 'single') {
        setImages([uploadFileInfo[0]]);
      }
    },
    [type]
  );

  const removeMulti = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const removeSingle = useCallback(() => {
    setImages([]);
  }, []);

  const reset = useCallback(() => {
    setImages([]);
  }, []);

  return {
    images:
      type === 'multi' ? images : (images[0] as UploadedImage | undefined),
    upload,
    remove: type === 'multi' ? removeMulti : removeSingle,
    reset,
    defaultUrlUpload,
  };
}
