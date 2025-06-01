import { ReportReasonLabels } from '@/constants/reportLabels';

export const getReportReasonLabels = (reason: string): string =>
  ReportReasonLabels[reason];
