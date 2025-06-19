import { parseISO, isAfter, isBefore } from 'date-fns';
import { http, HttpResponse } from 'msw';
import { GroupSchedule } from '@/types/group';

const SCHEDULES_DATA: GroupSchedule[] = [
  {
    id: 's1',
    description: '락페 준비 모임',
    startAt: '2025-06-02T19:00:00Z',
    endAt: '2025-06-02T21:00:00Z',
    location: '강남역 1번 출구',
    createdAt: '2025-05-20T10:00:00Z',
    author: {
      id: 'user101',
      name: '이수연',
      profileImage: 'https://example.com/profiles/user101.jpg',
    },
    isMine: true,
    eventColor: 'red',
  },
  {
    id: 's2',
    description: '공연 전 식사 약속',
    startAt: '2025-06-09T11:00:00Z',
    endAt: '2025-06-09T12:00:00Z',
    location: '홍대 치킨집',
    createdAt: '2025-06-01T13:00:00Z',
    author: {
      id: 'user102',
      name: '박민준',
      profileImage: 'https://example.com/profiles/user102.jpg',
    },
    isMine: true,
    eventColor: 'blue',
  },
  {
    id: 's3',
    description: '공연 끝나고 뒤풀이',
    startAt: '2025-12-28T22:00:00Z',
    endAt: '2025-12-28T01:00:00Z',
    location: '합정 포차 거리',
    createdAt: '2025-06-03T15:00:00Z',
    author: {
      id: 'user103',
      name: '최가영',
      profileImage: 'https://example.com/profiles/user103.jpg',
    },
    isMine: true,
    eventColor: 'green',
  },
  {
    id: 's4',
    description: '7월 리허설 모임',
    startAt: '2025-07-05T14:00:00Z',
    endAt: '2025-07-05T16:00:00Z',
    location: '잠실역 문화센터',
    createdAt: '2025-06-15T11:00:00Z',
    author: {
      id: 'user104',
      name: '정하진',
      profileImage: 'https://example.com/profiles/user104.jpg',
    },
    isMine: true,
    eventColor: 'pink',
  },
  {
    id: 's5',
    description: '7월 회고 모임',
    startAt: '2025-07-20T18:00:00Z',
    endAt: '2025-07-20T20:30:00Z',
    location: '신촌 카페 온더락',
    createdAt: '2025-06-18T12:00:00Z',
    author: {
      id: 'user105',
      name: '김지수',
      profileImage: 'https://example.com/profiles/user105.jpg',
    },
    isMine: true,
    eventColor: 'yellow',
  },
];

export const scheduleHandlers = [
  http.get(
    'http://localhost:3000/api/v1/groups/:groupId/schedules',
    ({ params, request }) => {
      const groupId = params.groupId as string;
      if (groupId !== '1') {
        return HttpResponse.json({
          code: 404,
          message: 'Mock: 해당 그룹의 일정이 없습니다.',
        });
      }
      const url = new URL(request.url);
      const start = url.searchParams.get('startDate');
      const end = url.searchParams.get('endDate');

      const filtered = SCHEDULES_DATA.filter(
        (s) =>
          (!start || !isBefore(parseISO(s.endAt), parseISO(start)))
          && (!end || !isAfter(parseISO(s.startAt), parseISO(end)))
      );

      return HttpResponse.json({
        code: 200,
        message: '일정 목록 조회에 성공했습니다.',
        data: {
          scheduleCount: filtered.length,
          schedules: filtered,
        },
      });
    }
  ),
];
