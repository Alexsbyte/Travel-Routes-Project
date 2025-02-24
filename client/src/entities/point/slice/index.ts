import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { IPoint } from '../model';

interface PointsState {
  points: IPoint[];
}

const initialState: PointsState = {
  points: [],
};

export const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    addPoint: (state, action: PayloadAction<Omit<IPoint, 'id'>>) => {
      state.points.push({ id: nanoid(), ...action.payload });
    },
    updatePoint: (state, action: PayloadAction<{ id: string; description: string }>) => {
      const point = state.points.find((p) => p.id === action.payload.id);
      if (point) {
        point.description = action.payload.description;
      }
    },
    deletePoint: (state, action: PayloadAction<string>) => {
      state.points = state.points.filter((p) => p.id !== action.payload);
    },
    clearPoints: (state) => {
      state.points = [];
    },
  },
});

export const { addPoint, updatePoint, deletePoint, clearPoints } = pointsSlice.actions;

export const pointsReducer = pointsSlice.reducer;
