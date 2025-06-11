import React from 'react';

const TabContentWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className='mx-auto grid w-fit grid-cols-2 gap-4'>{children}</div>
  </>
);

export default TabContentWrapper;
