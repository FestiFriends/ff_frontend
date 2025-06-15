'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import QueryString from 'qs';
import Button from '@/components/common/Button/Button';
import DatePickerWithQuery from '@/components/common/DatePicker/DatePickerWithQuery';
import OptionDropdown from '@/components/common/OptionDropdown/OptionDropdown';
import { Skeleton } from '@/components/ui/skeleton';
import { GenderLabels } from '@/constants/genderLabels';
import { GroupCategoryLabels } from '@/constants/groupLabels';
import { GroupSortLabels } from '@/constants/groupSortLabels';
import { LocationLabels } from '@/constants/locationLabels';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';
import { DateRange } from '@/types/dateRange';
import { GenderType, GroupCategoryType, GroupSortType } from '@/types/enums';

interface PerformanceDetailGroupsOptionTabsProps {
  isPending: boolean;
  dateRange?: DateRange;
  setDateRange?: (range: DateRange) => void;
  setLocation?: (location: string) => void;
  setGender?: (gender: string) => void;
}

const groupSortOptions = Object.entries(GroupSortLabels).map(
  ([value, label]) => ({ value, label })
);

const groupCategoryOptions = Object.entries(GroupCategoryLabels).map(
  ([value, label]) => ({ value, label })
);

const groupLocationOptions = Object.entries(LocationLabels).map(
  ([, label]) => ({ value: label, label })
);

const groupGenderOptions = Object.entries(GenderLabels).map(
  ([value, label]) => ({ value, label })
);

const PerformanceDetailGroupsOptionTabs = ({
  isPending,
}: PerformanceDetailGroupsOptionTabsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getQueryParam } = useQueryParam();

  const sort = getQueryParam('sort');
  const category = getQueryParam('category');
  const startDate = getQueryParam('startDate');
  const endDate = getQueryParam('endDate');
  const locationParam = getQueryParam('location');
  const gender = getQueryParam('gender');

  const sortLabel =
    sort && sort in GroupSortLabels
      ? GroupSortLabels[sort as GroupSortType]
      : '정렬';

  const categoryLabel =
    category && category in GroupCategoryLabels
      ? GroupCategoryLabels[category as GroupCategoryType]
      : '카테고리';

  const locationLabel =
    locationParam && Object.values(LocationLabels).includes(locationParam)
      ? locationParam
      : '지역';

  const genderLabel =
    gender && gender in GenderLabels
      ? GenderLabels[gender as GenderType]
      : '성별';

  const handleOptionChange = (key: string, value: string | null) => {
    const params = QueryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    const newQuery = QueryString.stringify({
      ...params,
      [key]: value,
      page: 1,
    });

    router.replace(`?${newQuery}`, { scroll: false });
  };

  const handleMultipleOptionChange = (
    params: Record<string, string | null>
  ) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    router.replace(`${window.location.pathname}?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const handleInitOptions = () => {
    router.replace(window.location.pathname, { scroll: false });
  };

  const handleResetKeys = (keysToRemove: string[]) => {
    const query = QueryString.parse(searchParams.toString());

    keysToRemove.forEach((key) => {
      delete query[key];
    });

    const newQuery = QueryString.stringify(
      { ...query, page: '1' },
      { addQueryPrefix: true }
    );

    router.replace(`${window.location.pathname}${newQuery}`, { scroll: false });
  };

  if (isPending)
    return (
      <div>
        <Skeleton className='h-[10vh] w-full' />
      </div>
    );

  return (
    <div className='flex flex-col gap-2 md:flex-row'>
      <div className='flex gap-2'>
        <OptionDropdown
          triggerPlaceholder={sortLabel}
          itemList={groupSortOptions}
          onClick={(value) => handleOptionChange('sort', value)}
          isSelected={sort !== null}
        />

        <OptionDropdown
          triggerPlaceholder={categoryLabel}
          itemList={groupCategoryOptions}
          onClick={(value) => handleOptionChange('category', value)}
          isSelected={category !== null}
        />

        <OptionDropdown
          triggerPlaceholder={genderLabel}
          itemList={groupGenderOptions}
          onClick={(value) => handleOptionChange('gender', value)}
          isSelected={gender !== null}
        />
      </div>
      <div className='flex gap-2'>
        <DatePickerWithQuery
          startDate={startDate}
          endDate={endDate}
          placeholder='날짜'
          onInit={handleResetKeys}
          onSubmit={handleMultipleOptionChange}
        />

        <OptionDropdown
          triggerPlaceholder={locationLabel}
          itemList={groupLocationOptions}
          onClick={(value) => handleOptionChange('location', value)}
          isSelected={locationParam !== null}
          variant='location'
        />

        <Button
          size='sm'
          variant='secondary'
          onClick={handleInitOptions}
          className='rounded-[100px] px-4 py-3 text-center'
        >
          <span className='text-14_M leading-normal tracking-[-0.35px] whitespace-nowrap text-primary-red'>
            초기화
          </span>
        </Button>
      </div>
    </div>
  );
};

export default PerformanceDetailGroupsOptionTabs;
