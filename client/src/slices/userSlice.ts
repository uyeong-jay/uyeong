import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchJoinData, fetchLoginData, fetchRefreshData } from '@actions/user';

export interface UserData {
  msg?: string;
  access_token?: string;
  refresh_token?: string;
  user?: object;
}

export interface ErrorMessage {
  response: {
    data: {
      msg: string;
    };
  };
}

export interface DefaultState {
  loading: boolean;
  success: UserData | boolean | string | null;
  error: ErrorMessage | unknown | null;
}

export interface IUserState {
  user: UserData | null;
  join: DefaultState;
  login: DefaultState;
  refresh: DefaultState;
}

const defaultState: DefaultState = {
  loading: false,
  success: null,
  error: null,
};

const initialState: IUserState = {
  user: null,
  join: defaultState,
  login: defaultState,
  refresh: defaultState,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //join
    builder.addCase(fetchJoinData.pending, (state) => {
      state.join.loading = true;
      state.join.success = null;
      state.join.error = null;
    });
    builder.addCase(fetchJoinData.fulfilled, (state, action: PayloadAction<UserData>) => {
      state.join.loading = false;
      state.join.success = action.payload;
      // success: { msg: '' }
      state.join.error = null;
    });
    builder.addCase(fetchJoinData.rejected, (state, action) => {
      state.join.loading = false;
      state.join.success = null;
      state.join.error = action.payload;
      //error: "에러 메세지"
    });

    //login
    builder.addCase(fetchLoginData.pending, (state) => {
      state.login.loading = true;
      state.login.success = false;
      state.login.error = null;
    });
    builder.addCase(fetchLoginData.fulfilled, (state, action: PayloadAction<UserData>) => {
      state.login.loading = false;
      state.login.success = true;
      state.user = action.payload;
      //user: { access_token, refresh_token, user: {~}, msg }
      state.login.error = null;
    });
    builder.addCase(fetchLoginData.rejected, (state, action) => {
      state.login.loading = false;
      state.login.success = false;
      state.user = null;
      state.login.error = action.payload;
      //error: "에러 메세지"
    });

    //refresh
    builder.addCase(fetchRefreshData.pending, (state) => {
      state.refresh.loading = true;
      state.refresh.success = false;
      state.refresh.error = null;
    });
    builder.addCase(fetchRefreshData.fulfilled, (state, action: PayloadAction<UserData>) => {
      state.refresh.loading = false;
      state.refresh.success = true;
      state.user = action.payload;
      //user: { access_token, refresh_token, user: {~} }
      state.refresh.error = null;
    });
    builder.addCase(fetchRefreshData.rejected, (state, action) => {
      state.refresh.loading = false;
      state.refresh.success = false;
      state.user = null;
      state.refresh.error = action.payload;
      //error: "에러 메세지"
    });
  },
});

export default userSlice.reducer;
