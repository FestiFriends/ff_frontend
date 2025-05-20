import { server } from './src/mock/index';
import '@testing-library/jest-dom';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
