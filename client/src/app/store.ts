import { configureStore } from '@reduxjs/toolkit'; //리듀서들 + 미들웨어
import loginReducer from '@pages/Login/loginSlice';
import reduxLogger from 'redux-logger'; //미들웨어

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxLogger),
});

//+ Add types
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
