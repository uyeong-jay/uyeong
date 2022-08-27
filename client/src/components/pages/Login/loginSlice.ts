// https://stackoverflow.com/questions/63439021/handling-errors-with-redux-toolkit - createAsyncThunk,try-catch 타입에러 잡기
// https://stackoverflow.com/questions/69422525/in-typescript-try-catch-error-object-shows-object-is-of-type-unknown-ts25 - createAsyncThunk,try-catch 타입에러 잡기

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { postAPI } from '@utils/fetchData';

interface User {
  email: string;
  password: string;
}

interface LoginError {
  response: {
    data: {
      msg: string;
    };
  };
}

interface InitialState {
  loading: boolean;
  user: User | null;
  error: LoginError | unknown | null;
}

const initialState: InitialState = {
  loading: false,
  user: null,
  error: null,
};

export const fetchLoginUser = createAsyncThunk('login/fetchLoginUser', async (data: object, { rejectWithValue }) => {
  try {
    const res = await postAPI('login', data);
    console.log(res);
    return res;
  } catch (err: unknown) {
    const error = err as LoginError;
    if (!error.response) {
      throw error;
    }
    console.log(error.response.data.msg);
    return rejectWithValue(error.response.data.msg);
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState, //login(리듀서 이름): {lading, user, error}
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLoginUser.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(fetchLoginUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      //user: { access_token, refresh_token, data: {~}, msg }
      state.error = null;
    });
    builder.addCase(fetchLoginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
      //error: "에러 메세지"
    });
  },
});

export default loginSlice.reducer;
