import {
  useMutation,
  useQueryClient,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { PatchReportProps, reportApi } from '@/services/reportService';
import { ApiResponse } from '@/types/api';
import {
  CreateReportRequest,
  ReportDetailResponse,
  ReportListResponse,
} from '@/types/report';

export const reportListOption = (
  page: number
): UseSuspenseQueryOptions<ReportListResponse> => ({
  queryKey: ['reports', 'page', page],
  queryFn: () => reportApi.getReportList({ page: page }),
});

export const reportDetailOption = (
  id: string
): UseSuspenseQueryOptions<ReportDetailResponse> => ({
  queryKey: ['reports', id],
  queryFn: () => reportApi.getReportDetail(id),
});

export const usePatchReport = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, ApiResponse, PatchReportProps>({
    mutationFn: reportApi.patchReport,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['reports'],
      });
    },
  });
};

export const usePostReport = () =>
  useMutation<ApiResponse, ApiResponse, CreateReportRequest>({
    mutationFn: reportApi.postReport,
  });
