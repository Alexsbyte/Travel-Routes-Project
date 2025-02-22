import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@/shared/lib/axiosInstance';
import { AxiosError } from 'axios';
import { POINTS_API_ROUTES } from '@/shared/enums/apiRoutes';
import { IApiResponseReject, IApiResponseSuccess } from '@/shared/types';
import { Point } from '../model';

export const getPointsThunk = createAsyncThunk<
  IApiResponseSuccess<Point[]>,
  number, // ID маршрута
  { rejectValue: IApiResponseReject }
>('points/getAll', async (routeId, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<IApiResponseSuccess<Point[]>>(
      `${POINTS_API_ROUTES.GET_ALL_AND_ADD_POINTS}/${routeId}`
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const addPointThunk = createAsyncThunk<
  IApiResponseSuccess<Point>,
  { routeId: number; pointData: Omit<Point, 'id'> },
  { rejectValue: IApiResponseReject }
>('points/add', async ({ routeId, pointData }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<Point>>(
      `${POINTS_API_ROUTES.GET_ALL_AND_ADD_POINTS}/${routeId}`,
      pointData
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const updatePointThunk = createAsyncThunk<
  IApiResponseSuccess<Point>,
  { pointId: number; updatedData: Partial<Point> },
  { rejectValue: IApiResponseReject }
>('points/update', async ({ pointId, updatedData }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.put<IApiResponseSuccess<Point>>(
      `${POINTS_API_ROUTES.UPDATE_DELETE_POINT}/${pointId}`,
      updatedData
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const deletePointThunk = createAsyncThunk<
  IApiResponseSuccess<Point>,
  number, // ID точки
  { rejectValue: IApiResponseReject }
>('points/delete', async (pointId, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<IApiResponseSuccess<Point>>(
      `${POINTS_API_ROUTES.UPDATE_DELETE_POINT}/${pointId}`
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});
