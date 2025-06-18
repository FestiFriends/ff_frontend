export const PERFORMANCES_QUERY_KEYS = {
  performances: 'performances',
  topFavorites: 'topFavorites',
  topByGroupCount: 'topByGroupCount',
  favoritesPerformances: 'favoritesPerformances',
};

export const NOTIFICATIONS_QUERY_KEYS = {
  notifications: 'notifications',
  newNotifications: 'newNotifications',
};

export const GROUP_QUERY_KEYS = {
  groups: 'groups',
  groupInfo: 'groupInfo',
  leaveGroup: 'leaveGroup',
  joinGroup: 'joinGroup',
  groupPosts: 'groupPosts',
  createGroup: 'createGroup',
};

export const REVIEWS_QUERY_KEYS = {
  reviews: 'reviews',
  written: 'written',
  writable: 'writable',
};

export const USERS_QUERY_KEYS = {
  users: 'users',
  favoriteUsers: 'favoriteUsers',
  myProfile: 'myProfile',
  profile: (userId: string) => ['profile', userId] as const,
  userId: 'userId',
};

export const GROUPS_MANAGEMENTS_QUERY_KEYS = {
  appliedGroups: 'appliedGroups',
  joinedGroups: 'joinedGroups',
  applications: 'applications',
};

export const CHAT_QUERY_KEY = {
  chat: 'chat',
};

export const POSTS_QUERY_KEYS = {
  postDetail: 'postDetail',
  comments: 'comments',
};
