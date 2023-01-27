import { api } from '../api';

export interface UserResponse {
  msg: string;
  access_token?: string;
  refresh_token?: string;
  user?: {
    _id: string;
    role: string;
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

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
export const { useGetUserDataQuery, useJoinMutation, useLoginMutation, useLogoutMutation, useUpdateMutation } = userApi;

// export endpoints for use in SSR
export const { getUserData } = userApi.endpoints;
