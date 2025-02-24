import { usePageTitle } from '@/shared/hooks/pageTitle';
import React, { useEffect, useState } from 'react';
import { getAllRoutesThunk } from '@/entities/route';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { RouteList } from '@/widgets';
import { Filter } from '@/widgets/RouteList/utils/filter';
import { YandexMap } from '@/widgets/Map/ui/YandexMap';

export function RoutesPage(): React.JSX.Element {

  usePageTitle()
  const dispatch = useAppDispatch();
  const routes = useAppSelector((store) => store.route.routes);
  const [filteredRoutes, setFilteredRoutes] = useState(routes);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    dispatch(getAllRoutesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredRoutes(routes.filter(route => route.category === selectedCategory));
    } else {
      setFilteredRoutes(routes); 
    }
  }, [selectedCategory, routes]);

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      
      <div style={{ display: 'flex' }}>
        <div style={{ width: '70%' }}>
            <p style={{ width: '100%' , height: '700px' , padding: '40px'}} ><YandexMap/></p>
        </div>
        <div style={{ width: '30%' }}>
        <Filter onFilterChange={handleFilterChange} />
          <RouteList filteredRoutes={filteredRoutes} />
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;

