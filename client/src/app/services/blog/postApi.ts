import { api } from '../api';
import { UserResponse } from '../user/userApi';

// export interface BlogPost {
//   _id: string;
//   user: UserResponse['user'];
//   title: string;
//   tags: string[];
//   content: string;
//   thumbnail: string | File;
//   description: string;
//   privacy: boolean;
//   createdAt: string;
//   category: {
//     _id: string;
//     name: string;
//     createdAt: string;
//   };
// }

// export interface BlogPosts {
//   _id: string; //카테고리 id
//   name: string;
//   count: number;
//   posts: BlogPost[];
// }

// export interface BlogPostRes extends Array<BlogPosts> {}

export interface BlogPost {
  _id: string;
  user: UserResponse['user'];
  title: string;
  tags: string[];
  content: string;
  thumbnail: string | File;
  description: string;
  privacy: boolean;
  createdAt: string;
  category: {
    _id: string;
    name: string;
    createdAt: string;
  };
}

export interface BlogPostRes {
  posts: BlogPost[];
}

export interface BlogPostReq {
  user: string;
  title: string;
  tags: string[];
  content: string;
  thumbnail: string | File;
  description: string;
  category: string;
  privacy: boolean;
  createdAt: string;
}

export interface BlogPostReqWithToken {
  blogPostInfo: BlogPostReq;
  token?: string;
}

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //refresh
    getBlogPosts: builder.query<BlogPostRes, void>({
      query: () => ({
        url: '/api/blog',
        method: 'get',
      }),
      providesTags: ['BlogPost'],
    }),

    //create
    createBlogPost: builder.mutation<BlogPostRes, BlogPostReqWithToken>({
      query: (data) => ({
        url: '/api/blog',
        method: 'post',
        data: data.blogPostInfo,
        headers: {
          Authorization: data.token,
        },
      }),
      invalidatesTags: ['BlogPost'],
    }),
  }),
});

// export hooks for usage in functional components
export const { useGetBlogPostsQuery, useCreateBlogPostMutation } = postApi;

// export endpoints for use in SSR
export const { getBlogPosts } = postApi.endpoints;
