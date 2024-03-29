import { configureStore } from '@reduxjs/toolkit'; //리듀서 + 미들웨어
import { createWrapper } from 'next-redux-wrapper';
// import reduxLogger from 'redux-logger'; //미들웨어
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { api } from '@app/services/api';

//reducers
import writeReducer from '@pages/Write/WriteSlice';
import blogReducer from '@pages/Blog/BlogSlice';
import headerReducer from '@organisms/Header/HeaderSlice';

const isDev = process.env.NODE_ENV === 'development';

const createStore = () => {
  const middleware = (getDefaultMiddleware: CurriedGetDefaultMiddleware) => {
    // Adding the api middleware enables caching, invalidation, polling, and other useful features of `rtk-query`.
    if (isDev) return getDefaultMiddleware().concat(api.middleware);
    return getDefaultMiddleware();
  };

  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      write: writeReducer,
      blog: blogReducer,
      header: headerReducer,
    },
    middleware,
    devTools: isDev,
  });

  return store;
};

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

const wrapper = createWrapper<AppStore>(createStore, {
  debug: isDev,
});

export default wrapper;
