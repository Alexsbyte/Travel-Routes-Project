import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
      state.points.push({...action.payload, id: state.points.length > 0 ? state.points[state.points.length - 1].id + 1 : 1});
    },
    updatePoint: (state, action: PayloadAction<{ id: number; description: string }>) => {
      const point = state.points.find((p) => p.id === action.payload.id);
      if (point) {
        point.description = action.payload.description;
      }
    },
    deletePoint: (state, action: PayloadAction<number>) => {
      state.points = state.points.filter((p) => p.id !== action.payload);
    },
    clearPoints: (state) => {
      state.points = [];
    },
    setPoints: (state, action: PayloadAction<IPoint[]>)=>{
      state.points = action.payload
       }
  },
});

export const { addPoint, updatePoint, deletePoint, clearPoints, setPoints } = pointsSlice.actions;

export const pointsReducer = pointsSlice.reducer;
