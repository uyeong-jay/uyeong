import { BlogPostRes } from '@app/services/blog/postApi';
import { createSlice } from '@reduxjs/toolkit';

//initialState type
interface initialState {
  blogPostsBySearch: BlogPostRes | null;
  tagName: string;
  isHeaderUp: boolean;
}

//initialState
const initialState: initialState = {
  blogPostsBySearch: null,
  tagName: '',
  isHeaderUp: false,
};

//slice
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    getPostsBySearch: (state, action) => {
      state.blogPostsBySearch = action.payload;
    },
    getTagName: (state, action) => {
      state.tagName = action.payload;
    },
    raiseHeader: (state) => {
      state.isHeaderUp = true;
    },
    lowerHeader: (state) => {
      state.isHeaderUp = false;
    },
  },
});

//reducer, actions 내보내기
export default blogSlice.reducer;
export const { getPostsBySearch, getTagName, raiseHeader, lowerHeader } = blogSlice.actions;
