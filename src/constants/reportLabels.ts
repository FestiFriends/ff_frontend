import {
  ReportReason,
  ReportReasonType,
  ReportTarget,
  ReportTargetType,
} from '@/types/enums';

export const ReportReasonLabels: Record<ReportReasonType, string> = {
  [ReportReason.PROFANITY]: '욕설, 비방, 차별, 혐오',
  [ReportReason.ADVERTISEMENT]: '홍보, 영리목적',
  [ReportReason.ILLEGAL]: '불법 정보',
  [ReportReason.SEXUAL]: '음란, 청소년 유해',
  [ReportReason.PERSONAL_INFO]: '개인정보 노출, 유포, 거래',
  [ReportReason.SPAM]: '도배, 스팸',
};

export const ReportTargetLabels: Record<ReportTargetType, string> = {
  [ReportTarget.GROUP]: '모임',
  [ReportTarget.REVIEW]: '리뷰',
  [ReportTarget.USER]: '사용자',
  [ReportTarget.CHAT]: '채팅',
  [ReportTarget.POST]: '게시글',
  [ReportTarget.COMMENT]: '댓글',
};
