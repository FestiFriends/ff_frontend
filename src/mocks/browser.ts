import { setupWorker } from 'msw/browser';
// import { chatHandlers } from './handlers/chatHandlers';
import { groupsHandlers } from './handlers/groupsHandlers';
import { nicknameHandlers } from './handlers/nicknameHandlers';
import { notificationHandlers } from './handlers/notificationHandlers';
import { performancesHandlers } from './handlers/performancesHandlers';
import { profileHandlers } from './handlers/profileHandlers';
import { reportHandlers } from './handlers/reportHandlers';
import { reviewsHandlers } from './handlers/reviewsHandlers';
import { scheduleHandlers } from './handlers/scheduleHandlers';
import { usersHandlers } from './handlers/usersHandlers';

export const worker = setupWorker(
  ...profileHandlers,
  ...performancesHandlers,
  ...reviewsHandlers,
  ...notificationHandlers,
  ...groupsHandlers,
  ...usersHandlers,
  ...nicknameHandlers,
  ...reportHandlers,
  // ...chatHandlers,
  ...scheduleHandlers
);
