import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GROUPS_MANAGEMENTS_QUERY_KEYS } from '@/constants/queryKeys';
import { groupsManagementsApi } from '@/services/groupsManagementsService';
import { ApiResponse } from '@/types/api';

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
