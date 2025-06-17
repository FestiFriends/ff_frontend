import Header from '@/components/common/Header/Header';
import GroupWrapper from '@/components/pages/groupDetail/GroupWrapper';

type GroupDetailPageProps = {
  params: Promise<{ groupId: string }>;
};

const GroupDetailPage = async ({ params }: GroupDetailPageProps) => {
  const { groupId } = await params;

  return (
    <div>
      <Header />
      <GroupWrapper groupId={groupId} />
    </div>
  );
};

export default GroupDetailPage;
