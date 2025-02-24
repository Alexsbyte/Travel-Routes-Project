import React, { useEffect, useState } from 'react';
import { getAllRoutesThunk } from '@/entities/route';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { RouteList } from '@/widgets';
import { Filter } from '@/widgets/RouteList/utils/filter';

export function RoutesPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const routes = useAppSelector((store) => store.route.routes);
  const [filteredRoutes, setFilteredRoutes] = useState(routes);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    dispatch(getAllRoutesThunk());
  }, [dispatch]);

  useEffect(() => {
    // Фильтрация маршрутов при изменении выбранной категории или маршрутов
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
      <Filter onFilterChange={handleFilterChange} /> {/* Отрисовка Filter здесь */}
      <div style={{ display: 'flex' }}>
        <div style={{ width: '70%' }}>
        <iframe
            style={{ width: '1000px', height: '400px' }}
            src="https://yandex.ru/maps/"
          ></iframe>
        </div>
        <div style={{ width: '30%' }}>
          <RouteList filteredRoutes={filteredRoutes} />
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
