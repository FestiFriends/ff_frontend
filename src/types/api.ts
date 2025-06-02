export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data?: T;
}

export interface Image {
  id?: string; // 이미지 ID
  src: string; // 이미지 경로 (url)
  alt?: string; // 이미지 파일명
}
