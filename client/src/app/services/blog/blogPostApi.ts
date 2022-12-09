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
  blogPostInfo?: {
    blogContent: string;
  };
  token?: string;
}

export const blogPostsApi = api.injectEndpoints({
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
    createBlogPost: builder.mutation<BlogPostRes, BlogPostReq>({
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
export const { useGetBlogPostsQuery, useCreateBlogPostMutation } = blogPostsApi;

// export endpoints for use in SSR
export const { getBlogPosts } = blogPostsApi.endpoints;
