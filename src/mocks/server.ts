import { setupServer } from 'msw/node';
import { performancesHandler } from './handlers/performancesHandler';

export const server = setupServer(...performancesHandler);
