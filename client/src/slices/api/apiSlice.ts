import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { axiosBaseQuery } from './baseQuery';

export interface UserData {
  msg: string;
  access_token?: string;
  refresh_token?: string;
  user?: {
    nickname: string;
    avatar: string;
  };
}

export const apiSlice = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.BASE_URL,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    // builder.query<type of 'res' , type of 'query arg'>
    getUserData: builder.query<UserData, void>({
      query: () => ({
        url: '/api/refresh',
        method: 'get',
      }),
    }),
  }),
});

// export hooks for usage in functional components
export const { useGetUserDataQuery } = apiSlice;

// export endpoints for use in SSR
export const { getUserData } = apiSlice.endpoints;
