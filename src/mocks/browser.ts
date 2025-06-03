import { setupWorker } from 'msw/browser';
import { performanceDetailHandlers } from './handlers/performanceDetail';
import { profileHandlers } from './handlers/profileHandlers';

export const worker = setupWorker(
  ...profileHandlers,
  ...performanceDetailHandlers
);
