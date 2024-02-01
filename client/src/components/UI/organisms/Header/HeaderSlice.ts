import { createSlice } from '@reduxjs/toolkit';

//initialState type
interface initialState {
  scrollDirForModal: string;
}

//initialState
const initialState: initialState = {
  scrollDirForModal: '',
};

//slice
const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    scrollDownForModal: (state) => {
      state.scrollDirForModal = 'down';
    },
    scrollUpForModal: (state) => {
      state.scrollDirForModal = 'up';
    },
    scrollResetForModal: (state) => {
      state.scrollDirForModal = '';
    },
  },
});

//reducer, actions 내보내기
export default headerSlice.reducer;
export const { scrollDownForModal, scrollUpForModal, scrollResetForModal } = headerSlice.actions;
