import { Button } from '@mantine/core';
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export function LikeButton({
  userFavorite,
  handleLikeClick,
}: {
  handleLikeClick: () => void;
  userFavorite: boolean;
}): React.JSX.Element {
  return (
    <Button
      color="red" // Цвет кнопки, если лайк установлен
      onClick={handleLikeClick}
      mt="md"
      radius="md"
      fullWidth={false} // Убираем fullWidth, чтобы кнопка не занимала всю ширину
      style={{
        padding: 0, // Убираем внутренние отступы
        width: 'auto', // Убираем фиксированную ширину
        height: 'auto', // Убираем фиксированную высоту
        minWidth: 0, // Убираем минимальную ширину
        minHeight: 0, // Убираем минимальную высоту
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left', // Центрируем иконку
        border: 'none', // Убираем бордер
        backgroundColor: 'transparent', // Делает фон кнопки прозрачным
      }}
    >
      {userFavorite ? (
        <FaHeart size={24} color="red" style={{ marginLeft: '10px' }} /> // Сдвиг иконки вправо
      ) : (
        <FaRegHeart size={24} color="gray" style={{ marginLeft: '10px' }} /> // Сдвиг иконки вправо
      )}
    </Button>
  );
}
