import { nextFetcher } from '@/lib/nextFetcher';
import { PerformancesResponsePagination } from '@/types/performance';
import { Performance } from '@/types/performance';
import type { MetadataRoute } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://ff-frontend-rust.vercel.app';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/performances`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/calendar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  let performances: Performance[] = [];

  try {
    const res = await nextFetcher<PerformancesResponsePagination>(
      '/api/v1/performances?page=1&size=100',
      { method: 'GET', revalidate: 21600 }
    );
    if (res.data && res.data.length > 0) {
      performances = res.data;
    }
  } catch (e) {
    console.error('[Error] 사이트맵 공연 목록 조회 실패', e);
  }

  const performanceRoutes: MetadataRoute.Sitemap = performances.map(
    (performance) => ({
      url: `${SITE_URL}/performances/${performance.id}`,
      lastModified: new Date(
        performance.endDate ?? performance.startDate ?? Date.now()
      ),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  );

  return [...staticRoutes, ...performanceRoutes];
};

export default sitemap;
