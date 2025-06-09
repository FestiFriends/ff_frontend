export interface ApiError {
  code: number;
  message: string;
}

export const isApiError = (error: unknown): error is ApiError =>
  typeof error === 'object'
  && error !== null
  && 'code' in error
  && 'message' in error
  && typeof (error as ApiError).message === 'string';
