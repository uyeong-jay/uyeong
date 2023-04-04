import { BlogPostRes } from '@app/services/blog/postApi';
import { createSlice } from '@reduxjs/toolkit';

//initialState type
interface initialState {
  blogPostsDataBySearch: BlogPostRes | null;
}

//initialState
const initialState: initialState = {
  blogPostsDataBySearch: null,
};

//slice
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    getPostsBySearch: (state, action) => {
      state.blogPostsDataBySearch = action.payload;
    },
  },
});

//reducer, actions 내보내기
export default blogSlice.reducer;
export const { getPostsBySearch } = blogSlice.actions;
