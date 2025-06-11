import TabBar from '@/components/common/TabBar/TabBar';
import NotificationToast from '@/components/pages/NotificationToast';
import { initMocks } from '@/mocks';
import { AuthStoreProvider } from '@/providers/AuthStoreProvider';
import { MSWComponent } from '@/providers/MSWComponent';
import QueryProvider from '@/providers/QueryProviders';
import './globals.css';
import { SseStoreProvider } from '@/providers/SseStoreProvider';

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
        <SseStoreProvider>
          <MSWComponent>
            <QueryProvider>
              <TabBar>{children}</TabBar>
              <NotificationToast />
            </QueryProvider>
          </MSWComponent>
        </SseStoreProvider>
      </AuthStoreProvider>
    </body>
  </html>
);

export default RootLayout;
