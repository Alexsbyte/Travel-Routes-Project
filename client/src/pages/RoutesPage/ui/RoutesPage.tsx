import { usePageTitle } from '@/shared/hooks/pageTitle';
import React, { useEffect, useState } from 'react';
import { getAllRoutesThunk } from '@/entities/route';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { RouteList } from '@/widgets';
import { Filter } from '@/widgets/RouteList/utils/filter';
import { MapHome } from '@/widgets/MapHome';
import { Route } from '@/entities/route';  // Тип маршрута

export function RoutesPage(): React.JSX.Element {
  usePageTitle();
  const dispatch = useAppDispatch();
  const routes = useAppSelector((store) => store.route.routes);
  const [filteredRoutes, setFilteredRoutes] = useState(routes);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);  // Состояние для выбранного маршрута

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

  const sortedRoutes = selectedRoute
    ? [selectedRoute, ...filteredRoutes.filter(route => route.id !== selectedRoute.id)]
    : filteredRoutes;

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '70%' }}>
          <p style={{ width: '100%' , height: '700px' , padding: '0px 40px'}} >
            <MapHome filteredRoutes={routes} onPointClick={handlePointClick} />
          </p>
        </div>
        <div style={{ width: '30%' }}>
          <Filter onFilterChange={handleFilterChange} />
          <RouteList
            filteredRoutes={sortedRoutes}  // Передаем отсортированные маршруты
            selectedRoute={selectedRoute}  // Передаем выбранный маршрут
            sortedRoutes={sortedRoutes}  // Передаем выбранный маршрут
          />
        </div>
      </div>
    </div>
  );
}
