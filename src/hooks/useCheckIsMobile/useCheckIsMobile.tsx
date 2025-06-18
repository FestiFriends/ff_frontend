import { useMediaQuery } from 'react-responsive';

const useIsMobile = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile;
};

export default useIsMobile;
