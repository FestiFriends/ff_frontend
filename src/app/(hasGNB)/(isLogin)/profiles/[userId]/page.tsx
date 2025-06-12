import ClientProfileWrapper from '@/components/pages/profiles/ClientProfileWrapper';

interface PageProps {
  params: { userId: string };
}

const OtherProfilePage = async ({ params }: PageProps) => {
  const { userId } = params;

  return <ClientProfileWrapper userId={userId} />;
};

export default OtherProfilePage;
