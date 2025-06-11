'use client';

import { useState, useEffect } from 'react';
import Filter from '@/components/common/Filter/Filter';
import { visitFilterData } from '@/mocks/filters/visitFilterData';

interface CalendarFilterProps {
  onChange?: (filters: { visit?: string }) => void;
}

const CalendarFilter = ({ onChange }: CalendarFilterProps) => {
  const [selectedVisit, setSelectedVisit] = useState<string>();

  useEffect(() => {
    onChange?.({ visit: selectedVisit });
  }, [selectedVisit, onChange]);

  return (
    <div className='space-y-4'>
      <Filter
        data={visitFilterData}
        levelPlaceholders={['내한 여부 선택']}
        stopAtLevel={0}
        onChange={(values) => setSelectedVisit(values[0])}
      />
    </div>
  );
};

export default CalendarFilter;
