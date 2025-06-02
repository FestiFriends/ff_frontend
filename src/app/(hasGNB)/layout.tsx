import GlobalNavigationBar from '@/components/GlobalNavigationBar/GlobalNavigationBar';

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
