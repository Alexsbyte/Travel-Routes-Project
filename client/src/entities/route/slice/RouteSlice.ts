import { createSlice } from '@reduxjs/toolkit';
import {
  getAllRoutesThunk,
  createRouteThunk,
  deleteRouteThunk,
  updateRouteThunk,
} from '../api/RouteThunk';
import { Route } from '../model/RouteTypes';
import { message } from 'antd';

interface RouteState {
  routes: Route[];
  loading: boolean;
  error: string | null;
}

const initialState: RouteState = {
  routes: [],
  loading: false,
  error: null,
};

export const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ROUTES
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
      // CREATE ROUTE
      .addCase(createRouteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRouteThunk.fulfilled, (state, action) => {
        state.routes = [...state.routes, action.payload.data];
        state.loading = false;
        state.error = null;
        message.success(action.payload.message);
      })
      .addCase(createRouteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })
      // UPDATE ROUTE
      .addCase(updateRouteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRouteThunk.fulfilled, (state, action) => {
        state.routes = state.routes.map((route) =>
          route.id === action.payload.data.id ? action.payload.data : route,
        );
        state.loading = false;
        state.error = null;
        message.success(action.payload.message);
      })
      .addCase(updateRouteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })
      // DELETE ROUTE
      .addCase(deleteRouteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRouteThunk.fulfilled, (state, action) => {
        state.routes = state.routes.filter(
          (route) => route.id !== action.payload.data.id,
        );
        state.loading = false;
        state.error = null;
        message.success(action.payload.message);
      })
      .addCase(deleteRouteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      });
  },
});

export const routeReducer = routeSlice.reducer;
