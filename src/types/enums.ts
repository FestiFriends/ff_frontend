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

export const ReviewTag = {
  PUNCTUAL: 'PUNCTUAL', // 시간 약속을 잘 지켜요
  POLITE: 'POLITE', // 친절하고 매너가 좋아요
  COMFORTABLE: 'COMFORTABLE', // 편안한 분위기였어요
  COMMUNICATIVE: 'COMMUNICATIVE', // 대화가 잘 통했어요
  CLEAN: 'CLEAN', // 청결하고 깔끔했어요
  RESPONSIVE: 'RESPONSIVE', // 소통이 잘 되고 응답이 빨라요
  RECOMMEND: 'RECOMMEND', // 다음에도 함께하고 싶어요
};

export type ReviewTagType = (typeof ReviewTag)[keyof typeof ReviewTag];
