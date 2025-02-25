import { usePageTitle } from '@/shared/hooks/pageTitle';
import React, { useEffect, useState } from 'react';
import { getAllRoutesThunk } from '@/entities/route';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { RouteList } from '@/widgets';
import { Filter } from '@/widgets/RouteList/utils/filter';
import { MapHome } from '@/widgets/MapHome';
import { Route } from '@/entities/route';

export function RoutesPage(): React.JSX.Element {
  usePageTitle();
  const dispatch = useAppDispatch();
  const routes = useAppSelector((store) => store.route.routes);
  const [filteredRoutes, setFilteredRoutes] = useState(routes);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  useEffect(() => {
    dispatch(getAllRoutesThunk());
  }, [dispatch]);

  useEffect(() => {
    filterRoutes(selectedCategory, searchKeyword);
  }, [selectedCategory, searchKeyword, routes]);

  const filterRoutes = (category: string, keyword: string) => {
    const filtered = routes.filter(route => {
      const matchesCategory = category ? route.category === category : true;
      const matchesKeyword = keyword
        ? route.title.toLowerCase().includes(keyword.toLowerCase())
        : true;
      return matchesCategory && matchesKeyword;
    });
    setFilteredRoutes(filtered);
  };

  const handleFilterChange = (category: string, keyword: string) => {
    setSelectedCategory(category);
    setSearchKeyword(keyword);
  };

  const handlePointClick = (route: Route) => {
    setSelectedRoute(route);  // Обновляем информацию о выбранном маршруте
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '70%' }}>
          <div style={{ width: '100%' , height: '700px' , padding: '0px 40px'}} >
            <MapHome filteredRoutes={filteredRoutes} onPointClick={handlePointClick} />
          </div>
        </div>
        <div style={{ width: '30%' }}>
          <Filter onFilterChange={handleFilterChange} />
          <RouteList
            filteredRoutes={filteredRoutes}
            selectedRoute={selectedRoute}  // Передаем выбранный маршрут
          />
        </div>
      </div>
    </div>
  );
}
