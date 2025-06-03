import { setupServer } from 'msw/node';
import { performanceDetailHandlers } from './handlers/performanceDetailHandlers';

export const server = setupServer(...performanceDetailHandlers);
