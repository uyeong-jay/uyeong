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
    return getDefaultMiddleware({
      //https://stackoverflow.com/questions/71611934/redux-toolkit-query-not-invalidating-tags-and-cache-in-non-debug-or-production
      //배포환경에서도 캐시 무효화를 가능하게 하여 invalidatesTags가 제대로 작동하도록 두 옵션 추가
      serializableCheck: true,
      immutableCheck: true,
    }).concat(api.middleware);
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
  // debug: isDev,
  //https://github.com/kirill-konshin/next-redux-wrapper/issues/276
  // serializeState: (state) => JSON.stringify(state),
  // deserializeState: (state) => JSON.parse(state),
});

export default wrapper;
