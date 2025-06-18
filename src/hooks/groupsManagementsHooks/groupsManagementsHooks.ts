import { InfiniteData } from '@tanstack/react-query';
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { GROUPS_MANAGEMENTS_QUERY_KEYS } from '@/constants/queryKeys';
import { groupsManagementsApi } from '@/services/groupsManagementsService';
import { ApiResponse } from '@/types/api';
import { ApplicationStatusType } from '@/types/enums';
import {
  ApplicationsApiResponse,
  AppliedGroupsApiResponse,
} from '@/utils/formatApplicationData';
import { JoinedGroupsApiResponse } from '@/utils/formatGroupCardData';

// 신청한 모임 목록
export const useGetAppliedGroups = () => {
  const size = 20;
  return useInfiniteQuery<
    AxiosResponse<AppliedGroupsApiResponse>,
    ApiResponse,
    InfiniteData<AxiosResponse<AppliedGroupsApiResponse>>,
    string[],
    number | undefined
  >({
    queryKey: [GROUPS_MANAGEMENTS_QUERY_KEYS.appliedGroups],
    queryFn: ({ pageParam }) =>
      groupsManagementsApi.getAppliedGroups({ cursorId: pageParam, size }),
    getNextPageParam: (lastPage) =>
      lastPage.data?.hasNext ? lastPage.data?.cursorId : undefined,
    initialPageParam: undefined,
  });
};

// 신청 취소
export const useCancelApplication = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, ApiResponse, { applicationId: string }>({
    mutationFn: ({ applicationId }) =>
      groupsManagementsApi.deleteAppliedGroup(applicationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GROUPS_MANAGEMENTS_QUERY_KEYS.appliedGroups],
      });
    },
  });
};

// 참가 확정
export const useConfirmApplication = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, ApiResponse, { applicationId: string }>({
    mutationFn: ({ applicationId }) =>
      groupsManagementsApi.patchConfirmJoin(applicationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GROUPS_MANAGEMENTS_QUERY_KEYS.appliedGroups],
      });
    },
  });
};

// 참가중인 모임 목록
export const useGetJoinedGroups = () => {
  const size = 20;
  return useInfiniteQuery<
    AxiosResponse<JoinedGroupsApiResponse>,
    ApiResponse,
    InfiniteData<AxiosResponse<JoinedGroupsApiResponse>>,
    string[],
    number | undefined
  >({
    queryKey: [GROUPS_MANAGEMENTS_QUERY_KEYS.joinedGroups],
    queryFn: ({ pageParam }) =>
      groupsManagementsApi.getJoinedGroups({ cursorId: pageParam, size }),
    getNextPageParam: (lastPage) =>
      lastPage.data?.hasNext ? lastPage.data?.cursorId : undefined,
    initialPageParam: undefined,
  });
};

// 모임 탈퇴
export const useLeaveGroup = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, ApiResponse, { groupId: string }>({
    mutationFn: ({ groupId }) =>
      groupsManagementsApi.deleteJoinedGroup(groupId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GROUPS_MANAGEMENTS_QUERY_KEYS.joinedGroups],
      });
    },
  });
};

// 받은 신청서 목록
export const useGetApplications = () => {
  const size = 20;
  return useInfiniteQuery<
    AxiosResponse<ApplicationsApiResponse>,
    ApiResponse,
    InfiniteData<AxiosResponse<ApplicationsApiResponse>>,
    string[],
    number | undefined
  >({
    queryKey: [GROUPS_MANAGEMENTS_QUERY_KEYS.applications],
    queryFn: ({ pageParam }) =>
      groupsManagementsApi.getApplications({ cursorId: pageParam, size }),
    getNextPageParam: (lastPage) =>
      lastPage.data?.hasNext ? lastPage.data?.cursorId : undefined,
    initialPageParam: undefined,
  });
};

// 신청서 수락, 거절
export const usePatchApplication = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    ApiResponse,
    { applicationId: string; status: ApplicationStatusType }
  >({
    mutationFn: ({ applicationId, status }) =>
      groupsManagementsApi.patchApplication(applicationId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GROUPS_MANAGEMENTS_QUERY_KEYS.applications],
      });
    },
  });
};
