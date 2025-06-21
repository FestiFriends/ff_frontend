import {
  AlertCircle,
  BellOff,
  Heart,
  Inbox,
  MessageCircle,
  MessageSquare,
  Music2,
  Pencil,
  Search,
  TriangleAlert,
  XCircle,
} from 'lucide-react';

type StateNoticePreset =
  | 'reviewEmpty'
  | 'groupEmpty'
  | 'notfound'
  | 'unauthorized'
  | 'error'
  | 'likedUsersEmpty'
  | 'likedPerformancesEmpty'
  | 'searchEmpty'
  | 'writeFirst'
  | 'notificationEmpty'
  | 'chatEmpty';

interface StateNoticeProps {
  preset?: StateNoticePreset;
  message?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  height?: string;
  textColor?: string;
}

const presetConfig: Record<
  StateNoticePreset,
  { icon: React.ReactNode; message: string; textColor?: string }
> = {
  reviewEmpty: {
    icon: <MessageCircle className='h-10 w-10 text-gray-400' />,
    message: '아직 받은 리뷰가 없습니다.',
  },
  groupEmpty: {
    icon: <Inbox className='h-10 w-10 text-gray-400' />,
    message: '참여 중인 모임이 없습니다.',
  },
  notfound: {
    icon: <AlertCircle className='h-10 w-10 text-gray-400' />,
    message: '페이지를 찾을 수 없습니다.',
  },
  unauthorized: {
    icon: <XCircle className='h-10 w-10 text-orange-400' />,
    message: '로그인이 필요합니다.',
  },
  error: {
    icon: <AlertCircle className='h-10 w-10 text-red-500' />,
    message: '문제가 발생했습니다. 다시 시도해 주세요.',
  },
  likedUsersEmpty: {
    icon: <Heart className='h-10 w-10 text-gray-400' />,
    message: '찜한 유저가 없습니다.',
  },
  likedPerformancesEmpty: {
    icon: <Music2 className='h-10 w-10 text-gray-400' />,
    message: '찜한 공연이 없습니다.',
  },
  searchEmpty: {
    icon: <Search className='h-10 w-10 text-gray-400' />,
    message: '검색 결과가 없습니다.',
  },
  writeFirst: {
    icon: <Pencil className='h-10 w-10 text-gray-400' />,
    message: '아직 작성된 항목이 없습니다.',
  },
  notificationEmpty: {
    icon: <BellOff className='h-10 w-10 text-gray-400' />,
    message: '새로운 알림이 없습니다.',
  },
  chatEmpty: {
    icon: <MessageSquare className='h-10 w-10 text-gray-400' />,
    message: '아직 대화가 없습니다.',
  },
};

const defaultIcon = <TriangleAlert className='h-10 w-10 text-orange-400' />;

const StateNotice = ({
  preset,
  message,
  icon,
  action,
  className,
  height = '60vh',
  textColor,
}: StateNoticeProps) => {
  const presetData = preset ? presetConfig[preset] : undefined;

  const finalMessage =
    message ?? presetData?.message ?? '표시할 내용이 없습니다.';
  const finalIcon = icon ?? presetData?.icon ?? defaultIcon;
  const finalTextColor = textColor ?? presetData?.textColor ?? 'text-gray-800';

  return (
    <div
      style={{ minHeight: height }}
      className={`flex flex-col items-center justify-center gap-3 text-center text-gray-500 ${className}`}
    >
      {finalIcon}
      <div className={`text-14_B ${finalTextColor}`}>{finalMessage}</div>
      {action}
    </div>
  );
};

export default StateNotice;
