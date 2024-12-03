import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { axiosBaseQuery } from './baseQuery';
// import getConfig from 'next/config';
// const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
// const API_URI: string = serverRuntimeConfig.apiURL || publicRuntimeConfig.apiURL;
// const API_URI: string = serverRuntimeConfig.apiURL;

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: typeof window === 'undefined' ? 'http://nginx' : process.env.NEXT_PUBLIC_BASE_URL,
    // baseUrl: API_URI,
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
