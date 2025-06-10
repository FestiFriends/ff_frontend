import { ReportReason, ReportReasonType } from '@/types/enums';

export const ReportReasonLabels: Record<ReportReasonType, string> = {
  [ReportReason.PROFANITY]: '욕설, 비방, 차별, 혐오',
  [ReportReason.ADVERTISEMENT]: '홍보, 영리목적',
  [ReportReason.ILLEGAL]: '불법 정보',
  [ReportReason.SEXUAL]: '음란, 청소년 유해',
  [ReportReason.PERSONAL_INFO]: '개인정보 노출, 유포, 거래',
  [ReportReason.SPAM]: '도배, 스팸',
};
