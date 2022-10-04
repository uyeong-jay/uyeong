import { AnyAction, CombinedState, combineReducers, Reducer } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer, { IUserState } from '@slices/userSlice';

export interface IState {
  user: IUserState;
}

const persistConfig = {
  key: 'root',
  storage, // localStorage에 저장합니다.
  whitelist: ['user'], // reducer 중에 user reducer만 localstorage에 저장
  // blacklist: ['user'] // reducer 중에 user reducer만 제외하고 localstorage에 저장
};

const rootReducer = (state: IState, action: AnyAction): CombinedState<IState> => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user: userReducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export const persistedReducer = persistReducer(persistConfig, rootReducer as Reducer);
