import { Metadata } from 'next';
import TabBar from '@/components/common/TabBar/TabBar';
import NotificationToast from '@/components/pages/NotificationToast';
import { initMocks } from '@/mocks';
import { AuthStoreProvider } from '@/providers/AuthStoreProvider';
import { MSWComponent } from '@/providers/MSWComponent';
import QueryProvider from '@/providers/QueryProviders';
import './globals.css';
import { SseStoreProvider } from '@/providers/SseStoreProvider';

initMocks();

export const metadata: Metadata = {
  title: 'FestiFriends - 숙소부터 공연장까지 함께할 덕메 찾기',
  description: '숙소부터 공연장까지 함께할 친구들을 찾아보세요',
  openGraph: {
    title: 'FestiFriends - 숙소부터 공연장까지 함께할 덕메 찾기',
    description: '숙소부터 공연장까지 함께할 친구들을 찾아보세요',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'FestiFriends',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'FestiFriends 오픈그래프 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FestiFriends - 숙소부터 공연장까지 함께할 덕메 찾기',
    description: '숙소부터 공연장까지 함께할 친구들을 찾아보세요',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang='ko'>
    <body className='touch-manipulation'>
      <div id='portal' />
      <div className='mx-auto max-w-lg shadow-xl contain-layout'>
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
      </div>
    </body>
  </html>
);

export default RootLayout;
