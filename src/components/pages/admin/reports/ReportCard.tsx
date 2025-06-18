import React from 'react';
import { ReportReasonLabels } from '@/constants/reportLabels';
import { ReportListResponse } from '@/types/report';
import ReportDetailModal from './ReportDetailModal';

interface ReportCardProps {
  data: ReportListResponse['data'][number];
}

const ReportCard = ({ data }: ReportCardProps) => (
  <ReportDetailModal reportId={data.id}>
    <li className='flex h-[37px] items-center rounded-12 bg-gray-50 p-2 text-18_M'>
      {ReportReasonLabels[data.reason]}에 대한 신고
    </li>
  </ReportDetailModal>
);

export default ReportCard;
