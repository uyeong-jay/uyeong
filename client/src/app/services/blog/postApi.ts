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
  commentCount: number;
}

export interface BlogPostRes {
  posts?: BlogPost[];
  postsByCategory?: BlogPost[];
  post?: BlogPost;
  msg?: string;
}

export interface BlogPostReq {
  _id?: string;
  title: string;
  tags: string[];
  content: string;
  thumbnail: string | File;
  description: string;
  category: string;
  privacy: boolean;
}

export interface BlogPostId {
  _id: string | string[] | undefined;
}

export interface BlogPostReqWithToken {
  blogPostInfo: BlogPostReq | BlogPostId;
  token?: string;
}

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //get
    getBlogPosts: builder.query<BlogPostRes, void>({
      query: () => ({
        url: '/api/blog',
        method: 'get',
      }),
      providesTags: ['BlogPost'],
    }),

    //get
    getBlogPostsBySearch: builder.query<BlogPostRes, string>({
      query: (query) => ({
        url: `/api/search?q=${query}`,
        method: 'get',
      }),
      providesTags: ['BlogPost'],
    }),

    //get
    getBlogPostsByCategory: builder.query<BlogPostRes, string>({
      query: (slug) => ({
        url: `/api/blog/category/${slug}`,
        method: 'get',
      }),
      providesTags: ['BlogPost'],
    }),

    //get
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

    //update
    updateBlogPost: builder.mutation<BlogPostRes, BlogPostReqWithToken>({
      query: (data) => ({
        url: '/api/blog',
        method: 'patch',
        data: data.blogPostInfo,
        headers: {
          Authorization: data.token,
        },
      }),
      invalidatesTags: ['BlogPost'],
    }),

    //delete
    deleteBlogPost: builder.mutation<BlogPostRes, BlogPostReqWithToken>({
      query: (data) => ({
        url: '/api/blog',
        method: 'delete',
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
export const {
  useGetBlogPostsQuery,
  useGetBlogPostQuery,
  useGetBlogPostsByCategoryQuery,
  useGetBlogPostsBySearchQuery,
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  useDeleteBlogPostMutation,
} = postApi;

// export endpoints for use in SSR
export const { getBlogPosts, getBlogPost, getBlogPostsByCategory, getBlogPostsBySearch } = postApi.endpoints;
