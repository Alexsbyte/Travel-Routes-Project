import { usePageTitle } from '@/shared/hooks/pageTitle';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { getAllRoutesThunk } from '@/entities/route';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { RouteList } from '@/widgets';
import { Filter } from '@/widgets/RouteList/utils/filter';
import { MapHome } from '@/widgets/MapHome';
import { Route } from '@/entities/route'; // Тип маршрута
import { ScrollArea } from '@mantine/core';
import { Loader } from '@/shared/ui/Loader';

export function RoutesPage(): React.JSX.Element {
  usePageTitle();
  const dispatch = useAppDispatch();
  const routes = useAppSelector((store) => store.route.routes); // Все маршруты
  const loading = useAppSelector((store) => store.route.loading);
  const [filteredRoutes, setFilteredRoutes] = useState(routes); // Отфильтрованные маршруты
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null); // Состояние для выбранного маршрута

  useEffect(() => {
    dispatch(getAllRoutesThunk());
  }, [dispatch]);

  useLayoutEffect(() => {
    filterRoutes(selectedCategory, searchKeyword);
  }, [selectedCategory, searchKeyword, routes]);

  const filterRoutes = (category: string, keyword: string) => {
    const filtered = routes.filter((route) => {
      const matchesCategory = category ? route.category === category : true;
      const matchesKeyword = keyword
        ? route.title.toLowerCase().includes(keyword.toLowerCase())
        : true;
      return matchesCategory && matchesKeyword;
    });
    setFilteredRoutes(filtered); // Обновляем отфильтрованные маршруты
  };

  const handleFilterChange = (category: string, keyword: string) => {
    setSelectedCategory(category);
    setSearchKeyword(keyword);
  };

  const handlePointClick = (route: Route) => {
    setSelectedRoute(route); // Обновляем информацию о выбранном маршруте
  };

  const handleMapClick = () => {
    setSelectedRoute(null); // Сбрасываем выбранный маршрут при клике на пустое место карты
    filterRoutes(selectedCategory, searchKeyword); // Восстанавливаем фильтрацию или показываем все маршруты
  };

  const sortedRoutes = selectedRoute
    ? [selectedRoute, ...filteredRoutes.filter((route) => route.id !== selectedRoute.id)]
    : filteredRoutes;

  if (loading && routes.length === 0) {
    return <Loader loading={loading} />;
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '70%' }}>
          {/* Оборачиваем карту в контейнер с скруглением и скрываем переполнение */}
          <div
            style={{
              width: '100%',
              height: '622px',
              padding: '10px 0px 0px 30px',
              borderRadius: '15px', // Скругление углов
              overflow: 'hidden', // Скрытие переполнения
            }}
          >
            {/* Передаем все маршруты в MapHome */}
            <MapHome
              filteredRoutes={filteredRoutes}
              onPointClick={handlePointClick}
              onMapClick={handleMapClick}
            />
          </div>
        </div>
        {/* Контейнер под Фильтры и Карточки */}
        <div style={{ width: '30%' }}>
          <div style={{ padding: '0px 40px  0 40px' }}>
            {/* Фильтры */}
            <Filter onFilterChange={handleFilterChange} />

            <Loader loading={loading}>
              <ScrollArea.Autosize mah={550} maw={500} mx="auto">
                {/* Карточки */}
                <RouteList
                  filteredRoutes={sortedRoutes}
                  selectedRoute={selectedRoute}
                  sortedRoutes={sortedRoutes}
                />
              </ScrollArea.Autosize>
            </Loader>

            {/* Передаем отсортированные маршруты */}
          </div>
        </div>
      </div>
    </div>
  );
}
