import { createSlice } from '@reduxjs/toolkit';
import { CommentType } from '../model/CommentTypes';
import { message } from 'antd';
import {
  createCommentThunk,
  deleteCommentThunk,
  getOneRouteCommentsThunk,
} from '../api/CommentThunk';

interface CommentsState {
  comments: CommentType[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL USER COMMENTS
      // .addCase(getAllCommentsThunk.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(getAllCommentsThunk.fulfilled, (state, action) => {
      //   state.comments = action.payload.data;
      //   state.loading = false;
      //   state.error = null;
      //   message.success(action.payload.message);
      // })
      // .addCase(getAllCommentsThunk.rejected, (state, action) => {
      //   state.loading = false;
      //   state.comments = [];
      //   state.error = action.payload!.error;
      //   message.error(action.payload!.error);
      // })

      // CREATE COMMENT
      .addCase(createCommentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCommentThunk.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload.data];
        state.loading = false;
        state.error = null;
        message.success(action.payload.message);
      })
      .addCase(createCommentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })

      // DELETE COMMENT
      .addCase(deleteCommentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCommentThunk.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (route) => route.id !== action.payload.data.id,
        );
        state.loading = false;
        state.error = null;
        message.success(action.payload.message);
      })
      .addCase(deleteCommentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })

      // GET COMMENTS FOR SPECIFIC ROUTE
      .addCase(getOneRouteCommentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneRouteCommentsThunk.fulfilled, (state, action) => {
        state.comments = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(getOneRouteCommentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Unknown error';
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
