import { setupServer } from 'msw/node';
import { performancesHandlers } from './handlers/performancesHandlers';
import { reviewsHandlers } from './handlers/reviewsHandlers';

export const server = setupServer(
  ...performancesHandlers,
  ...reviewsHandlers,
  ...performancesHandlers
);
