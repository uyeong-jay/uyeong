import { api } from '../api';

export interface IBlogPost {
  _id: string;
  title: string;
  tags: string[];
  content: string;
  thumbnail: string | File;
  description: string;
  privacy: boolean;
  createdAt: string;
}

export interface BlogPost extends IBlogPost {
  category: {
    _id: string;
    name: string;
    createdAt: string;
  };
}

export interface BlogPostByCategoryName extends IBlogPost {
  category: string;
}

export interface BlogPostByPostTitle extends IBlogPost {
  category: string;
}

export interface BlogPostRes {
  posts?: BlogPost[];
  postsByCategory?: BlogPostByCategoryName[];
  post?: BlogPostByPostTitle;
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
    //get1
    getBlogPosts: builder.query<BlogPostRes, void>({
      query: () => ({
        url: '/api/blog',
        method: 'get',
      }),
      providesTags: ['BlogPost'],
    }),

    //get2
    getBlogPostsByCategory: builder.query<BlogPostRes, string>({
      query: (slug) => ({
        url: `/api/blog/category/${slug}`,
        method: 'get',
      }),
      providesTags: ['BlogPost'],
    }),

    //get3
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
