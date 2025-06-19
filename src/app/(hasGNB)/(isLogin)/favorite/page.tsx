import React from 'react';
import { Header } from '@/components/common';
import { FavoriteTabContainer } from '@/components/pages/favorite';
const FavoritePage = () => (
  <>
    <Header title='위시리스트' />
    <FavoriteTabContainer />
  </>
);

export default FavoritePage;
