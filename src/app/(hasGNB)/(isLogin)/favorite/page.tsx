import React from 'react';
import { Header } from '@/components/common';
import { FavoriteTabContainer } from '@/components/pages/favorite';
import { ScrollArea } from '@/components/ui/scroll-area';
const FavoritePage = () => (
  <>
    <Header title='위시리스트' />
    <ScrollArea className='h-[calc(100dvh-124px)]'>
      <div className='max-w-lg'>
        <FavoriteTabContainer />
      </div>
    </ScrollArea>
  </>
);

export default FavoritePage;
