import { ApplicationStatus, ApplicationStatusType } from '@/types/enums';

export const ApplicationStatusLabels: Record<ApplicationStatusType, string> = {
  [ApplicationStatus.PENDING]: '대기 중',
  [ApplicationStatus.ACCEPTED]: '수락',
  [ApplicationStatus.REJECTED]: '거절',
  [ApplicationStatus.CONFIRMED]: '확정',
};
