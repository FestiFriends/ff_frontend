import { setupWorker } from 'msw/browser';
import { groupsHandlers } from './handlers/groupsHandlers';
import { notificationHandlers } from './handlers/notificationHandlers';
import { performanceDetailHandlers } from './handlers/performanceDetailHandlers';
import { performancesHandlers } from './handlers/performancesHandlers';
import { profileHandlers } from './handlers/profileHandlers';
import { reviewsHandlers } from './handlers/reviewsHandlers';

export const worker = setupWorker(
  ...profileHandlers,
  ...performancesHandlers,
  ...reviewsHandlers,
  ...notificationHandlers,
  ...performanceDetailHandlers,
  ...groupsHandlers
);
