import { createSlice } from '@reduxjs/toolkit';
import { CommentType } from '../model/CommentTypes';

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


export const commentSlice = createSlice({
    name: 'route',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      // GET COMMENTS
      .addCase(getAllRoutesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRoutesThunk.fulfilled, (state, action) => {
        state.routes = action.payload.data;
        state.loading = false;
        state.error = null;
        message.success(action.payload.message);
      })
      .addCase(getAllRoutesThunk.rejected, (state, action) => {
        state.loading = false;
        state.routes = [];
        state.error = action.payload!.error;
        message.error(action.payload!.error);
      })


    },
});