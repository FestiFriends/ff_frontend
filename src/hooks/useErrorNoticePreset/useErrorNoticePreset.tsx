import StateNotice, {
  StateNoticePreset,
} from '@/components/common/StateNotice/StateNotice';

type ErrorWithCode = { code: number };

export const getErrorNoticePreset = (error: unknown): StateNoticePreset => {
  if (
    typeof error === 'object'
    && error !== null
    && 'code' in error
    && typeof (error as ErrorWithCode).code === 'number'
  ) {
    const code = (error as ErrorWithCode).code;
    if (code === 400) return 'badRequest';
    if (code === 404) return 'notfound';
    return 'error';
  }
  return 'error';
};

export const renderErrorNotice = (error: unknown, height = '100%') => {
  const preset = getErrorNoticePreset(error);
  return (
    <StateNotice
      preset={preset}
      height={height}
    />
  );
};
