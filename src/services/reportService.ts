import apiFetcher from '@/lib/apiFetcher';
import { ApiResponse, PageRequest } from '@/types/api';
import {
  ReportAction,
  ReportDetailResponse,
  ReportListResponse,
} from '@/types/report';

export const reportApi = {
  getReportList: async ({ page, size = 8 }: PageRequest) =>
    (
      await apiFetcher.get<ReportListResponse>('/api/v1/reports', {
        params: { page, size },
      })
    ).data,

  getReportDetail: async (id: string) =>
    (await apiFetcher.get<ReportDetailResponse>(`/api/v1/reports/${id}`)).data,

  patchReport: async ({ id, action }: PatchReportProps) =>
    await apiFetcher.patch<ApiResponse, ApiResponse, ReportAction>(
      `/api/v1/reports/${id}`,
      { reportStatus: action }
    ),
};

export interface PatchReportProps {
  id: string;
  action: ReportAction['reportStatus'];
}
