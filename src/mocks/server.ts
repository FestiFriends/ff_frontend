import { setupServer } from 'msw/node';
import { performancesHandlers } from './handlers/performancesHandlers';

export const server = setupServer(...performancesHandlers);
