import { LocationLabels } from '@/constants/locationLabels';

export const formatLocation = (location: string) => {
  const [rawLocation, performanceLocation] = location.split('/');
  return {
    location: LocationLabels[rawLocation] || rawLocation,
    performanceLocation,
  };
};
