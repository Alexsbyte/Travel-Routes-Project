import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../model';
import {
  refreshTokensThunk,
  signUpThunk,
  signInThunk,
  signOutThunk,
  verifyEmailThunk,
  changeUsernameThunk,
  changePasswordThunk,
  changePhotoThunk,
} from '../api';

type UserState = {
  user: UserType | null;
  error: string | null;
  loading: boolean;
  isInitialized: boolean;
  emailVerified: boolean; // устанавливаем состояние для подтверждения
};

const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
  isInitialized: false,
  emailVerified: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(refreshTokensThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshTokensThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.error = null;
        state.isInitialized = true;
      })
      .addCase(refreshTokensThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload!.error;
        state.isInitialized = true;
      })

      //* signUpThunk
      .addCase(signUpThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.error = null;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload!.error;
      })

      //* signInThunk
      .addCase(signInThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.error = null;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload!.error;
      })

      //* signOutThunk
      .addCase(signOutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOutThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(signOutThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload!.error;
      })
      //* verifyEmailThunk
      .addCase(verifyEmailThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmailThunk.fulfilled, (state) => {
        state.loading = false;
        state.emailVerified = true; // установили статус как подтвержденный
        state.error = null;
      })
      .addCase(verifyEmailThunk.rejected, (state, action) => {
        state.loading = false;
        state.emailVerified = false;
        state.error = action.payload ? action.payload!.error : 'Unknown error';
      })

      .addCase(changePhotoThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePhotoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.error = null;
      })
      .addCase(changePhotoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload!.error : 'Unknown error';
      })

      .addCase(changePasswordThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.error = null;
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload!.error : 'Unknown error';
      })

      .addCase(changeUsernameThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeUsernameThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.error = null;
      })
      .addCase(changeUsernameThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload!.error : 'Unknown error';
      });
  },
});

export const userReducer = userSlice.reducer;
