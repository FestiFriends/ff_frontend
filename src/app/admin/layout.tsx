import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FestiFriends - 관리자 페이지',
  robots: {
    index: false,
    follow: false,
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => <>{children}</>;

export default RootLayout;
