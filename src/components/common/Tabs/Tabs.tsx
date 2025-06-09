import { useEffect, useRef, useState } from 'react';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Tabs = ({ tabs, activeTab, onTabChange }: TabsProps) => {
  const [underline, setunderline] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = tabs.findIndex((t) => t === activeTab);
    const activeTabEl = tabRefs.current[activeIndex];
    if (activeTabEl) {
      setunderline(activeTabEl.offsetLeft);
    }
  }, [activeTab, tabs]);

  return (
    <div className='relative overflow-hidden border-b border-gray-200'>
      <div className='flex justify-between'>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            ref={(el) => void (tabRefs.current[i] = el)}
            onClick={() => onTabChange(tab)}
            className={`flex-1 py-2 text-center font-semibold transition-colors ${
              activeTab === tab ? 'text-black' : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        className='absolute bottom-0 left-0 h-0.5 bg-black transition-transform duration-300 ease-in-out'
        style={{
          width: `calc(100% / ${tabs.length})`,
          transform: `translateX(${underline}px)`,
        }}
      />
    </div>
  );
};

export default Tabs;
