import EmptyIcon from '@/components/icons/EmptyIcon';

export type StateNoticePreset =
  | 'groupEmpty'
  | 'groupExpired'
  | 'joinedGroupsEmpty'
  | 'appliedGroupsEmpty'
  | 'applicationsEmpty'
  | 'applicationEmpty'
  | 'likedUsersEmpty'
  | 'likedPerformancesEmpty'
  | 'postsEmpty'
  | 'reportEmpty'
  | 'notificationEmpty'
  | 'writableReviewEmpty'
  | 'writtenReviewEmpty'
  | 'reviewEmpty'
  | 'searchEmpty'
  | 'badRequest'
  | 'notfound'
  | 'error';

interface StateNoticeProps {
  preset?: StateNoticePreset;
  message?: string;
  action?: React.ReactNode;
  className?: string;
  height?: string;
  textColor?: string;
}

const presetConfig: Record<
  StateNoticePreset,
  { message: React.ReactNode; textColor?: string }
> = {
  groupEmpty: {
    message: (
      <>
        <p>모임이 없습니다.</p>
        <p>첫 번째 모임을 개설해 보세요.</p>
      </>
    ),
  },
  groupExpired: {
    message: <p>종료된 모임입니다.</p>,
  },
  joinedGroupsEmpty: {
    message: <p>참가한 모임이 없습니다.</p>,
  },
  appliedGroupsEmpty: {
    message: <p>신청한 모임이 없습니다.</p>,
  },
  applicationsEmpty: {
    message: <p>방장인 모임이 없습니다.</p>,
  },
  applicationEmpty: {
    message: <p>받은 신청서가 없습니다.</p>,
  },
  likedUsersEmpty: {
    message: <p>찜한 유저가 없습니다.</p>,
  },
  likedPerformancesEmpty: {
    message: <p>찜한 공연이 없습니다.</p>,
  },
  postsEmpty: {
    message: (
      <>
        <p>모임 상세 게시글이 없습니다.</p>
        <p>첫 번째 게시글을 작성해 보세요.</p>
      </>
    ),
  },
  reportEmpty: {
    message: <p>신고된 유저가 없습니다.</p>,
  },
  notificationEmpty: {
    message: <p>새로운 알림이 없습니다.</p>,
  },
  writableReviewEmpty: {
    message: <p>작성 가능한 리뷰가 없습니다.</p>,
  },
  writtenReviewEmpty: {
    message: <p>작성한 리뷰가 없습니다.</p>,
  },
  reviewEmpty: {
    message: <p>아직 받은 리뷰가 없습니다.</p>,
  },
  searchEmpty: {
    message: <p>검색 결과가 없습니다.</p>,
  },
  badRequest: {
    message: (
      <>
        <p>잘못된 요청입니다.</p>
        <p>다시 시도해 주세요.</p>
      </>
    ),
  },
  notfound: {
    message: (
      <>
        <p>페이지를 찾을 수 없습니다.</p>
        <p>다시 시도해 주세요.</p>
      </>
    ),
  },
  error: {
    message: (
      <>
        <p>문제가 발생했습니다.</p>
        <p>다시 시도해 주세요.</p>
      </>
    ),
  },
};

const StateNotice = ({
  preset,
  message,
  action,
  className,
  height = '60vh',
  textColor,
}: StateNoticeProps) => {
  const presetData =
    preset && preset in presetConfig ? presetConfig[preset] : undefined;

  const finalMessage = message ? (
    <p>{message}</p>
  ) : (
    (presetData?.message ?? <p>표시할 내용이 없습니다.</p>)
  );
  const finalTextColor = textColor ?? 'text-gray-500';

  return (
    <div
      style={{ minHeight: height }}
      className={`flex flex-col items-center justify-center gap-6 text-center ${className}`}
    >
      <EmptyIcon className='h-20 w-20 text-gray-100' />
      <div className={`text-16_body_M ${finalTextColor}`}>{finalMessage}</div>
      {action}
    </div>
  );
};

export default StateNotice;
