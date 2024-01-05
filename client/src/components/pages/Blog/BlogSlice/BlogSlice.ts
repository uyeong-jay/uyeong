import { BlogPostRes } from '@app/services/blog/postApi';
import { createSlice } from '@reduxjs/toolkit';

//initialState type
interface initialState {
  blogPostsBySearch: BlogPostRes | null;
  blogPostsByCategory: BlogPostRes | null;
  tagName: string;
}

//initialState
const initialState: initialState = {
  blogPostsBySearch: null,
  blogPostsByCategory: null,
  tagName: '',
};

//slice
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    getPostsBySearch: (state, action) => {
      state.blogPostsBySearch = action.payload;
    },
    getMorePostsBySearch: (state, action) => {
      state.blogPostsBySearch = {
        ...action.payload,
        posts: state.blogPostsBySearch?.posts?.concat(action.payload.posts),
      };
    },
    getPostsByCategory: (state, action) => {
      state.blogPostsByCategory = action.payload;
    },
    getMorePostsByCategory: (state, action) => {
      state.blogPostsByCategory = {
        ...action.payload,
        postsByCategory: state.blogPostsByCategory?.postsByCategory?.concat(action.payload.postsByCategory),
      };
    },
    getTagName: (state, action) => {
      state.tagName = action.payload;
    },
  },
});

//reducer, actions 내보내기
export default blogSlice.reducer;
export const { getPostsBySearch, getMorePostsBySearch, getPostsByCategory, getMorePostsByCategory, getTagName } =
  blogSlice.actions;
