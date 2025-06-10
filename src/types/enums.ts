export const GroupCategory = {
  COMPANION: 'COMPANION',
  RIDE_SHARE: 'RIDE_SHARE',
  ROOM_SHARE: 'ROOM_SHARE',
} as const;

export type GroupCategoryType =
  (typeof GroupCategory)[keyof typeof GroupCategory];

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
  COMMUNICATIVE: 'COMMUNICATIVE', // 대화가 잘 통했어요
  RECOMMEND: 'RECOMMEND', // 다음에도 함께하고 싶어요
  POLITE: 'POLITE', // 친절하고 매너가 좋아요
  PUNCTUAL: 'PUNCTUAL', // 시간 약속을 잘 지켜요
  CLEAN: 'CLEAN', // 청결하고 깔끔했어요
  COMFORTABLE: 'COMFORTABLE', // 편안한 분위기였어요
  RESPONSIVE: 'RESPONSIVE', // 소통이 잘 되고 응답이 빨라요
} as const;

export type ReviewTagType = (typeof ReviewTag)[keyof typeof ReviewTag];

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

export const ApplicationStatus = {
  PENDING: 'PENDING', // 대기(신청했을 때 default)
  ACCEPTED: 'ACCEPTED', // 수락(대기 -> 모임 방장이 수락)
  REJECTED: 'REJECTED', // 거절(신청 -> 모임 방장이 거절 또는 대기/수락 -> 신청자가 가입 거절)
  CONFIRMED: 'CONFIRMED', // 확정(수락 -> 신청자가 확정)
} as const;

export type ApplicationStatusType =
  (typeof ApplicationStatus)[keyof typeof ApplicationStatus];
