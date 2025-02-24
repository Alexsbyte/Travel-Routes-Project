import { IApiResponseReject, IApiResponseSuccess } from '@/shared/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ArrayCommentsType, CommentType } from '../model/CommentTypes';
import { COMMENT_THUNKS_TYPES } from '@/shared/enums/comment_routes';
import { axiosInstance } from '@/shared/lib/axiosInstance';
import { COMMENT_API_ROUTES } from '@/shared/enums/apiRoutes';
import { AxiosError } from 'axios';

export const getAllCommentsThunk = createAsyncThunk<
  IApiResponseSuccess<ArrayCommentsType>,
  void,
  { rejectValue: IApiResponseReject }
>(COMMENT_THUNKS_TYPES.GET_ALL, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<IApiResponseSuccess<ArrayCommentsType>>(
      COMMENT_API_ROUTES.GET_ALL_USER_COMMENTS,
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const createCommentThunk = createAsyncThunk<
  IApiResponseSuccess<CommentType>,
  FormData,
  { rejectValue: IApiResponseReject }
>(COMMENT_THUNKS_TYPES.CREATE, async (newComment, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<CommentType>>(
      COMMENT_API_ROUTES.ADD_COMMENT,
      newComment,
    );

    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});



