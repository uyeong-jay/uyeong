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
  next_cursor?: string;
  hasMatchingPost?: boolean;
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

export interface BlogPostSearchReq {
  nextPageId: string;
  searchWord: string;
}

export interface BlogPostByCategoryReq {
  categoryTitle?: string | string[];
  nextPageId: string;
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
    getBlogPosts: builder.query<BlogPostRes, void>({
      query: () => ({
        url: '/api/blog',
        method: 'get',
      }),
      providesTags: ['BlogPost'],
    }),

    getBlogPostsBySearch: builder.query<BlogPostRes, BlogPostSearchReq>({
      query: (query) => ({
        url: `/api/search?page=${query.nextPageId}&q=${query.searchWord}`,
        method: 'get',
      }),
      providesTags: ['BlogPost'],
    }),

    getBlogPostsByCategory: builder.query<BlogPostRes, BlogPostByCategoryReq>({
      query: (data) => ({
        url: `/api/blog/category/${data.categoryTitle}?page=${data.nextPageId}`,
        method: 'get',
      }),
      providesTags: ['BlogPost'],
    }),

    getBlogPost: builder.query<BlogPostRes, string>({
      query: (slug) => ({
        url: `/api/blog/${encodeURIComponent(slug)}`,
        method: 'get',
      }),
      providesTags: ['BlogPost'],
    }),

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
