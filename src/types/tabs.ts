export const favoriteTabLabel = {
  USERS: '찜한 유저',
  PERFORMANCES: '찜한 공연',
} as const;

export type TabLabelType =
  (typeof favoriteTabLabel)[keyof typeof favoriteTabLabel];

export const reviewTabLabel = {
  WRITABLE_REVIEW: '작성 가능 리뷰',
  WRITTEN_REVIEW: '작성한 리뷰',
  RECEIVED_REVIEW: '받은 리뷰',
} as const;

export type ReviewTabLabelType =
  (typeof reviewTabLabel)[keyof typeof reviewTabLabel];
