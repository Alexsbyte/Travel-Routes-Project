import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance, setAccessToken } from '@/shared/lib/axiosInstance';
import { IApiResponseReject, IApiResponseSuccess } from '@/shared/types';
import { ISignInData, ISignUpData, UserWithTokenType } from '../model';
import { handleAxiosError } from '@/shared/utils/handleAxiosError';


enum AUTH_API_ROUTES {
  REFRESH_TOKENS = '/auth/refreshTokens',
  SIGN_UP = '/auth/signUp',
  SIGN_IN = '/auth/signIn',
  SIGN_OUT = '/auth/signOut',
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
    const { data } = await axiosInstance.get<
      IApiResponseSuccess<UserWithTokenType>
    >(AUTH_API_ROUTES.REFRESH_TOKENS);

    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const signUpThunk = createAsyncThunk<
  IApiResponseSuccess<UserWithTokenType>,
  ISignUpData,
  { rejectValue: IApiResponseReject }
>(USER_THUNKS_TYPES.SIGN_UP, async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<
      IApiResponseSuccess<UserWithTokenType>
    >(AUTH_API_ROUTES.SIGN_UP, userData);

    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const signInThunk = createAsyncThunk<
  IApiResponseSuccess<UserWithTokenType>,
  ISignInData,
  { rejectValue: IApiResponseReject }
>(USER_THUNKS_TYPES.SIGN_IN, async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<
      IApiResponseSuccess<UserWithTokenType>
    >(AUTH_API_ROUTES.SIGN_IN, userData);

    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const signOutThunk = createAsyncThunk<
  IApiResponseSuccess<null>,
  void,
  { rejectValue: IApiResponseReject }
>(USER_THUNKS_TYPES.SIGN_OUT, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<IApiResponseSuccess<null>>(
      AUTH_API_ROUTES.SIGN_OUT
    );

    setAccessToken('');
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});
