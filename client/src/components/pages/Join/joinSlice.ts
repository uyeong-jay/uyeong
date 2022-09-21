import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { postAPI } from '@utils/fetchData';

interface UserJoinInfo {
  nickname: string;
  email: string;
  password: string;
  cf_password: string;
}

interface JoinError {
  response: {
    data: {
      msg: string;
    };
  };
}

interface InitialState {
  loading: boolean;
  user: UserJoinInfo | null;
  error: JoinError | unknown | null;
}

const initialState: InitialState = {
  loading: false,
  user: null,
  error: null,
};

export const fetchUserJoin = createAsyncThunk('join/fetchUserJoin', async (data: object, { rejectWithValue }) => {
  try {
    const res = await postAPI('register', data);
    console.log(res);
    return res;
  } catch (err) {
    const error = err as JoinError;
    if (!error.response) {
      throw error;
    }
    console.log(error.response.data.msg);
    return rejectWithValue(error.response.data.msg);
  }
});

const joinSlice = createSlice({
  name: 'join',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserJoin.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(fetchUserJoin.fulfilled, (state, action: PayloadAction<UserJoinInfo>) => {
      state.loading = false;
      state.user = action.payload;
      // user: {}
      state.error = null;
    });
    builder.addCase(fetchUserJoin.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
      //error: ""
    });
  },
});

export default joinSlice.reducer;
