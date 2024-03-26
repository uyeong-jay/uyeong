import { BlogPost } from '@app/services/blog/postApi';
import { createSlice } from '@reduxjs/toolkit';

//initialState type
interface initialState {
  isPublishing: boolean;
  blogPostDataById: BlogPost | null;
  fileState: string;
}

export const fileStatus = {
  unchanged: 'unchanged',
  modified: 'modified',
  removed: 'removed',
};

//initialState
const initialState: initialState = {
  isPublishing: false,
  blogPostDataById: null,
  fileState: fileStatus.unchanged,
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
    getPostById: (state, action) => {
      state.blogPostDataById = action.payload;
    },
    setFileUnchanged: (state) => {
      state.fileState = fileStatus.unchanged;
    },
    setFileModified: (state) => {
      state.fileState = fileStatus.modified;
    },
    setFileRemoved: (state) => {
      state.fileState = fileStatus.removed;
    },
  },
});

//reducer, actions 내보내기
export default writeSlice.reducer;
export const { startPuslishing, cancelPublishing, getPostById, setFileUnchanged, setFileModified, setFileRemoved } =
  writeSlice.actions;
