import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { axiosBaseQuery } from './baseQuery';

export interface UserResponse {
  msg: string;
  access_token?: string;
  refresh_token?: string;
  user?: {
    avatar: string;
    nickname: string;
    email: string;
    password?: string;
  };
}

export interface UserRequest {
  nickname?: string;
  email?: string;
  password?: string;
  cf_password?: string;
}

export interface UserRequestWithToken extends UserRequest {
  userUpdateInfo: UserRequest;
  token?: string;
}

//https://redux-toolkit.js.org/rtk-query/usage/code-splitting
export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.BASE_URL,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // 서버에 전달할 data ? builder.mutation() : builder.query()
    // builder.query<type of 'res' , type of 'query arg'>

    //refresh
    getUserData: builder.query<UserResponse, void>({
      query: () => ({
        url: '/api/refresh',
        method: 'get',
      }),
      providesTags: ['User'],
    }),

    //join
    join: builder.mutation<UserResponse, UserRequest>({
      query: (data) => ({
        url: '/api/register',
        method: 'post',
        data,
      }),
      invalidatesTags: ['User'],
    }),

    //login
    login: builder.mutation<UserResponse, UserRequest>({
      query: (data) => ({
        url: '/api/login',
        method: 'post',
        data,
      }),
      invalidatesTags: ['User'],
    }),

    //logout
    logout: builder.mutation<UserResponse, null>({
      query: (data) => ({
        url: '/api/logout',
        method: 'post',
        data,
      }),
      invalidatesTags: ['User'],
    }),

    //update
    update: builder.mutation<UserResponse, UserRequestWithToken>({
      query: (data) => ({
        url: '/api/user',
        method: 'patch',
        data: data.userUpdateInfo,
        headers: {
          Authorization: data.token,
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// export hooks for usage in functional components
export const {
  useGetUserDataQuery,
  useJoinMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateMutation,
  util: { getRunningOperationPromises },
} = api;

// export endpoints for use in SSR
export const { getUserData } = api.endpoints;
