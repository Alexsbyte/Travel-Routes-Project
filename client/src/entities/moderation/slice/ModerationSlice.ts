import { createSlice } from '@reduxjs/toolkit';
import { checkModerationThunk } from '../api/ModerationThunk';

interface ModerationState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ModerationState = {
  isLoading: false,
  error: null,
  success: false,
};

const moderationSlice = createSlice({
  name: 'moderation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkModerationThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkModerationThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);
        state.success = action.payload.data;
      })
      .addCase(checkModerationThunk.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload!.error;
        state.success = false;
      });
  },
});

export const moderationReducer = moderationSlice.reducer;
