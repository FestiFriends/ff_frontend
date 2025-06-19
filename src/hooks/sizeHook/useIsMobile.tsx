import { useMediaQuery } from 'react-responsive';
import { IS_MOBILE_IN_DESKTOP } from '@/constants';

const useIsMobile = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return IS_MOBILE_IN_DESKTOP || isMobile;
};

export default useIsMobile;
