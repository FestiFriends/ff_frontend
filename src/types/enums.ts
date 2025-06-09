export const GroupCategory = {
  COMPANION: '같이 동행',
  RIDE_SHARE: '같이 탑승',
  ROOM_SHARE: '같이 숙박',
} as const;

export type GroupCategoryType = keyof typeof GroupCategory;

export const Gender = {
  FEMALE: 'FEMALE',
  MALE: 'MALE',
  ALL: 'ALL',
} as const;

export type GenderType = (typeof Gender)[keyof typeof Gender];

export const ReportReason = {
  PROFANITY: 'PROFANITY',
  ADVERTISEMENT: 'ADVERTISEMENT',
  ILLEGAL: 'ILLEGAL',
  SEXUAL: 'SEXUAL',
  PERSONAL_INFO: 'PERSONAL_INFO',
  SPAM: 'SPAM',
} as const;

export type ReportReasonType = (typeof ReportReason)[keyof typeof ReportReason];

export const ReviewTag = {
  COMMUNICATIVE: '대화가 잘 통했어요', // 대화가 잘 통했어요
  RECOMMEND: '다음에도 함께하고 싶어요', // 다음에도 함께하고 싶어요
  POLITE: '친절하고 매너가 좋아요', // 친절하고 매너가 좋아요
  PUNCTUAL: '시간 약속을 잘 지켜요', // 시간 약속을 잘 지켜요
  CLEAN: '청결하고 깔끔했어요', // 청결하고 깔끔했어요
  COMFORTABLE: '편안한 분위기였어요', // 편안한 분위기였어요
  RESPONSIVE: '소통이 잘 되고 응답이 빨라요', // 소통이 잘 되고 응답이 빨라요
} as const;

export type ReviewTagType = keyof typeof ReviewTag;

export const Location = {
  SEOUL: '서울특별시',
  BUSAN: '부산광역시',
  DAEGU: '대구광역시',
  INCHEON: '인천광역시',
  GWANGJU: '광주광역시',
  DAEJEON: '대전광역시',
  ULSAN: '울산광역시',
  GYEONGGI: '경기도',
  CHUNGBUK: '충청북도',
  CHUNGNAM: '충청남도',
  JEONBUK: '전라북도',
  JEONNAM: '전라남도',
  GYEONGBUK: '경상북도',
  GYEONGNAM: '경상남도',
  SEJONG: '세종특별자치시',
  JEJU: '제주특별자치도',
  GANGWON: '강원도',
};

export type LocationType = keyof typeof Location;
