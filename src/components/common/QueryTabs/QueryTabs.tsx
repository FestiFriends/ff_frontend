import { Tabs } from '@/components/common';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';

interface QueryTabsProps {
  tabs: string[];
  defaultTab?: string;
  queryParamKey?: string;
  onTabChange?: (tab: string) => void;
}

const QueryTabs = ({
  tabs,
  defaultTab = tabs[0],
  queryParamKey = 'tab',
  onTabChange,
}: QueryTabsProps) => {
  const { getQueryParam, setMultipleQueryParams } = useQueryParam();

  // URL에서 현재 탭 값을 가져오거나 기본값 사용
  const currentTab = getQueryParam(queryParamKey) || defaultTab;

  // 유효하지 않은 탭이면 기본값으로 설정
  const activeTab = tabs.includes(currentTab) ? currentTab : defaultTab;

  const handleTabChange = (tab: string) => {
    // URL 쿼리 파라미터 업데이트
    setMultipleQueryParams({ [queryParamKey]: tab });

    // 부모 컴포넌트의 콜백 실행
    onTabChange?.(tab);
  };

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    />
  );
};

export default QueryTabs;
