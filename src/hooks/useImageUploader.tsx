import { useCallback, useState } from 'react';

export interface UploadedImage {
  file: File;
  url: string;
}

export const useMultipleImageUploader = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);

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

  return { images, upload, remove, reset };
};
