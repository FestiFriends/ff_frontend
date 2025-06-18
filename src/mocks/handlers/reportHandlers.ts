import { delay, http, HttpResponse } from 'msw';
import { Report, ReportAction } from '@/types/report';

export const REPORT_SAMPLE_DATA: Report[] = [
  {
    id: '1000',
    createdAt: '2025-06-17T06:22:59.381Z',
    category: 'COMMENT',
    reason: 'PROFANITY',
    status: 'PENDING',
    snapshots: [
      {
        id: 's1',
        alt: '욕설이 포함된 댓글 스크린샷',
        src: 'https://picsum.photos/seed/newjeans/400/600',
      },
    ],
    details: '상대방이 댓글에서 저를 지속적으로 비하하고 욕설을 사용했습니다.',
  },
  {
    id: '1001',
    createdAt: '2025-06-16T11:10:00Z',
    category: 'USER',
    reason: 'PERSONAL_INFO',
    status: 'PENDING',
    snapshots: [
      {
        id: 's1',
        alt: '개인정보 유출',
        src: 'https://picsum.photos/seed/newjeans/400/600',
      },
    ],
    details: '사용자가 타인의 전화번호와 주소를 공개적으로 게시했습니다.',
  },
  {
    id: '1002',
    createdAt: '2025-06-15T09:30:00Z',
    category: 'POST',
    reason: 'SEXUAL',
    status: 'PENDING',
    snapshots: [
      {
        id: 's1',
        alt: '청소년 유해 콘텐츠',
        src: 'https://picsum.photos/seed/newjeans/400/600',
      },
      {
        id: 's2',
        alt: '문제 있는 이미지',
        src: 'https://picsum.photos/seed/newjeans/400/600',
      },
    ],
    details:
      '성적인 이미지를 포함한 게시글로, 청소년에게 부적절하다고 판단됩니다.',
  },
  {
    id: '1003',
    createdAt: '2025-06-14T18:45:00Z',
    category: 'GROUP',
    reason: 'ADVERTISEMENT',
    status: 'PENDING',
    snapshots: [],
    details: '모임 이름과 설명에 무분별한 광고 문구가 포함되어 있습니다.',
  },
  {
    id: '1004',
    createdAt: '2025-06-13T13:00:00Z',
    category: 'REVIEW',
    reason: 'ILLEGAL',
    status: 'PENDING',
    snapshots: [],
    details: '불법 거래를 암시하는 내용을 리뷰에 작성했습니다.',
  },
  {
    id: '1005',
    createdAt: '2025-06-12T07:00:00Z',
    category: 'CHAT',
    reason: 'SPAM',
    status: 'PENDING',
    snapshots: [
      {
        id: 's1',
        alt: '도배 채팅',
        src: 'https://picsum.photos/seed/newjeans/400/600',
      },
    ],
    details: '같은 메시지를 수십 번 반복해서 채팅방을 도배했습니다.',
  },
  {
    id: '1006',
    createdAt: '2025-06-11T22:10:00Z',
    category: 'USER',
    reason: 'PROFANITY',
    status: 'PENDING',
    snapshots: [],
    details: 'DM으로 욕설을 수차례 보내 사용자 경험을 훼손했습니다.',
  },
  {
    id: '1007',
    createdAt: '2025-06-10T16:20:00Z',
    category: 'COMMENT',
    reason: 'ADVERTISEMENT',
    status: 'PENDING',
    snapshots: [
      {
        id: 's1',
        alt: '광고 댓글',
        src: 'https://picsum.photos/seed/newjeans/400/600',
      },
    ],
    details: '댓글에 외부 사이트 링크와 홍보 문구가 포함되어 있습니다.',
  },
  {
    id: '1008',
    createdAt: '2025-06-09T10:40:00Z',
    category: 'POST',
    reason: 'ILLEGAL',
    status: 'PENDING',
    snapshots: [
      {
        id: 's1',
        alt: '불법 내용',
        src: 'https://picsum.photos/seed/newjeans/400/600',
      },
    ],
    details: '불법 의약품 판매 게시글입니다.',
  },
  {
    id: '1009',
    createdAt: '2025-06-08T14:00:00Z',
    category: 'REVIEW',
    reason: 'SPAM',
    status: 'PENDING',
    snapshots: [],
    details: '의미 없는 리뷰 반복 등록으로 서비스 품질 저하 우려.',
  },
  {
    id: '1010',
    createdAt: '2025-06-08T14:00:00Z',
    category: 'REVIEW',
    reason: 'SPAM',
    status: 'REJECTED',
    snapshots: [],
    details: '처리완료',
  },
];

export const reportHandlers = [
  // 목록 조회
  http.get('http://localhost:3000/api/v1/reports', ({ request }) => {
    const url = new URL(request.url);

    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const size = parseInt(url.searchParams.get('size') || '20', 10);
    console.log(page, size);

    // 1. PENDING 필터링
    const filtered = REPORT_SAMPLE_DATA.filter(
      (item) => item.status === 'PENDING'
    );

    // 2. 필요한 필드만 추출
    const summaryList = filtered.map(
      ({ id, createdAt, category, reason, status }) => ({
        id,
        createdAt,
        category,
        reason,
        status,
      })
    );

    // 3. 페이지네이션 적용
    const start = (page - 1) * size;
    const end = start + size;
    const paged = summaryList.slice(start, end);

    // 4. 응답 반환
    return HttpResponse.json({
      code: 200,
      message: '신고 목록이 정상적으로 조회되었습니다.',
      data: paged,
      page,
      size,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
      first: page === 1,
      last: page >= Math.ceil(filtered.length / size),
    });
  }),

  http.get(
    'http://localhost:3000/api/v1/reports/:reportId',
    async ({ params }) => {
      const { reportId } = params;

      const report = REPORT_SAMPLE_DATA.find((r) => r.id === reportId);

      if (!report) {
        return HttpResponse.json(
          { code: 404, message: '해당 신고 내역을 찾을 수 없습니다.' },
          { status: 404 }
        );
      }

      return HttpResponse.json({
        code: 200,
        message: '신고 상세를 불러왔습니다',
        data: report,
      });
    }
  ),

  // 승인 / 반려 처리
  http.patch(
    'http://localhost:3000/api/v1/reports/:reportId',
    async ({ request, params }) => {
      const { reportId } = params;
      const { reportStatus } = (await request.json()) as ReportAction;
      await delay(2000);
      const report = REPORT_SAMPLE_DATA.find((r) => r.id === reportId);

      if (!report) {
        return HttpResponse.json(
          { code: 404, message: '해당 신고 내역을 찾을 수 없습니다.' },
          { status: 404 }
        );
      }

      if (reportStatus !== 'APPROVED' && reportStatus !== 'REJECTED') {
        return HttpResponse.json(
          { code: 400, message: '유효하지 않은 reportStatus입니다.' },
          { status: 400 }
        );
      }

      const resultMessage =
        reportStatus === 'APPROVED'
          ? '해당 신고가 승인되었습니다'
          : '해당 신고가 반려되었습니다';

      report.status = reportStatus;

      return HttpResponse.json({ code: 200, message: resultMessage });
    }
  ),
];
