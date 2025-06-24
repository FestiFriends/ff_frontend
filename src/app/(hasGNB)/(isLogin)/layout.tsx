'use client';

import LoginPrivider from '@/components/pages/LoginPrivider';

const LoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => <LoginPrivider>{children}</LoginPrivider>;

export default LoginLayout;
