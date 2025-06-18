import apiFetcher from '@/lib/apiFetcher';
import { ApiResponse } from '@/types/api';
import { GroupCategory, Gender } from '@/types/enums';
import {
  GetGroupsParams,
  CreateGroupFormData,
  CreateGroupApiRequest,
} from '@/types/group';
import { PerformanceGroupsApiResponse } from '@/utils/formatGroupCardData';

export const groupsApi = {
  getGroups: async ({
    performanceId,
    page,
    size,
    sortType,
    category,
    startDate,
    endDate,
    location,
    gender,
  }: GetGroupsParams) =>
    await apiFetcher.get<PerformanceGroupsApiResponse>(
      `/api/v1/performances/${performanceId}/groups`,
      {
        params: {
          page,
          size,
          sortType,
          category,
          startDate,
          endDate,
          location,
          gender,
        },
      }
    ),

  createGroup: async (performanceId: string, data: CreateGroupFormData) => {
    const apiRequest: CreateGroupApiRequest = {
      performanceId,
      title: data.title,
      category:
        data.category === '동행'
          ? GroupCategory.COMPANION
          : data.category === '탑승'
            ? GroupCategory.RIDE_SHARE
            : GroupCategory.ROOM_SHARE,
      gender:
        data.gender === '남성'
          ? Gender.MALE
          : data.gender === '여성'
            ? Gender.FEMALE
            : Gender.ALL,
      startAge: data.ageRange[0],
      endAge: data.ageRange[1],
      location: data.region,
      startDate: data.dateRange.startDate
        ? data.dateRange.startDate.toISOString()
        : '',
      endDate: data.dateRange.endDate
        ? data.dateRange.endDate.toISOString()
        : '',
      maxMembers: data.maxParticipants,
      description: data.description,
      hashtag: data.tags,
    };

    return await apiFetcher.post<
      ApiResponse<{ groupId: string; performanceId: string }>
    >(`/api/v1/groups`, apiRequest);
  },
};
