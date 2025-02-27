import { createSlice } from '@reduxjs/toolkit';
import { FavoriteType } from '../model/FavoriteType';
import {
  createFavoriteThunk,
  deleteFavoriteThunk,
  getAllUserFavoritesThunk,
  getOneRouteFavoriteThunk,
} from '../api/FavoriteThunk';
import { message } from 'antd';
import { Route } from '@/entities/route';

interface FavoriteState {
  favorites: Route[] 
  favorite: FavoriteType | null
  loading: boolean;
  error: string | null;
  currentFavorite: boolean; // // новое состояние для текущего маршрута
}

const initialState: FavoriteState = {
  favorite: null,
  favorites: [],
  loading: false,
  error: null,
  currentFavorite: false, // по умолчанию текущий лайк не выбран
};

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE FAVORITE
      .addCase(createFavoriteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFavoriteThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentFavorite = true;
        message.success(action.payload.message);
      })
      .addCase(createFavoriteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })

      // DELETE FAVORITE
      .addCase(deleteFavoriteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFavoriteThunk.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (route) => {
            return route.favorite[0].id!== action.payload.data.id}
        );
        console.log(action.payload.data,"<<<<<<<<<<<<<<<<<<<<<<<");
        
        state.loading = false;
        state.error = null;
        state.currentFavorite = false;
        message.success(action.payload.message);
      })
      .addCase(deleteFavoriteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })

      // GET ALL FAVORITES OF USER
      .addCase(getAllUserFavoritesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUserFavoritesThunk.fulfilled, (state, action) => {
        state.favorites = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllUserFavoritesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Unknown error';
      })

      // GET ONE ROUTE FAVORITE
      .addCase(getOneRouteFavoriteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneRouteFavoriteThunk.fulfilled, (state, action) => {
        state.currentFavorite = action.payload.data  ? true : false; 
        state.loading = false;
        state.error = null;
      })
      .addCase(getOneRouteFavoriteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Unknown error';
      });
  },
});

export const favoriteReducer = favoriteSlice.reducer;
