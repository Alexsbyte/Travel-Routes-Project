import { IApiResponseReject, IApiResponseSuccess } from '@/shared/types';
import { FavoriteType } from '../model/FavoriteType';
import { FAVORITE_THUNKS_TYPES } from '@/shared/enums/favorite_routes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@/shared/lib/axiosInstance';
import { FAVORITE_API_ROUTES } from '@/shared/enums/apiRoutes';
import { AxiosError } from 'axios';
import { Route } from '@/entities/route';

export const createFavoriteThunk = createAsyncThunk<
  IApiResponseSuccess<FavoriteType>,
  { route_id: number; user_id: number },
  { rejectValue: IApiResponseReject }
>(FAVORITE_THUNKS_TYPES.CREATE, async (newFavorite, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<FavoriteType>>(
      FAVORITE_API_ROUTES.ADD_FAVORITE,
      newFavorite,
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const deleteFavoriteThunk = createAsyncThunk<
  IApiResponseSuccess<FavoriteType>,
  number,
  { rejectValue: IApiResponseReject }
>(FAVORITE_THUNKS_TYPES.DELETE, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<IApiResponseSuccess<FavoriteType>>(
      `${FAVORITE_API_ROUTES.DELETE_FAVORITE.replace(':route_id', String(id))}`,
      //ребята replace ищет в строке :comment_id и заменяет его на значение id, преобразованное в строку с помощью String(id).
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const getOneRouteFavoriteThunk = createAsyncThunk<
  IApiResponseSuccess<FavoriteType>,
  number,
  { rejectValue: IApiResponseReject }
>(FAVORITE_THUNKS_TYPES.GET_ONE_ROUTE_FAVORITE, async (route_id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<IApiResponseSuccess<FavoriteType>>(
      FAVORITE_API_ROUTES.GET_ONE_ROUTE_FAVORITE.replace(':route_id', String(route_id)),
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const getAllUserFavoritesThunk = createAsyncThunk<
  IApiResponseSuccess<Route[]>,
  undefined,
  { rejectValue: IApiResponseReject }
>(
  FAVORITE_API_ROUTES.GET_ALL_USER_FAVORITES,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<IApiResponseSuccess<Route[]>>(
        `${FAVORITE_API_ROUTES.GET_ALL_USER_FAVORITES}`,
      );

      return data;
    } catch (error) {
      const err = error as AxiosError<IApiResponseReject>;
      return rejectWithValue(err.response!.data);
    }
  },
);
