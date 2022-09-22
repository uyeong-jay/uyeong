import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { postAPI } from '@utils/fetchData';

interface JoinError {
  response: {
    data: {
      msg: string;
    };
  };
}

interface InitialState {
  loading: boolean;
  success: string | null;
  error: JoinError | unknown | null;
}

const initialState: InitialState = {
  loading: false,
  success: null,
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
      state.success = null;
      state.error = null;
    });
    builder.addCase(fetchUserJoin.fulfilled, (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.success = action.payload;
      // success: { msg: '' }
      state.error = null;
    });
    builder.addCase(fetchUserJoin.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
      //error: "에러 메세지"
    });
  },
});

export default joinSlice.reducer;
