import { IApiResponseReject, IApiResponseSuccess } from '@/shared/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ArrayCommentsType, CommentType } from '../model/CommentTypes';
import { COMMENT_THUNKS_TYPES } from '@/shared/enums/comment_routes';
import { axiosInstance } from '@/shared/lib/axiosInstance';
import { COMMENT_API_ROUTES } from '@/shared/enums/apiRoutes';
import { AxiosError } from 'axios';

// export const getAllCommentsThunk = createAsyncThunk<
//   IApiResponseSuccess<ArrayCommentsType>,
//   { user_id: number },
//   { rejectValue: IApiResponseReject }
// >(COMMENT_THUNKS_TYPES.GET_ALL, async ({ user_id }, { rejectWithValue }) => {
//   try {
//     const { data } = await axiosInstance.get<IApiResponseSuccess<ArrayCommentsType>>(
//       `${COMMENT_API_ROUTES.GET_ALL_USER_COMMENTS}`,
//     );
//     return data;
//   } catch (error) {
//     const err = error as AxiosError<IApiResponseReject>;
//     return rejectWithValue(err.response!.data);
//   }
// });

export const createCommentThunk = createAsyncThunk<
  IApiResponseSuccess<CommentType>,
  { text: string; route_id: number; user_id: number },
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

export const deleteCommentThunk = createAsyncThunk<
  IApiResponseSuccess<CommentType>,
  number,
  { rejectValue: IApiResponseReject }
>(COMMENT_THUNKS_TYPES.DELETE, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<IApiResponseSuccess<CommentType>>(
      `${COMMENT_API_ROUTES.DELETE_COMMENT.replace(':comment_id', String(id))}`, 
      //ребята replace ищет в строке :comment_id и заменяет его на значение id, преобразованное в строку с помощью String(id).
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const getOneRouteCommentsThunk = createAsyncThunk<
  IApiResponseSuccess<ArrayCommentsType>,
  number,
  { rejectValue: IApiResponseReject }
>(COMMENT_THUNKS_TYPES.GET_ONE_ROUTE_COMMENTS, async (route_id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<IApiResponseSuccess<ArrayCommentsType>>(
      `${COMMENT_API_ROUTES.GET_ONE_ROUTE_COMMENTS}/${route_id}`,
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});
