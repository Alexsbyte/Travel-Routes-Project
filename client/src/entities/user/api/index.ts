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
  VERIFY_EMAIL = 'api/auth/verify-email',
}

enum USER_THUNKS_TYPES {
  REFRESH_TOKENS = 'user/refreshTokens',
  SIGN_UP = 'user/signUp',
  SIGN_IN = 'user/signIn',
  SIGN_OUT = 'user/signOut',
  VERIFY_EMAIL = 'user/verify-email',
}

enum PROFILE_API_ROUTES {
  CHANGE_PHOTO = 'api/profile/changePhoto',
  CHANGE_PASSWORD = 'api/profile/changePassword',
  CHANGE_USERNAME = 'api/profile/changeUsername',
}

enum PROFILE_THUNKS_TYPES {
  CHANGE_PHOTO = 'profile/changePhoto',
  CHANGE_PASSWORD = 'profile/changePassword',
  CHANGE_USERNAME = 'profile/changeUsername',
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
    console.log(data);

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

export const verifyEmailThunk = createAsyncThunk<
  IApiResponseSuccess<null | { message: string }>,
  string, // токен из юрл
  { rejectValue: IApiResponseReject }
>(USER_THUNKS_TYPES.VERIFY_EMAIL, async (token, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<IApiResponseSuccess<null>>(
      `${AUTH_API_ROUTES.VERIFY_EMAIL}/${token}`,
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data || { error: 'Unknown error' });
  }
});

export const changePhotoThunk = createAsyncThunk<
  IApiResponseSuccess<UserWithTokenType>,
  FormData,
  { rejectValue: IApiResponseReject }
>(PROFILE_THUNKS_TYPES.CHANGE_PHOTO, async (photoData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.put<IApiResponseSuccess<UserWithTokenType>>(
      PROFILE_API_ROUTES.CHANGE_PHOTO,
      photoData,
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
    return rejectWithValue(err.response!.data || { error: 'Unknown error' });
  }
});

export const changePasswordThunk = createAsyncThunk<
  IApiResponseSuccess<UserWithTokenType>,
  { currentPassword: string; newPassword: string },
  { rejectValue: IApiResponseReject }
>(PROFILE_THUNKS_TYPES.CHANGE_PASSWORD, async (passwordData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.put<IApiResponseSuccess<UserWithTokenType>>(
      PROFILE_API_ROUTES.CHANGE_PASSWORD,
      passwordData,
    );

    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data || { error: 'Unknown error' });
  }
});

export const changeUsernameThunk = createAsyncThunk<
  IApiResponseSuccess<UserWithTokenType>,
  { newUsername: string },
  { rejectValue: IApiResponseReject }
>(PROFILE_THUNKS_TYPES.CHANGE_USERNAME, async (usernameData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.put<IApiResponseSuccess<UserWithTokenType>>(
      PROFILE_API_ROUTES.CHANGE_USERNAME,
      usernameData,
    );

    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data || { error: 'Unknown error' });
  }
});
