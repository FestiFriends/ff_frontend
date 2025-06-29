'use client';
import React, { useState } from 'react';
import { SearchInput } from '@/components/common';
import { useIsMobile, useQueryParam } from '@/hooks';

const PerformancesSearchInput = () => {
  const { setMultipleQueryParams, getQueryParam } = useQueryParam();
  const [keyword, setKeyword] = useState(getQueryParam('keyword') || '');
  const isMobile = useIsMobile();

  const handleSubmit = () => {
    setMultipleQueryParams({
      keyword: keyword.trim() || null,
      page: '1',
    });
  };

  return (
    <>
      {!isMobile && (
        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='공연명, 출연진 등을 검색하세요'
          onSubmit={handleSubmit}
        >
          검색
        </SearchInput>
      )}
    </>
  );
};

export default PerformancesSearchInput;
