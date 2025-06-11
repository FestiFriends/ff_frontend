import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FavoriteTabPanelWrapper = ({ children }: Props) => (
  <>
    <div className='mx-auto grid w-fit grid-cols-2 gap-4'>{children}</div>
  </>
);

export default FavoriteTabPanelWrapper;
