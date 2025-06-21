'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import OptionDropdown from '@/components/pages/performanceDetail/filters/OptionDropdown';
import { GenderLabels } from '@/constants/genderLabels';
import { GroupCategoryLabels } from '@/constants/groupLabels';
import { GroupSortLabels } from '@/constants/groupSortLabels';
import { LocationLabels } from '@/constants/locationLabels';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';
import { DateRange } from '@/types/dateRange';
import {
  getLabel,
  mapRecordToStringOptions,
  mapRecordValueToOptions,
} from '@/utils/formatGroupOptions';
import DatePickerModal from './filters/DatePickerModal';
import LocationModal from './filters/LocationModal';

const groupSortOptions = mapRecordToStringOptions(GroupSortLabels);
const groupCategoryOptions = mapRecordToStringOptions(GroupCategoryLabels);
const groupGenderOptions = mapRecordToStringOptions(GenderLabels);
const groupLocationOptions = mapRecordValueToOptions(LocationLabels);

interface PerformanceDetailGroupsOptionTabsProps {
  isPending: boolean;
  dateRange?: DateRange;
  setDateRange?: (range: DateRange) => void;
  setLocation?: (location: string) => void;
  setGender?: (gender: string) => void;
}

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

  const sortLabel = getLabel(sort, GroupSortLabels, '정렬');
  const categoryLabel = getLabel(category, GroupCategoryLabels, '카테고리');
  const genderLabel = getLabel(gender, GenderLabels, '성별');
  const locationLabel =
    locationParam && Object.values(LocationLabels).includes(locationParam)
      ? locationParam
      : '지역';

  const updateQueryParams = (params: Record<string, string | null>) => {
    if (isPending) return;
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (!value) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    router.replace(`${window.location.pathname}?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const handleResetKeys = (keysToRemove: string[]) => {
    if (isPending) return;
    const resetParams = Object.fromEntries(
      keysToRemove.map((key) => [key, null])
    );
    updateQueryParams({ ...resetParams, page: '1' });
  };

  const handleInitOptions = () => {
    if (isPending) return;
    router.replace(window.location.pathname, { scroll: false });
  };

  const renderOptionDropdown = (
    placeholder: string,
    value: string | null,
    itemList: { label: string; value: string }[],
    key: string
  ) => (
    <OptionDropdown
      triggerPlaceholder={placeholder}
      itemList={itemList}
      onClick={(value) => updateQueryParams({ [key]: value, page: '1' })}
      isPending={isPending}
      isSelected={value !== null}
    />
  );

  return (
    <div className='grid grid-cols-3 gap-2'>
      {renderOptionDropdown(sortLabel, sort, groupSortOptions, 'sort')}
      {renderOptionDropdown(
        categoryLabel,
        category,
        groupCategoryOptions,
        'category'
      )}
      {renderOptionDropdown(genderLabel, gender, groupGenderOptions, 'gender')}

      <DatePickerModal
        startDate={startDate}
        endDate={endDate}
        placeholder='날짜'
        isPending={isPending}
        onInit={handleResetKeys}
        onSubmit={(params) => updateQueryParams({ ...params, page: '1' })}
      />

      <LocationModal
        triggerPlaceholder={locationLabel}
        itemList={groupLocationOptions}
        onClick={(value) =>
          updateQueryParams({ ['location']: value, page: '1' })
        }
        isPending={isPending}
        isSelected={locationParam !== null}
      />

      <Button
        size='sm'
        variant='secondary'
        onClick={handleInitOptions}
        disabled={isPending}
        className='rounded-[100px] px-4 py-3 text-center'
      >
        <span className='text-14_M leading-normal tracking-[-0.35px] whitespace-nowrap text-primary-red'>
          초기화
        </span>
      </Button>
    </div>
  );
};

export default PerformanceDetailGroupsOptionTabs;
