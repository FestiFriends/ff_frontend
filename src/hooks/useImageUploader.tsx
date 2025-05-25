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

export const useImageUploader = <T extends 'multi' | 'single'>(type: T) => {
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
    (files: File | FileList | null) => {
      if (!files) return;

      const fileArray = files instanceof FileList ? Array.from(files) : [files];

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

  const remove = useCallback(
    (index: number) => {
      if (type === 'multi') {
        setImages((prev) => prev.filter((_, i) => i !== index));
      } else {
        setImages([]);
      }
    },
    [type]
  );

  const reset = useCallback(() => {
    setImages([]);
  }, []);

  return {
    images:
      type === 'multi'
        ? (images as T extends 'multi' ? UploadedImage[] : never)
        : (images[0] as T extends 'single' ? UploadedImage | undefined : never),
    upload,
    remove,
    reset,
    defaultUrlUpload,
  };
};
