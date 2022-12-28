import { api } from '../api';

export interface BlogPostRes {
  // categories?: [
  //   {
  //     _id: string;
  //     name: string;
  //   },
  // ];
  msg?: string;
}

export interface BlogPostReq {
  user: string;
  title: string;
  tags: string[];
  content: string;
  thumbnail: string;
  description: string;
  category: string;
  privacy: boolean;
  createdAt: string;
}

export interface BlogPostReqWithToken {
  blogPostInfo: BlogPostReq;
  token?: string;
}

export const blogPostApi = api.injectEndpoints({
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
        // headers: {
        //   Authorization: data.token,
        // },
      }),
      invalidatesTags: ['BlogPost'],
    }),
  }),
});

// export hooks for usage in functional components
export const { useGetBlogPostsQuery, useCreateBlogPostMutation } = blogPostApi;

// export endpoints for use in SSR
export const { getBlogPosts } = blogPostApi.endpoints;
