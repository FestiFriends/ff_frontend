export interface Performance {
  id: string; // 공연 ID
  title: string; // 공연명
  startDate: string; // 공연 시작 날짜 (ISO 8601)
  endDate: string; // 공연 종료 날짜 (ISO 8601)
  location: string; // 공연 장소
  cast: string[]; // 공연 출연진
  crew?: string[]; // 공연 제작진
  runtime?: string; // 공연 런타임
  age?: string; // 관람 연령
  productionCompany?: string[]; // 제작사
  agency?: string[]; // 기획사
  host?: string[]; // 주최
  organizer?: string[]; // 주관
  price: string[]; // 티켓 가격
  poster?: string; // 포스터 이미지 URL
  state: string; // 공연 상태
  visit: string; // 내한 여부
  imgs?: {
    // 소개 이미지 목록
    id: string; // 이미지 ID
    src: string; // 소개 이미지 URL
    alt?: string; // 소개 이미지 설명
  }[];
  time: string[]; // 공연 시간 (ISO 8601) 배열
}
