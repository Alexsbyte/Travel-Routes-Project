import { IApiResponseReject, IApiResponseSuccess } from '@/shared/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@/shared/lib/axiosInstance';
import { AxiosError } from 'axios';
import { ROUTE_THUNKS_TYPES } from '@/shared/enums/route_routes';
import { ArrayRoutesType, RawRouteData, Route } from '../model';

export const getAllRoutesThunk = createAsyncThunk<
  IApiResponseSuccess<ArrayRoutesType>,
  void,
  { rejectValue: IApiResponseReject }
>(ROUTE_THUNKS_TYPES.GET_ALL, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<IApiResponseSuccess<ArrayRoutesType>>(
      '/routes',
    );

    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const createRouteThunk = createAsyncThunk<
  IApiResponseSuccess<Route>,
  RawRouteData,
  { rejectValue: IApiResponseReject }
>(ROUTE_THUNKS_TYPES.CREATE, async (newRoute, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<Route>>(
      '/routes',
      newRoute,
    );

    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const deleteRouteThunk = createAsyncThunk<
  IApiResponseSuccess<Route>,
  number,
  { rejectValue: IApiResponseReject }
>(ROUTE_THUNKS_TYPES.DELETE, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<IApiResponseSuccess<Route>>(
      `/routes/${id}`,
    );

    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const updateRouteThunk = createAsyncThunk<
  IApiResponseSuccess<Route>,
  { id: number; updatedRoute: RawRouteData },
  { rejectValue: IApiResponseReject }
>(ROUTE_THUNKS_TYPES.UPDATE, async ({ id, updatedRoute }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.put<IApiResponseSuccess<Route>>(
      `/routes/${id}`,
      updatedRoute,
    );

    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});
