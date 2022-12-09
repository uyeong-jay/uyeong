import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { axiosBaseQuery } from './baseQuery';

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.BASE_URL,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['User', 'BlogCategory', 'BlogPost'],
  endpoints: () => ({}),
});

export const {
  util: { getRunningOperationPromises },
} = api;
