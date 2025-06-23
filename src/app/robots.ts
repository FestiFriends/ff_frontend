import { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: '/admin/',
  },
  sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
});

export default robots;
