import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance, setAccessToken } from '@/shared/lib/axiosInstance';
import { IApiResponseReject, IApiResponseSuccess } from '@/shared/types';
import { ISignInData, UserWithTokenType } from '../model';
import { AxiosError } from 'axios';

enum AUTH_API_ROUTES {
  REFRESH_TOKENS = 'api/auth/refreshTokens',
  SIGN_UP = 'api/auth/signUp',
  SIGN_IN = 'api/auth/signIn',
  SIGN_OUT = 'api/auth/signOut',
}

enum USER_THUNKS_TYPES {
  REFRESH_TOKENS = 'user/refreshTokens',
  SIGN_UP = 'user/signUp',
  SIGN_IN = 'user/signIn',
  SIGN_OUT = 'user/signOut',
}

export const refreshTokensThunk = createAsyncThunk<
  IApiResponseSuccess<UserWithTokenType>,
  void,
  { rejectValue: IApiResponseReject }
>(USER_THUNKS_TYPES.REFRESH_TOKENS, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<IApiResponseSuccess<UserWithTokenType>>(
      AUTH_API_ROUTES.REFRESH_TOKENS,
    );

    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const signUpThunk = createAsyncThunk<
  IApiResponseSuccess<UserWithTokenType>,
  FormData,
  { rejectValue: IApiResponseReject }
>(USER_THUNKS_TYPES.SIGN_UP, async (userData, { rejectWithValue }) => {
  try {
    console.log(userData);

    const { data } = await axiosInstance.post<IApiResponseSuccess<UserWithTokenType>>(
      AUTH_API_ROUTES.SIGN_UP,
      userData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const signInThunk = createAsyncThunk<
  IApiResponseSuccess<UserWithTokenType>,
  ISignInData,
  { rejectValue: IApiResponseReject }
>(USER_THUNKS_TYPES.SIGN_IN, async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<UserWithTokenType>>(
      AUTH_API_ROUTES.SIGN_IN,
      userData,
    );

    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const signOutThunk = createAsyncThunk<
  IApiResponseSuccess<null>,
  void,
  { rejectValue: IApiResponseReject }
>(USER_THUNKS_TYPES.SIGN_OUT, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<null>>(
      AUTH_API_ROUTES.SIGN_OUT,
    );

    setAccessToken('');
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});
