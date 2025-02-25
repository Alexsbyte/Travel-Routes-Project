import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  SearchControl,
} from '@pbe/react-yandex-maps';
import React, { useState } from 'react';
import { Route } from '@/entities/route'; // Импортируем тип данных маршрута

interface Props {
  filteredRoutes: Route[]; // Ожидаем массив маршрутов
  onPointClick: (route: Route) => void; // Функция для передачи выбранного маршрута
}
export function MapHome({ filteredRoutes, onPointClick }: Props): React.JSX.Element {
  // Собираем все точки маршрутов в один массив

  const points = filteredRoutes.flatMap((route) => route.points[0]);
  console.log(points);

  const [selectedPoint, setSelectedPoint] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handlePlacemarkClick = (
    point: { latitude: number; longitude: number },
    route: Route,
  ) => {
    setSelectedPoint(point); // Обновляем выбранную точку
    onPointClick(route); // Отправляем выбранный маршрут в родительский компонент
  };

  return (
    <YMaps query={{ apikey: import.meta.env.VITE_YANDEX_API }}>
      <Map
        defaultState={{ center: [55.751244, 37.618423], zoom: 10 }} // Центр карты
        width="100%"
        height="100%"
      >
        {/* Отображаем все точки маршрутов на карте */}
        {points.map((point) => (
          <Placemark
            key={point.id}
            geometry={[point.latitude, point.longitude]}
            options={{
              preset:
                selectedPoint &&
                selectedPoint.latitude === point.latitude &&
                selectedPoint.longitude === point.longitude
                  ? 'islands#greenIcon' // Зеленый маркер для выбранной точки
                  : 'islands#blueIcon', // Синий маркер для остальных точек
            }}
            onClick={() =>
              handlePlacemarkClick(
                point,
                filteredRoutes.find((route) => route.points.includes(point))!,
              )
            }
          />
        ))}

        {/* Контролы на карте */}
        <SearchControl options={{ float: 'right' }} />
        <GeolocationControl options={{ float: 'left' }} />
      </Map>
    </YMaps>
  );
}
