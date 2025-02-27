import { Button } from '@mantine/core';
import React from 'react'

export function LikeButton({userFavorite,handleLikeClick}:{handleLikeClick:()=>void, userFavorite:boolean}): React.JSX.Element {
    return (
                <Button
                color={userFavorite ? 'red' : 'gray'}
                onClick={handleLikeClick}
                mt="md"
                radius="md"
                fullWidth
              >
                {userFavorite  ? 'Отменить лайк' : 'Понравился маршрут'}
              </Button>
    )
}