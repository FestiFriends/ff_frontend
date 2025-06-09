import { setupWorker } from 'msw/browser';
import { groupsHandlers } from './handlers/groupsHandlers';
import { notificationHandlers } from './handlers/notificationHandlers';
import { performancesHandlers } from './handlers/performancesHandlers';
import { profileHandlers } from './handlers/profileHandlers';
import { reviewsHandlers } from './handlers/reviewsHandlers';
import { usersHandlers } from './handlers/usersHandlers';

export const worker = setupWorker(
  ...profileHandlers,
  ...performancesHandlers,
  ...reviewsHandlers,
  ...performancesHandlers,
  ...notificationHandlers,
  ...groupsHandlers,
  ...usersHandlers
);
