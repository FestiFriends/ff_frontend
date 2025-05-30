import { initMocks } from '@/mocks';
import { MSWComponent } from '@/providers/MSWComponent';
import QueryProvider from '@/providers/QueryProviders';
import './globals.css';
import { AuthStoreProvider } from '@/providers/AuthStoreProvider';

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
        </MSWComponent>
      </AuthStoreProvider>
    </body>
  </html>
);

export default RootLayout;
