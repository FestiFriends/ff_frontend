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
          <QueryProvider>{children}</QueryProvider>
          <div id='hover-card-root' />
        </MSWComponent>
      </AuthStoreProvider>
    </body>
  </html>
);

export default RootLayout;
