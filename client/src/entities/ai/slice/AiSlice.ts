import { createSlice } from '@reduxjs/toolkit';
import { checkModerationThunk, generateBeautifullThunk } from '../api/AiThunk';

interface ModerationState {
  isLoading: boolean;
  error: string | null;
  flagged: boolean;
  generatedText: string | null;
}

const initialState: ModerationState = {
  isLoading: false,
  error: null,
  flagged: false,
  generatedText: null,
};

const aiSlice = createSlice({
  name: 'ai',
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
      })

      .addCase(generateBeautifullThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateBeautifullThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);
        state.generatedText = action.payload.data.text;
      })
      .addCase(generateBeautifullThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error;
        state.generatedText = null;
      });
  },
});

export const setError = aiSlice.actions;
export const aiReducer = aiSlice.reducer;
