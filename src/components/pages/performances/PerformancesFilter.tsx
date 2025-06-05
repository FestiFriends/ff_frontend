'use client';
import React, { useEffect, useState } from 'react';
import Filter from '@/components/common/Filter/Filter';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';
import { festivalRegionFilter } from './PerformancesFilter.data';

const PerformancesFilter = () => {
  const { getQueryParam, setMultipleQueryParams } = useQueryParam();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    console.log('selectedValues', selectedValues);
  }, [selectedValues]);

  // 컴포넌트 마운트 시 URL에서 초기값 로드
  useEffect(() => {
    const regionParam = getQueryParam('region');
    if (regionParam) {
      // URL에서 쉼표로 구분된 값들을 배열로 변환
      const values = regionParam.split(',').filter(Boolean);
      setSelectedValues(values);
    }
  }, [getQueryParam]);

  const handleFilterChange = (values: string[]) => {
    setSelectedValues(values);

    // URL 쿼리 파라미터 업데이트
    setMultipleQueryParams({
      region: values.length > 0 ? values.join(',') : null, // 빈 배열이면 파라미터 삭제
      page: '1', // 필터 변경 시 첫 페이지로 리셋
    });
  };

  return (
    <>
      <Filter
        data={festivalRegionFilter}
        value={selectedValues}
        onChange={handleFilterChange}
        levelPlaceholders={['도시 선택', '구 선택']}
      />
    </>
  );
};

export default PerformancesFilter;
