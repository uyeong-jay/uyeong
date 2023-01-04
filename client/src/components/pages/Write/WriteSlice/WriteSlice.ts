import { createSlice } from '@reduxjs/toolkit';

//initialState type
interface initialState {
  isPublishing: boolean;
}

//initialState
const initialState: initialState = {
  isPublishing: false,
};

//slice
const writeSlice = createSlice({
  name: 'write',
  initialState,
  reducers: {
    startPuslishing: (state) => {
      state.isPublishing = true;
    },
    cancelPublishing: (state) => {
      state.isPublishing = false;
    },
  },
});

//reducer, actions 내보내기
export default writeSlice.reducer;
export const { startPuslishing, cancelPublishing } = writeSlice.actions;
