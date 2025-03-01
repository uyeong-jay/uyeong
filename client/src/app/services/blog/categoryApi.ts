import { api } from '../api';

export interface BlogCategory {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  postCount: number;
  posts: {
    _id: string;
    thumbnail: string;
  }[];
}

export interface BlogCategoryRes {
  categories?: BlogCategory[];
  totalPages?: number;
  msg?: string;
}

export interface BlogCategoryReq {
  categoryName?: {
    currName: string;
    name: string;
  };
  categoryInfo?: {
    name: string;
  };
  categoryPageInfo?: {
    pageId: string;
    pageNum: number;
  };
  token?: string;
}

export const categoryApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBlogCategories: builder.query<BlogCategoryRes, number | void>({
      query: (query) => ({
        url: `/api/blog/category?page=${query}`,
        method: 'get',
      }),
      providesTags: ['BlogCategory', 'BlogPost'], //BlogPost 데이터가 변경되었을때도 데이터 리패치
    }),

    createBlogCategory: builder.mutation<BlogCategoryRes, BlogCategoryReq>({
      query: (data) => ({
        url: '/api/blog/category',
        method: 'post',
        data: data.categoryInfo,
        headers: {
          Authorization: data.token,
        },
      }),
      invalidatesTags: ['BlogCategory'],
    }),

    updateBlogCategory: builder.mutation<BlogCategoryRes, BlogCategoryReq>({
      query: (data) => ({
        url: '/api/blog/category',
        method: 'patch',
        data: data.categoryName,
        headers: {
          Authorization: data.token,
        },
      }),
      invalidatesTags: ['BlogCategory'],
    }),

    deleteBlogCategory: builder.mutation<BlogCategoryRes, BlogCategoryReq>({
      query: (data) => ({
        url: '/api/blog/category',
        method: 'delete',
        data: data.categoryInfo,
        headers: {
          Authorization: data.token,
        },
      }),
      invalidatesTags: ['BlogCategory'],
    }),
  }),
});

// export hooks for usage in functional components
export const {
  useGetBlogCategoriesQuery,
  useCreateBlogCategoryMutation,
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
} = categoryApi;

// export endpoints for use in SSR
export const { getBlogCategories } = categoryApi.endpoints;
