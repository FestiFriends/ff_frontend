import CarIcon from '@/components/icons/CarIcon';
import GroupIcon from '@/components/icons/GroupIcon';
import SleepIcon from '@/components/icons/SleepIcon';

const icons = {
  '같이 동행': <GroupIcon className='h-4 w-4' />,
  '같이 탑승': <CarIcon className='h-4 w-4' />,
  '같이 숙박': <SleepIcon className='h-4 w-4' />,
};

interface BadgeProps {
  label: string;
  className: string;
}

const Badge = ({ label, className }: BadgeProps) => {
  const icon = icons[label as keyof typeof icons];

  return (
    <div className={className}>
      {icon && icon}
      {label}
    </div>
  );
};

export default Badge;
