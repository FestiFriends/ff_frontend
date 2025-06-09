import { setupServer } from 'msw/node';
import { groupsHandlers } from './handlers/groupsHandlers';
import { performancesHandlers } from './handlers/performancesHandlers';
import { reviewsHandlers } from './handlers/reviewsHandlers';

export const server = setupServer(
  ...reviewsHandlers,
  ...performancesHandlers,
  ...groupsHandlers
);
