import { ReactNode, Suspense } from 'react';
import {
  InfiniteData,
  QueryClient,
  QueryClientProvider,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ApiResponse } from '@/types/api';
import {
  GetNotificationsResponse,
  NotificationData,
} from '@/types/notification';
import InfiniteList from './InfiniteList ';

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

const renderWithClient = (ui: ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

const mockNotificationQueryFn = async ({
  pageParam = 1,
  empty,
}: {
  pageParam?: number;
  empty?: boolean;
}) => {
  if (pageParam === 999) throw new Error('강제 에러');

  const mockData: NotificationData[] = [
    {
      id: '1000',
      message: '모임에 가입 신청이 도착했어요. 수락 또는 거절을 선택해 주세요.',
      type: 'APPLICATION',
      target: null,
      createdAt: '2025-06-05T12:00:00.000Z',
      isRead: true,
    },
    {
      id: '999',
      message: '모임의 가입 신청이 수락되었습니다. 가입을 확정해 주세요!',
      type: 'APPLIED',
      target: null,
      createdAt: '2025-06-05T11:59:00.000Z',
      isRead: true,
    },
    {
      id: '998',
      message: '모임의 가입 신청이 거절되었습니다.',
      type: 'REJECTED',
      target: null,
      createdAt: '2025-06-05T11:58:00.000Z',
      isRead: true,
    },
  ];

  return {
    code: 200,
    message: '성공',
    data: empty ? [] : mockData,
    cursorId: pageParam < 2 ? pageParam + 1 : undefined,
    hasNext: pageParam < 2,
    firstPage: pageParam === 1,
  };
};

const mockOptions = (
  empty?: boolean,
  error?: boolean
): UseSuspenseInfiniteQueryOptions<
  GetNotificationsResponse,
  ApiResponse,
  InfiniteData<GetNotificationsResponse>,
  GetNotificationsResponse,
  string[],
  number | undefined
> => ({
  queryKey: ['notifications'],
  queryFn: ({ pageParam }) => {
    if (error) throw new Error('에러 발생');
    return mockNotificationQueryFn({ pageParam, empty });
  },
  initialPageParam: 1,
  getNextPageParam: (lastPage: GetNotificationsResponse) => lastPage.cursorId,
});

describe('InfiniteList', () => {
  test('로딩 fallback → 데이터 렌더링', async () => {
    renderWithClient(
      <Suspense fallback={<p>로딩 중...</p>}>
        <InfiniteList<
          GetNotificationsResponse,
          GetNotificationsResponse['data'][number]
        >
          options={mockOptions()}
          getDataId={(data) => data.id}
          renderData={(data) => <p>{data.message}</p>}
        />
      </Suspense>
    );

    expect(screen.getByText('로딩 중...')).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(
          '모임에 가입 신청이 도착했어요. 수락 또는 거절을 선택해 주세요.'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          '모임의 가입 신청이 수락되었습니다. 가입을 확정해 주세요!'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText('모임의 가입 신청이 거절되었습니다.')
      ).toBeInTheDocument();
    });
  });

  test('데이터가 비어있을 때 emptyFallback 출력', async () => {
    renderWithClient(
      <Suspense fallback={<p>로딩 중...</p>}>
        <InfiniteList<
          GetNotificationsResponse,
          GetNotificationsResponse['data'][number]
        >
          options={mockOptions(true)}
          getDataId={(data) => data.id}
          renderData={(data) => <p>{data.message}</p>}
          emptyFallback={<p>비어있음</p>}
        />
      </Suspense>
    );

    await waitFor(() => {
      expect(screen.getByText('비어있음')).toBeInTheDocument();
    });
  });

  test('에러 발생 시 ErrorBoundary fallback 출력', async () => {
    renderWithClient(
      <InfiniteList<
        GetNotificationsResponse,
        GetNotificationsResponse['data'][number]
      >
        options={mockOptions(false, true)}
        getDataId={(data) => data.id}
        renderData={(data) => <p>{data.message}</p>}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('에러 발생')).toBeInTheDocument();
    });
  });
});
