'use client';
import React, { useState } from 'react';
import SearchInput from '@/components/common/SearchInput/SearchInput';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';

const PerformancesSearchInput = () => {
  const { setMultipleQueryParams, getQueryParam } = useQueryParam();
  const [keyword, setKeyword] = useState(getQueryParam('keyword') || '');

  const handleSubmit = () => {
    setMultipleQueryParams({
      keyword: keyword.trim() || null,
      page: '1',
    });
  };

  return (
    <SearchInput
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      placeholder='공연명, 출연진 등을 검색하세요'
      onSubmit={handleSubmit}
    >
      검색
    </SearchInput>
  );
};

export default PerformancesSearchInput;
