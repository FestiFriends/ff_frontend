import GlobalNavigationBar from '@/components/common/GlobalNavigationBar/GlobalNavigationBar';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <>
    <GlobalNavigationBar />
    {children}
  </>
);

export default RootLayout;
