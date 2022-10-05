import { configureStore, Reducer } from '@reduxjs/toolkit'; //리듀서 + 미들웨어
import { createWrapper } from 'next-redux-wrapper';
// import { IState, persistedReducer } from '@slices/index';
import reduxLogger from 'redux-logger'; //미들웨어
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import rootReducer, { IState } from '@slices/index';
// import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const isDev = process.env.NODE_ENV === 'development';

const createStore = () => {
  const middleware = (getDefaultMiddleware: CurriedGetDefaultMiddleware<IState>) => {
    if (isDev)
      // return getDefaultMiddleware({
      //   serializableCheck: {
      //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      //   },
      // }).concat(reduxLogger);
      return getDefaultMiddleware().concat(reduxLogger);
    return getDefaultMiddleware();
  };

  const store = configureStore({
    // reducer: persistedReducer,
    reducer: rootReducer as Reducer,
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
  serializeState: (state) => JSON.stringify(state),
  deserializeState: (state) => JSON.parse(state),
});

// export const persistor = persistStore(createStore());

export default wrapper;
