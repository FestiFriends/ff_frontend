import { CarIcon, GroupIcon, SleepIcon } from '@/components/icons';

const ICONS = {
  '같이 동행': <GroupIcon className='h-4 w-4' />,
  '같이 탑승': <CarIcon className='h-4 w-4' />,
  '같이 숙박': <SleepIcon className='h-4 w-4' />,
};

interface BadgeProps {
  label: string;
  className: string;
}

const Badge = ({ label, className }: BadgeProps) => {
  const icon = ICONS[label as keyof typeof ICONS];

  return (
    <div className={className}>
      {icon && icon}
      {label}
    </div>
  );
};

export default Badge;
