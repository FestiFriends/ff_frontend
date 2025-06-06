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
