import { configureStore } from '@reduxjs/toolkit'; //리듀서 + 미들웨어
import { createWrapper } from 'next-redux-wrapper';
// import reduxLogger from 'redux-logger'; //미들웨어
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { api } from '@app/services/api';
import userSlice from '@slices/userSlice';

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
      user: userSlice.reducer,
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
  //https://github.com/kirill-konshin/next-redux-wrapper/issues/276
  // serializeState: (state) => JSON.stringify(state),
  // deserializeState: (state) => JSON.parse(state),
});

export default wrapper;
