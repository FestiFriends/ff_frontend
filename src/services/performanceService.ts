import { Performance } from '@/types/performance';

interface GetPerformancesParams {
  keyword?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  sort?: string;
  page?: number;
  size?: number;
}

interface PerformanceListResponse {
  code: number;
  message: string;
  data?: Performance[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export const performanceApi = {
  getPerformances: async (
    params: GetPerformancesParams = {}
  ): Promise<Performance[]> => {
    const query = new URLSearchParams(
      params as Record<string, string>
    ).toString();

    const res = await fetch(`/api/v1/performances?${query}`);

    const json: PerformanceListResponse = await res.json();

    return json.data ?? [];
  },
};
