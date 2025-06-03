import { setupWorker } from 'msw/browser';
import { performanceDetailHandlers } from './handlers/performanceDetailHandlers';
import { profileHandlers } from './handlers/profileHandlers';

export const worker = setupWorker(
  ...profileHandlers,
  ...performanceDetailHandlers
);
