'use client';

import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
  className?: string;
  activeClassName?: string;
  isActive?: boolean;
  end?: boolean;
}

const NavLink = ({
  href,
  className,
  activeClassName,
  isActive,
  end,
  children,
  ...props
}: PropsWithChildren<NavLinkProps>) => {
  const path = usePathname();
  const activePath =
    typeof isActive === 'boolean'
      ? isActive
      : end
        ? path.endsWith(href)
        : path.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(activePath && activeClassName, className)}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
