import { http, HttpResponse, delay } from 'msw';
import { Performance, PerformanceIsLikedData } from '@/types/performance';
import { PerformancesSearchParams } from '@/types/performancesSearchParams';
import {
  PERFORMANCES_SAMPLE_DATA,
  FULL_PERFORMANCES_DATA,
} from './performancesHandlers.data';

const filterPerformances = (
  performances: Performance[],
  params: PerformancesSearchParams
) => {
  let filtered = [...performances];

  if (params.keyword) {
    const keyword = params.keyword.toLowerCase();
    filtered = filtered.filter(
      (perf) =>
        perf.title.toLowerCase().includes(keyword)
        || perf.location.toLowerCase().includes(keyword)
        || perf.cast.some((actor: string) =>
          actor.toLowerCase().includes(keyword)
        )
    );
  }

  if (params.category) {
    const category = params.category.toLowerCase();
    filtered = filtered.filter((perf) => {
      const title = perf.title.toLowerCase();
      switch (category) {
        case '뮤지컬':
          return title.includes('뮤지컬');
        case '콘서트':
          return title.includes('콘서트') || title.includes('페스티벌');
        case '연극':
          return title.includes('연극');
        case '클래식':
          return (
            title.includes('클래식')
            || title.includes('오케스트라')
            || title.includes('발레')
          );
        default:
          return true;
      }
    });
  }

  // 날짜 필터링
  if (params.startDate || params.endDate) {
    filtered = filtered.filter((perf) => {
      const perfStartDate = new Date(perf.startDate);
      const perfEndDate = new Date(perf.endDate);

      if (params.startDate) {
        const filterStartDate = new Date(params.startDate);
        if (perfEndDate < filterStartDate) {
          return false;
        }
      }

      if (params.endDate) {
        const filterEndDate = new Date(params.endDate);
        if (perfStartDate > filterEndDate) {
          return false;
        }
      }

      return true;
    });
  }

  if (params.location) {
    const location = params.location;
    filtered = filtered.filter((perf) => perf.location.includes(location));
  }

  return filtered;
};

const sortPerformances = (performances: Performance[], sortBy: string) => {
  const sorted = [...performances];

  switch (sortBy) {
    case 'date':
      return sorted.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
    case 'popularity':
      return sorted.sort((a, b) => b.favoriteCount - a.favoriteCount);
    case 'groups':
      return sorted.sort((a, b) => b.groupCount - a.groupCount);
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
};

const paginateResults = (data: Performance[], page = 1, size = 20) => {
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    page: page,
    size: size,
    totalElements: data.length,
    totalPages: Math.ceil(data.length / size),
    first: page === 1,
    last: page === Math.ceil(data.length / size) || data.length === 0,
  };
};

export const performancesHandlers = [
  http.get(
    'http://localhost:3000/api/v1/performances/top-favorites',
    async () => {
      await delay(3000);
      const data = PERFORMANCES_SAMPLE_DATA.sort(
        (a, b) => b.favoriteCount - a.favoriteCount
      ).slice(0, 5);
      return HttpResponse.json({ code: 200, message: '성공', data });
    }
  ),

  http.get('http://localhost:3000/api/v1/performances/top-groups', async () => {
    await delay(3000);
    const data = PERFORMANCES_SAMPLE_DATA.sort(
      (a, b) => b.groupCount - a.groupCount
    ).slice(0, 5);
    return HttpResponse.json({ code: 200, message: '성공', data });
  }),

  http.get(
    'http://localhost:3000/api/v1/performances/favorites',
    ({ request }) => {
      const url = new URL(request.url);
      const cursorId = url.searchParams.get('cursorId');
      const size = Number(url.searchParams.get('size')) || 20;

      const favoritePerformances = FULL_PERFORMANCES_DATA.filter(
        (performance) => performance.isLiked
      );

      const startIndex = cursorId
        ? favoritePerformances.findIndex((p) => p.id === cursorId) + 1
        : 0;
      const endIndex = startIndex + size;
      const paginatedPerformances = favoritePerformances.slice(
        startIndex,
        endIndex
      );

      const hasNext = endIndex < favoritePerformances.length;
      const nextCursorId = hasNext
        ? paginatedPerformances[paginatedPerformances.length - 1]?.id
        : undefined;

      return HttpResponse.json({
        code: 200,
        message: '요청이 성공적으로 처리되었습니다.',
        data: paginatedPerformances,
        cursorId: nextCursorId,
        hasNext,
      });
    }
  ),

  http.get(
    'http://localhost:3000/api/v1/performances/:performanceId',
    async ({ params }) => {
      const { performanceId } = params;

      if (performanceId === 'favorites') {
        return;
      }

      const data = PERFORMANCES_SAMPLE_DATA?.find(
        (item) => item.id === performanceId
      );
      return HttpResponse.json({ code: 200, message: '성공', data });
    }
  ),

  http.patch(
    'http://localhost:3000/api/v1/performances/:performanceId/favorites',
    async ({ request, params }) => {
      const { performanceId } = params;
      const { isLiked } = (await request.json()) as PerformanceIsLikedData;
      await delay(2000);
      // return HttpResponse.json(
      //   {
      //     code: 404,
      //     message: '존재하지 않는 공연입니다.',
      //   },
      //   { status: 404 }
      // );
      const target = PERFORMANCES_SAMPLE_DATA.find(
        (item) => item.id === performanceId
      );

      if (!target) {
        return HttpResponse.json(
          {
            code: 404,
            message: '존재하지 않는 공연입니다.',
          },
          { status: 404 }
        );
      }

      target.isLiked = isLiked;

      return HttpResponse.json(
        {
          code: 200,
          message: isLiked ? '공연을 찜했습니다.' : '공연을 찜 취소했습니다.',
          data: { performanceId, isLiked },
        },
        { status: 200 }
      );
    }
  ),

  http.get('http://localhost:3000/api/v1/performances', ({ request }) => {
    const url = new URL(request.url);
    const params = {
      keyword: url.searchParams.get('keyword') ?? undefined,
      category: url.searchParams.get('category') ?? undefined,
      startDate: url.searchParams.get('startDate') ?? undefined,
      endDate: url.searchParams.get('endDate') ?? undefined,
      location: url.searchParams.get('location') ?? undefined,
      sort: url.searchParams.get('sort') ?? undefined,
      page: parseInt(url.searchParams.get('page') ?? '1'),
      size: parseInt(url.searchParams.get('size') ?? '20'),
    };

    try {
      // 필터링
      let filteredPerformances = filterPerformances(
        FULL_PERFORMANCES_DATA,
        params
      );

      // 정렬
      if (params.sort) {
        filteredPerformances = sortPerformances(
          filteredPerformances,
          params.sort
        );
      }

      // 페이지네이션
      const result = paginateResults(
        filteredPerformances,
        params.page,
        params.size
      );

      const response = {
        code: 200,
        message: '요청이 성공적으로 처리되었습니다.',
        ...result,
      };

      console.log('공연 검색 응답:', {
        totalElements: result.totalElements,
        page: result.page,
        size: result.size,
        totalPages: result.totalPages,
        dateFilter:
          params.startDate || params.endDate
            ? `${params.startDate || 'N/A'} ~ ${params.endDate || 'N/A'}`
            : 'N/A',
      });

      // 검색 결과가 없을 때
      if (filteredPerformances.length === 0) {
        return HttpResponse.json({
          code: 200,
          message: '검색 결과가 없습니다.',
          data: [],
          page: 1,
          size: params.size,
          totalElements: 0,
          totalPages: 0,
          first: true,
          last: true,
        });
      }

      return HttpResponse.json(response);
    } catch (error) {
      console.error('공연 검색 오류:', error);
      return HttpResponse.json(
        {
          code: 500,
          message: '서버 오류가 발생했습니다.',
          data: [],
          page: 1,
          size: params.size,
          totalElements: 0,
          totalPages: 0,
          first: true,
          last: true,
        },
        { status: 500 }
      );
    }
  }),
];
