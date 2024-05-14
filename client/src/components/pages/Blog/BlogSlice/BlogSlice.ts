import { BlogPostRes } from '@app/services/blog/postApi';
import { createSlice } from '@reduxjs/toolkit';

//initialState type
interface initialState {
  blogPostsBySearch: BlogPostRes | null;
  blogPostsByCategory: BlogPostRes | null;
  tagName: string;
  postAuthInfo: {
    blogPostInfo: {
      _id: string | null;
    };
    token: string | null;
  };
}

export const initialPostAuthInfo = {
  blogPostInfo: {
    _id: null,
  },
  token: null,
};

//initialState
const initialState: initialState = {
  blogPostsBySearch: null,
  blogPostsByCategory: null,
  tagName: '',
  postAuthInfo: initialPostAuthInfo,
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
    setPostAuthInfo: (state, action) => {
      state.postAuthInfo = action.payload;
    },
  },
});

//reducer, actions 내보내기
export default blogSlice.reducer;
export const {
  getPostsBySearch,
  getMorePostsBySearch,
  getPostsByCategory,
  getMorePostsByCategory,
  getTagName,
  setPostAuthInfo,
} = blogSlice.actions;
