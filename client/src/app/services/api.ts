import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { axiosBaseQuery } from './baseQuery';
// import getConfig from 'next/config';
// const { serverRuntimeConfig } = getConfig();
// const SERVER_URL = serverRuntimeConfig.serverURL;

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: typeof window === 'undefined' ? 'http://server-prod:5000' : process.env.NEXT_PUBLIC_BASE_URL,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['User', 'BlogCategory', 'BlogPost', 'BlogComment'],
  endpoints: () => ({}),
});

export const {
  util: { getRunningQueriesThunk },
} = api;
