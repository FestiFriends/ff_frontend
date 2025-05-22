import QueryProvider from '@/providers/QueryProviders';
import './globals.css';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang='ko'>
    <body>
      <QueryProvider>{children}</QueryProvider>
    </body>
  </html>
);

export default RootLayout;
