import { MetadataRoute } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://ff-frontend-rust.vercel.app';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: '/admin/',
  },
  sitemap: `${SITE_URL}/sitemap.xml`,
});

export default robots;
