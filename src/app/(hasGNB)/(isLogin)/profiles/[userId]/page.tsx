import Header from '@/components/common/Header/Header';
import ClientProfileWrapper from '@/components/pages/profiles/ClientProfileWrapper';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PageProps {
  params: Promise<{ userId: string }>;
}

const OtherProfilePage = async ({ params }: PageProps) => {
  const { userId } = await params;
  return (
    <>
      <Header />
      <ScrollArea className='h-[calc(100dvh-124px)]'>
        <div className='w-screen max-w-lg'>
          <ClientProfileWrapper userId={userId} />
        </div>
      </ScrollArea>
    </>
  );
};

export default OtherProfilePage;
