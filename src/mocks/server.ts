import { setupServer } from 'msw/node';
import { groupsHandlers } from './handlers/groupsHandlers';
import { performanceDetailHandlers } from './handlers/performanceDetailHandlers';
import { performancesHandlers } from './handlers/performancesHandlers';
import { reviewsHandlers } from './handlers/reviewsHandlers';

export const server = setupServer(
  ...performancesHandlers,
  ...reviewsHandlers,
  ...performanceDetailHandlers,
  ...groupsHandlers
);
