import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.imweb.me',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'www.kopis.or.kr',
        pathname: '/upload/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          'http://ec2-13-124-38-21.ap-northeast-2.compute.amazonaws.com:8080/api/:path*', // 실제 백엔드 서버 주소
      },
    ];
  },
};

export default nextConfig;
