import { createSlice } from '@reduxjs/toolkit';
import { Point } from '../model';

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

});

export const pointsReducer = pointsSlice.reducer;
