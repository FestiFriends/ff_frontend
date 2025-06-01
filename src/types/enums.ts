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
