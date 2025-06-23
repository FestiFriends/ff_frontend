import apiFetcher from '@/lib/apiFetcher';
import { Gender } from '@/types/enums';
import {
  GetGroupsParams,
  CreateGroupFormData,
  PostJoinGroupRequest,
  ScheduleRequest,
  GetGroupMembersRequest,
  PatchGroupMemberRoleRequest,
  DeleteGroupMemberRequest,
  UpdateGroupApiRequest,
} from '@/types/group';
import { groupsApi } from './groupsService';

// apiFetcher 모킹
jest.mock('@/lib/apiFetcher', () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
}));

jest.mock('@/utils/date', () => ({
  formatPostDate: jest.fn((date) => date),
}));

const mockApiFetcher = apiFetcher as jest.Mocked<typeof apiFetcher>;

describe('groupsApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getGroups', () => {
    it('성공적으로 그룹 목록을 가져온다', async () => {
      const mockResponse = {
        data: {
          groups: [{ id: 1, title: '테스트 그룹', performanceId: '123' }],
        },
      };

      mockApiFetcher.get.mockResolvedValue(mockResponse);

      const params: GetGroupsParams = {
        performanceId: '123',
        category: 'CONCERT',
        page: 1,
        size: 10,
      };

      const result = await groupsApi.getGroups(params);

      expect(mockApiFetcher.get).toHaveBeenCalledWith(
        '/api/v1/performances/123/groups?category=CONCERT&page=1&size=10'
      );
      expect(result).toEqual(mockResponse);
    });

    it('null 값은 쿼리스트링에서 제외한다', async () => {
      const mockResponse = { data: { groups: [] } };
      mockApiFetcher.get.mockResolvedValue(mockResponse);

      const params: GetGroupsParams = {
        performanceId: '123',
        category: null,
        page: 1,
      };

      await groupsApi.getGroups(params);

      expect(mockApiFetcher.get).toHaveBeenCalledWith(
        '/api/v1/performances/123/groups?page=1'
      );
    });
  });

  describe('getGroupInfo', () => {
    it('성공적으로 그룹 정보를 가져온다', async () => {
      const mockGroupInfo = {
        id: '123',
        title: '테스트 그룹',
        description: '테스트 그룹 설명',
      };

      mockApiFetcher.get.mockResolvedValue({
        data: mockGroupInfo,
      });

      const result = await groupsApi.getGroupInfo('123');

      expect(mockApiFetcher.get).toHaveBeenCalledWith('/api/v1/groups/123');
      expect(result).toEqual(mockGroupInfo);
    });
  });

  describe('postJoinGroup', () => {
    it('성공적으로 그룹에 참가한다', async () => {
      const mockResponse = {
        data: { code: 200, message: 'Success' },
      };

      mockApiFetcher.post.mockResolvedValue(mockResponse);

      const joinRequest: PostJoinGroupRequest = {
        groupId: '123',
        description: '참가 요청 메시지',
      };

      const result = await groupsApi.postJoinGroup(joinRequest);

      expect(mockApiFetcher.post).toHaveBeenCalledWith(
        '/api/v1/groups/123/join',
        { description: '참가 요청 메시지' }
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getGroupPosts', () => {
    it('성공적으로 그룹 게시물을 가져온다', async () => {
      const mockPosts = [
        { id: 1, title: '게시물 1', createdAt: '2023-01-01' },
        { id: 2, title: '게시물 2', createdAt: '2023-01-02' },
      ];

      mockApiFetcher.get.mockResolvedValue({
        data: {
          data: {
            groupId: 123,
            posts: mockPosts,
          },
        },
      });

      const result = await groupsApi.getGroupPosts({ groupId: '123' });

      expect(mockApiFetcher.get).toHaveBeenCalledWith(
        '/api/v1/groups/123/posts'
      );
      expect(result.groupId).toBe(123);
      expect(result.posts).toHaveLength(2);
    });
  });

  describe('createGroup', () => {
    it('성공적으로 그룹을 생성한다', async () => {
      const mockResponse = {
        data: { groupId: '456', performanceId: '123' },
      };

      mockApiFetcher.post.mockResolvedValue(mockResponse);

      const formData: CreateGroupFormData = {
        title: '새 그룹',
        category: 'CONCERT',
        gender: '전체',
        name: '새 그룹',
        ageRange: [20, 30],
        region: '서울',
        dateRange: {
          startDate: new Date('2023-01-01'),
          endDate: new Date('2023-01-31'),
        },
        maxParticipants: 10,
        description: '새 그룹 설명',
        tags: ['태그1', '태그2'],
      };

      const result = await groupsApi.createGroup('123', formData);

      expect(mockApiFetcher.post).toHaveBeenCalledWith(
        '/api/v1/groups',
        expect.objectContaining({
          performanceId: '123',
          title: '새 그룹',
          category: 'CONCERT',
          gender: Gender.ALL,
          startAge: 20,
          endAge: 30,
          location: '서울',
          maxMembers: 10,
          description: '새 그룹 설명',
          hashtag: ['태그1', '태그2'],
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('성별 매핑이 올바르게 작동한다', async () => {
      mockApiFetcher.post.mockResolvedValue({ data: {} });

      const maleFormData: CreateGroupFormData = {
        title: '남성 그룹',
        category: 'CONCERT',
        gender: '남성',
        name: '남성 그룹',
        ageRange: [20, 30],
        region: '서울',
        dateRange: { startDate: null, endDate: null },
        maxParticipants: 10,
        description: '남성 그룹',
        tags: [],
      };

      await groupsApi.createGroup('123', maleFormData);

      expect(mockApiFetcher.post).toHaveBeenCalledWith(
        '/api/v1/groups',
        expect.objectContaining({
          gender: Gender.MALE,
        })
      );
    });
  });

  describe('getSchedules', () => {
    it('성공적으로 일정 목록을 가져온다', async () => {
      const mockSchedules = [
        { id: 1, title: '일정 1', date: '2023-01-01' },
        { id: 2, title: '일정 2', date: '2023-01-02' },
      ];

      mockApiFetcher.get.mockResolvedValue({
        data: {
          data: {
            scheduleCount: 2,
            schedules: mockSchedules,
          },
        },
      });

      const result = await groupsApi.getSchedules('123', {
        startDate: '2023-01-01',
        endDate: '2023-01-31',
      });

      expect(mockApiFetcher.get).toHaveBeenCalledWith(
        '/api/v1/groups/123/schedules?startDate=2023-01-01&endDate=2023-01-31'
      );
      expect(result).toEqual(mockSchedules);
    });

    it('데이터가 없을 때 빈 배열을 반환한다', async () => {
      mockApiFetcher.get.mockResolvedValue({
        data: { data: null },
      });

      const result = await groupsApi.getSchedules('123', {
        startDate: '2023-01-01',
        endDate: '2023-01-31',
      });

      expect(result).toEqual([]);
    });
  });

  describe('postSchedule', () => {
    it('성공적으로 일정을 생성한다', async () => {
      const mockResponse = { data: { id: 1 } };
      mockApiFetcher.post.mockResolvedValue(mockResponse);

      const scheduleData: ScheduleRequest = {
        description: '새 일정',
        startAt: '2023-01-01',
        endAt: '2023-01-31',
        location: '서울',
        eventColor: 'red',
      };

      const result = await groupsApi.postSchedule('123', scheduleData);

      expect(mockApiFetcher.post).toHaveBeenCalledWith(
        '/api/v1/groups/123/schedules',
        scheduleData
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateSchedule', () => {
    it('성공적으로 일정을 수정한다', async () => {
      const mockResponse = { data: { id: 1 } };
      mockApiFetcher.patch.mockResolvedValue(mockResponse);

      const scheduleData: ScheduleRequest = {
        description: '수정된 일정',
        startAt: '2023-01-02',
        endAt: '2023-01-31',
        location: '서울',
        eventColor: 'red',
      };

      const result = await groupsApi.updateSchedule('123', '456', scheduleData);

      expect(mockApiFetcher.patch).toHaveBeenCalledWith(
        '/api/v1/groups/123/schedules/456',
        scheduleData
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteSchedule', () => {
    it('성공적으로 일정을 삭제한다', async () => {
      const mockResponse = { data: { message: 'Deleted' } };
      mockApiFetcher.delete.mockResolvedValue(mockResponse);

      const result = await groupsApi.deleteSchedule('123', '456');

      expect(mockApiFetcher.delete).toHaveBeenCalledWith(
        '/api/v1/groups/123/schedules/456'
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getGroupMembers', () => {
    it('성공적으로 그룹 멤버 목록을 가져온다', async () => {
      const mockMembers = {
        members: [
          { id: 1, name: '사용자1' },
          { id: 2, name: '사용자2' },
        ],
      };

      mockApiFetcher.get.mockResolvedValue({
        data: mockMembers,
      });

      const request: GetGroupMembersRequest = {
        groupId: '123',
        cursorId: 0,
        size: 10,
      };

      const result = await groupsApi.getGroupMembers(request);

      expect(mockApiFetcher.get).toHaveBeenCalledWith(
        '/api/v1/groups/123/members',
        {
          params: {
            groupId: '123',
            cursorId: 0,
            size: 10,
          },
        }
      );
      expect(result).toEqual(mockMembers);
    });
  });

  describe('patchGroupMemberRole', () => {
    it('성공적으로 그룹 멤버 역할을 변경한다', async () => {
      const mockResponse = {
        data: { code: 200, message: 'Success' },
      };

      mockApiFetcher.patch.mockResolvedValue(mockResponse);

      const request: PatchGroupMemberRoleRequest = {
        groupId: '123',
        memberId: '456',
        role: 'ADMIN',
      };

      const result = await groupsApi.patchGroupMemberRole(request);

      expect(mockApiFetcher.patch).toHaveBeenCalledWith(
        '/api/v1/groups/123/members/456/role',
        { role: 'ADMIN' }
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('deleteGroupMember', () => {
    it('성공적으로 그룹 멤버를 삭제한다', async () => {
      const mockResponse = {
        data: { code: 200, message: 'Success' },
      };

      mockApiFetcher.delete.mockResolvedValue(mockResponse);

      const request: DeleteGroupMemberRequest = {
        groupId: '123',
        memberId: '456',
      };

      const result = await groupsApi.deleteGroupMember(request);

      expect(mockApiFetcher.delete).toHaveBeenCalledWith(
        '/api/v1/groups/123/members/456'
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('patchUpdateGroup', () => {
    it('성공적으로 그룹 정보를 수정한다', async () => {
      const mockResponse = {
        data: { code: 200, message: 'Success' },
      };

      mockApiFetcher.patch.mockResolvedValue(mockResponse);

      const updateData: UpdateGroupApiRequest = {
        title: '수정된 그룹 제목',
        description: '수정된 설명',
        category: 'CONCERT',
        gender: 'MALE',
        startAge: 20,
        endAge: 30,
        location: '서울',
        maxMembers: 10,
        startDate: '2023-01-01',
        endDate: '2023-01-31',
      };

      const result = await groupsApi.patchUpdateGroup('123', updateData);

      expect(mockApiFetcher.patch).toHaveBeenCalledWith(
        '/api/v1/groups/123',
        updateData
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('formatDateWithKoreanTimezone', () => {
    it('한국 시간대로 날짜를 올바르게 포맷한다', () => {
      mockApiFetcher.post.mockResolvedValue({ data: {} });

      const formData: CreateGroupFormData = {
        title: '테스트',
        category: 'CONCERT',
        gender: '전체',
        name: '테스트',
        ageRange: [20, 30],
        region: '서울',
        dateRange: {
          startDate: new Date('2023-01-01T00:00:00.000Z'),
          endDate: new Date('2023-01-31T00:00:00.000Z'),
        },
        maxParticipants: 10,
        description: '테스트',
        tags: [],
      };

      groupsApi.createGroup('123', formData);

      expect(mockApiFetcher.post).toHaveBeenCalledWith(
        '/api/v1/groups',
        expect.objectContaining({
          startDate: expect.stringMatching(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
          ),
          endDate: expect.stringMatching(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
          ),
        })
      );
    });
  });

  describe('에러 처리', () => {
    it('API 호출 실패 시 에러를 throw한다', async () => {
      const errorMessage = 'API 호출 실패';
      mockApiFetcher.get.mockRejectedValue(new Error(errorMessage));

      await expect(groupsApi.getGroupInfo('123')).rejects.toThrow(errorMessage);
    });

    it('네트워크 에러 시 에러를 throw한다', async () => {
      mockApiFetcher.post.mockRejectedValue(new Error('네트워크 에러'));

      const joinRequest: PostJoinGroupRequest = {
        groupId: '123',
        description: '참가 요청',
      };

      await expect(groupsApi.postJoinGroup(joinRequest)).rejects.toThrow(
        '네트워크 에러'
      );
    });
  });
});
