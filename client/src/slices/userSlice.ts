import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchJoinData, fetchLoginData, fetchLogoutData, fetchRefreshData } from '@actions/user';

export interface UserData {
  msg?: string;
  access_token?: string;
  refresh_token?: string;
  user?: {
    nickname: string;
    avatar: string;
  };
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
  success: boolean;
  error: ErrorMessage | unknown | null;
}

export interface IUserState {
  userData: UserData | null;
  join: DefaultState;
  login: DefaultState;
  logout: DefaultState;
  refresh: DefaultState;
}

const defaultState: DefaultState = {
  loading: false,
  success: false,
  error: null,
};

const initialState: IUserState = {
  userData: null,
  join: defaultState,
  login: defaultState,
  logout: defaultState,
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
      state.join.success = false;
      state.join.error = null;
    });
    builder.addCase(fetchJoinData.fulfilled, (state, action: PayloadAction<UserData>) => {
      state.join.loading = false;
      state.join.success = true;
      state.userData = action.payload;
      // userData: { msg: '' }
      state.join.error = null;
    });
    builder.addCase(fetchJoinData.rejected, (state, action) => {
      state.join.loading = false;
      state.join.success = false;
      state.userData = null;
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
      state.userData = action.payload;
      //userData: { access_token, refresh_token, user: {~}, msg }
      state.login.error = null;
    });
    builder.addCase(fetchLoginData.rejected, (state, action) => {
      state.login.loading = false;
      state.login.success = false;
      state.userData = null;
      state.login.error = action.payload;
      //error: "에러 메세지"
    });

    //logout
    builder.addCase(fetchLogoutData.pending, (state) => {
      state.logout.loading = true;
      state.logout.success = false;
      state.logout.error = null;
    });
    builder.addCase(fetchLogoutData.fulfilled, (state) => {
      state.logout.loading = false;
      state.logout.success = true;
      state.userData = null;
      state.logout.error = null;
    });
    builder.addCase(fetchLogoutData.rejected, (state, action) => {
      state.logout.loading = false;
      state.logout.success = false;
      state.userData = null;
      state.logout.error = action.payload;
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
      state.userData = action.payload;
      //userData: { access_token, refresh_token, user: {~} }
      state.refresh.error = null;
    });
    builder.addCase(fetchRefreshData.rejected, (state, action) => {
      state.refresh.loading = false;
      state.refresh.success = false;
      state.userData = null;
      state.refresh.error = action.payload;
      //error: "에러 메세지"
    });
  },
});

export default userSlice;
