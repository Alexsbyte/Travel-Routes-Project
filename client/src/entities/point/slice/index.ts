import { createSlice } from '@reduxjs/toolkit';
import { getPointsThunk, addPointThunk, updatePointThunk, deletePointThunk } from '../api';
import { Point } from '../model';
import { message } from 'antd';

interface PointsState {
  points: Point[];
  loading: boolean;
  error: string | null;
}

const initialState: PointsState = {
  points: [],
  loading: false,
  error: null,
};

export const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET POINTS
      .addCase(getPointsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPointsThunk.fulfilled, (state, action) => {
        state.points = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(getPointsThunk.rejected, (state, action) => {
        state.loading = false;
        state.points = [];
        state.error = action.payload!.error;
        message.error(action.payload!.error);
      })
      // ADD POINT
      .addCase(addPointThunk.fulfilled, (state, action) => {
        state.points = [...state.points, action.payload.data];
        message.success(action.payload.message);
      })
      // UPDATE POINT
      .addCase(updatePointThunk.fulfilled, (state, action) => {
        state.points = state.points.map((point) =>
          point.id === action.payload.data.id ? action.payload.data : point
        );
      })
      // DELETE POINT
      .addCase(deletePointThunk.fulfilled, (state, action) => {
        state.points = state.points.filter((point) => point.id !== action.payload.data.id);
      });
  },
});

export const pointsReducer = pointsSlice.reducer;
