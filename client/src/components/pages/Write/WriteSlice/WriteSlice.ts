import { createSlice } from '@reduxjs/toolkit';

//initialState type
interface initialState {
  isPublish: boolean;
}

//initialState
const initialState: initialState = {
  isPublish: false,
};

//slice
const writeSlice = createSlice({
  name: 'write',
  initialState,
  reducers: {
    done: (state) => {
      state.isPublish = true;
    },
    cancel: (state) => {
      state.isPublish = false;
    },
  },
});

//reducer, actions 내보내기
export default writeSlice.reducer;
export const { done, cancel } = writeSlice.actions;
