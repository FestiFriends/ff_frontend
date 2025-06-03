import axiosFetcher from '@/lib/axiosFetcher';

export const performanceDetailApi = {
  getPerformanceDetail: async (id: string) => {
    const res = await axiosFetcher.get<Performance>(
      `/api/v1/performances/${id}`
    );
    return res;
  },
};
