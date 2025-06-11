import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const Tabs = ({ tabs, activeTab, onTabChange, className }: TabsProps) => {
  const [underline, setUnderline] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = tabs.findIndex((t) => t === activeTab);
    const activeTabEl = tabRefs.current[activeIndex];
    if (activeTabEl) {
      const fullWidth = activeTabEl.offsetWidth;
      const underlineWidth = fullWidth * 0.6;
      const underlineLeft =
        activeTabEl.offsetLeft + (fullWidth - underlineWidth) / 2;

      setUnderline({
        left: underlineLeft,
        width: underlineWidth,
      });
    }
  }, [activeTab, tabs]);

  return (
    <div className={cn('relative border-b border-gray-100', className)}>
      <div className='flex h-full justify-between'>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            ref={(el) => void (tabRefs.current[i] = el)}
            onClick={() => onTabChange(tab)}
            className={`flex-[1_0_0] items-center justify-center px-2 py-3.5 leading-normal tracking-[-0.35px] transition-all ${
              activeTab === tab
                ? 'text-14_B text-black'
                : 'text-14_M text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        className='absolute bottom-0 h-[3px] bg-black transition-all duration-300 ease-in-out'
        style={{
          width: underline.width,
          transform: `translateX(${underline.left}px)`,
        }}
      />
    </div>
  );
};

export default Tabs;
