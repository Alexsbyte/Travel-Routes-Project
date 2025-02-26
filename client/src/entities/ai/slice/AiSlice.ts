import { createSlice } from '@reduxjs/toolkit';
import { checkModerationThunk, generateBeautifullThunk } from '../api/AiThunk';

interface aiState {
  isLoading: boolean;
  error: string | null;
  flagged: boolean;
  generatedText: string | null;
}

const initialState: aiState = {
  isLoading: false,
  error: null,
  flagged: false,
  generatedText: null,
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    cleanGeneratedText: (state) => {
      state.generatedText = '';
    },

    clearFlagged: (state) => {
      state.flagged = false;
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
        state.generatedText = action.payload.data;
      })
      .addCase(generateBeautifullThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!.error;
        state.generatedText = null;
      });
  },
});

export const { clearError, cleanGeneratedText, clearFlagged } = aiSlice.actions;
export const aiReducer = aiSlice.reducer;
