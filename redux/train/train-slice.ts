import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { createNewBrain, deleteBrain } from './train-action';

interface BrainState {
  currentBrainID: string | null;
  isBrainLoading: boolean;
}
const initialState: BrainState = {
  currentBrainID: null,
  isBrainLoading: false,
};
export const trainSlice = createSlice({
  name: 'train',
  initialState,
  reducers: {
    setCurrentBrainID: (state, action: PayloadAction<string | null>) => {
      state.currentBrainID = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createNewBrain.pending, state => {
        state.isBrainLoading = true;
      })
      .addCase(createNewBrain.fulfilled, (state, action: any) => {
        state.isBrainLoading = false;
        state.currentBrainID = action.payload.id;
      })
      .addCase(createNewBrain.rejected, state => {
        state.isBrainLoading = false;
        state.currentBrainID = null;
      })
      .addCase(deleteBrain.rejected, state => {
        state.isBrainLoading = false;
      })
      .addCase(deleteBrain.pending, state => {
        state.isBrainLoading = true;
      })
      .addCase(deleteBrain.fulfilled, state => {
        state.isBrainLoading = false;
      });
  },
});
