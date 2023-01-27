import { api } from '../api';

export interface BlogPost {
  _id: string;
  titleForUrl: string;
  title: string;
  tags: string[];
  content: string;
  thumbnail: string | File;
  description: string;
  category: string;
  privacy: boolean;
  createdAt: string;
}

export interface BlogPostRes {
  posts?: BlogPost[];
  postsByCategory?: BlogPost[];
  post?: BlogPost;
}

export interface BlogPostReq {
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
    //getMany
    getBlogPosts: builder.query<BlogPostRes, void>({
      query: () => ({
        url: '/api/blog',
        method: 'get',
      }),
      providesTags: ['BlogPost'],
    }),

    //getBy1
    getBlogPostsByCategory: builder.query<BlogPostRes, string>({
      query: (slug) => ({
        url: `/api/blog/category/${slug}`,
        method: 'get',
      }),
      providesTags: ['BlogPost'],
    }),

    //getBy2
    getBlogPost: builder.query<BlogPostRes, string>({
      query: (slug) => ({
        url: `/api/blog/${slug}`,
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
export const { useGetBlogPostsQuery, useGetBlogPostsByCategoryQuery, useGetBlogPostQuery, useCreateBlogPostMutation } =
  postApi;

// export endpoints for use in SSR
export const { getBlogPosts, getBlogPost, getBlogPostsByCategory } = postApi.endpoints;