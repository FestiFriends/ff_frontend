import { cn } from '@/lib/utils';

const useStyles = () => {
  const getButtonClasses = (
    isOpen: boolean,
    selectedItem?: string,
    isSelected?: boolean,
    className?: string | undefined
  ) =>
    cn(
      'inline-flex cursor-pointer items-center justify-center gap-1 rounded-[100px] border-1 border-gray-100 bg-white py-3 pr-4 pl-5 text-gray-950 transition-all',
      (isOpen || selectedItem || isSelected)
        && 'border-gray-950 bg-gray-950 text-white',

      className
    );

  return {
    getButtonClasses,
  };
};

export default useStyles;
