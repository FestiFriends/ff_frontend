import { useMemo, useState } from 'react';

export interface MultiLevelData {
  label: string;
  value: string;
  children?: MultiLevelData[];
}

export const useMultiLevelFilter = (data: MultiLevelData[]) => {
  const [level1, setLevel1] = useState('');
  const [level2, setLevel2] = useState('');
  const level1Options = data;

  const level2Options = useMemo(() => {
    const selected = data.find((item) => item.value === level1);
    return selected?.children || [];
  }, [level1, data]);

  return {
    level1,
    setLevel1,
    level1Options,
    level2,
    setLevel2,
    level2Options,
  };
};
