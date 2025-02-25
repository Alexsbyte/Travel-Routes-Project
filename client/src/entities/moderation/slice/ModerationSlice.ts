import { createSlice } from '@reduxjs/toolkit';
import { checkModerationThunk } from '../api/ModerationThunk';

interface ModerationState {
  isLoading: boolean;
  error: string | null;
  flagged: boolean;
}

const initialState: ModerationState = {
  isLoading: false,
  error: null,
  flagged: false,
};

const moderationSlice = createSlice({
  name: 'moderation',
  initialState,
  reducers: {
    setError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkModerationThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkModerationThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);
        state.flagged = action.payload.data;
      })
      .addCase(checkModerationThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error;
        state.flagged = true;
      });
  },
});

export const setError = moderationSlice.actions;
export const moderationReducer = moderationSlice.reducer;
