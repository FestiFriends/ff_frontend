import TabBar from '@/components/common/TabBar/TabBar';
import { initMocks } from '@/mocks';
import { AuthStoreProvider } from '@/providers/AuthStoreProvider';
import { MSWComponent } from '@/providers/MSWComponent';
import QueryProvider from '@/providers/QueryProviders';
import './globals.css';

initMocks();

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang='ko'>
    <body className='touch-manipulation'>
      <div id='portal' />
      <AuthStoreProvider>
        <MSWComponent>
          <QueryProvider>
            <TabBar>{children}</TabBar>
          </QueryProvider>
          <div id='hover-card-root' />
          <div id='hover-card-root' />
        </MSWComponent>
      </AuthStoreProvider>
    </body>
  </html>
);

export default RootLayout;
