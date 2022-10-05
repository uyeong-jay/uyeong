// https://stackoverflow.com/questions/63439021/handling-errors-with-redux-toolkit - createAsyncThunk,try-catch 타입에러 잡기
// https://stackoverflow.com/questions/69422525/in-typescript-try-catch-error-object-shows-object-is-of-type-unknown-ts25 - createAsyncThunk,try-catch 타입에러 잡기

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorMessage } from '@slices/userSlice';
import { postAPI, getAPI } from '@utils/fetchData';

//join
export const fetchJoinData = createAsyncThunk('fetchJoinData', async (data: object, { rejectWithValue }) => {
  try {
    const res = await postAPI('register', data);
    console.log(res);
    return res.data;
  } catch (err) {
    const error = err as ErrorMessage;
    if (!error.response) {
      throw error;
    }
    console.log(error.response.data.msg);
    return rejectWithValue(error.response.data.msg);
  }
});

//login
export const fetchLoginData = createAsyncThunk('fetchLoginData', async (data: object, { rejectWithValue }) => {
  try {
    const res = await postAPI('login', data);
    return res.data;
  } catch (err) {
    const error = err as ErrorMessage;
    if (!error.response) {
      throw error;
    }
    console.log(error.response.data.msg);
    return rejectWithValue(error.response.data.msg);
  }
});

//refresh
export const fetchRefreshData = createAsyncThunk(
  'fetchRefreshData',
  async (data: object | null, { rejectWithValue }) => {
    try {
      const login = localStorage.getItem('login');
      //localstorage에 user가 없으면
      //아무 것도 없는 걸 전달하기(return;)
      //(전달을 안하는게 아님)
      //(아무것도 없는 걸 전달해도 refresh는 실행되어 refresh.success는 true로 바뀜)
      if (login !== 'user') return;
      const res = await getAPI('refresh');
      return res.data;
    } catch (err) {
      const error = err as ErrorMessage;
      if (!error.response) {
        throw error;
      }
      console.log(error.response.data.msg);
      return rejectWithValue(error.response.data.msg);
    }
  },
);
