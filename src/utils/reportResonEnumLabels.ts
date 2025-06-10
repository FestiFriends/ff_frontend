import { ReportReasonLabels } from '@/constants/reportLabels';
import { ReportReasonType } from '@/types/enums';

export const getReportReasonLabels = (reason: ReportReasonType): string =>
  ReportReasonLabels[reason];
