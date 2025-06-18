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
  SEOUL: 'SEOUL',
  BUSAN: 'BUSAN',
  DAEGU: 'DAEGU',
  INCHEON: 'INCHEON',
  GWANGJU: 'GWANGJU',
  DAEJEON: 'DAEJEON',
  ULSAN: 'ULSAN',
  GYEONGGI: 'GYEONGGI',
  CHUNGBUK: 'CHUNGBUK',
  CHUNGNAM: 'CHUNGNAM',
  JEONBUK: 'JEONBUK',
  JEONNAM: 'JEONNAM',
  GYEONGBUK: 'GYEONGBUK',
  GYEONGNAM: 'GYEONGNAM',
  SEJONG: 'SEJONG',
  JEJU: 'JEJU',
  GANGWON: 'GANGWON',
} as const;

export type LocationType = keyof typeof Location;

export const ApplicationStatus = {
  PENDING: 'PENDING', // 대기(신청했을 때 default)
  ACCEPTED: 'ACCEPTED', // 수락(대기 -> 모임 방장이 수락)
  REJECTED: 'REJECTED', // 거절(신청 -> 모임 방장이 거절 또는 대기/수락 -> 신청자가 가입 거절)
  CONFIRMED: 'CONFIRMED', // 확정(수락 -> 신청자가 확정)
} as const;

export type ApplicationStatusType =
  (typeof ApplicationStatus)[keyof typeof ApplicationStatus];

export const GroupSort = {
  DATE_ASC: 'date_asc',
  DATE_DESC: 'date_desc',
} as const;

export type GroupSortType = (typeof GroupSort)[keyof typeof GroupSort];

export const ReportTarget = {
  GROUP: 'GROUP', // 모임
  REVIEW: 'REVIEW', // 리뷰
  USER: 'USER', // 사용자
  CHAT: 'CHAT', // 채팅
  POST: 'POST', // 게시글
  COMMENT: 'COMMENT', // 댓글
} as const;

export type ReportTargetType = (typeof ReportTarget)[keyof typeof ReportTarget];

export const ReportStatus = {
  PENDING: 'PENDING', // 미처리 (보류)
  APPROVED: 'APPROVED', // 승인
  REJECTED: 'REJECTED', // 반려
} as const;

export type ReportStatusType = (typeof ReportStatus)[keyof typeof ReportStatus];
