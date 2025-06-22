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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ff-frontend-rust.vercel.app';

export const metadata: Metadata = {
  title: 'FestiFriends - 공연장부터 숙소까지 함께할 친구 찾기',
  description:
    '공연·페스티벌 동행부터 탑승, 숙소까지 함께할 친구들을 쉽고 빠르게 찾아보세요. FestiFriends에서 오늘의 공연을 확인하고 모임을 만들어보세요!',
  openGraph: {
    title: 'FestiFriends - 공연장부터 숙소까지 함께할 친구 찾기',
    description:
      '공연·페스티벌 동행부터 탑승, 숙소까지 함께할 친구들을 쉽고 빠르게 찾아보세요.',
    url: SITE_URL,
    siteName: 'FestiFriends',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
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
    title: 'FestiFriends - 공연장부터 숙소까지 함께할 친구 찾기',
    description:
      '공연·페스티벌 동행부터 탑승, 숙소까지 함께할 친구들을 쉽고 빠르게 찾아보세요.',
    images: [`${SITE_URL}/og-image.jpg`],
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
