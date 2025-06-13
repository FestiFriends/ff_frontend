import ClientProfileWrapper from '@/components/pages/profiles/ClientProfileWrapper';

interface PageProps {
  params: Promise<{ userId: string }>;
}

const OtherProfilePage = async ({ params }: PageProps) => {
  const { userId } = await params;
  return <ClientProfileWrapper userId={userId} />;
};

export default OtherProfilePage;
