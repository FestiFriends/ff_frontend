export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  error: boolean;
  success: boolean;
  data?: T;
}
