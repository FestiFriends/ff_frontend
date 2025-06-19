import { useMediaQuery } from 'react-responsive';
import { IS_MOBILE_IN_DESKTOP } from '@/constants';

const useIsDesktop = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return !IS_MOBILE_IN_DESKTOP && isDesktop;
};

export default useIsDesktop;
