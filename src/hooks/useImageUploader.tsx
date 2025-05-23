import { useCallback, useState } from 'react';

export interface UploadedImage {
  file: File;
  url: string;
}

const loadFile = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
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
};

export const useMultipleImageUploader = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);

  const defaultUrlUpload = useCallback(async (urls: string[]) => {
    const filePromises = urls.map(async (url) => {
      const file = await loadFile(url);
      return { file, url };
    });

    const imageDataArray = await Promise.all(filePromises);
    setImages(imageDataArray);
  }, []);

  const upload = useCallback((files: File | FileList | null) => {
    if (!files) return;

    const fileArray = files instanceof FileList ? Array.from(files) : [files];
    const uploadFileInfo = fileArray.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...uploadFileInfo]);
  }, []);

  const remove = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const reset = useCallback(() => {
    setImages([]);
  }, []);

  return { defaultUrlUpload, images, upload, remove, reset };
};

export const useSingleImageUploader = () => {
  const [image, setImage] = useState<UploadedImage | null>(null);

  const defaultUrlUpload = useCallback(async (url: string) => {
    const file = await loadFile(url);
    setImage({ file, url });
  }, []);

  const upload = useCallback((files: File | FileList | null) => {
    if (!files) return;
    const file = files instanceof FileList ? files[0] : files;
    setImage({ file, url: URL.createObjectURL(file) });
  }, []);

  const remove = useCallback(() => {
    setImage(null);
  }, []);

  return { image, upload, remove, defaultUrlUpload };
};
