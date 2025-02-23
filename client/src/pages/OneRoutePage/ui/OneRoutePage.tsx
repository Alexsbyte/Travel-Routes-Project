import { getAllRoutesThunk } from '@/entities/route'; 
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'antd'; // Подключаем карусель из antd
import { Image } from 'antd'; // Для изображений в карусели

export function OneRoutePage(): React.JSX.Element {
  const { id } = useParams();
  const routes = useAppSelector(store => store.route.routes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRoutesThunk());
  }, [dispatch]);

  const route = routes.find(route => route.id.toString() === `${id}`);

  if (!route) {
    return <div>Маршрут не найден</div>;
  }

  // Пример изображений для карусели (галерея)
  const images = [
    'https://via.placeholder.com/500x300?text=Image+1',
    'https://via.placeholder.com/500x300?text=Image+2',
    'https://via.placeholder.com/500x300?text=Image+3',
  ];

  return (
    <>
      <h1>{route.title}</h1>
      <p>{route.description}</p>
      <div>
        <strong>Категория:</strong> {route.category}
      </div>
      <div>
        <strong>Поделился:</strong> {route.user.username}
      </div>

      {/* Блок с картой и галереей */}
      <div style={{ marginTop: '20px' }}>
        <div style={{ height: '300px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
          {/* Заглушка для карты, в будущем сюда будет вставлена карта */}
          <h3>Здесь будет карта</h3>
        </div>

        {/* Переключатель галереи */}
        <h3>Галерея</h3>
        <Carousel autoplay={false} dots={true} arrows={true}>
          {images.map((url, index) => (
            <div key={index}>
              <Image src={url} alt={`Gallery image ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Блок с комментариями */}
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Комментарии</h3>
        {/* В будущем сюда можно добавить список комментариев */}
      </div>
    </>
  );
}
