// import { UserType } from "@/entities/user";

import { UserType } from "@/entities/user";

export type FavoriteType = {
  id: number;
  route_id: number;
  user_id: number;
  userFav: UserType;
  currentFavorite: FavoriteType | null; // Текущий лайк для маршрута
  createdAt: Date;
  updatedAt: Date;
};
 

export type ArrayFavoriteType = FavoriteType[];
