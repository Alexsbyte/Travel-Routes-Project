import { createAsyncThunk } from '@reduxjs/toolkit';
import { IApiResponseReject, IApiResponseSuccess } from '@/shared/types';
import { AxiosError } from 'axios';
import { axiosInstance } from '@/shared/lib/axiosInstance';
import { GenerationPayload, ModerationPayload } from '../model/types';

export const checkModerationThunk = createAsyncThunk<
  IApiResponseSuccess<boolean>,
  ModerationPayload,
  { rejectValue: IApiResponseReject }
>('ai/moderation', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<boolean>>(
      '/api/ai/moderations',
      payload,
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const generateBeautifullThunk = createAsyncThunk<
  IApiResponseSuccess<string>,
  GenerationPayload,
  { rejectValue: IApiResponseReject }
>('ai/generation', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<string>>(
      '/api/ai/generations',
      payload,
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});
