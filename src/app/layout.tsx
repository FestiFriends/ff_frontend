import { initMocks } from '@/mocks';
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
    <body>
      <div id='portal' />
      <MSWComponent>
        <QueryProvider>{children}</QueryProvider>
      </MSWComponent>
    </body>
  </html>
);

export default RootLayout;
