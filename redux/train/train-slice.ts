import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface BrainState {
  currentBrainID: string | null;
  isBrainLoading: boolean;
}
const initialState: BrainState = {
  currentBrainID: null,
  isBrainLoading: false,
};
export const brainSlice = createSlice({
  name: 'brain',
  initialState,
  reducers: {
    setCurrentBrainID: (state, action: PayloadAction<string | null>) => {
      state.currentBrainID = action.payload;
    },
  },
});
