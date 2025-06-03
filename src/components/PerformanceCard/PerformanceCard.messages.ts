export const PERFORMANCE_CARD_MESSAGES = {
  // Context 에러 메시지
  CONTEXT_ERROR:
    'PerformanceCard 컴포넌트는 PerformanceCard.Root 내부에서 사용해야 합니다.',

  // 접근성 레이블
  CARD_DETAIL_LABEL: (title: string) => `${title} 공연 상세 보기`,
  LIKE_BUTTON_LABEL: '좋아요',
  UNLIKE_BUTTON_LABEL: '좋아요 취소',

  // 이미지 alt 텍스트
  POSTER_ALT: (title: string) => `${title} 포스터`,
  NO_IMAGE_FALLBACK: 'No Image',

  // 좋아요 버튼 텍스트
  LIKE_TEXT: '좋아요',
  UNLIKE_TEXT: '좋아요 취소',

  // 상태 메시지
  STATUS: {
    AVAILABLE: '예매 가능',
    SOLD_OUT: '매진',
    ENDED: '공연 종료',
    UPCOMING: '공연 예정',
  },

  // 에러 메시지
  ERROR: {
    LOAD_FAILED: '공연 정보를 불러올 수 없습니다.',
    IMAGE_LOAD_FAILED: '이미지를 불러올 수 없습니다.',
  },

  // 빈 상태 메시지
  EMPTY: {
    NO_TITLE: '제목 없음',
    NO_LOCATION: '장소 미정',
    NO_CAST: '출연진 정보 없음',
    NO_PRICE: '가격 미정',
    NO_DATE: '날짜 미정',
  },
} as const;

// 타입 안전성을 위한 타입 정의
export type PerformanceCardMessages = typeof PERFORMANCE_CARD_MESSAGES;
