import { BlogPostRes } from '@app/services/blog/postApi';
import { createSlice } from '@reduxjs/toolkit';

//initialState type
interface initialState {
  blogPostsDataBySearch: BlogPostRes | null;
  tagName: string;
}

//initialState
const initialState: initialState = {
  blogPostsDataBySearch: null,
  tagName: '',
};

//slice
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    getPostsBySearch: (state, action) => {
      state.blogPostsDataBySearch = action.payload;
    },
    getTagName: (state, action) => {
      state.tagName = action.payload;
    },
  },
});

//reducer, actions 내보내기
export default blogSlice.reducer;
export const { getPostsBySearch, getTagName } = blogSlice.actions;
