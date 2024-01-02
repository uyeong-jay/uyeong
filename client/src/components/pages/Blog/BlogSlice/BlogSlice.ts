import { BlogCommentRes } from '@app/services/blog/commentApi';
import { BlogPostRes } from '@app/services/blog/postApi';
import { createSlice } from '@reduxjs/toolkit';

//initialState type
interface initialState {
  blogPostsBySearch: BlogPostRes | null;
  blogComments: BlogCommentRes | null;
  tagName: string;
}

//initialState
const initialState: initialState = {
  blogPostsBySearch: null,
  blogComments: null,
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
    getTagName: (state, action) => {
      state.tagName = action.payload;
    },
  },
});

//reducer, actions 내보내기
export default blogSlice.reducer;
export const { getPostsBySearch, getMorePostsBySearch, getTagName } = blogSlice.actions;
