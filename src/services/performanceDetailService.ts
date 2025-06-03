import axiosFetcher from '@/lib/axiosFetcher';
import { Performance } from '@/types/performance';

export const performanceDetailApi = {
  getPerformanceDetail: async (id: string): Promise<Performance> => {
    const res = await axiosFetcher.get<Performance>(
      `/api/v1/performances/${id}`
    );
    return res.data;
  },
};
