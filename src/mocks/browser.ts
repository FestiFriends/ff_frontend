import { setupWorker } from 'msw/browser';
import { performanceDetailHandlers } from './handlers/performanceDetailHandlers';
import { performanceListHandlers } from './handlers/performanceListHandlers';
import { profileHandlers } from './handlers/profileHandlers';

export const worker = setupWorker(
  ...profileHandlers,
  ...performanceDetailHandlers,
  ...performanceListHandlers
);
