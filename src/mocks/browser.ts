import { setupWorker } from 'msw/browser';
import { performancesHandler } from './handlers/performancesHandler';
import { profileHandlers } from './handlers/profileHandlers';

export const worker = setupWorker(...profileHandlers, ...performancesHandler);
