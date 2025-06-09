import { setupServer } from 'msw/node';
import { groupsHandlers } from './handlers/groupsHandlers';
import { performancesHandlers } from './handlers/performancesHandlers';
import { reviewsHandlers } from './handlers/reviewsHandlers';
import { usersHandlers } from './handlers/usersHandlers';

export const server = setupServer(
  ...usersHandlers,
  ...performancesHandlers,
  ...reviewsHandlers,
  ...groupsHandlers
);
