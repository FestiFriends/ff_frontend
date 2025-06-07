export const generateFilterOptions = <T extends Record<string, string>>(
  labels: T,
  includeAll: boolean = true
): { label: string; value: keyof T | '' }[] => {
  const options = Object.entries(labels).map(([value, label]) => ({
    label,
    value: value as keyof T,
  }));

  return includeAll ? [{ label: '전체', value: '' }, ...options] : options;
};
