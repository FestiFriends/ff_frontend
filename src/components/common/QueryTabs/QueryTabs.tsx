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
  const { getQueryParam, setQueryParam } = useQueryParam();

  const currentTab = getQueryParam(queryParamKey) || defaultTab;

  const activeTab = tabs.includes(currentTab) ? currentTab : defaultTab;

  const handleTabChange = (tab: string) => {
    setQueryParam(queryParamKey, tab);
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
