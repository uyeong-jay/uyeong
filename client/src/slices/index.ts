import { AnyAction, CombinedState, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import userSlice, { IUserState } from '@slices/userSlice';
import { apiSlice } from './api/apiSlice';

export interface IState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  api: CombinedState<any>;
  user: IUserState;
}

const rootReducer = (state: IState, action: AnyAction): CombinedState<IState> => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        // Add the generated reducer as a specific top-level slice
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userSlice.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
