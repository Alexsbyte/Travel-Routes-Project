import { createAsyncThunk } from '@reduxjs/toolkit';
import { IApiResponseReject, IApiResponseSuccess } from '@/shared/types';
import { AxiosError } from 'axios';
import { axiosInstance } from '@/shared/lib/axiosInstance';
import { ModerationPayload } from '../model/types';

export const checkModerationThunk = createAsyncThunk<
  IApiResponseSuccess<boolean>,
  ModerationPayload,
  { rejectValue: IApiResponseReject }
>('moderation/check', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<boolean>>(
      '/api/moderations',
      payload,
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});
