import { useState } from 'react';

export interface MultiLevelData {
  label: string;
  value: string;
  children?: MultiLevelData[];
}

export const useMultiLevelFilter = (data: MultiLevelData[]) => {
  const [level1, setLevel1] = useState('');
  const level1Options = data;

  return {
    level1,
    setLevel1,
    level1Options,
  };
};
