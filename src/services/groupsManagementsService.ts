import apiFetcher from '@/lib/apiFetcher';
import { ApiResponse, CursorRequest } from '@/types/api';
import { ApplicationStatus, ApplicationStatusType } from '@/types/enums';
import {
  ApplicationsApiResponse,
  AppliedGroupsApiResponse,
} from '@/utils/formatApplicationData';
import { JoinedGroupsApiResponse } from '@/utils/formatGroupCardData';

export const groupsManagementsApi = {
  // 신청한 모임 목록
  getAppliedGroups: async ({ cursorId, size = 20 }: CursorRequest) =>
    await apiFetcher.get<AppliedGroupsApiResponse>(
      `/api/v1/managements/applied`,
      {
        params: {
          cursorId,
          size,
        },
      }
    ),

  // 신청 취소
  deleteAppliedGroup: async (applicationId: string) => {
    const response = await apiFetcher.delete<ApiResponse>(
      `/api/v1/managements/applied/${applicationId}`
    );

    return response.data;
  },

  // 참가 확정
  patchConfirmJoin: async (applicationId: string) => {
    const response = await apiFetcher.patch<ApiResponse>(
      `/api/v1/managements/applied/${applicationId}`,
      {
        status: ApplicationStatus.CONFIRMED,
      }
    );

    return response.data;
  },

  // 참가 중 모임 목록
  getJoinedGroups: async ({ cursorId, size = 20 }: CursorRequest) =>
    await apiFetcher.get<JoinedGroupsApiResponse>(
      `/api/v1/managements/joined`,
      {
        params: {
          cursorId,
          size,
        },
      }
    ),

  // 모임 탈퇴
  deleteJoinedGroup: async (groupId: string) => {
    const response = await apiFetcher.delete<ApiResponse>(
      `/api/v1/groups/${groupId}/leave`
    );

    return response.data;
  },

  // 받은 신청서 목록
  getApplications: async ({ cursorId, size = 20 }: CursorRequest) =>
    await apiFetcher.get<ApplicationsApiResponse>(
      `/api/v1/managements/applications`,
      {
        params: { cursorId, size },
      }
    ),

  // 신청서 수락, 거절
  patchApplication: async (
    applicationId: string,
    status: ApplicationStatusType
  ) => {
    const response = await apiFetcher.patch<ApiResponse>(
      `/api/v1/managements/${applicationId}`,
      { status }
    );

    return response.data;
  },
};
