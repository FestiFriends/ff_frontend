import { setupWorker } from 'msw/browser';
import { performancesHandlers } from './handlers/performancesHandlers';
import { profileHandlers } from './handlers/profileHandlers';

export const worker = setupWorker(...profileHandlers, ...performancesHandlers);
