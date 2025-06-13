import { cn } from '@/lib/utils';

interface TabContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ProfileWrapper = ({ children, className }: TabContentWrapperProps) => (
  <div>
    <div className={cn('mx-auto w-full max-w-2xl px-4 py-2', className)}>
      {children}
    </div>
  </div>
);

export default ProfileWrapper;
