import { createSlice } from '@reduxjs/toolkit';

//initialState type
interface initialState {
  scrollDirForModal: string;
  pageLoading: boolean;
}

//initialState
const initialState: initialState = {
  scrollDirForModal: '',
  pageLoading: false,
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
    startPageLoading: (state) => {
      state.pageLoading = true;
    },
    removePageLoading: (state) => {
      state.pageLoading = false;
    },
  },
});

//reducer, actions 내보내기
export default headerSlice.reducer;
export const { scrollDownForModal, scrollUpForModal, scrollResetForModal, startPageLoading, removePageLoading } =
  headerSlice.actions;
