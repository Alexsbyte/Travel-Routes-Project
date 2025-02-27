import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  SearchControl,
} from '@pbe/react-yandex-maps';
import React, { useState } from 'react';
import { Route } from '@/entities/route'; // Импортируем тип данных маршрута

interface YandexMapProps {
  filteredRoutes: Route[]; // Все маршруты
  onPointClick: (route: Route) => void; // Функция для передачи выбранного маршрута
  onMapClick: () => void; // Функция для сброса выбора маршрута
}

export const MapHome: React.FC<YandexMapProps> = ({
  filteredRoutes,
  onPointClick,
  onMapClick,
}) => {
  // Собираем все первые точки маршрутов в один массив
  const points = filteredRoutes.map((route) => route.points[0]); // Берем только первую точку каждого маршрута

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

  // Обработчик клика на карту (для сброса выделения)
  const handleMapClick = () => {
    setSelectedPoint(null); // Сбрасываем выбранную точку
    onMapClick(); // Восстанавливаем фильтрацию или показываем все маршруты
  };

  return (
    <div
    style={{
      width: '100%',
      height: '100%',
      borderRadius: '15px', // Скругление углов контейнера
      overflow: 'hidden', // Скрытие содержимого, выходящего за пределы контейнера
      position: 'relative', // Для корректного отображения
    }}
  >

    <YMaps query={{ apikey: import.meta.env.VITE_YANDEX_API }}>
      <Map
        defaultState={{ center: [55.751244, 37.618423], zoom: 8 }} // Центр карты
        width="100%"
        height="100%"
        onClick={handleMapClick} // Обработчик клика на пустое место карты
      >
        {/* Отображаем первую точку каждого маршрута */}
        {points.map((point) => (
          <Placemark
            key={`${point?.latitude}-${point?.longitude}`} // Уникальный ключ для каждой точки
            geometry={[point?.latitude, point?.longitude]}
            options={{
              preset:
                selectedPoint &&
                selectedPoint.latitude === point?.latitude &&
                selectedPoint.longitude === point?.longitude
                  ? 'islands#greenIcon' // Зеленый маркер для выбранной точки
                  : 'islands#blueIcon', // Синий маркер для остальных точек
            }}
            onClick={() =>
              handlePlacemarkClick(
                point,
                filteredRoutes.find((route) => route.points[0] === point)!,
              )
            } // Находим маршрут по первой точке
          />
        ))}

        {/* Контролы на карте */}
        <SearchControl options={{ float: 'right' }} />
        <GeolocationControl options={{ float: 'left' }} />
      </Map>
    </YMaps></div>
  );
};
